namespace Adoztech.Web.Options;

public sealed class BrandingSettings
{
    public const string SectionName = "BrandingSettings";

    public string BrandName { get; set; } = "Adoztech";
    public string TaglineTr { get; set; } = string.Empty;
    public string TaglineEn { get; set; } = string.Empty;
    public string LogoText { get; set; } = "Adoztech";
}
