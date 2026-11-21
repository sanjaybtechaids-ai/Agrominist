'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { translations } from '@/constants/translations';
import { SoilType, IrrigationType, FarmingType, FarmingSchedule, MeasurementUnit, SupportedLanguage } from '@/types';
import {
  User,
  MapPin,
  Tractor,
  Save,
  CheckCircle2,
  ShieldCheck,
  Calendar,
  Phone,
  Globe,
  Upload,
} from 'lucide-react';

export default function FarmerProfilePage() {
  const { farmerProfile, updateFarmerProfile, language } = useAppStore();
  const t = translations[language] || translations.en;

  const [name, setName] = useState(farmerProfile.name);
  const [phone, setPhone] = useState(farmerProfile.phone);
  const [dob, setDob] = useState(farmerProfile.dateOfBirth || '1984-06-15');
  const [landArea, setLandArea] = useState<number>(farmerProfile.landArea || 2.0);
  const [unit, setUnit] = useState<MeasurementUnit>(farmerProfile.measurementUnit || 'Acre');
  const [village, setVillage] = useState(farmerProfile.location.village);
  const [district, setDistrict] = useState(farmerProfile.location.district);
  const [state, setState] = useState(farmerProfile.location.state);
  const [soilType, setSoilType] = useState<SoilType>(farmerProfile.soilType);
  const [irrigation, setIrrigation] = useState<IrrigationType>(farmerProfile.irrigationFacility);
  const [farmingType, setFarmingType] = useState<FarmingType>(farmerProfile.farmingType);
  const [farmingSchedule, setFarmingSchedule] = useState<FarmingSchedule>(farmerProfile.farmingSchedule);
  const [workers, setWorkers] = useState<number>(farmerProfile.availableWorkers || 4);
  const [ownMarket, setOwnMarket] = useState<boolean>(farmerProfile.ownSellingMarket ?? true);
  const [preferredLang, setPreferredLang] = useState<SupportedLanguage>(farmerProfile.preferredLanguage);

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateFarmerProfile({
      name,
      phone,
      dateOfBirth: dob,
      landArea,
      measurementUnit: unit,
      location: {
        ...farmerProfile.location,
        village,
        district,
        state,
      },
      soilType,
      irrigationFacility: irrigation,
      farmingType,
      farmingSchedule,
      availableWorkers: workers,
      ownSellingMarket: ownMarket,
      preferredLanguage: preferredLang,
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <User className="w-6 h-6 text-forest-600" />
            <h1 className="text-2xl font-bold text-agriText">Farmer Profile & Farm Records</h1>
          </div>
          <p className="text-xs text-agriMuted mt-1">
            Update personal information, farm acreage, soil characteristics, and operational parameters.
          </p>
        </div>

        {savedSuccess && (
          <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Changes saved successfully!
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Personal Details */}
        <div className="bg-white p-6 rounded-2xl border border-agriBorder shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="font-bold text-sm text-agriText flex items-center gap-2">
              <User className="w-4 h-4 text-forest-600" /> Personal Information
            </h2>
            <span className="text-[10px] text-agriMuted">Protected: Never shared with buyers</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-agriText mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:ring-2 focus:ring-forest-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-agriText mb-1">
                Mobile Number (Login & Alerts)
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:ring-2 focus:ring-forest-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-agriText mb-1">Date of Birth</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:ring-2 focus:ring-forest-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-agriText mb-1">Preferred Language</label>
              <select
                value={preferredLang}
                onChange={(e) => setPreferredLang(e.target.value as SupportedLanguage)}
                className="w-full px-3 py-2 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:ring-2 focus:ring-forest-600 focus:outline-none"
              >
                <option value="en">English</option>
                <option value="ta">தமிழ் (Tamil)</option>
                <option value="hi">हिन्दी (Hindi)</option>
                <option value="te">తెలుగు (Telugu)</option>
                <option value="kn">ಕನ್ನಡ (Kannada)</option>
                <option value="ml">മലയാളം (Malayalam)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Land & Soil Characteristics */}
        <div className="bg-white p-6 rounded-2xl border border-agriBorder shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="font-bold text-sm text-agriText flex items-center gap-2">
              <MapPin className="w-4 h-4 text-forest-600" /> Farm Land & Soil Characteristics
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-agriText mb-1">Total Land Area</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={landArea}
                  onChange={(e) => setLandArea(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:ring-2 focus:ring-forest-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-agriText mb-1">Unit</label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value as MeasurementUnit)}
                  className="w-full px-3 py-2 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:ring-2 focus:ring-forest-600 focus:outline-none"
                >
                  <option value="Acre">Acre</option>
                  <option value="Cent">Cent</option>
                  <option value="Hectare">Hectare</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-agriText mb-1">Predominant Soil</label>
              <select
                value={soilType}
                onChange={(e) => setSoilType(e.target.value as SoilType)}
                className="w-full px-3 py-2 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:ring-2 focus:ring-forest-600 focus:outline-none"
              >
                <option value="Alluvial">Alluvial Soil</option>
                <option value="Clay Loam">Clay Loam</option>
                <option value="Red Loam">Red Loam</option>
                <option value="Black Clay">Black Clay</option>
                <option value="Sandy Loam">Sandy Loam</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-agriText mb-1">Irrigation System</label>
              <select
                value={irrigation}
                onChange={(e) => setIrrigation(e.target.value as IrrigationType)}
                className="w-full px-3 py-2 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:ring-2 focus:ring-forest-600 focus:outline-none"
              >
                <option value="borewell">Borewell with Motor</option>
                <option value="canal">Canal / Cauvery Delta</option>
                <option value="drip">Drip Irrigation</option>
                <option value="sprinkler">Sprinkler System</option>
                <option value="rainfed">Rainfed</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-agriText mb-1">Location Address</label>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  placeholder="Village"
                  className="px-2.5 py-2 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:ring-1 focus:ring-forest-600 focus:outline-none"
                />
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="District"
                  className="px-2.5 py-2 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:ring-1 focus:ring-forest-600 focus:outline-none"
                />
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="State"
                  className="px-2.5 py-2 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:ring-1 focus:ring-forest-600 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Operations & Marketplace Settings */}
        <div className="bg-white p-6 rounded-2xl border border-agriBorder shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="font-bold text-sm text-agriText flex items-center gap-2">
              <Tractor className="w-4 h-4 text-forest-600" /> Operational Structure & Direct Market
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-agriText mb-1">Farming Type</label>
              <select
                value={farmingType}
                onChange={(e) => setFarmingType(e.target.value as FarmingType)}
                className="w-full px-3 py-2 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:ring-2 focus:ring-forest-600 focus:outline-none"
              >
                <option value="family">Family Farming</option>
                <option value="individual">Individual</option>
                <option value="worker-assisted">Worker Assisted</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-agriText mb-1">Schedule</label>
              <select
                value={farmingSchedule}
                onChange={(e) => setFarmingSchedule(e.target.value as FarmingSchedule)}
                className="w-full px-3 py-2 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:ring-2 focus:ring-forest-600 focus:outline-none"
              >
                <option value="full-time">Full-Time Farmer</option>
                <option value="part-time">Part-Time Farmer</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-agriText mb-1">Available Workers</label>
              <input
                type="number"
                min="0"
                value={workers}
                onChange={(e) => setWorkers(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:ring-2 focus:ring-forest-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between p-3 bg-slate-50 rounded-xl">
            <div>
              <span className="text-xs font-bold text-agriText block">Direct Producer Marketplace</span>
              <span className="text-[10px] text-agriMuted">
                Enable direct buyer calls and farm gate produce inquiries
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={ownMarket}
                onChange={(e) => setOwnMarket(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-forest-600" />
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-forest-600 hover:bg-forest-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
}
