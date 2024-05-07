import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/Users';

const router = express.Router();

router.post('/signup', async (req: Request, res: Response) => {
    try {
        const {
            name,
            password
        } = req.body;
        const existingUser = await User.findOne({ name });

        if (existingUser) {
            return res.status(401).json({
                msg: 'User already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name, password: hashedPassword
        });
        res.json({
            success: true,
            ...newUser.toObject()
        });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
});

router.post('/signin', async (req: Request, res: Response) => {
    try {
        const { name, password } = req.body;
        const user: IUser | null = await User.findOne({ name });

        if (!user) {
            return res.status(404).json({ success: false, msg: 'User not found' });
        }

        const isPasswordsEqual = await bcrypt.compare(password, user.password.toString());
        if (isPasswordsEqual ) {
            const token = jwt.sign(
                {...(user as IUser)},
                process.env.JWT_SECRET || 'secret',
                {expiresIn: '3h'}
            );
            res.json({success: true, token});
        } else {
            res.status(401).json({ success: false, msg: 'Invalid password...' });
        }
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;