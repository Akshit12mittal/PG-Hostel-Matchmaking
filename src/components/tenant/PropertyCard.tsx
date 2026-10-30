'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Property, TenantProfile } from '@/types';
import { calculateRoomMatch } from '@/lib/matchingEngine';
import { useApp } from '@/context/AppContext';
import { formatINR, getScoreBadgeColor } from '@/lib/utils';
import {
  MapPin,
  Heart,
  Scale,
  Sparkles,
  Bed,
  Check,
  ChevronRight,
  Info,
} from 'lucide-react';
import MatchBreakdownModal from './MatchBreakdownModal';

interface PropertyCardProps {
  property: Property;
  tenant?: TenantProfile;
  showMatchBreakdown?: boolean;
}

export default function PropertyCard({
  property,
  tenant: propTenant,
}: PropertyCardProps) {
  const {
    tenantProfile: ctxTenant,
    savedPropertyIds,
    toggleSaveProperty,
    comparePropertyIds,
    toggleCompareProperty,
  } = useApp();

  const tenant = propTenant || ctxTenant;
  const match = calculateRoomMatch(property, tenant);
  const badgeStyle = getScoreBadgeColor(match.totalScore);
  const isSaved = savedPropertyIds.includes(property.id);
  const isCompared = comparePropertyIds.includes(property.id);
  const [modalOpen, setModalOpen] = useState(false);

  // Find nearest landmark to tenant's college or first landmark
  const landmark =
    property.distanceLandmarks.find(
      (l) =>
        tenant.collegeOrWorkplace &&
        l.landmark.toLowerCase().includes(tenant.collegeOrWorkplace.toLowerCase())
    ) || property.distanceLandmarks[0] || { landmark: 'PU / City Center', distanceKm: 1.5 };

  return (
    <>
      <div className="group bg-white rounded-2xl border border-slate-200/90 hover:border-indigo-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative">
        {/* Top Image & Badge Section */}
        <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-100">
          <Image
            src={property.images[0] || 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80'}
            alt={property.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-black/30" />

          {/* Compatibility Score Badge */}
          <button
            onClick={() => setModalOpen(true)}
            className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-md border border-white/40 hover:scale-105 transition-transform"
            title="Click to view explainable matching score breakdown"
          >
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="font-extrabold text-sm text-slate-900 tracking-tight">
              {match.totalScore}%
            </span>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${badgeStyle.bg}`}>
              Match
            </span>
            <Info className="w-3 h-3 text-slate-400 ml-0.5" />
          </button>

          {/* Quick Actions (Save & Compare) */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            <button
              onClick={() => toggleCompareProperty(property.id)}
              className={`p-2 rounded-full backdrop-blur-md transition-all shadow-md ${
                isCompared
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white/90 text-slate-700 hover:bg-white hover:text-indigo-600'
              }`}
              title={isCompared ? 'Remove from compare' : 'Add to compare'}
              aria-label="Add or remove property from comparison"
            >
              <Scale className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleSaveProperty(property.id)}
              className={`p-2 rounded-full backdrop-blur-md transition-all shadow-md ${
                isSaved
                  ? 'bg-rose-500 text-white'
                  : 'bg-white/90 text-slate-700 hover:bg-white hover:text-rose-500'
              }`}
              title={isSaved ? 'Remove from favorites' : 'Save property'}
              aria-label="Save or remove property from favorites"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
            </button>
          </div>

          {/* Gender Type & Available beds */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur font-medium capitalize">
                {property.genderType === 'boys' ? 'Boys PG' : property.genderType === 'girls' ? 'Girls PG' : 'Co-ed Living'}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-600/90 backdrop-blur font-medium flex items-center gap-1">
                <Bed className="w-3 h-3" />
                {property.availableBeds} beds left
              </span>
            </div>
            <span className="text-slate-200 text-[11px] font-medium drop-shadow">
              {property.locality}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
          <div>
            {/* Title & Rent */}
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <Link
                href={`/tenant/rooms/${property.id}`}
                className="font-bold text-lg text-slate-900 hover:text-indigo-600 transition-colors line-clamp-1"
              >
                {property.name}
              </Link>
              <div className="text-right flex-shrink-0">
                <div className="font-extrabold text-indigo-700 text-base sm:text-lg">
                  {formatINR(property.monthlyRent)}
                  <span className="text-xs text-slate-500 font-normal">/mo</span>
                </div>
              </div>
            </div>

            {/* Location & Distance */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
              <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <span className="line-clamp-1">{landmark.distanceKm} km from {landmark.landmark}</span>
            </div>

            {/* Room Sharing Types */}
            <div className="flex flex-wrap items-center gap-1.5 mb-3.5">
              {property.roomTypes.map((type) => (
                <span
                  key={type}
                  className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium capitalize"
                >
                  {type} Sharing
                </span>
              ))}
              <span className="text-[11px] px-2 py-0.5 rounded-md bg-teal-50 text-teal-700 font-medium capitalize">
                {property.foodOptions.replace('-', ' ')}
              </span>
            </div>

            {/* Top Match Reasons (Explainability highlight) */}
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 mb-4 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                <span className="flex items-center gap-1 text-indigo-700">
                  <Sparkles className="w-3 h-3" />
                  Why this matches you:
                </span>
                <button
                  onClick={() => setModalOpen(true)}
                  className="text-indigo-600 hover:underline capitalize"
                >
                  Breakdown
                </button>
              </div>
              {match.pros.slice(0, 2).map((pro, idx) => (
                <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-600">
                  <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{pro}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Card Actions */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
            <button
              onClick={() => setModalOpen(true)}
              className="text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-colors flex items-center gap-1"
            >
              <span>Score Analysis</span>
            </button>
            <Link
              href={`/tenant/rooms/${property.id}`}
              className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-semibold shadow-sm transition-all active:scale-95"
            >
              <span>View Details</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Explainable Match Breakdown Modal */}
      {modalOpen && (
        <MatchBreakdownModal
          property={property}
          tenant={tenant}
          breakdown={match}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
