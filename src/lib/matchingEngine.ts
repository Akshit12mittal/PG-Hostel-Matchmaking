import { Property, TenantProfile, RoommateProfile, RoomScoreBreakdown, RoommateScoreBreakdown } from '@/types';

/**
 * Calculates transparent, explainable Room Compatibility Score (0 - 100)
 * Weighted criteria:
 * 1. Budget: 30%
 * 2. Location: 25%
 * 3. Room Type: 15%
 * 4. Amenities: 15%
 * 5. Lifestyle: 10%
 * 6. Availability: 5%
 */
export function calculateRoomMatch(property: Property, tenant: TenantProfile): RoomScoreBreakdown {
  const pros: string[] = [];
  const concerns: string[] = [];

  // 1. BUDGET COMPATIBILITY (30 points)
  let budgetScore = 0;
  const rent = property.monthlyRent;
  const maxB = tenant.budgetMax || 10000;
  const minB = tenant.budgetMin || 4000;

  if (rent >= minB && rent <= maxB) {
    budgetScore = 30;
    pros.push(`Fits perfectly within your monthly budget of ₹${rent.toLocaleString('en-IN')}`);
  } else if (rent < minB) {
    budgetScore = 28;
    pros.push(`Super economical! ₹${(minB - rent).toLocaleString('en-IN')} below your minimum budget`);
  } else if (rent <= maxB * 1.1) {
    budgetScore = 22;
    concerns.push(`Slightly above preferred budget (by ₹${(rent - maxB).toLocaleString('en-IN')}/mo)`);
  } else if (rent <= maxB * 1.25) {
    budgetScore = 14;
    concerns.push(`Exceeds your budget cap by ₹${(rent - maxB).toLocaleString('en-IN')}`);
  } else {
    budgetScore = 5;
    concerns.push(`Significantly higher than your ₹${maxB.toLocaleString('en-IN')} budget target`);
  }

  // 2. LOCATION & DISTANCE COMPATIBILITY (25 points)
  let locationScore = 0;
  // Look for match with tenant's college/workplace or first landmark
  const matchedLandmark = property.distanceLandmarks.find(
    (l) => l.landmark.toLowerCase().includes(tenant.collegeOrWorkplace.toLowerCase()) ||
           tenant.collegeOrWorkplace.toLowerCase().includes(l.landmark.toLowerCase())
  ) || property.distanceLandmarks[0] || { landmark: 'College Hub', distanceKm: 2.5 };

  const distance = matchedLandmark.distanceKm;
  const maxDist = tenant.maxDistanceKm || 5;

  if (distance <= 1.2) {
    locationScore = 25;
    pros.push(`Just ${distance} km from ${matchedLandmark.landmark} (walkable distance)`);
  } else if (distance <= maxDist) {
    const fraction = (maxDist - distance) / maxDist;
    locationScore = Math.round(18 + fraction * 6);
    pros.push(`${distance} km from ${matchedLandmark.landmark} (within your ${maxDist} km preference)`);
  } else if (distance <= maxDist * 1.5) {
    locationScore = 12;
    concerns.push(`${distance} km away — slightly farther than your ${maxDist} km radius`);
  } else {
    locationScore = 6;
    concerns.push(`${distance} km from ${matchedLandmark.landmark} (transit required)`);
  }

  // Also check locality match
  if (tenant.preferredLocation && property.locality.toLowerCase().includes(tenant.preferredLocation.toLowerCase())) {
    locationScore = Math.min(25, locationScore + 2);
    pros.push(`Situated directly in your preferred area: ${property.locality}`);
  }

  // 3. ROOM TYPE COMPATIBILITY (15 points)
  let roomTypeScore = 0;
  if (tenant.sharingPreference === 'any') {
    roomTypeScore = 15;
    pros.push(`Offers ${property.roomTypes.map(r => `${r} sharing`).join(', ')} options`);
  } else if (property.roomTypes.includes(tenant.sharingPreference)) {
    roomTypeScore = 15;
    pros.push(`Exact ${tenant.sharingPreference} sharing accommodation available`);
  } else {
    roomTypeScore = 7;
    concerns.push(`Preferred ${tenant.sharingPreference} sharing currently full; offers ${property.roomTypes.join('/')}`);
  }

  // 4. AMENITIES COMPATIBILITY (15 points)
  let amenitiesScore = 0;
  const essential = tenant.essentialAmenities || [];
  if (essential.length === 0) {
    amenitiesScore = 15;
  } else {
    const matchedAmenities = essential.filter((a) =>
      property.amenities.some((pa) => pa.toLowerCase() === a.toLowerCase())
    );
    const ratio = matchedAmenities.length / essential.length;
    amenitiesScore = Math.round(ratio * 15);

    if (matchedAmenities.length === essential.length) {
      pros.push(`100% of your requested amenities fulfilled (${matchedAmenities.length}/${essential.length})`);
    } else {
      const missing = essential.filter((a) => !matchedAmenities.includes(a));
      if (missing.length > 0) {
        concerns.push(`Missing: ${missing.slice(0, 2).join(', ')}`);
      }
    }
  }

  // 5. LIFESTYLE & ENVIRONMENT COMPATIBILITY (10 points)
  let lifestyleScore = 0;
  // Food policy match (4 pts)
  if (tenant.foodPreference === 'vegetarian') {
    if (property.foodOptions === 'vegetarian') {
      lifestyleScore += 4;
      pros.push('Strictly vegetarian environment aligns with your diet');
    } else if (property.foodOptions === 'both-allowed') {
      lifestyleScore += 3;
    } else {
      lifestyleScore += 1;
      concerns.push('Non-vegetarian prep allowed in shared kitchen');
    }
  } else {
    lifestyleScore += 4;
  }

  // Noise / study environment match (3 pts)
  if (tenant.noiseTolerance === 'quiet') {
    if (property.quietHours) {
      lifestyleScore += 3;
      pros.push(`Dedicated quiet hours enforced (${property.quietHours})`);
    } else {
      lifestyleScore += 2;
    }
  } else {
    lifestyleScore += 3;
  }

  // Gender safety match (3 pts)
  if (tenant.gender === 'female' && property.genderType === 'girls') {
    lifestyleScore += 3;
    pros.push('Dedicated girls-only accommodation with 24/7 security & biometric entry');
  } else if (tenant.gender === 'male' && property.genderType === 'boys') {
    lifestyleScore += 3;
  } else if (property.genderType === 'co-ed') {
    lifestyleScore += 3;
  } else {
    lifestyleScore += 1;
  }

  // 6. AVAILABILITY & TIMING (5 points)
  let availabilityScore = 0;
  if (property.availableBeds > 0) {
    availabilityScore += 3;
    pros.push(`${property.availableBeds} beds currently vacant and ready for immediate booking`);
  } else {
    concerns.push('Currently on waitlist / high demand');
  }

  // Check move-in date
  if (tenant.preferredMoveInDate && property.availableFrom) {
    if (new Date(property.availableFrom) <= new Date(tenant.preferredMoveInDate)) {
      availabilityScore += 2;
      pros.push(`Available right on your target move-in date`);
    } else {
      availabilityScore += 1;
      concerns.push(`Available from ${property.availableFrom}, slightly later than preferred`);
    }
  } else {
    availabilityScore += 2;
  }

  const totalScore = Math.min(100, budgetScore + locationScore + roomTypeScore + amenitiesScore + lifestyleScore + availabilityScore);

  return {
    budgetScore,
    locationScore,
    roomTypeScore,
    amenitiesScore,
    lifestyleScore,
    availabilityScore,
    totalScore,
    pros: pros.slice(0, 4),
    concerns: concerns.slice(0, 3),
  };
}

/**
 * Calculates Roommate Compatibility Score (0 - 100)
 * Weighted criteria:
 * 1. Sleep Schedule: 20%
 * 2. Cleanliness: 20%
 * 3. Food Preference: 15%
 * 4. Noise Tolerance: 15%
 * 5. Social Lifestyle: 15%
 * 6. Budget Compatibility: 10%
 * 7. Smoking: 5%
 */
export function calculateRoommateMatch(
  roommate: RoommateProfile,
  tenant: TenantProfile
): RoommateScoreBreakdown {
  const pros: string[] = [];
  const concerns: string[] = [];

  // 1. SLEEP SCHEDULE (20 pts)
  let sleepScore = 0;
  if (roommate.sleepSchedule === tenant.sleepSchedule) {
    sleepScore = 20;
    pros.push(`Both are ${tenant.sleepSchedule.replace('-', ' ')}s — synchronized sleep routines`);
  } else if (roommate.sleepSchedule === 'flexible' || tenant.sleepSchedule === 'flexible') {
    sleepScore = 15;
    pros.push('Flexible sleep routine prevents mutual disturbance');
  } else {
    sleepScore = 6;
    concerns.push(`Opposite sleep schedules (${tenant.sleepSchedule} vs ${roommate.sleepSchedule})`);
  }

  // 2. CLEANLINESS (20 pts)
  let cleanlinessScore = 0;
  if (roommate.cleanliness === tenant.cleanliness) {
    cleanlinessScore = 20;
    pros.push(`Matching standards of room tidiness (${tenant.cleanliness.replace('-', ' ')})`);
  } else if (
    (roommate.cleanliness === 'moderately-particular' && tenant.cleanliness === 'very-particular') ||
    (tenant.cleanliness === 'moderately-particular' && roommate.cleanliness === 'very-particular')
  ) {
    cleanlinessScore = 15;
    pros.push('Close standards on cleanliness and shared room hygiene');
  } else {
    cleanlinessScore = 8;
    concerns.push('Slightly different expectations on keeping shared spaces clean');
  }

  // 3. FOOD PREFERENCE (15 pts)
  let foodScore = 0;
  if (roommate.foodPreference === tenant.foodPreference) {
    foodScore = 15;
    pros.push(`Shared dietary lifestyle: both prefer ${tenant.foodPreference}`);
  } else if (
    tenant.foodPreference === 'no-preference' ||
    roommate.foodPreference === 'no-preference'
  ) {
    foodScore = 13;
    pros.push('No dietary conflicts or kitchen restrictions');
  } else {
    foodScore = 7;
    concerns.push(`Dietary preference differences (${tenant.foodPreference} vs ${roommate.foodPreference})`);
  }

  // 4. NOISE TOLERANCE (15 pts)
  let noiseScore = 0;
  if (roommate.noiseTolerance === tenant.noiseTolerance) {
    noiseScore = 15;
    pros.push(`Identical sound environment preference (${tenant.noiseTolerance})`);
  } else if (
    (roommate.noiseTolerance === 'moderate' && tenant.noiseTolerance === 'quiet') ||
    (tenant.noiseTolerance === 'moderate' && roommate.noiseTolerance === 'quiet')
  ) {
    noiseScore = 12;
    pros.push('Compatible study room sound levels');
  } else {
    noiseScore = 5;
    concerns.push('Difference in study focus & music/audio volume tolerance');
  }

  // 5. SOCIAL HABIT (15 pts)
  let socialScore = 0;
  if (roommate.socialHabit === tenant.socialHabit) {
    socialScore = 15;
    pros.push(`Compatible social energy: both identify as ${tenant.socialHabit}`);
  } else if (roommate.socialHabit === 'balanced' || tenant.socialHabit === 'balanced') {
    socialScore = 12;
    pros.push('Balanced personal space and friendly co-living');
  } else {
    socialScore = 7;
    concerns.push(`Social interaction style difference (${tenant.socialHabit} vs ${roommate.socialHabit})`);
  }

  // 6. BUDGET SIMILARITY (10 pts)
  let budgetScore = 0;
  const tenantMid = (tenant.budgetMin + tenant.budgetMax) / 2;
  const diff = Math.abs(roommate.budgetMonthly - tenantMid);
  if (diff <= 1500) {
    budgetScore = 10;
    pros.push('Similar rent and shared expense capacity');
  } else if (diff <= 3500) {
    budgetScore = 7;
  } else {
    budgetScore = 4;
    concerns.push(`Budget difference of ₹${diff.toLocaleString('en-IN')}`);
  }

  // 7. SMOKING PREFERENCE (5 pts)
  let smokingScore = 0;
  if (roommate.smokingPreference === tenant.smokingPreference) {
    smokingScore = 5;
    if (tenant.smokingPreference === 'non-smoking') {
      pros.push('Both maintain a strict non-smoking environment');
    }
  } else {
    smokingScore = 2;
    concerns.push('Different smoking preference');
  }

  const totalScore = Math.min(100, sleepScore + cleanlinessScore + foodScore + noiseScore + socialScore + budgetScore + smokingScore);

  return {
    sleepScore,
    cleanlinessScore,
    foodScore,
    noiseScore,
    socialScore,
    budgetScore,
    smokingScore,
    totalScore,
    pros: pros.slice(0, 4),
    concerns: concerns.slice(0, 3),
  };
}
