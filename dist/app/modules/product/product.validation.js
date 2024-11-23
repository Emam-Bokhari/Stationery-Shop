"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const product_interface_1 = require("./product.interface");
const ProductCategoryEnum = zod_1.z.enum([
    product_interface_1.TProductCategory.Writing,
    product_interface_1.TProductCategory.OfficeSupplies,
    product_interface_1.TProductCategory.ArtSupplies,
    product_interface_1.TProductCategory.Educational,
    product_interface_1.TProductCategory.Technology,
]);
const ProductValidationSchema = zod_1.z.object({
    name: zod_1.z.string().trim().min(1, 'Product name is required'),
    brand: zod_1.z.string().trim().min(1, 'Brand name is required'),
    price: zod_1.z
        .number()
        .min(1, 'Price is Required')
        .positive({ message: 'Price must be a positive number' }),
    category: ProductCategoryEnum,
    description: zod_1.z.string().trim().min(1, 'Description is required'),
    quantity: zod_1.z.number().min(1, 'Quantity must be a positive number'),
    inStock: zod_1.z
        .boolean()
        .refine((value) => value === true, { message: 'inStock must be true' }),
    isDeleted: zod_1.z.boolean().default(false),
});
exports.default = ProductValidationSchema;
