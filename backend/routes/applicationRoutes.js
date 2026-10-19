import express from "express";
import {
    updateApplicationStatus,
    getMyApplications
} from "../controllers/applicationController.js";

import {
    authenticate,
    authorize
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.patch(
    "/:id/status",
    authenticate,
    authorize("tnp"),
    updateApplicationStatus
);

router.get(
    "/my",
    authenticate,
    authorize("student"),
    getMyApplications
);

export default router;