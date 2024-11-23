import mongoose from 'mongoose';
import { TProductCategory } from './product.interface';
const { Schema } = mongoose;

const productSchema = new Schema(
  {
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
      enum: Object.values(TProductCategory),
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
  },
  { timestamps: true },
);

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
  this.select('-isDeleted');
  next();
});

productSchema.pre('findOne', function (next) {
  this.select('-isDeleted');
  next();
});

// aggregate middleware
productSchema.pre('aggregate', function () {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
});

productSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $project: { isDeleted: 0 } });
  next();
});

export const Product = mongoose.model('Product', productSchema);
