'use client';

import React, { useState, Suspense } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { X } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <aside aria-label="Admin navigation sidebar" className="hidden md:block flex-shrink-0 sticky top-[37px] h-[calc(100vh-37px)]">
          <Suspense fallback={<div className="w-64 bg-slate-900 h-full" />}>
            <AdminSidebar />
          </Suspense>
        </aside>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-slate-900 z-10 shadow-2xl">
              <div className="absolute top-3 right-3">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-full text-slate-400 hover:text-white bg-slate-800"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <Suspense fallback={null}>
                <AdminSidebar onCloseMobile={() => setMobileMenuOpen(false)} />
              </Suspense>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-slate-900/40">
          <AdminHeader onOpenMobileMenu={() => setMobileMenuOpen(true)} />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
