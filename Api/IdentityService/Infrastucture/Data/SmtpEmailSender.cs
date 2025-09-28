using System.Net;
using System.Net.Mail;
using Infrastucture.Settings;
using Microsoft.Extensions.Options;
using Services.Interfaces;

namespace Infrastucture.Data;

public class SmtpEmailSender(IOptionsSnapshot<SmtpSettings> _smtpSettings) : IEmailSender
{
    private readonly SmtpSettings _smtpSettings = _smtpSettings.Value;

    public async Task SendEmailAsync(string toEmail, string subject, string htmlMessage)
    {
        var mailMessage = new MailMessage
        {
            From = new MailAddress(_smtpSettings.SenderEmail, _smtpSettings.SenderName),
            Subject = subject,
            Body = htmlMessage,
            IsBodyHtml = true,
        };

        mailMessage.To.Add(toEmail);

        using var client = new SmtpClient(_smtpSettings.Server, _smtpSettings.Port);
        client.EnableSsl = true;
        client.Credentials = new NetworkCredential(_smtpSettings.Username, _smtpSettings.Password);

        await client.SendMailAsync(mailMessage);
    }
}