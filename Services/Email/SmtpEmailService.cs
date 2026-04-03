using Adoztech.Web.Options;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

namespace Adoztech.Web.Services.Email;

public sealed class SmtpEmailService(
    IOptions<SmtpSettings> smtpSettings,
    ILogger<SmtpEmailService> logger) : IEmailService
{
    private readonly SmtpSettings _smtpSettings = smtpSettings.Value;

    public async Task<EmailSendResult> SendAsync(EmailMessage message, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(_smtpSettings.Host) ||
            string.IsNullOrWhiteSpace(_smtpSettings.ToEmail) ||
            string.IsNullOrWhiteSpace(_smtpSettings.FromEmail))
        {
            logger.LogWarning("SMTP configuration is incomplete. Email was not sent.");
            return EmailSendResult.Failed("SMTP configuration is incomplete.");
        }

        try
        {
            var email = new MimeMessage();
            email.From.Add(new MailboxAddress(_smtpSettings.FromName, _smtpSettings.FromEmail));
            email.To.Add(MailboxAddress.Parse(_smtpSettings.ToEmail));
            email.Subject = message.Subject;

            email.Body = new BodyBuilder
            {
                HtmlBody = message.HtmlBody,
                TextBody = message.TextBody
            }.ToMessageBody();

            using var client = new SmtpClient();
            client.Timeout = _smtpSettings.TimeoutSeconds * 1000;

            var secureSocket = _smtpSettings.UseSsl ? SecureSocketOptions.StartTls : SecureSocketOptions.Auto;

            await client.ConnectAsync(_smtpSettings.Host, _smtpSettings.Port, secureSocket, cancellationToken);

            if (!string.IsNullOrWhiteSpace(_smtpSettings.UserName))
            {
                await client.AuthenticateAsync(_smtpSettings.UserName, _smtpSettings.Password, cancellationToken);
            }

            await client.SendAsync(email, cancellationToken);
            await client.DisconnectAsync(true, cancellationToken);

            logger.LogInformation("Email sent successfully to {ToEmail}", _smtpSettings.ToEmail);
            return EmailSendResult.Sent();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "SMTP email sending failed");
            return EmailSendResult.Failed(ex.Message);
        }
    }
}
