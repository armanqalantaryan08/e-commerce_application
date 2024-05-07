"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductValidator = void 0;
const express_validator_1 = require("express-validator");
exports.createProductValidator = [
    (0, express_validator_1.body)('name').trim().isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),
    (0, express_validator_1.body)('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
    (0, express_validator_1.body)('price').isNumeric().withMessage('Price must be a number'),
    (0, express_validator_1.body)('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer')
];
