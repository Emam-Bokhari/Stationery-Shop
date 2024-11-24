import { Request, Response } from 'express';
import { OrderServices } from './order.service';
import config from '../../config';
import orderValidationSchema from './order.validation';

const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderData = req.body.order;

    // data validation by Zod
    const zodParsedData = orderValidationSchema.parse(orderData);

    const result = await OrderServices.createOrderIntoDB(zodParsedData);

    // success response
    res.status(201).json({
      message: 'Order created successfully',
      status: true,
      data: result,
    });
  } catch (err: any) {
    // product not found error response
    if (err.message === 'Product not found') {
      res.status(404).json({
        message: err.message,
        status: false,
      });
    } else if (err.message === 'Insufficient stock available') {
      res.status(400).json({
        message: err.message,
        status: false,
      });
    } else {
      // general error response
      res.status(500).json({
        message: err.message || 'Internal server error',
        status: false,
        error: err,
        stack: config.node_env === 'development' ? err.stack : undefined,
      });
    }
  }
};

const calculateRevenue = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await OrderServices.calculateRevenueFromDB();

    // no data found error response
    if (!result) {
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

export const OrderControllers = {
  createOrder,
  calculateRevenue,
};
