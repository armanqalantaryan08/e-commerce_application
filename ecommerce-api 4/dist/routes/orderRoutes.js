"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Order_1 = __importDefault(require("../models/Order"));
const orderValidator_1 = require("../validators/orderValidator");
const express_validator_1 = require("express-validator");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post('/orders', authMiddleware_1.authenticateToken, orderValidator_1.createOrderValidator, async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    try {
        const order = new Order_1.default(req.body);
        await order.save();
        res.status(201).json(order);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
router.get('/orders/:customerId', authMiddleware_1.authenticateToken, async (req, res) => {
    const { customerId } = req.params;
    try {
        const orders = await Order_1.default.find({
            customerId
        });
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
router.get('/orders/:id', authMiddleware_1.authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order_1.default.findById(id);
        if (!order) {
            return res.status(404).json({
                message: 'Order not found'
            });
        }
        res.json(order);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
exports.default = router;
