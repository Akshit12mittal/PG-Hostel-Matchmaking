'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { calculateRoomMatch } from '@/lib/matchingEngine';
import { formatINR } from '@/lib/utils';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Building2,
  Bed,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  Users,
  Check,
  Send,
  Plus,
} from 'lucide-react';

export default function OwnerDashboard() {
  const { properties, enquiries, updateEnquiryStatus, tenantProfile } = useApp();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter properties owned by Rajesh Sharma
  const ownerProperties = properties.filter(
    (p) => p.ownerId === 'owner-rajesh' || p.ownerName.includes('Rajesh')
  );

  const totalBeds = ownerProperties.reduce((acc, p) => acc + p.totalBeds, 0);
  const vacantBeds = ownerProperties.reduce((acc, p) => acc + p.availableBeds, 0);
  const occupiedBeds = totalBeds - vacantBeds;
  const occupancyRate = totalBeds > 0 ? ((occupiedBeds / totalBeds) * 100).toFixed(1) : '0';
  const pendingEnquiries = enquiries.filter((e) => e.status === 'pending');

  // Chart data: Monthly Occupancy Trend
  const occupancyTrendData = [
    { month: 'Jun', occupancy: 68 },
    { month: 'Jul', occupancy: 72 },
    { month: 'Aug', occupancy: 85 },
    { month: 'Sep', occupancy: 82 },
    { month: 'Oct', occupancy: 77.5 },
    { month: 'Nov (Est)', occupancy: 91 },
  ];

  // Chart data: Sharing Demand
  const sharingDemandData = [
    { name: 'Double Sharing', value: 48, color: '#4F46E5' },
    { name: 'Single Room', value: 28, color: '#0D9488' },
    { name: 'Triple Sharing', value: 18, color: '#3B82F6' },
    { name: 'Four Sharing', value: 6, color: '#8B5CF6' },
  ];

  // Chart data: Tenant Budget Distribution in Sector 15/22
  const budgetDistData = [
    { range: '< ₹7,000', students: 18 },
    { range: '₹7k - ₹9k', students: 54 },
    { range: '₹9k - ₹12k', students: 38 },
    { range: '> ₹12,000', students: 16 },
  ];

  // Sample prospective tenant matches for Green Nest PG
  const targetProperty = ownerProperties[0] || properties[0];
  const sampleMatch = targetProperty ? calculateRoomMatch(targetProperty, tenantProfile) : null;

  return (
    <div className="space-y-8 pb-16">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Smarter Tenant Matching • Better Occupancy</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Welcome Back, Rajesh Sharma
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1.5 font-normal leading-relaxed">
            Managing 4 student residencies across Chandigarh & Mohali. RoomSync&apos;s allocation engine matches you with high-intent students whose budgets, dietary routines, and academic schedules align with your house policies.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-5">
            <Link
              href="/owner/rooms/add"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold transition-all shadow-md active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>List New Property</span>
            </Link>
            <Link
              href="/owner/requests"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700"
            >
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Review {pendingEnquiries.length} Pending Enquiries</span>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Properties
          </span>
          <strong className="text-2xl font-black text-white mt-1 block">
            {ownerProperties.length}
          </strong>
          <span className="text-[10px] text-teal-400 font-medium">All Verified</span>
        </div>

        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Total Beds
          </span>
          <strong className="text-2xl font-black text-white mt-1 block">
            {totalBeds}
          </strong>
          <span className="text-[10px] text-slate-400 font-medium">Capacity</span>
        </div>

        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Occupied
          </span>
          <strong className="text-2xl font-black text-indigo-400 mt-1 block">
            {occupiedBeds}
          </strong>
          <span className="text-[10px] text-indigo-300 font-medium">Active tenants</span>
        </div>

        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Vacant Beds
          </span>
          <strong className="text-2xl font-black text-amber-400 mt-1 block">
            {vacantBeds}
          </strong>
          <span className="text-[10px] text-amber-300 font-medium">Available now</span>
        </div>

        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Occupancy Rate
          </span>
          <strong className="text-2xl font-black text-emerald-400 mt-1 block">
            {occupancyRate}%
          </strong>
          <span className="text-[10px] text-emerald-300 font-medium">+14% vs market</span>
        </div>

        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Pending Enquiries
          </span>
          <strong className="text-2xl font-black text-teal-400 mt-1 block">
            {pendingEnquiries.length}
          </strong>
          <span className="text-[10px] text-teal-300 font-medium">Awaiting reply</span>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Occupancy Trend Chart */}
        <div className="bg-slate-900 p-5 sm:p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-base text-white">
                Monthly Occupancy Trend (%)
              </h3>
              <p className="text-xs text-slate-400">
                Peak university admission spikes visible in August & November
              </p>
            </div>
            <span className="text-xs font-bold text-teal-400 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              91% Forecast
            </span>
          </div>

          <div className="h-60 w-full">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={occupancyTrendData}>
                  <defs>
                    <linearGradient id="occupancyGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0D9488" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#0D9488" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                  <XAxis dataKey="month" stroke="#64748B" fontSize={11} />
                  <YAxis stroke="#64748B" fontSize={11} domain={[50, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0F172A',
                      borderColor: '#334155',
                      borderRadius: '12px',
                      color: '#F8FAFC',
                      fontSize: '12px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="occupancy"
                    stroke="#0D9488"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#occupancyGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Tenant Budget Distribution Chart */}
        <div className="bg-slate-900 p-5 sm:p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-base text-white">
                Student Budget Distribution (Chandigarh)
              </h3>
              <p className="text-xs text-slate-400">
                Highest concentration in ₹7k–₹9k (fits Green Nest double sharing)
              </p>
            </div>
          </div>

          <div className="h-60 w-full">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={budgetDistData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                  <XAxis dataKey="range" stroke="#64748B" fontSize={11} />
                  <YAxis stroke="#64748B" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0F172A',
                      borderColor: '#334155',
                      borderRadius: '12px',
                      color: '#F8FAFC',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="students" fill="#4F46E5" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* Recommended Tenant Matches for Rajesh Sharma's properties */}
      <div className="bg-slate-900 p-6 sm:p-7 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-400 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Proactive Occupancy Fill Engine</span>
            </div>
            <h3 className="text-xl font-black text-white">
              Recommended Prospective Tenant Matches
            </h3>
            <p className="text-xs text-slate-400">
              Students seeking accommodation matching your vacant rooms in Green Nest PG and Urban Stay
            </p>
          </div>
          <Link
            href="/owner/tenants"
            className="text-xs font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1"
          >
            <span>View All Prospective Tenants</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Tenant match card preview */}
        {targetProperty && sampleMatch && (
          <div className="bg-slate-950/80 rounded-2xl border border-slate-800 p-5 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-slate-800 flex-shrink-0">
                  <Image
                    src={tenantProfile.photoUrl}
                    alt={tenantProfile.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="text-white text-base font-extrabold">
                      {tenantProfile.name}
                    </strong>
                    <span className="text-xs text-slate-400">
                      ({tenantProfile.age}y, {tenantProfile.occupation})
                    </span>
                    <span className="text-[10px] font-bold text-teal-300 bg-teal-500/20 px-2 py-0.5 rounded-full border border-teal-400/30">
                      {sampleMatch.totalScore}% Compatibility
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Enrolled at <strong>{tenantProfile.collegeOrWorkplace}</strong> • Target Rent: {formatINR(tenantProfile.budgetMin)}–{formatINR(tenantProfile.budgetMax)}
                  </p>
                  <p className="text-xs text-slate-300 mt-1.5 italic">
                    Matched for: <strong className="text-teal-300">{targetProperty.name}</strong> (Vacant Double Sharing)
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="flex items-center gap-2">
                <Link
                  href="/owner/requests"
                  className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md transition-all"
                >
                  Inspect Enquiry & Slot Visit
                </Link>
              </div>
            </div>

            {/* Why this tenant is suitable */}
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1.5">
              <span className="font-bold text-teal-400 uppercase tracking-wider text-[10px] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Why this tenant is suitable for your property:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                  <span>Budget (₹{tenantProfile.budgetMax.toLocaleString('en-IN')}) meets monthly rent (₹{targetProperty.monthlyRent.toLocaleString('en-IN')})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                  <span>Early sleeper matches your 10:30 PM quiet hours</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                  <span>Pure vegetarian food requirement aligns with kitchen rules</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                  <span>Target move-in ({tenantProfile.preferredMoveInDate}) matches current vacancy</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
