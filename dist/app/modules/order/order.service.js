"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = void 0;
const product_model_1 = require("../product/product.model");
const order_model_1 = require("./order.model");
const createOrderIntoDB = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const { product, quantity } = orderData;
    const foundProduct = yield product_model_1.Product.findById(product);
    if (!foundProduct) {
        throw new Error('Product not found');
    }
    if (foundProduct.quantity < quantity) {
        throw new Error('Insufficient stock available');
    }
    yield product_model_1.Product.findByIdAndUpdate(product, {
        $inc: { quantity: -quantity },
        $set: { inStock: foundProduct.quantity - quantity > 0 },
    }, { new: true });
    const totalPrice = foundProduct.price * quantity;
    const updatedData = Object.assign(Object.assign({}, orderData), { totalPrice });
    const result = yield order_model_1.Order.create(updatedData);
    return result;
});
const calculateRevenueFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const revenueData = yield order_model_1.Order.aggregate([
        //stage:1
        {
            $lookup: {
                from: 'products',
                localField: 'product',
                foreignField: '_id',
                as: 'productDetails',
            },
        },
        // stage:2
        { $unwind: '$productDetails' },
        //stage:3
        {
            $group: {
                _id: null,
                totalRevenue: {
                    $sum: { $multiply: ['$quantity', '$productDetails.price'] },
                },
            },
        },
        //stage:4
        {
            $project: {
                _id: 0,
                totalRevenue: 1,
            },
        },
    ]);
    return revenueData;
});
exports.OrderServices = {
    createOrderIntoDB,
    calculateRevenueFromDB,
};
