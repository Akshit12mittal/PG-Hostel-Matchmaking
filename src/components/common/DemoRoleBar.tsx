'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/types';
import { RotateCcw, GraduationCap, Building2, ShieldCheck, Sparkles, Home } from 'lucide-react';

export default function DemoRoleBar() {
  const { role, setRole, resetDemoData } = useApp();
  const router = useRouter();
  const pathname = usePathname();

  const handleRoleSwitch = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole === 'tenant') {
      router.push('/tenant/dashboard');
    } else if (newRole === 'owner') {
      router.push('/owner/dashboard');
    } else if (newRole === 'admin') {
      router.push('/admin/dashboard');
    }
  };

  return (
    <aside aria-label="Demo role selector" className="bg-slate-900 text-slate-100 border-b border-slate-800 text-xs px-3 sm:px-6 py-2 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Academic Project Badge */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
            <Sparkles className="w-3 h-3 text-indigo-400" />
            IIT Madras DTD-DAD Project
          </span>
          <span className="hidden md:inline text-slate-400">
            Smart PG Allocation & Roommate Matching
          </span>
        </div>

        {/* Role Switcher & Controls */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <span className="text-slate-400 hidden sm:inline">Active Persona:</span>

          <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700">
            <button
              onClick={() => handleRoleSwitch('tenant')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-all ${
                role === 'tenant'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Tenant</span>
            </button>

            <button
              onClick={() => handleRoleSwitch('owner')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-all ${
                role === 'owner'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>PG Owner</span>
            </button>

            <button
              onClick={() => handleRoleSwitch('admin')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-all ${
                role === 'admin'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          </div>

          {pathname !== '/' && (
            <Link
              href="/"
              className="text-slate-300 hover:text-white flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-800 transition-colors"
              title="Return to Public Landing Page"
            >
              <Home className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Landing</span>
            </Link>
          )}

          <button
            onClick={() => {
              if (window.confirm('Reset all demo data back to default IITM prototype state?')) {
                resetDemoData();
              }
            }}
            className="flex items-center gap-1 text-slate-300 hover:text-amber-300 px-2 py-1 rounded hover:bg-slate-800 transition-colors"
            title="Reset simulated data"
          >
            <RotateCcw className="w-3 h-3 text-amber-400" />
            <span className="hidden sm:inline">Reset Demo</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
