export type UserRole = 'tenant' | 'owner' | 'admin';

export type GenderType = 'boys' | 'girls' | 'co-ed';
export type SharingType = 'single' | 'double' | 'triple' | 'four' | 'any';
export type FoodPreference = 'vegetarian' | 'non-vegetarian' | 'vegan' | 'no-preference';
export type SleepSchedule = 'early-sleeper' | 'night-owl' | 'flexible';
export type CleanlinessLevel = 'very-particular' | 'moderately-particular' | 'flexible';
export type NoiseTolerance = 'quiet' | 'moderate' | 'social';
export type SmokingPreference = 'non-smoking' | 'no-preference';
export type SocialHabit = 'introverted' | 'balanced' | 'extroverted';

export interface TenantProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  occupation: 'student' | 'working-professional' | 'intern';
  collegeOrWorkplace: string;
  city: string;
  photoUrl: string;
  bio: string;
  
  // Budget & Location criteria
  budgetMin: number;
  budgetMax: number;
  preferredLocation: string; // e.g. "Sector 15, Chandigarh"
  maxDistanceKm: number;
  preferredMoveInDate: string; // YYYY-MM-DD
  stayDurationMonths: number;

  // Accommodation Preferences
  sharingPreference: SharingType;
  essentialAmenities: string[];

  // Lifestyle Preferences
  foodPreference: FoodPreference;
  sleepSchedule: SleepSchedule;
  cleanliness: CleanlinessLevel;
  noiseTolerance: NoiseTolerance;
  smokingPreference: SmokingPreference;
  socialHabit: SocialHabit;
}

export interface LandmarkDistance {
  landmark: string;
  distanceKm: number;
}

export interface Property {
  id: string;
  name: string;
  tagline: string;
  address: string;
  locality: string; // e.g. "Sector 15", "Sector 22", "Mohali Phase 7"
  city: string;
  genderType: GenderType;
  monthlyRent: number;
  securityDeposit: number;
  roomTypes: SharingType[];
  totalBeds: number;
  availableBeds: number;
  amenities: string[];
  foodOptions: 'vegetarian' | 'non-vegetarian' | 'both-allowed' | 'self-cooking';
  mealsIncluded: boolean;
  houseRules: string[];
  distanceLandmarks: LandmarkDistance[];
  images: string[];
  ownerId: string;
  ownerName: string;
  ownerPhone: string;
  ownerRating: number;
  verified: boolean;
  featured?: boolean;
  description: string;
  availableFrom: string; // YYYY-MM-DD
  quietHours: string;
  currentOccupantIds?: string[];
}

export interface RoommateProfile {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  occupation: string;
  collegeOrWorkplace: string;
  location: string;
  budgetMonthly: number;
  photoUrl: string;
  bio: string;
  foodPreference: FoodPreference;
  sleepSchedule: SleepSchedule;
  cleanliness: CleanlinessLevel;
  noiseTolerance: NoiseTolerance;
  smokingPreference: SmokingPreference;
  socialHabit: SocialHabit;
  sharingPreference: SharingType;
  currentPropertyId?: string;
  currentPropertyName?: string;
}

export type EnquiryStatus = 'pending' | 'accepted' | 'rejected' | 'visit-scheduled' | 'completed';

export interface Enquiry {
  id: string;
  propertyId: string;
  propertyName: string;
  propertyImage: string;
  propertyLocality: string;
  monthlyRent: number;
  tenantId: string;
  tenantName: string;
  tenantEmail: string;
  tenantPhone: string;
  tenantCollege: string;
  ownerId: string;
  ownerName: string;
  status: EnquiryStatus;
  message: string;
  preferredMoveInDate: string;
  visitDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RoomScoreBreakdown {
  budgetScore: number;      // max 30
  locationScore: number;    // max 25
  roomTypeScore: number;    // max 15
  amenitiesScore: number;   // max 15
  lifestyleScore: number;   // max 10
  availabilityScore: number;// max 5
  totalScore: number;       // max 100
  pros: string[];
  concerns: string[];
}

export interface RoommateScoreBreakdown {
  sleepScore: number;       // max 20
  cleanlinessScore: number; // max 20
  foodScore: number;        // max 15
  noiseScore: number;       // max 15
  socialScore: number;      // max 15
  budgetScore: number;      // max 10
  smokingScore: number;     // max 5
  totalScore: number;       // max 100
  pros: string[];
  concerns: string[];
}

export interface NotificationToast {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  timestamp: string;
}
