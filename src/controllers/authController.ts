import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/authModel';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET: string = process.env.JWT_SECRET || 'secret';

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
    // Send user details in the response
    res.status(500).send({message:"User Successfully registered"}).json({
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

export const login = async(req:Request,res:Response):Promise<void> => {
  try{
    const { email, password }: { email: string; password: string } = req.body;

    // Find the user in the database
    const user = await UserModel.findOne({email:email});

    if(!user){
      res.status(401).json({error:"User does not exist"});
      return;
    };

    if(!user.password){
      res.status(401).json({error:"User does not exist"});
      return;
    };

    const isPasswordValid = await bcrypt.compare(password,user.password.toString());

    if(!isPasswordValid){
      res.status(401).json({error:"Invalid password"});
    }
    else{
      const token = jwt.sign({id:user._id},JWT_SECRET,{expiresIn:"2d"});
      res.status(200).json({status:"success",
      data:{"token":token,"expiresIn":"7200"}});
    }
    
  } catch(err){
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }

}