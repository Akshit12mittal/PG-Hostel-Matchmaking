'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let borderClass = 'border-emerald-200 bg-emerald-50/95 text-emerald-900';
        let iconColor = 'text-emerald-600';

        if (toast.type === 'error') {
          Icon = XCircle;
          borderClass = 'border-rose-200 bg-rose-50/95 text-rose-900';
          iconColor = 'text-rose-600';
        } else if (toast.type === 'warning') {
          Icon = AlertCircle;
          borderClass = 'border-amber-200 bg-amber-50/95 text-amber-900';
          iconColor = 'text-amber-600';
        } else if (toast.type === 'info') {
          Icon = Info;
          borderClass = 'border-indigo-200 bg-indigo-50/95 text-indigo-900';
          iconColor = 'text-indigo-600';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-lg backdrop-blur transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 ${borderClass}`}
          >
            <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconColor}`} />
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold leading-tight tracking-wide uppercase opacity-90">
                {toast.title}
              </h4>
              <p className="text-xs mt-0.5 leading-relaxed font-normal opacity-95">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-700 transition-colors -mr-1 -mt-1 p-1 rounded-md"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
