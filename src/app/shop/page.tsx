'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, ArrowUpDown } from 'lucide-react';
import { ProductCard } from 'src/components/product/ProductCard';
import { useProducts } from 'src/context/ProductContext';

function ShopContent() {
  const { products, categories } = useProducts();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get active category from URL
  const categoryParam = searchParams.get('category') || 'all';

  // Local state for search, sort and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured'); // featured, price-asc, price-desc
  const [activeCategory, setActiveCategory] = useState(categoryParam);

  // Sync category state with URL parameter
  useEffect(() => {
    setActiveCategory(categoryParam);
  }, [categoryParam]);

  // Set category query param
  const handleCategoryChange = (catId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (catId === 'all') {
      params.delete('category');
    } else {
      params.set('category', catId);
    }
    router.push(`/shop?${params.toString()}`);
  };

  // Filtered and sorted products
  const filteredProducts = products.filter((product) => {
    // Category match
    const categoryMatch = activeCategory === 'all' || product.categoryId === activeCategory;
    
    // Search match
    const searchMatch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    return categoryMatch && searchMatch;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') {
      return a.price - b.price;
    }
    if (sortBy === 'price-desc') {
      return b.price - a.price;
    }
    // Default: featured/created date (simulated)
    return b.isFeatured ? 1 : -1;
  });

  return (
    <div className="bg-white min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-neutral-950">
            Tüm Koleksiyonlar
          </h1>
          <p className="text-xs text-neutral-500 font-light mt-2 leading-relaxed">
            Seçkin mobilyalardan, organik takviyelere ve tozsuz kedi kumlarına kadar evcil dostunuz için özenle hazırlanan tüm ürünlerimiz.
          </p>
        </div>

        {/* Toolbar: Category filter tabs, Search and Sort */}
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between border-b border-neutral-100 pb-6 mb-10">
          
          {/* Category Tabs */}
          <div className="flex space-x-1 overflow-x-auto pb-2 md:pb-0 scrollbar-thin">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`text-xs px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                activeCategory === 'all'
                  ? 'bg-neutral-950 text-white shadow-sm'
                  : 'text-neutral-500 hover:text-black bg-neutral-50 hover:bg-neutral-100'
              }`}
            >
              Tüm Ürünler
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`text-xs px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-neutral-950 text-white shadow-sm'
                    : 'text-neutral-500 hover:text-black bg-neutral-50 hover:bg-neutral-100'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search and Sort Controller */}
          <div className="flex items-center space-x-3 shrink-0">
            
            {/* Search Input */}
            <div className="relative flex-1 sm:w-60">
              <input
                type="text"
                placeholder="Ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200 text-neutral-800 text-[11px] font-light pl-8 pr-4 py-2.5 rounded-lg focus:outline-none focus:border-neutral-950 focus:bg-white transition-colors"
              />
              <Search size={13} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
            </div>

            {/* Sort Select */}
            <div className="relative shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-neutral-50 border border-neutral-200 text-neutral-700 text-[11px] font-medium pl-8 pr-8 py-2.5 rounded-lg focus:outline-none focus:border-neutral-950 focus:bg-white transition-colors cursor-pointer"
              >
                <option value="featured">Öne Çıkanlar</option>
                <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
                <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
              </select>
              <ArrowUpDown size={12} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 pointer-events-none" />
              {/* Custom arrow down */}
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-neutral-400">
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>

          </div>

        </div>

        {/* Results Counter */}
        <div className="text-[11px] text-neutral-400 font-light mb-6 flex justify-between items-center">
          <span>Toplam {filteredProducts.length} ürün listelendi</span>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-neutral-600 hover:text-black font-semibold border-b border-black/10 hover:border-black transition-all"
            >
              Aramayı Temizle
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="min-h-[40vh] flex flex-col items-center justify-center text-center space-y-4">
            <p className="text-neutral-800 font-medium text-sm">Hiçbir ürün bulunamadı</p>
            <p className="text-xs text-neutral-400 max-w-xs font-light">
              Seçtiğiniz kriterlere uygun ürünümüz bulunmamaktadır. Lütfen filtrelerinizi değiştirmeyi deneyin.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default function Shop() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-6 h-6 rounded-full border-2 border-neutral-200 border-t-neutral-900 animate-spin"></div>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
