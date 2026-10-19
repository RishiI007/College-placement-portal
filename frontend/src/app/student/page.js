"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function StudentDashboard() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApplications = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setLoading(false);
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

                if (response.ok) {
                    const data = await response.json();
                    setApplications(data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    const applied = applications.length;

    const shortlisted = applications.filter(
        (app) => app.status === "shortlisted"
    ).length;

    const selected = applications.filter(
        (app) => app.status === "selected"
    ).length;

    return (
        <div className="flex min-h-screen bg-[#F7F7F5]">

            <Sidebar role="student" />

            <div className="flex-1">
                <Header role="student" />

                <main className="p-8">

                    <div className="mb-8">
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Dashboard
                        </h1>

                        <p className="text-sm text-gray-500 mt-1">
                            Welcome to your placement dashboard
                        </p>
                    </div>

                    {/* Stats */}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                        <StatCard
                            title="Applications"
                            value={applied}
                        />

                        <StatCard
                            title="Shortlisted"
                            value={shortlisted}
                        />

                        <StatCard
                            title="Selected"
                            value={selected}
                        />

                    </div>

                    {/* Recent Applications */}

                    <div className="bg-white border border-gray-200 rounded-xl">

                        <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">

                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Recent Applications
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    Your latest job applications
                                </p>
                            </div>

                            <Link
                                href="/student/applications"
                                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                            >
                                View All
                            </Link>

                        </div>

                        {loading ? (
                            <div className="p-8 text-gray-500">
                                Loading applications...
                            </div>
                        ) : applications.length === 0 ? (
                            <div className="p-8 text-center">
                                <p className="text-gray-500">
                                    You haven't applied for any jobs yet.
                                </p>

                                <Link
                                    href="/student/jobs"
                                    className="inline-block mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700"
                                >
                                    Browse Jobs
                                </Link>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-100">

                                {applications.slice(0, 5).map((application) => (
                                    <div
                                        key={application.id}
                                        className="px-6 py-5 flex items-center justify-between"
                                    >

                                        <div>
                                            <p className="font-medium text-gray-900">
                                                {application.title}
                                            </p>

                                            <p className="text-sm text-gray-500 mt-1">
                                                {application.company_name}
                                            </p>
                                        </div>

                                        <StatusBadge
                                            status={application.status}
                                        />

                                    </div>
                                ))}

                            </div>
                        )}

                    </div>

                </main>
            </div>
        </div>
    );
}

function StatCard({ title, value }) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
            <p className="text-sm text-gray-500">
                {title}
            </p>

            <p className="text-3xl font-semibold text-gray-900 mt-2">
                {value}
            </p>
        </div>
    );
}

function StatusBadge({ status }) {
    const styles = {
        applied: "bg-gray-100 text-gray-700",
        shortlisted: "bg-yellow-100 text-yellow-700",
        rejected: "bg-red-100 text-red-700",
        selected: "bg-green-100 text-green-700",
    };

    const labels = {
        applied: "Applied",
        shortlisted: "Shortlisted",
        rejected: "Rejected",
        selected: "Selected",
    };

    return (
        <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
                styles[status] || styles.applied
            }`}
        >
            {labels[status] || status}
        </span>
    );
}