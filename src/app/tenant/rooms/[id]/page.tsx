'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { calculateRoomMatch, calculateRoommateMatch } from '@/lib/matchingEngine';
import { formatINR, getScoreBadgeColor } from '@/lib/utils';
import SendEnquiryModal from '@/components/tenant/SendEnquiryModal';
import {
  MapPin,
  Heart,
  Scale,
  Sparkles,
  Bed,
  Check,
  CheckCircle2,
  AlertTriangle,
  Send,
  Phone,
  ShieldCheck,
  Star,
  Clock,
  Utensils,
  ChevronLeft,
} from 'lucide-react';

function RoomDetailsContent() {
  const params = useParams();
  const id = params?.id as string;
  const {
    properties,
    tenantProfile,
    roommates,
    savedPropertyIds,
    toggleSaveProperty,
    comparePropertyIds,
    toggleCompareProperty,
  } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);

  const property = properties.find((p) => p.id === id);

  if (!property) {
    return notFound();
  }

  const match = calculateRoomMatch(property, tenantProfile);
  const badgeStyle = getScoreBadgeColor(match.totalScore);
  const isSaved = savedPropertyIds.includes(property.id);
  const isCompared = comparePropertyIds.includes(property.id);

  // Check if any sample roommate is currently staying in this PG
  const currentOccupant = roommates.find((rm) => rm.currentPropertyId === property.id);
  const occupantMatch = currentOccupant ? calculateRoommateMatch(currentOccupant, tenantProfile) : null;

  return (
    <div className="space-y-8 pb-16">
      {/* Back button & Title Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/tenant/rooms"
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                {property.genderType === 'boys' ? 'Boys PG' : property.genderType === 'girls' ? 'Girls PG' : 'Co-ed Living'}
              </span>
              {property.verified && (
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Physically Verified
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              {property.name}
            </h1>
            <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {property.address}, {property.locality}, {property.city}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => toggleCompareProperty(property.id)}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border text-xs font-semibold shadow-sm transition-all ${
              isCompared
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>{isCompared ? 'In Compare' : 'Add to Compare'}</span>
          </button>
          <button
            onClick={() => toggleSaveProperty(property.id)}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border text-xs font-semibold shadow-sm transition-all ${
              isSaved
                ? 'bg-rose-50 text-rose-700 border-rose-200'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-600 text-rose-600' : ''}`} />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>
          <button
            onClick={() => setEnquiryModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/25 active:scale-95 transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Send Host Enquiry</span>
          </button>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Large Hero Image */}
        <div className="lg:col-span-2 relative h-72 sm:h-96 rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm">
          <Image
            src={property.images[activeImageIndex] || property.images[0]}
            alt={property.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover transition-all duration-300"
          />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs pointer-events-none">
            <span className="bg-slate-900/80 backdrop-blur px-3 py-1.5 rounded-xl font-medium">
              Photo {activeImageIndex + 1} of {property.images.length}
            </span>
            <span className="bg-emerald-600 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 shadow-md">
              <Bed className="w-3.5 h-3.5" />
              {property.availableBeds} Beds Vacant
            </span>
          </div>
        </div>

        {/* Thumbnail Stack */}
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
          {property.images.slice(0, 3).map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className={`relative h-32 sm:h-44 lg:h-[116px] rounded-2xl overflow-hidden border-2 transition-all ${
                activeImageIndex === idx
                  ? 'border-indigo-600 ring-2 ring-indigo-500/30'
                  : 'border-slate-200 opacity-80 hover:opacity-100'
              }`}
            >
              <Image
                src={img}
                alt={`${property.name} angle ${idx + 1}`}
                fill
                sizes="(max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Details & Roommate occupy */}
        <div className="lg:col-span-2 space-y-8">
          {/* Key Facts Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm text-xs">
            <div>
              <span className="text-slate-400 font-medium block">Monthly Rent</span>
              <strong className="text-lg font-black text-indigo-700">
                {formatINR(property.monthlyRent)}
              </strong>
              <span className="text-[10px] text-slate-500 block">per bed / mo</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">Security Deposit</span>
              <strong className="text-base font-bold text-slate-900">
                {formatINR(property.securityDeposit)}
              </strong>
              <span className="text-[10px] text-emerald-600 block">Fully refundable</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">Sharing Offered</span>
              <strong className="text-base font-bold text-slate-900 capitalize">
                {property.roomTypes.join(', ')}
              </strong>
              <span className="text-[10px] text-slate-500 block">Configurable</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">Move-in Ready</span>
              <strong className="text-base font-bold text-slate-900">
                {property.availableFrom}
              </strong>
              <span className="text-[10px] text-indigo-600 block">Immediate entry</span>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
            <h3 className="font-extrabold text-lg text-slate-900">
              About {property.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Amenities & Facilities */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            <h3 className="font-extrabold text-lg text-slate-900">
              Amenities & Living Facilities
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {property.amenities.map((amenity) => {
                const isRequested = tenantProfile.essentialAmenities.some(
                  (a) => a.toLowerCase() === amenity.toLowerCase()
                );
                return (
                  <div
                    key={amenity}
                    className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-semibold ${
                      isRequested
                        ? 'border-indigo-200 bg-indigo-50/70 text-indigo-900'
                        : 'border-slate-100 bg-slate-50 text-slate-700'
                    }`}
                  >
                    <Check className={`w-4 h-4 ${isRequested ? 'text-indigo-600' : 'text-emerald-600'}`} />
                    <span>{amenity}</span>
                    {isRequested && (
                      <span className="ml-auto text-[9px] font-bold uppercase tracking-wider text-indigo-600 bg-white px-1.5 py-0.5 rounded">
                        Required
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* College Proximity & Distances */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            <h3 className="font-extrabold text-lg text-slate-900">
              Proximity to Colleges & Key Hubs
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {property.distanceLandmarks.map((lm) => (
                <div
                  key={lm.landmark}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs"
                >
                  <div className="flex items-center gap-2 font-medium text-slate-800">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span>{lm.landmark}</span>
                  </div>
                  <strong className="font-extrabold text-indigo-700">
                    {lm.distanceKm} km
                  </strong>
                </div>
              ))}
            </div>
          </div>

          {/* House Rules & Timings */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            <h3 className="font-extrabold text-lg text-slate-900">
              House Rules & Timings
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                <span className="text-slate-400 flex items-center gap-1 font-semibold">
                  <Clock className="w-3.5 h-3.5" />
                  Quiet Study Hours
                </span>
                <p className="font-extrabold text-slate-900 text-sm">
                  {property.quietHours}
                </p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                <span className="text-slate-400 flex items-center gap-1 font-semibold">
                  <Utensils className="w-3.5 h-3.5" />
                  Dining Policy
                </span>
                <p className="font-extrabold text-slate-900 text-sm capitalize">
                  {property.foodOptions.replace('-', ' ')} {property.mealsIncluded ? '• Meals Included' : '• Self / Tiffin'}
                </p>
              </div>
            </div>

            <ul className="space-y-2 text-xs text-slate-600 pt-2">
              {property.houseRules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Potential Roommate Currently Occupying This Room */}
          {currentOccupant && occupantMatch && (
            <div className="bg-gradient-to-br from-indigo-50/70 via-teal-50/50 to-white p-6 rounded-3xl border border-indigo-100 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 bg-teal-100/70 px-2 py-0.5 rounded-md">
                    Current Roommate Match
                  </span>
                  <h3 className="font-extrabold text-lg text-slate-900 mt-1">
                    Roommate already residing in this PG
                  </h3>
                  <p className="text-xs text-slate-500">
                    Evaluating lifestyle harmony with your prospective roommate
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-indigo-700">
                    {occupantMatch.totalScore}%
                  </span>
                  <span className="block text-[10px] font-bold text-slate-500">
                    Compatibility
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white p-4 rounded-2xl border border-slate-200/80">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0">
                  <Image
                    src={currentOccupant.photoUrl}
                    alt={currentOccupant.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <strong className="text-slate-900 text-sm font-extrabold">
                      {currentOccupant.name}
                    </strong>
                    <span className="text-xs text-slate-500">
                      ({currentOccupant.age}y, {currentOccupant.occupation})
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 italic">
                    &ldquo;{currentOccupant.bio}&rdquo;
                  </p>

                  <div className="flex flex-wrap items-center gap-2 mt-3 text-[11px]">
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md capitalize font-medium">
                      {currentOccupant.sleepSchedule.replace('-', ' ')}
                    </span>
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md capitalize font-medium">
                      {currentOccupant.foodPreference}
                    </span>
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md capitalize font-medium">
                      {currentOccupant.cleanliness.replace('-', ' ')} cleanliness
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200">
                  <span className="font-bold flex items-center gap-1 text-[11px] uppercase tracking-wider mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Why you&apos;ll get along
                  </span>
                  <ul className="space-y-1">
                    {occupantMatch.pros.slice(0, 2).map((p, i) => (
                      <li key={i}>• {p}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-3 rounded-xl bg-amber-50 text-amber-900 border border-amber-200">
                  <span className="font-bold flex items-center gap-1 text-[11px] uppercase tracking-wider mb-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    Potential differences
                  </span>
                  <ul className="space-y-1">
                    {occupantMatch.concerns.length > 0 ? (
                      occupantMatch.concerns.slice(0, 2).map((c, i) => (
                        <li key={i}>• {c}</li>
                      ))
                    ) : (
                      <li>• Clean and quiet compatibility alignment</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Sticky Compatibility Engine Card & Host Info */}
        <div className="space-y-6">
          {/* Prominent Compatibility Card */}
          <div className="bg-white rounded-3xl border border-indigo-200 p-6 shadow-xl space-y-6 sticky top-[95px]">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                  Algorithm Score
                </span>
                <span className="text-xs text-slate-400 font-semibold">
                  Rule-based
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-900">
                Your Compatibility Score
              </h3>
            </div>

            {/* Score Big Display */}
            <div className={`p-5 rounded-2xl border ${badgeStyle.border} ${badgeStyle.bg} flex items-center justify-between`}>
              <div>
                <div className="text-4xl font-black tracking-tight">
                  {match.totalScore}%
                </div>
                <div className="text-xs font-bold mt-1">
                  {badgeStyle.label}
                </div>
              </div>
              <div className="text-right text-xs max-w-[130px] font-medium leading-tight">
                Top match for your budget & campus commute
              </div>
            </div>

            {/* Score Breakdown Bars */}
            <div className="space-y-2.5 text-xs">
              <h4 className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                Score Components
              </h4>

              <div className="space-y-2">
                <div>
                  <div className="flex justify-between font-semibold text-slate-800 mb-1">
                    <span>Budget Alignment (30%)</span>
                    <span>{match.budgetScore}/30</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full"
                      style={{ width: `${(match.budgetScore / 30) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-slate-800 mb-1">
                    <span>Campus Proximity (25%)</span>
                    <span>{match.locationScore}/25</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full rounded-full"
                      style={{ width: `${(match.locationScore / 25) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-slate-800 mb-1">
                    <span>Room Sharing Match (15%)</span>
                    <span>{match.roomTypeScore}/15</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-500 h-full rounded-full"
                      style={{ width: `${(match.roomTypeScore / 15) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-slate-800 mb-1">
                    <span>Amenities Fulfilled (15%)</span>
                    <span>{match.amenitiesScore}/15</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-teal-500 h-full rounded-full"
                      style={{ width: `${(match.amenitiesScore / 15) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-slate-800 mb-1">
                    <span>Lifestyle & Diet (10%)</span>
                    <span>{match.lifestyleScore}/10</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-purple-500 h-full rounded-full"
                      style={{ width: `${(match.lifestyleScore / 10) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-slate-800 mb-1">
                    <span>Immediate Availability (5%)</span>
                    <span>{match.availabilityScore}/5</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-500 h-full rounded-full"
                      style={{ width: `${(match.availabilityScore / 5) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Why we recommend it */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-2">
              <span className="font-bold text-slate-800 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                Key Compatibility Drivers
              </span>
              <ul className="space-y-1.5 text-slate-600">
                {match.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Primary Action Button */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => setEnquiryModalOpen(true)}
                className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Booking Enquiry</span>
              </button>
              <p className="text-[11px] text-slate-400 text-center">
                Free enquiry • Direct contact with PG host
              </p>
            </div>

            {/* Host Card */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">
                  Property Host
                </span>
                <strong className="text-slate-900 block font-bold text-sm">
                  {property.ownerName}
                </strong>
                <div className="flex items-center gap-1 text-amber-500 text-[11px]">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span className="font-bold text-slate-700">{property.ownerRating}</span>
                  <span className="text-slate-400 font-normal">• Verified Host</span>
                </div>
              </div>
              <a
                href={`tel:${property.ownerPhone}`}
                className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
                title={`Call host at ${property.ownerPhone}`}
              >
                <Phone className="w-4 h-4 text-slate-600" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Direct Enquiry Modal */}
      {enquiryModalOpen && (
        <SendEnquiryModal
          property={property}
          tenant={tenantProfile}
          onClose={() => setEnquiryModalOpen(false)}
        />
      )}
    </div>
  );
}

export default function RoomDetailsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500 font-semibold">Loading room analysis...</div>}>
      <RoomDetailsContent />
    </Suspense>
  );
}
