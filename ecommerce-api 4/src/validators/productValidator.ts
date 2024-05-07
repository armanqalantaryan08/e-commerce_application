import { body } from 'express-validator';

export const createProductValidator = [
    body('name').trim().isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),
    body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer')
];
