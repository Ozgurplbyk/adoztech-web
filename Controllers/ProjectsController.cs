using Adoztech.Web.Options;
using Adoztech.Web.Services.Content;
using Adoztech.Web.Services.Routing;
using Adoztech.Web.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Adoztech.Web.Controllers;

public sealed class ProjectsController(
    ICultureRouteService routeService,
    IContentService contentService,
    IOptions<SiteSettings> siteSettings) : BaseController(routeService, siteSettings)
{
    [HttpGet("{culture:regex(^tr|en$)}/projeler")]
    [HttpGet("{culture:regex(^tr|en$)}/projects")]
    public IActionResult Index(string culture)
    {
        var normalizedCulture = NormalizeCulture(culture);
        var content = contentService.GetPortfolioPage(normalizedCulture);

        return View(new PortfolioPageViewModel
        {
            Culture = normalizedCulture,
            Content = content,
            Seo = BuildSeo(normalizedCulture, content.Title, content.Lead, "projects")
        });
    }

    [HttpGet("{culture:regex(^tr|en$)}/projeler/{slug}")]
    [HttpGet("{culture:regex(^tr|en$)}/projects/{slug}")]
    public IActionResult Details(string culture, string slug)
    {
        var normalizedCulture = NormalizeCulture(culture);
        var project = contentService.GetProjectBySlug(normalizedCulture, slug);

        if (project is null)
        {
            return Redirect(RouteService.GetPath(normalizedCulture, "notfound"));
        }

        return View(new ProjectDetailsViewModel
        {
            Culture = normalizedCulture,
            Project = project,
            Seo = BuildSeo(normalizedCulture, project.Title, project.Summary, "projectDetail", project.Slug, project.AlternateSlug)
        });
    }
}
