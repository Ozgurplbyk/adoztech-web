using System.Net;
using System.Text;
using Adoztech.Web.Data;
using Adoztech.Web.Models;
using Adoztech.Web.Resources;
using Adoztech.Web.Services.Content;
using Adoztech.Web.Services.Email;
using Adoztech.Web.ViewModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;

namespace Adoztech.Web.Services.Forms;

public sealed class FormSubmissionService(
    AppDbContext dbContext,
    IEmailService emailService,
    IContentService contentService,
    IStringLocalizer<SharedResource> localizer,
    ILogger<FormSubmissionService> logger) : IFormSubmissionService
{
    public async Task<FormSubmissionResult> SubmitContactAsync(string culture, ContactFormViewModel model, CancellationToken cancellationToken = default)
    {
        var entity = new ContactSubmission
        {
            Culture = NormalizeCulture(culture),
            FullName = model.FullName.Trim(),
            Email = model.Email.Trim(),
            Phone = model.Phone.Trim(),
            Subject = model.Subject.Trim(),
            Message = model.Message.Trim()
        };

        dbContext.ContactSubmissions.Add(entity);
        await dbContext.SaveChangesAsync(cancellationToken);

        var emailResult = await emailService.SendAsync(BuildContactMessage(entity), cancellationToken);

        entity.Status = emailResult.Success ? FormSubmissionStatus.Sent : FormSubmissionStatus.EmailFailed;
        entity.FailureReason = emailResult.ErrorMessage;

        await dbContext.SaveChangesAsync(cancellationToken);

        if (emailResult.Success)
        {
            logger.LogInformation("Contact form submission {SubmissionId} stored and emailed successfully", entity.Id);
            return new FormSubmissionResult(true, true, localizer["ContactSubmissionSuccess"]);
        }

        logger.LogError("Contact form submission {SubmissionId} stored but email failed: {Reason}", entity.Id, emailResult.ErrorMessage);
        return new FormSubmissionResult(false, true, localizer["ContactSubmissionFallback"]);
    }

    public async Task<FormSubmissionResult> SubmitQuoteAsync(string culture, QuoteRequestViewModel model, CancellationToken cancellationToken = default)
    {
        var entity = new QuoteRequestSubmission
        {
            Culture = NormalizeCulture(culture),
            FullName = model.FullName.Trim(),
            CompanyName = model.CompanyName.Trim(),
            Email = model.Email.Trim(),
            Phone = model.Phone.Trim(),
            ServiceType = model.ServiceType.Trim(),
            BudgetRange = model.BudgetRange.Trim(),
            ProjectSummary = model.ProjectSummary.Trim(),
            Timeline = model.Timeline.Trim()
        };

        dbContext.QuoteRequestSubmissions.Add(entity);
        await dbContext.SaveChangesAsync(cancellationToken);

        var emailResult = await emailService.SendAsync(BuildQuoteMessage(entity), cancellationToken);

        entity.Status = emailResult.Success ? FormSubmissionStatus.Sent : FormSubmissionStatus.EmailFailed;
        entity.FailureReason = emailResult.ErrorMessage;

        await dbContext.SaveChangesAsync(cancellationToken);

        if (emailResult.Success)
        {
            logger.LogInformation("Quote request submission {SubmissionId} stored and emailed successfully", entity.Id);
            return new FormSubmissionResult(true, true, localizer["QuoteSubmissionSuccess"]);
        }

        logger.LogError("Quote request submission {SubmissionId} stored but email failed: {Reason}", entity.Id, emailResult.ErrorMessage);
        return new FormSubmissionResult(false, true, localizer["QuoteSubmissionFallback"]);
    }

    private EmailMessage BuildContactMessage(ContactSubmission submission)
    {
        var culture = submission.Culture;
        var title = culture == "en" ? "New website contact inquiry" : "Yeni web sitesi iletisim talebi";

        var htmlBuilder = new StringBuilder();
        htmlBuilder.AppendLine("<h2>Adoztech Website</h2>");
        htmlBuilder.AppendLine("<table style=\"border-collapse:collapse;width:100%\">");
        AppendRow(htmlBuilder, "Culture", submission.Culture);
        AppendRow(htmlBuilder, "Full Name", submission.FullName);
        AppendRow(htmlBuilder, "Email", submission.Email);
        AppendRow(htmlBuilder, "Phone", submission.Phone);
        AppendRow(htmlBuilder, "Subject", submission.Subject);
        AppendRow(htmlBuilder, "Message", submission.Message);
        htmlBuilder.AppendLine("</table>");

        var textBody = $"""
            Adoztech Website Contact Form

            Culture: {submission.Culture}
            Full Name: {submission.FullName}
            Email: {submission.Email}
            Phone: {submission.Phone}
            Subject: {submission.Subject}
            Message:
            {submission.Message}
            """;

        return new EmailMessage
        {
            Subject = title,
            HtmlBody = htmlBuilder.ToString(),
            TextBody = textBody
        };
    }

    private EmailMessage BuildQuoteMessage(QuoteRequestSubmission submission)
    {
        var options = contentService.GetQuotePage(submission.Culture);
        var serviceLabel = options.ServiceOptions.FirstOrDefault(x => x.Value == submission.ServiceType)?.Label ?? submission.ServiceType;
        var budgetLabel = options.BudgetOptions.FirstOrDefault(x => x.Value == submission.BudgetRange)?.Label ?? submission.BudgetRange;
        var timelineLabel = options.TimelineOptions.FirstOrDefault(x => x.Value == submission.Timeline)?.Label ?? submission.Timeline;

        var title = submission.Culture == "en" ? "New quote request from website" : "Web sitesinden yeni teklif talebi";

        var htmlBuilder = new StringBuilder();
        htmlBuilder.AppendLine("<h2>Adoztech Quote Request</h2>");
        htmlBuilder.AppendLine("<table style=\"border-collapse:collapse;width:100%\">");
        AppendRow(htmlBuilder, "Culture", submission.Culture);
        AppendRow(htmlBuilder, "Full Name", submission.FullName);
        AppendRow(htmlBuilder, "Company", submission.CompanyName);
        AppendRow(htmlBuilder, "Email", submission.Email);
        AppendRow(htmlBuilder, "Phone", submission.Phone);
        AppendRow(htmlBuilder, "Service", serviceLabel);
        AppendRow(htmlBuilder, "Budget", budgetLabel);
        AppendRow(htmlBuilder, "Timeline", timelineLabel);
        AppendRow(htmlBuilder, "Project Summary", submission.ProjectSummary);
        htmlBuilder.AppendLine("</table>");

        var textBody = $"""
            Adoztech Website Quote Request

            Culture: {submission.Culture}
            Full Name: {submission.FullName}
            Company: {submission.CompanyName}
            Email: {submission.Email}
            Phone: {submission.Phone}
            Service: {serviceLabel}
            Budget: {budgetLabel}
            Timeline: {timelineLabel}
            Project Summary:
            {submission.ProjectSummary}
            """;

        return new EmailMessage
        {
            Subject = title,
            HtmlBody = htmlBuilder.ToString(),
            TextBody = textBody
        };
    }

    private static void AppendRow(StringBuilder builder, string label, string value)
    {
        builder.Append("<tr>");
        builder.Append($"<td style=\"padding:8px;border:1px solid #ddd;font-weight:600\">{WebUtility.HtmlEncode(label)}</td>");
        builder.Append($"<td style=\"padding:8px;border:1px solid #ddd\">{WebUtility.HtmlEncode(value)}</td>");
        builder.AppendLine("</tr>");
    }

    private static string NormalizeCulture(string? culture) =>
        string.Equals(culture, "en", StringComparison.OrdinalIgnoreCase) ? "en" : "tr";
}
