import Link from "next/link";

export default function JobCard({ job }) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-sm transition">

            <div className="flex items-start justify-between gap-4">

                <div>
                    <p className="text-sm text-gray-500">
                        {job.company_name}
                    </p>

                    <h2 className="text-xl font-semibold text-gray-900 mt-1">
                        {job.title}
                    </h2>
                </div>

                <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                    {job.package}
                </span>

            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5 text-sm text-gray-500">
                <span>📍 {job.location}</span>
                <span>CGPA: {job.min_cgpa || "Not specified"}</span>
                <span>Deadline: {job.deadline}</span>
            </div>

            <div className="mt-5 pt-5 border-t border-gray-100 flex justify-end">

                <Link
                    href={`/student/jobs/${job.id}`}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700"
                >
                    View Details
                </Link>

            </div>

        </div>
    );
}