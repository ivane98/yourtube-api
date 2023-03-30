import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/users.js";
import videoRoutes from "./routes/videos.js";
import commentRoutes from "./routes/comments.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

const connect = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("connected to db");
    })
    .catch((err) => {
      throw err;
    });
};
app.use(
  cors({
    origin: ["http://localhost:3001", "https://yourtube30.netlify.app"],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "something went wrong";
  res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(3001, () => {
  connect();
  console.log("Connected");
});
