import { ObjectId } from 'mongodb';

export const products = [
    { _id: new ObjectId(), name: 'Product 1', description: 'Description 1', price: 10, stock: 100 },
    { _id: new ObjectId(), name: 'Product 2', description: 'Description 2', price: 20, stock: 50 },
    { _id: new ObjectId(), name: 'Product 3', description: 'Description 3', price: 30, stock: 200 }
];

export const orders = [
    { products: [{ productId: products[0]._id, quantity: 2 }], total: 20 },
    { products: [{ productId: products[1]._id, quantity: 1 }], total: 20 }
];
