import pool from "../db.js";

export const createJob = async (req, res) => {
    try {
        const {
            company_name,
            title,
            description,
            location,
            package: jobPackage,
            min_cgpa,
            deadline
        } = req.body;

        if (
            !company_name ||
            !title ||
            !description ||
            !location ||
            !jobPackage ||
            !deadline
        ) {
            return res.status(400).json({
                message: "Required fields are missing"
            });
        }

        const result = await pool.query(
            `INSERT INTO jobs
            (tnp_id, company_name, title, description, location, package, min_cgpa, deadline)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *`,
            [
                req.user.id,
                company_name,
                title,
                description,
                location,
                jobPackage,
                min_cgpa,
                deadline
            ]
        );

        res.status(201).json({
            message: "Job created successfully",
            job: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

export const getJobs = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT
                id,
                company_name,
                title,
                description,
                location,
                package,
                min_cgpa,
                deadline,
                created_at
             FROM jobs
             ORDER BY created_at DESC`
        );

        res.json(result.rows);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

export const applyForJob = async (req, res) => {
    try {
        const { jobId } = req.params;

        const job = await pool.query(
            "SELECT * FROM jobs WHERE id = $1",
            [jobId]
        );

        if (job.rows.length === 0) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        const existingApplication = await pool.query(
            `SELECT * FROM applications
             WHERE student_id = $1 AND job_id = $2`,
            [req.user.id, jobId]
        );

        if (existingApplication.rows.length > 0) {
            return res.status(400).json({
                message: "Already applied for this job"
            });
        }

        const result = await pool.query(
            `INSERT INTO applications (student_id, job_id)
             VALUES ($1, $2)
             RETURNING *`,
            [req.user.id, jobId]
        );

        res.status(201).json({
            message: "Applied successfully",
            application: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

export const getApplicants = async (req, res) => {
    try {
        const { jobId } = req.params;

        const job = await pool.query(
            "SELECT * FROM jobs WHERE id = $1",
            [jobId]
        );

        if (job.rows.length === 0) {
            return res.status(404).json({ message: "Job not found" });
        }

        const result = await pool.query(
            `SELECT
                applications.id,
                users.id AS student_id,
                users.name,
                users.email,
                applications.status,
                applications.applied_at
             FROM applications
             JOIN users
             ON applications.student_id = users.id
             WHERE applications.job_id = $1
             ORDER BY applications.applied_at DESC`,
            [jobId]
        );

        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getJobById = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            `SELECT
                id,
                company_name,
                title,
                description,
                location,
                package,
                min_cgpa,
                deadline,
                created_at
             FROM jobs
             WHERE id = $1`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        res.json(result.rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};