import express from "express";

import {
    createJob,
    getJobs,
    applyForJob,
    getApplicants,
    getJobById
} from "../controllers/jobController.js";

import {
    authenticate,
    authorize
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getJobs);

router.post(
    "/",
    authenticate,
    authorize("tnp"),
    createJob
);

router.post(
    "/:jobId/apply",
    authenticate,
    authorize("student"),
    applyForJob
);

router.get(
    "/:jobId/applicants",
    authenticate,
    authorize("tnp"),
    getApplicants
);

router.get("/:id", getJobById);

export default router;