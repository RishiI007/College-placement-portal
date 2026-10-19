import express from "express";
import dotenv from "dotenv";
import pool from "./db.js";

import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import cors from "cors";
import profileRoutes from "./routes/profileRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/profile", profileRoutes);


app.get("/", (req, res) => {
    res.send("Placement Portal Backend Running");
});

app.get("/db", async (req, res) => {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows[0]);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});