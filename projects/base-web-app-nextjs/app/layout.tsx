import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import ClientProviders from './_contexts/ClientProviders';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Base Runtime Environment',
  description: 'Base Runtime Environment setup',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppRouterCacheProvider>
          <ClientProviders>
            {children}
          </ClientProviders>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
