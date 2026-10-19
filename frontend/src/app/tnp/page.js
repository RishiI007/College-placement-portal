"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function TnpDashboard() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/jobs"
                );

                if (response.ok) {
                    const data = await response.json();
                    setJobs(data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    return (
        <div className="flex min-h-screen bg-[#F7F7F5]">

            <Sidebar role="tnp" />

            <div className="flex-1">
                <Header role="tnp" />

                <main className="p-8">

                    <div className="mb-8 flex items-center justify-between">

                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">
                                Dashboard
                            </h1>

                            <p className="text-sm text-gray-500 mt-1">
                                Manage placement opportunities
                            </p>
                        </div>

                    </div>

                    {/* Stats */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                        <StatCard
                            title="Total Jobs"
                            value={jobs.length}
                        />

                        <StatCard
                            title="Active Jobs"
                            value={
                                jobs.filter(
                                    (job) =>
                                        new Date(job.deadline) >=
                                        new Date()
                                ).length
                            }
                        />

                    </div>

                    {/* Recent Jobs */}

                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

                        <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">

                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Recent Jobs
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    Latest placement opportunities
                                </p>
                            </div>

                            <Link
                                href="/tnp/jobs"
                                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                            >
                                View All
                            </Link>

                        </div>

                        {loading ? (
                            <div className="p-8 text-gray-500">
                                Loading jobs...
                            </div>
                        ) : jobs.length === 0 ? (
                            <div className="p-8 text-center">
                                <p className="text-gray-500">
                                    No jobs have been created yet.
                                </p>

                                <Link
                                    href="/tnp/jobs/create"
                                    className="inline-block mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700"
                                >
                                    Create First Job
                                </Link>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-100">

                                {jobs.slice(0, 5).map((job) => (
                                    <div
                                        key={job.id}
                                        className="px-6 py-5 flex items-center justify-between"
                                    >

                                        <div>
                                            <p className="font-medium text-gray-900">
                                                {job.title}
                                            </p>

                                            <p className="text-sm text-gray-500 mt-1">
                                                {job.company_name}
                                            </p>
                                        </div>

                                        <Link
                                            href={`/tnp/jobs/${job.id}/applicants`}
                                            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                                        >
                                            Applicants →
                                        </Link>

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