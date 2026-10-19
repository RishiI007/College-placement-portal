"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function CreateJobPage() {
    const router = useRouter();

    const [form, setForm] = useState({
        company_name: "",
        title: "",
        description: "",
        location: "",
        package: "",
        min_cgpa: "",
        deadline: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/login");
            return;
        }

        try {
            const response = await fetch(
                "http://localhost:5000/api/jobs",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(form),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Unable to create job");
                return;
            }

            router.push("/tnp/jobs");

        } catch (error) {
            setError("Unable to connect to server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F7F7F5] flex">

            <Sidebar role="tnp" />

            <div className="flex-1">

                <Header role="tnp" />

                <main className="p-8">

                    <div className="max-w-4xl">

                        <div className="mb-8">
                            <p className="text-gray-500 mb-1">
                                Placement Management
                            </p>

                            <h1 className="text-3xl font-semibold text-gray-900">
                                Create Job
                            </h1>

                            <p className="text-gray-500 mt-2">
                                Post a new placement opportunity for students.
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="bg-white border border-gray-200 rounded-xl p-8"
                        >

                            <div className="grid text-black grid-cols-1 md:grid-cols-2 gap-6">

                                <Input
                                    label="Company Name"
                                    name="company_name"
                                    value={form.company_name}
                                    onChange={handleChange}
                                    placeholder="e.g. Microsoft"
                                />

                                <Input
                                    label="Job Title"
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    placeholder="e.g. Software Engineer"
                                />

                                <Input
                                    label="Location"
                                    name="location"
                                    value={form.location}
                                    onChange={handleChange}
                                    placeholder="e.g. Bangalore"
                                />

                                <Input
                                    label="Package (LPA)"
                                    name="package"
                                    value={form.package}
                                    onChange={handleChange}
                                    placeholder="e.g. 12"
                                />

                                <Input
                                    label="Minimum CGPA"
                                    name="min_cgpa"
                                    type="number"
                                    step="0.01"
                                    value={form.min_cgpa}
                                    onChange={handleChange}
                                    placeholder="e.g. 7.50"
                                />

                                <Input
                                    label="Application Deadline"
                                    name="deadline"
                                    type="date"
                                    value={form.deadline}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="mt-6 text-black">

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Job Description
                                </label>

                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    rows={6}
                                    placeholder="Describe the job role, responsibilities and requirements..."
                                    className="w-full borde border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                                    required
                                />

                            </div>

                            {error && (
                                <p className="text-red-500 text-sm mt-5">
                                    {error}
                                </p>
                            )}

                            <div className="flex justify-end gap-3 mt-8">

                                <button
                                    type="button"
                                    onClick={() => router.push("/tnp")}
                                    className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50"
                                >
                                    {loading ? "Creating..." : "Create Job"}
                                </button>

                            </div>

                        </form>

                    </div>

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
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </div>
    );
}