import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
  createReview,
  getGigReviews,
} from "../controllers/review.controller.js";

const router = express.Router();

router.post("/", verifyToken, createReview);
router.get("/:gigId", getGigReviews);

export default router;
