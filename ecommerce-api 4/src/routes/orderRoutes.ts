import express, { Request, Response } from 'express';
import Order from '../models/Order';
import {createOrderValidator} from "../validators/orderValidator";
import {validationResult} from "express-validator";
import {authenticateToken} from "../middleware/authMiddleware";

const router = express.Router();

router.post('/orders', authenticateToken, createOrderValidator, async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json(order);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
});


router.get('/orders/:customerId', authenticateToken, async (req: Request, res: Response) => {
    const {
        customerId
    } = req.params;
    try {
        const orders = await Order.find({
            customerId
        });
        res.json(orders);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
});

router.get('/orders/:id', authenticateToken, async (req: Request, res: Response) => {
    const {
        id
    } = req.params;
    try {
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({
                message: 'Order not found'
            });
        }
        res.json(order);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
});

export default router;
