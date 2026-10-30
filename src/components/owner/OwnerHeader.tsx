'use client';

import React from 'react';
import Link from 'next/link';
import { Menu, Plus, Bell } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface OwnerHeaderProps {
  onOpenMobileMenu: () => void;
  title?: string;
  subtitle?: string;
}

export default function OwnerHeader({
  onOpenMobileMenu,
  title,
  subtitle,
}: OwnerHeaderProps) {
  const { enquiries } = useApp();
  const pendingCount = enquiries.filter((e) => e.status === 'pending').length;

  return (
    <header className="bg-slate-900 border-b border-slate-800 px-4 sm:px-8 py-3.5 sticky top-[37px] z-30 text-white">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile trigger & Page titles */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <h1 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
              <span>{title || 'Welcome Back, Rajesh Sharma'}</span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-teal-300 bg-teal-500/20 px-2 py-0.5 rounded-full border border-teal-400/30">
                Verified Host
              </span>
            </h1>
            {subtitle && (
              <p className="text-xs text-slate-400 hidden sm:block mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Right: Quick actions & Link to Add Property */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <Link
            href="/owner/rooms/add"
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add Property</span>
          </Link>

          <Link
            href="/owner/requests"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors relative"
            title="Pending enquiries"
          >
            <Bell className="w-4 h-4" />
            {pendingCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-teal-400 ring-2 ring-slate-900" />
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
