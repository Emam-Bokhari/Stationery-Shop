import express from "express";
import cors from "cors";

const app = express();

// parser
app.use(express.json())
app.use(cors())

app.get("/health", (req, res) => {
    res.send("Server in running...")
});

export default app;


