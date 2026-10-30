'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { RoommateProfile } from '@/types';
import { useApp } from '@/context/AppContext';
import { calculateRoommateMatch } from '@/lib/matchingEngine';
import { formatINR, getScoreBadgeColor } from '@/lib/utils';
import {
  Sparkles,
  MapPin,
  Clock,
  Utensils,
  Volume2,
  Heart,
  UserPlus,
  Check,
  CheckCircle2,
  Info,
  X,
  AlertCircle,
  Building,
} from 'lucide-react';

interface RoommateCardProps {
  roommate: RoommateProfile;
}

export default function RoommateCard({ roommate }: RoommateCardProps) {
  const {
    tenantProfile,
    shortlistRoommateIds,
    toggleShortlistRoommate,
    connectedRoommateIds,
    connectRoommate,
  } = useApp();

  const [modalOpen, setModalOpen] = useState(false);
  const match = calculateRoommateMatch(roommate, tenantProfile);
  const badgeStyle = getScoreBadgeColor(match.totalScore);
  const isShortlisted = shortlistRoommateIds.includes(roommate.id);
  const isConnected = connectedRoommateIds.includes(roommate.id);

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-indigo-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
        <div className="p-5">
          {/* Top Row: Avatar, Info & Match Score */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
                <Image
                  src={roommate.photoUrl}
                  alt={roommate.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-extrabold text-base text-slate-900 line-clamp-1">
                    {roommate.name}
                  </h4>
                  <span className="text-xs text-slate-400 font-semibold">
                    {roommate.age}y
                  </span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-1 font-medium">
                  {roommate.occupation} • {roommate.collegeOrWorkplace}
                </p>
                <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                  <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
                  <span className="line-clamp-1">{roommate.location}</span>
                </div>
              </div>
            </div>

            {/* Match Score Badge (Clickable for breakdown) */}
            <button
              onClick={() => setModalOpen(true)}
              className="flex flex-col items-end flex-shrink-0 p-1.5 rounded-xl hover:bg-slate-50 transition-colors"
              title="Click for compatibility breakdown"
            >
              <div className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span className="text-base font-extrabold text-slate-900">
                  {match.totalScore}%
                </span>
              </div>
              <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${badgeStyle.bg}`}>
                Match
              </span>
            </button>
          </div>

          {/* Bio Snippet */}
          <p className="text-xs text-slate-600 italic bg-slate-50 p-2.5 rounded-xl border border-slate-100 mb-3.5 leading-relaxed line-clamp-2">
            &ldquo;{roommate.bio}&rdquo;
          </p>

          {/* Current Property (if already staying in a PG) */}
          {roommate.currentPropertyName && (
            <div className="flex items-center gap-1.5 text-xs text-indigo-700 bg-indigo-50/70 px-2.5 py-1 rounded-lg mb-3">
              <Building className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="line-clamp-1 font-medium">
                Currently staying at: <strong className="font-bold">{roommate.currentPropertyName}</strong>
              </span>
            </div>
          )}

          {/* Key Lifestyle Tags */}
          <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
            <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">
              <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <span className="capitalize truncate font-medium">
                {roommate.sleepSchedule.replace('-', ' ')}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">
              <Utensils className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <span className="capitalize truncate font-medium">
                {roommate.foodPreference}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">
              <Volume2 className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <span className="capitalize truncate font-medium">
                {roommate.noiseTolerance} pref
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">
              <span className="font-bold text-slate-400 text-xs">₹</span>
              <span className="truncate font-medium">
                Target: {formatINR(roommate.budgetMonthly)}
              </span>
            </div>
          </div>

          {/* Top Compatibility highlight */}
          <div className="space-y-1 text-xs mb-1">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              <span>Why you&apos;ll get along:</span>
              <button
                onClick={() => setModalOpen(true)}
                className="text-indigo-600 hover:underline capitalize"
              >
                7-Factor analysis
              </button>
            </div>
            {match.pros.slice(0, 2).map((pro, i) => (
              <div key={i} className="flex items-start gap-1.5 text-slate-700">
                <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="line-clamp-1">{pro}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
          <button
            onClick={() => toggleShortlistRoommate(roommate.id)}
            className={`p-2 rounded-xl border transition-all text-xs flex items-center gap-1.5 font-medium ${
              isShortlisted
                ? 'border-rose-200 bg-rose-50 text-rose-700 font-semibold'
                : 'border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:border-slate-300'
            }`}
            title={isShortlisted ? 'Remove from shortlist' : 'Shortlist roommate'}
          >
            <Heart className={`w-4 h-4 ${isShortlisted ? 'fill-rose-600 text-rose-600' : ''}`} />
            <span className="hidden sm:inline">{isShortlisted ? 'Shortlisted' : 'Shortlist'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setModalOpen(true)}
              className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-indigo-600 hover:bg-white transition-colors"
            >
              Compatibility
            </button>
            <button
              onClick={() => connectRoommate(roommate.id)}
              disabled={isConnected}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 ${
                isConnected
                  ? 'bg-emerald-600 text-white cursor-default'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/25'
              }`}
            >
              {isConnected ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Request Sent</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Connect</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 7-Factor Compatibility Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                  <Image
                    src={roommate.photoUrl}
                    alt={roommate.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">
                    {roommate.name} & {tenantProfile.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    7-Factor Roommate Compatibility Assessment
                  </p>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Overall Score */}
            <div className={`p-4 rounded-2xl border ${badgeStyle.border} ${badgeStyle.bg} flex items-center justify-between`}>
              <div>
                <span className="text-xs uppercase font-bold tracking-wider opacity-80">
                  Roommate Harmony Index
                </span>
                <div className="text-3xl font-black mt-0.5">
                  {match.totalScore}
                  <span className="text-base font-normal opacity-70"> / 100</span>
                </div>
                <div className="text-xs font-bold mt-1">
                  {badgeStyle.label}
                </div>
              </div>
              <div className="text-right text-xs text-slate-600 max-w-[200px]">
                Higher scores predict fewer interpersonal conflicts regarding sleep, cleanliness, and sound habits.
              </div>
            </div>

            {/* Factor breakdown */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Factor Breakdown
              </h4>

              {[
                { label: 'Sleep Routine Synchrony', score: match.sleepScore, max: 20, desc: `${tenantProfile.sleepSchedule} vs ${roommate.sleepSchedule}` },
                { label: 'Cleanliness & Shared Space Standards', score: match.cleanlinessScore, max: 20, desc: `${tenantProfile.cleanliness} vs ${roommate.cleanliness}` },
                { label: 'Food & Dietary Harmony', score: match.foodScore, max: 15, desc: `${tenantProfile.foodPreference} vs ${roommate.foodPreference}` },
                { label: 'Noise & Study Environment Tolerance', score: match.noiseScore, max: 15, desc: `${tenantProfile.noiseTolerance} vs ${roommate.noiseTolerance}` },
                { label: 'Social & Personal Space Energy', score: match.socialScore, max: 15, desc: `${tenantProfile.socialHabit} vs ${roommate.socialHabit}` },
                { label: 'Monthly Budget Alignment', score: match.budgetScore, max: 10, desc: `₹${roommate.budgetMonthly.toLocaleString('en-IN')}/mo target` },
                { label: 'Smoking & Substance Preferences', score: match.smokingScore, max: 5, desc: `${tenantProfile.smokingPreference} vs ${roommate.smokingPreference}` },
              ].map((f) => (
                <div key={f.label} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <div className="flex items-center justify-between font-semibold text-slate-800 mb-1">
                    <span>{f.label}</span>
                    <span className="font-extrabold text-slate-900">
                      {f.score} <span className="text-slate-400 font-normal">/ {f.max}</span>
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mb-1">
                    <div
                      className="bg-indigo-600 h-full rounded-full"
                      style={{ width: `${(f.score / f.max) * 100}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 capitalize">{f.desc}</p>
                </div>
              ))}
            </div>

            {/* Pros and Differences */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                <h5 className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wide mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Why you&apos;ll get along
                </h5>
                <ul className="space-y-1.5 text-xs text-emerald-900">
                  {match.pros.map((p, i) => (
                    <li key={i} className="flex items-start gap-1">
                      <span className="text-emerald-500">•</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-100">
                <h5 className="flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wide mb-2">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  Possible differences
                </h5>
                {match.concerns.length > 0 ? (
                  <ul className="space-y-1.5 text-xs text-amber-900">
                    {match.concerns.map((c, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-amber-500">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-amber-800 italic">
                    Great alignment! No major conflicting lifestyle habits.
                  </p>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
              <button
                onClick={() => {
                  connectRoommate(roommate.id);
                  setModalOpen(false);
                }}
                disabled={isConnected}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
              >
                {isConnected ? 'Already Connected' : 'Send Connection Request'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
