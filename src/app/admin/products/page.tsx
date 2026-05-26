'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Trash2, X, Image as ImageIcon, Check } from 'lucide-react';
import { useProducts } from 'src/context/ProductContext';

// Predefined premium mock images for gallery selection
const PRESETS = [
  { name: 'Meşe Kedi Kulesi', url: '/images/cat-tower.png' },
  { name: 'Snooze Pet Yatağı', url: '/images/dog-bed.png' },
  { name: 'Arc Seramik Mama Kabı', url: '/images/pet-bowl.png' },
  { name: 'Halo Deri Tasma', url: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=800' },
  { name: 'Organik Vitamin', url: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&q=80&w=800' },
  { name: 'Tofu Organik Kum', url: 'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?auto=format&fit=crop&q=80&w=800' }
];

export default function AdminProducts() {
  const { products, categories, addProduct, updateProduct, deleteProduct } = useProducts();

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Add Product Form State
  const [newProduct, setNewProduct] = useState({
    name: '',
    categoryId: 'furniture',
    price: 0,
    compareAtPrice: 0,
    stock: 10,
    description: '',
    detailedDescription: '',
    imageOption: 'preset', // preset | custom
    selectedPresetUrl: PRESETS[0].url,
    customImageUrl: '',
    material: 'Masif Ahşap',
    size: 'Standart',
  });

  const handlePresetSelect = (url: string) => {
    setNewProduct((prev) => ({
      ...prev,
      selectedPresetUrl: url,
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' || name === 'compareAtPrice' ? Number(value) : value,
    }));
  };

  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const imageUrl =
      newProduct.imageOption === 'preset'
        ? newProduct.selectedPresetUrl
        : newProduct.customImageUrl || PRESETS[0].url;

    const detailedDescriptionTemplate = `
# ${newProduct.name}

${newProduct.description}

### Teknik Özellikler
* **Malzeme:** ${newProduct.material}
* **Boyut:** ${newProduct.size}
* **Stok Durumu:** ${newProduct.stock} adet stokta
    `;

    addProduct({
      name: newProduct.name,
      categoryId: newProduct.categoryId,
      price: newProduct.price,
      compareAtPrice: newProduct.compareAtPrice || undefined,
      stock: newProduct.stock,
      description: newProduct.description,
      detailedDescription: newProduct.detailedDescription || detailedDescriptionTemplate,
      images: [imageUrl],
      variants: [
        {
          id: 'v-' + Math.floor(Math.random() * 90000 + 10000),
          name: 'Standart',
          sku: 'PL-' + Math.floor(Math.random() * 900000 + 100000),
          stock: newProduct.stock,
          attributes: { Malzeme: newProduct.material, Boyut: newProduct.size },
        },
      ],
      attributes: {
        Malzeme: newProduct.material,
        Boyut: newProduct.size,
        Garanti: '2 Yıl',
      },
      rating: 5.0,
      reviewsCount: 0,
      isFeatured: false,
    });

    // Reset Form
    setNewProduct({
      name: '',
      categoryId: 'furniture',
      price: 0,
      compareAtPrice: 0,
      stock: 10,
      description: '',
      detailedDescription: '',
      imageOption: 'preset',
      selectedPresetUrl: PRESETS[0].url,
      customImageUrl: '',
      material: 'Masif Ahşap',
      size: 'Standart',
    });

    setIsAddModalOpen(false);
  };

  // Quick edit stock
  const handleStockChange = (productId: string, currentStock: number, delta: number) => {
    const nextStock = Math.max(0, currentStock + delta);
    updateProduct(productId, { stock: nextStock });
  };

  // Quick edit price
  const handlePriceChange = (productId: string, currentPrice: number, inputVal: string) => {
    const val = Number(inputVal);
    if (!isNaN(val) && val > 0) {
      updateProduct(productId, { price: val });
    }
  };

  return (
    <div className="space-y-10">
      
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-light text-neutral-900 tracking-tight">Ürün Yönetimi</h1>
          <p className="text-xs text-neutral-400 font-light mt-1">Ürünlerinizi düzenleyin, silin veya kataloğa yenilerini ekleyin.</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-neutral-950 text-white text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-neutral-800 transition-all flex items-center space-x-1.5 focus:outline-none"
        >
          <Plus size={14} />
          <span>Yeni Ürün Ekle</span>
        </button>
      </div>

      {/* Catalog Table */}
      <div className="bg-white border border-neutral-100 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-light divide-y divide-neutral-100">
            <thead>
              <tr className="bg-neutral-50 text-neutral-400 font-semibold uppercase tracking-wider text-[10px]">
                <th className="px-6 py-4">Görsel</th>
                <th className="px-6 py-4">Ürün Adı</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Fiyat (TL)</th>
                <th className="px-6 py-4">Stok Adedi</th>
                <th className="px-6 py-4 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-neutral-700">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-neutral-50/50 transition-colors">
                  {/* Image */}
                  <td className="px-6 py-4">
                    <div className="relative w-12 h-12 bg-neutral-50 rounded border border-neutral-100 overflow-hidden">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                  </td>

                  {/* Name */}
                  <td className="px-6 py-4 font-medium text-neutral-900 max-w-[200px] truncate">
                    <div>
                      <p>{product.name}</p>
                      <span className="text-[10px] text-neutral-400 font-normal">ID: {product.id}</span>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4 capitalize font-normal">
                    {categories.find((c) => c.id === product.categoryId)?.name || product.categoryId}
                  </td>

                  {/* Price Edit */}
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1">
                      <input
                        type="number"
                        defaultValue={product.price}
                        onBlur={(e) => handlePriceChange(product.id, product.price, e.target.value)}
                        className="w-20 bg-neutral-50 border border-neutral-200 text-neutral-800 font-semibold px-2 py-1 rounded focus:outline-none focus:border-neutral-950 focus:bg-white text-xs text-center"
                      />
                      <span className="text-[10px] text-neutral-400">₺</span>
                    </div>
                  </td>

                  {/* Stock Controller */}
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleStockChange(product.id, product.stock, -1)}
                        className="w-6 h-6 border border-neutral-200 rounded flex items-center justify-center text-neutral-400 hover:text-black transition-colors"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-semibold text-neutral-900 text-xs">
                        {product.stock}
                      </span>
                      <button
                        onClick={() => handleStockChange(product.id, product.stock, 1)}
                        className="w-6 h-6 border border-neutral-200 rounded flex items-center justify-center text-neutral-400 hover:text-black transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="p-1.5 rounded text-neutral-400 hover:text-red-600 transition-colors"
                      title="Sil"
                    >
                      <Trash2 size={15} strokeWidth={1.5} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Dialog Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/35 backdrop-blur-[2px]">
          <div className="bg-white rounded-2xl border border-neutral-100 shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
              <h3 className="font-semibold text-sm tracking-wider uppercase text-neutral-900">YENİ ÜRÜN EKLE</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-full text-neutral-400 hover:text-black transition-colors focus:outline-none"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form Content */}
            <form onSubmit={handleAddProductSubmit} className="flex-grow overflow-y-auto p-6 space-y-5">
              
              {/* Product Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">Ürün Adı</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={newProduct.name}
                  onChange={handleInputChange}
                  className="w-full bg-neutral-50 border border-neutral-200 text-neutral-800 text-[11px] px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-neutral-950 focus:bg-white transition-all"
                  placeholder="Örn: Nest Masif Meşe Kedi Kulesi"
                />
              </div>

              {/* Category, Price, Stock row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">Kategori</label>
                  <select
                    name="categoryId"
                    value={newProduct.categoryId}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-50 border border-neutral-200 text-neutral-800 text-[11px] px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-neutral-950 focus:bg-white transition-all cursor-pointer"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">Fiyat (TL)</label>
                  <input
                    type="number"
                    name="price"
                    required
                    min={0}
                    value={newProduct.price || ''}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-50 border border-neutral-200 text-neutral-800 text-[11px] px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-neutral-950 focus:bg-white transition-all"
                    placeholder="2500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">Stok Adedi</label>
                  <input
                    type="number"
                    name="stock"
                    required
                    min={0}
                    value={newProduct.stock}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-50 border border-neutral-200 text-neutral-800 text-[11px] px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-neutral-950 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Attributes row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">Malzeme</label>
                  <input
                    type="text"
                    name="material"
                    value={newProduct.material}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-50 border border-neutral-200 text-neutral-800 text-[11px] px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-neutral-950 focus:bg-white transition-all"
                    placeholder="Örn: Masif Meşe, Seramik"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">Boyut / Hacim</label>
                  <input
                    type="text"
                    name="size"
                    value={newProduct.size}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-50 border border-neutral-200 text-neutral-800 text-[11px] px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-neutral-950 focus:bg-white transition-all"
                    placeholder="Örn: 50x50x135 cm, 400 ml"
                  />
                </div>
              </div>

              {/* Short description */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">Kısa Açıklama</label>
                <textarea
                  name="description"
                  required
                  rows={2}
                  value={newProduct.description}
                  onChange={handleInputChange}
                  className="w-full bg-neutral-50 border border-neutral-200 text-neutral-800 text-[11px] px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-neutral-950 focus:bg-white transition-all resize-none"
                  placeholder="Katalog listelerinde görünecek 1-2 cümlelik kısa açıklama."
                />
              </div>

              {/* Image Picker */}
              <div className="space-y-3 pt-1">
                <label className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">Ürün Görseli</label>
                <div className="flex items-center space-x-4 border-b border-neutral-100 pb-3 text-xs">
                  <label className="flex items-center space-x-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="imageOption"
                      value="preset"
                      checked={newProduct.imageOption === 'preset'}
                      onChange={handleInputChange}
                      className="accent-black"
                    />
                    <span className="font-medium text-neutral-700">Mock Galeriden Seç</span>
                  </label>
                  <label className="flex items-center space-x-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="imageOption"
                      value="custom"
                      checked={newProduct.imageOption === 'custom'}
                      onChange={handleInputChange}
                      className="accent-black"
                    />
                    <span className="font-medium text-neutral-700">Özel Görsel URL&apos;si Gir</span>
                  </label>
                </div>

                {/* Option 1: Preset selector */}
                {newProduct.imageOption === 'preset' ? (
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {PRESETS.map((preset) => {
                      const isSelected = newProduct.selectedPresetUrl === preset.url;
                      return (
                        <button
                          key={preset.name}
                          type="button"
                          onClick={() => handlePresetSelect(preset.url)}
                          className={`relative aspect-square bg-neutral-50 rounded-lg overflow-hidden border transition-all ${
                            isSelected
                              ? 'border-neutral-950 ring-1 ring-neutral-950'
                              : 'border-neutral-100 hover:border-neutral-300'
                          }`}
                        >
                          <Image
                            src={preset.url}
                            alt={preset.name}
                            fill
                            className="object-cover"
                            sizes="70px"
                          />
                          {isSelected && (
                            <div className="absolute inset-0 bg-black/15 flex items-center justify-center text-white">
                              <Check size={16} strokeWidth={2.5} />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  /* Option 2: Custom URL */
                  <div className="space-y-1.5">
                    <div className="relative">
                      <input
                        type="url"
                        name="customImageUrl"
                        value={newProduct.customImageUrl}
                        onChange={handleInputChange}
                        className="w-full bg-neutral-50 border border-neutral-200 text-neutral-800 text-[11px] pl-9 pr-4 py-2.5 rounded-lg focus:outline-none focus:border-neutral-950 focus:bg-white transition-all"
                        placeholder="https://images.unsplash.com/..."
                      />
                      <ImageIcon size={13} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer Actions */}
              <div className="border-t border-neutral-100 pt-4 flex space-x-3 justify-end">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="bg-white border border-neutral-200 text-neutral-700 text-xs font-semibold px-5 py-2.5 rounded-lg hover:bg-neutral-50 transition-colors focus:outline-none"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="bg-neutral-950 text-white text-xs font-semibold px-5 py-2.5 rounded-lg hover:bg-neutral-800 transition-colors focus:outline-none"
                >
                  Ürünü Oluştur
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
