'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { ProductCard } from 'src/components/product/ProductCard';
import { useProducts } from 'src/context/ProductContext';

export default function Home() {
  const { products, categories } = useProducts();
  const featuredProducts = products.filter((p) => p.isFeatured);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section (Apple Aesthetic) */}
      <section className="relative w-full h-[85vh] flex items-center justify-between bg-neutral-50 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-banner.png"
            alt="pawlove premium living space"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Gentle Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/20 to-transparent md:bg-gradient-to-r md:from-white/70 md:via-white/30 md:to-transparent" />
        </div>

        {/* Text Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-center h-full">
          <div className="max-w-xl flex flex-col space-y-4 md:space-y-6 pt-16">
            <span className="text-[11px] font-bold tracking-widest text-neutral-500 uppercase flex items-center space-x-1.5">
              <span>EST. 2026</span>
              <span className="w-1 h-1 rounded-full bg-neutral-400"></span>
              <span>ULTRA PREMIUM DESIGN</span>
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-neutral-900 leading-none">
              Evcil dostunuz için <br />
              <span className="font-semibold text-neutral-950">en seçkin yaşam.</span>
            </h1>
            <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed max-w-md">
              Apple tasarım çizgisinden ilham alan minimalist ahşap mobilyalar, organik takviyeler ve yenilikçi teknolojilerle evcil hayvan yaşam standartlarını yeniden tanımlıyoruz.
            </p>
            <div className="flex flex-row space-x-3 pt-2">
              <Link
                href="/shop"
                className="bg-neutral-950 text-white text-xs font-semibold px-6 py-3 rounded-lg hover:bg-neutral-800 transition-all shadow-sm flex items-center space-x-1.5"
              >
                <span>Koleksiyonları Keşfet</span>
                <ArrowRight size={13} />
              </Link>
              <Link
                href="/shop?category=furniture"
                className="bg-white/80 backdrop-blur-sm border border-neutral-200 text-neutral-800 text-xs font-semibold px-6 py-3 rounded-lg hover:bg-white transition-colors"
              >
                Mobilyaları Gör
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Premium Category Grid */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-lg mx-auto mb-12 sm:mb-16">
            <span className="text-[10px] text-neutral-400 font-semibold tracking-widest uppercase mb-2 block">
              Kategoriler
            </span>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-neutral-950">
              Dostunuzun tüm ihtiyaçları <br />
              <span className="font-medium text-neutral-950">tek bir koleksiyonda.</span>
            </h2>
          </div>

          {/* Asymmetric Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {categories.map((cat, idx) => {
              // Alternate sizes for dynamic aesthetic
              const gridSpan = idx === 0 || idx === 3 ? 'md:col-span-7' : 'md:col-span-5';
              return (
                <Link
                  key={cat.id}
                  href={`/shop?category=${cat.id}`}
                  className={`group relative h-[280px] sm:h-[340px] overflow-hidden bg-neutral-50 rounded-2xl flex items-end p-6 sm:p-8 ${gridSpan} border border-neutral-100 hover:shadow-sm transition-all duration-300`}
                >
                  {/* Category Image */}
                  <div className="absolute inset-0 z-0 transition-transform duration-700 ease-out group-hover:scale-[1.02]">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  </div>

                  {/* Category Content */}
                  <div className="relative z-10 text-white w-full flex flex-col justify-end">
                    <h3 className="text-lg sm:text-xl font-medium tracking-tight mb-1">{cat.name}</h3>
                    <p className="text-[11px] font-light text-neutral-200 max-w-sm line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      {cat.description}
                    </p>
                    <div className="flex items-center space-x-1 mt-2 text-[10px] font-semibold tracking-wider uppercase text-white/90">
                      <span>Keşfet</span>
                      <ArrowRight size={10} className="transform transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Featured Bestsellers Carousel (Bestsellers Grid) */}
      <section className="py-16 sm:py-24 bg-neutral-50 border-t border-b border-neutral-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12">
            <div>
              <span className="text-[10px] text-neutral-400 font-semibold tracking-widest uppercase mb-2 block">
                Öne Çıkanlar
              </span>
              <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-neutral-900">
                En çok tercih edilen <br />
                <span className="font-semibold text-neutral-950">tasarımlar ve formüller.</span>
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs font-semibold text-neutral-800 hover:text-black flex items-center space-x-1.5 mt-4 sm:mt-0 group focus:outline-none"
            >
              <span>Tüm Koleksiyonu Gör</span>
              <ArrowRight size={12} className="transform transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Grid Layout for Featured Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Brand Values / Mission */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] text-neutral-400 font-semibold tracking-widest uppercase mb-3 block">
              Değerlerimiz
            </span>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-neutral-950 leading-tight">
              Dostlarımıza duyduğumuz sevgi, <br />
              <span className="font-semibold">ayrıntılarda saklı.</span>
            </h2>
            <p className="text-sm text-neutral-500 font-light mt-4 leading-relaxed">
              Her bir ürünü, tıpkı kendi yaşam alanlarımızda kullanacağımız premium mobilyalar veya tüketeceğimiz organik besinler hassasiyetinde üretiyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            {/* Value 1 */}
            <div className="flex flex-col items-center md:items-start space-y-3.5">
              <div className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-800">
                <ShieldCheck size={20} strokeWidth={1.5} />
              </div>
              <h3 className="font-medium text-[15px] text-neutral-900">Sertifikalı Masif Ahşap</h3>
              <p className="text-xs text-neutral-500 leading-relaxed font-light">
                Mobilyalarımızın tamamı FSC sürdürülebilir orman sertifikalı masif meşe ve ceviz ağaçlarından, yapay kaplama kullanılmadan zanaatkarlarımız tarafından üretilir.
              </p>
            </div>

            {/* Value 2 */}
            <div className="flex flex-col items-center md:items-start space-y-3.5">
              <div className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-800">
                <Sparkles size={20} strokeWidth={1.5} />
              </div>
              <h3 className="font-medium text-[15px] text-neutral-900">Apple Standartlarında Tasarım</h3>
              <p className="text-xs text-neutral-500 leading-relaxed font-light">
                Göz yormayan minimalist kıvrımlar, şeffaf detaylar ve kusursuz yüzey kalitesiyle hem evinizin dekorasyonuna değer katar hem evcil dostunuzu rahat ettirir.
              </p>
            </div>

            {/* Value 3 */}
            <div className="flex flex-col items-center md:items-start space-y-3.5">
              <div className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-800">
                <Heart size={20} strokeWidth={1.5} />
              </div>
              <h3 className="font-medium text-[15px] text-neutral-900">%100 Güvenli ve Doğal</h3>
              <p className="text-xs text-neutral-500 leading-relaxed font-light">
                Kullandığımız kumaşlarda OEKO-TEX standardı, takviye besinlerimizde ise tamamen tarım onaylı organik bileşenler kullanarak can dostlarımızın sağlığını koruruz.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
