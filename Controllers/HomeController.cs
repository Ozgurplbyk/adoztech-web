using Adoztech.Web.Options;
using Adoztech.Web.Resources;
using Adoztech.Web.Services.Content;
using Adoztech.Web.Services.Forms;
using Adoztech.Web.Services.Routing;
using Adoztech.Web.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;

namespace Adoztech.Web.Controllers;

public sealed class HomeController(
    ICultureRouteService routeService,
    IContentService contentService,
    IFormSubmissionService formSubmissionService,
    IStringLocalizer<SharedResource> localizer,
    IOptions<SiteSettings> siteSettings) : BaseController(routeService, siteSettings)
{
    [HttpGet("{culture:regex(^tr|en$)}")]
    public IActionResult Index(string culture)
    {
        var normalizedCulture = NormalizeCulture(culture);
        var content = contentService.GetHomePage(normalizedCulture);

        return View(new HomePageViewModel
        {
            Culture = normalizedCulture,
            Content = content,
            Seo = BuildSeo(normalizedCulture, content.Title, content.Lead, "home")
        });
    }

    [HttpGet("{culture:regex(^tr|en$)}/hakkimizda")]
    [HttpGet("{culture:regex(^tr|en$)}/about")]
    public IActionResult About(string culture)
    {
        var normalizedCulture = NormalizeCulture(culture);
        var content = contentService.GetAboutPage(normalizedCulture);

        return View(new StandardPageViewModel
        {
            Culture = normalizedCulture,
            Content = content,
            Seo = BuildSeo(normalizedCulture, content.Title, content.Lead, "about")
        });
    }

    [HttpGet("{culture:regex(^tr|en$)}/hizmetler")]
    [HttpGet("{culture:regex(^tr|en$)}/services")]
    public IActionResult Services(string culture)
    {
        var normalizedCulture = NormalizeCulture(culture);
        var content = contentService.GetServicesPage(normalizedCulture);

        return View(new StandardPageViewModel
        {
            Culture = normalizedCulture,
            Content = content,
            Seo = BuildSeo(normalizedCulture, content.Title, content.Lead, "services")
        });
    }

    [HttpGet("{culture:regex(^tr|en$)}/surec")]
    [HttpGet("{culture:regex(^tr|en$)}/process")]
    public IActionResult Process(string culture)
    {
        var normalizedCulture = NormalizeCulture(culture);
        var content = contentService.GetProcessPage(normalizedCulture);

        return View(new StandardPageViewModel
        {
            Culture = normalizedCulture,
            Content = content,
            Seo = BuildSeo(normalizedCulture, content.Title, content.Lead, "process")
        });
    }

    [HttpGet("{culture:regex(^tr|en$)}/iletisim")]
    [HttpGet("{culture:regex(^tr|en$)}/contact")]
    public IActionResult Contact(string culture)
    {
        var normalizedCulture = NormalizeCulture(culture);
        var content = contentService.GetContactPage(normalizedCulture);

        return View(new ContactPageViewModel
        {
            Culture = normalizedCulture,
            Content = content,
            Form = new ContactFormViewModel(),
            Seo = BuildSeo(normalizedCulture, content.Title, content.Lead, "contact")
        });
    }

    [HttpPost("{culture:regex(^tr|en$)}/iletisim")]
    [HttpPost("{culture:regex(^tr|en$)}/contact")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Contact(string culture, ContactFormViewModel form, CancellationToken cancellationToken)
    {
        var normalizedCulture = NormalizeCulture(culture);
        var content = contentService.GetContactPage(normalizedCulture);

        if (!ModelState.IsValid)
        {
            return View(new ContactPageViewModel
            {
                Culture = normalizedCulture,
                Content = content,
                Form = form,
                Seo = BuildSeo(normalizedCulture, content.Title, content.Lead, "contact")
            });
        }

        var result = await formSubmissionService.SubmitContactAsync(normalizedCulture, form, cancellationToken);
        TempData[result.Success ? "SuccessMessage" : "ErrorMessage"] = result.FeedbackMessage;

        return Redirect(RouteService.GetPath(normalizedCulture, "contact"));
    }

    [HttpGet("{culture:regex(^tr|en$)}/teklif-al")]
    [HttpGet("{culture:regex(^tr|en$)}/request-quote")]
    public IActionResult Quote(string culture)
    {
        var normalizedCulture = NormalizeCulture(culture);
        var content = contentService.GetQuotePage(normalizedCulture);

        return View(new QuotePageViewModel
        {
            Culture = normalizedCulture,
            Content = content,
            Form = new QuoteRequestViewModel(),
            Seo = BuildSeo(normalizedCulture, content.Title, content.Lead, "quote")
        });
    }

    [HttpPost("{culture:regex(^tr|en$)}/teklif-al")]
    [HttpPost("{culture:regex(^tr|en$)}/request-quote")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Quote(string culture, QuoteRequestViewModel form, CancellationToken cancellationToken)
    {
        var normalizedCulture = NormalizeCulture(culture);
        var content = contentService.GetQuotePage(normalizedCulture);

        ValidateQuoteSelections(form, content);

        if (!ModelState.IsValid)
        {
            return View(new QuotePageViewModel
            {
                Culture = normalizedCulture,
                Content = content,
                Form = form,
                Seo = BuildSeo(normalizedCulture, content.Title, content.Lead, "quote")
            });
        }

        var result = await formSubmissionService.SubmitQuoteAsync(normalizedCulture, form, cancellationToken);
        TempData[result.Success ? "SuccessMessage" : "ErrorMessage"] = result.FeedbackMessage;

        return Redirect(RouteService.GetPath(normalizedCulture, "quote"));
    }

    private void ValidateQuoteSelections(QuoteRequestViewModel form, QuotePageContent content)
    {
        if (content.ServiceOptions.All(option => option.Value != form.ServiceType))
        {
            ModelState.AddModelError(nameof(form.ServiceType), localizer["ValidationInvalidSelection"]);
        }

        if (content.BudgetOptions.All(option => option.Value != form.BudgetRange))
        {
            ModelState.AddModelError(nameof(form.BudgetRange), localizer["ValidationInvalidSelection"]);
        }

        if (content.TimelineOptions.All(option => option.Value != form.Timeline))
        {
            ModelState.AddModelError(nameof(form.Timeline), localizer["ValidationInvalidSelection"]);
        }
    }
}
