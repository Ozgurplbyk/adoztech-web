using Adoztech.Web.Services.Content;

namespace Adoztech.Web.ViewModels;

public sealed class HomePageViewModel
{
    public required string Culture { get; init; }
    public required SeoViewModel Seo { get; init; }
    public required HomePageContent Content { get; init; }
}

public sealed class StandardPageViewModel
{
    public required string Culture { get; init; }
    public required SeoViewModel Seo { get; init; }
    public required StandardPageContent Content { get; init; }
}

public sealed class PortfolioPageViewModel
{
    public required string Culture { get; init; }
    public required SeoViewModel Seo { get; init; }
    public required PortfolioPageContent Content { get; init; }
}

public sealed class ProjectDetailsViewModel
{
    public required string Culture { get; init; }
    public required SeoViewModel Seo { get; init; }
    public required PortfolioProjectContent Project { get; init; }
}

public sealed class ContactPageViewModel
{
    public required string Culture { get; init; }
    public required SeoViewModel Seo { get; init; }
    public required ContactPageContent Content { get; init; }
    public required ContactFormViewModel Form { get; init; }
}

public sealed class QuotePageViewModel
{
    public required string Culture { get; init; }
    public required SeoViewModel Seo { get; init; }
    public required QuotePageContent Content { get; init; }
    public required QuoteRequestViewModel Form { get; init; }
}

public sealed class NotFoundPageViewModel
{
    public required string Culture { get; init; }
    public required SeoViewModel Seo { get; init; }
    public required StandardPageContent Content { get; init; }
}
