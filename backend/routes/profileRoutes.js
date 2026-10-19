import express from "express";

import {
    getProfile,
    updateProfile
} from "../controllers/profileController.js";

import {
    authenticate,
    authorize
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
    "/",
    authenticate,
    authorize("student"),
    getProfile
);

router.put(
    "/",
    authenticate,
    authorize("student"),
    updateProfile
);

export default router;