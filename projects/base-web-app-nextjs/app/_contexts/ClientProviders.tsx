'use client';

import { ReactNode } from 'react';
import AlertProvider from './AlertProvider';
import ReactQueryProvider from './ReactQueryProvider';
import { ThemeProvider } from './ThemeContext';

interface ClientProvidersProps {
  children: ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <ThemeProvider>
      <AlertProvider>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </AlertProvider>
    </ThemeProvider>
  );
}
