import mongoose, { Schema, Document } from 'mongoose';

export interface IOrderProduct extends Document {
    productId: mongoose.Types.ObjectId;
    quantity: number;
}

export interface IOrder extends Document {
    products: IOrderProduct[];
    total: number;
}

const OrderProductSchema: Schema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

const OrderSchema: Schema = new Schema({
    products: [OrderProductSchema],
    total: {
        type: Number,
        required: true
    }
});

export default mongoose.model<IOrder>('Order', OrderSchema);
