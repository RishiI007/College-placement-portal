"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function ManageCompaniesPage() {
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
                    setError(
                        data.message || "Unable to load companies"
                    );
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
        <div className="flex min-h-screen bg-[#F7F7F5]">

            <Sidebar role="tnp" />

            <div className="flex-1">

                <Header role="tnp" />

                <main className="p-8">

                    {/* Header */}

                    <div className="flex items-center justify-between mb-8">

                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">
                                Manage Companies
                            </h1>

                            <p className="text-sm text-gray-500 mt-1">
                                View all companies and their placement opportunities
                            </p>
                        </div>

                        <Link
                            href="/tnp/jobs/create"
                            className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700"
                        >
                            + Create Job
                        </Link>

                    </div>

                    {/* Error */}

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4 mb-6">
                            {error}
                        </div>
                    )}

                    {/* Loading */}

                    {loading && (
                        <p className="text-gray-500">
                            Loading companies...
                        </p>
                    )}

                    {/* Companies */}

                    {!loading && !error && (
                        <>
                            {jobs.length === 0 ? (
                                <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">

                                    <p className="text-gray-500">
                                        No companies have been added yet.
                                    </p>

                                    <Link
                                        href="/tnp/jobs/create"
                                        className="inline-block mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700"
                                    >
                                        Create First Job
                                    </Link>

                                </div>
                            ) : (
                                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

                                    <div className="px-6 py-5 border-b border-gray-200">
                                        <h2 className="text-lg font-semibold text-gray-900">
                                            Companies & Jobs
                                        </h2>

                                        <p className="text-sm text-gray-500 mt-1">
                                            {jobs.length} placement opportunity
                                            {jobs.length !== 1 ? "ies" : "y"}
                                        </p>
                                    </div>

                                    <div className="overflow-x-auto">

                                        <table className="w-full">

                                            <thead className="bg-gray-50 border-b border-gray-200">

                                                <tr>

                                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                                        Company
                                                    </th>

                                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                                        Job Position
                                                    </th>

                                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                                        Location
                                                    </th>

                                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                                        Package
                                                    </th>

                                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                                        Min CGPA
                                                    </th>

                                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                                        Deadline
                                                    </th>

                                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                                        Action
                                                    </th>

                                                </tr>

                                            </thead>

                                            <tbody>

                                                {jobs.map((job) => (

                                                    <tr
                                                        key={job.id}
                                                        className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                                                    >

                                                        <td className="px-6 py-5">
                                                            <p className="font-medium text-gray-900">
                                                                {job.company_name}
                                                            </p>
                                                        </td>

                                                        <td className="px-6 py-5">
                                                            <p className="text-sm text-gray-700">
                                                                {job.title}
                                                            </p>
                                                        </td>

                                                        <td className="px-6 py-5">
                                                            <p className="text-sm text-gray-500">
                                                                {job.location}
                                                            </p>
                                                        </td>

                                                        <td className="px-6 py-5">
                                                            <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                                                                {job.package}
                                                            </span>
                                                        </td>

                                                        <td className="px-6 py-5">
                                                            <p className="text-sm text-gray-500">
                                                                {job.min_cgpa || "Not specified"}
                                                            </p>
                                                        </td>

                                                        <td className="px-6 py-5">
                                                            <p className="text-sm text-gray-500">
                                                                {job.deadline}
                                                            </p>
                                                        </td>

                                                        <td className="px-6 py-5">

                                                            <Link
                                                                href={`/tnp/jobs/${job.id}/applicants`}
                                                                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                                                            >
                                                                Applicants
                                                            </Link>

                                                        </td>

                                                    </tr>

                                                ))}

                                            </tbody>

                                        </table>

                                    </div>

                                </div>
                            )}
                        </>
                    )}

                </main>

            </div>

        </div>
    );
}