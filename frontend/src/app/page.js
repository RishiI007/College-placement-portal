"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  UserRound,
  GraduationCap,
  UsersRound,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F8F9FC] text-[#111827] overflow-hidden">
      {/* =========================
                BACKGROUND DECORATION
            ========================== */}

      <div className="fixed top-[-250px] right-[-180px] w-[650px] h-[650px] rounded-full bg-indigo-100/50 blur-3xl pointer-events-none" />

      <div className="fixed bottom-[-300px] left-[-200px] w-[600px] h-[600px] rounded-full bg-indigo-100/40 blur-3xl pointer-events-none" />

      {/* =========================
                NAVBAR
            ========================== */}

      <nav className="relative z-20 px-6 lg:px-12 pt-4">
        <div className="max-w-[1450px] mx-auto">
          <div className="h-[76px] bg-white/90 backdrop-blur-xl border border-white rounded-full shadow-[0_10px_40px_rgba(31,41,55,0.08)] px-6 lg:px-8 flex items-center justify-between">
            {/* Logo */}

            <Link href="/" className="flex items-center gap-4">
              {/* NIT Logo */}
              <Image
                src="/nits-logo.png"
                alt="NIT Logo"
                width={44}
                height={44}
                className="w-11 h-11 rounded-full object-contain bg-white border border-gray-200 shadow-sm"
              />

              <div className="hidden sm:block">
                <h1 className="text-[17px] font-bold tracking-wide text-[#17233D] leading-tight">
                  NATIONAL INSTITUTE OF TECHNOLOGY SILCHAR
                </h1>

                <p className="text-[11px] tracking-[0.25em] text-gray-400 mt-1">
                  LEARN&nbsp;&nbsp; | &nbsp;&nbsp;INNOVATE&nbsp;&nbsp; |
                  &nbsp;&nbsp;LEAD
                </p>
              </div>
            </Link>

            {/* Navigation */}

            <div className="hidden lg:flex items-center gap-2">
              <NavLink href="/" active>
                Home
              </NavLink>

              <NavLink href="#">About</NavLink>

              <NavLink href="#">Students</NavLink>

              <NavLink href="#">Recruiters</NavLink>

              <NavLink href="#">Placement Stats</NavLink>

              <NavLink href="#">Contact</NavLink>
            </div>
          </div>
        </div>
      </nav>

      {/* =========================
                HERO
            ========================== */}

      <section className="relative z-10">
        <div className="max-w-[1450px] mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-center min-h-[calc(100vh-105px)] py-16 lg:py-12">
            {/* =========================
                            LEFT CONTENT
                        ========================== */}

            <div className="relative z-10">
              {/* Badge */}

              <div className="inline-flex items-center gap-3 bg-indigo-50 border border-indigo-100 text-indigo-600 px-5 py-2.5 rounded-full text-sm font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                College Placement Management System
              </div>

              {/* Heading */}

              <h2 className="text-4xl xl:text-[60px] font-bold leading-[1.05] tracking-[-0.04em] text-[#111827] mt-8">
                Your career.
                <br />
                <span className="text-indigo-600">Our commitment.</span>
              </h2>

              {/* Description */}

              <p className="text-lg xl:text-xl text-gray-500 leading-8 max-w-xl mt-7">
                Connecting talented students with global opportunities.
                Together, we build brighter futures.
              </p>

              {/* Buttons */}

              <div className="flex flex-wrap items-center gap-4 mt-9">
                <Link
                  href="/login"
                  className="group flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-7 py-4 rounded-full font-semibold shadow-[0_12px_25px_rgba(79,70,229,0.25)] transition-all"
                >
                  <GraduationCap size={20} />
                  Login to Portal
                  <ArrowRight
                    size={19}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>

              {/* Features */}

              <div className="flex flex-wrap gap-x-7 gap-y-3 mt-8">
                <Feature text="Find opportunities" />

                <Feature text="Track applications" />

                <Feature text="Manage placements" />
              </div>
            </div>

            {/* =========================
                            RIGHT DASHBOARD
                        ========================== */}

            <div className="relative">
              {/* Soft background circle */}

              <div className="absolute w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-2xl top-[-70px] right-[-80px]" />

              {/* Dashboard */}

              <div className="relative bg-[#20212B] rounded-[30px] p-8 lg:p-9 shadow-[0_30px_70px_rgba(17,24,39,0.25)]">
                {/* Header */}

                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Placement Overview</p>

                    <h3 className="text-3xl font-bold text-white mt-2">
                      Career Dashboard
                    </h3>
                  </div>

                  <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center">
                    <GraduationCap size={27} />
                  </div>
                </div>

                {/* Stats */}

                <div className="grid grid-cols-2 gap-5 mt-9">
                  <DashboardStat
                    icon={<BriefcaseBusiness size={22} />}
                    value="24"
                    label="Open Positions"
                  />

                  <DashboardStat
                    icon={<Building2 size={22} />}
                    value="12"
                    label="Companies"
                  />
                </div>

                {/* Recent opportunity */}

                <div className="mt-5 bg-white/[0.07] border border-white/10 rounded-2xl p-5">
                  <p className="text-sm text-gray-400">Recent Opportunity</p>

                  <div className="flex items-center justify-between gap-5 mt-3">
                    <div>
                      <h4 className="text-lg font-semibold text-white">
                        Software Engineer
                      </h4>

                      <p className="text-sm text-gray-400 mt-1">
                        Technology Company
                      </p>
                    </div>

                    <span className="shrink-0 bg-green-400/20 text-green-300 px-4 py-2 rounded-full text-xs font-semibold">
                      Apply Now
                    </span>
                  </div>
                </div>

                {/* Placement Journey */}

                <div className="mt-5 bg-white/[0.07] border border-white/10 rounded-2xl p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-300">Placement Journey</p>

                    <p className="text-sm text-indigo-300 font-medium">75%</p>
                  </div>

                  <div className="h-2 bg-white/10 rounded-full mt-4 overflow-hidden">
                    <div className="h-full w-3/4 bg-indigo-500 rounded-full" />
                  </div>

                  <div className="flex justify-between mt-3 text-xs text-gray-500">
                    <span>Profile</span>

                    <span>Applied</span>

                    <span>Shortlisted</span>

                    <span>Selected</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
                FOOTER
            ========================== */}

      <div className="relative z-10 text-center pb-5">
        <p className="text-xs text-gray-400">
          © 2026 NIT Silchar • Placement Portal
        </p>
      </div>
    </main>
  );
}

/* =========================
   NAV LINK
========================= */

function NavLink({ href, children, active = false }) {
  return (
    <Link
      href={href}
      className={`
                px-4 py-2.5 rounded-full text-sm font-medium transition
                ${
                  active
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
                }
            `}
    >
      {children}
    </Link>
  );
}

/* =========================
   FEATURE
========================= */

function Feature({ text }) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <CheckCircle2 size={16} className="text-indigo-600" />

      <span>{text}</span>
    </div>
  );
}

/* =========================
   DASHBOARD STAT
========================= */

function DashboardStat({ icon, value, label }) {
  return (
    <div className="bg-white/[0.08] border border-white/10 rounded-2xl p-5">
      <div className="w-11 h-11 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center">
        {icon}
      </div>

      <p className="text-3xl font-bold text-white mt-5">{value}</p>

      <p className="text-sm text-gray-400 mt-1">{label}</p>
    </div>
  );
}
