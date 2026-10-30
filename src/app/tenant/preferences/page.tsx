'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  SharingType,
  FoodPreference,
  SleepSchedule,
  CleanlinessLevel,
  NoiseTolerance,
  SmokingPreference,
  SocialHabit,
} from '@/types';
import { formatINR } from '@/lib/utils';
import {
  SlidersHorizontal,
  Save,
  RotateCcw,
  Sparkles,
  Check,
  Building,
  DollarSign,
  Coffee,
  Clock,
  Sparkle,
} from 'lucide-react';

export default function TenantPreferencesPage() {
  const router = useRouter();
  const { tenantProfile, updateTenantProfile } = useApp();

  const [budgetMin, setBudgetMin] = useState(tenantProfile.budgetMin);
  const [budgetMax, setBudgetMax] = useState(tenantProfile.budgetMax);
  const [preferredLocation, setPreferredLocation] = useState(tenantProfile.preferredLocation);
  const [maxDistanceKm, setMaxDistanceKm] = useState(tenantProfile.maxDistanceKm);
  const [sharingPreference, setSharingPreference] = useState<SharingType>(tenantProfile.sharingPreference);
  const [essentialAmenities, setEssentialAmenities] = useState<string[]>(tenantProfile.essentialAmenities);
  const [foodPreference, setFoodPreference] = useState<FoodPreference>(tenantProfile.foodPreference);
  const [sleepSchedule, setSleepSchedule] = useState<SleepSchedule>(tenantProfile.sleepSchedule);
  const [cleanliness, setCleanliness] = useState<CleanlinessLevel>(tenantProfile.cleanliness);
  const [noiseTolerance, setNoiseTolerance] = useState<NoiseTolerance>(tenantProfile.noiseTolerance);
  const [smokingPreference, setSmokingPreference] = useState<SmokingPreference>(tenantProfile.smokingPreference);
  const [socialHabit, setSocialHabit] = useState<SocialHabit>(tenantProfile.socialHabit);

  const amenityOptions = [
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

  const toggleAmenity = (amenity: string) => {
    setEssentialAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateTenantProfile({
      budgetMin,
      budgetMax,
      preferredLocation,
      maxDistanceKm,
      sharingPreference,
      essentialAmenities,
      foodPreference,
      sleepSchedule,
      cleanliness,
      noiseTolerance,
      smokingPreference,
      socialHabit,
    });
    router.push('/tenant/dashboard');
  };

  const handleReset = () => {
    setBudgetMin(tenantProfile.budgetMin);
    setBudgetMax(tenantProfile.budgetMax);
    setPreferredLocation(tenantProfile.preferredLocation);
    setMaxDistanceKm(tenantProfile.maxDistanceKm);
    setSharingPreference(tenantProfile.sharingPreference);
    setEssentialAmenities(tenantProfile.essentialAmenities);
    setFoodPreference(tenantProfile.foodPreference);
    setSleepSchedule(tenantProfile.sleepSchedule);
    setCleanliness(tenantProfile.cleanliness);
    setNoiseTolerance(tenantProfile.noiseTolerance);
    setSmokingPreference(tenantProfile.smokingPreference);
    setSocialHabit(tenantProfile.socialHabit);
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 pb-16 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
              Decision Support Tuning
            </span>
            <span className="text-xs text-slate-400 font-semibold">
              Live Recalculation
            </span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Matching Criteria & Preferences
          </h2>
          <p className="text-xs text-slate-500">
            Updating these settings immediately recalibrates compatibility scores across all rooms and roommate candidates.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20 active:scale-95 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save & Recalculate</span>
          </button>
        </div>
      </div>

      {/* Section 1: Budget & Distance */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
          <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-slate-900">
              Budget & Geographic Location (55% Algorithm Weight)
            </h3>
            <p className="text-xs text-slate-500">
              Rent ceiling and acceptable radius from {tenantProfile.collegeOrWorkplace}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="font-bold text-slate-700 uppercase tracking-wider">
                Minimum Monthly Budget
              </span>
              <strong className="text-emerald-700 font-extrabold">
                {formatINR(budgetMin)}
              </strong>
            </div>
            <input
              type="range"
              min={3000}
              max={10000}
              step={500}
              value={budgetMin}
              onChange={(e) => setBudgetMin(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="font-bold text-slate-700 uppercase tracking-wider">
                Maximum Monthly Budget (Hard Cap)
              </span>
              <strong className="text-indigo-700 font-extrabold">
                {formatINR(budgetMax)}
              </strong>
            </div>
            <input
              type="range"
              min={6000}
              max={20000}
              step={500}
              value={budgetMax}
              onChange={(e) => setBudgetMax(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
              Preferred Locality
            </label>
            <input
              type="text"
              value={preferredLocation}
              onChange={(e) => setPreferredLocation(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              placeholder="e.g. Sector 15, Chandigarh"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="font-bold text-slate-700 uppercase tracking-wider">
                Max Distance from Campus
              </span>
              <strong className="text-indigo-700 font-extrabold">
                {maxDistanceKm} km
              </strong>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              step={0.5}
              value={maxDistanceKm}
              onChange={(e) => setMaxDistanceKm(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Room Type & Amenities */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
          <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-slate-900">
              Sharing Preference & Essential Facilities (30% Weight)
            </h3>
            <p className="text-xs text-slate-500">
              Target room occupancy and must-have amenities
            </p>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
            Room Sharing Configuration
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
            {[
              { label: 'Single Room', val: 'single' },
              { label: 'Double Sharing', val: 'double' },
              { label: 'Triple Sharing', val: 'triple' },
              { label: 'Four Sharing', val: 'four' },
              { label: 'Any Sharing', val: 'any' },
            ].map((t) => (
              <button
                type="button"
                key={t.val}
                onClick={() => setSharingPreference(t.val as SharingType)}
                className={`py-2 px-3 rounded-xl border text-center font-semibold transition-all ${
                  sharingPreference === t.val
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
            Essential Facilities (Must be present in PG)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {amenityOptions.map((amenity) => {
              const checked = essentialAmenities.includes(amenity);
              return (
                <button
                  type="button"
                  key={amenity}
                  onClick={() => toggleAmenity(amenity)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-xs text-left transition-colors font-medium ${
                    checked
                      ? 'border-indigo-300 bg-indigo-50/80 text-indigo-900 font-bold'
                      : 'border-slate-100 bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span>{amenity}</span>
                  {checked && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Section 3: Lifestyle & Roommate Co-living Preferences */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
          <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
            <Coffee className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-slate-900">
              Lifestyle & Roommate Harmony Criteria (15% Room, 100% Roommate)
            </h3>
            <p className="text-xs text-slate-500">
              Prevents daily frictions in sleeping, food prep, study volume, and tidy spaces
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
          {/* Dietary preference */}
          <div>
            <label className="block font-bold text-slate-700 mb-1.5 uppercase tracking-wider text-[11px]">
              Dietary Lifestyle
            </label>
            <select
              value={foodPreference}
              onChange={(e) => setFoodPreference(e.target.value as FoodPreference)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-medium"
            >
              <option value="vegetarian">Pure Vegetarian</option>
              <option value="non-vegetarian">Non-Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="no-preference">No Preference</option>
            </select>
          </div>

          {/* Sleep schedule */}
          <div>
            <label className="block font-bold text-slate-700 mb-1.5 uppercase tracking-wider text-[11px]">
              Sleep Routine
            </label>
            <select
              value={sleepSchedule}
              onChange={(e) => setSleepSchedule(e.target.value as SleepSchedule)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-medium"
            >
              <option value="early-sleeper">Early Sleeper (Lights out ~10:30 PM)</option>
              <option value="night-owl">Night Owl (Active past 1:00 AM)</option>
              <option value="flexible">Flexible Routine</option>
            </select>
          </div>

          {/* Cleanliness */}
          <div>
            <label className="block font-bold text-slate-700 mb-1.5 uppercase tracking-wider text-[11px]">
              Cleanliness Standards
            </label>
            <select
              value={cleanliness}
              onChange={(e) => setCleanliness(e.target.value as CleanlinessLevel)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-medium"
            >
              <option value="very-particular">Very Particular (Daily tidiness)</option>
              <option value="moderately-particular">Moderately Particular</option>
              <option value="flexible">Flexible / Casual</option>
            </select>
          </div>

          {/* Noise tolerance */}
          <div>
            <label className="block font-bold text-slate-700 mb-1.5 uppercase tracking-wider text-[11px]">
              Study Noise Tolerance
            </label>
            <select
              value={noiseTolerance}
              onChange={(e) => setNoiseTolerance(e.target.value as NoiseTolerance)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-medium"
            >
              <option value="quiet">Quiet Study Environment</option>
              <option value="moderate">Moderate Background Sounds</option>
              <option value="social">Lively Social Environment</option>
            </select>
          </div>

          {/* Smoking preference */}
          <div>
            <label className="block font-bold text-slate-700 mb-1.5 uppercase tracking-wider text-[11px]">
              Smoking Policy
            </label>
            <select
              value={smokingPreference}
              onChange={(e) => setSmokingPreference(e.target.value as SmokingPreference)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-medium"
            >
              <option value="non-smoking">Strictly Non-Smoking PG & Roommate</option>
              <option value="no-preference">No Preference</option>
            </select>
          </div>

          {/* Social Energy */}
          <div>
            <label className="block font-bold text-slate-700 mb-1.5 uppercase tracking-wider text-[11px]">
              Social Energy
            </label>
            <select
              value={socialHabit}
              onChange={(e) => setSocialHabit(e.target.value as SocialHabit)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-medium"
            >
              <option value="introverted">Introverted (Values privacy & silence)</option>
              <option value="balanced">Balanced (Friendly & respectful)</option>
              <option value="extroverted">Extroverted (Loves group activities)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-lg shadow-indigo-500/20 active:scale-95 transition-all"
        >
          <Sparkles className="w-4 h-4" />
          <span>Save Preferences & Recalculate Dashboard</span>
        </button>
      </div>
    </form>
  );
}
