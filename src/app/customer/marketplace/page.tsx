'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { translations } from '@/constants/translations';
import { MarketplaceProduct } from '@/types';
import { formatCurrency } from '@/lib/utils';
import {
  ShoppingBag,
  Search,
  Filter,
  MapPin,
  Calendar,
  Phone,
  Truck,
  CheckCircle2,
  Sparkles,
  User,
  X,
  Send,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export default function CustomerMarketplacePage() {
  const { products, updateProduct, customerProfile, language } = useAppStore();
  const t = translations[language] || translations.en;

  // Search & Filter State
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'default'>('default');

  // Detail Modal State
  const [selectedProduct, setSelectedProduct] = useState<MarketplaceProduct | null>(null);

  // Contact Farmer Modal State
  const [contactModalProduct, setContactModalProduct] = useState<MarketplaceProduct | null>(null);
  const [buyerName, setBuyerName] = useState(customerProfile.name || 'Ananya Sharma');
  const [buyerPhone, setBuyerPhone] = useState(customerProfile.phone || '+91 98840 54321');
  const [requestedQty, setRequestedQty] = useState<number>(5);
  const [proposedPrice, setProposedPrice] = useState<number>(0);
  const [enquirySuccess, setEnquirySuccess] = useState(false);

  // Filtered Products
  const filteredProducts = products
    .filter((p) => p.status === 'active')
    .filter((p) => {
      const matchSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.farmerLocation.district.toLowerCase().includes(search.toLowerCase());
      const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchDistrict = selectedDistrict === 'All' || p.farmerLocation.district === selectedDistrict;
      return matchSearch && matchCategory && matchDistrict;
    })
    .sort((a, b) => {
      if (sortOrder === 'asc') return a.pricePerUnit - b.pricePerUnit;
      if (sortOrder === 'desc') return b.pricePerUnit - a.pricePerUnit;
      return 0;
    });

  const handleOpenContact = (prod: MarketplaceProduct) => {
    setContactModalProduct(prod);
    setProposedPrice(prod.pricePerUnit);
    setEnquirySuccess(false);
  };

  const handleSubmitEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactModalProduct) return;

    const newEnquiry = {
      customerName: buyerName,
      customerPhone: buyerPhone,
      requestedQty,
      offeredPrice: proposedPrice,
      date: 'Just now',
    };

    const existingEnquiries = contactModalProduct.interestedBuyers || [];
    updateProduct(contactModalProduct.id, {
      interestedBuyers: [newEnquiry, ...existingEnquiries],
      inquiriesCount: (contactModalProduct.inquiriesCount || 0) + 1,
    });

    setEnquirySuccess(true);
    setTimeout(() => {
      setEnquirySuccess(false);
      setContactModalProduct(null);
    }, 2200);
  };

  // Farmer's other listings in details view
  const farmerOtherListings = selectedProduct
    ? products.filter((p) => p.farmerId === selectedProduct.farmerId && p.id !== selectedProduct.id)
    : [];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-forest-600" />
            <h1 className="text-2xl font-bold text-agriText">Direct Farmer-to-Consumer Market</h1>
          </div>
          <p className="text-xs text-agriMuted mt-1">
            Buy farm-fresh vegetables, grains, coconuts, and spices directly from verified Tamil Nadu farmers without intermediaries.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 text-xs text-emerald-800 font-semibold self-start sm:self-auto">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Fair Trade Guaranteed</span>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-agriBorder shadow-xs space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-agriMuted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.marketplace.searchPlaceholder}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-agriBorder rounded-xl text-xs text-agriText focus:outline-none focus:ring-2 focus:ring-forest-600"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {/* Category Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-agriMuted mb-1">Produce Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:ring-1 focus:ring-forest-600 focus:outline-none"
            >
              <option value="All">All Categories</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Grains & Cereals">Grains & Cereals</option>
              <option value="Fruits">Fruits</option>
              <option value="Pulses">Pulses</option>
              <option value="Spices">Spices</option>
              <option value="Organic Specialty">Organic Specialty</option>
            </select>
          </div>

          {/* District Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-agriMuted mb-1">Farmer District</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:ring-1 focus:ring-forest-600 focus:outline-none"
            >
              <option value="All">All Districts</option>
              <option value="Thanjavur">Thanjavur (Delta)</option>
              <option value="Coimbatore">Coimbatore (Kongu)</option>
              <option value="Madurai">Madurai</option>
              <option value="Erode">Erode</option>
            </select>
          </div>

          {/* Price Sort */}
          <div>
            <label className="block text-[11px] font-semibold text-agriMuted mb-1">Sort by Price</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as any)}
              className="w-full px-3 py-2 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:ring-1 focus:ring-forest-600 focus:outline-none"
            >
              <option value="default">Featured First</option>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            className="bg-white rounded-2xl border border-agriBorder overflow-hidden shadow-xs hover:shadow-md hover:border-forest-200 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Image & Badges */}
              <div className="h-48 w-full relative bg-slate-100 overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(prod)}>
                <img
                  src={prod.images[0]}
                  alt={prod.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
                {prod.isOrganicCertified && (
                  <div className="absolute top-3 left-3 bg-emerald-600 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-2xs">
                    Organic Farm
                  </div>
                )}
                <div className="absolute bottom-2.5 left-2.5 bg-black/60 text-white px-2 py-0.5 rounded-md text-[10px] font-medium">
                  {prod.category}
                </div>
              </div>

              {/* Info */}
              <div className="p-5 space-y-3">
                <div>
                  <h3
                    onClick={() => setSelectedProduct(prod)}
                    className="font-bold text-base text-agriText leading-tight cursor-pointer hover:text-forest-700 transition-colors"
                  >
                    {prod.title}
                  </h3>
                  <p className="text-xs text-agriMuted mt-1 line-clamp-2">{prod.description}</p>
                </div>

                {/* Price and Stock */}
                <div className="p-3 bg-forest-50/50 rounded-xl border border-forest-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-agriMuted block text-[10px]">Direct Farm Price</span>
                    <span className="text-lg font-bold text-forest-800">
                      ₹{prod.pricePerUnit}
                      <span className="text-xs font-normal text-agriMuted"> / {prod.unit}</span>
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-agriMuted block text-[10px]">Stock Ready</span>
                    <span className="font-bold text-agriText">
                      {prod.availableQuantity} {prod.unit}s
                    </span>
                  </div>
                </div>

                {/* Farmer & Location */}
                <div className="space-y-1 text-xs text-agriMuted pt-1">
                  <div className="flex items-center gap-1.5 font-medium text-agriText">
                    <User className="w-3.5 h-3.5 text-forest-600" />
                    <span>Farmer: {prod.farmerName}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>
                      {prod.farmerLocation.village}, {prod.farmerLocation.district}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-slate-400" />
                    <span className="capitalize">{prod.deliveryOption} Fulfilment</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-5 pt-0 space-y-2">
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedProduct(prod)}
                  className="py-2 px-3 border border-agriBorder hover:bg-slate-50 rounded-xl text-xs font-semibold text-agriText text-center"
                >
                  View Details
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenContact(prod)}
                  className="py-2 px-3 bg-forest-600 hover:bg-forest-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Contact Farmer</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PRODUCT DETAILS MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 border border-agriBorder shadow-2xl max-h-[90vh] overflow-y-auto animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-agriBorder">
              <span className="px-2.5 py-0.5 rounded-full bg-forest-100 text-forest-800 text-[10px] font-bold uppercase">
                {selectedProduct.category}
              </span>
              <button
                onClick={() => setSelectedProduct(null)}
                className="p-1 rounded hover:bg-slate-100"
              >
                <X className="w-5 h-5 text-agriMuted" />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div className="h-60 w-full rounded-xl overflow-hidden bg-slate-100">
                <img
                  src={selectedProduct.images[0]}
                  alt={selectedProduct.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="text-xl font-bold text-agriText">{selectedProduct.title}</h3>
                <p className="text-xs text-agriMuted mt-1 leading-relaxed">
                  {selectedProduct.description}
                </p>
              </div>

              {/* Price & Quantity Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-xl text-xs">
                <div>
                  <span className="text-agriMuted block">Price</span>
                  <span className="font-bold text-forest-800 text-base">
                    ₹{selectedProduct.pricePerUnit} / {selectedProduct.unit}
                  </span>
                </div>
                <div>
                  <span className="text-agriMuted block">Available Stock</span>
                  <span className="font-bold text-agriText text-base">
                    {selectedProduct.availableQuantity} {selectedProduct.unit}s
                  </span>
                </div>
                <div>
                  <span className="text-agriMuted block">Harvest Date</span>
                  <span className="font-bold text-agriText">{selectedProduct.harvestDate}</span>
                </div>
                <div>
                  <span className="text-agriMuted block">Delivery</span>
                  <span className="font-bold text-agriText capitalize">
                    {selectedProduct.deliveryOption}
                  </span>
                </div>
              </div>

              {/* Farmer Profile Box */}
              <div className="p-4 bg-forest-50/70 border border-forest-200 rounded-xl space-y-2 text-xs">
                <h4 className="font-bold text-forest-900 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-forest-700" /> Producer Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-forest-950">
                  <p>
                    <span className="text-forest-700">Farmer:</span> {selectedProduct.farmerName}
                  </p>
                  <p>
                    <span className="text-forest-700">Phone:</span> {selectedProduct.farmerPhone}
                  </p>
                  <p>
                    <span className="text-forest-700">Farm Location:</span>{' '}
                    {selectedProduct.farmerLocation.village}, {selectedProduct.farmerLocation.district}
                  </p>
                  <p>
                    <span className="text-forest-700">Direct Roadside Gate:</span>{' '}
                    {selectedProduct.hasOwnMarket ? 'Yes' : 'No'}
                  </p>
                </div>
              </div>

              {/* Farmer's Other Listings */}
              {farmerOtherListings.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <h4 className="font-bold text-xs text-agriText">
                    Other Produce by {selectedProduct.farmerName}:
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {farmerOtherListings.map((other) => (
                      <div
                        key={other.id}
                        onClick={() => setSelectedProduct(other)}
                        className="p-2 border border-agriBorder rounded-lg bg-slate-50 hover:bg-white cursor-pointer transition-colors flex items-center gap-2 text-xs"
                      >
                        <img
                          src={other.images[0]}
                          alt={other.title}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <div className="min-w-0">
                          <p className="font-semibold text-agriText truncate">{other.title}</p>
                          <p className="text-[10px] text-forest-700 font-bold">
                            ₹{other.pricePerUnit} / {other.unit}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex gap-2 justify-end">
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-4 py-2 text-xs text-agriMuted hover:text-agriText font-medium"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const prod = selectedProduct;
                  setSelectedProduct(null);
                  handleOpenContact(prod);
                }}
                className="px-5 py-2 bg-forest-600 text-white rounded-xl text-xs font-semibold hover:bg-forest-700 flex items-center gap-1.5 shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Contact Farmer to Purchase</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONTACT FARMER / SUBMIT BUY ENQUIRY MODAL */}
      {contactModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-agriBorder shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-agriBorder">
              <div>
                <h3 className="font-bold text-base text-agriText">Contact Farmer Directly</h3>
                <p className="text-xs text-agriMuted mt-0.5">{contactModalProduct.title}</p>
              </div>
              <button
                onClick={() => setContactModalProduct(null)}
                className="p-1 rounded hover:bg-slate-100"
              >
                <X className="w-5 h-5 text-agriMuted" />
              </button>
            </div>

            {enquirySuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-sm text-agriText">Enquiry Sent to Farmer!</h4>
                <p className="text-xs text-agriMuted max-w-xs mx-auto">
                  Farmer <strong>{contactModalProduct.farmerName}</strong> has been notified with your offer details. You can also call them directly.
                </p>
                <div className="pt-2">
                  <a
                    href={`tel:${contactModalProduct.farmerPhone}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-forest-600 text-white rounded-xl text-xs font-bold hover:bg-forest-700"
                  >
                    <Phone className="w-4 h-4" /> Call Now ({contactModalProduct.farmerPhone})
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitEnquiry} className="mt-4 space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-agriText mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:ring-2 focus:ring-forest-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-agriText mb-1">
                    Your Contact Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:ring-2 focus:ring-forest-600 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-agriText mb-1">
                      Required Quantity ({contactModalProduct.unit}s)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max={contactModalProduct.availableQuantity}
                      required
                      value={requestedQty}
                      onChange={(e) => setRequestedQty(parseInt(e.target.value) || 1)}
                      className="w-full px-3 py-2 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:ring-2 focus:ring-forest-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-agriText mb-1">
                      Proposed Price (₹ / {contactModalProduct.unit})
                    </label>
                    <input
                      type="number"
                      required
                      value={proposedPrice}
                      onChange={(e) => setProposedPrice(parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:ring-2 focus:ring-forest-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="p-3 bg-forest-50/60 rounded-xl border border-forest-100 flex items-center justify-between text-xs">
                  <span className="text-forest-900 font-medium">Estimated Total Amount:</span>
                  <span className="font-bold text-forest-800 text-sm">
                    {formatCurrency(requestedQty * proposedPrice)}
                  </span>
                </div>

                <div className="pt-2 flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setContactModalProduct(null)}
                    className="px-4 py-2 text-xs text-agriMuted hover:text-agriText font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-forest-600 text-white rounded-xl text-xs font-semibold hover:bg-forest-700 flex items-center gap-1.5 shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Enquiry to Farmer</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
