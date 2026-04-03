using System.ComponentModel.DataAnnotations;

namespace Adoztech.Web.ViewModels;

public sealed class ContactFormViewModel
{
    [Required(ErrorMessage = "ValidationRequired")]
    [Display(Name = "ContactFullNameLabel")]
    [StringLength(160, ErrorMessage = "ValidationMaxLength")]
    public string FullName { get; set; } = string.Empty;

    [Required(ErrorMessage = "ValidationRequired")]
    [Display(Name = "EmailAddressLabel")]
    [EmailAddress(ErrorMessage = "ValidationEmail")]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "ValidationRequired")]
    [Display(Name = "PhoneLabel")]
    [StringLength(64, ErrorMessage = "ValidationMaxLength")]
    public string Phone { get; set; } = string.Empty;

    [Required(ErrorMessage = "ValidationRequired")]
    [Display(Name = "SubjectLabel")]
    [StringLength(160, ErrorMessage = "ValidationMaxLength")]
    public string Subject { get; set; } = string.Empty;

    [Required(ErrorMessage = "ValidationRequired")]
    [Display(Name = "MessageLabel")]
    [StringLength(2000, MinimumLength = 20, ErrorMessage = "ValidationMessageLength")]
    public string Message { get; set; } = string.Empty;
}
