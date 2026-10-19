import pool from "../db.js";

export const getProfile = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT
                id,
                name,
                email,
                course,
                department,
                cgpa,
                mobile_number,
                personal_email
             FROM users
             WHERE id = $1`,
            [req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "User not found"
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


export const updateProfile = async (req, res) => {
    try {
        const {
            name,
            course,
            department,
            cgpa,
            mobile_number,
            personal_email
        } = req.body;

        if (
            !name ||
            !course ||
            !department ||
            !cgpa ||
            !mobile_number ||
            !personal_email
        ) {
            return res.status(400).json({
                message: "All profile fields are required"
            });
        }

        const result = await pool.query(
            `UPDATE users
             SET
                name = $1,
                course = $2,
                department = $3,
                cgpa = $4,
                mobile_number = $5,
                personal_email = $6
             WHERE id = $7
             RETURNING
                id,
                name,
                email,
                course,
                department,
                cgpa,
                mobile_number,
                personal_email`,
            [
                name,
                course,
                department,
                cgpa,
                mobile_number,
                personal_email,
                req.user.id
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            message: "Profile updated successfully",
            user: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};