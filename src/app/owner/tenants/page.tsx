'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { calculateRoomMatch } from '@/lib/matchingEngine';
import { formatINR } from '@/lib/utils';
import {
  Users2,
  GraduationCap,
  MapPin,
  Sparkles,
  Check,
  Send,
} from 'lucide-react';

export default function OwnerTenantsPage() {
  const { tenantProfile, properties } = useApp();

  const targetProperty = properties[0];
  const match = calculateRoomMatch(targetProperty, tenantProfile);

  return (
    <div className="space-y-8 pb-16">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-500/20 px-2.5 py-0.5 rounded-full border border-teal-400/30">
            Tenant Pool
          </span>
          <span className="text-xs text-slate-400 font-semibold">
            Prospective University Applicants
          </span>
        </div>
        <h2 className="text-2xl font-black text-white tracking-tight">
          Prospective Tenant Candidates
        </h2>
        <p className="text-xs text-slate-400">
          Actively browsing students with verified college credentials and pre-calibrated living preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Akshit Mittal (Active Tenant) */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
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
                <h3 className="font-extrabold text-base text-white">
                  {tenantProfile.name}
                </h3>
                <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                  <GraduationCap className="w-3.5 h-3.5 text-teal-400" />
                  <span>{tenantProfile.collegeOrWorkplace} ({tenantProfile.age}y)</span>
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>Seeking {tenantProfile.preferredLocation} (≤{tenantProfile.maxDistanceKm}km)</span>
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xl font-black text-teal-400">
                {match.totalScore}%
              </span>
              <span className="block text-[10px] font-bold text-slate-400 uppercase">
                Fit Score
              </span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-400">Budget Range:</span>
              <strong className="text-white font-bold">
                {formatINR(tenantProfile.budgetMin)} - {formatINR(tenantProfile.budgetMax)}/mo
              </strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Sharing Preferred:</span>
              <span className="text-slate-200 capitalize font-medium">{tenantProfile.sharingPreference} Sharing</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Dietary:</span>
              <span className="text-slate-200 capitalize font-medium">{tenantProfile.foodPreference}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Move-in Ready:</span>
              <span className="text-teal-300 font-medium">{tenantProfile.preferredMoveInDate}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-teal-400 font-bold flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              Direct enquiry already received
            </span>
            <Link
              href="/owner/requests"
              className="px-3.5 py-1.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs"
            >
              Open Pipeline
            </Link>
          </div>
        </div>

        {/* Rohit Batra (Infosys Professional) */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-slate-800 flex-shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
                  alt="Rohit Batra"
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-white">
                  Rohit Batra
                </h3>
                <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                  <GraduationCap className="w-3.5 h-3.5 text-teal-400" />
                  <span>Software Engineer, Infosys RGCTP (24y)</span>
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>Seeking Sector 22 / Sector 35</span>
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xl font-black text-indigo-400">
                92%
              </span>
              <span className="block text-[10px] font-bold text-slate-400 uppercase">
                Fit Score
              </span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-400">Budget Range:</span>
              <strong className="text-white font-bold">₹10,000 - ₹13,000/mo</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Sharing Preferred:</span>
              <span className="text-slate-200 font-medium">Single Room</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Dietary:</span>
              <span className="text-slate-200 font-medium">Non-Vegetarian / No preference</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Move-in Ready:</span>
              <span className="text-teal-300 font-medium">2026-11-04</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-teal-400 font-bold flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              Fits Urban Stay Single Room
            </span>
            <Link
              href="/owner/requests"
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
            >
              View Enquiry
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
