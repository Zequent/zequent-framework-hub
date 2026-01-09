'use client';

import * as React from 'react';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    const root = window.document.documentElement;
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    root.classList.remove('light', 'dark');
    root.classList.add(savedTheme);
  }, []);

  return <>{children}</>;
}
