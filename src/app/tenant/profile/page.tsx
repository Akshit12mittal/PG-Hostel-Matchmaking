'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { formatINR } from '@/lib/utils';
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  MapPin,
  SlidersHorizontal,
  Calendar,
  CheckCircle2,
  Shield,
  Sparkles,
} from 'lucide-react';

export default function TenantProfilePage() {
  const { tenantProfile } = useApp();

  return (
    <div className="space-y-8 pb-16 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
              Verified Tenant Profile
            </span>
            <span className="text-xs text-slate-400 font-semibold">
              IITM DTD-DAD Demo
            </span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Tenant Profile & Identity
          </h2>
          <p className="text-xs text-slate-500">
            Your accommodation resume presented to PG owners and prospective roommates
          </p>
        </div>

        <Link
          href="/tenant/preferences"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20 transition-all self-start sm:self-auto"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Edit Matching Criteria</span>
        </Link>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="relative w-24 h-24 rounded-3xl overflow-hidden bg-slate-100 border-2 border-indigo-200 shadow-md flex-shrink-0">
            <Image
              src={tenantProfile.photoUrl}
              alt={tenantProfile.name}
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-black text-slate-900">
                {tenantProfile.name}
              </h3>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Verified Student
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-medium flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              <span>{tenantProfile.collegeOrWorkplace} • {tenantProfile.city}</span>
            </p>
            <p className="text-xs text-slate-500 italic max-w-xl pt-1">
              &ldquo;{tenantProfile.bio}&rdquo;
            </p>
          </div>
        </div>

        {/* Contact info grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
            <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <div className="truncate">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Email Address</span>
              <span className="font-semibold text-slate-800">{tenantProfile.email}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
            <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <div className="truncate">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Contact Number</span>
              <span className="font-semibold text-slate-800">{tenantProfile.phone}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
            <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <div className="truncate">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Target Move-in</span>
              <span className="font-semibold text-slate-800">{tenantProfile.preferredMoveInDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary of Active Matching Criteria */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <h3 className="font-extrabold text-base text-slate-900">
              Active Algorithm Calibration
            </h3>
          </div>
          <Link
            href="/tenant/preferences"
            className="text-xs font-bold text-indigo-600 hover:underline"
          >
            Adjust Criteria
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Monthly Budget</span>
            <strong className="text-slate-900 font-extrabold text-sm block mt-0.5">
              {formatINR(tenantProfile.budgetMin)} - {formatINR(tenantProfile.budgetMax)}
            </strong>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Locality Focus</span>
            <strong className="text-slate-900 font-extrabold text-sm block mt-0.5">
              {tenantProfile.preferredLocation} (≤{tenantProfile.maxDistanceKm}km)
            </strong>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Sharing Type</span>
            <strong className="text-slate-900 font-extrabold text-sm block mt-0.5 capitalize">
              {tenantProfile.sharingPreference} Sharing
            </strong>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Dietary Routine</span>
            <strong className="text-slate-900 font-extrabold text-sm block mt-0.5 capitalize">
              {tenantProfile.foodPreference}
            </strong>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Sleep Routine</span>
            <strong className="text-slate-900 font-extrabold text-sm block mt-0.5 capitalize">
              {tenantProfile.sleepSchedule.replace('-', ' ')}
            </strong>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Cleanliness</span>
            <strong className="text-slate-900 font-extrabold text-sm block mt-0.5 capitalize">
              {tenantProfile.cleanliness.replace('-', ' ')}
            </strong>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Noise Tolerance</span>
            <strong className="text-slate-900 font-extrabold text-sm block mt-0.5 capitalize">
              {tenantProfile.noiseTolerance} Environment
            </strong>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Smoking Policy</span>
            <strong className="text-slate-900 font-extrabold text-sm block mt-0.5 capitalize">
              {tenantProfile.smokingPreference}
            </strong>
          </div>
        </div>

        {/* Essential amenities */}
        <div>
          <span className="text-slate-500 text-xs font-semibold block mb-2">
            Requested Essential Facilities:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {tenantProfile.essentialAmenities.map((a) => (
              <span
                key={a}
                className="text-xs px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-medium border border-indigo-100"
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
