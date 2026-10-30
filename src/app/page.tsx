'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import PropertyCard from '@/components/tenant/PropertyCard';
import { useApp } from '@/context/AppContext';
import { formatINR } from '@/lib/utils';
import {
  Sparkles,
  Search,
  Building,
  Users,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  MapPin,
  Calendar,
  DollarSign,
  Heart,
  Scale,
  Award,
} from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const { properties, tenantProfile } = useApp();

  // Search Bar State
  const [searchCity, setSearchCity] = useState('Chandigarh');
  const [searchCollege, setSearchCollege] = useState('Panjab University (PU)');
  const [searchBudget, setSearchBudget] = useState('10000');
  const [searchSharing, setSearchSharing] = useState('double');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/tenant/rooms');
  };

  const featuredRooms = properties.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col text-slate-900">
      <Navbar />

      <main className="flex-1 space-y-20 sm:space-y-28 pb-20">
        {/* HERO SECTION */}
        <section className="relative pt-12 sm:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
          <div className="text-center max-w-3xl mx-auto space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Intelligent PG & Roommate Matching Platform</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
              Finding a PG Shouldn&apos;t Take <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-teal-600 to-indigo-800">Months.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Discover affordable rooms and compatible roommates through intelligent matching based on your budget, campus location, and daily lifestyle routine.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/onboarding"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-xl shadow-indigo-600/25 transition-all hover:-translate-y-0.5 active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-indigo-200" />
                <span>Find My Room (Match Quiz)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/owner/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-200 shadow-sm transition-all hover:-translate-y-0.5"
              >
                <Building className="w-4 h-4 text-slate-500" />
                <span>List Your PG</span>
              </Link>
            </div>
          </div>

          {/* Interactive Search Widget Bar */}
          <div className="mt-12 sm:mt-16 bg-white rounded-3xl border border-slate-200 shadow-2xl p-4 sm:p-6 max-w-5xl mx-auto">
            <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 text-xs">
              <div>
                <label className="block text-slate-500 font-bold uppercase tracking-wider text-[10px] mb-1.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-indigo-600" />
                  City
                </label>
                <select
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option value="Chandigarh">Chandigarh</option>
                  <option value="Mohali">Mohali</option>
                  <option value="Kharar">Kharar</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-500 font-bold uppercase tracking-wider text-[10px] mb-1.5 flex items-center gap-1">
                  <Building className="w-3 h-3 text-indigo-600" />
                  College / Workplace
                </label>
                <select
                  value={searchCollege}
                  onChange={(e) => setSearchCollege(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option value="Panjab University (PU)">Panjab University (PU)</option>
                  <option value="PEC Sector 12">PEC Sector 12</option>
                  <option value="Chandigarh University (CU)">Chandigarh University (CU)</option>
                  <option value="Rajiv Gandhi IT Park">Rajiv Gandhi IT Park</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-500 font-bold uppercase tracking-wider text-[10px] mb-1.5 flex items-center gap-1">
                  <DollarSign className="w-3 h-3 text-indigo-600" />
                  Max Monthly Budget
                </label>
                <select
                  value={searchBudget}
                  onChange={(e) => setSearchBudget(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option value="7000">Up to ₹7,000 / mo</option>
                  <option value="10000">Up to ₹10,000 / mo</option>
                  <option value="15000">Up to ₹15,000 / mo</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-500 font-bold uppercase tracking-wider text-[10px] mb-1.5 flex items-center gap-1">
                  <Users className="w-3 h-3 text-indigo-600" />
                  Sharing Type
                </label>
                <select
                  value={searchSharing}
                  onChange={(e) => setSearchSharing(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option value="double">Double Sharing</option>
                  <option value="single">Single Room</option>
                  <option value="triple">Triple Sharing</option>
                  <option value="any">Any Available</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs shadow-md shadow-indigo-600/25 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Find Accommodation</span>
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* TRUST SECTION: 3 CORE DIFFERENTIATORS */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Why Traditional Portals Fail
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Intelligent Matching Instead of Infinite Scrolling
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Generic property websites show hundreds of disconnected listings. RoomSync calculates transparent fit across 12 human and financial criteria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-7 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">
                1. Smart Compatibility Matching
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Rule-based explainable algorithm weights rent budget (30%), campus proximity (25%), sharing config (15%), amenities (15%), and quiet study routines (10%).
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">
                2. 7-Factor Roommate Harmony
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Avoid roommate friction before moving in. Evaluate sleep schedule synchrony, cleanliness standards, dietary choices, and noise tolerance.
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">
                3. Zero Brokerage Direct Connection
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Directly communicate with verified PG owners. Schedule in-person property walkthroughs without broker commissions or misleading deposits.
              </p>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section id="how-it-works" className="bg-slate-900 text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                Seamless Allocation Journey
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                How RoomSync Works in 4 Steps
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                From preference calibration to confirmed student accommodation in days, not months.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: '01',
                  title: 'Create Your Profile',
                  desc: 'Input your college, degree, daily budget range, and commute radius.',
                },
                {
                  step: '02',
                  title: 'Calibrate Preferences',
                  desc: 'Choose must-have facilities, dietary routine, and sleep schedule standards.',
                },
                {
                  step: '03',
                  title: 'Review Scored Matches',
                  desc: 'Inspect explainable compatibility scores and side-by-side room comparisons.',
                },
                {
                  step: '04',
                  title: 'Direct Host Enquiry',
                  desc: 'Send free booking enquiries, schedule walkthroughs, and confirm your bed.',
                },
              ].map((s) => (
                <div
                  key={s.step}
                  className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700/60 space-y-3 relative group hover:border-teal-500 transition-colors"
                >
                  <span className="text-3xl font-black text-teal-400/80 block">
                    {s.step}
                  </span>
                  <h3 className="text-base font-extrabold text-white">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center pt-4">
              <Link
                href="/onboarding"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/25 transition-all"
              >
                <span>Start Interactive Onboarding</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* FEATURED ACCOMMODATION CARDS SHOWCASE */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Live Demonstration Listings
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                Verified Student Accommodations
              </h2>
              <p className="text-xs text-slate-500">
                Pre-calibrated for Panjab University (PU) and PEC Chandigarh students
              </p>
            </div>
            <Link
              href="/tenant/rooms"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 self-start sm:self-auto"
            >
              <span>Explore All {properties.length} Properties</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRooms.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                tenant={tenantProfile}
              />
            ))}
          </div>
        </section>

        {/* FOR PG OWNERS VALUE PROP */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-navy-950 rounded-3xl p-8 sm:p-12 text-white border border-indigo-900/50 shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-xl space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                For PG Owners & Commercial Hosts
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Smarter Tenant Matching. Better Occupancy.
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Eliminate high vacancy rates between college semesters. RoomSync matches your vacant beds with verified university students whose budgets and house rule tolerances fit your property.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0" />
                  <span>Real-time bed vacancy toggle</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0" />
                  <span>Recharts occupancy analytics</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0" />
                  <span>Direct visit scheduling</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0" />
                  <span>Fewer roommate conflicts</span>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 flex flex-col gap-3">
              <Link
                href="/owner/dashboard"
                className="px-6 py-3.5 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-xl shadow-teal-500/20 text-center transition-all"
              >
                Launch PG Owner Portal
              </Link>
              <Link
                href="/owner/rooms/add"
                className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 text-center transition-all"
              >
                Add Sample Property Listing
              </Link>
            </div>
          </div>
        </section>

        {/* ACADEMIC DESIGN THINKING BANNER */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-indigo-700 font-extrabold text-xs uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>IIT Madras DTD-DAD Academic Project</span>
              </div>
              <h3 className="text-xl font-black text-slate-900">
                Design Thinking for Data-Driven App Development
              </h3>
              <p className="text-xs text-slate-500 max-w-2xl">
                Topic: PG/Hostel Room Allocation & Matching — A Smart Accommodation and Roommate Compatibility Platform.
                Demonstrating Desirability, Viability, and Feasibility through interactive client-side simulation.
              </p>
            </div>

            <Link
              href="/admin/dashboard"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all self-start md:self-auto"
            >
              <span>Open Course Reviewer Mode</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
