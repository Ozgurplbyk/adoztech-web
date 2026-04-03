using Adoztech.Web.Options;
using Adoztech.Web.Services.Content;
using Adoztech.Web.Services.Routing;
using Adoztech.Web.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Adoztech.Web.Controllers;

public sealed class LegalController(
    ICultureRouteService routeService,
    IContentService contentService,
    IOptions<SiteSettings> siteSettings) : BaseController(routeService, siteSettings)
{
    [HttpGet("{culture:regex(^tr|en$)}/gizlilik-politikasi")]
    [HttpGet("{culture:regex(^tr|en$)}/privacy-policy")]
    public IActionResult Privacy(string culture)
    {
        var normalizedCulture = NormalizeCulture(culture);
        var content = contentService.GetPrivacyPage(normalizedCulture);

        return View(new StandardPageViewModel
        {
            Culture = normalizedCulture,
            Content = content,
            Seo = BuildSeo(normalizedCulture, content.Title, content.Lead, "privacy")
        });
    }

    [HttpGet("{culture:regex(^tr|en$)}/kvkk")]
    [HttpGet("{culture:regex(^tr|en$)}/privacy-notice")]
    public IActionResult Kvkk(string culture)
    {
        var normalizedCulture = NormalizeCulture(culture);
        var content = contentService.GetKvkkPage(normalizedCulture);

        return View(new StandardPageViewModel
        {
            Culture = normalizedCulture,
            Content = content,
            Seo = BuildSeo(normalizedCulture, content.Title, content.Lead, "kvkk")
        });
    }
}
