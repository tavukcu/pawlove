'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, DollarSign, Package, ArrowUpRight, TrendingUp } from 'lucide-react';
import { formatCurrency } from 'src/utils/format';
import { useProducts } from 'src/context/ProductContext';

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  total: number;
  status: 'pending_payment' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  items: OrderItem[];
}

export default function AdminDashboard() {
  const { products } = useProducts();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem('pawlove_orders');
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Compute stats
  const totalSales = orders.reduce((sum, order) => {
    return order.status !== 'cancelled' ? sum + order.total : sum;
  }, 0);

  const totalOrders = orders.length;
  const averageOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return <span className="bg-blue-50 text-blue-700 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase">Hazırlanıyor</span>;
      case 'shipped':
        return <span className="bg-amber-50 text-amber-700 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase">Kargoda</span>;
      case 'delivered':
        return <span className="bg-emerald-50 text-emerald-700 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase">Teslim Edildi</span>;
      case 'cancelled':
        return <span className="bg-red-50 text-red-700 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase">İptal Edildi</span>;
      default:
        return <span className="bg-neutral-50 text-neutral-700 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase">Beklemede</span>;
    }
  };

  const statCards = [
    {
      title: 'Toplam Satış (Ciro)',
      value: formatCurrency(totalSales),
      icon: DollarSign,
      color: 'text-emerald-600 bg-emerald-50',
      description: 'İptaller hariç net ciro'
    },
    {
      title: 'Toplam Sipariş',
      value: totalOrders.toString(),
      icon: ShoppingBag,
      color: 'text-blue-600 bg-blue-50',
      description: 'Gelen tüm siparişler'
    },
    {
      title: 'Ort. Sipariş Tutarı',
      value: formatCurrency(averageOrderValue),
      icon: TrendingUp,
      color: 'text-purple-600 bg-purple-50',
      description: 'Sepet ortalaması'
    },
    {
      title: 'Toplam Stok Adedi',
      value: totalStock.toString(),
      icon: Package,
      color: 'text-amber-600 bg-amber-50',
      description: `Katalogda ${products.length} farklı ürün`
    }
  ];

  return (
    <div className="space-y-10">
      
      {/* Title Header */}
      <div>
        <h1 className="text-2xl font-light text-neutral-900 tracking-tight">Genel Bakış</h1>
        <p className="text-xs text-neutral-400 font-light mt-1">Mağazanızın performansı ve son hareketler.</p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white border border-neutral-100 rounded-xl p-5 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">{stat.title}</span>
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <Icon size={16} strokeWidth={1.5} />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-neutral-900 tracking-tight">{stat.value}</h3>
                <p className="text-[10px] text-neutral-400 font-light mt-1">{stat.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Orders and Catalog status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Latest Orders Column */}
        <div className="lg:col-span-2 bg-white border border-neutral-100 rounded-xl p-6 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-neutral-50 pb-4">
            <h3 className="text-sm font-semibold text-neutral-900 tracking-wide uppercase">Son Siparişler</h3>
            <Link
              href="/admin/orders"
              className="text-[11px] font-semibold text-neutral-500 hover:text-black flex items-center space-x-1 transition-colors"
            >
              <span>Tümünü Gör</span>
              <ArrowUpRight size={12} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            {orders.length === 0 ? (
              <div className="py-12 text-center text-xs text-neutral-400 font-light">
                Henüz sipariş verilmemiş.
              </div>
            ) : (
              <table className="w-full text-left text-xs font-light divide-y divide-neutral-50">
                <thead>
                  <tr className="text-neutral-400 font-medium">
                    <th className="pb-3">Sipariş ID</th>
                    <th className="pb-3">Tarih</th>
                    <th className="pb-3">Ürünler</th>
                    <th className="pb-3">Tutar</th>
                    <th className="pb-3 text-right">Durum</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-50 text-neutral-700">
                  {orders.slice(0, 5).map((order) => (
                    <tr key={order.id} className="hover:bg-neutral-50/50">
                      <td className="py-3.5 font-medium text-neutral-900">{order.id}</td>
                      <td className="py-3.5">
                        {new Date(order.createdAt).toLocaleDateString('tr-TR', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>
                      <td className="py-3.5 max-w-[150px] truncate">
                        {order.items.map((it) => `${it.name} (${it.quantity}x)`).join(', ')}
                      </td>
                      <td className="py-3.5 font-medium">{formatCurrency(order.total)}</td>
                      <td className="py-3.5 text-right">{getStatusBadge(order.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white border border-neutral-100 rounded-xl p-6 shadow-sm space-y-6">
          <div className="border-b border-neutral-50 pb-4">
            <h3 className="text-sm font-semibold text-neutral-900 tracking-wide uppercase">Kritik Stok Uyarısı</h3>
            <p className="text-[10px] text-neutral-400 font-light mt-0.5">Stok adedi 15 ve altında olan ürünler.</p>
          </div>

          <div className="space-y-4">
            {products.filter((p) => p.stock <= 15).length === 0 ? (
              <div className="py-8 text-center text-xs text-neutral-400 font-light">
                Tüm ürünler yeterli stoka sahip. 👍
              </div>
            ) : (
              products
                .filter((p) => p.stock <= 15)
                .map((p) => (
                  <div key={p.id} className="flex justify-between items-center text-xs">
                    <div className="min-w-0">
                      <h4 className="font-medium text-neutral-800 truncate max-w-[180px]">{p.name}</h4>
                      <span className="text-[10px] text-neutral-400 font-light">Kategori: {p.categoryId === 'furniture' ? 'Mobilya' : 'Diğer'}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded font-semibold ${p.stock === 0 ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>
                      {p.stock} adet
                    </span>
                  </div>
                ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
