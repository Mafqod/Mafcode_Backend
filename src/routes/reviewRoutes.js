import express from "express";
import * as reviewController from "../controllers/reviewController.js";
import { protect, restrictTo } from "../controllers/authController.js";

const router = express.Router();

router.use(protect);

router.route("/").post(reviewController.createReview);

router.route("/service/:id").get(reviewController.getAllReviewsForService);
router
  .route("/:id")
  .get(reviewController.getReview)
  .patch(restrictTo("client"), reviewController.updateReview)
  .delete(restrictTo("client"), reviewController.deleteReview);

export default router;
