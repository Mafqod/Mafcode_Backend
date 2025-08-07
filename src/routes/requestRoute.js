import express from "express";
import * as requestController from "../controllers/resquestController.js";
import * as authController from "../controllers/authController.js";

const router = express.Router();

router.use(authController.protect);
router
  .route("/")
  .get(requestController.getAllRequests)
  .post(requestController.createRequest);

router.route("/my-requests").get(requestController.getMyRequests);

router
  .route("/:id")
  .get(requestController.getRequestById)
  .delete(requestController.deleteRequest)
  .patch(requestController.updateRequest);
export default router;
