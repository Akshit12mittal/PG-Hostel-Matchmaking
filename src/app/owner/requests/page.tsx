'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { Enquiry, EnquiryStatus } from '@/types';
import { formatINR, formatDate } from '@/lib/utils';
import {
  Inbox,
  CheckCircle2,
  XCircle,
  Calendar,
  Clock,
  Phone,
  GraduationCap,
  Sparkles,
  X,
} from 'lucide-react';

export default function OwnerRequestsPage() {
  const { enquiries, updateEnquiryStatus } = useApp();

  const [schedulingEnquiry, setSchedulingEnquiry] = useState<Enquiry | null>(null);
  const [visitDate, setVisitDate] = useState('2026-11-02 11:30 AM');

  const handleScheduleVisit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!schedulingEnquiry) return;
    updateEnquiryStatus(schedulingEnquiry.id, 'visit-scheduled', visitDate);
    setSchedulingEnquiry(null);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-500/20 px-2.5 py-0.5 rounded-full border border-teal-400/30">
              Host Request Manager
            </span>
            <span className="text-xs text-slate-400 font-semibold">
              Live Cross-Role Synchronization
            </span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Tenant Enquiries & Allocation Pipeline
          </h2>
          <p className="text-xs text-slate-400">
            Accepting requests or scheduling visits immediately updates the tenant&apos;s portal in real-time.
          </p>
        </div>
      </div>

      {/* Enquiries List */}
      <div className="space-y-4">
        {enquiries.map((enquiry) => {
          let statusBadgeClass = 'bg-amber-500/20 text-amber-300 border-amber-400/30';
          let statusLabel = 'Pending Review';

          if (enquiry.status === 'accepted') {
            statusBadgeClass = 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30';
            statusLabel = 'Accepted';
          } else if (enquiry.status === 'visit-scheduled') {
            statusBadgeClass = 'bg-teal-500/20 text-teal-300 border-teal-400/30';
            statusLabel = 'Physical Visit Scheduled';
          } else if (enquiry.status === 'rejected') {
            statusBadgeClass = 'bg-rose-500/20 text-rose-300 border-rose-400/30';
            statusLabel = 'Declined';
          } else if (enquiry.status === 'completed') {
            statusBadgeClass = 'bg-indigo-500/20 text-indigo-300 border-indigo-400/30';
            statusLabel = 'Bed Allocated';
          }

          return (
            <div
              key={enquiry.id}
              className="bg-slate-900 rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-md space-y-4"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Left: Tenant identity & Property */}
                <div className="flex items-start gap-4">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-800 flex-shrink-0">
                    <Image
                      src={enquiry.propertyImage}
                      alt={enquiry.propertyName}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${statusBadgeClass}`}
                      >
                        {statusLabel}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Received: {formatDate(enquiry.createdAt)}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-base text-white">
                      {enquiry.tenantName} → {enquiry.propertyName}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mt-0.5">
                      <span className="flex items-center gap-1 text-slate-300">
                        <GraduationCap className="w-3.5 h-3.5 text-teal-400" />
                        {enquiry.tenantCollege}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-slate-300">
                        <Phone className="w-3.5 h-3.5 text-teal-400" />
                        {enquiry.tenantPhone}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  {enquiry.status === 'pending' && (
                    <>
                      <button
                        onClick={() => setSchedulingEnquiry(enquiry)}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold transition-all shadow-sm"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Schedule Visit</span>
                      </button>

                      <button
                        onClick={() => updateEnquiryStatus(enquiry.id, 'accepted')}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-sm"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Accept</span>
                      </button>

                      <button
                        onClick={() => updateEnquiryStatus(enquiry.id, 'rejected')}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-rose-900/50 text-slate-300 hover:text-rose-300 border border-slate-700 transition-all"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Decline</span>
                      </button>
                    </>
                  )}

                  {enquiry.status === 'visit-scheduled' && (
                    <>
                      <button
                        onClick={() => updateEnquiryStatus(enquiry.id, 'completed')}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-sm"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Confirm Bed Allocation</span>
                      </button>
                      <button
                        onClick={() => setSchedulingEnquiry(enquiry)}
                        className="px-3 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                      >
                        Reschedule Slot
                      </button>
                    </>
                  )}

                  {enquiry.status === 'accepted' && (
                    <button
                      onClick={() => setSchedulingEnquiry(enquiry)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold transition-all"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book In-Person Visit</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Message from Tenant */}
              <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80 text-xs text-slate-300">
                <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">
                  <span>Tenant Message & Requirements:</span>
                  <span>Target Move-in: {enquiry.preferredMoveInDate}</span>
                </div>
                <p className="italic leading-relaxed">
                  &ldquo;{enquiry.message}&rdquo;
                </p>
                {enquiry.visitDate && (
                  <div className="mt-2 pt-2 border-t border-slate-800 text-teal-400 font-bold flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Scheduled Property Walkthrough: {enquiry.visitDate}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Schedule Visit Modal */}
      {schedulingEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 rounded-3xl max-w-md w-full p-6 border border-slate-800 shadow-2xl space-y-4 text-white">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400">
                  Physical Walkthrough
                </span>
                <h3 className="font-extrabold text-base text-white mt-0.5">
                  Schedule Visit with {schedulingEnquiry.tenantName}
                </h3>
              </div>
              <button
                onClick={() => setSchedulingEnquiry(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleScheduleVisit} className="space-y-4 text-xs">
              <p className="text-slate-400">
                Set a date and time slot for the tenant to visit <strong>{schedulingEnquiry.propertyName}</strong>:
              </p>

              <div>
                <label className="block text-slate-300 mb-1 font-bold">
                  Proposed Date & Time Slot
                </label>
                <input
                  type="text"
                  required
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                  placeholder="e.g. 2026-11-02 11:30 AM"
                  className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white text-xs focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSchedulingEnquiry(null)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Confirm Slot</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
