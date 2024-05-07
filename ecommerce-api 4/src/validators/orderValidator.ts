import { body } from 'express-validator';

export const createOrderValidator = [
    body('customerId').notEmpty().withMessage('Customer ID is required'),
    body('products').isArray().withMessage('Products must be an array'),
    body('products.*.productId').notEmpty().withMessage('Product ID is required'),
    body('products.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive integer')
];
