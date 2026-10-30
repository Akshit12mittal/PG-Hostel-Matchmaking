'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { calculateRoomMatch } from '@/lib/matchingEngine';
import PropertyCard from '@/components/tenant/PropertyCard';
import { formatINR } from '@/lib/utils';
import {
  Search,
  Filter,
  SlidersHorizontal,
  RotateCcw,
  Heart,
  Check,
} from 'lucide-react';

function RoomsDiscoveryContent() {
  const { properties, tenantProfile, savedPropertyIds } = useApp();
  const searchParams = useSearchParams();
  const initialFilter = searchParams.get('filter');

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocality, setSelectedLocality] = useState<string>('all');
  const [maxBudget, setMaxBudget] = useState<number>(14000);
  const [selectedRoomType, setSelectedRoomType] = useState<string>('all');
  const [selectedFood, setSelectedFood] = useState<string>('all');
  const [selectedGender, setSelectedGender] = useState<string>('all');
  const [maxDistance, setMaxDistance] = useState<number>(15);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'distance'>('recommended');
  const [onlySaved, setOnlySaved] = useState<boolean>(initialFilter === 'saved');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const localities = [
    { label: 'All Localities', value: 'all' },
    { label: 'Sector 15, Chandigarh', value: 'Sector 15' },
    { label: 'Sector 22, Chandigarh', value: 'Sector 22' },
    { label: 'Sector 11, Chandigarh', value: 'Sector 11' },
    { label: 'Sector 35, Chandigarh', value: 'Sector 35' },
    { label: 'Sector 8, Chandigarh', value: 'Sector 8' },
    { label: 'Sector 10, Chandigarh', value: 'Sector 10' },
    { label: 'Mohali', value: 'Mohali' },
    { label: 'Kharar (CU Area)', value: 'Kharar' },
  ];

  const amenityOptions = [
    'Wi-Fi',
    'Air conditioning',
    'Attached bathroom',
    'Power backup',
    'Housekeeping',
    'Washing machine',
    'CCTV',
    'Study area',
    'Gym',
    'Parking',
  ];

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedLocality('all');
    setMaxBudget(14000);
    setSelectedRoomType('all');
    setSelectedFood('all');
    setSelectedGender('all');
    setMaxDistance(15);
    setSelectedAmenities([]);
    setSortBy('recommended');
    setOnlySaved(false);
  };

  // Filter and sort items dynamically
  const filteredProperties = useMemo(() => {
    return properties
      .map((property) => {
        const match = calculateRoomMatch(property, tenantProfile);
        const nearestLandmark =
          property.distanceLandmarks.find(
            (l) =>
              tenantProfile.collegeOrWorkplace &&
              l.landmark.toLowerCase().includes(tenantProfile.collegeOrWorkplace.toLowerCase())
          ) || property.distanceLandmarks[0] || { distanceKm: 2.0 };

        return {
          property,
          match,
          distanceKm: nearestLandmark.distanceKm,
        };
      })
      .filter(({ property, distanceKm }) => {
        // Saved filter
        if (onlySaved && !savedPropertyIds.includes(property.id)) {
          return false;
        }

        // Search keyword
        if (searchTerm) {
          const query = searchTerm.toLowerCase();
          const matchName = property.name.toLowerCase().includes(query);
          const matchLocality = property.locality.toLowerCase().includes(query);
          const matchDesc = property.description.toLowerCase().includes(query);
          if (!matchName && !matchLocality && !matchDesc) return false;
        }

        // Locality filter
        if (selectedLocality !== 'all' && property.locality !== selectedLocality) {
          return false;
        }

        // Budget filter
        if (property.monthlyRent > maxBudget) {
          return false;
        }

        // Room Type filter
        if (
          selectedRoomType !== 'all' &&
          !property.roomTypes.includes(selectedRoomType as any)
        ) {
          return false;
        }

        // Food Option filter
        if (selectedFood !== 'all' && property.foodOptions !== selectedFood) {
          return false;
        }

        // Gender filter
        if (selectedGender !== 'all' && property.genderType !== selectedGender) {
          return false;
        }

        // Distance filter
        if (distanceKm > maxDistance) {
          return false;
        }

        // Amenities filter
        if (
          selectedAmenities.length > 0 &&
          !selectedAmenities.every((amenity) =>
            property.amenities.some((a) => a.toLowerCase() === amenity.toLowerCase())
          )
        ) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'recommended') {
          return b.match.totalScore - a.match.totalScore;
        }
        if (sortBy === 'price-asc') {
          return a.property.monthlyRent - b.property.monthlyRent;
        }
        if (sortBy === 'price-desc') {
          return b.property.monthlyRent - a.property.monthlyRent;
        }
        if (sortBy === 'distance') {
          return a.distanceKm - b.distanceKm;
        }
        return 0;
      });
  }, [
    properties,
    tenantProfile,
    savedPropertyIds,
    onlySaved,
    searchTerm,
    selectedLocality,
    maxBudget,
    selectedRoomType,
    selectedFood,
    selectedGender,
    maxDistance,
    selectedAmenities,
    sortBy,
  ]);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Explore Verified Accommodations
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real PG and hostel rooms across Chandigarh, Mohali & Kharar with instant compatibility scoring
          </p>
        </div>

        {/* Search Input & Mobile Filter Toggle */}
        <div className="flex items-center gap-2 max-w-md w-full">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by PG name, sector, or landmark..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm"
            />
          </div>
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 shadow-sm"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Main Layout: Filters Sidebar + Room Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
        {/* Filters Sidebar */}
        <div
          className={`${
            mobileFilterOpen ? 'block' : 'hidden'
          } md:block md:col-span-1 bg-white rounded-2xl border border-slate-200/90 p-5 space-y-6 shadow-sm sticky top-[95px] max-h-[calc(100vh-115px)] overflow-y-auto`}
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
              <h3 className="font-extrabold text-sm text-slate-900">Filters</h3>
            </div>
            <button
              onClick={resetFilters}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Quick Saved Toggle */}
          <div>
            <button
              onClick={() => setOnlySaved(!onlySaved)}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                onlySaved
                  ? 'bg-rose-50 border-rose-200 text-rose-700'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Heart className={`w-3.5 h-3.5 ${onlySaved ? 'fill-rose-600 text-rose-600' : ''}`} />
                Show Shortlisted Only
              </span>
              <span className="text-[10px] bg-white px-2 py-0.5 rounded-full border border-slate-200">
                {savedPropertyIds.length}
              </span>
            </button>
          </div>

          {/* Locality Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
              Locality / Sector
            </label>
            <select
              value={selectedLocality}
              onChange={(e) => setSelectedLocality(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              {localities.map((loc) => (
                <option key={loc.value} value={loc.value}>
                  {loc.label}
                </option>
              ))}
            </select>
          </div>

          {/* Budget Range Slider */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-bold text-slate-700 uppercase tracking-wider">
                Max Monthly Rent
              </span>
              <span className="font-extrabold text-indigo-600">
                {formatINR(maxBudget)}
              </span>
            </div>
            <input
              type="range"
              min={5000}
              max={15000}
              step={500}
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>₹5,000</span>
              <span>₹10,000</span>
              <span>₹15,000</span>
            </div>
          </div>

          {/* Room Sharing Type */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
              Room Sharing
            </label>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {[
                { label: 'All', value: 'all' },
                { label: 'Single', value: 'single' },
                { label: 'Double', value: 'double' },
                { label: 'Triple', value: 'triple' },
              ].map((rt) => (
                <button
                  key={rt.value}
                  onClick={() => setSelectedRoomType(rt.value)}
                  className={`py-1.5 px-2 rounded-lg border text-center font-medium transition-all ${
                    selectedRoomType === rt.value
                      ? 'bg-indigo-600 text-white border-indigo-600 font-semibold'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {rt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Gender Accommodation */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
              Gender Policy
            </label>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {[
                { label: 'All', value: 'all' },
                { label: 'Boys PG', value: 'boys' },
                { label: 'Girls PG', value: 'girls' },
                { label: 'Co-ed', value: 'co-ed' },
              ].map((g) => (
                <button
                  key={g.value}
                  onClick={() => setSelectedGender(g.value)}
                  className={`py-1.5 px-2 rounded-lg border text-center font-medium transition-all ${
                    selectedGender === g.value
                      ? 'bg-indigo-600 text-white border-indigo-600 font-semibold'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* Food Policy */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
              Food Arrangements
            </label>
            <select
              value={selectedFood}
              onChange={(e) => setSelectedFood(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="all">All Food Arrangements</option>
              <option value="vegetarian">Pure Vegetarian Only</option>
              <option value="both-allowed">Both Veg / Non-Veg Allowed</option>
            </select>
          </div>

          {/* Distance Slider */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-bold text-slate-700 uppercase tracking-wider">
                Max Distance
              </span>
              <span className="font-extrabold text-indigo-600">
                ≤ {maxDistance} km
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={15}
              step={1}
              value={maxDistance}
              onChange={(e) => setMaxDistance(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
          </div>

          {/* Essential Amenities */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
              Must-Have Amenities
            </label>
            <div className="space-y-1.5">
              {amenityOptions.map((amenity) => {
                const checked = selectedAmenities.includes(amenity);
                return (
                  <button
                    key={amenity}
                    onClick={() => toggleAmenity(amenity)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg border text-xs text-left transition-colors ${
                      checked
                        ? 'border-indigo-300 bg-indigo-50 text-indigo-900 font-semibold'
                        : 'border-slate-100 text-slate-600 hover:bg-slate-50'
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

        {/* Room Listings Right Column */}
        <div className="md:col-span-3 space-y-5">
          {/* Controls Bar: Count and Sort */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 flex flex-wrap items-center justify-between gap-3 shadow-sm">
            <div className="text-xs text-slate-600 font-medium">
              Showing <strong className="text-slate-900 font-bold">{filteredProperties.length}</strong> matching accommodations
              {onlySaved && ' (Shortlisted)'}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="recommended">Best Compatibility (Algorithm)</option>
                <option value="price-asc">Rent: Low to High</option>
                <option value="price-desc">Rent: High to Low</option>
                <option value="distance">Nearest to Campus</option>
              </select>
            </div>
          </div>

          {/* Cards Grid */}
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProperties.map(({ property }) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  tenant={tenantProfile}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200/90 p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">
                No matching accommodations found
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try widening your budget, distance slider, or removing specific amenity filters.
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function RoomsDiscoveryPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading discovery engine...</div>}>
      <RoomsDiscoveryContent />
    </Suspense>
  );
}
