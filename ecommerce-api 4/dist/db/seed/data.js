"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orders = exports.products = void 0;
const mongodb_1 = require("mongodb");
exports.products = [
    { _id: new mongodb_1.ObjectId(), name: 'Product 1', description: 'Description 1', price: 10, stock: 100 },
    { _id: new mongodb_1.ObjectId(), name: 'Product 2', description: 'Description 2', price: 20, stock: 50 },
    { _id: new mongodb_1.ObjectId(), name: 'Product 3', description: 'Description 3', price: 30, stock: 200 }
];
exports.orders = [
    { products: [{ productId: exports.products[0]._id, quantity: 2 }], total: 20 },
    { products: [{ productId: exports.products[1]._id, quantity: 1 }], total: 20 }
];
