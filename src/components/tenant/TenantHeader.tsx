'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { Menu, Bell, Sparkles, SlidersHorizontal } from 'lucide-react';

interface TenantHeaderProps {
  onOpenMobileMenu: () => void;
  title?: string;
  subtitle?: string;
}

export default function TenantHeader({
  onOpenMobileMenu,
  title,
  subtitle,
}: TenantHeaderProps) {
  const { tenantProfile } = useApp();

  return (
    <header className="bg-white border-b border-slate-200/80 px-4 sm:px-8 py-3.5 sticky top-[37px] z-30">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile trigger & Page titles */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Open sidebar navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span>{title || `Welcome Back, ${tenantProfile.name.split(' ')[0]}!`}</span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200/60">
                <Sparkles className="w-3 h-3 text-teal-600" />
                Live Matching
              </span>
            </h1>
            {subtitle && (
              <p className="text-xs text-slate-500 hidden sm:block mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Right: Quick Preference trigger & Profile Pill */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <Link
            href="/tenant/preferences"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-indigo-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-600" />
            <span>Edit Criteria</span>
          </Link>

          <Link
            href="/tenant/requests"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors relative"
            title="Active enquiries"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
          </Link>

          <Link
            href="/tenant/profile"
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-200 border border-slate-300">
              <Image
                src={tenantProfile.photoUrl}
                alt={tenantProfile.name}
                fill
                sizes="32px"
                className="object-cover"
              />
            </div>
            <div className="hidden lg:block text-left text-xs leading-tight">
              <span className="font-bold text-slate-900 block">{tenantProfile.name}</span>
              <span className="text-[10px] text-slate-400 capitalize">{tenantProfile.occupation}</span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
