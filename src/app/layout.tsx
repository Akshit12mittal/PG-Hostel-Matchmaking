import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Suspense } from 'react';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import DemoRoleBar from '@/components/common/DemoRoleBar';
import ToastContainer from '@/components/common/ToastContainer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'RoomSync — Smart PG & Hostel Room Allocation and Roommate Matching',
  description:
    'Design Thinking for Data-Driven App Development (DTD-DAD) academic project prototype at IIT Madras. Intelligent accommodation and roommate compatibility platform.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F8FAFC] text-slate-900 font-sans">
        <AppProvider>
          <Suspense fallback={<div className="h-9 bg-slate-900" />}>
            <DemoRoleBar />
          </Suspense>
          <div className="flex-1 flex flex-col">{children}</div>
          <ToastContainer />
        </AppProvider>
      </body>
    </html>
  );
}
