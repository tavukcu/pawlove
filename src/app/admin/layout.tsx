'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Box, ClipboardList, LogOut, ArrowLeft } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Skip auth check if we are on the login page
    if (pathname === '/admin/login') {
      setLoading(false);
      return;
    }

    const auth = sessionStorage.getItem('pawlove_admin_auth');
    if (auth !== 'true') {
      setIsAuthenticated(false);
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, [pathname, router]);

  // Logout handler
  const handleLogout = () => {
    sessionStorage.removeItem('pawlove_admin_auth');
    router.push('/admin/login');
  };

  // If loading authentication state
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-5 h-5 rounded-full border-2 border-neutral-200 border-t-neutral-900 animate-spin"></div>
      </div>
    );
  }

  // If on login page, render children directly without admin layout wrapper
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // If not authenticated and redirecting, render loading state
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-5 h-5 rounded-full border-2 border-neutral-200 border-t-neutral-900 animate-spin"></div>
      </div>
    );
  }

  const sidebarLinks = [
    { name: 'Genel Bakış', href: '/admin', icon: LayoutDashboard },
    { name: 'Ürünler', href: '/admin/products', icon: Box },
    { name: 'Siparişler', href: '/admin/orders', icon: ClipboardList },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-neutral-100 flex flex-col justify-between shrink-0 hidden md:flex">
        <div className="p-6">
          {/* Brand Logo */}
          <Link href="/admin" className="flex items-center space-x-1.5 focus:outline-none mb-10">
            <span className="font-semibold text-base tracking-tight text-neutral-900">paw<span className="text-neutral-500 font-light">love</span></span>
            <span className="text-[9px] font-bold uppercase tracking-wider bg-neutral-900 text-white px-1.5 py-0.5 rounded">ADMIN</span>
          </Link>

          {/* Nav links */}
          <nav className="space-y-1.5">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-neutral-900 text-white font-semibold shadow-sm'
                      : 'text-neutral-500 hover:text-black hover:bg-neutral-50'
                  }`}
                >
                  <Icon size={15} strokeWidth={1.5} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-6 border-t border-neutral-100 space-y-4">
          <Link
            href="/"
            className="flex items-center space-x-2.5 text-neutral-500 hover:text-black text-xs font-medium py-1 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Mağazaya Dön</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2.5 text-red-500 hover:text-red-700 text-xs font-medium py-1 transition-colors w-full text-left"
          >
            <LogOut size={14} />
            <span>Oturumu Kapat</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-neutral-100 h-16 px-4 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-sm tracking-tight text-neutral-900">paw<span className="text-neutral-500 font-light">love</span></span>
            <span className="text-[8px] font-bold uppercase tracking-wider bg-neutral-900 text-white px-1.5 py-0.5 rounded">ADMIN</span>
          </div>

          <div className="flex items-center space-x-4">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`p-2 rounded-lg text-neutral-500 ${isActive ? 'text-black bg-neutral-50' : ''}`}
                  title={link.name}
                >
                  <Icon size={16} strokeWidth={1.5} />
                </Link>
              );
            })}
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg text-red-500 hover:bg-red-50"
              title="Oturumu Kapat"
            >
              <LogOut size={16} strokeWidth={1.5} />
            </button>
          </div>
        </header>

        {/* Dashboard Content page wrapper */}
        <main className="flex-grow p-6 sm:p-10 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
