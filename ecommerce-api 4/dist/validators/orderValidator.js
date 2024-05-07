"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderValidator = void 0;
const express_validator_1 = require("express-validator");
exports.createOrderValidator = [
    (0, express_validator_1.body)('customerId').notEmpty().withMessage('Customer ID is required'),
    (0, express_validator_1.body)('products').isArray().withMessage('Products must be an array'),
    (0, express_validator_1.body)('products.*.productId').notEmpty().withMessage('Product ID is required'),
    (0, express_validator_1.body)('products.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive integer')
];
