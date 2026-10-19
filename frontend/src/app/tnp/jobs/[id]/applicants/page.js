"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function ApplicantsPage() {
    const { id } = useParams();

    const [applicants, setApplicants] = useState([]);
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchData = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            setError("Please login first");
            return;
        }

        try {
            const [jobResponse, applicantsResponse] = await Promise.all([
                fetch(`http://localhost:5000/api/jobs/${id}`),

                fetch(
                    `http://localhost:5000/api/jobs/${id}/applicants`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                ),
            ]);

            const jobData = await jobResponse.json();
            const applicantsData = await applicantsResponse.json();

            if (!jobResponse.ok) {
                setError(jobData.message || "Unable to load job");
                return;
            }

            if (!applicantsResponse.ok) {
                setError(
                    applicantsData.message ||
                    "Unable to load applicants"
                );
                return;
            }

            setJob(jobData);
            setApplicants(applicantsData);
        } catch (error) {
            setError("Unable to connect to server");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            Promise.resolve().then(fetchData);
        }
    }, [id]);

    const updateStatus = async (applicationId, status) => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(
                `http://localhost:5000/api/applications/${applicationId}/status`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ status }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Unable to update status");
                return;
            }

            setApplicants((currentApplicants) =>
                currentApplicants.map((applicant) =>
                    applicant.id === applicationId
                        ? {
                            ...applicant,
                            status: status,
                        }
                        : applicant
                )
            );
        } catch (error) {
            alert("Unable to connect to server");
        }
    };

    return (
        <div className="flex min-h-screen bg-[#F7F7F5]">
            <Sidebar role="tnp" />

            <div className="flex-1">
                <Header role="tnp" />

                <main className="p-8">

                    <div className="mb-8">
                        <Link
                            href="/tnp/jobs"
                            className="text-sm text-indigo-600 hover:text-indigo-800"
                        >
                            ← Back to Jobs
                        </Link>

                        {job && (
                            <div className="mt-4">
                                <p className="text-sm text-gray-500">
                                    {job.company_name}
                                </p>

                                <h1 className="text-2xl font-semibold text-gray-900">
                                    {job.title}
                                </h1>

                                <p className="text-sm text-gray-500 mt-1">
                                    Applicants
                                </p>
                            </div>
                        )}
                    </div>

                    {loading && (
                        <p className="text-gray-500">
                            Loading applicants...
                        </p>
                    )}

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4 mb-6">
                            {error}
                        </div>
                    )}

                    {!loading && !error && (
                        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

                            <div className="px-6 py-5 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Applicants ({applicants.length})
                                </h2>
                            </div>

                            {applicants.length === 0 ? (
                                <div className="p-10 text-center text-gray-500">
                                    No students have applied yet.
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full">

                                        <thead className="bg-gray-50 border-b border-gray-200">
                                            <tr>
                                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                                    Student
                                                </th>

                                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                                    Email
                                                </th>

                                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                                    Applied On
                                                </th>

                                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                                    Status
                                                </th>

                                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                                    Update
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {applicants.map((applicant) => (
                                                <tr
                                                    key={applicant.id}
                                                    className="border-b border-gray-100 last:border-0"
                                                >
                                                    <td className="px-6 py-5">
                                                        <p className="font-medium text-gray-900">
                                                            {applicant.name}
                                                        </p>
                                                    </td>

                                                    <td className="px-6 py-5 text-sm text-gray-500">
                                                        {applicant.email}
                                                    </td>

                                                    <td className="px-6 py-5 text-sm text-gray-500">
                                                        {new Date(
                                                            applicant.applied_at
                                                        ).toLocaleDateString()}
                                                    </td>

                                                    <td className="px-6 py-5">
                                                        <StatusBadge
                                                            status={applicant.status}
                                                        />
                                                    </td>

                                                    <td className="px-6 py-5">
                                                        <select
                                                            value={applicant.status}
                                                            onChange={(e) =>
                                                                updateStatus(
                                                                    applicant.id,
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="text-black border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                                        >
                                                            <option value="applied">
                                                                Applied
                                                            </option>

                                                            <option value="shortlisted">
                                                                Shortlisted
                                                            </option>

                                                            <option value="rejected">
                                                                Rejected
                                                            </option>

                                                            <option value="selected">
                                                                Selected
                                                            </option>
                                                        </select>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>

                                    </table>
                                </div>
                            )}

                        </div>
                    )}

                </main>
            </div>
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
            className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}
        >
            {labels[status]}
        </span>
    );
}