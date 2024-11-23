"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
const objectIdValidation = zod_1.z.custom((value) => {
    return mongoose_1.default.Types.ObjectId.isValid(value);
}, { message: 'Invalid ObjectId' });
const orderValidationSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .trim()
        .min(1, 'Email is required')
        .email({ message: 'Invalid email type' }),
    product: objectIdValidation,
    quantity: zod_1.z
        .number()
        .positive('Quantity must be a positive number')
        .min(1, 'Quantity is required'),
    totalPrice: zod_1.z
        .number()
        .min(1, 'Total price is required')
        .positive('Total price must be a positive number'),
});
exports.default = orderValidationSchema;
