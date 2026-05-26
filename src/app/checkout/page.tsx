'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CreditCard, ShoppingBag, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { useCart } from 'src/context/CartContext';
import { formatCurrency } from 'src/utils/format';

export default function Checkout() {
  const { cart, subtotal, shippingFee, total, clearCart } = useCart();

  // Form states
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    zipCode: '',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call to DB and iyzico
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderSuccess(true);
      const generatedOrderId = 'PL-' + Math.floor(Math.random() * 900000 + 100000);
      setOrderId(generatedOrderId);
      
      // Save order in local history for dashboard
      const savedOrders = localStorage.getItem('pawlove_orders');
      const orderList = savedOrders ? JSON.parse(savedOrders) : [];
      const newOrder = {
        id: generatedOrderId,
        items: cart,
        total: total,
        status: 'processing',
        createdAt: new Date().toISOString(),
        customerName: `${formData.firstName} ${formData.lastName}`,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        shippingAddress: `${formData.address}, ${formData.district}/${formData.city}`,
      };
      localStorage.setItem('pawlove_orders', JSON.stringify([newOrder, ...orderList]));
      
      clearCart();
    }, 2000);
  };

  // If cart is empty and order wasn't successfully placed, show empty state
  if (cart.length === 0 && !orderSuccess) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 px-4 text-center">
        <div className="w-12 h-12 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-400">
          <ShoppingBag size={20} strokeWidth={1.5} />
        </div>
        <div>
          <h2 className="text-lg font-medium text-neutral-800">Sepetiniz Boş</h2>
          <p className="text-xs text-neutral-400 mt-1 max-w-xs font-light">
            Ödeme sayfasına geçebilmek için sepetinizde en az bir ürün bulunmalıdır.
          </p>
        </div>
        <Link
          href="/shop"
          className="bg-neutral-950 text-white text-xs font-semibold px-6 py-3 rounded-lg hover:bg-neutral-800 transition-colors"
        >
          Alışverişe Başla
        </Link>
      </div>
    );
  }

  // Success Screen
  if (orderSuccess) {
    return (
      <div className="bg-white min-h-[80vh] flex items-center py-12 sm:py-20">
        <div className="max-w-md mx-auto px-6 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 size={36} strokeWidth={1.5} className="animate-bounce" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-neutral-900">Siparişiniz Alındı!</h1>
            <p className="text-xs text-neutral-500 font-light leading-relaxed">
              Siparişiniz başarıyla oluşturuldu ve ödemeniz güvenli şekilde iyzico altyapısıyla gerçekleştirildi.
            </p>
          </div>

          <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-100 text-left text-xs space-y-3">
            <div className="flex justify-between">
              <span className="text-neutral-400">Sipariş Numarası:</span>
              <span className="font-semibold text-neutral-900">{orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">E-posta:</span>
              <span className="font-medium text-neutral-800">{formData.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Teslimat Adresi:</span>
              <span className="font-medium text-neutral-800 text-right truncate max-w-[200px]">{formData.address}</span>
            </div>
            <div className="border-t border-neutral-200/50 pt-3 flex justify-between font-semibold text-sm text-neutral-900">
              <span>Ödenen Tutar:</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="flex-1 bg-neutral-950 text-white text-xs font-semibold py-3 rounded-lg hover:bg-neutral-800 transition-colors"
            >
              Anasayfaya Dön
            </Link>
            <Link
              href="/profile"
              className="flex-1 bg-white border border-neutral-200 text-neutral-700 text-xs font-medium py-3 rounded-lg hover:bg-neutral-50 transition-colors"
            >
              Sipariş Takibi
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-neutral-900 mb-10 sm:mb-12">
          Güvenli Ödeme
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Forms */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-10">
            {/* 1. Contact Information */}
            <div className="space-y-4">
              <h2 className="text-sm font-semibold text-neutral-900 tracking-wide uppercase border-b border-neutral-100 pb-2">
                1. İletişim Bilgileri
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">E-Posta</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-50 border border-neutral-200 text-neutral-800 text-[11px] px-3.5 py-3 rounded-lg focus:outline-none focus:border-neutral-950 focus:bg-white transition-all"
                    placeholder="ornek@posta.com"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Telefon</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-50 border border-neutral-200 text-neutral-800 text-[11px] px-3.5 py-3 rounded-lg focus:outline-none focus:border-neutral-950 focus:bg-white transition-all"
                    placeholder="0555 555 5555"
                  />
                </div>
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div className="space-y-4">
              <h2 className="text-sm font-semibold text-neutral-900 tracking-wide uppercase border-b border-neutral-100 pb-2">
                2. Teslimat Adresi
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Ad</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-50 border border-neutral-200 text-neutral-800 text-[11px] px-3.5 py-3 rounded-lg focus:outline-none focus:border-neutral-950 focus:bg-white transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Soyad</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-50 border border-neutral-200 text-neutral-800 text-[11px] px-3.5 py-3 rounded-lg focus:outline-none focus:border-neutral-950 focus:bg-white transition-all"
                  />
                </div>
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Açık Adres</label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-50 border border-neutral-200 text-neutral-800 text-[11px] px-3.5 py-3 rounded-lg focus:outline-none focus:border-neutral-950 focus:bg-white transition-all"
                    placeholder="Mahalle, sokak, daire no vb."
                  />
                </div>
                <div className="grid grid-cols-3 sm:col-span-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">İl</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full bg-neutral-50 border border-neutral-200 text-neutral-800 text-[11px] px-3.5 py-3 rounded-lg focus:outline-none focus:border-neutral-950 focus:bg-white transition-all"
                      placeholder="İstanbul"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">İlçe</label>
                    <input
                      type="text"
                      name="district"
                      required
                      value={formData.district}
                      onChange={handleInputChange}
                      className="w-full bg-neutral-50 border border-neutral-200 text-neutral-800 text-[11px] px-3.5 py-3 rounded-lg focus:outline-none focus:border-neutral-950 focus:bg-white transition-all"
                      placeholder="Beşiktaş"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Posta Kodu</label>
                    <input
                      type="text"
                      name="zipCode"
                      required
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full bg-neutral-50 border border-neutral-200 text-neutral-800 text-[11px] px-3.5 py-3 rounded-lg focus:outline-none focus:border-neutral-950 focus:bg-white transition-all"
                      placeholder="34340"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Payment Details */}
            <div className="space-y-4">
              <h2 className="text-sm font-semibold text-neutral-900 tracking-wide uppercase border-b border-neutral-100 pb-2">
                3. Kart Bilgileri (iyzico Güvencesiyle)
              </h2>
              <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-100 space-y-4">
                <div className="flex items-center space-x-2 text-neutral-600 text-[11px] mb-2">
                  <CreditCard size={14} />
                  <span>Kredi Kartı veya Banka Kartı</span>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider">Kart Üzerindeki İsim</label>
                  <input
                    type="text"
                    name="cardName"
                    required
                    value={formData.cardName}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-neutral-200 text-neutral-800 text-[11px] px-3.5 py-3 rounded-lg focus:outline-none focus:border-neutral-950 transition-all"
                    placeholder="Kart Sahibi"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider">Kart Numarası</label>
                  <input
                    type="text"
                    name="cardNumber"
                    required
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-neutral-200 text-neutral-800 text-[11px] px-3.5 py-3 rounded-lg focus:outline-none focus:border-neutral-950 transition-all"
                    placeholder="0000 0000 0000 0000"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider">Son Kullanma Tarihi</label>
                    <input
                      type="text"
                      name="cardExpiry"
                      required
                      value={formData.cardExpiry}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-neutral-200 text-neutral-800 text-[11px] px-3.5 py-3 rounded-lg focus:outline-none focus:border-neutral-950 transition-all"
                      placeholder="AA/YY"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider">CVC / CVC2</label>
                    <input
                      type="text"
                      name="cardCvc"
                      required
                      value={formData.cardCvc}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-neutral-200 text-neutral-800 text-[11px] px-3.5 py-3 rounded-lg focus:outline-none focus:border-neutral-950 transition-all"
                      placeholder="000"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-neutral-950 hover:bg-neutral-800 disabled:bg-neutral-400 text-white text-center text-xs font-bold py-4 rounded-lg flex items-center justify-center space-x-2 shadow-sm transition-all focus:outline-none"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                    <span>Ödeme İşleniyor...</span>
                  </>
                ) : (
                  <>
                    <span>Siparişi Tamamla ({formatCurrency(total)})</span>
                    <ArrowRight size={13} />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 bg-neutral-50/50 border border-neutral-100 rounded-2xl p-6 sm:p-8 lg:sticky lg:top-24 space-y-6">
            <h2 className="text-xs font-semibold text-neutral-900 tracking-wider uppercase border-b border-neutral-200/50 pb-3 flex items-center justify-between">
              <span>Sipariş Özeti</span>
              <span className="text-[10px] text-neutral-400 normal-case font-light">({cart.length} ürün)</span>
            </h2>

            {/* Cart Items List */}
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin">
              {cart.map((item) => (
                <div key={`${item.productId}-${item.variantId || ''}`} className="flex items-center space-x-3 text-xs">
                  <div className="relative w-12 h-12 bg-white rounded border border-neutral-100 overflow-hidden shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="text-neutral-800 font-medium truncate">{item.name}</h4>
                    {item.variantName && <p className="text-[10px] text-neutral-400 mt-0.5">{item.variantName}</p>}
                    <p className="text-[10px] text-neutral-400 mt-0.5">Adet: {item.quantity}</p>
                  </div>
                  <span className="font-semibold text-neutral-900 shrink-0">{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            {/* Price lines */}
            <div className="border-t border-neutral-200/50 pt-4 space-y-2 text-xs">
              <div className="flex justify-between text-neutral-500">
                <span>Ara Toplam</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-neutral-500">
                <span>Kargo</span>
                <span>{shippingFee === 0 ? 'Ücretsiz' : formatCurrency(shippingFee)}</span>
              </div>
              <div className="border-t border-neutral-200/50 pt-3 flex justify-between font-semibold text-sm text-neutral-900">
                <span>Toplam</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>

            {/* Trust badge */}
            <div className="pt-2 flex items-center space-x-2 text-[10px] text-neutral-400 font-light leading-relaxed">
              <ShieldCheck size={14} className="text-neutral-500 shrink-0" />
              <span>
                Kart ödemeleriniz SSL güvenlik sertifikalı iyzico altyapısıyla şifrelenerek gerçekleştirilir.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
