import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create Gmail transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD
    }
  });
};

// Send email to single user
export const sendEmail = async (to, subject, htmlContent) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `CCPC <${process.env.GMAIL_USER}>`,
      to: to,
      subject: subject,
      html: htmlContent
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

// Send email to multiple users
export const sendBulkEmail = async (recipients, subject, htmlContent) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `CCPC <${process.env.GMAIL_USER}>`,
      to: recipients.join(','), // Join all emails with comma
      subject: subject,
      html: htmlContent
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Bulk email sent: ' + info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending bulk email:', error);
    return { success: false, error: error.message };
  }
};

// Generate welcome email HTML template
export const generateWelcomeEmail = (user) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .details { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
        .detail-row { margin: 10px 0; }
        .label { font-weight: bold; color: #667eea; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Welcome to Code Crafters Programming Club!</h1>
        </div>
        <div class="content">
          <p>Hi <strong>${user.name}</strong>,</p>
          <p>Congratulations! You are successfully registered in the <strong>Code Crafters Programming Club</strong>.</p>
          
          <div class="details">
            <h3>Your Registration Details:</h3>
            <div class="detail-row"><span class="label">Name:</span> ${user.name}</div>
            <div class="detail-row"><span class="label">Email:</span> ${user.email}</div>
            <div class="detail-row"><span class="label">Phone:</span> ${user.phone}</div>
            <div class="detail-row"><span class="label">Department:</span> ${user.password}</div>
            <div class="detail-row"><span class="label">Registration No:</span> ${user.reg_no}</div>
            <div class="detail-row"><span class="label">Batch:</span> ${user.batch}</div>
            <div class="detail-row"><span class="label">Skills:</span> ${user.skills}</div>
            <div class="detail-row"><span class="label">Preferred Language:</span> ${user.preferedLanguage}</div>
          </div>

          <p>We're excited to have you as part of our programming community. Get ready to explore the cosmos of code!</p>
          
          <p>Best regards,<br><strong>Code Crafters Programming Club Team</strong></p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Code Crafters Programming Club. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Generate bulk welcome email HTML template
export const generateBulkWelcomeEmail = () => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Welcome to Code Crafters Programming Club!</h1>
        </div>
        <div class="content">
          <p>Hi all,</p>
          <p>Congratulations! You are successfully registered in the <strong>Code Crafters Programming Club</strong>.</p>
          
          <p>We're excited to have you all as part of our elite programming community. Get ready to explore the cosmos of code together!</p>
          
          <p>Check your individual email for your complete registration details.</p>
          
          <p>Best regards,<br><strong>Code Crafters Programming Club Team</strong></p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Code Crafters Programming Club. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
