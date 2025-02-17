import express from "express";
import * as serviceController from "../controllers/serviceController.js";
import * as authController from "../controllers/authController.js";

const router = express.Router();

router.use(authController.protect);
router.use(authController.restrictTo("admin"));

router
  .route("/")
  .get(serviceController.getAllServices)
  .post(serviceController.createService);

router
  .route("/:id")
  .get(serviceController.getService)
  .patch(serviceController.updateService)
  .delete(serviceController.deleteService);

export default router;
