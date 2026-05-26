import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CartProvider } from "src/context/CartContext";
import { ProductProvider } from "src/context/ProductContext";
import { Header } from "src/components/layout/Header";
import { Footer } from "src/components/layout/Footer";
import { CartDrawer } from "src/components/cart/CartDrawer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "pawlove | Premium Evcil Hayvan Ürünleri & Tasarım Mobilyalar",
  description: "Evcil dostlarınız için Apple standartlarında minimalist ahşap mobilyalar, el yapımı tasmalar, organik takviyeler ve yenilikçi teknolojiler.",
  openGraph: {
    title: "pawlove | Premium Evcil Hayvan Yaşam Tarzı",
    description: "Apple standartlarında, minimalist ve yüksek performanslı evcil hayvan e-ticaret platformu.",
    images: ["/images/hero-banner.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body
        className={`${geistSans.className} antialiased bg-white text-neutral-800 flex flex-col min-h-screen`}
      >
        <ProductProvider>
          <CartProvider>
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <CartDrawer />
            <Footer />
          </CartProvider>
        </ProductProvider>
      </body>
    </html>
  );
}
