import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_KEY);
    console.log(`DB is connected!`);
  } catch (err) {
    console.error("Error connecting to database:", err);
  }
};

app.listen(process.env.PORT, () => {
  connect();
  console.log(`Server is running on port ${process.env.PORT}!`);
});
