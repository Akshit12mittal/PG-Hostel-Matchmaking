'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { EnquiryStatus } from '@/types';
import { formatINR, formatDate } from '@/lib/utils';
import {
  Send,
  Clock,
  CheckCircle2,
  XCircle,
  Calendar,
  AlertCircle,
  Building,
  ArrowRight,
  Trash2,
} from 'lucide-react';

export default function TenantRequestsPage() {
  const { enquiries, cancelEnquiry, tenantProfile } = useApp();

  // Tenant's enquiries
  const tenantEnquiries = enquiries.filter(
    (e) => e.tenantId === tenantProfile.id || e.tenantName === tenantProfile.name
  );

  const getStatusBadge = (status: EnquiryStatus) => {
    switch (status) {
      case 'visit-scheduled':
        return {
          bg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          icon: Calendar,
          label: 'Visit Scheduled',
        };
      case 'accepted':
        return {
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          icon: CheckCircle2,
          label: 'Host Accepted',
        };
      case 'rejected':
        return {
          bg: 'bg-rose-50 text-rose-700 border-rose-200',
          icon: XCircle,
          label: 'Declined',
        };
      case 'completed':
        return {
          bg: 'bg-teal-50 text-teal-700 border-teal-200',
          icon: CheckCircle2,
          label: 'Bed Allocated',
        };
      default:
        return {
          bg: 'bg-amber-50 text-amber-700 border-amber-200',
          icon: Clock,
          label: 'Pending Owner Review',
        };
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
            Booking & Enquiry Portal
          </span>
          <span className="text-xs text-slate-400 font-semibold">
            {tenantEnquiries.length} Enquiries Tracked
          </span>
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          My Accommodation Enquiries
        </h2>
        <p className="text-xs text-slate-500">
          Monitor your enquiry progress, scheduled property visits, and landlord responses in real-time
        </p>
      </div>

      {/* Simulated Booking Lifecycle Explainer */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
        <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
          <span>The RoomSync Direct-Connect Journey</span>
          <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
            Zero Brokerage Flow
          </span>
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 text-xs">
          {[
            { step: '1', title: 'Find Match', desc: 'Weighted algorithm' },
            { step: '2', title: 'Send Enquiry', desc: 'Direct to PG owner' },
            { step: '3', title: 'Owner Review', desc: 'Tenant suitability' },
            { step: '4', title: 'Accept / Slot', desc: 'Visit schedule' },
            { step: '5', title: 'PG Walkthrough', desc: 'In-person inspection' },
            { step: '6', title: 'Confirmed Stay', desc: 'Allocation finalized' },
          ].map((st, i) => (
            <div
              key={st.step}
              className={`p-3 rounded-2xl border text-center relative ${
                i <= 3
                  ? 'bg-indigo-50/60 border-indigo-200 text-indigo-950 font-medium'
                  : 'bg-slate-50 border-slate-100 text-slate-500'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full mx-auto flex items-center justify-center font-black text-[11px] mb-1.5 ${
                  i <= 3 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}
              >
                {st.step}
              </div>
              <div className="font-bold text-xs">{st.title}</div>
              <div className="text-[10px] text-slate-500">{st.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Enquiries List */}
      {tenantEnquiries.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Send className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">No active enquiries yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Browse our verified PG accommodations and click &ldquo;Send Host Enquiry&rdquo; to connect directly with property owners.
          </p>
          <Link
            href="/tenant/rooms"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md"
          >
            <Building className="w-4 h-4" />
            <span>Discover Accommodations</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {tenantEnquiries.map((enquiry) => {
            const statusInfo = getStatusBadge(enquiry.status);
            const StatusIcon = statusInfo.icon;

            return (
              <div
                key={enquiry.id}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-indigo-200 shadow-sm p-5 sm:p-6 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Property Image & Details */}
                  <div className="flex items-start gap-4">
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0">
                      <Image
                        src={enquiry.propertyImage}
                        alt={enquiry.propertyName}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${statusInfo.bg}`}
                        >
                          <StatusIcon className="w-3 h-3" />
                          <span>{statusInfo.label}</span>
                        </span>
                        <span className="text-[11px] text-slate-400">
                          Sent: {formatDate(enquiry.createdAt)}
                        </span>
                      </div>

                      <h3 className="font-extrabold text-base text-slate-900">
                        {enquiry.propertyName}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {enquiry.propertyLocality} • Host: <strong>{enquiry.ownerName}</strong>
                      </p>
                      <div className="text-xs font-bold text-indigo-700 mt-1">
                        {formatINR(enquiry.monthlyRent)}/mo
                      </div>
                    </div>
                  </div>

                  {/* Move-in / Visit Details & Actions */}
                  <div className="flex flex-col md:items-end gap-3 text-xs border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-1 md:text-right">
                      <div>
                        <span className="text-slate-400">Target Move-in:</span>{' '}
                        <strong className="font-semibold text-slate-800">
                          {enquiry.preferredMoveInDate}
                        </strong>
                      </div>
                      {enquiry.visitDate && (
                        <div className="text-indigo-700 font-bold flex items-center gap-1 md:justify-end">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Scheduled Visit: {enquiry.visitDate}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {enquiry.status === 'pending' && (
                        <button
                          onClick={() => {
                            if (window.confirm('Cancel this enquiry?')) {
                              cancelEnquiry(enquiry.id);
                            }
                          }}
                          className="flex items-center gap-1 text-slate-500 hover:text-rose-600 px-3 py-1.5 rounded-xl hover:bg-rose-50 transition-colors"
                          title="Cancel pending enquiry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Cancel</span>
                        </button>
                      )}
                      <Link
                        href={`/tenant/rooms/${enquiry.propertyId}`}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white font-semibold transition-all shadow-sm"
                      >
                        <span>View Property</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Sent message snippet */}
                <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600 flex items-start gap-2 bg-slate-50/50 p-3 rounded-xl">
                  <AlertCircle className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                  <span className="italic leading-relaxed">
                    &ldquo;{enquiry.message}&rdquo;
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
