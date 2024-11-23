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
exports.ProductControllers = void 0;
const product_service_1 = require("./product.service");
const product_validation_1 = __importDefault(require("./product.validation"));
const config_1 = __importDefault(require("../../config"));
const zod_1 = require("zod");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body.product;
        // data validation by Zod
        const zodParsedData = product_validation_1.default.parse(productData);
        const result = yield product_service_1.ProductServices.createProductIntoDB(zodParsedData);
        // success response
        res.status(201).json({
            message: 'Product created successfully',
            success: true,
            data: result,
        });
    }
    catch (err) {
        // handle zod validation error
        if (err instanceof zod_1.ZodError) {
            res.status(400).json({
                message: 'Validation failed',
                success: false,
                error: {
                    name: 'ValidationError',
                    errors: err.errors || null,
                },
                stack: config_1.default.node_env === 'development' ? err.stack : undefined,
            });
            return;
        }
        // general error response
        res.status(500).json({
            message: err.message || 'Internal server error',
            success: false,
            error: err,
            stack: config_1.default.node_env === 'development' ? err.stack : undefined,
        });
    }
});
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm;
        const result = yield product_service_1.ProductServices.getAllProductsFromDB(searchTerm);
        // not found error response
        if (!result || result.length === 0) {
            res.status(404).json({
                message: 'Product not found',
                status: false,
                data: null,
            });
            return;
        }
        // success response
        res.status(200).json({
            message: 'Products retrieved successfully',
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
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const result = yield product_service_1.ProductServices.getSingleProductFromDB(productId);
        // not found error response
        if (!result) {
            res.status(404).json({
                message: 'Product not found',
                status: false,
                data: null,
            });
            return;
        }
        // success response
        res.status(200).json({
            message: 'Product retrieved successfully',
            status: true,
            data: result,
        });
        // general error response
    }
    catch (err) {
        res.status(500).json({
            message: err.message || 'Internal server error',
            status: false,
            error: err,
            stack: config_1.default.node_env === 'development' ? err.stack : undefined,
        });
    }
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const updatedData = req.body;
        const result = yield product_service_1.ProductServices.updateProductInDB(productId, updatedData);
        // not found error response
        if (!result) {
            res.status(404).json({
                message: 'Product not fond',
                status: false,
                data: null,
            });
            return;
        }
        // success response
        res.status(200).json({
            message: 'Product updated successfully',
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
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const result = yield product_service_1.ProductServices.deleteProductFromDB(productId);
        // not found error response
        if (result.matchedCount === 0) {
            res.status(404).json({
                message: 'Product not found',
                status: false,
                data: null,
            });
            return;
        }
        // success response
        res.status(200).json({
            message: 'Product deleted successfully',
            status: true,
            data: {},
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message || 'Internal server error',
            status: false,
            error: err,
            stack: config_1.default.node_env === 'development' ? err.stack : undefined,
        });
    }
});
exports.ProductControllers = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
};
