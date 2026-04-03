namespace Adoztech.Web.ViewModels;

public sealed class SeoViewModel
{
    public string Title { get; init; } = string.Empty;
    public string Description { get; init; } = string.Empty;
    public string CanonicalUrl { get; init; } = string.Empty;
    public string ImageUrl { get; init; } = string.Empty;
    public string Locale { get; init; } = string.Empty;
    public string AlternateLocale { get; init; } = string.Empty;
    public string AlternateUrl { get; init; } = string.Empty;
}
