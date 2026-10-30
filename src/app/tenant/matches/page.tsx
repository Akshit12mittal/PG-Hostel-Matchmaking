'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { calculateRoomMatch } from '@/lib/matchingEngine';
import PropertyCard from '@/components/tenant/PropertyCard';
import MatchBreakdownModal from '@/components/tenant/MatchBreakdownModal';
import { formatINR, getScoreBadgeColor } from '@/lib/utils';
import {
  Sparkles,
  SlidersHorizontal,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  MapPin,
  DollarSign,
  Bed,
  Check,
  Info,
} from 'lucide-react';

export default function TenantMatchesPage() {
  const { properties, tenantProfile } = useApp();
  const [filterType, setFilterType] = useState<'highest' | 'lowest-price' | 'nearest' | 'amenities'>('highest');
  const [selectedPropForAnalysis, setSelectedPropForAnalysis] = useState<any | null>(null);

  // Compute live compatibility for all properties
  const scoredMatches = useMemo(() => {
    return properties
      .map((property) => {
        const match = calculateRoomMatch(property, tenantProfile);
        const nearestLandmark =
          property.distanceLandmarks.find(
            (l) =>
              tenantProfile.collegeOrWorkplace &&
              l.landmark.toLowerCase().includes(tenantProfile.collegeOrWorkplace.toLowerCase())
          ) || property.distanceLandmarks[0] || { distanceKm: 2.0 };

        return {
          property,
          match,
          distanceKm: nearestLandmark.distanceKm,
        };
      })
      .sort((a, b) => {
        if (filterType === 'highest') {
          return b.match.totalScore - a.match.totalScore;
        }
        if (filterType === 'lowest-price') {
          return a.property.monthlyRent - b.property.monthlyRent;
        }
        if (filterType === 'nearest') {
          return a.distanceKm - b.distanceKm;
        }
        if (filterType === 'amenities') {
          return b.match.amenitiesScore - a.match.amenitiesScore;
        }
        return 0;
      });
  }, [properties, tenantProfile, filterType]);

  const topMatch = scoredMatches[0];
  const topBadge = topMatch ? getScoreBadgeColor(topMatch.match.totalScore) : null;

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-navy-900 via-indigo-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl border border-indigo-800/40">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Intelligent Decision Support Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Matched for Your Budget & Lifestyle
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Our multi-parameter algorithm computes transparent fit scores across your rental budget (30%), campus proximity (25%), sharing preference (15%), essential amenities (15%), and quiet study routine (10%).
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/tenant/preferences"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur border border-white/20 transition-all"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Fine-tune Match Weights</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Spotlight: Your Highest Match Breakdown */}
      {topMatch && (
        <div className="bg-white rounded-3xl border-2 border-indigo-100 p-6 sm:p-8 shadow-lg space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                  Spotlight Recommendation
                </span>
                <span className="text-xs text-slate-400 font-semibold">
                  Panjab University Commute
                </span>
              </div>
              <h3 className="text-2xl font-black text-slate-900">
                {topMatch.property.name}
              </h3>
              <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{topMatch.property.address}, {topMatch.property.locality}</span>
                <span>•</span>
                <span className="font-bold text-indigo-700">{formatINR(topMatch.property.monthlyRent)}/mo</span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-3xl sm:text-4xl font-black text-indigo-700 tracking-tight">
                  {topMatch.match.totalScore}%
                </span>
                <span className="block text-[11px] font-bold text-slate-500 uppercase">
                  Compatibility
                </span>
              </div>
              <button
                onClick={() => setSelectedPropForAnalysis(topMatch)}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all active:scale-95"
              >
                Inspect Factors
              </button>
            </div>
          </div>

          {/* 6 Factors Progress Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
              <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Budget (30%)</span>
              <strong className="text-slate-900 font-black text-base">{topMatch.match.budgetScore}/30</strong>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1.5">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${(topMatch.match.budgetScore / 30) * 100}%` }} />
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
              <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Distance (25%)</span>
              <strong className="text-slate-900 font-black text-base">{topMatch.match.locationScore}/25</strong>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1.5">
                <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${(topMatch.match.locationScore / 25) * 100}%` }} />
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
              <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Room Type (15%)</span>
              <strong className="text-slate-900 font-black text-base">{topMatch.match.roomTypeScore}/15</strong>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1.5">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: `${(topMatch.match.roomTypeScore / 15) * 100}%` }} />
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
              <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Amenities (15%)</span>
              <strong className="text-slate-900 font-black text-base">{topMatch.match.amenitiesScore}/15</strong>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1.5">
                <div className="bg-teal-500 h-full rounded-full" style={{ width: `${(topMatch.match.amenitiesScore / 15) * 100}%` }} />
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
              <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Diet/Lifestyle (10%)</span>
              <strong className="text-slate-900 font-black text-base">{topMatch.match.lifestyleScore}/10</strong>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1.5">
                <div className="bg-purple-500 h-full rounded-full" style={{ width: `${(topMatch.match.lifestyleScore / 10) * 100}%` }} />
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
              <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Availability (5%)</span>
              <strong className="text-slate-900 font-black text-base">{topMatch.match.availabilityScore}/5</strong>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1.5">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: `${(topMatch.match.availabilityScore / 5) * 100}%` }} />
              </div>
            </div>
          </div>

          {/* Pros vs Trade-offs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-xs space-y-1.5">
              <span className="font-bold text-emerald-800 flex items-center gap-1.5 uppercase text-[10px] tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Why this room matches your profile
              </span>
              <ul className="space-y-1 text-emerald-900">
                {topMatch.match.pros.map((p, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-100 text-xs space-y-1.5">
              <span className="font-bold text-amber-800 flex items-center gap-1.5 uppercase text-[10px] tracking-wider">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                Potential trade-offs to keep in mind
              </span>
              <ul className="space-y-1 text-amber-900">
                {topMatch.match.concerns.length > 0 ? (
                  topMatch.match.concerns.map((c, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-amber-500">•</span>
                      <span>{c}</span>
                    </li>
                  ))
                ) : (
                  <li>• Zero notable budget or lifestyle trade-offs!</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
            All Algorithmic Recommendations ({scoredMatches.length})
          </h3>
          <p className="text-xs text-slate-500">
            Dynamically prioritized based on your active criteria
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-white p-1 rounded-2xl border border-slate-200/90 shadow-sm text-xs">
          {[
            { id: 'highest', label: 'Highest Match' },
            { id: 'lowest-price', label: 'Lowest Price' },
            { id: 'nearest', label: 'Nearest Campus' },
            { id: 'amenities', label: 'Best Amenities' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilterType(f.id as any)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                filterType === f.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scoredMatches.map(({ property }) => (
          <PropertyCard
            key={property.id}
            property={property}
            tenant={tenantProfile}
          />
        ))}
      </div>

      {/* Analysis Modal */}
      {selectedPropForAnalysis && (
        <MatchBreakdownModal
          property={selectedPropForAnalysis.property}
          tenant={tenantProfile}
          breakdown={selectedPropForAnalysis.match}
          onClose={() => setSelectedPropForAnalysis(null)}
        />
      )}
    </div>
  );
}
