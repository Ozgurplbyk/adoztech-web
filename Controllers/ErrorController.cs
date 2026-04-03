using Adoztech.Web.Options;
using Adoztech.Web.Services.Content;
using Adoztech.Web.Services.Routing;
using Adoztech.Web.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Adoztech.Web.Controllers;

public sealed class ErrorController(
    ICultureRouteService routeService,
    IContentService contentService,
    IOptions<SiteSettings> siteSettings) : BaseController(routeService, siteSettings)
{
    [HttpGet("{culture:regex(^tr|en$)}/404")]
    public IActionResult NotFoundPage(string culture)
    {
        var normalizedCulture = NormalizeCulture(culture);
        Response.StatusCode = StatusCodes.Status404NotFound;

        var content = contentService.GetNotFoundPage(normalizedCulture);

        return View("NotFound", new NotFoundPageViewModel
        {
            Culture = normalizedCulture,
            Content = content,
            Seo = BuildSeo(normalizedCulture, content.Title, content.Lead, "notfound")
        });
    }
}
