"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function JobDetailsPage() {
    const { id } = useParams();
    const router = useRouter();

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [applying, setApplying] = useState(false);
    const [alreadyApplied, setAlreadyApplied] = useState(false);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/api/jobs/${id}`
                );

                const data = await response.json();

                if (!response.ok) {
                    setError(data.message || "Unable to load job");
                    return;
                }

                setJob(data);
            } catch (error) {
                setError("Unable to connect to server");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchJob();
        }
    }, [id]);

    useEffect(() => {
        const checkApplication = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                return;
            }

            try {
                const response = await fetch(
                    "http://localhost:5000/api/applications/my",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    return;
                }

                const applications = await response.json();

                const found = applications.some(
                    (application) =>
                        application.job_id?.toString() === id?.toString()
                );

                setAlreadyApplied(found);
            } catch (error) {
                console.error(error);
            }
        };

        if (id) {
            checkApplication();
        }
    }, [id]);

    const handleApply = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/login");
            return;
        }

        if (alreadyApplied) {
            return;
        }

        setApplying(true);
        setMessage("");
        setError("");

        try {
            const response = await fetch(
                `http://localhost:5000/api/jobs/${id}/apply`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Unable to apply");
                return;
            }

            setMessage(data.message);
            setAlreadyApplied(true);
        } catch (error) {
            setError("Unable to connect to server");
        } finally {
            setApplying(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-[#F7F7F5]">
            <Sidebar role="student" />

            <div className="flex-1">
                <Header role="student" />

                <main className="p-8">

                    <Link
                        href="/student/jobs"
                        className="text-sm text-indigo-600 hover:text-indigo-800"
                    >
                        ← Back to Jobs
                    </Link>

                    {loading && (
                        <p className="text-gray-500 mt-8">
                            Loading job...
                        </p>
                    )}

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4 mt-6">
                            {error}
                        </div>
                    )}

                    {job && (
                        <div className="bg-white border border-gray-200 rounded-xl p-8 mt-6">

                            <div className="flex items-start justify-between gap-6">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        {job.company_name}
                                    </p>

                                    <h1 className="text-3xl font-semibold text-gray-900 mt-2">
                                        {job.title}
                                    </h1>
                                </div>

                                <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full">
                                    {job.package}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

                                <Info
                                    label="Location"
                                    value={job.location}
                                />

                                <Info
                                    label="Minimum CGPA"
                                    value={job.min_cgpa || "Not specified"}
                                />

                                <Info
                                    label="Application Deadline"
                                    value={job.deadline}
                                />

                            </div>

                            <div className="mt-8 pt-8 border-t border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Job Description
                                </h2>

                                <p className="text-gray-600 mt-3 leading-7 whitespace-pre-line">
                                    {job.description}
                                </p>
                            </div>

                            {message && (
                                <div className="bg-green-50 border border-green-200 text-green-600 rounded-lg p-4 mt-8">
                                    {message}
                                </div>
                            )}

                            <div className="mt-8">
                                {alreadyApplied ? (
                                    <button
                                        disabled
                                        className="bg-green-100 text-green-700 px-6 py-3 rounded-lg font-medium cursor-not-allowed"
                                    >
                                        ✓ Already Applied
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleApply}
                                        disabled={applying}
                                        className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50"
                                    >
                                        {applying
                                            ? "Applying..."
                                            : "Apply Now"}
                                    </button>
                                )}
                            </div>

                        </div>
                    )}

                </main>
            </div>
        </div>
    );
}

function Info({ label, value }) {
    return (
        <div>
            <p className="text-sm text-gray-500">
                {label}
            </p>

            <p className="text-base font-medium text-gray-900 mt-1">
                {value}
            </p>
        </div>
    );
}