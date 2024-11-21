import { z } from "zod";

const ProductCategoryEnum = z.enum([
    "Writing",
    "Office Supplies",
    "Art Supplies",
    "Educational",
    "Technology",
])

const ProductValidationSchema = z.object({
    name: z.string()
        .trim()
        .min(1, "Product name is required"),
    brand: z.string()
        .trim()
        .min(1, "Brand name is required"),
    price: z.number()
        .min(0, "Price must be a positive number"),
    category: ProductCategoryEnum,
    description: z.string()
        .trim()
        .min(1, "Description is required"),
    quantity: z.number()
        .min(0, "Quantity is required"),
    inStock: z.boolean(),
    isDeleted: z.boolean().default(false)
})

export default ProductValidationSchema;