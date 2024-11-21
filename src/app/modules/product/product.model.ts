import mongoose from "mongoose";
import { ProductCategory } from "./product.interface";
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        enum: Object.values(ProductCategory),
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    inStock: {
        type: Boolean,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
},
    { timestamps: true, }
)

export const Product = mongoose.model("Product", productSchema)