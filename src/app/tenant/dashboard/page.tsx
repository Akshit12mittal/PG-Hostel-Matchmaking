'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { calculateRoomMatch, calculateRoommateMatch } from '@/lib/matchingEngine';
import PropertyCard from '@/components/tenant/PropertyCard';
import RoommateCard from '@/components/tenant/RoommateCard';
import {
  Sparkles,
  Bed,
  Users,
  Heart,
  Send,
  ArrowRight,
  CheckCircle2,
  SlidersHorizontal,
  Compass,
} from 'lucide-react';

export default function TenantDashboard() {
  const {
    tenantProfile,
    properties,
    roommates,
    savedPropertyIds,
    enquiries,
  } = useApp();

  // Compute live compatibility for all properties and sort by totalScore descending
  const matchedProperties = properties
    .map((prop) => ({
      property: prop,
      match: calculateRoomMatch(prop, tenantProfile),
    }))
    .sort((a, b) => b.match.totalScore - a.match.totalScore);

  // Compute live compatibility for all roommates and sort by totalScore descending
  const matchedRoommates = roommates
    .map((rm) => ({
      roommate: rm,
      match: calculateRoommateMatch(rm, tenantProfile),
    }))
    .sort((a, b) => b.match.totalScore - a.match.totalScore);

  const highMatchRoomsCount = matchedProperties.filter((p) => p.match.totalScore >= 70).length;
  const highMatchRoommatesCount = matchedRoommates.filter((r) => r.match.totalScore >= 75).length;
  const activeEnquiries = enquiries.filter(
    (e) => e.tenantId === 'tenant-akshit' && e.status !== 'rejected' && e.status !== 'completed'
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-navy-900 via-indigo-900 to-indigo-800 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/30 border border-indigo-400/30 text-indigo-200 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-teal-300" />
            <span>Intelligent Decision Support Active</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Good Morning, {tenantProfile.name.split(' ')[0]}!
          </h2>
          <p className="text-sm sm:text-base text-indigo-100/90 mt-1.5 font-normal leading-relaxed">
            Here are your personalized PG accommodation and compatible roommate recommendations calibrated against your budget (₹{tenantProfile.budgetMin.toLocaleString('en-IN')}–₹{tenantProfile.budgetMax.toLocaleString('en-IN')}) and {tenantProfile.collegeOrWorkplace} proximity.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-5">
            <Link
              href="/tenant/rooms"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-900 text-xs font-bold transition-all shadow-md active:scale-95"
            >
              <Compass className="w-4 h-4" />
              <span>Explore All {properties.length} Rooms</span>
            </Link>
            <Link
              href="/tenant/preferences"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur border border-white/20 transition-all"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Adjust Lifestyle Preferences</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Link
          href="/tenant/rooms"
          className="bg-white p-5 rounded-2xl border border-slate-200/90 hover:border-indigo-300 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Compatible Rooms</span>
            <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 group-hover:scale-110 transition-transform">
              <Bed className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {highMatchRoomsCount}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Properties scoring ≥70% match
          </p>
        </Link>

        <Link
          href="/tenant/roommates"
          className="bg-white p-5 rounded-2xl border border-slate-200/90 hover:border-teal-300 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Compatible Roommates</span>
            <div className="p-2.5 rounded-xl bg-teal-50 text-teal-600 group-hover:scale-110 transition-transform">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {highMatchRoommatesCount}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Sharing profiles with high lifestyle sync
          </p>
        </Link>

        <Link
          href="/tenant/rooms?filter=saved"
          className="bg-white p-5 rounded-2xl border border-slate-200/90 hover:border-rose-300 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Saved Rooms</span>
            <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600 group-hover:scale-110 transition-transform">
              <Heart className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {savedPropertyIds.length}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Shortlisted for quick review
          </p>
        </Link>

        <Link
          href="/tenant/requests"
          className="bg-white p-5 rounded-2xl border border-slate-200/90 hover:border-emerald-300 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Active Enquiries</span>
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 group-hover:scale-110 transition-transform">
              <Send className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {activeEnquiries.length}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Pending response / visit booked
          </p>
        </Link>
      </div>

      {/* Accommodation Journey Timeline Card */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-extrabold text-base text-slate-900">
              Your Accommodation Journey
            </h3>
            <p className="text-xs text-slate-500">
              Track progression from preference discovery to room confirmation
            </p>
          </div>
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full">
            Stage 3 of 4: Visiting
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-1">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs flex-shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Profile Calibrated</div>
              <div className="text-[11px] text-slate-500">100% complete</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs flex-shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Shortlisted</div>
              <div className="text-[11px] text-slate-500">{savedPropertyIds.length} properties saved</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-indigo-50/70 border border-indigo-200">
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
              3
            </div>
            <div>
              <div className="text-xs font-bold text-indigo-950">Host Enquiries</div>
              <div className="text-[11px] text-indigo-700 font-medium">{enquiries.length} sent • 1 visit set</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 opacity-60">
            <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs flex-shrink-0">
              4
            </div>
            <div>
              <div className="text-xs font-bold text-slate-700">Bed Allocation</div>
              <div className="text-[11px] text-slate-400">Final confirmation</div>
            </div>
          </div>
        </div>
      </div>

      {/* Best Accommodation Matches */}
      <div>
        <div className="flex items-end justify-between mb-5">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tailored Allocation Engine</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Your Best Room Matches
            </h3>
            <p className="text-xs text-slate-500">
              Ranked by weighted compatibility (Budget, Distance from {tenantProfile.collegeOrWorkplace}, Sharing arrangement, Amenities, Lifestyle)
            </p>
          </div>
          <Link
            href="/tenant/rooms"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <span>View All ({matchedProperties.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matchedProperties.slice(0, 3).map(({ property }) => (
            <PropertyCard
              key={property.id}
              property={property}
              tenant={tenantProfile}
            />
          ))}
        </div>
      </div>

      {/* Suggested Roommates Section */}
      <div>
        <div className="flex items-end justify-between mb-5">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-600 mb-1">
              <Users className="w-3.5 h-3.5" />
              <span>Roommate Harmony Engine</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Suggested Roommates
            </h3>
            <p className="text-xs text-slate-500">
              Students and peers matching your sleep schedule ({tenantProfile.sleepSchedule}), quiet study environment, and dietary preferences
            </p>
          </div>
          <Link
            href="/tenant/roommates"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <span>Explore All Roommates ({matchedRoommates.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matchedRoommates.slice(0, 3).map(({ roommate }) => (
            <RoommateCard key={roommate.id} roommate={roommate} />
          ))}
        </div>
      </div>
    </div>
  );
}
