"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  User,
  Briefcase,
  FileText,
  Bell,
  LogOut,
  Users,
  PlusCircle,
} from "lucide-react";

export default function Sidebar({ role = "student" }) {
  const isStudent = role === "student";
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    router.push("/login");
  };

  return (
    <aside className="w-64 min-h-screen bg-[#20212B] text-white flex flex-col">
      {/* Logo */}

      <div className="h-20 flex items-center px-8 border-b border-white/10">
        <h1 className="text-lg font-bold tracking-[0.2em]">NIT Silchar</h1>
      </div>

      {/* Navigation */}

      <nav className="flex-1 px-4 py-6 space-y-2">
        {/* Dashboard */}

        <Link
          href={isStudent ? "/student" : "/tnp"}
          className="flex items-center gap-4 px-4 py-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white"
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>

        {isStudent ? (
          <>
            {/* Student Profile */}

            <Link
              href="/student/profile"
              className="flex items-center gap-4 px-4 py-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white"
            >
              <User size={20} />
              <span>My Profile</span>
            </Link>

            {/* Browse Jobs */}

            <Link
              href="/student/jobs"
              className="flex items-center gap-4 px-4 py-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white"
            >
              <Briefcase size={20} />
              <span>Browse Companies</span>
            </Link>

            {/* Applications */}

            <Link
              href="/student/applications"
              className="flex items-center gap-4 px-4 py-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white"
            >
              <FileText size={20} />
              <span>Applications</span>
            </Link>

            {/* Notifications */}

            <Link
              href="#"
              className="flex items-center gap-4 px-4 py-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white"
            >
              <Bell size={20} />
              <span>Notifications</span>
            </Link>
          </>
        ) : (
          <>
            {/* Manage Jobs */}

            <Link
              href="/tnp/jobs"
              className="flex items-center gap-4 px-4 py-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white"
            >
              <Briefcase size={20} />
              <span>Manage Companies</span>
            </Link>

            {/* Create Job */}

            <Link
              href="/tnp/jobs/create"
              className="flex items-center gap-4 px-4 py-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white"
            >
              <PlusCircle size={20} />
              <span>Create Job</span>
            </Link>

            {/* Applicants */}

            <button
              type="button"
              className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-gray-400 cursor-default"
            >
              <Users size={20} />
              <span>Student Data</span>
            </button>
          </>
        )}
      </nav>

      {/* Logout */}

      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
