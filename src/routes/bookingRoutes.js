import express from "express";
import * as bookingController from "../controllers/bookingController.js";
import { protect, restrictTo } from "../controllers/authController.js";

const router = express.Router();

router.use(protect);

router
  .route("/")
  .post(bookingController.createBooking)
  .get(bookingController.getAllBookings);

router.route("/:id").get(bookingController.getOneBooking);

export default router;
