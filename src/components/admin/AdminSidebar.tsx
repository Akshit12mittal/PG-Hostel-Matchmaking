'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  ShieldCheck,
  LayoutDashboard,
  Users,
  Building,
  RotateCcw,
  Sparkles,
  Home,
  CheckCircle2,
  Award,
} from 'lucide-react';

interface AdminSidebarProps {
  onCloseMobile?: () => void;
}

export default function AdminSidebar({ onCloseMobile }: AdminSidebarProps) {
  const pathname = usePathname();
  const { resetDemoData } = useApp();

  const links = [
    {
      label: 'System Overview',
      href: '/admin/dashboard',
      icon: LayoutDashboard,
      badge: 'Academic',
    },
    {
      label: 'Platform Users',
      href: '/admin/users',
      icon: Users,
      badge: null,
    },
    {
      label: 'Property Listings',
      href: '/admin/listings',
      icon: Building,
      badge: 'Verified',
    },
  ];

  return (
    <div className="w-64 bg-slate-900 text-slate-100 border-r border-slate-800 h-full flex flex-col justify-between py-5 px-4 select-none">
      <div>
        {/* Logo */}
        <div className="px-2 mb-6">
          <Link
            href="/"
            onClick={onCloseMobile}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-md shadow-purple-600/30">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                Room<span className="text-purple-400">Sync</span>
              </span>
              <span className="block text-[10px] text-purple-300 font-semibold uppercase tracking-wider">
                Admin Evaluation Portal
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <div className="space-y-1">
          <div className="px-2 pb-2 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
            Project Supervision
          </div>
          {links.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onCloseMobile}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-white' : 'text-slate-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-slate-800 text-purple-300">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Academic Prototype Footnote & Demo Reset */}
      <div className="mt-6 pt-4 border-t border-slate-800 px-2 space-y-3">
        <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/40 text-xs">
          <div className="flex items-center gap-1.5 text-purple-300 font-bold mb-1">
            <Award className="w-3.5 h-3.5" />
            <span>IIT Madras DTD-DAD</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-snug">
            Data-driven allocation prototype evaluated for academic viva & peer review.
          </p>
        </div>

        <button
          onClick={() => {
            if (window.confirm('Reset all demo state to fresh mock data?')) {
              resetDemoData();
            }
          }}
          className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold transition-all border border-slate-700"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo Sandbox</span>
        </button>
      </div>
    </div>
  );
}
