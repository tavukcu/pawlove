'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from 'src/context/CartContext';
import { formatCurrency } from 'src/utils/format';
import { motion, AnimatePresence } from 'framer-motion';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    shippingFee,
    total
  } = useCart();

  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCartOpen(false);
      }
    };
    if (isCartOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen, setIsCartOpen]);

  const freeShippingThreshold = 2000;
  const remainingForFreeShipping = freeShippingThreshold - subtotal;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-50 bg-black/35 backdrop-blur-[2px]"
          />

          {/* Drawer Body */}
          <motion.div
            ref={drawerRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-[440px] bg-white shadow-2xl flex flex-col h-full"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-neutral-100 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShoppingBag size={18} className="text-neutral-800" strokeWidth={1.5} />
                <h3 className="font-semibold text-[15px] tracking-wide text-neutral-900">SEPETİNİZ</h3>
                <span className="text-xs text-neutral-400">({cart.reduce((sum, item) => sum + item.quantity, 0)} ürün)</span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1 rounded-full text-neutral-400 hover:text-black transition-colors focus:outline-none"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Free Shipping Alert Banner */}
            {subtotal > 0 && (
              <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-100/50 text-[11px] font-normal text-neutral-600 text-center">
                {remainingForFreeShipping > 0 ? (
                  <span>
                    Kargo bedava fırsatına son{' '}
                    <strong className="text-neutral-900 font-semibold">{formatCurrency(remainingForFreeShipping)}</strong> kaldı.
                  </span>
                ) : (
                  <span className="text-emerald-700 font-medium">Tebrikler! Ücretsiz kargo hakkı kazandınız. 🎉</span>
                )}
              </div>
            )}

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-400">
                    <ShoppingBag size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-800 text-sm">Sepetiniz boş</p>
                    <p className="text-xs text-neutral-400 mt-1 max-w-[240px]">
                      Hemen alışverişe başlayın ve evcil dostunuza en özel tasarımları keşfedin.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="bg-neutral-950 text-white text-xs font-semibold px-6 py-2.5 rounded-md hover:bg-neutral-800 transition-colors"
                  >
                    Keşfetmeye Başla
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    layout
                    key={`${item.productId}-${item.variantId || ''}`}
                    className="flex space-x-4 border-b border-neutral-50 pb-5 items-start"
                  >
                    {/* Item Image */}
                    <div className="relative w-18 h-18 rounded bg-neutral-50 overflow-hidden shrink-0 border border-neutral-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="72px"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-neutral-950 text-[13px] leading-tight truncate">
                          {item.name}
                        </h4>
                        <span className="text-[13px] font-semibold text-neutral-900 ml-2">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </div>
                      
                      {item.variantName && (
                        <p className="text-[11px] text-neutral-400 mt-0.5">{item.variantName}</p>
                      )}

                      {/* Quantity Controller & Delete */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-neutral-200 rounded-md">
                          <button
                            onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                            className="p-1.5 text-neutral-400 hover:text-black transition-colors"
                            aria-label="Decrease Quantity"
                          >
                            <Minus size={12} strokeWidth={2} />
                          </button>
                          <span className="text-xs px-2 text-neutral-800 font-medium min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                            className="p-1.5 text-neutral-400 hover:text-black transition-colors"
                            aria-label="Increase Quantity"
                          >
                            <Plus size={12} strokeWidth={2} />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeFromCart(item.productId, item.variantId)}
                          className="text-neutral-400 hover:text-red-500 transition-colors p-1"
                          aria-label="Remove Item"
                        >
                          <Trash2 size={13} strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer Summary & Actions */}
            {cart.length > 0 && (
              <div className="px-6 py-6 border-t border-neutral-100 bg-neutral-50/50 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-neutral-500">
                    <span>Ara Toplam</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-neutral-500">
                    <span>Kargo Ücreti</span>
                    <span>{shippingFee === 0 ? 'Ücretsiz' : formatCurrency(shippingFee)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold text-neutral-900 border-t border-neutral-100 pt-2.5">
                    <span>Toplam</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 pt-2">
                  <Link
                    href="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="bg-neutral-950 text-white text-center text-[13px] font-semibold py-3 rounded-lg hover:bg-neutral-800 transition-all shadow-sm focus:outline-none"
                  >
                    Ödemeye Geç
                  </Link>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="bg-white border border-neutral-200 text-neutral-700 text-center text-[13px] font-medium py-3 rounded-lg hover:bg-neutral-50 transition-colors focus:outline-none"
                  >
                    Alışverişe Devam Et
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
