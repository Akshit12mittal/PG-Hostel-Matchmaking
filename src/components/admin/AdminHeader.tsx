'use client';

import React from 'react';
import Link from 'next/link';
import { Menu, ShieldCheck, Sparkles, RotateCcw } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface AdminHeaderProps {
  onOpenMobileMenu: () => void;
  title?: string;
  subtitle?: string;
}

export default function AdminHeader({
  onOpenMobileMenu,
  title,
  subtitle,
}: AdminHeaderProps) {
  const { resetDemoData } = useApp();

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
              <span>{title || 'IIT Madras DTD-DAD Academic Evaluation'}</span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded-full border border-purple-400/30">
                Course Reviewer Mode
              </span>
            </h1>
            {subtitle && (
              <p className="text-xs text-slate-400 hidden sm:block mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Right: Sandbox reset */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (window.confirm('Reset all demo state to fresh mock data?')) {
                resetDemoData();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-semibold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Evaluation State</span>
          </button>
        </div>
      </div>
    </header>
  );
}
