'use client';

import React, { useState } from 'react';
import { Property, TenantProfile } from '@/types';
import { useApp } from '@/context/AppContext';
import { formatINR } from '@/lib/utils';
import { X, Send, Calendar, MessageSquare, CheckCircle2 } from 'lucide-react';

interface SendEnquiryModalProps {
  property: Property;
  tenant: TenantProfile;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function SendEnquiryModal({
  property,
  tenant,
  onClose,
  onSuccess,
}: SendEnquiryModalProps) {
  const { addEnquiry } = useApp();
  const [moveInDate, setMoveInDate] = useState(tenant.preferredMoveInDate || '2026-11-01');
  const [message, setMessage] = useState(
    `Hello ${property.ownerName}, I am a student at ${tenant.collegeOrWorkplace}. I found your property through RoomSync and my compatibility score is high. I would like to enquire about room availability and schedule a visit.`
  );
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      addEnquiry({
        propertyId: property.id,
        propertyName: property.name,
        propertyImage: property.images[0] || '',
        propertyLocality: `${property.locality}, ${property.city}`,
        monthlyRent: property.monthlyRent,
        tenantId: tenant.id,
        tenantName: tenant.name,
        tenantEmail: tenant.email,
        tenantPhone: tenant.phone,
        tenantCollege: tenant.collegeOrWorkplace,
        ownerId: property.ownerId,
        ownerName: property.ownerName,
        message,
        preferredMoveInDate: moveInDate,
      });

      setSubmitting(false);
      setSubmitted(true);

      setTimeout(() => {
        if (onSuccess) onSuccess();
        onClose();
      }, 1200);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">
              Enquiry Transmitted!
            </h3>
            <p className="text-sm text-slate-600 max-w-sm mx-auto">
              {property.ownerName} has been notified. You can track this enquiry in your Requests portal.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Header */}
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                  Direct Owner Enquiry
                </span>
                <h3 className="text-lg font-extrabold text-slate-900 mt-1">
                  Enquire for {property.name}
                </h3>
                <p className="text-xs text-slate-500">
                  {property.locality}, {property.city} • {formatINR(property.monthlyRent)}/mo
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tenant details recap */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-xs space-y-1">
              <div className="flex justify-between text-slate-700">
                <span className="text-slate-500">Enquiring as:</span>
                <strong className="font-semibold text-slate-900">{tenant.name}</strong>
              </div>
              <div className="flex justify-between text-slate-700">
                <span className="text-slate-500">College / Workplace:</span>
                <span className="font-medium">{tenant.collegeOrWorkplace}</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span className="text-slate-500">Contact:</span>
                <span className="font-medium">{tenant.phone}</span>
              </div>
            </div>

            {/* Target move-in date */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                Target Move-in Date
              </label>
              <input
                type="date"
                required
                value={moveInDate}
                onChange={(e) => setMoveInDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            {/* Message to owner */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
                Message to Property Host
              </label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 leading-relaxed"
                placeholder="Include details about your course, schedule, or room preferences..."
              />
            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20 active:scale-95 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{submitting ? 'Transmitting...' : 'Send Enquiry'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
