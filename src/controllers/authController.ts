import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/authModel';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET: string = process.env.JWT_SECRET || 'secret';

interface SignUpRequest extends Request {
  user: {
    _id: string;
    username: string;
    email: string;
  };
}

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new UserModel({
      username,
      password: hashedPassword,
      email,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Generate a JWT token
    const token = jwt.sign(
      { _id: savedUser._id, username: savedUser.username, email: savedUser.email },
      JWT_SECRET,
      { expiresIn: '72h' } // Set the expiration time as needed
    );

    // Send the token and user details in the response
    res.json({
      token,
      user: {
        _id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
      },
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
