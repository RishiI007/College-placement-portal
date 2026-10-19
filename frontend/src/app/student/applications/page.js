"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function ApplicationsPage() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchApplications = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("Please login first");
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

                const data = await response.json();

                if (!response.ok) {
                    setError(
                        data.message || "Unable to load applications"
                    );
                    return;
                }

                setApplications(data);
            } catch (error) {
                setError("Unable to connect to server");
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    return (
        <div className="flex min-h-screen bg-[#F7F7F5]">
            <Sidebar role="student" />

            <div className="flex-1">
                <Header role="student" />

                <main className="p-8">

                    <div className="mb-8">
                        <h1 className="text-2xl font-semibold text-gray-900">
                            My Applications
                        </h1>

                        <p className="text-sm text-gray-500 mt-1">
                            Track the status of your job applications
                        </p>
                    </div>

                    {loading && (
                        <p className="text-gray-500">
                            Loading applications...
                        </p>
                    )}

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4">
                            {error}
                        </div>
                    )}

                    {!loading && !error && (
                        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

                            {applications.length === 0 ? (
                                <div className="p-12 text-center">
                                    <p className="text-gray-500">
                                        You haven't applied for any jobs yet.
                                    </p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full">

                                        <thead className="bg-gray-50 border-b border-gray-200">
                                            <tr>
                                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                                    Company
                                                </th>

                                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                                    Position
                                                </th>

                                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                                    Location
                                                </th>

                                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                                    Package
                                                </th>

                                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                                    Applied On
                                                </th>

                                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                                    Status
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {applications.map((application) => (
                                                <tr
                                                    key={application.id}
                                                    className="border-b border-gray-100 last:border-0"
                                                >
                                                    <td className="px-6 py-5">
                                                        <p className="font-medium text-gray-900">
                                                            {application.company_name}
                                                        </p>
                                                    </td>

                                                    <td className="px-6 py-5 text-sm text-gray-700">
                                                        {application.title}
                                                    </td>

                                                    <td className="px-6 py-5 text-sm text-gray-500">
                                                        {application.location}
                                                    </td>

                                                    <td className="px-6 py-5">
                                                        <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                                                            {application.package}
                                                        </span>
                                                    </td>

                                                    <td className="px-6 py-5 text-sm text-gray-500">
                                                        {new Date(
                                                            application.applied_at
                                                        ).toLocaleDateString()}
                                                    </td>

                                                    <td className="px-6 py-5">
                                                        <StatusBadge
                                                            status={application.status}
                                                        />
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
            className={`px-3 py-1 rounded-full text-xs font-medium ${
                styles[status] || styles.applied
            }`}
        >
            {labels[status] || status}
        </span>
    );
}