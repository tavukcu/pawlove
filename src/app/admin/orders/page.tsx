'use client';

import React, { useState, useEffect } from 'react';
import { ClipboardList, ChevronDown, ChevronUp, User, MapPin, Phone, Mail } from 'lucide-react';
import { formatCurrency } from 'src/utils/format';

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  variantName?: string;
}

interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: 'pending_payment' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  shippingAddress?: string;
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  // Load orders
  useEffect(() => {
    const savedOrders = localStorage.getItem('pawlove_orders');
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (e) {
        console.error(e);
      }
    }
    setIsLoaded(true);
  }, []);

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('pawlove_orders', JSON.stringify(updatedOrders));
  };

  const toggleExpand = (orderId: string) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  const getStatusStyle = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'shipped':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-100';
      default:
        return 'bg-neutral-50 text-neutral-700 border-neutral-100';
    }
  };

  return (
    <div className="space-y-10">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-light text-neutral-900 tracking-tight">Sipariş Yönetimi</h1>
        <p className="text-xs text-neutral-400 font-light mt-1">Gelen siparişleri takip edin ve kargo durumlarını güncelleyin.</p>
      </div>

      {/* Orders List Container */}
      <div className="bg-white border border-neutral-100 rounded-xl shadow-sm overflow-hidden">
        
        {/* Empty state */}
        {!isLoaded ? (
          <div className="py-20 flex justify-center">
            <div className="w-5 h-5 rounded-full border-2 border-neutral-200 border-t-neutral-900 animate-spin"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center mx-auto text-neutral-400">
              <ClipboardList size={18} strokeWidth={1.5} />
            </div>
            <p className="text-xs font-medium text-neutral-800">Henüz sipariş verilmemiş.</p>
            <p className="text-[10px] text-neutral-400 font-light max-w-xs mx-auto">
              Mağazanızdan bir sipariş tamamlandığında bu listede anında görüntülenecektir.
            </p>
          </div>
        ) : (
          /* Table / List */
          <div className="divide-y divide-neutral-100">
            {orders.map((order) => {
              const isExpanded = expandedOrderId === order.id;
              const statusStyle = getStatusStyle(order.status);

              return (
                <div key={order.id} className="transition-all hover:bg-neutral-50/20">
                  
                  {/* Order Main Row */}
                  <div
                    onClick={() => toggleExpand(order.id)}
                    className="px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 cursor-pointer select-none text-xs"
                  >
                    {/* General Info */}
                    <div className="flex flex-wrap gap-x-8 gap-y-2 items-center flex-grow">
                      <div>
                        <p className="font-semibold text-neutral-900">{order.id}</p>
                        <span className="text-[10px] text-neutral-400 font-light">
                          {new Date(order.createdAt).toLocaleDateString('tr-TR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>

                      {/* Customer Name */}
                      <div>
                        <p className="text-neutral-400 font-light">Müşteri</p>
                        <p className="font-medium text-neutral-800">{order.customerName || 'Misafir Kullanıcı'}</p>
                      </div>

                      {/* Item quantity */}
                      <div>
                        <p className="text-neutral-400 font-light">Ürün Adedi</p>
                        <p className="font-medium text-neutral-800">
                          {order.items.reduce((sum, it) => sum + it.quantity, 0)} Adet
                        </p>
                      </div>

                      {/* Total */}
                      <div>
                        <p className="text-neutral-400 font-light">Toplam Tutar</p>
                        <p className="font-semibold text-neutral-950">{formatCurrency(order.total)}</p>
                      </div>
                    </div>

                    {/* Status select & Expand button */}
                    <div className="flex items-center space-x-3 shrink-0 self-start sm:self-auto" onClick={(e) => e.stopPropagation()}>
                      {/* Status select dropdown */}
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                        className={`appearance-none border text-[10px] font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider cursor-pointer focus:outline-none ${statusStyle}`}
                      >
                        <option value="processing">Hazırlanıyor</option>
                        <option value="shipped">Kargoya Verildi</option>
                        <option value="delivered">Teslim Edildi</option>
                        <option value="cancelled">İptal Etildi</option>
                      </select>

                      <button
                        onClick={() => toggleExpand(order.id)}
                        className="p-1 rounded-full text-neutral-400 hover:text-black transition-colors"
                        aria-label="Toggle Details"
                      >
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </div>

                  </div>

                  {/* Expanded Details Section */}
                  {isExpanded && (
                    <div className="px-6 pb-6 pt-2 bg-neutral-50/50 border-t border-neutral-100/50 grid grid-cols-1 md:grid-cols-12 gap-6 text-xs">
                      
                      {/* Left: Shipping and Customer profile info */}
                      <div className="md:col-span-5 space-y-4 border-r border-neutral-100/80 pr-6">
                        <h4 className="font-semibold text-[11px] text-neutral-400 uppercase tracking-wider mb-2">Teslimat & İletişim</h4>
                        
                        <div className="space-y-3 font-normal text-neutral-600">
                          <div className="flex items-start space-x-2">
                            <User size={14} className="text-neutral-400 shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium text-neutral-900">{order.customerName}</p>
                            </div>
                          </div>
                          
                          {order.customerEmail && (
                            <div className="flex items-center space-x-2">
                              <Mail size={14} className="text-neutral-400 shrink-0" />
                              <span className="truncate">{order.customerEmail}</span>
                            </div>
                          )}
                          
                          {order.customerPhone && (
                            <div className="flex items-center space-x-2">
                              <Phone size={14} className="text-neutral-400 shrink-0" />
                              <span>{order.customerPhone}</span>
                            </div>
                          )}
                          
                          {order.shippingAddress && (
                            <div className="flex items-start space-x-2">
                              <MapPin size={14} className="text-neutral-400 shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{order.shippingAddress}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right: Ordered Products List */}
                      <div className="md:col-span-7 space-y-3">
                        <h4 className="font-semibold text-[11px] text-neutral-400 uppercase tracking-wider mb-2">Sipariş Kalemleri</h4>
                        
                        <div className="divide-y divide-neutral-100">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="py-2.5 flex items-center justify-between text-[11px]">
                              <div className="min-w-0 pr-4">
                                <p className="font-medium text-neutral-800 truncate">{item.name}</p>
                                {item.variantName && (
                                  <span className="text-[9px] text-neutral-400 mt-0.5 block">{item.variantName}</span>
                                )}
                                <span className="text-[10px] text-neutral-400 block mt-0.5">Adet: {item.quantity} x {formatCurrency(item.price)}</span>
                              </div>
                              <span className="font-semibold text-neutral-900 shrink-0">
                                {formatCurrency(item.price * item.quantity)}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Order Summary Pricing Details */}
                        <div className="border-t border-neutral-200/50 pt-3 flex justify-between font-semibold text-xs text-neutral-950">
                          <span>Sipariş Toplamı</span>
                          <span>{formatCurrency(order.total)}</span>
                        </div>
                      </div>

                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}

      </div>

    </div>
  );
}
