/** *************************************************************************
 *                                                                         *
 *                       Copyright (c) 2026, @struggyyy                    *
 *                                                                         *
 *                          Project: ScreenFixer                           *
 *                                                                         *
 *                           All Rights Reserved                           *
 *                                                                         *
 *        This is unpublished proprietary source code of @struggyyy.       *
 *         The copyright notice above does not evidence any actual         *
 *               or intended publication of such source code.              *
 *                                                                         *
 ************************************************************************** */

// React-specific imports
import React from 'react';

// External libraries
import type { Metadata } from 'next';
import { VT323 } from 'next/font/google';

// Internal imports
import { StyledComponentsRegistry } from '@/lib/StyledComponentsRegistry';
import { Providers } from '@/lib/Providers';

const vt323 = VT323({
  weight: '400',
  subsets: ['latin'],
});

const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'Screen Fixer | Retro Pixel Restoration',
  description:
    'Advanced display repair with a nostalgic 8-bit aesthetic. Fix stuck pixels and image retention.',
  keywords: ['screen repair', 'stuck pixel fixer', 'dead pixel', 'image retention', 'retro ui'],
  authors: [{ name: '@struggyyy' }],
  openGraph: {
    title: 'Screen Fixer | Retro Pixel Restoration',
    description: 'Advanced display repair with a nostalgic 8-bit aesthetic.',
    url: 'https://screenfixer.vercel.app', // Representative URL
    siteName: 'Screen Fixer',
    images: [
      {
        url: '/favicon.ico', // Use favicon as temporary logo as requested
        width: 32,
        height: 32,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Screen Fixer | Retro Pixel Restoration',
    description: 'Advanced display repair with a nostalgic 8-bit aesthetic.',
    images: ['/favicon.ico'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Root layout defining the base structure and global font.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={vt323.className}>
        <StyledComponentsRegistry>
          <Providers>{children}</Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
