import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
  //   createOrder,
  getOrders,
  intent,
  confirm,
} from "../controllers/order.controller.js";

const router = express.Router();

// router.post("/:gigId", verifyToken, createOrder);
router.get("/", verifyToken, getOrders);
router.put("/", verifyToken, confirm);
router.post("/create-payment-intent/:id", verifyToken, intent);

export default router;
