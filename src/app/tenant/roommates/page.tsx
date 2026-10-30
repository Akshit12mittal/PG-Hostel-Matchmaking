'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { calculateRoommateMatch } from '@/lib/matchingEngine';
import RoommateCard from '@/components/tenant/RoommateCard';
import {
  Users,
  Search,
  Filter,
  Heart,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

export default function RoommateMatchingPage() {
  const { roommates, tenantProfile, shortlistRoommateIds } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSleep, setSelectedSleep] = useState<string>('all');
  const [selectedFood, setSelectedFood] = useState<string>('all');
  const [selectedCleanliness, setSelectedCleanliness] = useState<string>('all');
  const [selectedNoise, setSelectedNoise] = useState<string>('all');
  const [onlyShortlisted, setOnlyShortlisted] = useState(false);
  const [sortBy, setSortBy] = useState<'match' | 'budget-asc' | 'budget-desc'>('match');

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedSleep('all');
    setSelectedFood('all');
    setSelectedCleanliness('all');
    setSelectedNoise('all');
    setOnlyShortlisted(false);
    setSortBy('match');
  };

  const filteredRoommates = useMemo(() => {
    return roommates
      .map((rm) => ({
        roommate: rm,
        match: calculateRoommateMatch(rm, tenantProfile),
      }))
      .filter(({ roommate }) => {
        if (onlyShortlisted && !shortlistRoommateIds.includes(roommate.id)) {
          return false;
        }

        if (searchTerm) {
          const q = searchTerm.toLowerCase();
          const matchName = roommate.name.toLowerCase().includes(q);
          const matchCollege = roommate.collegeOrWorkplace.toLowerCase().includes(q);
          const matchOcc = roommate.occupation.toLowerCase().includes(q);
          const matchLoc = roommate.location.toLowerCase().includes(q);
          if (!matchName && !matchCollege && !matchOcc && !matchLoc) return false;
        }

        if (selectedSleep !== 'all' && roommate.sleepSchedule !== selectedSleep) {
          return false;
        }

        if (selectedFood !== 'all' && roommate.foodPreference !== selectedFood) {
          return false;
        }

        if (
          selectedCleanliness !== 'all' &&
          roommate.cleanliness !== selectedCleanliness
        ) {
          return false;
        }

        if (selectedNoise !== 'all' && roommate.noiseTolerance !== selectedNoise) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'match') {
          return b.match.totalScore - a.match.totalScore;
        }
        if (sortBy === 'budget-asc') {
          return a.roommate.budgetMonthly - b.roommate.budgetMonthly;
        }
        if (sortBy === 'budget-desc') {
          return b.roommate.budgetMonthly - a.roommate.budgetMonthly;
        }
        return 0;
      });
  }, [
    roommates,
    tenantProfile,
    shortlistRoommateIds,
    onlyShortlisted,
    searchTerm,
    selectedSleep,
    selectedFood,
    selectedCleanliness,
    selectedNoise,
    sortBy,
  ]);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>7-Factor Roommate Compatibility Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Find Your Ideal Roommate
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1.5 font-normal leading-relaxed">
            Compatibility goes beyond sharing a room. Our algorithm evaluates 7 core living dimensions: sleep schedule synchrony, cleanliness standards, food preferences, study noise tolerance, social energy, budget alignment, and smoking policies to prevent co-living friction.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, college, or profession (e.g., PEC, PU, Engineering)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          {/* Quick Shortlist Toggle & Sort */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setOnlyShortlisted(!onlyShortlisted)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-all ${
                onlyShortlisted
                  ? 'bg-rose-50 border-rose-200 text-rose-700'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${onlyShortlisted ? 'fill-rose-600 text-rose-600' : ''}`} />
              <span>Shortlisted ({shortlistRoommateIds.length})</span>
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none"
            >
              <option value="match">Sort by Compatibility</option>
              <option value="budget-asc">Budget: Low to High</option>
              <option value="budget-desc">Budget: High to Low</option>
            </select>

            <button
              onClick={resetFilters}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              title="Reset filters"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Filter Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-slate-100 text-xs">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Sleep Schedule
            </label>
            <select
              value={selectedSleep}
              onChange={(e) => setSelectedSleep(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 text-xs"
            >
              <option value="all">All Sleep Schedules</option>
              <option value="early-sleeper">Early Sleeper</option>
              <option value="night-owl">Night Owl</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Dietary Preference
            </label>
            <select
              value={selectedFood}
              onChange={(e) => setSelectedFood(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 text-xs"
            >
              <option value="all">All Dietary Preferences</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="non-vegetarian">Non-Vegetarian</option>
              <option value="vegan">Vegan</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Cleanliness
            </label>
            <select
              value={selectedCleanliness}
              onChange={(e) => setSelectedCleanliness(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 text-xs"
            >
              <option value="all">All Standards</option>
              <option value="very-particular">Very Particular</option>
              <option value="moderately-particular">Moderately Particular</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Noise Tolerance
            </label>
            <select
              value={selectedNoise}
              onChange={(e) => setSelectedNoise(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 text-xs"
            >
              <option value="all">All Noise Tolerances</option>
              <option value="quiet">Quiet Environment</option>
              <option value="moderate">Moderate Noise</option>
              <option value="social">Social Environment</option>
            </select>
          </div>
        </div>
      </div>

      {/* Roommates Grid */}
      {filteredRoommates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoommates.map(({ roommate }) => (
            <RoommateCard key={roommate.id} roommate={roommate} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">
            No matching roommate profiles found
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search criteria or reset lifestyle filters.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
