'use client';

import React from 'react';
import { Property, TenantProfile, RoomScoreBreakdown } from '@/types';
import { getScoreBadgeColor, formatINR } from '@/lib/utils';
import {
  X,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Info,
  DollarSign,
  MapPin,
  Bed,
  Coffee,
  CalendarCheck,
} from 'lucide-react';

interface MatchBreakdownModalProps {
  property: Property;
  tenant: TenantProfile;
  breakdown: RoomScoreBreakdown;
  onClose: () => void;
}

export default function MatchBreakdownModal({
  property,
  tenant,
  breakdown,
  onClose,
}: MatchBreakdownModalProps) {
  const badgeStyle = getScoreBadgeColor(breakdown.totalScore);

  const criteriaList = [
    {
      title: 'Monthly Budget Alignment',
      weight: '30%',
      score: breakdown.budgetScore,
      max: 30,
      icon: DollarSign,
      color: 'bg-emerald-500',
      description: `Property rent is ${formatINR(property.monthlyRent)}/mo against your target ₹${tenant.budgetMin.toLocaleString('en-IN')} - ₹${tenant.budgetMax.toLocaleString('en-IN')}.`,
    },
    {
      title: 'College / Workplace Proximity',
      weight: '25%',
      score: breakdown.locationScore,
      max: 25,
      icon: MapPin,
      color: 'bg-indigo-500',
      description: `Evaluated relative to ${tenant.collegeOrWorkplace} and preferred area ${tenant.preferredLocation}.`,
    },
    {
      title: 'Room Sharing Configuration',
      weight: '15%',
      score: breakdown.roomTypeScore,
      max: 15,
      icon: Bed,
      color: 'bg-blue-500',
      description: `Your preference: ${tenant.sharingPreference} sharing. Available: ${property.roomTypes.join(', ')}.`,
    },
    {
      title: 'Essential Amenities Fulfilled',
      weight: '15%',
      score: breakdown.amenitiesScore,
      max: 15,
      icon: Sparkles,
      color: 'bg-teal-500',
      description: `Matches requested essential facilities (Wi-Fi, AC, Attached Bath, etc.).`,
    },
    {
      title: 'Dietary & Living Routine',
      weight: '10%',
      score: breakdown.lifestyleScore,
      max: 10,
      icon: Coffee,
      color: 'bg-purple-500',
      description: `Food policy (${property.foodOptions}), quiet hours, and gender accommodation rules.`,
    },
    {
      title: 'Availability & Move-in Timing',
      weight: '5%',
      score: breakdown.availabilityScore,
      max: 5,
      icon: CalendarCheck,
      color: 'bg-amber-500',
      description: `${property.availableBeds} beds vacant, ready for move-in from ${property.availableFrom}.`,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-6">
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold tracking-wider uppercase text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                Explainable Matching Engine
              </span>
              <span className="text-xs text-slate-400">IITM DTD-DAD Model</span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">
              {property.name}
            </h3>
            <p className="text-xs text-slate-500">
              Algorithm Score Breakdown for {tenant.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Overall Score Banner */}
        <div className={`p-4 rounded-2xl border ${badgeStyle.border} ${badgeStyle.bg} flex items-center justify-between`}>
          <div>
            <div className="text-xs font-semibold tracking-wide uppercase opacity-80">
              Total Compatibility Score
            </div>
            <div className="text-3xl font-black tracking-tight mt-0.5">
              {breakdown.totalScore}
              <span className="text-base font-medium opacity-70"> / 100</span>
            </div>
            <div className="text-xs font-bold mt-1">
              {badgeStyle.label}
            </div>
          </div>
          <div className="text-right text-xs max-w-[200px] text-slate-600 leading-snug">
            Calculated across 6 weighted parameters tailored to your accommodation profile.
          </div>
        </div>

        {/* Weighted Parameter Progress Bars */}
        <div className="space-y-3.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Weighted Score Breakdown
          </h4>

          {criteriaList.map((crit) => {
            const Icon = crit.icon;
            const pct = Math.round((crit.score / crit.max) * 100);
            return (
              <div key={crit.title} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center justify-between text-xs mb-1">
                  <div className="flex items-center gap-2 font-bold text-slate-800">
                    <Icon className="w-4 h-4 text-slate-500" />
                    <span>{crit.title}</span>
                    <span className="text-[10px] text-slate-400 font-normal">
                      (Weight: {crit.weight})
                    </span>
                  </div>
                  <span className="font-extrabold text-slate-900">
                    {crit.score} <span className="text-slate-400 font-normal">/ {crit.max}</span>
                  </span>
                </div>

                {/* Progress track */}
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden my-1.5">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${crit.color}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <p className="text-[11px] text-slate-500 leading-tight">
                  {crit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Explainability: Pros & Potential Concerns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Pros */}
          <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100">
            <h5 className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wide mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Why this room matches
            </h5>
            <ul className="space-y-1.5 text-xs text-emerald-900">
              {breakdown.pros.map((pro, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-emerald-500 mt-0.5">•</span>
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Concerns */}
          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-100">
            <h5 className="flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wide mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              Potential trade-offs
            </h5>
            {breakdown.concerns.length > 0 ? (
              <ul className="space-y-1.5 text-xs text-amber-900">
                {breakdown.concerns.map((con, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-amber-800 italic">
                No notable lifestyle or budget concerns detected!
              </p>
            )}
          </div>
        </div>

        {/* Footer / Academic Note */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Info className="w-3.5 h-3.5" />
            Transparent rule-based scoring without black-box AI
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold transition-colors"
          >
            Close Analysis
          </button>
        </div>
      </div>
    </div>
  );
}
