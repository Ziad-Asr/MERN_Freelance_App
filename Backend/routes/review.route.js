import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
  createReview,
  getGigReviews,
  deleteReview,
} from "../controllers/review.controller.js";

const router = express.Router();

router.post("/", verifyToken, createReview);
router.get("/:gigId", getGigReviews);
router.delete("/:id", deleteReview);

export default router;
