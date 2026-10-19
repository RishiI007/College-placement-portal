import pool from "../db.js";

export const updateApplicationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const allowedStatuses = [
            "applied",
            "shortlisted",
            "rejected",
            "selected"
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid status"
            });
        }

        const application = await pool.query(
            "SELECT * FROM applications WHERE id = $1",
            [id]
        );

        if (application.rows.length === 0) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        const result = await pool.query(
            `UPDATE applications
             SET status = $1
             WHERE id = $2
             RETURNING *`,
            [status, id]
        );

        res.json({
            message: "Application status updated",
            application: result.rows[0]
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

export const getMyApplications = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT
                applications.id,
                jobs.company_name,
                applications.job_id,
                jobs.title,
                jobs.location,
                jobs.package,
                applications.status,
                applications.applied_at
             FROM applications
             JOIN jobs
             ON applications.job_id = jobs.id
             WHERE applications.student_id = $1
             ORDER BY applications.applied_at DESC`,
            [req.user.id]
        );

        res.json(result.rows);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};