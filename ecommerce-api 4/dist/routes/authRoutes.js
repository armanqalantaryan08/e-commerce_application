"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Users_1 = __importDefault(require("../models/Users"));
const router = express_1.default.Router();
router.post('/signup', async (req, res) => {
    try {
        const { name, password } = req.body;
        console.log(req.body);
        const existingUser = await Users_1.default.findOne({ name });
        if (existingUser) {
            return res.status(401).json({
                msg: 'User already exists'
            });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = await Users_1.default.create({
            name, password: hashedPassword
        });
        res.json({
            success: true,
            ...newUser.toObject()
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
});
router.post('/signin', async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = await Users_1.default.findOne({ name });
        if (!user) {
            return res.status(404).json({ success: false, msg: 'User not found' });
        }
        const isPasswordsEqual = await bcrypt_1.default.compare(password, user.password.toString());
        if (isPasswordsEqual) {
            const token = jsonwebtoken_1.default.sign({ ...user }, process.env.JWT_SECRET || 'secret', { expiresIn: '3h' });
            res.json({ success: true, token });
        }
        else {
            res.status(401).json({ success: false, msg: 'Invalid password...' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
