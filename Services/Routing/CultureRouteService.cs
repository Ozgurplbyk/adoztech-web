using Adoztech.Web.Services.Content;

namespace Adoztech.Web.Services.Routing;

public sealed class CultureRouteService(IContentService contentService) : ICultureRouteService
{
    private static readonly Dictionary<string, (string Tr, string En)> RouteMap = new(StringComparer.OrdinalIgnoreCase)
    {
        ["home"] = (string.Empty, string.Empty),
        ["about"] = ("hakkimizda", "about"),
        ["services"] = ("hizmetler", "services"),
        ["projects"] = ("projeler", "projects"),
        ["process"] = ("surec", "process"),
        ["quote"] = ("teklif-al", "request-quote"),
        ["contact"] = ("iletisim", "contact"),
        ["privacy"] = ("gizlilik-politikasi", "privacy-policy"),
        ["kvkk"] = ("kvkk", "privacy-notice"),
        ["notfound"] = ("404", "404")
    };

    public string GetPath(string culture, string routeKey, string? slug = null)
    {
        var normalizedCulture = NormalizeCulture(culture);

        if (string.Equals(routeKey, "projectDetail", StringComparison.OrdinalIgnoreCase))
        {
            var projectsSegment = normalizedCulture == "en" ? "projects" : "projeler";
            return $"/{normalizedCulture}/{projectsSegment}/{slug}";
        }

        if (!RouteMap.TryGetValue(routeKey, out var translation))
        {
            return $"/{normalizedCulture}";
        }

        var segment = normalizedCulture == "en" ? translation.En : translation.Tr;
        return string.IsNullOrWhiteSpace(segment)
            ? $"/{normalizedCulture}"
            : $"/{normalizedCulture}/{segment}";
    }

    public string GetAbsoluteUrl(string culture, string routeKey, string baseUrl, string? slug = null) =>
        $"{baseUrl.TrimEnd('/')}{GetPath(culture, routeKey, slug)}";

    public string GetAlternatePath(HttpContext httpContext, string targetCulture)
    {
        var normalizedTarget = NormalizeCulture(targetCulture);
        var segments = httpContext.Request.Path.Value?
            .Trim('/')
            .Split('/', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
            ?? [];

        if (segments.Length == 0)
        {
            return $"/{normalizedTarget}";
        }

        if (segments.Length == 1)
        {
            return $"/{normalizedTarget}";
        }

        var sourceCulture = NormalizeCulture(segments[0]);
        var sourceSegment = segments[1];

        if (IsProjectsPath(sourceCulture, sourceSegment))
        {
            if (segments.Length == 2)
            {
                return GetPath(normalizedTarget, "projects");
            }

            var alternateSlug = contentService.GetAlternateProjectSlug(sourceCulture, segments[2], normalizedTarget) ?? segments[2];
            return GetPath(normalizedTarget, "projectDetail", alternateSlug);
        }

        var routeKey = RouteMap
            .FirstOrDefault(item => string.Equals(sourceCulture == "en" ? item.Value.En : item.Value.Tr, sourceSegment, StringComparison.OrdinalIgnoreCase))
            .Key;

        return string.IsNullOrWhiteSpace(routeKey)
            ? $"/{normalizedTarget}"
            : GetPath(normalizedTarget, routeKey);
    }

    private static bool IsProjectsPath(string culture, string segment) =>
        string.Equals(segment, culture == "en" ? "projects" : "projeler", StringComparison.OrdinalIgnoreCase);

    private static string NormalizeCulture(string? culture) =>
        string.Equals(culture, "en", StringComparison.OrdinalIgnoreCase) ? "en" : "tr";
}
