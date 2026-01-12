import { User } from "../models/User";
import { Request, Response } from "express";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const signup = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'All Fields are Required' });
        }

        if (password.length < 7) {
            return res.status(400).json({ message: "Password must be at least 7 characters" });
        }
    
        const existingUser = await User.findOne({ email});
        if (existingUser) {
            return res.status(409).json({ message: 'user already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10)
    
        await User.create({ email, password:hashedPassword })
        res.status(201).json({ message: 'new user created'});
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Internal Server error" });
    }
}

export const signin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'All Fields are Required' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1d' });

        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined in .env');
        }

        res.status(200).json({ message: 'signIn successful', token });
    } catch (error) {
        console.error('SignIn error', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}