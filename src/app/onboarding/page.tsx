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
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  DollarSign,
  Building,
  Coffee,
  Check,
  MapPin,
  Calendar,
} from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const { tenantProfile, updateTenantProfile, setRole } = useApp();

  const [step, setStep] = useState(1);

  // Form State
  const [name, setName] = useState(tenantProfile.name);
  const [age, setAge] = useState(tenantProfile.age);
  const [gender, setGender] = useState<'male' | 'female' | 'other'>(tenantProfile.gender);
  const [occupation, setOccupation] = useState<'student' | 'working-professional' | 'intern'>(tenantProfile.occupation);
  const [collegeOrWorkplace, setCollegeOrWorkplace] = useState(tenantProfile.collegeOrWorkplace);
  const [city, setCity] = useState(tenantProfile.city);

  const [budgetMin, setBudgetMin] = useState(tenantProfile.budgetMin);
  const [budgetMax, setBudgetMax] = useState(tenantProfile.budgetMax);
  const [preferredLocation, setPreferredLocation] = useState(tenantProfile.preferredLocation);
  const [maxDistanceKm, setMaxDistanceKm] = useState(tenantProfile.maxDistanceKm);
  const [preferredMoveInDate, setPreferredMoveInDate] = useState(tenantProfile.preferredMoveInDate);
  const [stayDurationMonths, setStayDurationMonths] = useState(tenantProfile.stayDurationMonths);

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

  const handleFinish = () => {
    updateTenantProfile({
      name,
      age,
      gender,
      occupation,
      collegeOrWorkplace,
      city,
      budgetMin,
      budgetMax,
      preferredLocation,
      maxDistanceKm,
      preferredMoveInDate,
      stayDurationMonths,
      sharingPreference,
      essentialAmenities,
      foodPreference,
      sleepSchedule,
      cleanliness,
      noiseTolerance,
      smokingPreference,
      socialHabit,
    });
    setRole('tenant');
    router.push('/tenant/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 flex flex-col justify-center">
      <div className="max-w-3xl w-full mx-auto space-y-8">
        {/* Onboarding Header */}
        <div className="text-center space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Decision Support Calibration Quiz
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Find Your Right Room & Roommate
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
            Step {step} of 5 — Help our matching algorithm calibrate recommendations for your budget, distance, and daily routine.
          </p>
        </div>

        {/* Multi-step Progress Bar */}
        <div className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-sm flex items-center justify-between gap-2">
          {[
            { num: 1, label: 'Identity' },
            { num: 2, label: 'Budget & Area' },
            { num: 3, label: 'Facilities' },
            { num: 4, label: 'Lifestyle' },
            { num: 5, label: 'Review' },
          ].map((st) => (
            <div
              key={st.num}
              className={`flex-1 flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                step === st.num
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : step > st.num
                  ? 'bg-emerald-50 text-emerald-800'
                  : 'text-slate-400'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  step === st.num
                    ? 'bg-white text-indigo-600'
                    : step > st.num
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {step > st.num ? '✓' : st.num}
              </div>
              <span className="hidden sm:inline">{st.label}</span>
            </div>
          ))}
        </div>

        {/* Step Container Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-9 border border-slate-200 shadow-xl transition-all">
          {/* STEP 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-xl font-extrabold text-slate-900">
                  Step 1: Basic Information & Campus Identity
                </h3>
                <p className="text-xs text-slate-500">
                  Personal details to establish your student accommodation profile
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5 uppercase tracking-wider text-[11px]">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    placeholder="e.g. Akshit Mittal"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5 uppercase tracking-wider text-[11px]">
                    Age (Years)
                  </label>
                  <input
                    type="number"
                    min={17}
                    max={35}
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5 uppercase tracking-wider text-[11px]">
                    Gender Identity
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50"
                  >
                    <option value="male">Male (Boys PG Match)</option>
                    <option value="female">Female (Girls PG Match)</option>
                    <option value="other">Other / Co-ed preference</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5 uppercase tracking-wider text-[11px]">
                    Occupation
                  </label>
                  <select
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50"
                  >
                    <option value="student">University Student</option>
                    <option value="intern">Intern / Trainee</option>
                    <option value="working-professional">Working Professional</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5 uppercase tracking-wider text-[11px]">
                    College or Workplace
                  </label>
                  <input
                    type="text"
                    required
                    value={collegeOrWorkplace}
                    onChange={(e) => setCollegeOrWorkplace(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    placeholder="e.g. Panjab University (PU)"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5 uppercase tracking-wider text-[11px]">
                    Target City
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    placeholder="e.g. Chandigarh"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Budget & Location */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-xl font-extrabold text-slate-900">
                  Step 2: Budget & Geographic Proximity
                </h3>
                <p className="text-xs text-slate-500">
                  Weights heavily into room recommendations (55% combined impact)
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-bold text-slate-700 uppercase tracking-wider">
                      Minimum Monthly Rent
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
                      Maximum Monthly Rent Cap
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5 uppercase tracking-wider text-[11px]">
                    Preferred Locality / Sector
                  </label>
                  <input
                    type="text"
                    value={preferredLocation}
                    onChange={(e) => setPreferredLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    placeholder="e.g. Sector 15, Chandigarh"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-bold text-slate-700 uppercase tracking-wider">
                      Max Acceptable Commute Distance
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

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5 uppercase tracking-wider text-[11px]">
                    Target Move-in Date
                  </label>
                  <input
                    type="date"
                    value={preferredMoveInDate}
                    onChange={(e) => setPreferredMoveInDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5 uppercase tracking-wider text-[11px]">
                    Expected Duration of Stay
                  </label>
                  <select
                    value={stayDurationMonths}
                    onChange={(e) => setStayDurationMonths(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50"
                  >
                    <option value={6}>6 Months (Semester)</option>
                    <option value={10}>10–12 Months (Full Academic Year)</option>
                    <option value={24}>2 Years+ (Long Term)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Accommodation Preferences */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-xl font-extrabold text-slate-900">
                  Step 3: Sharing Arrangements & Facilities
                </h3>
                <p className="text-xs text-slate-500">
                  Select your room type tolerance and must-have amenities
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
                  Room Sharing Preference
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                  {[
                    { label: 'Single', val: 'single' },
                    { label: 'Double', val: 'double' },
                    { label: 'Triple', val: 'triple' },
                    { label: 'Four', val: 'four' },
                    { label: 'Flexible', val: 'any' },
                  ].map((t) => (
                    <button
                      type="button"
                      key={t.val}
                      onClick={() => setSharingPreference(t.val as SharingType)}
                      className={`py-2 px-3 rounded-xl border text-center font-bold transition-all ${
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
                  Must-Have Facilities
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {amenityOptions.map((amenity) => {
                    const checked = essentialAmenities.includes(amenity);
                    return (
                      <button
                        type="button"
                        key={amenity}
                        onClick={() => toggleAmenity(amenity)}
                        className={`flex items-center justify-between p-3 rounded-xl border text-xs font-medium transition-all ${
                          checked
                            ? 'border-indigo-300 bg-indigo-50 text-indigo-950 font-bold'
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
          )}

          {/* STEP 4: Lifestyle Preferences */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-xl font-extrabold text-slate-900">
                  Step 4: Lifestyle & Roommate Harmony Factors
                </h3>
                <p className="text-xs text-slate-500">
                  Powers the 7-Factor Roommate Compatibility algorithm
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5 uppercase tracking-wider text-[11px]">
                    Dietary Preference
                  </label>
                  <select
                    value={foodPreference}
                    onChange={(e) => setFoodPreference(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50"
                  >
                    <option value="vegetarian">Pure Vegetarian</option>
                    <option value="non-vegetarian">Non-Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="no-preference">No Preference</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5 uppercase tracking-wider text-[11px]">
                    Sleeping Schedule
                  </label>
                  <select
                    value={sleepSchedule}
                    onChange={(e) => setSleepSchedule(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50"
                  >
                    <option value="early-sleeper">Early Sleeper (~10:30 PM)</option>
                    <option value="night-owl">Night Owl (Past 1:00 AM)</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5 uppercase tracking-wider text-[11px]">
                    Cleanliness Standards
                  </label>
                  <select
                    value={cleanliness}
                    onChange={(e) => setCleanliness(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50"
                  >
                    <option value="very-particular">Very Particular (Daily Clean Desk/Room)</option>
                    <option value="moderately-particular">Moderately Particular</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5 uppercase tracking-wider text-[11px]">
                    Study Noise Tolerance
                  </label>
                  <select
                    value={noiseTolerance}
                    onChange={(e) => setNoiseTolerance(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50"
                  >
                    <option value="quiet">Quiet Environment</option>
                    <option value="moderate">Moderate Noise Acceptable</option>
                    <option value="social">Social / Music-Friendly</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5 uppercase tracking-wider text-[11px]">
                    Smoking Preference
                  </label>
                  <select
                    value={smokingPreference}
                    onChange={(e) => setSmokingPreference(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50"
                  >
                    <option value="non-smoking">Non-Smoking Environment</option>
                    <option value="no-preference">No Preference</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5 uppercase tracking-wider text-[11px]">
                    Social Habit
                  </label>
                  <select
                    value={socialHabit}
                    onChange={(e) => setSocialHabit(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50"
                  >
                    <option value="introverted">Introverted (Values quiet private time)</option>
                    <option value="balanced">Balanced (Friendly and respectful)</option>
                    <option value="extroverted">Extroverted (Loves group activities)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Final Review */}
          {step === 5 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-xl font-extrabold text-slate-900">
                  Step 5: Review Accommodation Profile
                </h3>
                <p className="text-xs text-slate-500">
                  Verify your inputs before our algorithm computes your personalized recommendations
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4 text-xs">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Name</span>
                    <strong className="text-slate-900 font-bold text-sm">{name} ({age}y)</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">College/Workplace</span>
                    <strong className="text-slate-900 font-bold">{collegeOrWorkplace}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Monthly Budget</span>
                    <strong className="text-indigo-700 font-bold">{formatINR(budgetMin)} - {formatINR(budgetMax)}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Preferred Area</span>
                    <strong className="text-slate-900 font-bold">{preferredLocation} (≤{maxDistanceKm}km)</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Sharing Arrangement</span>
                    <strong className="text-slate-900 font-bold capitalize">{sharingPreference} sharing</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Dietary & Routine</span>
                    <strong className="text-slate-900 font-bold capitalize">{foodPreference} • {sleepSchedule.replace('-', ' ')}</strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">
                    Essential Facilities ({essentialAmenities.length})
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {essentialAmenities.map((a) => (
                      <span key={a} className="bg-white px-2 py-0.5 rounded-md border border-slate-200 text-slate-700 text-[11px]">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Wizard Action Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-6">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous Step</span>
              </button>
            ) : <div />}

            {step < 5 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20 active:scale-95 transition-all"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-black shadow-lg shadow-teal-500/25 active:scale-95 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate My Matches</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
