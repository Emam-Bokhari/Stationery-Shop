import { z } from "zod";

const orderValidationSchema = z.object({
    email: z.string()
        .trim()
        .min(1, "Email is required")
        .email({ message: "Invalid email type" }),
    product: z.string()
        .trim()
        .min(1, "Product id is required"),
    quantity: z.number().positive().min(1, "Quantity is required"),
    totalPrice: z.number()
        .positive()
        .min(1, "Total price is required")
})

export default orderValidationSchema;