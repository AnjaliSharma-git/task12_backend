// utils/email.js
const nodemailer = require('nodemailer');

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'anjali.example123@gmail.com', // Replace with your Gmail email address
        pass: 'rzsf hkdg bitg hrcb'      // Replace with your App Password
    }
});

// Send an email for password reset
const sendPasswordResetEmail = async (toEmail, resetToken) => {
    const mailOptions = {
        from: 'anjali.example123@gmail.com', // Sender address
        to: toEmail,                  // Receiver address
        subject: 'Password Reset Request',  // Subject line
        text: `Click this link to reset your password: https://anjali-password-reset.netlify.app/reset-password/${resetToken}` // Email body
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email: ', error);
    }
};

module.exports = { sendPasswordResetEmail };
