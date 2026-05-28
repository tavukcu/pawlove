'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Product } from 'src/types';
import { formatCurrency } from 'src/utils/format';
import { useCart } from 'src/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  // Find minimum price from variants or base price
  const displayPrice = product.price;
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;

  return (
    <div className="group relative flex flex-col bg-white overflow-hidden transition-all duration-300 rounded-lg border border-neutral-100 hover:shadow-md">
      {/* Product Image Container */}
      <div className="relative aspect-square w-full bg-neutral-50 overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        
        {/* Badges Container */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1">
          {hasDiscount && (
            <span className="bg-red-700 text-white text-[9px] font-bold px-1.5 py-0.5 rounded tracking-wider uppercase self-start">
              İndirim
            </span>
          )}
          {product.categoryId === 'furniture' && (
            <span className="bg-[#3D5A46] text-[#E6DFD3] text-[9px] font-semibold px-1.5 py-0.5 rounded tracking-wider uppercase self-start">
              El Yapımı
            </span>
          )}
        </div>

        {/* Quick Add Button Overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 px-4">
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product, product.variants[0]);
            }}
            className="w-full bg-white/90 backdrop-blur-sm text-neutral-900 text-[11px] font-semibold py-2.5 rounded-lg flex items-center justify-center space-x-2 shadow-sm hover:bg-white transition-all transform translate-y-2 group-hover:translate-y-0 duration-300 focus:outline-none"
          >
            <ShoppingBag size={13} strokeWidth={1.5} />
            <span>Hızlı Ekle</span>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category */}
          <span className="text-[10px] text-neutral-400 font-medium tracking-widest uppercase mb-1 block">
            {product.categoryId === 'furniture' && 'Mobilya'}
            {product.categoryId === 'accessories' && 'Aksesuar'}
            {product.categoryId === 'health' && 'Sağlık & Vitamin'}
            {product.categoryId === 'cleaning' && 'Kum & Temizlik'}
          </span>

          {/* Name */}
          <Link href={`/shop/${product.slug}`} className="focus:outline-none block">
            <h3 className="text-neutral-800 font-medium text-[13px] hover:text-black transition-colors leading-tight mb-1.5">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-neutral-50 mt-2">
          <div className="flex flex-col">
            <div className="flex items-baseline space-x-1.5">
              <span className="text-xs font-semibold text-neutral-950">
                {formatCurrency(displayPrice)}
              </span>
              {hasDiscount && (
                <span className="text-[10px] text-neutral-400 line-through">
                  {formatCurrency(product.compareAtPrice!)}
                </span>
              )}
            </div>
            <span className="text-[9px] text-neutral-400 font-light mt-0.5">
              {formatCurrency(Math.round(displayPrice / 3))} x 3 Taksit
            </span>
          </div>
          
          <Link
            href={`/shop/${product.slug}`}
            className="text-[11px] font-medium text-neutral-400 hover:text-black flex items-center space-x-1 transition-colors"
          >
            <span>Detay</span>
            <ArrowRight size={10} className="transform transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
