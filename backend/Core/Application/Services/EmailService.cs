using Microsoft.Extensions.Options;
using MimeKit;
using KONSUME.Models.Entities;
using KONSUME.Core.Application.Interfaces.Services;
using KONSUME.Models;

using MailKit.Net.Smtp;
using KONSUME.Core.Domain.Entities;
using System.Text;
using Google;
using DaticianProj.Core.Domain.Entities;

namespace KONSUME.Core.Application.Services
{
    public class EmailService : IEmailService
    {
        private readonly IWebHostEnvironment _hostenv;
        private readonly EmailConfiguration _emailConfiguration;
        public EmailService(IWebHostEnvironment hostenv, IOptions<EmailConfiguration> emailConfiguration)
        {
            _hostenv = hostenv;
            _emailConfiguration = emailConfiguration.Value;
        }

        public async Task<BaseResponse> SendProfileUpdateNotificationAsync(Profile profile)
        {
            var mailRecieverRequestDto = new MailRecieverDto
            {
                Email = profile.User.Email,
                Name = profile.User.FirstName + " " + profile.User.LastName,
            };

            string emailBody = $"<p>Hello {profile.User.FirstName},</p>\r\n" +
                                $"<p>Your profile has been successfully updated on Konsume!</p>\r\n" +
                                $"<p>We wanted to let you know that we have received and processed your recent changes. Our AI-driven platform is now even better equipped to " +
                                $"provide you with personalized meal plans and recommendations tailored to your updated profile.</p>\r\n" +
                                $"<p>If you have any further changes or need assistance, feel free to <a href='reachkonsume@gmail.com'>contact our support team</a>.</p>\r\n" +
                                $"<p>Thank you for being a part of Konsume!</p>\r\n" +
                                $"<p>Best regards,<br/>Hasbiy from Konsume</p>\r\n" +
                                $"<img src=\"https://drive.google.com/uc?export=view&id=1KH6x4h7J0PCGE7yDiJj4YUBDYPHPBd3B\" alt=\"Konsume Logo\" " +
                                $"style=\"display: block; margin: 0 auto;\">\r\n";

            var mailRequest = new MailRequests
            {
                Body = emailBody,
                Title = "Profile Update Confirmation",
                HtmlContent = emailBody
            };

            await SendEmailAsync(mailRecieverRequestDto, mailRequest);

            return new BaseResponse
            {
                Message = "Profile update notification sent successfully",
                IsSuccessful = true,
            };
        }

        public async Task<BaseResponse> SendNotificationToRestaurantAsync(Restaurant restaurant)
        {
            var mailRecieverRequestDto = new MailRecieverDto
            {
                Email = restaurant.Email,
                Name = restaurant.Name
            };

            string emailBody = $"<p>Hello {restaurant.Name},</p>\r\n" +
                                $"<p>Welcome to Konsume! We’re thrilled to have you on board as part of our network.</p>\r\n" +
                                $"<p>We're excited to let you know that your restaurant has been added to our waitlist. We appreciate your patience as we finalize the details" +
                                $", and we’ll notify you as soon as your restaurant is live on our platform.</p>\r\n" +
                                $"<p>As a Konsume partner, you'll have access to our cutting-edge platform that connects your dishes with the right customers.</p>\r\n" +
                                $"<p>At Konsume, we’re all about connecting great food with the people who love it. As a valued restaurant partner, you’ll have access to a" +
                                $" platform that helps showcase your dishes to the right audience. Our smart technology makes it easy to manage your menu, attract new customers, and grow your brand.</p>\r\n" +
                                $"<p>In the meantime, get ready to revolutionize your restaurant’s outreach with personalized meal recommendations, AI-powered food analysis, and more.</p>\r\n" +
                                $"<p>We’ll be in touch soon! <a href='https://konsume-web-yzto.vercel.app/'>Explore what Konsume is all about</a> to see what’s ahead for your restaurant.</p>\r\n" +
                                $"<p>Feel free to reach out to us through our email at <a href=\"mailto:reachkonsume@gmail.com\">reachkonsume@gmail.com</a> if you have any questions or inquiries.</p>\r\n" +
                                $"<p>Best regards,<br/>Hasbiy from Konsume</p>\r\n" +
                                $"<img src=\"https://drive.google.com/uc?export=view&id=1KH6x4h7J0PCGE7yDiJj4YUBDYPHPBd3B\" alt=\"Konsume Logo\" style=\"display: block; margin: 0 auto;\">\r\n";


            var mailRequest = new MailRequests
            {
                Body = emailBody,
                Title = "WELCOME TO KONSUME",
                HtmlContent = emailBody
            };

            await SendEmailAsync(mailRecieverRequestDto, mailRequest);

            return new BaseResponse
            {
                Message = "Notification sent successfully",
                IsSuccessful = true,
            };
        }


        public async Task<BaseResponse> SendNotificationToUserAsync(Profile profile)
        {
            var mailRecieverRequestDto = new MailRecieverDto
            {
                Email = profile.User.Email,
                Name = profile.User.FirstName + " " + profile.User.LastName,
            };

            string emailBody = $"<p>Hello {profile.User.FirstName},</p>\r\n" +
                                $"<p>Welcome to Konsume! We’re thrilled to have you join our community.</p>\r\n" +
                                $"<p>Konsume is here to revolutionize your nutrition journey with our AI-driven platform. Whether you want to lose weight," +
                                $" build muscle, or manage specific health needs, we’ve got you covered. Our smart technology tailors meal plans just for you," +
                                $" making healthy eating easy and enjoyable.</p>\r\n" +
                                $"<p>No more endless searching for meal ideas! With Konsume, you'll get customized meal and snack recommendations that fit your" +
                                $" goals. Plus, our cool image recognition feature lets you snap a photo of your food, and our AI will analyze its nutritional" +
                                $" content. Simple, right?</p>\r\n" +
                                $"<p>Ready to get started? <a href='https://konsume-web-yzto.vercel.app/auth/login'>Log in to your dashboard</a> and begin your personalized nutrition " +
                                $"journey today.</p>\r\n" +
                                $"<p>Best regards,<br/>Hasbiy from Konsume</p>\r\n" +
                                $"<img src=\"https://drive.google.com/uc?export=view&id=1KH6x4h7J0PCGE7yDiJj4YUBDYPHPBd3B\" alt=\"Konsume Logo\" " +
                                $"style=\"display: block; margin: 0 auto;\">\r\n";


            var mailRequest = new MailRequests
            {
                Body = emailBody,
                Title = "WELCOME TO KONSUME",
                HtmlContent = emailBody
            };

            await SendEmailAsync(mailRecieverRequestDto, mailRequest);

            return new BaseResponse
            {
                Message = "Notification sent successfully",
                IsSuccessful = true,
            };
        }

        public Task SendEmailClient(string msg, string title, string email)
        {
            if (string.IsNullOrEmpty(msg))
            {
                Console.WriteLine("Error: Email message content is null or empty.");
                throw new ArgumentNullException(nameof(msg), "Email message content cannot be null or empty");
            }

            var message = new MimeMessage();
            message.To.Add(MailboxAddress.Parse(email));
            message.From.Add(new MailboxAddress(_emailConfiguration.EmailSenderName, _emailConfiguration.EmailSenderAddress));
            message.Subject = title;

            message.Body = new TextPart("html")
            {
                Text = msg
            };

            using (var client = new SmtpClient())
            {
                try
                {
                    Console.WriteLine("Inside email client");
                    client.Connect(_emailConfiguration.SMTPServerAddress, _emailConfiguration.SMTPServerPort, true);
                    client.AuthenticationMechanisms.Remove("XOAUTH2");
                    client.Authenticate(_emailConfiguration.EmailSenderAddress, _emailConfiguration.EmailSenderPassword);
                    var xxx = client.Send(message);
                    var ppp = xxx;
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error occurred in email client: {ex.Message}", DateTime.UtcNow.ToLongTimeString());
                    throw;
                }
                finally
                {
                    client.Disconnect(true);
                    client.Dispose();
                }
            }
            return Task.CompletedTask;
        }


        public async Task<bool> SendEmailAsync(MailRecieverDto model, MailRequests request)
        {
            try
            {
                Console.WriteLine("Calling email client");
                string buildContent = $"Dear {model.Name}," +
                                            $"<p>{request.Body}</p>";

                if (string.IsNullOrWhiteSpace(request.HtmlContent))
                {
                    throw new ArgumentNullException(nameof(request.HtmlContent), "Email content cannot be null or empty");
                }

                await SendEmailClient(request.HtmlContent, request.Title, model.Email);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("There was an error while sending email");
            }
        }


       

    }


}
