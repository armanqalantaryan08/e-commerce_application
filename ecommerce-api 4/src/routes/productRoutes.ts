import express, { Request, Response } from 'express';
import Product from '../models/Product';
import {createProductValidator} from "../validators/productValidator";
import {validationResult} from "express-validator";
import {authenticateToken} from "../middleware/authMiddleware";

const router = express.Router();

router.post('/products',  createProductValidator, async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/products', async (req: Request, res: Response) => {
    try {
        const {
            page = 1,
            limit = 10
        } = req.query;
        const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
        const products = await Product.find().skip(skip).limit(parseInt(limit as string));
        res.json(products);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});


router.put('/products/:id', authenticateToken, async (req: Request, res: Response) => {
    const {
        id
    } = req.params;
    try {
        const product = await Product.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true
            });
        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }
        res.json(product);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
});


router.delete('/products/:id', authenticateToken, async (req: Request, res: Response) => {
    const {
        id
    } = req.params;
    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }
        res.json({
            message: 'Product deleted successfully'
        });
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
});


export default router;

