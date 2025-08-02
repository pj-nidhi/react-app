import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
// import authMiddleware from "./authMiddleware.js";

import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();
console.log(`Server directory: ${__dirname}`);
app.use(cors());
app.use(express.json()); // allows us to accept JSON data in the req.body

app.use("/api/products", productRoutes);

// Import the authorization middleware
// This middleware will handle user authentication and authorization
// app.use(authMiddleware);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
    });
}

connectDB();

app.listen(PORT, '0.0.0.0', () => {
    const now = new Date().toISOString();
    console.info(`[INFO] [${now}] Server started at http://localhost:${PORT}`);
});
