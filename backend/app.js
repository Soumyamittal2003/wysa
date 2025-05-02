import express from "express";
import mongoose from "mongoose";
import http from 'http';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();


// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);


// Import routes
import userRoute from "./routes/userRoutes.js";

// Setup middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: "GET,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

// Database connection
mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "Wysa",
  })
  .then(() => {
    console.log("Database connection is ready.");
  })
  .catch((err) => {
    console.log("Database connection failed. Exiting now...", err);
    process.exit(1);
  });

// Routes
app.use(`/users`, userRoute);

// Start server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
