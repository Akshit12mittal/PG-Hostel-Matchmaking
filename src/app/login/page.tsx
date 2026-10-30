'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { DEMO_USERS } from '@/data/mockData';
import { UserRole } from '@/types';
import {
  GraduationCap,
  Building2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Home,
  CheckCircle2,
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { setRole } = useApp();

  const handleSelectRole = (selectedRole: UserRole) => {
    setRole(selectedRole);
    if (selectedRole === 'tenant') {
      router.push('/tenant/dashboard');
    } else if (selectedRole === 'owner') {
      router.push('/owner/dashboard');
    } else if (selectedRole === 'admin') {
      router.push('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Top Header */}
      <div className="max-w-5xl w-full mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-navy-900 via-indigo-700 to-teal-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/20">
            <Home className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold text-xl text-white tracking-tight">
            Room<span className="text-indigo-400">Sync</span>
          </span>
        </Link>

        <Link
          href="/"
          className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 transition-colors"
        >
          <span>Back to Landing</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl w-full mx-auto my-12 space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Academic Demonstration Sandbox</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Select Your Interactive Demo Role
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
            No password required. Explore RoomSync from the viewpoint of a student tenant, a commercial PG landlord, or an IIT Madras DTD-DAD project evaluator.
          </p>
        </div>

        {/* 3 Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tenant */}
          <div
            onClick={() => handleSelectRole('tenant')}
            className="group cursor-pointer bg-slate-800/90 hover:bg-slate-800 rounded-3xl p-6 border-2 border-slate-700 hover:border-indigo-500 shadow-xl transition-all hover:-translate-y-1 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-400/20">
                  Primary Flow
                </span>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-slate-700 flex-shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                    alt="Akshit Mittal"
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-white">
                    Akshit Mittal
                  </h3>
                  <p className="text-xs text-indigo-300 font-medium">
                    Prospective Student Tenant
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                Experience multi-parameter room discovery, transparent algorithm breakdown, roommate compatibility scoring, and booking enquiries.
              </p>
            </div>

            <div className="pt-6 border-t border-slate-700/60 mt-6 flex items-center justify-between text-xs font-bold text-indigo-400 group-hover:text-indigo-300">
              <span>Continue as Tenant</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* PG Owner */}
          <div
            onClick={() => handleSelectRole('owner')}
            className="group cursor-pointer bg-slate-800/90 hover:bg-slate-800 rounded-3xl p-6 border-2 border-slate-700 hover:border-teal-500 shadow-xl transition-all hover:-translate-y-1 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-teal-500/20 text-teal-400 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-400/20">
                  Host Flow
                </span>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-slate-700 flex-shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
                    alt="Rajesh Sharma"
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-white">
                    Rajesh Sharma
                  </h3>
                  <p className="text-xs text-teal-300 font-medium">
                    Commercial PG Property Host
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                Manage 4 student residencies, inspect Recharts occupancy analytics, review tenant leads, slot in-person visits, and toggle vacancies.
              </p>
            </div>

            <div className="pt-6 border-t border-slate-700/60 mt-6 flex items-center justify-between text-xs font-bold text-teal-400 group-hover:text-teal-300">
              <span>Continue as Host</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Evaluator / Admin */}
          <div
            onClick={() => handleSelectRole('admin')}
            className="group cursor-pointer bg-slate-800/90 hover:bg-slate-800 rounded-3xl p-6 border-2 border-slate-700 hover:border-purple-500 shadow-xl transition-all hover:-translate-y-1 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-400/20">
                  Evaluator Flow
                </span>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-slate-700 flex-shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                    alt="Course Reviewer"
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-white">
                    Course Evaluator
                  </h3>
                  <p className="text-xs text-purple-300 font-medium">
                    IIT Madras DTD-DAD Viva
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                Supervise system-wide KPIs, verify Design Thinking dimensions (Desirability, Viability, Feasibility), and test mock data resets.
              </p>
            </div>

            <div className="pt-6 border-t border-slate-700/60 mt-6 flex items-center justify-between text-xs font-bold text-purple-400 group-hover:text-purple-300">
              <span>Continue as Admin</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="max-w-4xl w-full mx-auto text-center text-xs text-slate-500">
        IIT Madras Design Thinking for Data-Driven App Development (DTD-DAD) Project Demonstration.
      </div>
    </div>
  );
}
