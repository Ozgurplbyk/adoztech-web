namespace Adoztech.Web.Options;

public sealed class LocalizationSettings
{
    public const string SectionName = "LocalizationSettings";

    public string DefaultCulture { get; set; } = "tr";
    public List<string> SupportedCultures { get; set; } = new() { "tr", "en" };
}
