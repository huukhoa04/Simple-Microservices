import { Schema, model } from 'mongoose';

const OrderSchema = new Schema({
    productName: String,
    quantity: Number,
    userId: Number // Reference to the User service
});

export default model('Order', OrderSchema);