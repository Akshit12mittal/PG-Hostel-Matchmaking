import React from 'react';
import Link from 'next/link';
import { Home, Sparkles, Shield, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & Purpose */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                Room<span className="text-indigo-400">Sync</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Find the Right Room. Meet the Right Roommate. Live Better.
              An intelligent accommodation decision-support platform designed to eliminate the friction of student housing through transparent, multi-parameter compatibility matching.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Developed for IIT Madras DTD-DAD (Design Thinking for Data-Driven App Development)</span>
            </div>
          </div>

          {/* Platform Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Explore Platform
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/tenant/rooms" className="text-slate-400 hover:text-white transition-colors">
                  PG & Hostel Discovery
                </Link>
              </li>
              <li>
                <Link href="/tenant/roommates" className="text-slate-400 hover:text-white transition-colors">
                  Roommate Compatibility Engine
                </Link>
              </li>
              <li>
                <Link href="/tenant/compare" className="text-slate-400 hover:text-white transition-colors">
                  Side-by-Side Room Comparison
                </Link>
              </li>
              <li>
                <Link href="/onboarding" className="text-slate-400 hover:text-white transition-colors">
                  Interactive Matching Quiz
                </Link>
              </li>
              <li>
                <Link href="/owner/dashboard" className="text-slate-400 hover:text-white transition-colors">
                  PG Owner Occupancy Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Academic Design Thinking */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Design Thinking Pillars
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="border-l-2 border-indigo-500 pl-2.5 py-0.5">
                <p className="font-semibold text-slate-200">Human Desirability</p>
                <p className="text-slate-400">Eliminating tenant anxiety & roommate lifestyle clashes.</p>
              </div>
              <div className="border-l-2 border-teal-500 pl-2.5 py-0.5">
                <p className="font-semibold text-slate-200">Business Viability</p>
                <p className="text-slate-400">Predictable PG occupancy and high-intent tenant leads.</p>
              </div>
              <div className="border-l-2 border-emerald-500 pl-2.5 py-0.5">
                <p className="font-semibold text-slate-200">Technical Feasibility</p>
                <p className="text-slate-400">Explainable weighted multi-criteria recommendation engine.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-12 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> by Akshit Mittal for IIT Madras Course Project.
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              Verified Demo Prototype
            </span>
            <span>Academic Demonstration License</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
