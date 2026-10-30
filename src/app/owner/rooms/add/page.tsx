'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { GenderType, SharingType } from '@/types';
import {
  Building2,
  Plus,
  ArrowLeft,
  Check,
  MapPin,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

export default function AddPropertyPage() {
  const router = useRouter();
  const { addProperty } = useApp();

  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [address, setAddress] = useState('');
  const [locality, setLocality] = useState('Sector 15');
  const [city, setCity] = useState('Chandigarh');
  const [genderType, setGenderType] = useState<GenderType>('boys');
  const [monthlyRent, setMonthlyRent] = useState(8500);
  const [securityDeposit, setSecurityDeposit] = useState(8500);
  const [selectedRoomTypes, setSelectedRoomTypes] = useState<SharingType[]>(['double', 'single']);
  const [totalBeds, setTotalBeds] = useState(16);
  const [availableBeds, setAvailableBeds] = useState(4);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    'Wi-Fi',
    'Air conditioning',
    'Attached bathroom',
    'Power backup',
    'Housekeeping',
  ]);
  const [foodOptions, setFoodOptions] = useState<'vegetarian' | 'non-vegetarian' | 'both-allowed' | 'self-cooking'>('vegetarian');
  const [mealsIncluded, setMealsIncluded] = useState(true);
  const [description, setDescription] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('+91 98140 11223');
  const [quietHours, setQuietHours] = useState('10:00 PM - 7:00 AM');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80');

  const amenityList = [
    'Wi-Fi',
    'Air conditioning',
    'Attached bathroom',
    'Laundry',
    'Washing machine',
    'Power backup',
    'CCTV',
    'Housekeeping',
    'Study area',
    'Parking',
    'Gym',
    'RO Water',
  ];

  const toggleRoomType = (type: SharingType) => {
    setSelectedRoomTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addProperty({
      name,
      tagline: tagline || 'Modern verified PG accommodation',
      address,
      locality,
      city,
      genderType,
      monthlyRent: Number(monthlyRent),
      securityDeposit: Number(securityDeposit),
      roomTypes: selectedRoomTypes.length > 0 ? selectedRoomTypes : ['double'],
      totalBeds: Number(totalBeds),
      availableBeds: Number(availableBeds),
      amenities: selectedAmenities,
      foodOptions,
      mealsIncluded,
      houseRules: [
        `Quiet hours: ${quietHours}`,
        'Gate closed at 10:30 PM',
        'Visitor register mandatory at reception',
      ],
      distanceLandmarks: [
        { landmark: 'Panjab University (PU)', distanceKm: 1.5 },
        { landmark: 'PEC Sector 12', distanceKm: 2.2 },
      ],
      images: [
        imageUrl || 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80',
      ],
      ownerId: 'owner-rajesh',
      ownerName: 'Rajesh Sharma',
      ownerPhone,
      ownerRating: 4.8,
      verified: true,
      description: description || `${name} offers clean, well-furnished rooms with study desks and high speed internet in ${locality}, ${city}.`,
      availableFrom: '2026-11-01',
      quietHours,
    });

    router.push('/owner/rooms');
  };

  return (
    <div className="space-y-6 pb-16 max-w-4xl">
      <div className="flex items-center gap-3">
        <Link
          href="/owner/rooms"
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
            Inventory Expansion
          </span>
          <h2 className="text-2xl font-black text-white tracking-tight">
            List a New PG Accommodation
          </h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        {/* Basic Property Details */}
        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4">
          <h3 className="font-extrabold text-sm text-white border-b border-slate-800 pb-2">
            1. Property Identity & Locality
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1 font-bold uppercase tracking-wider text-[10px]">
                Property Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Royal Crown Student Residency"
                className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-bold uppercase tracking-wider text-[10px]">
                Tagline / Pitch
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="e.g. Peaceful study sanctuary with pure veg thalis"
                className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-bold uppercase tracking-wider text-[10px]">
                Locality / Sector
              </label>
              <select
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white focus:outline-none focus:border-teal-500"
              >
                <option value="Sector 15">Sector 15, Chandigarh</option>
                <option value="Sector 22">Sector 22, Chandigarh</option>
                <option value="Sector 11">Sector 11, Chandigarh</option>
                <option value="Sector 35">Sector 35, Chandigarh</option>
                <option value="Sector 8">Sector 8, Chandigarh</option>
                <option value="Mohali">Mohali (Phase 7 / Sec 70)</option>
                <option value="Kharar">Kharar (CU Area)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-bold uppercase tracking-wider text-[10px]">
                Full Street Address
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. House #1890, Sector 15-D"
                className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>
        </div>

        {/* Financial & Room Capacities */}
        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4">
          <h3 className="font-extrabold text-sm text-white border-b border-slate-800 pb-2">
            2. Rent, Sharing & Capacity
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-slate-400 mb-1 font-bold uppercase tracking-wider text-[10px]">
                Monthly Rent (₹)
              </label>
              <input
                type="number"
                required
                min={3000}
                max={25000}
                value={monthlyRent}
                onChange={(e) => setMonthlyRent(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-bold uppercase tracking-wider text-[10px]">
                Security Deposit (₹)
              </label>
              <input
                type="number"
                required
                value={securityDeposit}
                onChange={(e) => setSecurityDeposit(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-bold uppercase tracking-wider text-[10px]">
                Total Beds Capacity
              </label>
              <input
                type="number"
                required
                value={totalBeds}
                onChange={(e) => setTotalBeds(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-bold uppercase tracking-wider text-[10px]">
                Vacant Beds Available
              </label>
              <input
                type="number"
                required
                value={availableBeds}
                onChange={(e) => setAvailableBeds(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-slate-400 mb-1 font-bold uppercase tracking-wider text-[10px]">
                Gender Policy
              </label>
              <select
                value={genderType}
                onChange={(e) => setGenderType(e.target.value as GenderType)}
                className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white"
              >
                <option value="boys">Boys PG Only</option>
                <option value="girls">Girls PG Only</option>
                <option value="co-ed">Co-ed Living</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-bold uppercase tracking-wider text-[10px]">
                Food Arrangements
              </label>
              <select
                value={foodOptions}
                onChange={(e) => setFoodOptions(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white"
              >
                <option value="vegetarian">Pure Vegetarian Meals Included</option>
                <option value="both-allowed">Both Veg / Non-Veg Allowed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Amenities Selection */}
        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4">
          <h3 className="font-extrabold text-sm text-white border-b border-slate-800 pb-2">
            3. Amenities & Facilities Available
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {amenityList.map((a) => {
              const active = selectedAmenities.includes(a);
              return (
                <button
                  type="button"
                  key={a}
                  onClick={() => toggleAmenity(a)}
                  className={`p-2.5 rounded-xl border text-left font-medium transition-all ${
                    active
                      ? 'bg-teal-500/20 border-teal-500 text-teal-300 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{a}</span>
                    {active && <Check className="w-3.5 h-3.5 text-teal-400" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Description & Contact */}
        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4">
          <h3 className="font-extrabold text-sm text-white border-b border-slate-800 pb-2">
            4. Description & Contact
          </h3>

          <div>
            <label className="block text-slate-400 mb-1 font-bold uppercase tracking-wider text-[10px]">
              Detailed Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Highlight proximity to university gates, peaceful study environment, food hygiene, etc."
              className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white focus:outline-none focus:border-teal-500"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-3 pt-2">
          <Link
            href="/owner/rooms"
            className="px-5 py-2.5 rounded-xl text-slate-400 hover:text-white"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold shadow-md shadow-teal-500/20 active:scale-95 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Publish Property to Tenant Discovery</span>
          </button>
        </div>
      </form>
    </div>
  );
}
