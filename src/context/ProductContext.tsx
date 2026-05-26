'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Category } from 'src/types';
import { PRODUCTS as initialProducts, CATEGORIES as initialCategories } from 'src/data/mockData';

interface ProductContextType {
  products: Product[];
  categories: Category[];
  addProduct: (product: Omit<Product, 'id' | 'slug' | 'createdAt'>) => void;
  updateProduct: (id: string, updatedFields: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  isLoaded: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories] = useState<Category[]>(initialCategories);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load products from LocalStorage
  useEffect(() => {
    const savedProducts = localStorage.getItem('pawlove_products');
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch (e) {
        console.error('Failed to parse products', e);
        setProducts(initialProducts);
      }
    } else {
      setProducts(initialProducts);
      localStorage.setItem('pawlove_products', JSON.stringify(initialProducts));
    }
    setIsLoaded(true);
  }, []);

  // Save products to LocalStorage helper
  const saveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem('pawlove_products', JSON.stringify(newProducts));
  };

  const addProduct = (newProductData: Omit<Product, 'id' | 'slug' | 'createdAt'>) => {
    const id = 'prod-' + Math.floor(Math.random() * 900000 + 100000);
    // Create a slug from product name
    const slug = newProductData.name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const newProduct: Product = {
      ...newProductData,
      id,
      slug: slug || id,
      createdAt: new Date().toISOString()
    };

    saveProducts([newProduct, ...products]);
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    const updatedProducts = products.map((prod) =>
      prod.id === id ? { ...prod, ...updatedFields } : prod
    );
    saveProducts(updatedProducts);
  };

  const deleteProduct = (id: string) => {
    const updatedProducts = products.filter((prod) => prod.id !== id);
    saveProducts(updatedProducts);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        addProduct,
        updateProduct,
        deleteProduct,
        isLoaded
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
