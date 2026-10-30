'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { formatINR } from '@/lib/utils';
import {
  Users,
  Search,
  Filter,
  CheckCircle2,
  Mail,
  GraduationCap,
  Building,
} from 'lucide-react';

export default function AdminUsersPage() {
  const { roommates, tenantProfile } = useApp();
  const [filterRole, setFilterRole] = useState<'all' | 'tenant' | 'owner'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const allUsers = [
    {
      id: tenantProfile.id,
      name: tenantProfile.name,
      role: 'Tenant (Active Profile)',
      email: tenantProfile.email,
      phone: tenantProfile.phone,
      institution: tenantProfile.collegeOrWorkplace,
      photoUrl: tenantProfile.photoUrl,
      status: 'Active',
      budget: `${formatINR(tenantProfile.budgetMin)} - ${formatINR(tenantProfile.budgetMax)}`,
    },
    ...roommates.map((rm) => ({
      id: rm.id,
      name: rm.name,
      role: 'Tenant / Roommate',
      email: `${rm.name.toLowerCase().replace(' ', '.')}@example.com`,
      phone: '+91 98XXX XXXXX',
      institution: rm.collegeOrWorkplace,
      photoUrl: rm.photoUrl,
      status: 'Active',
      budget: formatINR(rm.budgetMonthly),
    })),
    {
      id: 'owner-rajesh',
      name: 'Rajesh Sharma',
      role: 'PG Owner / Host',
      email: 'rajesh.pg@chandigarh.com',
      phone: '+91 98140 11223',
      institution: 'Manages 4 PGs in Sector 15/22',
      photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      status: 'Verified Host',
      budget: 'N/A (Host)',
    },
    {
      id: 'owner-manpreet',
      name: 'Manpreet Singh',
      role: 'PG Owner / Host',
      email: 'scholars.haven@gmail.com',
      phone: '+91 98722 33445',
      institution: "Owner, Scholar's Haven (Sector 11)",
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      status: 'Verified Host',
      budget: 'N/A (Host)',
    },
    {
      id: 'owner-sunita',
      name: 'Sunita Mehra',
      role: 'PG Owner / Host',
      email: 'harmony.girls@gmail.com',
      phone: '+91 94170 55667',
      institution: 'Owner, Harmony Girls PG (Sector 35)',
      photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      status: 'Verified Host',
      budget: 'N/A (Host)',
    },
  ];

  const filtered = allUsers.filter((u) => {
    if (filterRole === 'tenant' && !u.role.includes('Tenant')) return false;
    if (filterRole === 'owner' && !u.role.includes('Owner')) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        u.name.toLowerCase().includes(q) ||
        u.institution.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
            User Administration
          </span>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Registered Platform Users ({allUsers.length})
          </h2>
          <p className="text-xs text-slate-400">
            Student tenants and verified PG property hosts enrolled in the RoomSync platform.
          </p>
        </div>

        {/* Filter and Search */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name or college..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-1.5 rounded-xl border border-slate-700 bg-slate-900 text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value as any)}
            className="p-2 rounded-xl border border-slate-700 bg-slate-900 text-xs text-slate-300"
          >
            <option value="all">All Roles</option>
            <option value="tenant">Tenants Only</option>
            <option value="owner">PG Owners Only</option>
          </select>
        </div>
      </div>

      <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-md overflow-hidden overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <th className="p-4">User</th>
              <th className="p-4">Role</th>
              <th className="p-4">Institution / Entity</th>
              <th className="p-4">Contact</th>
              <th className="p-4">Budget / Tariff</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            {filtered.map((user) => (
              <tr key={user.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-800 flex-shrink-0">
                      <Image
                        src={user.photoUrl}
                        alt={user.name}
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    </div>
                    <strong className="text-white font-bold">{user.name}</strong>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                    user.role.includes('Owner')
                      ? 'bg-teal-500/20 text-teal-300'
                      : 'bg-indigo-500/20 text-indigo-300'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-4 font-medium text-slate-300">{user.institution}</td>
                <td className="p-4 text-slate-400">{user.phone}</td>
                <td className="p-4 font-semibold text-slate-200">{user.budget}</td>
                <td className="p-4">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
