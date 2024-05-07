"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabase = void 0;
const Product_1 = __importDefault(require("../../models/Product"));
const Order_1 = __importDefault(require("../../models/Order"));
const data_1 = require("./data");
async function seedDatabase() {
    try {
        await Product_1.default.insertMany(data_1.products);
        await Order_1.default.insertMany(data_1.orders);
        console.log('Database seeded successfully');
    }
    catch (error) {
        console.error('Error seeding database:', error);
    }
}
exports.seedDatabase = seedDatabase;
