import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import CartDrawer from "@/components/CartDrawer";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: {
    default: "BIG STEPPERS CLUB",
    template: "%s | BIG STEPPERS CLUB"
  },
  description: "Make Every Step Count. Эксклюзивная одежда от BIG STEPPERS CLUB.",
  keywords: ["одежда", "худи", "футболки", "стритвир", "big steppers club", "fashion"],
  openGraph: {
    title: "BIG STEPPERS CLUB",
    description: "Make Every Step Count. Эксклюзивная одежда от BIG STEPPERS CLUB.",
    url: "https://bigsteppers.club",
    siteName: "BIG STEPPERS CLUB",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BIG STEPPERS CLUB",
    description: "Make Every Step Count. Эксклюзивная одежда от BIG STEPPERS CLUB.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <Preloader />
        <Header />
        <CartDrawer />
        <main>
          {children}
        </main>
        <Footer />
        <Toaster theme="dark" position="top-center" />
      </body>
    </html>
  );
}
