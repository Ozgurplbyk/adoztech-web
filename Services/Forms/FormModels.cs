using Adoztech.Web.ViewModels;

namespace Adoztech.Web.Services.Forms;

public sealed record FormSubmissionResult(bool Success, bool Stored, string FeedbackMessage);

public interface IFormSubmissionService
{
    Task<FormSubmissionResult> SubmitContactAsync(string culture, ContactFormViewModel model, CancellationToken cancellationToken = default);
    Task<FormSubmissionResult> SubmitQuoteAsync(string culture, QuoteRequestViewModel model, CancellationToken cancellationToken = default);
}
