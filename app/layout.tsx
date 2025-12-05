import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import 'katex/dist/katex.css';
import { Inter } from 'next/font/google';
import {Viewport} from "next";

const inter = Inter({
  subsets: ['latin'],
});

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="de" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
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