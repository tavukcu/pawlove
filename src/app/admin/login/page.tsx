'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Lock, Mail, ShieldAlert } from 'lucide-react';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // If already logged in, redirect to dashboard
  useEffect(() => {
    const auth = sessionStorage.getItem('pawlove_admin_auth');
    if (auth === 'true') {
      router.push('/admin');
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate login verification
    setTimeout(() => {
      if (email === 'admin@pawlove.com' && password === '123456') {
        sessionStorage.setItem('pawlove_admin_auth', 'true');
        router.push('/admin');
      } else {
        setError('E-posta adresi veya şifre hatalı.');
        setIsLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-2xl border border-neutral-100 shadow-sm">
        
        {/* Title / Brand */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-1.5 focus:outline-none mb-6">
            <span className="font-semibold text-xl tracking-tight text-neutral-900">paw<span className="text-neutral-500 font-light">love</span></span>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-neutral-950 text-white px-2 py-0.5 rounded">ADMIN</span>
          </Link>
          <h2 className="text-2xl font-light text-neutral-900 tracking-tight">Yönetici Girişi</h2>
          <p className="text-[11px] text-neutral-400 font-light mt-1.5">
            pawlove mağaza yönetim paneline erişmek için oturum açın.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-100 rounded-lg p-4 flex items-start space-x-3 text-red-700 text-xs">
            <ShieldAlert size={16} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            
            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">Yönetici E-Posta</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 text-neutral-800 text-[11px] pl-9 pr-4 py-3 rounded-lg focus:outline-none focus:border-neutral-950 focus:bg-white transition-all"
                  placeholder="admin@pawlove.com"
                />
                <Mail size={13} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">Şifre</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 text-neutral-800 text-[11px] pl-9 pr-4 py-3 rounded-lg focus:outline-none focus:border-neutral-950 focus:bg-white transition-all"
                  placeholder="••••••"
                />
                <Lock size={13} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
              </div>
            </div>

          </div>

          {/* Helper credentials */}
          <div className="bg-neutral-50 rounded-lg p-3 border border-neutral-100 text-[10px] text-neutral-400 font-light text-center leading-normal">
            Prototip Giriş Bilgileri:<br />
            <strong>admin@pawlove.com</strong> / <strong>123456</strong>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-neutral-950 hover:bg-neutral-800 disabled:bg-neutral-400 text-white text-xs font-semibold py-3.5 rounded-lg flex items-center justify-center space-x-2 transition-all focus:outline-none"
            >
              {isLoading ? (
                <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
              ) : (
                <>
                  <span>Giriş Yap</span>
                  <ArrowRight size={13} />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Back Link */}
        <div className="text-center">
          <Link
            href="/"
            className="text-[11px] font-medium text-neutral-400 hover:text-black transition-colors"
          >
            Mağazaya Dön
          </Link>
        </div>

      </div>
    </div>
  );
}
