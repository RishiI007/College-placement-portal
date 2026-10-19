import bcrypt from "bcrypt";
import pool from "../db.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            course,
            department,
            cgpa,
            mobile_number,
            personal_email
        } = req.body;

        if (
            !name ||
            !email ||
            !password ||
            !course ||
            !department ||
            !cgpa ||
            !mobile_number ||
            !personal_email
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const existingUser = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (existingUser.rows.length > 0) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `INSERT INTO users
            (
                name,
                email,
                password,
                role,
                course,
                department,
                cgpa,
                mobile_number,
                personal_email
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING
                id,
                name,
                email,
                role,
                course,
                department,
                cgpa,
                mobile_number,
                personal_email`,
            [
                name,
                email,
                hashedPassword,
                "student",
                course,
                department,
                cgpa,
                mobile_number,
                personal_email
            ]
        );

        res.status(201).json({
            message: "Student registered successfully",
            user: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const user = result.rows[0];

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.json({
            message: "Login successful",

            token,

            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                course: user.course,
                department: user.department,
                cgpa: user.cgpa,
                mobile_number: user.mobile_number,
                personal_email: user.personal_email
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};