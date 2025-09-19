import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConditionalLayout } from "@/components/layout/ConditionalLayout";
import { ToastProvider } from "@/components/ui/Toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "MyNature - عسل ومنتجات طبيعية مغربية أصيلة",
    template: "%s | MyNature - منتجات طبيعية مغربية"
  },
  description: "اكتشف أجود أنواع العسل المغربي الأصيل، زيت الأركان، الأعشاب الطبية، والزيوت الطبيعية. منتجات طبيعية 100% من قلب الطبيعة المغربية مع ضمان الجودة والأصالة.",
  keywords: [
    "عسل مغربي",
    "زيت الأركان",
    "أعشاب طبية",
    "منتجات طبيعية",
    "المغرب",
    "عسل أصيل",
    "زيت أركان أصلي",
    "أعشاب طبيعية",
    "منتجات عضوية",
    "طبيعة مغربية",
    "عسل جبلي",
    "زيت الأركان النقي",
    "أعشاب علاجية",
    "منتجات صحية"
  ],
  authors: [{ name: "MyNature Team" }],
  creator: "MyNature",
  publisher: "MyNature",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://my-nature-ecom.vercel.app'),
  alternates: {
    canonical: '/',
    languages: {
      'ar-MA': '/',
      'en-US': '/en',
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_MA",
    url: "/",
    title: "MyNature - عسل ومنتجات طبيعية مغربية أصيلة",
    description: "اكتشف أجود أنواع العسل المغربي الأصيل، زيت الأركان، الأعشاب الطبية، والزيوت الطبيعية. منتجات طبيعية 100% من قلب الطبيعة المغربية.",
    siteName: "MyNature",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MyNature - منتجات طبيعية مغربية",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MyNature - عسل ومنتجات طبيعية مغربية أصيلة",
    description: "اكتشف أجود أنواع العسل المغربي الأصيل، زيت الأركان، الأعشاب الطبية، والزيوت الطبيعية.",
    images: ["/images/twitter-image.jpg"],
    creator: "@MyNature",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    yahoo: process.env.YAHOO_VERIFICATION,
  },
  category: "ecommerce",
  classification: "Natural Products Store",
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "MyNature",
    "application-name": "MyNature",
    "msapplication-TileColor": "#f59e0b",
    "theme-color": "#f59e0b",
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
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </ToastProvider>
      </body>
    </html>
  );
}
