'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  Building2,
  LayoutDashboard,
  Bed,
  PlusCircle,
  Inbox,
  Users2,
  Home,
  Shield,
  TrendingUp,
} from 'lucide-react';

interface OwnerSidebarProps {
  onCloseMobile?: () => void;
}

export default function OwnerSidebar({ onCloseMobile }: OwnerSidebarProps) {
  const pathname = usePathname();
  const { enquiries } = useApp();

  const pendingOwnerEnquiries = enquiries.filter(
    (e) => e.status === 'pending'
  ).length;

  const links = [
    {
      label: 'Host Dashboard',
      href: '/owner/dashboard',
      icon: LayoutDashboard,
      badge: 'Analytics',
      badgeColor: 'bg-indigo-50 text-indigo-700',
    },
    {
      label: 'My Properties',
      href: '/owner/rooms',
      icon: Bed,
      badge: null,
    },
    {
      label: 'Add New Property',
      href: '/owner/rooms/add',
      icon: PlusCircle,
      badge: 'New',
      badgeColor: 'bg-teal-50 text-teal-700',
    },
    {
      label: 'Tenant Enquiries',
      href: '/owner/requests',
      icon: Inbox,
      badge: pendingOwnerEnquiries > 0 ? `${pendingOwnerEnquiries}` : null,
      badgeColor: 'bg-amber-50 text-amber-700',
    },
    {
      label: 'Prospective Tenants',
      href: '/owner/tenants',
      icon: Users2,
      badge: null,
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
            <div className="w-9 h-9 rounded-xl bg-teal-500 flex items-center justify-center text-slate-950 font-black shadow-md shadow-teal-500/20">
              <Building2 className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                Room<span className="text-teal-400">Sync</span>
              </span>
              <span className="block text-[10px] text-teal-400 font-semibold uppercase tracking-wider">
                PG Owner Portal
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Section */}
        <div className="space-y-1">
          <div className="px-2 pb-2 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
            Property Management
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
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
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
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : item.badgeColor || 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Academic Prototype Footnote in Sidebar */}
      <div className="mt-6 pt-4 border-t border-slate-800 px-2 space-y-3">
        <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs">
          <div className="flex items-center gap-1.5 text-teal-400 font-bold mb-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Business Viability</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-snug">
            Smarter matching cuts bed vacancy from 45 days to under 12 days.
          </p>
        </div>

        <Link
          href="/tenant/dashboard"
          onClick={onCloseMobile}
          className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all"
        >
          <span>Switch to Tenant View</span>
          <Home className="w-3.5 h-3.5 text-slate-400" />
        </Link>
      </div>
    </div>
  );
}
