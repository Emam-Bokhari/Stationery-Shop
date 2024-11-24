"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const product_interface_1 = require("./product.interface");
const { Schema } = mongoose_1.default;
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
        enum: Object.values(product_interface_1.TProductCategory),
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
        default: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
// query middleware
productSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
productSchema.pre('findOne', function (next) {
    this.findOne({ isDeleted: { $ne: true } });
    next();
});
productSchema.pre('find', function (next) {
    this.select('-isDeleted -__v');
    next();
});
productSchema.pre('findOne', function (next) {
    this.select('-isDeleted -__v');
    next();
});
productSchema.pre("findOneAndUpdate", function (next) {
    this.select('-__v');
    next();
});
// aggregate middleware
productSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});
productSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $project: { isDeleted: 0 } });
    next();
});
exports.Product = mongoose_1.default.model('Product', productSchema);
