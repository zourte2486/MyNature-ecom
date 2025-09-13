import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ToastProvider } from "@/components/ui/Toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "MyNature - عسل ومنتجات طبيعية مغربية",
  description: "متجر عسل ومنتجات طبيعية مغربية أصيلة - عسل، زيت الأركان، أعشاب طبية، زيوت طبيعية",
  keywords: "عسل مغربي، زيت الأركان، أعشاب طبية، منتجات طبيعية، المغرب",
  authors: [{ name: "MyNature" }],
  openGraph: {
    title: "MyNature - عسل ومنتجات طبيعية مغربية",
    description: "متجر عسل ومنتجات طبيعية مغربية أصيلة",
    type: "website",
    locale: "ar_MA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ToastProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
