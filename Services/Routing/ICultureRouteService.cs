using Microsoft.AspNetCore.Http;

namespace Adoztech.Web.Services.Routing;

public interface ICultureRouteService
{
    string GetPath(string culture, string routeKey, string? slug = null);
    string GetAbsoluteUrl(string culture, string routeKey, string baseUrl, string? slug = null);
    string GetAlternatePath(HttpContext httpContext, string targetCulture);
}
