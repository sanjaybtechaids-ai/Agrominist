'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { translations } from '@/constants/translations';
import { SupportedLanguage } from '@/types';
import { User, Phone, MapPin, Mail, Save, CheckCircle2, ShoppingBag } from 'lucide-react';

export default function CustomerProfilePage() {
  const { customerProfile, updateCustomerProfile, products, language } = useAppStore();
  const t = translations[language] || translations.en;

  const [name, setName] = useState(customerProfile.name);
  const [phone, setPhone] = useState(customerProfile.phone);
  const [district, setDistrict] = useState(customerProfile.location.district);
  const [state, setState] = useState(customerProfile.location.state);
  const [address, setAddress] = useState(customerProfile.location.address || 'Anna Nagar West, Chennai');
  const [preferredLang, setPreferredLang] = useState<SupportedLanguage>(customerProfile.preferredLanguage);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Find enquiries submitted by this customer
  const submittedEnquiries = products.flatMap((p) => {
    const matching = (p.interestedBuyers || []).filter(
      (b) => b.customerName.toLowerCase().includes(customerProfile.name.toLowerCase()) || b.customerPhone === customerProfile.phone
    );
    return matching.map((lead) => ({ ...lead, productTitle: p.title, unit: p.unit }));
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCustomerProfile({
      name,
      phone,
      location: {
        district,
        state,
        address,
      },
      preferredLanguage: preferredLang,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <User className="w-6 h-6 text-forest-600" />
            <h1 className="text-2xl font-bold text-agriText">Customer Buyer Profile</h1>
          </div>
          <p className="text-xs text-agriMuted mt-1">
            Manage your delivery address, contact details, and view recent produce enquiries.
          </p>
        </div>

        {savedSuccess && (
          <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Profile saved!
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-agriBorder shadow-xs space-y-4">
          <h2 className="font-bold text-sm text-agriText pb-3 border-b border-slate-100">
            Contact & Delivery Information
          </h2>

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
              <label className="block text-xs font-semibold text-agriText mb-1">Contact Phone</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:ring-2 focus:ring-forest-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-agriText mb-1">District</label>
              <input
                type="text"
                required
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:ring-2 focus:ring-forest-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-agriText mb-1">State</label>
              <input
                type="text"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:ring-2 focus:ring-forest-600 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-agriText mb-1">Delivery Address</label>
              <textarea
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:ring-2 focus:ring-forest-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-5 py-2 bg-forest-600 text-white rounded-xl text-xs font-semibold hover:bg-forest-700 flex items-center gap-1.5 shadow-xs"
            >
              <Save className="w-4 h-4" /> Save Profile
            </button>
          </div>
        </div>
      </form>

      {/* Submitted Enquiries History */}
      <div className="bg-white p-6 rounded-2xl border border-agriBorder shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <ShoppingBag className="w-4 h-4 text-forest-600" />
          <h2 className="font-bold text-sm text-agriText">Recent Produce Enquiries & Orders</h2>
        </div>

        {submittedEnquiries.length === 0 ? (
          <p className="text-xs text-agriMuted py-4">No enquiries submitted yet.</p>
        ) : (
          <div className="space-y-3">
            {submittedEnquiries.map((enq, i) => (
              <div key={i} className="p-3 bg-slate-50 border border-agriBorder rounded-xl text-xs flex items-center justify-between">
                <div>
                  <span className="font-bold text-agriText">{enq.productTitle}</span>
                  <span className="text-[10px] text-agriMuted block">
                    Quantity: {enq.requestedQty} {enq.unit}s • Offered Price: ₹{enq.offeredPrice}/{enq.unit}
                  </span>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                  Dispatched to Farmer
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
