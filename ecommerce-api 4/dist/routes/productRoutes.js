"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Product_1 = __importDefault(require("../models/Product"));
const productValidator_1 = require("../validators/productValidator");
const express_validator_1 = require("express-validator");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post('/products', productValidator_1.createProductValidator, async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        console.log(req.body);
        const product = new Product_1.default(req.body);
        await product.save();
        res.status(201).json(product);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get('/products', async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const products = await Product_1.default.find().skip(skip).limit(parseInt(limit));
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.put('/products/:id', authMiddleware_1.authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product_1.default.findByIdAndUpdate(id, req.body, {
            new: true
        });
        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }
        res.json(product);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
router.delete('/products/:id', authMiddleware_1.authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product_1.default.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }
        res.json({
            message: 'Product deleted successfully'
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
exports.default = router;
