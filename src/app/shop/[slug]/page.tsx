'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShieldCheck, Truck, ArrowLeft, ShoppingBag, Plus, Minus } from 'lucide-react';
import { useProducts } from 'src/context/ProductContext';
import { useCart } from 'src/context/CartContext';
import { formatCurrency } from 'src/utils/format';

interface PageProps {
  params: {
    slug: string;
  };
}

export default function ProductDetail({ params }: PageProps) {
  const { slug } = params;
  const { addToCart } = useCart();
  const { products } = useProducts();

  // Find the product matching the slug
  const product = products.find((p) => p.slug === slug);

  // States
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedVariant, setSelectedVariant] = useState(product?.variants[0]);
  const [quantity, setQuantity] = useState(1);

  // Set initial image when product changes
  useEffect(() => {
    if (product) {
      setSelectedImage(product.images[0]);
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 px-4">
        <h2 className="text-xl font-medium text-neutral-800">Ürün Bulunamadı</h2>
        <p className="text-sm text-neutral-500 font-light">Aradığınız ürün kataloğumuzda yer almıyor olabilir.</p>
        <Link
          href="/shop"
          className="bg-neutral-950 text-white text-xs font-semibold px-6 py-3 rounded-lg hover:bg-neutral-800 transition-colors"
        >
          Tüm Ürünlere Dön
        </Link>
      </div>
    );
  }

  // Price calculations
  const basePrice = selectedVariant?.price || product.price;
  const originalPrice = product.compareAtPrice;
  const hasDiscount = originalPrice && originalPrice > basePrice;

  // Attributes from selected variant
  const selectedAttributes = selectedVariant?.attributes || {};

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
  };

  return (
    <div className="bg-white min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link
          href="/shop"
          className="inline-flex items-center space-x-2 text-xs font-medium text-neutral-400 hover:text-black transition-colors mb-8 sm:mb-12 group focus:outline-none"
        >
          <ArrowLeft size={13} className="transform transition-transform group-hover:-translate-x-0.5" />
          <span>Koleksiyona Dön</span>
        </Link>

        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Visual Gallery */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            {/* Main Image Display */}
            <div className="relative aspect-square w-full bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-100">
              {selectedImage && (
                <Image
                  src={selectedImage}
                  alt={product.name}
                  fill
                  className="object-cover transition-all duration-500"
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-thin">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-neutral-50 border transition-all ${
                    selectedImage === img
                      ? 'border-neutral-900 ring-1 ring-neutral-900'
                      : 'border-neutral-100 hover:border-neutral-300'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} - Görsel ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Sticky Product info */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            
            {/* Info header */}
            <div className="space-y-2">
              <span className="text-[10px] text-neutral-400 font-bold tracking-widest uppercase block">
                {product.categoryId === 'furniture' && 'Mobilya'}
                {product.categoryId === 'accessories' && 'Aksesuar'}
                {product.categoryId === 'health' && 'Sağlık & Vitamin'}
                {product.categoryId === 'cleaning' && 'Kum & Temizlik'}
              </span>
              <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-neutral-900">
                {product.name}
              </h1>
              
              {/* Rating & Reviews */}
              <div className="flex items-center space-x-2 pt-1">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                      strokeWidth={1.5}
                    />
                  ))}
                </div>
                <span className="text-[11px] font-medium text-neutral-500">
                  {product.rating} ({product.reviewsCount} Değerlendirme)
                </span>
              </div>
            </div>

            {/* Price display */}
            <div className="flex items-baseline space-x-3 py-3 border-t border-b border-neutral-100">
              <span className="text-2xl font-semibold text-neutral-950">
                {formatCurrency(basePrice)}
              </span>
              {hasDiscount && (
                <span className="text-sm text-neutral-400 line-through">
                  {formatCurrency(originalPrice!)}
                </span>
              )}
            </div>

            {/* Short description */}
            <p className="text-xs text-neutral-500 font-light leading-relaxed">
              {product.description}
            </p>

            {/* Variants Selectors */}
            {product.variants.length > 1 && (
              <div className="space-y-3 pt-2">
                <span className="text-[11px] font-semibold text-neutral-800 tracking-wide block uppercase">
                  Seçenekler
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {product.variants.map((v) => {
                    const isSelected = selectedVariant?.id === v.id;
                    return (
                      <button
                        key={v.id}
                        onClick={() => {
                          setSelectedVariant(v);
                          // Update image selection if matching attributes (or default to variant's layout)
                        }}
                        className={`text-xs px-4 py-2.5 rounded-lg border font-medium transition-all ${
                          isSelected
                            ? 'border-neutral-950 bg-neutral-950 text-white shadow-sm'
                            : 'border-neutral-200 text-neutral-600 hover:border-neutral-400 bg-white'
                        }`}
                      >
                        {v.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector & Add to Cart */}
            <div className="flex items-center space-x-4 pt-4">
              {/* Quantity */}
              <div className="flex items-center border border-neutral-200 rounded-lg bg-neutral-50/50">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-3 text-neutral-400 hover:text-black transition-colors"
                  aria-label="Decrease Quantity"
                >
                  <Minus size={13} strokeWidth={2.5} />
                </button>
                <span className="text-xs font-semibold px-2 text-neutral-800 w-8 text-center select-none">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-3 text-neutral-400 hover:text-black transition-colors"
                  aria-label="Increase Quantity"
                >
                  <Plus size={13} strokeWidth={2.5} />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-neutral-950 hover:bg-neutral-800 text-white text-center text-xs font-bold py-3.5 px-6 rounded-lg flex items-center justify-center space-x-2.5 transition-all shadow-sm focus:outline-none"
              >
                <ShoppingBag size={14} strokeWidth={1.5} />
                <span>Sepete Ekle</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3 pt-6 border-t border-neutral-100 text-[11px] text-neutral-500 font-light">
              <div className="flex items-center space-x-2">
                <ShieldCheck size={16} className="text-neutral-700" strokeWidth={1.5} />
                <span>2 Yıl Garanti & İade</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck size={16} className="text-neutral-700" strokeWidth={1.5} />
                <span>2000 TL Üzeri Ücretsiz Kargo</span>
              </div>
            </div>

            {/* Product Specifications Table */}
            <div className="pt-4 space-y-2">
              <h3 className="text-[11px] font-semibold text-neutral-800 uppercase tracking-wide">Teknik Özellikler</h3>
              <div className="border border-neutral-100 rounded-lg overflow-hidden text-[11px]">
                {Object.entries({ ...product.attributes, ...selectedAttributes }).map(([key, val], idx) => (
                  <div
                    key={key}
                    className={`flex justify-between p-3 ${idx % 2 === 0 ? 'bg-white' : 'bg-neutral-50/50'}`}
                  >
                    <span className="text-neutral-400 font-light">{key}</span>
                    <span className="text-neutral-800 font-medium">{val}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Section: Zengin Detay Açıklaması */}
        <section className="mt-20 sm:mt-28 border-t border-neutral-100 pt-16 max-w-3xl mx-auto">
          <div className="prose prose-neutral max-w-none text-neutral-600 font-light leading-relaxed text-sm space-y-6">
            {/* Convert simulated markdown blocks to clean HTML tags manually */}
            {product.detailedDescription.split('\n\n').map((block, index) => {
              const trimmed = block.trim();
              if (trimmed.startsWith('# ')) {
                return (
                  <h2 key={index} className="text-xl sm:text-2xl font-light tracking-tight text-neutral-900 mt-8 mb-4 border-b border-neutral-50 pb-2">
                    {trimmed.replace('# ', '')}
                  </h2>
                );
              }
              if (trimmed.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-sm font-semibold text-neutral-900 tracking-wide uppercase mt-6 mb-3">
                    {trimmed.replace('### ', '')}
                  </h3>
                );
              }
              if (trimmed.startsWith('* ')) {
                const listItems = trimmed
                  .split('\n')
                  .map((item) => item.replace('* ', '').trim());
                return (
                  <ul key={index} className="list-disc pl-5 space-y-2 mt-2">
                    {listItems.map((item, itemIdx) => {
                      const parts = item.split(': ');
                      if (parts.length > 1) {
                        return (
                          <li key={itemIdx}>
                            <strong className="font-semibold text-neutral-800">{parts[0]}:</strong>{' '}
                            {parts.slice(1).join(': ')}
                          </li>
                        );
                      }
                      return <li key={itemIdx}>{item}</li>;
                    })}
                  </ul>
                );
              }
              if (trimmed) {
                return <p key={index}>{trimmed}</p>;
              }
              return null;
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
