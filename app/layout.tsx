import './global.css';
import 'katex/dist/katex.css';
import {Inter} from 'next/font/google';
import {Metadata, Viewport} from "next";
import {Analytics} from '@vercel/analytics/next';
import {SpeedInsights} from '@vercel/speed-insights/next';
import {Provider} from "@/app/provider";

const inter = Inter({
  subsets: ['latin'],
});

const description = "Erklärungen, Aufgaben und Formeln zur Binomialverteilung – kompakt für Oberstufe, Klausuren und Abitur.";

export const metadata: Metadata = {
  title: {
    default: "Binomialverteilung – Lernen, Üben, Nachschlagen",
    template: "%s | Binomialverteilung",
  },
  description,
  keywords: [
    "Binomialverteilung",
    "Stochastik",
    "Wahrscheinlichkeitsrechnung",
    "Oberstufe",
    "Abitur",
  ],
  alternates: {
    canonical: '/',
  },
  authors: [
    {
      name: "Lily"
    },
    {
      name: "Deniz"
    }
  ],
  openGraph: {
    title: "Binomialverteilung",
    description,
    url: "https://binomialverteilung.app",
    siteName: "Binomialverteilung",
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Binomialverteilung",
    description
  },
};

export default function Layout({children}: LayoutProps<'/'>) {
  return (
      <html lang="de" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
      <Provider>{children}</Provider>
      <Analytics />
      <SpeedInsights />
      </body>
      </html>
  );
}

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    {color: "#f4f4f5", media: "(prefers-color-scheme: light)"},
    {color: "#111111", media: "(prefers-color-scheme: dark)"},
  ],
  width: "device-width",
};