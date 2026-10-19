
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  GraduationCap,
  BriefcaseBusiness,
  ShieldCheck,
  Eye,
  EyeOff,
  Users,
  Check,
} from "lucide-react";

const demoAccounts = [
  {
    role: "Student",
    email: "student@gmail.com",
    password: "123456",
    description: "Explore jobs and track applications",
    icon: GraduationCap,
  },
  {
    role: "TNP Officer",
    email: "tnp@gmail.com",
    password: "123456",
    description: "Manage companies and placements",
    icon: BriefcaseBusiness,
  },
];

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedDemo, setSelectedDemo] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
    setSelectedDemo("");
  };

  const fillDemo = (account) => {
    setForm({
      email: account.email,
      password: account.password,
    });
    setSelectedDemo(account.role);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid email or password.");
        return;
      }

      if (!data.token || !data.user) {
        setError("Invalid response received from server.");
        return;
      }

      if (!["student", "tnp"].includes(data.user.role)) {
        setError("This account does not have portal access.");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      router.push(
        data.user.role === "student" ? "/student" : "/tnp"
      );
    } catch {
      setError("Unable to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F7F5] p-4 sm:p-6">

      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_20px_60px_rgba(17,24,39,0.08)] md:grid-cols-2">

        {/* LEFT: BRANDING AND DEMO ACCOUNTS */}

        <section className="relative flex flex-col overflow-hidden bg-[#20212B] p-7 sm:p-10 lg:p-12">

          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-indigo-500/[0.07] blur-3xl" />
            <div>
              <h1 className="text-xl font-bold tracking-wide text-white">
                NIT Silchar
              </h1>
              <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-gray-400">
                Placement Portal
              </p>
            </div>

          <div className="relative z-10 mb-8 mt-12">
            <p className="mt-4 max-w-sm text-sm leading-6 text-gray-400">
              Try the placement portal using a demo account.
              Select a role below to fill in its login credentials.
            </p>
          </div>

          {/* Demo account cards */}

          <div className="relative z-10 space-y-4">

            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
              Demo accounts
            </p>

            {demoAccounts.map((account) => {
              const Icon = account.icon;
              const isSelected = selectedDemo === account.role;

              return (
                <button
                  key={account.role}
                  type="button"
                  onClick={() => fillDemo(account)}
                  className={`group w-full rounded-xl border p-4 text-left transition duration-200 ${
                    isSelected
                      ? "border-[#8177FF] bg-[#343447]"
                      : "border-white/10 bg-white/4 hover:border-white/25 hover:bg-white/[0.07]"
                  }`}
                >
                  <div className="flex items-center gap-3">

                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-white">
                        {account.role}
                      </p>
                    </div>

                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition ${
                      isSelected
                        ? "bg-[#6254FF] text-white"
                        : "border border-white/10 text-gray-400 group-hover:text-white"
                    }`}>
                      {isSelected ? (
                        <Check size={17} />
                      ) : (
                        <ArrowRight size={17} />
                      )}
                    </div>

                  </div>

                  <div className="mt-3 border-t border-white/10 pt-3">
                    <p className="break-all text-xs text-gray-400">
                      {account.email}
                    </p>
                  </div>
                </button>
              );
            })}

          </div>

          <div className="relative z-10 mt-8 border-t border-white/10 pt-5">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <ShieldCheck size={16} className="text-[#A5A0FF]" />
              Secure placement portal
            </div>
          </div>

        </section>

        {/* RIGHT: LOGIN FORM */}

        <section className="flex items-center justify-center bg-white px-6 py-10 sm:px-10 lg:px-12 lg:py-14">

          <div className="w-full max-w-sm">

            <div className="mb-8">
              <p className="mb-2 text-sm font-semibold text-[#6254FF]">
                Welcome back
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-[#20212B]">
                Sign in to your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Enter your credentials to access your dashboard.
              </p>
            </div>

            {selectedDemo && (
              <div className="mb-5 flex items-center gap-2 rounded-lg border border-indigo-100 bg-indigo-50 px-3 py-2.5 text-sm text-indigo-700">
                <Check size={16} />
                {selectedDemo} demo credentials filled in
              </div>
            )}

            {error && (
              <div
                role="alert"
                className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="username"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#6254FF] focus:ring-4 focus:ring-[#6254FF]/10"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    autoComplete="current-password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#6254FF] focus:ring-4 focus:ring-[#6254FF]/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#6254FF] text-sm font-semibold text-white transition hover:bg-[#5145E5] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign in"}

                {!loading && (
                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                )}
              </button>

            </form>

            <div className="mt-8 border-t border-gray-200 pt-5">
              <p className="mt-3 text-center text-xs text-gray-400">
                NIT Silchar · Placement Portal
              </p>
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}
