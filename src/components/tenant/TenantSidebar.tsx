'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  LayoutDashboard,
  Search,
  Users,
  Scale,
  Send,
  Sliders,
  User,
  Home,
  Heart,
  ChevronRight,
  Shield,
  Sparkles,
} from 'lucide-react';

interface TenantSidebarProps {
  onCloseMobile?: () => void;
}

export default function TenantSidebar({ onCloseMobile }: TenantSidebarProps) {
  const pathname = usePathname();
  const { savedPropertyIds, comparePropertyIds, enquiries } = useApp();

  const activeEnquiriesCount = enquiries.filter(
    (e) => e.tenantId === 'tenant-akshit' && e.status !== 'rejected' && e.status !== 'completed'
  ).length;

  const links = [
    {
      label: 'Dashboard',
      href: '/tenant/dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      label: 'Smart Matches',
      href: '/tenant/matches',
      icon: Sparkles,
      badge: 'Algorithm',
      badgeColor: 'bg-emerald-50 text-emerald-700',
    },
    {
      label: 'Explore Rooms',
      href: '/tenant/rooms',
      icon: Search,
      badge: null,
    },
    {
      label: 'Roommate Match',
      href: '/tenant/roommates',
      icon: Users,
      badge: 'Algorithm',
      badgeColor: 'bg-teal-50 text-teal-700',
    },
    {
      label: 'Compare Rooms',
      href: '/tenant/compare',
      icon: Scale,
      badge: comparePropertyIds.length > 0 ? `${comparePropertyIds.length}/3` : null,
      badgeColor: 'bg-indigo-50 text-indigo-700',
    },
    {
      label: 'My Enquiries',
      href: '/tenant/requests',
      icon: Send,
      badge: activeEnquiriesCount > 0 ? `${activeEnquiriesCount}` : null,
      badgeColor: 'bg-emerald-50 text-emerald-700',
    },
    {
      label: 'Saved Rooms',
      href: '/tenant/rooms?filter=saved',
      icon: Heart,
      badge: savedPropertyIds.length > 0 ? `${savedPropertyIds.length}` : null,
      badgeColor: 'bg-rose-50 text-rose-700',
    },
    {
      label: 'Match Preferences',
      href: '/tenant/preferences',
      icon: Sliders,
      badge: null,
    },
    {
      label: 'My Profile',
      href: '/tenant/profile',
      icon: User,
      badge: null,
    },
  ];

  return (
    <div className="w-64 bg-white border-r border-slate-200/90 h-full flex flex-col justify-between py-5 px-4 select-none">
      <div>
        {/* Logo */}
        <div className="px-2 mb-6">
          <Link
            href="/"
            onClick={onCloseMobile}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-navy-900 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/20">
              <Home className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-slate-900 tracking-tight">
                Room<span className="text-indigo-600">Sync</span>
              </span>
              <span className="block text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                Tenant Portal
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Section */}
        <div className="space-y-1">
          <div className="px-2 pb-2 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
            Main Navigation
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
                    ? 'bg-indigo-50 text-indigo-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-indigo-600' : 'text-slate-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      item.badgeColor || 'bg-slate-100 text-slate-600'
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
      <div className="mt-6 pt-4 border-t border-slate-100 px-2 space-y-3">
        <Link
          href="/onboarding"
          onClick={onCloseMobile}
          className="flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-indigo-50 to-teal-50 border border-indigo-100 text-indigo-900 text-xs font-bold hover:shadow-sm transition-all"
        >
          <span>Retake Match Quiz</span>
          <ChevronRight className="w-4 h-4 text-indigo-500" />
        </Link>

        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px] text-slate-500 flex items-start gap-2">
          <Shield className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0 mt-0.5" />
          <span>IITM DTD-DAD Prototype. Weighted scoring without external API.</span>
        </div>
      </div>
    </div>
  );
}
