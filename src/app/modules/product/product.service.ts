import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (productData: TProduct) => {
  const result = await Product.create(productData);
  return result;
};

const getAllProductsFromDB = async (searchTerm?: string) => {
  const filter = searchTerm ? {
    $or: [
      { name: { $regex: searchTerm, $options: "i" } },
      { brand: { $regex: searchTerm, $options: "i" } },
      { category: { $regex: searchTerm, $options: "i" } }
    ]
  } : {}

  const result = await Product.find(filter);
  return result;
}

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
};
