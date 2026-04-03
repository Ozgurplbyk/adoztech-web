namespace Adoztech.Web.Services.Email;

public sealed class EmailMessage
{
    public string Subject { get; init; } = string.Empty;
    public string HtmlBody { get; init; } = string.Empty;
    public string TextBody { get; init; } = string.Empty;
}

public sealed class EmailSendResult
{
    public bool Success { get; init; }
    public string? ErrorMessage { get; init; }

    public static EmailSendResult Sent() => new() { Success = true };
    public static EmailSendResult Failed(string message) => new() { Success = false, ErrorMessage = message };
}

public interface IEmailService
{
    Task<EmailSendResult> SendAsync(EmailMessage message, CancellationToken cancellationToken = default);
}
