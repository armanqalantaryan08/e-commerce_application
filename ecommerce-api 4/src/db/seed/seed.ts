import Product from '../../models/Product';
import Order from '../../models/Order';
import { products, orders } from './data';

export async function seedDatabase() {
    try {
        await Product.insertMany(products);

        await Order.insertMany(orders);

        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}
