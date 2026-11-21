'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { translations } from '@/constants/translations';
import { MarketplaceProduct } from '@/types';
import { formatCurrency } from '@/lib/utils';
import {
  ShoppingBag,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  Users,
  MapPin,
  Calendar,
  Phone,
  Tag,
  Truck,
  Image as ImageIcon,
  X,
  Sparkles,
} from 'lucide-react';

export default function FarmerMarketplacePage() {
  const { farmerProfile, products, addProduct, updateProduct, deleteProduct, markProductAsSold, language } =
    useAppStore();
  const t = translations[language] || translations.en;

  // Filter products owned by current farmer
  const farmerProducts = products.filter((p) => p.farmerId === farmerProfile.id);

  // Modal State for New / Edit Listing
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<MarketplaceProduct['category']>('Grains & Cereals');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState<number>(50);
  const [unit, setUnit] = useState<MarketplaceProduct['unit']>('bag');
  const [price, setPrice] = useState<number>(1450);
  const [harvestDate, setHarvestDate] = useState('2026-11-15');
  const [contactPhone, setContactPhone] = useState(farmerProfile.phone || '+91 98421 78901');
  const [sellingVillage, setSellingVillage] = useState(farmerProfile.location.village || 'Kallaperambur');
  const [sellingDistrict, setSellingDistrict] = useState(farmerProfile.location.district || 'Thanjavur');
  const [sellingState, setSellingState] = useState(farmerProfile.location.state || 'Tamil Nadu');
  const [hasOwnMarket, setHasOwnMarket] = useState(true);
  const [deliveryOption, setDeliveryOption] = useState<'pickup' | 'delivery' | 'both'>('both');
  const [imageUrl, setImageUrl] = useState(
    'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600'
  );

  // Selected inquiries modal
  const [viewingInquiriesProduct, setViewingInquiriesProduct] = useState<MarketplaceProduct | null>(null);

  const handleOpenCreateModal = () => {
    setEditingId(null);
    setTitle('');
    setDescription('');
    setQuantity(50);
    setPrice(1200);
    setImageUrl('https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600');
    setShowModal(true);
  };

  const handleOpenEditModal = (prod: MarketplaceProduct) => {
    setEditingId(prod.id);
    setTitle(prod.title);
    setCategory(prod.category);
    setDescription(prod.description);
    setQuantity(prod.availableQuantity);
    setUnit(prod.unit);
    setPrice(prod.pricePerUnit);
    setHarvestDate(prod.harvestDate);
    setContactPhone(prod.farmerPhone);
    setSellingVillage(prod.farmerLocation.village);
    setSellingDistrict(prod.farmerLocation.district);
    setSellingState(prod.farmerLocation.state);
    setHasOwnMarket(prod.hasOwnMarket);
    setDeliveryOption(prod.deliveryOption);
    setImageUrl(prod.images[0] || '');
    setShowModal(true);
  };

  const handleSaveListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingId) {
      updateProduct(editingId, {
        title,
        category,
        description,
        availableQuantity: quantity,
        unit,
        pricePerUnit: price,
        harvestDate,
        farmerPhone: contactPhone,
        farmerLocation: {
          village: sellingVillage,
          district: sellingDistrict,
          state: sellingState,
        },
        hasOwnMarket,
        deliveryOption,
        images: [imageUrl],
      });
    } else {
      const newProduct: MarketplaceProduct = {
        id: `prod-${Date.now()}`,
        farmerId: farmerProfile.id,
        farmerName: farmerProfile.name,
        farmerPhone: contactPhone,
        farmerLocation: {
          village: sellingVillage,
          district: sellingDistrict,
          state: sellingState,
        },
        title,
        category,
        description,
        availableQuantity: quantity,
        unit,
        pricePerUnit: price,
        harvestDate,
        images: [imageUrl],
        hasOwnMarket,
        deliveryOption,
        status: 'active',
        inquiriesCount: 0,
        interestedBuyers: [],
      };
      addProduct(newProduct);
    }

    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-forest-600" />
            <h1 className="text-2xl font-bold text-agriText">{t.marketplace.title}</h1>
          </div>
          <p className="text-xs text-agriMuted mt-1">{t.marketplace.subtitle}</p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="px-4 py-2.5 bg-forest-600 hover:bg-forest-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> {t.marketplace.createListing}
        </button>
      </div>

      {/* Farm Direct Benefits Banner */}
      <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-emerald-950">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-700 shrink-0" />
          <span>
            <strong>Zero Brokerage Direct Sales:</strong> Your produce is showcased directly to consumers, hotel chains, and retail buyers in Tamil Nadu with direct phone enquiries.
          </span>
        </div>
        <span className="font-semibold text-emerald-800 shrink-0">100% Producer Price Realization</span>
      </div>

      {/* Listings Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-agriText">
            Your Active Produce Listings ({farmerProducts.length})
          </h2>
          <span className="text-xs text-agriMuted">Click on enquiries to view buyer leads</span>
        </div>

        {farmerProducts.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-agriBorder">
            <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-agriText">No Active Listings Yet</h3>
            <p className="text-xs text-agriMuted mt-1 max-w-sm mx-auto">
              List your harvested paddy, vegetables, pulses, or fruits to receive direct customer orders.
            </p>
            <button
              onClick={handleOpenCreateModal}
              className="mt-4 px-4 py-2 bg-forest-600 text-white rounded-xl text-xs font-semibold hover:bg-forest-700"
            >
              + Create First Produce Listing
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {farmerProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-white rounded-2xl border border-agriBorder overflow-hidden shadow-xs hover:border-forest-200 transition-colors flex flex-col justify-between"
              >
                <div>
                  {/* Product Image */}
                  <div className="h-44 w-full relative bg-slate-100 overflow-hidden">
                    <img
                      src={prod.images[0]}
                      alt={prod.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase shadow-2xs ${
                          prod.status === 'active'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-700 text-white'
                        }`}
                      >
                        {prod.status}
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 left-2.5 bg-black/60 text-white px-2 py-0.5 rounded-md text-[10px] font-medium">
                      {prod.category}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <div>
                      <h3 className="font-bold text-base text-agriText leading-tight">{prod.title}</h3>
                      <p className="text-xs text-agriMuted mt-1 line-clamp-2">{prod.description}</p>
                    </div>

                    {/* Price & Quantity Box */}
                    <div className="p-3 bg-forest-50/50 rounded-xl border border-forest-100 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-agriMuted block text-[10px]">Price / Unit</span>
                        <span className="text-base font-bold text-forest-800">
                          ₹{prod.pricePerUnit} / {prod.unit}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-agriMuted block text-[10px]">Available Qty</span>
                        <span className="font-bold text-agriText">
                          {prod.availableQuantity} {prod.unit}s
                        </span>
                      </div>
                    </div>

                    {/* Logistics & Location Details */}
                    <div className="space-y-1.5 text-xs text-agriMuted">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-forest-600" />
                        <span>
                          {prod.farmerLocation.village}, {prod.farmerLocation.district}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5 text-slate-500" />
                        <span className="capitalize">{prod.deliveryOption} Fulfilment</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        <span>Harvest Date: {prod.harvestDate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="p-5 pt-0 space-y-2 border-t border-slate-100 mt-2">
                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setViewingInquiriesProduct(prod)}
                      className="text-xs font-semibold text-forest-700 hover:underline flex items-center gap-1"
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>{prod.interestedBuyers?.length || 0} Buyer Enquiries</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEditModal(prod)}
                        className="p-1.5 rounded-lg border border-agriBorder text-slate-600 hover:text-agriText hover:bg-slate-100"
                        title="Edit Listing"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      {prod.status === 'active' && (
                        <button
                          onClick={() => markProductAsSold(prod.id)}
                          className="p-1.5 rounded-lg border border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                          title="Mark as Sold"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteProduct(prod.id)}
                        className="p-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50"
                        title="Delete Listing"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CREATE / EDIT LISTING MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 border border-agriBorder shadow-2xl max-h-[90vh] overflow-y-auto animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-agriBorder">
              <h3 className="font-bold text-base text-agriText">
                {editingId ? 'Edit Produce Listing' : 'Create New Produce Listing'}
              </h3>
              <button onClick={() => setShowModal(false)} className="p-1 rounded hover:bg-slate-100">
                <X className="w-5 h-5 text-agriMuted" />
              </button>
            </div>

            <form onSubmit={handleSaveListing} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-agriText mb-1">
                  Produce Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Aged Samba Ponni Boiled Rice"
                  className="w-full px-3 py-2 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:ring-2 focus:ring-forest-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-agriText mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:ring-2 focus:ring-forest-600 focus:outline-none"
                  >
                    <option value="Grains & Cereals">Grains & Cereals</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Pulses">Pulses</option>
                    <option value="Spices">Spices</option>
                    <option value="Organic Specialty">Organic Specialty</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-agriText mb-1">Image URL</label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:ring-2 focus:ring-forest-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-agriText mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe farm-fresh quality, organic status, milling type..."
                  className="w-full px-3 py-2 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:ring-2 focus:ring-forest-600 focus:outline-none"
                />
              </div>

              {/* Quantity, Unit & Price */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-agriText mb-1">Available Qty</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:ring-2 focus:ring-forest-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-agriText mb-1">Unit</label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:ring-2 focus:ring-forest-600 focus:outline-none"
                  >
                    <option value="kg">kg</option>
                    <option value="quintal">quintal</option>
                    <option value="bag">bag (25/50kg)</option>
                    <option value="tonne">tonne</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-agriText mb-1">Price / Unit (₹)</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={price}
                    onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:ring-2 focus:ring-forest-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Location & Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-agriText mb-1">
                    Contact Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:ring-2 focus:ring-forest-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-agriText mb-1">Harvest Date</label>
                  <input
                    type="date"
                    value={harvestDate}
                    onChange={(e) => setHarvestDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:ring-2 focus:ring-forest-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Selling Location */}
              <div>
                <label className="block text-xs font-semibold text-agriText mb-1">
                  Selling Location (Village, District, State)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    value={sellingVillage}
                    onChange={(e) => setSellingVillage(e.target.value)}
                    placeholder="Village"
                    className="px-3 py-1.5 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:ring-2 focus:ring-forest-600 focus:outline-none"
                  />
                  <input
                    type="text"
                    value={sellingDistrict}
                    onChange={(e) => setSellingDistrict(e.target.value)}
                    placeholder="District"
                    className="px-3 py-1.5 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:ring-2 focus:ring-forest-600 focus:outline-none"
                  />
                  <input
                    type="text"
                    value={sellingState}
                    onChange={(e) => setSellingState(e.target.value)}
                    placeholder="State"
                    className="px-3 py-1.5 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:ring-2 focus:ring-forest-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Fulfilment & Own Market */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-agriText mb-1">
                    Fulfilment Option
                  </label>
                  <select
                    value={deliveryOption}
                    onChange={(e) => setDeliveryOption(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:ring-2 focus:ring-forest-600 focus:outline-none"
                  >
                    <option value="both">Both Farm Pickup & Delivery</option>
                    <option value="pickup">Farm Pickup Only</option>
                    <option value="delivery">Delivery Available</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-agriText mb-1">
                    Own Stall / Farm Gate?
                  </label>
                  <select
                    value={hasOwnMarket ? 'yes' : 'no'}
                    onChange={(e) => setHasOwnMarket(e.target.value === 'yes')}
                    className="w-full px-3 py-2 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:ring-2 focus:ring-forest-600 focus:outline-none"
                  >
                    <option value="yes">Yes (Direct roadside/farm gate)</option>
                    <option value="no">No (Wholesale/pickup only)</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs text-agriMuted hover:text-agriText font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-forest-600 text-white rounded-xl text-xs font-semibold hover:bg-forest-700"
                >
                  {editingId ? 'Save Changes' : 'Publish Produce Listing'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW INTERESTED BUYERS ENQUIRIES MODAL */}
      {viewingInquiriesProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-agriBorder shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-agriBorder">
              <div>
                <h3 className="font-bold text-base text-agriText">Interested Buyer Leads</h3>
                <p className="text-xs text-agriMuted mt-0.5">{viewingInquiriesProduct.title}</p>
              </div>
              <button
                onClick={() => setViewingInquiriesProduct(null)}
                className="p-1 rounded hover:bg-slate-100"
              >
                <X className="w-5 h-5 text-agriMuted" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {(!viewingInquiriesProduct.interestedBuyers ||
                viewingInquiriesProduct.interestedBuyers.length === 0) ? (
                <div className="py-8 text-center text-xs text-agriMuted">
                  No buyer enquiries submitted for this listing yet.
                </div>
              ) : (
                viewingInquiriesProduct.interestedBuyers.map((lead, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-agriBorder bg-slate-50 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-agriText">{lead.customerName}</span>
                      <span className="text-[10px] text-slate-400">{lead.date}</span>
                    </div>
                    <div className="flex items-center justify-between text-agriMuted">
                      <span>Requested: {lead.requestedQty} {viewingInquiriesProduct.unit}s</span>
                      {lead.offeredPrice && (
                        <span className="font-semibold text-forest-700">
                          Offered: ₹{lead.offeredPrice}/{viewingInquiriesProduct.unit}
                        </span>
                      )}
                    </div>
                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                      <a
                        href={`tel:${lead.customerPhone}`}
                        className="text-forest-700 font-bold flex items-center gap-1.5 hover:underline"
                      >
                        <Phone className="w-3.5 h-3.5" /> Call Buyer ({lead.customerPhone})
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 text-right">
              <button
                onClick={() => setViewingInquiriesProduct(null)}
                className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-semibold text-agriText"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
