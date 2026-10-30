'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { Property } from '@/types';
import { formatINR } from '@/lib/utils';
import {
  Bed,
  Plus,
  Trash2,
  Edit3,
  MapPin,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  X,
  Save,
} from 'lucide-react';

export default function OwnerRoomsPage() {
  const { properties, updateProperty, deleteProperty } = useApp();
  const [editingProp, setEditingProp] = useState<Property | null>(null);

  // Rajesh Sharma's properties or all
  const ownerProperties = properties.filter(
    (p) => p.ownerId === 'owner-rajesh' || p.ownerName.includes('Rajesh')
  );

  const handleQuickBedChange = (property: Property, delta: number) => {
    const newAvailable = Math.max(0, Math.min(property.totalBeds, property.availableBeds + delta));
    updateProperty(property.id, { availableBeds: newAvailable });
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProp) return;
    updateProperty(editingProp.id, {
      name: editingProp.name,
      monthlyRent: Number(editingProp.monthlyRent),
      securityDeposit: Number(editingProp.securityDeposit),
      totalBeds: Number(editingProp.totalBeds),
      availableBeds: Number(editingProp.availableBeds),
      address: editingProp.address,
      description: editingProp.description,
    });
    setEditingProp(null);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-500/20 px-2.5 py-0.5 rounded-full border border-teal-400/30">
              Host Property Inventory
            </span>
            <span className="text-xs text-slate-400 font-semibold">
              {ownerProperties.length} Managed Listings
            </span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Manage Properties & Room Allocation
          </h2>
          <p className="text-xs text-slate-400">
            Updates to rental rates or bed vacancies sync immediately to tenant discovery in real-time.
          </p>
        </div>

        <Link
          href="/owner/rooms/add"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md transition-all self-start sm:self-auto active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Property</span>
        </Link>
      </div>

      {/* Property Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ownerProperties.map((property) => {
          const occupied = property.totalBeds - property.availableBeds;
          const occPct = Math.round((occupied / property.totalBeds) * 100);

          return (
            <div
              key={property.id}
              className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-lg flex flex-col justify-between"
            >
              <div>
                {/* Photo & Status Banner */}
                <div className="relative h-48 w-full bg-slate-800">
                  <Image
                    src={property.images[0] || 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80'}
                    alt={property.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />

                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur text-white text-[10px] font-bold uppercase tracking-wider">
                      {property.genderType === 'boys' ? 'Boys PG' : property.genderType === 'girls' ? 'Girls PG' : 'Co-ed'}
                    </span>
                    {property.verified && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/90 text-white text-[10px] font-bold">
                        Verified Listing
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <span className="font-bold flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-teal-400" />
                      {property.locality}, {property.city}
                    </span>
                    <strong className="text-base text-teal-300 font-black">
                      {formatINR(property.monthlyRent)}/mo
                    </strong>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-5 space-y-4">
                  <div>
                    <h3 className="font-extrabold text-lg text-white">
                      {property.name}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                      {property.address}
                    </p>
                  </div>

                  {/* Bed Occupancy Tracker & Quick Adjust */}
                  <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-2 text-xs">
                    <div className="flex items-center justify-between font-semibold">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <Bed className="w-4 h-4 text-teal-400" />
                        Bed Availability & Occupancy
                      </span>
                      <span className="text-white font-extrabold">
                        {property.availableBeds} Vacant / {property.totalBeds} Total ({occPct}%)
                      </span>
                    </div>

                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-teal-500 h-full rounded-full transition-all"
                        style={{ width: `${occPct}%` }}
                      />
                    </div>

                    {/* Quick Vacancy Increment/Decrement Buttons */}
                    <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                      <span>Quick Bed Update:</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleQuickBedChange(property, -1)}
                          disabled={property.availableBeds <= 0}
                          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-white font-bold disabled:opacity-40"
                          title="Mark a bed as filled"
                        >
                          -1 Vacant
                        </button>
                        <button
                          onClick={() => handleQuickBedChange(property, 1)}
                          disabled={property.availableBeds >= property.totalBeds}
                          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-teal-300 font-bold disabled:opacity-40"
                          title="Mark a bed as vacant"
                        >
                          +1 Vacant
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-1.5 text-[11px]">
                    {property.amenities.slice(0, 4).map((a) => (
                      <span
                        key={a}
                        className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60"
                      >
                        {a}
                      </span>
                    ))}
                    {property.amenities.length > 4 && (
                      <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-400">
                        +{property.amenities.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingProp(property)}
                    className="flex items-center gap-1 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors font-medium"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Listing</span>
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm(`Delete ${property.name} from RoomSync platform?`)) {
                        deleteProperty(property.id);
                      }
                    }}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                    title="Delete property"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <Link
                  href={`/tenant/rooms/${property.id}`}
                  className="flex items-center gap-1 text-teal-400 hover:text-teal-300 font-semibold"
                  target="_blank"
                >
                  <span>Preview as Tenant</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Property Modal */}
      {editingProp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 rounded-3xl max-w-lg w-full p-6 border border-slate-800 shadow-2xl space-y-5 text-white max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-extrabold text-lg text-white">
                Edit {editingProp.name}
              </h3>
              <button
                onClick={() => setEditingProp(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-bold uppercase tracking-wider text-[10px]">
                  Property Name
                </label>
                <input
                  type="text"
                  required
                  value={editingProp.name}
                  onChange={(e) =>
                    setEditingProp({ ...editingProp, name: e.target.value })
                  }
                  className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white text-xs focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-bold uppercase tracking-wider text-[10px]">
                    Monthly Rent (₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={editingProp.monthlyRent}
                    onChange={(e) =>
                      setEditingProp({
                        ...editingProp,
                        monthlyRent: Number(e.target.value),
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white text-xs focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-bold uppercase tracking-wider text-[10px]">
                    Security Deposit (₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={editingProp.securityDeposit}
                    onChange={(e) =>
                      setEditingProp({
                        ...editingProp,
                        securityDeposit: Number(e.target.value),
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white text-xs focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-bold uppercase tracking-wider text-[10px]">
                    Total Beds Capacity
                  </label>
                  <input
                    type="number"
                    required
                    value={editingProp.totalBeds}
                    onChange={(e) =>
                      setEditingProp({
                        ...editingProp,
                        totalBeds: Number(e.target.value),
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white text-xs focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-bold uppercase tracking-wider text-[10px]">
                    Vacant Beds
                  </label>
                  <input
                    type="number"
                    required
                    value={editingProp.availableBeds}
                    onChange={(e) =>
                      setEditingProp({
                        ...editingProp,
                        availableBeds: Number(e.target.value),
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white text-xs focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-bold uppercase tracking-wider text-[10px]">
                  Property Address
                </label>
                <input
                  type="text"
                  required
                  value={editingProp.address}
                  onChange={(e) =>
                    setEditingProp({ ...editingProp, address: e.target.value })
                  }
                  className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white text-xs focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-bold uppercase tracking-wider text-[10px]">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editingProp.description}
                  onChange={(e) =>
                    setEditingProp({
                      ...editingProp,
                      description: e.target.value,
                    })
                  }
                  className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white text-xs focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingProp(null)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
