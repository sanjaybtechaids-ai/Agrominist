'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { MeasurementUnit, FarmingType, FarmingSchedule, IrrigationType, SoilType, SupportedLanguage } from '@/types';
import {
  Sprout,
  User,
  MapPin,
  Tractor,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Navigation,
  Globe,
  Upload,
} from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const { farmerProfile, updateFarmerProfile, setLanguage } = useAppStore();

  const [step, setStep] = useState(1);

  // Step 1: Personal info
  const [name, setName] = useState(farmerProfile.name || '');
  const [phone, setPhone] = useState(farmerProfile.phone || '');
  const [dob, setDob] = useState(farmerProfile.dateOfBirth || '1988-04-12');
  const [preferredLang, setPreferredLang] = useState<SupportedLanguage>(farmerProfile.preferredLanguage || 'en');

  // Step 2: Land info
  const [landArea, setLandArea] = useState<number>(farmerProfile.landArea || 2.0);
  const [unit, setUnit] = useState<MeasurementUnit>(farmerProfile.measurementUnit || 'Acre');
  const [gpsRequested, setGpsRequested] = useState(false);
  const [village, setVillage] = useState(farmerProfile.location?.village || 'Kallaperambur');
  const [district, setDistrict] = useState(farmerProfile.location?.district || 'Thanjavur');
  const [state, setState] = useState(farmerProfile.location?.state || 'Tamil Nadu');
  const [soilType, setSoilType] = useState<SoilType>(farmerProfile.soilType || 'Alluvial');
  const [irrigation, setIrrigation] = useState<IrrigationType>(farmerProfile.irrigationFacility || 'borewell');
  const [existingCropsInput, setExistingCropsInput] = useState(farmerProfile.existingCrops?.join(', ') || 'Paddy, Black Gram');

  // Step 3: Farming info
  const [farmingType, setFarmingType] = useState<FarmingType>(farmerProfile.farmingType || 'family');
  const [farmingSchedule, setFarmingSchedule] = useState<FarmingSchedule>(farmerProfile.farmingSchedule || 'full-time');
  const [workers, setWorkers] = useState<number>(farmerProfile.availableWorkers || 3);
  const [ownMarket, setOwnMarket] = useState<boolean>(farmerProfile.ownSellingMarket ?? true);

  const requestGps = () => {
    setGpsRequested(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          updateFarmerProfile({
            location: {
              village,
              district,
              state,
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              gpsAllowed: true,
            },
          });
        },
        () => {
          // Manual fallback allowed
        }
      );
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Save and Complete
      const crops = existingCropsInput
        .split(',')
        .map((c) => c.trim())
        .filter(Boolean);

      updateFarmerProfile({
        name,
        phone,
        dateOfBirth: dob,
        preferredLanguage: preferredLang,
        landArea: Number(landArea) || 1,
        measurementUnit: unit,
        location: {
          village,
          district,
          state,
          lat: 10.787,
          lng: 79.1378,
          gpsAllowed: gpsRequested,
        },
        soilType,
        irrigationFacility: irrigation,
        existingCrops: crops,
        farmingType,
        farmingSchedule,
        availableWorkers: Number(workers) || 0,
        ownSellingMarket: ownMarket,
        onboardingCompleted: true,
      });

      setLanguage(preferredLang);
      router.push('/farmer/dashboard');
    }
  };

  const stepsList = [
    { num: 1, title: 'Personal Info', desc: 'Identity & Language', icon: User },
    { num: 2, title: 'Land & Soil', desc: 'Location & Acreage', icon: MapPin },
    { num: 3, title: 'Farm Operations', desc: 'Methods & Market', icon: Tractor },
  ];

  return (
    <div className="min-h-screen bg-agriBg py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl bg-forest-600 text-white flex items-center justify-center shadow">
              <Sprout className="w-6 h-6" />
            </div>
            <span className="font-bold text-xl text-forest-800">Agronomist</span>
          </div>
          <h1 className="text-2xl font-bold text-agriText">Farmer Profile Onboarding</h1>
          <p className="text-xs text-agriMuted mt-1">
            Configure your farm details for AI-tailored weather, crop, and fertilizer recommendations.
          </p>
        </div>

        {/* Step Progress Tracker */}
        <div className="bg-white p-4 rounded-2xl border border-agriBorder shadow-xs mb-6">
          <div className="grid grid-cols-3 gap-2">
            {stepsList.map((s) => {
              const Icon = s.icon;
              const isDone = step > s.num;
              const isCurrent = step === s.num;
              return (
                <div
                  key={s.num}
                  className={`flex items-center gap-2 p-2 rounded-xl transition-all ${
                    isCurrent
                      ? 'bg-forest-50 border border-forest-200 text-forest-800'
                      : isDone
                      ? 'text-emerald-700'
                      : 'text-slate-400'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                      isCurrent
                        ? 'bg-forest-600 text-white'
                        : isDone
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="w-4 h-4" /> : s.num}
                  </div>
                  <div className="hidden sm:block min-w-0">
                    <p className="text-xs font-semibold leading-tight truncate">{s.title}</p>
                    <p className="text-[10px] opacity-80 truncate">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Visual Progress Bar */}
          <div className="mt-3 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-forest-600 h-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-agriBorder shadow-sm">
          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-agriText">1. Personal Information</h2>
                <p className="text-xs text-agriMuted">Your name and primary communication channel</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-agriText mb-1.5">
                  Full Farmer Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Muthuvel Karuppan"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-forest-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-agriText mb-1.5">
                    Mobile Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98421 78901"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-forest-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-agriText mb-1.5">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-forest-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-agriText mb-1.5">
                  Preferred Advisory Language <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { code: 'en', label: 'English' },
                    { code: 'ta', label: 'தமிழ் (Tamil)' },
                    { code: 'hi', label: 'हिन्दी (Hindi)' },
                    { code: 'te', label: 'తెలుగు (Telugu)' },
                    { code: 'kn', label: 'ಕನ್ನಡ (Kannada)' },
                    { code: 'ml', label: 'മലയാളം (Malayalam)' },
                  ].map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => setPreferredLang(lang.code as SupportedLanguage)}
                      className={`p-2 rounded-xl border text-xs font-medium text-center transition-all ${
                        preferredLang === lang.code
                          ? 'border-forest-600 bg-forest-50 text-forest-800 ring-1 ring-forest-600 font-bold'
                          : 'border-agriBorder bg-slate-50 hover:bg-slate-100 text-agriText'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-dashed border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium text-agriText block">Profile Photo (Optional)</span>
                  <span className="text-[10px] text-agriMuted">Helps buyers identify you in the direct marketplace</span>
                </div>
                <button
                  type="button"
                  className="px-3 py-1.5 bg-white border border-agriBorder rounded-lg text-xs font-medium text-forest-700 hover:bg-forest-50 flex items-center gap-1.5 shadow-2xs"
                >
                  <Upload className="w-3.5 h-3.5" /> Upload
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Land Information */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-agriText">2. Land & Soil Parameters</h2>
                <p className="text-xs text-agriMuted">Acreage, location, and irrigation facilities</p>
              </div>

              {/* Area & Unit */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-agriText mb-1.5">
                    Total Farm Land Area <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    required
                    value={landArea}
                    onChange={(e) => setLandArea(parseFloat(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-forest-600"
                    placeholder="2.0"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-agriText mb-1.5">
                    Measurement Unit
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Acre', 'Cent', 'Hectare'] as MeasurementUnit[]).map((u) => (
                      <button
                        key={u}
                        type="button"
                        onClick={() => setUnit(u)}
                        className={`p-2 rounded-xl border text-xs font-medium text-center transition-all ${
                          unit === u
                            ? 'border-forest-600 bg-forest-50 text-forest-800 font-bold'
                            : 'border-agriBorder bg-slate-50 text-agriText hover:bg-slate-100'
                        }`}
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Location & GPS permission */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-agriText">Farm Location</label>
                  <button
                    type="button"
                    onClick={requestGps}
                    className="text-xs text-forest-700 font-semibold flex items-center gap-1 hover:underline"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    {gpsRequested ? 'GPS Detected ✓' : 'Detect GPS Location'}
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    placeholder="Village / Town"
                    className="px-3 py-2 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-forest-600"
                  />
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="District (e.g. Thanjavur)"
                    className="px-3 py-2 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-forest-600"
                  />
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="State (e.g. Tamil Nadu)"
                    className="px-3 py-2 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-forest-600"
                  />
                </div>
              </div>

              {/* Soil Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-agriText mb-1.5">
                    Predominant Soil Type (Optional)
                  </label>
                  <select
                    value={soilType}
                    onChange={(e) => setSoilType(e.target.value as SoilType)}
                    className="w-full px-3 py-2 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-forest-600"
                  >
                    <option value="Alluvial">Alluvial Soil (Delta)</option>
                    <option value="Red Loam">Red Loam Soil</option>
                    <option value="Black Clay">Black Clay Soil (Karusal)</option>
                    <option value="Sandy Loam">Sandy Loam</option>
                    <option value="Clay Loam">Clay Loam</option>
                    <option value="Laterite">Laterite</option>
                    <option value="Unknown">I don't know (Estimate by region)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-agriText mb-1.5">
                    Irrigation Facility
                  </label>
                  <select
                    value={irrigation}
                    onChange={(e) => setIrrigation(e.target.value as IrrigationType)}
                    className="w-full px-3 py-2 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-forest-600"
                  >
                    <option value="borewell">Borewell with pump</option>
                    <option value="canal">Canal / River irrigation</option>
                    <option value="drip">Drip Irrigation System</option>
                    <option value="sprinkler">Sprinkler System</option>
                    <option value="rainfed">Rainfed (Dryland)</option>
                    <option value="none">None / Open Well</option>
                  </select>
                </div>
              </div>

              {/* Existing Crops */}
              <div>
                <label className="block text-xs font-semibold text-agriText mb-1.5">
                  Existing or Previous Crops (Comma separated)
                </label>
                <input
                  type="text"
                  value={existingCropsInput}
                  onChange={(e) => setExistingCropsInput(e.target.value)}
                  placeholder="e.g. Samba Paddy, Black Gram, Sesame"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-forest-600"
                />
              </div>
            </div>
          )}

          {/* Step 3: Farming Information */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-agriText">3. Farming Operations & Market</h2>
                <p className="text-xs text-agriMuted">Labour availability and selling preferences</p>
              </div>

              {/* Farming Type */}
              <div>
                <label className="block text-xs font-semibold text-agriText mb-2">
                  Primary Farming Structure
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { type: 'individual', title: 'Individual', desc: 'Self operated' },
                    { type: 'family', title: 'Family Farming', desc: 'Household members' },
                    { type: 'worker-assisted', title: 'Worker Assisted', desc: 'Hired farm workers' },
                  ].map((item) => (
                    <button
                      key={item.type}
                      type="button"
                      onClick={() => setFarmingType(item.type as FarmingType)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        farmingType === item.type
                          ? 'border-forest-600 bg-forest-50 text-forest-800 ring-1 ring-forest-600'
                          : 'border-agriBorder bg-slate-50 hover:bg-slate-100 text-agriText'
                      }`}
                    >
                      <p className="font-bold text-xs">{item.title}</p>
                      <p className="text-[10px] text-agriMuted">{item.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Farming Schedule & Workers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-agriText mb-1.5">
                    Farming Commitment
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['full-time', 'part-time'] as FarmingSchedule[]).map((sched) => (
                      <button
                        key={sched}
                        type="button"
                        onClick={() => setFarmingSchedule(sched)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold capitalize text-center ${
                          farmingSchedule === sched
                            ? 'border-forest-600 bg-forest-50 text-forest-800'
                            : 'border-agriBorder bg-slate-50 text-agriText hover:bg-slate-100'
                        }`}
                      >
                        {sched}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-agriText mb-1.5">
                    Available Workers / Labourers (Optional)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={workers}
                    onChange={(e) => setWorkers(parseInt(e.target.value) || 0)}
                    placeholder="e.g. 4"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-forest-600"
                  />
                </div>
              </div>

              {/* Own Selling Market */}
              <div className="p-4 bg-forest-50/50 rounded-xl border border-forest-100">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold text-forest-900">
                      Do you have direct selling points or existing market channels?
                    </p>
                    <p className="text-[11px] text-forest-700 mt-0.5">
                      Enabling this lists you in our Direct Farmer Marketplace where nearby buyers can reach you.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setOwnMarket(true)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                        ownMarket ? 'bg-forest-600 text-white' : 'bg-white border text-agriText'
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setOwnMarket(false)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                        !ownMarket ? 'bg-forest-600 text-white' : 'bg-white border text-agriText'
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 border border-agriBorder rounded-xl text-xs font-semibold text-agriText hover:bg-slate-50 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 bg-forest-600 hover:bg-forest-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-colors"
            >
              {step === 3 ? (
                <>
                  <span>Complete Onboarding & Enter Dashboard</span>
                  <CheckCircle2 className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Next Step</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
