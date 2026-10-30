'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { formatINR } from '@/lib/utils';
import {
  Building,
  CheckCircle2,
  MapPin,
  ExternalLink,
  Shield,
  Search,
  Bed,
} from 'lucide-react';

export default function AdminListingsPage() {
  const { properties } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = properties.filter((p) => {
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.locality.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
            Accommodation Moderation
          </span>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Property Listings Directory ({properties.length})
          </h2>
          <p className="text-xs text-slate-400">
            Physical inspection, biometric verification, and bed capacity records across Chandigarh, Mohali & Kharar.
          </p>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search property or locality..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-3 py-1.5 rounded-xl border border-slate-700 bg-slate-900 text-xs text-white focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-md overflow-hidden overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <th className="p-4">Property</th>
              <th className="p-4">Locality / City</th>
              <th className="p-4">Gender Type</th>
              <th className="p-4">Monthly Rent</th>
              <th className="p-4">Beds (Vacant / Total)</th>
              <th className="p-4">Host Details</th>
              <th className="p-4">Verification</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            {filtered.map((property) => (
              <tr key={property.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-slate-800 flex-shrink-0">
                      <Image
                        src={property.images[0]}
                        alt={property.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <strong className="text-white font-bold block">{property.name}</strong>
                      <span className="text-[10px] text-slate-400 capitalize">{property.roomTypes.join(', ')}</span>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="font-semibold text-slate-200">{property.locality}</span>
                  <span className="block text-[10px] text-slate-400">{property.city}</span>
                </td>
                <td className="p-4 capitalize">
                  <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-medium text-[10px]">
                    {property.genderType}
                  </span>
                </td>
                <td className="p-4 font-bold text-teal-300">
                  {formatINR(property.monthlyRent)}/mo
                </td>
                <td className="p-4">
                  <span className="font-bold text-white">{property.availableBeds}</span>
                  <span className="text-slate-400"> / {property.totalBeds}</span>
                </td>
                <td className="p-4">
                  <span className="text-slate-200 block font-medium">{property.ownerName}</span>
                  <span className="text-[10px] text-slate-400">{property.ownerPhone}</span>
                </td>
                <td className="p-4">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified
                  </span>
                </td>
                <td className="p-4">
                  <Link
                    href={`/tenant/rooms/${property.id}`}
                    target="_blank"
                    className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 font-semibold"
                  >
                    <span>Inspect</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
