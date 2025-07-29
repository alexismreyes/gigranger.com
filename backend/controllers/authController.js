const { User, EmailVerification } = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const moment = require('moment');
const { publishToQueue } = require('../utils/rabbitMQPublisher');

exports.login = async (req, res) => {
  const JWT_SECRET = process.env.JWT_SECRET;

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    //console.log(user);

    if (!user)
      return res
        .status(401)
        .json({ error: 'auth.userNotFound', message: 'User not found' });

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        error: 'auth.invalidPassword',
        message: 'Invalid Password!!!',
      });
    }

    const token = jwt.sign({ id: user.id, roleId: user.roleId }, JWT_SECRET, {
      expiresIn: '6h',
    });

    return res.status(200).json({ user, token });
  } catch (error) {
    console.error('Error ->', error);
    res.status(400).json({ error: error.message });
  }
};

exports.requestVerification = async (req, res) => {
  try {
    const { firstName, lastName, roleId, email, password } = req.body;
    /* console.log(firstName, lastName, roleId, email, password); */

    // 1. Check if user already exists
    const user = await User.findOne({ where: { email } });
    if (user)
      return res.status(400).json({
        error: 'auth.emailExists',
        message: 'Email already exists',
      });

    // Check if verification already exists (optional: clean up old ones)
    await EmailVerification.destroy({ where: { email } });

    // Generate a new token
    const token = crypto.randomBytes(32).toString('hex');

    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 hrs

    // Save to EmailVerification table
    await EmailVerification.create({
      email,
      token,
      expiresAt,
      firstName,
      lastName,
      roleId,
      password, // unhashed here, will hash when verified
    });

    // Send verification email
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const link = `${frontendUrl}/verifyemail?token=${token}`;

    //previous approach direct mailing
    //await sendVerificationEmail(email, link);

    await publishToQueue({
      type: 'verifyEmail',
      to: email,
      link,
    });

    return res.status(200).json({ message: 'Verification email sent!' });
  } catch (error) {
    //res.status(400).json({ error: error.message });
    console.error('Register error:', error);
    return res.status(500).json({ error: 'Failed to start registration' });
  }
};

exports.verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    if (!token) {
      return res.status(400).json({ error: 'Invalid or missing token' });
    }

    const verification = await EmailVerification.findOne({ where: { token } });

    if (!verification) {
      return res
        .status(404)
        .json({
          error: 'auth.tokenNotFound',
          message: 'Token not found or already used',
        });
    }

    if (verification.verified === 1) {
      return res.status(400).json({ error: 'Email already verified' });
    }

    if (new Date(verification.expiresAt) < new Date()) {
      return res.status(400).json({ error: 'Token expired' });
    }

    const { email, firstName, lastName, password, roleId } = verification;

    // Check if user already exists (double safety)
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        error: 'auth.userAlreadyExists',
        message: 'User already exists',
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      roleId,
    });

    // Mark as verified or optionally delete the verification record
    verification.verified = 1;
    await verification.save();

    //await EmailVerification.destroy({ where: { email } }); //destroy the record

    return res.status(201).json({
      message: 'verifiedEmail',
      rawMessage: 'Email verified and user created successfully!',
    });
  } catch (error) {
    console.error('Email verification error:', error);
    return res
      .status(500)
      .json({ error: 'Something went wrong during verification' });
  }
};
