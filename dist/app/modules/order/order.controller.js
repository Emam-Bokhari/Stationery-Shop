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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderControllers = void 0;
const order_service_1 = require("./order.service");
const config_1 = __importDefault(require("../../config"));
const order_validation_1 = __importDefault(require("./order.validation"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body.order;
        // data validation by Zod
        const zodParsedData = order_validation_1.default.parse(orderData);
        const result = yield order_service_1.OrderServices.createOrderIntoDB(zodParsedData);
        // success response
        res.status(201).json({
            message: 'Order created successfully',
            status: true,
            data: result,
        });
    }
    catch (err) {
        // product not found error response
        if (err.message === 'Product not found') {
            res.status(404).json({
                message: err.message,
                status: false,
            });
        }
        else if (err.message === 'Insufficient stock available') {
            res.status(400).json({
                message: err.message,
                status: false,
            });
        }
        else {
            // general error response
            res.status(500).json({
                message: err.message || 'Internal server error',
                status: false,
                error: err,
                stack: config_1.default.node_env === 'development' ? err.stack : undefined,
            });
        }
    }
});
const calculateRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_service_1.OrderServices.calculateRevenueFromDB();
        // no data found error response
        if (!result ||
            (typeof result === 'object' && Object.keys(result.length === 0))) {
            res.status(404).json({
                message: 'No revenue data found',
                status: false,
                data: null,
            });
            return;
        }
        // success response
        res.status(200).json({
            message: 'Revenue calculated successfully',
            status: true,
            data: result,
        });
    }
    catch (err) {
        // general error response
        res.status(500).json({
            message: err.message || 'Internal server error',
            status: false,
            error: err,
            stack: config_1.default.node_env === 'development' ? err.stack : undefined,
        });
    }
});
exports.OrderControllers = {
    createOrder,
    calculateRevenue,
};
