import { Product } from '../product/product.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (orderData: TOrder) => {
  const { product, quantity } = orderData;

  const foundProduct = await Product.findById(product);

  if (!foundProduct) {
    throw new Error('Product not found');
  }

  if (foundProduct.quantity < quantity) {
    throw new Error('Insufficient stock available');
  }

  await Product.findByIdAndUpdate(
    product,
    {
      $inc: { quantity: -quantity },
      $set: { inStock: foundProduct.quantity - quantity > 0 },
    },
    { new: true },
  );
  const totalPrice = foundProduct.price * quantity;
  const updatedData = { ...orderData, totalPrice };

  const result = await Order.create(updatedData);
  return result;
};

const calculateRevenueFromDB = async () => {
  const revenueData = await Order.aggregate([
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
};

export const OrderServices = {
  createOrderIntoDB,
  calculateRevenueFromDB,
};
