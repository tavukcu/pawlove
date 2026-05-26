'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Box, User as UserIcon, Heart, ChevronRight } from 'lucide-react';
import { formatCurrency } from 'src/utils/format';

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variantName?: string;
}

interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: 'pending_payment' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}

export default function Profile() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedOrders = localStorage.getItem('pawlove_orders');
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (e) {
        console.error('Failed to parse orders', e);
      }
    }
    setIsLoaded(true);
  }, []);

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return { label: 'Hazırlanıyor', color: 'bg-blue-50 text-blue-700' };
      case 'shipped':
        return { label: 'Kargoya Verildi', color: 'bg-amber-50 text-amber-700' };
      case 'delivered':
        return { label: 'Teslim Edildi', color: 'bg-emerald-50 text-emerald-700' };
      case 'cancelled':
        return { label: 'İptal Edildi', color: 'bg-red-50 text-red-700' };
      default:
        return { label: 'Beklemede', color: 'bg-neutral-50 text-neutral-700' };
    }
  };

  return (
    <div className="bg-white min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-8 border-b border-neutral-100 mb-10 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-neutral-50 flex items-center justify-center border border-neutral-100 text-neutral-700">
              <UserIcon size={22} strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-xl font-medium text-neutral-900">Sevgili Halil</h1>
              <p className="text-[11px] text-neutral-400 font-light mt-0.5">pawlove Ayrıcalıklı Müşterisi</p>
            </div>
          </div>
          <div className="text-xs text-neutral-500 font-light sm:text-right">
            <span>Katılım Tarihi: Mayıs 2026</span>
          </div>
        </div>

        {/* Dashboard Sections */}
        <div className="space-y-10">
          {/* Sipariş Takibi */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-neutral-800">
              <Box size={16} strokeWidth={1.5} />
              <h2 className="text-sm font-semibold tracking-wide uppercase">Siparişlerim</h2>
            </div>

            {!isLoaded ? (
              <div className="py-12 flex justify-center">
                <div className="w-5 h-5 rounded-full border-2 border-neutral-200 border-t-neutral-900 animate-spin"></div>
              </div>
            ) : orders.length === 0 ? (
              <div className="border border-neutral-100 rounded-2xl p-8 sm:p-12 text-center bg-neutral-50/50 space-y-4">
                <div className="w-10 h-10 rounded-full bg-neutral-100/80 flex items-center justify-center mx-auto text-neutral-400">
                  <Box size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-neutral-800">Henüz Siparişiniz Bulunmuyor</p>
                  <p className="text-[11px] text-neutral-400 font-light mt-1">
                    Eşsiz evcil hayvan mobilyalarını ve aksesuarlarını keşfedip ilk siparişinizi hemen oluşturabilirsiniz.
                  </p>
                </div>
                <Link
                  href="/shop"
                  className="inline-block bg-neutral-950 text-white text-xs font-semibold px-6 py-2.5 rounded-lg hover:bg-neutral-800 transition-colors"
                >
                  Koleksiyonu İncele
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => {
                  const status = getStatusText(order.status);
                  return (
                    <div
                      key={order.id}
                      className="border border-neutral-100 rounded-xl overflow-hidden shadow-sm bg-white"
                    >
                      {/* Order Header */}
                      <div className="bg-neutral-50 px-5 py-4 border-b border-neutral-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
                        <div className="flex flex-wrap gap-x-6 gap-y-1 text-[11px] text-neutral-500">
                          <div>
                            <span className="font-light">Sipariş No:</span>{' '}
                            <span className="font-semibold text-neutral-900">{order.id}</span>
                          </div>
                          <div>
                            <span className="font-light">Tarih:</span>{' '}
                            <span className="font-medium text-neutral-800">
                              {new Date(order.createdAt).toLocaleDateString('tr-TR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </span>
                          </div>
                          <div>
                            <span className="font-light">Toplam:</span>{' '}
                            <span className="font-semibold text-neutral-900">{formatCurrency(order.total)}</span>
                          </div>
                        </div>

                        {/* Status tag */}
                        <span className={`self-start sm:self-auto text-[10px] font-semibold px-3 py-1 rounded-full uppercase tracking-wide ${status.color}`}>
                          {status.label}
                        </span>
                      </div>

                      {/* Order Items */}
                      <div className="divide-y divide-neutral-50 px-5">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="py-4 flex items-center justify-between text-xs gap-4">
                            <div className="flex items-center space-x-3">
                              <div className="relative w-12 h-12 bg-neutral-50 rounded border border-neutral-100 overflow-hidden shrink-0">
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                  sizes="48px"
                                />
                              </div>
                              <div className="min-w-0">
                                <h4 className="font-medium text-neutral-950 truncate max-w-[200px] sm:max-w-[340px]">
                                  {item.name}
                                </h4>
                                {item.variantName && (
                                  <p className="text-[10px] text-neutral-400 mt-0.5">{item.variantName}</p>
                                )}
                                <p className="text-[10px] text-neutral-400 mt-0.5">Adet: {item.quantity}</p>
                              </div>
                            </div>

                            <span className="font-semibold text-neutral-900 shrink-0">
                              {formatCurrency(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Favoriler (Favorites Placeholder) */}
          <div className="space-y-4 pt-6 border-t border-neutral-100">
            <div className="flex items-center space-x-2 text-neutral-800">
              <Heart size={16} strokeWidth={1.5} />
              <h2 className="text-sm font-semibold tracking-wide uppercase">Favori Ürünlerim</h2>
            </div>
            
            <div className="border border-neutral-100 rounded-xl p-5 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-3 text-neutral-500 font-light">
                <div className="w-8 h-8 rounded-lg bg-neutral-50 flex items-center justify-center text-neutral-400">
                  <Heart size={14} />
                </div>
                <span>Kaydettiğiniz premium ürünler burada listelenecektir.</span>
              </div>
              <Link href="/shop" className="text-neutral-900 hover:underline flex items-center font-medium">
                <span>Eklemeye Başla</span>
                <ChevronRight size={12} />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
