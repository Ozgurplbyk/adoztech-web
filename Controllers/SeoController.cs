using System.Text;
using System.Xml;
using Adoztech.Web.Options;
using Adoztech.Web.Services.Content;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Adoztech.Web.Controllers;

public sealed class SeoController(
    IContentService contentService,
    IOptions<SiteSettings> siteSettings) : Controller
{
    private readonly SiteSettings _siteSettings = siteSettings.Value;

    [HttpGet("robots.txt")]
    public IActionResult Robots()
    {
        var content = """
            User-agent: *
            Allow: /

            Sitemap: https://www.adoztech.com/sitemap.xml
            """;

        if (!string.IsNullOrWhiteSpace(_siteSettings.BaseUrl))
        {
            content = $"User-agent: *{Environment.NewLine}Allow: /{Environment.NewLine}{Environment.NewLine}Sitemap: {_siteSettings.BaseUrl.TrimEnd('/')}/sitemap.xml";
        }

        return Content(content, "text/plain", Encoding.UTF8);
    }

    [HttpGet("sitemap.xml")]
    public IActionResult Sitemap()
    {
        Response.ContentType = "application/xml";
        var baseUrl = _siteSettings.BaseUrl.TrimEnd('/');
        var entries = contentService
            .GetSitemapEntries("tr")
            .Concat(contentService.GetSitemapEntries("en"))
            .DistinctBy(x => x.Path)
            .OrderBy(x => x.Path)
            .ToList();

        var settings = new XmlWriterSettings
        {
            Async = false,
            Encoding = Encoding.UTF8,
            Indent = true
        };

        using var stringWriter = new Utf8StringWriter();
        using var xmlWriter = XmlWriter.Create(stringWriter, settings);

        xmlWriter.WriteStartDocument();
        xmlWriter.WriteStartElement("urlset", "http://www.sitemaps.org/schemas/sitemap/0.9");

        foreach (var entry in entries)
        {
            xmlWriter.WriteStartElement("url");
            xmlWriter.WriteElementString("loc", $"{baseUrl}{entry.Path}");
            xmlWriter.WriteElementString("lastmod", entry.LastModified.UtcDateTime.ToString("yyyy-MM-dd"));
            xmlWriter.WriteEndElement();
        }

        xmlWriter.WriteEndElement();
        xmlWriter.WriteEndDocument();

        return Content(stringWriter.ToString(), "application/xml", Encoding.UTF8);
    }

    private sealed class Utf8StringWriter : StringWriter
    {
        public override Encoding Encoding => Encoding.UTF8;
    }
}
