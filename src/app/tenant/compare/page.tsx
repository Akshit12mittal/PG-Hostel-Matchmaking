'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { calculateRoomMatch } from '@/lib/matchingEngine';
import { formatINR, getScoreBadgeColor } from '@/lib/utils';
import {
  Scale,
  Sparkles,
  X,
  Plus,
  Check,
  Building,
  MapPin,
  ExternalLink,
} from 'lucide-react';

export default function RoomComparisonPage() {
  const {
    properties,
    comparePropertyIds,
    toggleCompareProperty,
    clearCompare,
    tenantProfile,
  } = useApp();

  const comparedProperties = properties.filter((p) =>
    comparePropertyIds.includes(p.id)
  );

  const scoredProperties = comparedProperties.map((p) => ({
    property: p,
    match: calculateRoomMatch(p, tenantProfile),
    nearestDistance: (
      p.distanceLandmarks.find(
        (l) =>
          tenantProfile.collegeOrWorkplace &&
          l.landmark.toLowerCase().includes(tenantProfile.collegeOrWorkplace.toLowerCase())
      ) || p.distanceLandmarks[0] || { distanceKm: 2.0 }
    ).distanceKm,
  }));

  // Find best match overall
  const bestMatch = scoredProperties.reduce(
    (max, cur) => (cur.match.totalScore > (max?.match.totalScore || 0) ? cur : max),
    scoredProperties[0]
  );

  // Find lowest rent
  const lowestRent = Math.min(...scoredProperties.map((s) => s.property.monthlyRent), Infinity);

  // Find closest distance
  const closestDistance = Math.min(...scoredProperties.map((s) => s.nearestDistance), Infinity);

  return (
    <div className="space-y-6 pb-16">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
              Side-by-Side Analysis
            </span>
            <span className="text-xs text-slate-400 font-semibold">
              Comparing {comparedProperties.length}/3 properties
            </span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Accommodation Comparison Matrix
          </h2>
          <p className="text-xs text-slate-500">
            Evaluating trade-offs between rental costs, campus proximity, amenities, and lifestyle rules
          </p>
        </div>

        {comparedProperties.length > 0 && (
          <button
            onClick={clearCompare}
            className="self-start sm:self-auto text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-3 py-2 rounded-xl transition-colors border border-rose-200"
          >
            Clear All
          </button>
        )}
      </div>

      {comparedProperties.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 shadow-sm">
          <div className="w-14 h-14 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
            <Scale className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            No properties selected for comparison
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Browse our verified PG accommodations and click the <strong>Add to Compare</strong> icon to evaluate up to 3 rooms side-by-side.
          </p>
          <Link
            href="/tenant/rooms"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md"
          >
            <Building className="w-4 h-4" />
            <span>Browse Accommodations</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Best Match Highlight Banner */}
          {bestMatch && (
            <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-navy-900 rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  Your Best Overall Match
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {bestMatch.property.name} ({bestMatch.match.totalScore}% Compatibility)
                </h3>
                <p className="text-xs text-slate-300 mt-1 max-w-xl">
                  Offers superior alignment with your ₹{tenantProfile.budgetMax.toLocaleString('en-IN')} budget cap and lies just {bestMatch.nearestDistance} km from {tenantProfile.collegeOrWorkplace}.
                </p>
              </div>
              <Link
                href={`/tenant/rooms/${bestMatch.property.id}`}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-900 text-xs font-bold shadow-md transition-all self-start md:self-auto"
              >
                <span>View Property Details</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

          {/* Comparison Table */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80">
                  <th className="p-4 sm:p-5 w-44 font-bold uppercase tracking-wider text-slate-500 text-[11px]">
                    Comparison Feature
                  </th>
                  {scoredProperties.map(({ property, match }) => {
                    const badge = getScoreBadgeColor(match.totalScore);
                    return (
                      <th
                        key={property.id}
                        className="p-4 sm:p-5 min-w-[240px] align-top border-l border-slate-100"
                      >
                        <div className="relative">
                          <button
                            onClick={() => toggleCompareProperty(property.id)}
                            className="absolute -top-1 -right-1 p-1 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Remove from comparison"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <div className="relative h-28 w-full rounded-xl overflow-hidden mb-2.5 bg-slate-100">
                            <Image
                              src={property.images[0]}
                              alt={property.name}
                              fill
                              sizes="240px"
                              className="object-cover"
                            />
                            <div className="absolute top-2 left-2">
                              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${badge.bg}`}>
                                {match.totalScore}% Match
                              </span>
                            </div>
                          </div>
                          <Link
                            href={`/tenant/rooms/${property.id}`}
                            className="font-extrabold text-sm text-slate-900 hover:text-indigo-600 transition-colors block line-clamp-1"
                          >
                            {property.name}
                          </Link>
                          <span className="text-[11px] text-slate-400 block line-clamp-1">
                            {property.locality}, {property.city}
                          </span>
                        </div>
                      </th>
                    );
                  })}

                  {/* Empty slot if less than 3 */}
                  {scoredProperties.length < 3 && (
                    <th className="p-5 min-w-[200px] border-l border-slate-100 bg-slate-50/40 text-center align-middle">
                      <Link
                        href="/tenant/rooms"
                        className="inline-flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-slate-300 text-slate-500 hover:border-indigo-400 hover:text-indigo-600 transition-all w-full h-full"
                      >
                        <Plus className="w-6 h-6 mb-1 text-slate-400" />
                        <span className="font-bold text-xs">Add Another Room</span>
                        <span className="text-[10px] text-slate-400 mt-0.5">Up to 3 rooms</span>
                      </Link>
                    </th>
                  )}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-slate-700">
                {/* Monthly Rent */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 sm:p-5 font-bold text-slate-900 text-xs">
                    Monthly Rent
                  </td>
                  {scoredProperties.map(({ property }) => {
                    const isLowest = property.monthlyRent === lowestRent;
                    return (
                      <td
                        key={property.id}
                        className={`p-4 sm:p-5 border-l border-slate-100 font-bold text-sm ${
                          isLowest ? 'bg-emerald-50/50 text-emerald-800' : 'text-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <span>{formatINR(property.monthlyRent)}/mo</span>
                          {isLowest && (
                            <span className="text-[9px] bg-emerald-600 text-white font-extrabold px-1.5 py-0.5 rounded uppercase">
                              Lowest
                            </span>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>

                {/* Security Deposit */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 sm:p-5 font-bold text-slate-900 text-xs">
                    Security Deposit
                  </td>
                  {scoredProperties.map(({ property }) => (
                    <td key={property.id} className="p-4 sm:p-5 border-l border-slate-100">
                      {formatINR(property.securityDeposit)}
                    </td>
                  ))}
                </tr>

                {/* Distance to Campus */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 sm:p-5 font-bold text-slate-900 text-xs">
                    Distance from Campus
                  </td>
                  {scoredProperties.map(({ property, nearestDistance }) => {
                    const isClosest = nearestDistance === closestDistance;
                    return (
                      <td
                        key={property.id}
                        className={`p-4 sm:p-5 border-l border-slate-100 ${
                          isClosest ? 'bg-indigo-50/50 text-indigo-900 font-bold' : ''
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{nearestDistance} km</span>
                          {isClosest && (
                            <span className="text-[9px] bg-indigo-600 text-white font-extrabold px-1.5 py-0.5 rounded uppercase">
                              Closest
                            </span>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>

                {/* Sharing Types */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 sm:p-5 font-bold text-slate-900 text-xs">
                    Room Sharing
                  </td>
                  {scoredProperties.map(({ property }) => (
                    <td key={property.id} className="p-4 sm:p-5 border-l border-slate-100 capitalize">
                      {property.roomTypes.join(', ')}
                    </td>
                  ))}
                </tr>

                {/* Available Vacancies */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 sm:p-5 font-bold text-slate-900 text-xs">
                    Vacant Beds
                  </td>
                  {scoredProperties.map(({ property }) => (
                    <td key={property.id} className="p-4 sm:p-5 border-l border-slate-100">
                      <span className="font-bold text-slate-900">{property.availableBeds}</span> of {property.totalBeds} beds
                    </td>
                  ))}
                </tr>

                {/* Food Arrangements */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 sm:p-5 font-bold text-slate-900 text-xs">
                    Food & Meals
                  </td>
                  {scoredProperties.map(({ property }) => (
                    <td key={property.id} className="p-4 sm:p-5 border-l border-slate-100 capitalize">
                      {property.foodOptions.replace('-', ' ')}
                      <span className="block text-[10px] text-slate-500">
                        {property.mealsIncluded ? '3 meals included' : 'Self-cooking / outside'}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Key Amenities */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 sm:p-5 font-bold text-slate-900 text-xs">
                    Key Facilities
                  </td>
                  {scoredProperties.map(({ property }) => (
                    <td key={property.id} className="p-4 sm:p-5 border-l border-slate-100">
                      <div className="space-y-1">
                        {property.amenities.slice(0, 5).map((amenity) => (
                          <div key={amenity} className="flex items-center gap-1.5 text-[11px]">
                            <Check className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                            <span>{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Algorithm Compatibility */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 sm:p-5 font-bold text-slate-900 text-xs">
                    Match Breakdown
                  </td>
                  {scoredProperties.map(({ property, match }) => (
                    <td key={property.id} className="p-4 sm:p-5 border-l border-slate-100 text-[11px] space-y-1">
                      <div>Budget: <strong>{match.budgetScore}/30</strong></div>
                      <div>Location: <strong>{match.locationScore}/25</strong></div>
                      <div>Room Type: <strong>{match.roomTypeScore}/15</strong></div>
                      <div>Amenities: <strong>{match.amenitiesScore}/15</strong></div>
                      <div>Lifestyle: <strong>{match.lifestyleScore}/10</strong></div>
                    </td>
                  ))}
                </tr>

                {/* Action Link Row */}
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-slate-900 text-xs">
                    Direct Action
                  </td>
                  {scoredProperties.map(({ property }) => (
                    <td key={property.id} className="p-4 sm:p-5 border-l border-slate-100">
                      <Link
                        href={`/tenant/rooms/${property.id}`}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-all"
                      >
                        <span>View Details</span>
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
