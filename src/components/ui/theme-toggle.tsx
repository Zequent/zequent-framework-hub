'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-14 h-7 rounded-full bg-muted/30" />;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`
        relative w-14 h-7 rounded-full p-[3px] transition-colors duration-500 ease-in-out
        ${isDark 
          ? 'bg-slate-700 hover:bg-slate-600' 
          : 'bg-amber-100 hover:bg-amber-200/80'
        }
      `}
      aria-label="Toggle theme"
    >
      <div
        className={`
          relative w-[22px] h-[22px] rounded-full transition-all duration-500 ease-in-out
          ${isDark 
            ? 'translate-x-[26px] bg-slate-900 shadow-[inset_-3px_-2px_0_0_theme(colors.slate.400)]' 
            : 'translate-x-0 bg-amber-400 shadow-[0_0_8px_2px_theme(colors.amber.300/40)]'
          }
        `}
      />
    </button>
  );
}
