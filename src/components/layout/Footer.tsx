'use client';

import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-100 text-neutral-600 text-xs font-light py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand Info */}
          <div className="flex flex-col space-y-4">
            <span className="font-semibold text-sm tracking-tight text-neutral-900">paw<span className="text-neutral-500 font-light">love</span></span>
            <p className="leading-relaxed max-w-xs">
              Evcil hayvan sahipleri için yüksek standartlarda tasarlanmış mobilya, aksesuar, organik gıda ve yenilikçi teknolojiler sunan premium bir yaşam tarzı markası.
            </p>
          </div>

          {/* Shop Categories */}
          <div className="flex flex-col space-y-3">
            <h4 className="font-medium text-neutral-900 text-[13px] tracking-wide">Koleksiyonlar</h4>
            <ul className="space-y-2 flex flex-col">
              <li><Link href="/shop?category=furniture" className="hover:text-black transition-colors">Mobilya</Link></li>
              <li><Link href="/shop?category=accessories" className="hover:text-black transition-colors">Aksesuar</Link></li>
              <li><Link href="/shop?category=health" className="hover:text-black transition-colors">Sağlık & Vitamin</Link></li>
              <li><Link href="/shop?category=cleaning" className="hover:text-black transition-colors">Kum & Temizlik</Link></li>
            </ul>
          </div>

          {/* Corporate / Support */}
          <div className="flex flex-col space-y-3">
            <h4 className="font-medium text-neutral-900 text-[13px] tracking-wide">Destek ve Kurumsal</h4>
            <ul className="space-y-2 flex flex-col">
              <li><Link href="#" className="hover:text-black transition-colors">Hakkımızda</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Sıkça Sorulan Sorular</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Teslimat & İade</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">İletişim</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col space-y-3">
            <h4 className="font-medium text-neutral-900 text-[13px] tracking-wide">Bültene Katılın</h4>
            <p className="leading-relaxed mb-1">
              Yeni koleksiyonlar, özel teklifler ve premium evcil hayvan bakım ipuçları hakkında ilk siz bilgi edinin.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex space-x-2">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="bg-white border border-neutral-200 text-neutral-800 text-[11px] px-3 py-2 rounded-md w-full focus:outline-none focus:border-neutral-950 transition-colors"
                required
              />
              <button
                type="submit"
                className="bg-neutral-950 text-white text-[11px] font-medium px-4 py-2 rounded-md hover:bg-neutral-800 transition-colors shrink-0"
              >
                Kaydol
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Area */}
        <div className="border-t border-neutral-200/50 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 text-[11px] text-neutral-400">
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center sm:justify-start">
            <Link href="#" className="hover:text-neutral-600 transition-colors">Gizlilik Politikası</Link>
            <Link href="#" className="hover:text-neutral-600 transition-colors">Mesafeli Satış Sözleşmesi</Link>
            <Link href="#" className="hover:text-neutral-600 transition-colors">Çerez Ayarları</Link>
          </div>
          <div>
            © {new Date().getFullYear()} pawlove. Her hakkı saklıdır.
          </div>
        </div>
      </div>
    </footer>
  );
};
