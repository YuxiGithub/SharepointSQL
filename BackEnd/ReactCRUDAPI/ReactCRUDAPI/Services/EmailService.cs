using System;
using System.Net.Mail;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ReactCRUDAPI.Services
{
    public class EmailService
    {
        public static void SendEmail(string subject, string message)
        {
            try
            {
                MailMessage newMail = new MailMessage();
                // use the Gmail SMTP Host
                SmtpClient client = new SmtpClient("smtp.gmail.com");

                // Follow the RFS 5321 Email Standard
                newMail.From = new MailAddress("lncgomz@gmail.com", "Leoncio Gómez");

                newMail.To.Add("gomaldavid@gmail.com");// declare the email subject

                newMail.Subject = subject; // use HTML for the email body

                newMail.IsBodyHtml = true; newMail.Body = message;

                // enable SSL for encryption across channels
                client.EnableSsl = true;
                // Port 465 for SSL communication
                client.Port = 587;
                // Provide authentication information with Gmail SMTP server to authenticate your sender account
                client.Credentials = new System.Net.NetworkCredential("lncgomz@gmail.com", "zfdpiyprcwqbmngp");

                client.Send(newMail); // Send the constructed mail
                Console.WriteLine("Email Sent");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error -" + ex);
            }

        }
    }
}