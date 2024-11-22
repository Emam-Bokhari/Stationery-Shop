import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import ProductValidationSchema from './product.validation';
import config from '../../config';
import { ZodError } from 'zod';

const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const productData = req.body.product;

    // data validation by Zod
    const zodParsedData = ProductValidationSchema.parse(productData);

    const result = await ProductServices.createProductIntoDB(zodParsedData);

    // success response
    res.status(201).json({
      message: 'Product created successfully',
      success: true,
      data: result,
    });
  } catch (err: any) {
    // handle zod validation error
    if (err instanceof ZodError) {
      res.status(400).json({
        message: 'Validation failed',
        success: false,
        error: {
          name: 'ValidationError',
          errors: err.errors || null,
        },
        stack: config.node_env === 'development' ? err.stack : undefined,
      });
      return;
    }

    // general error response
    res.status(500).json({
      message: err.message || 'Internal server error',
      success: false,
      error: err,
      stack: config.node_env === 'development' ? err.stack : undefined,
    });
  }
};

const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const searchTerm = req.query.searchTerm;

    const result = await ProductServices.getAllProductsFromDB(
      searchTerm as string,
    );

    // success response
    res.status(200).json({
      message: 'Products retrieved successfully',
      status: true,
      data: result,
    });
  } catch (err: any) {
    // general error response
    res.status(500).json({
      message: err.message || 'Internal server error',
      status: false,
      error: err,
      stack: config.node_env === 'development' ? err.stack : undefined,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId = req.params.productId;

    const result = await ProductServices.getSingleProductFromDB(productId);

    // success response
    res.status(200).json({
      message: 'Product retrieved successfully',
      status: true,
      data: result,
    });

    // general error response
  } catch (err: any) {
    res.status(500).json({
      message: err.message || 'Internal server error',
      status: false,
      error: err,
      stack: config.node_env === 'development' ? err.stack : undefined,
    });
  }
};

const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId = req.params.productId;
    const updatedData = req.body;
    const result = await ProductServices.updateProductInDB(
      productId,
      updatedData,
    );

    // success response
    res.status(200).json({
      message: 'Product updated successfully',
      status: true,
      data: result,
    });
  } catch (err) {
    // general error response
    res.status(500).json({
      message: err.message || 'Internal server error',
      status: false,
      error: err,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
};
