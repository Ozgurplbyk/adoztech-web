using System.Globalization;
using Adoztech.Web.Data;
using Adoztech.Web.Options;
using Adoztech.Web.Resources;
using Adoztech.Web.Services.Content;
using Adoztech.Web.Services.Email;
using Adoztech.Web.Services.Forms;
using Adoztech.Web.Services.Routing;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Localization.Routing;
using Microsoft.EntityFrameworkCore;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

Directory.CreateDirectory(Path.Combine(builder.Environment.ContentRootPath, "App_Data"));
Directory.CreateDirectory(Path.Combine(builder.Environment.ContentRootPath, "Logs"));

Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .Enrich.FromLogContext()
    .CreateBootstrapLogger();

builder.Host.UseSerilog((context, services, configuration) => configuration
    .ReadFrom.Configuration(context.Configuration)
    .ReadFrom.Services(services)
    .Enrich.FromLogContext());

builder.Services.Configure<SiteSettings>(builder.Configuration.GetSection(SiteSettings.SectionName));
builder.Services.Configure<SmtpSettings>(builder.Configuration.GetSection(SmtpSettings.SectionName));
builder.Services.Configure<BrandingSettings>(builder.Configuration.GetSection(BrandingSettings.SectionName));
builder.Services.Configure<LocalizationSettings>(builder.Configuration.GetSection(LocalizationSettings.SectionName));

builder.Services.AddLocalization(options => options.ResourcesPath = "Resources");

builder.Services
    .AddControllersWithViews()
    .AddViewLocalization()
    .AddDataAnnotationsLocalization(options =>
    {
        options.DataAnnotationLocalizerProvider = (_, factory) => factory.Create(typeof(SharedResource));
    });

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddHttpContextAccessor();

builder.Services.AddScoped<IContentService, StaticContentService>();
builder.Services.AddScoped<ICultureRouteService, CultureRouteService>();
builder.Services.AddScoped<IEmailService, SmtpEmailService>();
builder.Services.AddScoped<IFormSubmissionService, FormSubmissionService>();

var localizationSettings = builder.Configuration.GetSection(LocalizationSettings.SectionName).Get<LocalizationSettings>()
    ?? new LocalizationSettings();

var supportedCultures = localizationSettings.SupportedCultures
    .Select(culture => new CultureInfo(culture))
    .ToList();

builder.Services.Configure<RequestLocalizationOptions>(options =>
{
    options.DefaultRequestCulture = new RequestCulture(localizationSettings.DefaultCulture);
    options.SupportedCultures = supportedCultures;
    options.SupportedUICultures = supportedCultures;

    var routeDataProvider = new RouteDataRequestCultureProvider
    {
        Options = options,
        RouteDataStringKey = "culture",
        UIRouteDataStringKey = "culture"
    };

    options.RequestCultureProviders = new List<IRequestCultureProvider>
    {
        routeDataProvider
    };
});

var app = builder.Build();

app.UseSerilogRequestLogging();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler(errorApp =>
    {
        errorApp.Run(async context =>
        {
            var logger = context.RequestServices.GetRequiredService<ILoggerFactory>().CreateLogger("UnhandledException");
            var exceptionFeature = context.Features.Get<Microsoft.AspNetCore.Diagnostics.IExceptionHandlerFeature>();

            if (exceptionFeature?.Error is not null)
            {
                logger.LogError(exceptionFeature.Error, "Unhandled application error at {Path}", context.Request.Path);
            }

            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            context.Response.ContentType = "text/html; charset=utf-8";

            await context.Response.WriteAsync("""
                <!doctype html>
                <html lang="tr">
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <title>Adoztech | Sunucu Hatası</title>
                    <style>
                        body{font-family:Segoe UI,Arial,sans-serif;background:#111716;color:#F3EFE6;padding:48px}
                        a{color:#D7834F}
                    </style>
                </head>
                <body>
                    <h1>Beklenmeyen bir hata oluştu.</h1>
                    <p>Lutfen daha sonra tekrar deneyin veya bizimle iletisime gecin.</p>
                    <p><a href="/tr">Ana sayfaya don</a></p>
                </body>
                </html>
                """);
        });
    });

    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.Use(async (context, next) =>
{
    var path = context.Request.Path.Value ?? string.Empty;
    var excludedPaths = new[]
    {
        "/",
        "/robots.txt",
        "/sitemap.xml"
    };

    if (excludedPaths.Contains(path, StringComparer.OrdinalIgnoreCase))
    {
        await next();
        return;
    }

    if (path.StartsWith("/css", StringComparison.OrdinalIgnoreCase) ||
        path.StartsWith("/js", StringComparison.OrdinalIgnoreCase) ||
        path.StartsWith("/img", StringComparison.OrdinalIgnoreCase) ||
        path.StartsWith("/lib", StringComparison.OrdinalIgnoreCase) ||
        Path.HasExtension(path))
    {
        await next();
        return;
    }

    var firstSegment = path.Trim('/').Split('/', StringSplitOptions.RemoveEmptyEntries).FirstOrDefault();
    var supported = localizationSettings.SupportedCultures
        .Contains(firstSegment ?? string.Empty, StringComparer.OrdinalIgnoreCase);

    if (!supported)
    {
        context.Response.Redirect($"/{localizationSettings.DefaultCulture}/404", false);
        return;
    }

    await next();
});

app.UseRouting();
app.UseRequestLocalization();
app.UseAuthorization();

app.MapControllers();

app.MapControllerRoute(
    name: "culture-catch-all",
    pattern: "{culture:regex(^tr|en$)}/{*url}",
    defaults: new { controller = "Error", action = "NotFoundPage" });

app.MapFallbackToController("RootRedirect", "Culture");

try
{
    Log.Information("Adoztech application starting");
    app.Run();
}
catch (Exception ex)
{
    Log.Fatal(ex, "Adoztech application failed to start");
}
finally
{
    Log.CloseAndFlush();
}
