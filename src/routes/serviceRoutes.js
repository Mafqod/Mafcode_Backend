import express from "express";
import * as serviceController from "../controllers/serviceController";
import authController from "../controllers/authController";

const router = express.Router();

router.use(authController.protect);
router.use(authController.restrictTo("admin"));
