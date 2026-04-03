namespace Adoztech.Web.Services.Content;

public sealed record HomePageContent(
    string Eyebrow,
    string Title,
    string Lead,
    string PrimaryActionText,
    string SecondaryActionText,
    IReadOnlyList<MetricContent> Metrics,
    IReadOnlyList<ServiceCardContent> Services,
    IReadOnlyList<ReasonContent> Reasons,
    IReadOnlyList<ProcessStepContent> ProcessSteps,
    IReadOnlyList<PortfolioProjectContent> FeaturedProjects,
    CallToActionContent CallToAction,
    ContactSummaryContent ContactSummary);

public sealed record StandardPageContent(
    string Eyebrow,
    string Title,
    string Lead,
    IReadOnlyList<SectionContent> Sections);

public sealed record PortfolioPageContent(
    string Eyebrow,
    string Title,
    string Lead,
    IReadOnlyList<PortfolioProjectContent> Projects);

public sealed record ContactPageContent(
    string Eyebrow,
    string Title,
    string Lead,
    IReadOnlyList<ContactDetailContent> Details,
    string FormTitle,
    string FormLead);

public sealed record QuotePageContent(
    string Eyebrow,
    string Title,
    string Lead,
    string FormTitle,
    string FormLead,
    IReadOnlyList<OptionItemContent> ServiceOptions,
    IReadOnlyList<OptionItemContent> BudgetOptions,
    IReadOnlyList<OptionItemContent> TimelineOptions,
    IReadOnlyList<string> ChecklistItems);

public sealed record MetricContent(string Value, string Label);
public sealed record ServiceCardContent(string Key, string Title, string Description);
public sealed record ReasonContent(string Title, string Description);
public sealed record ProcessStepContent(string Step, string Title, string Description);
public sealed record CallToActionContent(string Title, string Description, string PrimaryActionText, string SecondaryActionText);
public sealed record ContactSummaryContent(string Title, string Description, string PrimaryActionText, string SecondaryActionText);
public sealed record ContactDetailContent(string Label, string Value, string Url);
public sealed record SectionContent(string Title, IReadOnlyList<string> Paragraphs);
public sealed record OptionItemContent(string Value, string Label);

public sealed record PortfolioProjectContent(
    string Category,
    string Title,
    string Slug,
    string AlternateSlug,
    string Summary,
    string TechnologyStack,
    string Outcome,
    string ImagePath,
    string ImageAlt);

public interface IContentService
{
    HomePageContent GetHomePage(string culture);
    StandardPageContent GetAboutPage(string culture);
    StandardPageContent GetServicesPage(string culture);
    StandardPageContent GetProcessPage(string culture);
    PortfolioPageContent GetPortfolioPage(string culture);
    PortfolioProjectContent? GetProjectBySlug(string culture, string slug);
    string? GetAlternateProjectSlug(string sourceCulture, string slug, string targetCulture);
    ContactPageContent GetContactPage(string culture);
    QuotePageContent GetQuotePage(string culture);
    StandardPageContent GetPrivacyPage(string culture);
    StandardPageContent GetKvkkPage(string culture);
    StandardPageContent GetNotFoundPage(string culture);
    IReadOnlyList<(string Path, DateTimeOffset LastModified)> GetSitemapEntries(string culture);
}
