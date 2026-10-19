"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import JobCard from "@/components/JobCard";

export default function JobsPage() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/jobs"
                );

                const data = await response.json();

                if (!response.ok) {
                    setError("Unable to load jobs");
                    return;
                }

                setJobs(data);

            } catch (error) {
                setError("Unable to connect to server");
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    return (
        <div className="min-h-screen bg-[#F7F7F5] flex">

            <Sidebar />

            <div className="flex-1">

                <Header />

                <main className="p-8">

                    <div className="mb-8">
                        <p className="text-gray-500 mb-1">
                            Opportunities
                        </p>

                        <h1 className="text-3xl font-semibold text-gray-900">
                            Browse Jobs
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Explore available placement opportunities.
                        </p>
                    </div>

                    {loading && (
                        <p className="text-gray-500">
                            Loading jobs...
                        </p>
                    )}

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4">
                            {error}
                        </div>
                    )}

                    {!loading && !error && jobs.length === 0 && (
                        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
                            <h2 className="font-semibold text-gray-900">
                                No jobs available
                            </h2>

                            <p className="text-gray-500 mt-2">
                                New placement opportunities will appear here.
                            </p>
                        </div>
                    )}

                    {!loading && !error && jobs.length > 0 && (
                        <div className="grid gap-5">
                            {jobs.map((job) => (
                                <JobCard
                                    key={job.id}
                                    job={job}
                                />
                            ))}
                        </div>
                    )}

                </main>

            </div>

        </div>
    );
}