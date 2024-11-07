const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'anjali.example123@gmail.com', 
        pass: 'rzsf hkdg bitg hrcb'     
    }
});

const sendPasswordResetEmail = async (toEmail, resetToken) => {
    const mailOptions = {
        from: 'anjali.example123@gmail.com', 
        to: toEmail,                  
        subject: 'Password Reset Request',  
        text: `Click this link to reset your password: https://anjali-password-reset.netlify.app/reset-password/${resetToken}` 
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email: ', error);
    }
};

module.exports = { sendPasswordResetEmail };
