import "./config/env.js"
import express from "express";
import { connect } from "mongoose";
import cors from "cors";
import cookieParser from 'cookie-parser';
import aiRoutes from "./routes/aiRoutes.js";
import uploadRoute from "./routes/uploadRoute.js";
import authRoutes from "./routes/auth.js";
// const uploadRoute = require("./routes/uploadRoute.js");
// const authRoutes = require("./routes/auth.js");

// import dotenv from "dotenv";
// dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// require("dotenv").config();
// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(cookieParser());
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/files", uploadRoute);
app.use("/api", aiRoutes);

// Connect to MongoDB
connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));

