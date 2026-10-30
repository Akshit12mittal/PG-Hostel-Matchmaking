'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  TenantProfile,
  Property,
  RoommateProfile,
  Enquiry,
  EnquiryStatus,
  NotificationToast,
} from '@/types';
import {
  INITIAL_TENANT_PROFILE,
  INITIAL_PROPERTIES,
  INITIAL_ROOMMATES,
  INITIAL_ENQUIRIES,
} from '@/data/mockData';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  tenantProfile: TenantProfile;
  updateTenantProfile: (updates: Partial<TenantProfile>) => void;
  properties: Property[];
  roommates: RoommateProfile[];
  enquiries: Enquiry[];
  savedPropertyIds: string[];
  comparePropertyIds: string[];
  shortlistRoommateIds: string[];
  connectedRoommateIds: string[];
  toasts: NotificationToast[];
  toggleSaveProperty: (id: string) => void;
  toggleCompareProperty: (id: string) => boolean;
  clearCompare: () => void;
  toggleShortlistRoommate: (id: string) => void;
  connectRoommate: (id: string) => void;
  addProperty: (property: Omit<Property, 'id'>) => string;
  updateProperty: (id: string, updates: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  addEnquiry: (
    enquiry: Omit<Enquiry, 'id' | 'createdAt' | 'updatedAt' | 'status'>
  ) => void;
  updateEnquiryStatus: (
    id: string,
    status: EnquiryStatus,
    visitDate?: string
  ) => void;
  cancelEnquiry: (id: string) => void;
  addToast: (
    title: string,
    message: string,
    type?: 'success' | 'info' | 'warning' | 'error'
  ) => void;
  removeToast: (id: string) => void;
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  ROLE: 'roomsync_role',
  TENANT: 'roomsync_tenant_profile',
  PROPERTIES: 'roomsync_properties',
  ROOMMATES: 'roomsync_roommates',
  ENQUIRIES: 'roomsync_enquiries',
  SAVED: 'roomsync_saved_properties',
  COMPARE: 'roomsync_compare_properties',
  SHORTLIST: 'roomsync_shortlist_roommates',
  CONNECTED: 'roomsync_connected_roommates',
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<UserRole>('tenant');
  const [tenantProfile, setTenantProfileState] = useState<TenantProfile>(INITIAL_TENANT_PROFILE);
  const [properties, setPropertiesState] = useState<Property[]>(INITIAL_PROPERTIES);
  const [roommates, setRoommatesState] = useState<RoommateProfile[]>(INITIAL_ROOMMATES);
  const [enquiries, setEnquiriesState] = useState<Enquiry[]>(INITIAL_ENQUIRIES);
  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>(['prop-1', 'prop-3']);
  const [comparePropertyIds, setComparePropertyIds] = useState<string[]>(['prop-1', 'prop-6']);
  const [shortlistRoommateIds, setShortlistRoommateIds] = useState<string[]>(['rm-1', 'rm-2']);
  const [connectedRoommateIds, setConnectedRoommateIds] = useState<string[]>(['rm-1']);
  const [toasts, setToasts] = useState<NotificationToast[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const savedRole = localStorage.getItem(STORAGE_KEYS.ROLE);
      if (savedRole) setRoleState(savedRole as UserRole);

      const savedTenant = localStorage.getItem(STORAGE_KEYS.TENANT);
      if (savedTenant) setTenantProfileState(JSON.parse(savedTenant));

      const savedProps = localStorage.getItem(STORAGE_KEYS.PROPERTIES);
      if (savedProps) setPropertiesState(JSON.parse(savedProps));

      const savedRoommates = localStorage.getItem(STORAGE_KEYS.ROOMMATES);
      if (savedRoommates) setRoommatesState(JSON.parse(savedRoommates));

      const savedEnqs = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
      if (savedEnqs) setEnquiriesState(JSON.parse(savedEnqs));

      const savedFavs = localStorage.getItem(STORAGE_KEYS.SAVED);
      if (savedFavs) setSavedPropertyIds(JSON.parse(savedFavs));

      const savedComp = localStorage.getItem(STORAGE_KEYS.COMPARE);
      if (savedComp) setComparePropertyIds(JSON.parse(savedComp));

      const savedShortlist = localStorage.getItem(STORAGE_KEYS.SHORTLIST);
      if (savedShortlist) setShortlistRoommateIds(JSON.parse(savedShortlist));

      const savedConn = localStorage.getItem(STORAGE_KEYS.CONNECTED);
      if (savedConn) setConnectedRoommateIds(JSON.parse(savedConn));
    } catch (e) {
      console.warn('LocalStorage hydration error, using initial defaults:', e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Sync to LocalStorage on updates once hydrated
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEYS.ROLE, role);
      localStorage.setItem(STORAGE_KEYS.TENANT, JSON.stringify(tenantProfile));
      localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(properties));
      localStorage.setItem(STORAGE_KEYS.ROOMMATES, JSON.stringify(roommates));
      localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiries));
      localStorage.setItem(STORAGE_KEYS.SAVED, JSON.stringify(savedPropertyIds));
      localStorage.setItem(STORAGE_KEYS.COMPARE, JSON.stringify(comparePropertyIds));
      localStorage.setItem(STORAGE_KEYS.SHORTLIST, JSON.stringify(shortlistRoommateIds));
      localStorage.setItem(STORAGE_KEYS.CONNECTED, JSON.stringify(connectedRoommateIds));
    } catch (e) {
      console.error('Failed to sync to LocalStorage', e);
    }
  }, [
    isHydrated,
    role,
    tenantProfile,
    properties,
    roommates,
    enquiries,
    savedPropertyIds,
    comparePropertyIds,
    shortlistRoommateIds,
    connectedRoommateIds,
  ]);

  const addToast = (
    title: string,
    message: string,
    type: 'success' | 'info' | 'warning' | 'error' = 'success'
  ) => {
    const id = 'toast-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6);
    const newToast: NotificationToast = {
      id,
      title,
      message,
      type,
      timestamp: new Date().toISOString(),
    };
    setToasts((prev) => [newToast, ...prev.slice(0, 4)]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    addToast('Role Switched', `Active demo mode changed to: ${newRole.toUpperCase()}`, 'info');
  };

  const updateTenantProfile = (updates: Partial<TenantProfile>) => {
    setTenantProfileState((prev) => ({ ...prev, ...updates }));
    addToast('Preferences Updated', 'Room and roommate compatibility scores have been recalculated!', 'success');
  };

  const toggleSaveProperty = (id: string) => {
    setSavedPropertyIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        addToast('Removed from Saved', 'Property removed from your shortlist.', 'info');
        return prev.filter((item) => item !== id);
      } else {
        addToast('Saved to Shortlist', 'Property added to your saved list.', 'success');
        return [...prev, id];
      }
    });
  };

  const toggleCompareProperty = (id: string): boolean => {
    let success = true;
    setComparePropertyIds((prev) => {
      if (prev.includes(id)) {
        addToast('Removed from Compare', 'Property removed from comparison table.', 'info');
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 3) {
        addToast('Comparison Limit Reached', 'You can compare at most 3 properties side-by-side.', 'warning');
        success = false;
        return prev;
      }
      addToast('Added to Compare', 'Property added to comparison table.', 'success');
      return [...prev, id];
    });
    return success;
  };

  const clearCompare = () => {
    setComparePropertyIds([]);
    addToast('Comparison Cleared', 'All properties removed from comparison.', 'info');
  };

  const toggleShortlistRoommate = (id: string) => {
    setShortlistRoommateIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        addToast('Shortlist Updated', 'Roommate removed from your shortlist.', 'info');
        return prev.filter((item) => item !== id);
      } else {
        addToast('Roommate Shortlisted', 'Roommate added to your shortlisted partners.', 'success');
        return [...prev, id];
      }
    });
  };

  const connectRoommate = (id: string) => {
    if (!connectedRoommateIds.includes(id)) {
      setConnectedRoommateIds((prev) => [...prev, id]);
      addToast('Connection Request Sent', 'Simulated connection request transmitted to roommate!', 'success');
    } else {
      addToast('Already Connected', 'You have already sent a connection request to this profile.', 'info');
    }
  };

  const addProperty = (newPropData: Omit<Property, 'id'>): string => {
    const id = 'prop-' + Date.now();
    const newProperty: Property = {
      id,
      ...newPropData,
    };
    setPropertiesState((prev) => [newProperty, ...prev]);
    addToast('Property Published', `${newProperty.name} is now live and matching prospective tenants!`, 'success');
    return id;
  };

  const updateProperty = (id: string, updates: Partial<Property>) => {
    setPropertiesState((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    addToast('Property Updated', 'Changes saved and live in tenant discovery.', 'success');
  };

  const deleteProperty = (id: string) => {
    setPropertiesState((prev) => prev.filter((p) => p.id !== id));
    addToast('Property Removed', 'The property was deleted from the platform.', 'warning');
  };

  const addEnquiry = (
    data: Omit<Enquiry, 'id' | 'createdAt' | 'updatedAt' | 'status'>
  ) => {
    const id = 'enq-' + Date.now();
    const now = new Date().toISOString();
    const newEnquiry: Enquiry = {
      id,
      ...data,
      status: 'pending',
      createdAt: now,
      updatedAt: now,
    };
    setEnquiriesState((prev) => [newEnquiry, ...prev]);
    addToast('Enquiry Sent', `Your enquiry for ${data.propertyName} has been delivered to ${data.ownerName}.`, 'success');
  };

  const updateEnquiryStatus = (
    id: string,
    status: EnquiryStatus,
    visitDate?: string
  ) => {
    const now = new Date().toISOString();
    setEnquiriesState((prev) =>
      prev.map((e) =>
        e.id === id
          ? {
              ...e,
              status,
              visitDate: visitDate || e.visitDate,
              updatedAt: now,
            }
          : e
      )
    );

    const statusLabels: Record<EnquiryStatus, string> = {
      pending: 'marked as Pending',
      accepted: 'Accepted! Tenant will receive confirmation.',
      rejected: 'Declined.',
      'visit-scheduled': `Physical Visit Scheduled for ${visitDate || 'upcoming slot'}`,
      completed: 'Marked as Completed & Bed Allocated!',
    };

    addToast('Enquiry Status Updated', statusLabels[status], 'success');
  };

  const cancelEnquiry = (id: string) => {
    setEnquiriesState((prev) => prev.filter((e) => e.id !== id));
    addToast('Enquiry Cancelled', 'Your enquiry has been retracted.', 'info');
  };

  const resetDemoData = () => {
    localStorage.clear();
    setRoleState('tenant');
    setTenantProfileState(INITIAL_TENANT_PROFILE);
    setPropertiesState(INITIAL_PROPERTIES);
    setRoommatesState(INITIAL_ROOMMATES);
    setEnquiriesState(INITIAL_ENQUIRIES);
    setSavedPropertyIds(['prop-1', 'prop-3']);
    setComparePropertyIds(['prop-1', 'prop-6']);
    setShortlistRoommateIds(['rm-1', 'rm-2']);
    setConnectedRoommateIds(['rm-1']);
    addToast('Demo State Reset', 'All records restored to original IITM DTD-DAD demonstration sample state.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        tenantProfile,
        updateTenantProfile,
        properties,
        roommates,
        enquiries,
        savedPropertyIds,
        comparePropertyIds,
        shortlistRoommateIds,
        connectedRoommateIds,
        toasts,
        toggleSaveProperty,
        toggleCompareProperty,
        clearCompare,
        toggleShortlistRoommate,
        connectRoommate,
        addProperty,
        updateProperty,
        deleteProperty,
        addEnquiry,
        updateEnquiryStatus,
        cancelEnquiry,
        addToast,
        removeToast,
        resetDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
