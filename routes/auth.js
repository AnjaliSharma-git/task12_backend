const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); 
const crypto = require('crypto');
const { sendPasswordResetEmail } = require('../utils/email'); 
const router = express.Router();


router.post('/api/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000;
        await user.save();
        await sendPasswordResetEmail(email, token);
        res.status(200).json({ message: 'Password reset link sent to email' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error processing request' });
    }
});

router.post('/api/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() } 
        });
        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
        res.status(200).json({ message: 'Password has been successfully reset' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error resetting password' });
    }
});

module.exports = router;
