import mongoose from 'mongoose';
const { Schema } = mongoose;

const orderSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    product: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        rquired: true,
    }
})

export const Order = mongoose.model("Order", orderSchema)