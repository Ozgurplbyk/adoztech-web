using Adoztech.Web.Options;
using Adoztech.Web.Services.Routing;
using Adoztech.Web.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Adoztech.Web.Controllers;

public abstract class BaseController(
    ICultureRouteService routeService,
    IOptions<SiteSettings> siteSettings) : Controller
{
    protected readonly ICultureRouteService RouteService = routeService;
    protected readonly SiteSettings SiteSettings = siteSettings.Value;

    protected static string NormalizeCulture(string? culture) =>
        string.Equals(culture, "en", StringComparison.OrdinalIgnoreCase) ? "en" : "tr";

    protected SeoViewModel BuildSeo(string culture, string title, string description, string routeKey, string? slug = null, string? alternateSlug = null)
    {
        var normalizedCulture = NormalizeCulture(culture);
        var alternateCulture = normalizedCulture == "tr" ? "en" : "tr";
        var canonicalUrl = RouteService.GetAbsoluteUrl(normalizedCulture, routeKey, SiteSettings.BaseUrl, slug);
        var alternateUrl = RouteService.GetAbsoluteUrl(alternateCulture, routeKey, SiteSettings.BaseUrl, alternateSlug ?? slug);

        return new SeoViewModel
        {
            Title = $"{title} | {SiteSettings.SiteName}",
            Description = description,
            CanonicalUrl = canonicalUrl,
            AlternateUrl = alternateUrl,
            ImageUrl = $"{SiteSettings.BaseUrl.TrimEnd('/')}{SiteSettings.DefaultImagePath}",
            Locale = normalizedCulture == "tr" ? SiteSettings.DefaultLocale : SiteSettings.AlternateLocale,
            AlternateLocale = normalizedCulture == "tr" ? SiteSettings.AlternateLocale : SiteSettings.DefaultLocale
        };
    }
}
