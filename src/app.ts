import express from "express";
import cors from "cors";
import { ProductRoutes } from "./app/modules/product/product.route";

const app = express();

// parser
app.use(express.json())
app.use(cors())

// application routes
app.use("/api/products", ProductRoutes)

// check server health
app.get("/health", (req, res) => {
    res.send("Server in running...")
});

export default app;


