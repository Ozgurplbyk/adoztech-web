namespace Adoztech.Web.Options;

public sealed class SiteSettings
{
    public const string SectionName = "SiteSettings";

    public string SiteName { get; set; } = "Adoztech";
    public string BaseUrl { get; set; } = string.Empty;
    public string DefaultImagePath { get; set; } = "/img/og-default.svg";
    public string DefaultLocale { get; set; } = "tr_TR";
    public string AlternateLocale { get; set; } = "en_US";
    public string ContactEmail { get; set; } = string.Empty;
    public string ContactPhone { get; set; } = string.Empty;
    public string WhatsappPhone { get; set; } = string.Empty;
    public string AddressTr { get; set; } = string.Empty;
    public string AddressEn { get; set; } = string.Empty;
    public string LinkedinUrl { get; set; } = string.Empty;
    public string InstagramUrl { get; set; } = string.Empty;
}
