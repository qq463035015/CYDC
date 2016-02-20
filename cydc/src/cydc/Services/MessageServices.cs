using MailKit.Net.Smtp;
using Microsoft.Extensions.Configuration;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cydc.Services
{
    // This class is used by the application to send Email and SMS
    // when you turn on two-factor authentication in ASP.NET Identity.
    // For more details see this link http://go.microsoft.com/fwlink/?LinkID=532713
    public class AuthMessageSender : IEmailSender, ISmsSender
    {
        private readonly IConfigurationRoot _config;

        public AuthMessageSender(IConfigurationRoot config)
        {
            _config = config;
        }

        private string GetConfig(string key)
        {
            return _config.Get($"Service:Email:{key}");
        }

        private T GetConfig<T>(string key)
        {
            return _config.Get<T>($"Service:Email:{key}");
        }

        public async Task SendEmailAsync(string email, string subject, string message)
        {
            var mailMessage = new MimeMessage();
            mailMessage.From.Add(new MailboxAddress(GetConfig("FromDisplayName"), GetConfig("From")));
            mailMessage.To.Add(new MailboxAddress(email, email));
            mailMessage.Subject = subject;
            mailMessage.Body = new TextPart("html") { Text = message };

            using (var client = new SmtpClient())
            {
                await client.ConnectAsync(GetConfig("SmtpHost"), GetConfig<int>("SmtpPort"), GetConfig<bool>("UseSSL")).ConfigureAwait(false);
                await client.AuthenticateAsync(GetConfig("UserName"), GetConfig("Password")).ConfigureAwait(false);
                await client.SendAsync(mailMessage).ConfigureAwait(false);
                await client.DisconnectAsync(true);
            }
        }

        public Task SendSmsAsync(string number, string message)
        {
            // Plug in your SMS service here to send a text message.
            return Task.FromResult(0);
        }
    }
}
