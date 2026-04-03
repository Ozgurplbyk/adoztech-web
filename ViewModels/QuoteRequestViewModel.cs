using System.ComponentModel.DataAnnotations;

namespace Adoztech.Web.ViewModels;

public sealed class QuoteRequestViewModel
{
    [Required(ErrorMessage = "ValidationRequired")]
    [Display(Name = "QuoteFullNameLabel")]
    [StringLength(160, ErrorMessage = "ValidationMaxLength")]
    public string FullName { get; set; } = string.Empty;

    [Required(ErrorMessage = "ValidationRequired")]
    [Display(Name = "CompanyNameLabel")]
    [StringLength(160, ErrorMessage = "ValidationMaxLength")]
    public string CompanyName { get; set; } = string.Empty;

    [Required(ErrorMessage = "ValidationRequired")]
    [Display(Name = "EmailAddressLabel")]
    [EmailAddress(ErrorMessage = "ValidationEmail")]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "ValidationRequired")]
    [Display(Name = "PhoneLabel")]
    [StringLength(64, ErrorMessage = "ValidationMaxLength")]
    public string Phone { get; set; } = string.Empty;

    [Required(ErrorMessage = "ValidationRequired")]
    [Display(Name = "ServiceTypeLabel")]
    public string ServiceType { get; set; } = string.Empty;

    [Required(ErrorMessage = "ValidationRequired")]
    [Display(Name = "BudgetRangeLabel")]
    public string BudgetRange { get; set; } = string.Empty;

    [Required(ErrorMessage = "ValidationRequired")]
    [Display(Name = "ProjectSummaryLabel")]
    [StringLength(3000, MinimumLength = 30, ErrorMessage = "ValidationProjectSummaryLength")]
    public string ProjectSummary { get; set; } = string.Empty;

    [Required(ErrorMessage = "ValidationRequired")]
    [Display(Name = "TimelineLabel")]
    public string Timeline { get; set; } = string.Empty;
}
