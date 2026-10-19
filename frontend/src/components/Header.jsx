"use client";

import { useState } from "react";
import { Bell } from "lucide-react";

export default function Header({ role = "student" }) {
    const [user] = useState(() => {
        if (typeof window === "undefined") return null;

        const storedUser = window.localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const name = user?.name || (role === "student" ? "Student" : "TNP");
    const initial = name.charAt(0).toUpperCase();

    return (
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8">

            {/* Left side */}

            <div>
                <p className="text-sm text-gray-500">
                    {role === "student"
                        ? "Student Portal"
                        : "Training & Placement"}
                </p>

                <h2 className="text-xl font-semibold text-gray-900">
                    Welcome back, {name}
                </h2>
            </div>


            {/* Right side */}

            <div className="flex items-center gap-6">

                {/* Notification */}

                <button
                    type="button"
                    className="relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-50"
                >
                    <Bell
                        size={21}
                        className="text-gray-500"
                    />

                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-400 rounded-full" />
                </button>


                {/* Profile */}

                <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-semibold">
                        {initial}
                    </div>

                    <div className="hidden md:block">
                        <p className="text-sm font-medium text-gray-900">
                            {name}
                        </p>

                        <p className="text-xs text-gray-500">
                            {role === "student" ? "Student" : "TNP"}
                        </p>
                    </div>

                </div>

            </div>

        </header>
    );
}