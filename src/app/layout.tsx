import type { Metadata } from "next";
import { Instrument_Serif, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeScript } from "@/components/layout/ThemeScript";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fermor — Begin your financial momentum",
  description: "Personal finance platform for India. Financial clarity through transparent arithmetic, zero login walls, and 100% browser-side calculations.",
  metadataBase: new URL("https://fermor.in"),
  openGraph: {
    title: "Fermor — Begin your financial momentum",
    description: "Calculators, guides, and financial clarity with zero server tracking and full arithmetic visibility.",
    url: "https://fermor.in",
    siteName: "Fermor",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fermor — Begin your financial momentum",
    description: "Personal finance platform for India. Transparent math, no login wall.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${instrumentSerif.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
