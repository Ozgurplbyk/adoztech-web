using System.ComponentModel.DataAnnotations;

namespace Adoztech.Web.Models;

public sealed class QuoteRequestSubmission
{
    public int Id { get; set; }

    [Required]
    public string FullName { get; set; } = string.Empty;

    [Required]
    public string CompanyName { get; set; } = string.Empty;

    [Required]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string Phone { get; set; } = string.Empty;

    [Required]
    public string ServiceType { get; set; } = string.Empty;

    [Required]
    public string BudgetRange { get; set; } = string.Empty;

    [Required]
    public string ProjectSummary { get; set; } = string.Empty;

    [Required]
    public string Timeline { get; set; } = string.Empty;

    [Required]
    public string Culture { get; set; } = "tr";

    public FormSubmissionStatus Status { get; set; } = FormSubmissionStatus.Pending;

    public string? FailureReason { get; set; }

    public DateTimeOffset CreatedAtUtc { get; set; } = DateTimeOffset.UtcNow;
}
