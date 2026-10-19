"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function ProfilePage() {
    const [form, setForm] = useState({
        name: "",
        course: "",
        department: "",
        cgpa: "",
        mobile_number: "",
        personal_email: "",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;

        const loadProfile = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                if (!cancelled) {
                    setError("Please login first");
                    setLoading(false);
                }
                return;
            }

            try {
                const response = await fetch(
                    "http://localhost:5000/api/profile",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    if (!cancelled) {
                        setError(data.message || "Unable to load profile");
                    }
                    return;
                }

                if (!cancelled) {
                    setForm({
                        name: data.name || "",
                        course: data.course || "",
                        department: data.department || "",
                        cgpa: data.cgpa || "",
                        mobile_number: data.mobile_number || "",
                        personal_email: data.personal_email || "",
                    });
                }
            } catch {
                if (!cancelled) {
                    setError("Unable to connect to server");
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        void loadProfile();

        return () => {
            cancelled = true;
        };
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        setSaving(true);
        setMessage("");
        setError("");

        try {
            const response = await fetch(
                "http://localhost:5000/api/profile",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(form),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Unable to update profile");
                return;
            }

            setForm({
                name: data.user.name || "",
                course: data.user.course || "",
                department: data.user.department || "",
                cgpa: data.user.cgpa || "",
                mobile_number: data.user.mobile_number || "",
                personal_email: data.user.personal_email || "",
            });

            // Keep localStorage user information updated
            const oldUser = JSON.parse(
                localStorage.getItem("user") || "{}"
            );

            localStorage.setItem(
                "user",
                JSON.stringify({
                    ...oldUser,
                    name: data.user.name,
                    course: data.user.course,
                    department: data.user.department,
                    cgpa: data.user.cgpa,
                    mobile_number: data.user.mobile_number,
                    personal_email: data.user.personal_email,
                })
            );

            setMessage("Profile updated successfully");

        } catch (error) {
            setError("Unable to connect to server");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-[#F7F7F5]">

            <Sidebar role="student" />

            <div className="flex-1">

                <Header role="student" />

                <main className="p-8">

                    <div className="mb-8">
                        <h1 className="text-2xl font-semibold text-gray-900">
                            My Profile
                        </h1>

                        <p className="text-sm text-gray-500 mt-1">
                            Complete your placement profile
                        </p>
                    </div>

                    {loading ? (
                        <p className="text-gray-500">
                            Loading profile...
                        </p>
                    ) : (
                        <div className="bg-white border border-gray-200 rounded-xl p-8 max-w-3xl">

                            {error && (
                                <div className="mb-6 bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 text-sm">
                                    {error}
                                </div>
                            )}

                            {message && (
                                <div className="mb-6 bg-green-50 border border-green-200 text-green-600 rounded-lg p-3 text-sm">
                                    {message}
                                </div>
                            )}

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black">

                                    <Input
                                        label="Name"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                    />

                                    <Input
                                        label="Course"
                                        name="course"
                                        value={form.course}
                                        onChange={handleChange}
                                        placeholder="e.g. B.Tech"
                                    />

                                    <Input
                                        label="Department"
                                        name="department"
                                        value={form.department}
                                        onChange={handleChange}
                                        placeholder="e.g. CSE"
                                    />

                                    <Input
                                        label="CGPA"
                                        name="cgpa"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        max="10"
                                        value={form.cgpa}
                                        onChange={handleChange}
                                        placeholder="e.g. 8.50"
                                    />

                                    <Input
                                        label="Mobile Number"
                                        name="mobile_number"
                                        type="tel"
                                        value={form.mobile_number}
                                        onChange={handleChange}
                                    />

                                    <Input
                                        label="Personal Email"
                                        name="personal_email"
                                        type="email"
                                        value={form.personal_email}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="pt-4 border-t border-gray-200 flex justify-end">

                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50"
                                    >
                                        {saving
                                            ? "Saving..."
                                            : "Save Profile"}
                                    </button>

                                </div>

                            </form>

                        </div>
                    )}

                </main>

            </div>

        </div>
    );
}

function Input({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder,
    step,
    min,
    max,
}) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>

            <input
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                step={step}
                min={min}
                max={max}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </div>
    );
}