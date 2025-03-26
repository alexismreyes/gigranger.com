const { User } = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }, // 🚀 Exclude password field
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }, // 🚀 Exclude password field
    });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, roleId, email, password, resumeUrl } =
      req.body;

    const userExists = await User.findOne({ where: { email } });
    if (userExists)
      return res
        .status(400)
        .json({ error: 'User with that email already exists' });

    hashedPassword = await bcryptjs.hash(password, 10);
    const user = {
      firstName,
      lastName,
      email,
      roleId,
      password: hashedPassword,
      resumeUrl,
    };
    const newUser = await User.create(user);

    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { firstName, lastName, roleId, email, password, resumeUrl } =
      req.body;

    // Prepare updated user data
    const updatedUser = {
      firstName,
      lastName,
      email,
      roleId,
      resumeUrl,
    };

    // Hash password if provided
    if (password) {
      updatedUser.password = await bcryptjs.hash(password, 10);
    }

    // Update user
    await user.update(updatedUser);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (user) {
      await user.destroy();
      res.status(200).json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
