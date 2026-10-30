import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function getScoreBadgeColor(score: number): {
  bg: string;
  text: string;
  border: string;
  fill: string;
  label: string;
} {
  if (score >= 90) {
    return {
      bg: 'bg-emerald-50 text-emerald-700',
      text: 'text-emerald-700',
      border: 'border-emerald-200',
      fill: '#10B981',
      label: 'Exceptional Match',
    };
  }
  if (score >= 80) {
    return {
      bg: 'bg-teal-50 text-teal-700',
      text: 'text-teal-700',
      border: 'border-teal-200',
      fill: '#0D9488',
      label: 'Strong Match',
    };
  }
  if (score >= 70) {
    return {
      bg: 'bg-blue-50 text-blue-700',
      text: 'text-blue-700',
      border: 'border-blue-200',
      fill: '#3B82F6',
      label: 'Good Match',
    };
  }
  if (score >= 60) {
    return {
      bg: 'bg-amber-50 text-amber-700',
      text: 'text-amber-700',
      border: 'border-amber-200',
      fill: '#F59E0B',
      label: 'Moderate Match',
    };
  }
  return {
    bg: 'bg-slate-100 text-slate-700',
    text: 'text-slate-600',
    border: 'border-slate-200',
    fill: '#64748B',
    label: 'Low Match',
  };
}
