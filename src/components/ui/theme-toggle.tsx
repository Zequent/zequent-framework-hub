'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

export function ThemeToggle() {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');

  React.useEffect(() => {
    const root = window.document.documentElement;
    const initialTheme = root.classList.contains('dark') ? 'dark' : 'light';
    setTheme(initialTheme);
  }, []);

  const toggleTheme = (checked: boolean) => {
    const root = window.document.documentElement;
    const newTheme = checked ? 'dark' : 'light';
    
    root.classList.remove('light', 'dark');
    root.classList.add(newTheme);
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-muted/50 border border-border">
      <Sun className={`h-5 w-5 transition-colors ${theme === 'light' ? 'text-primary' : 'text-muted-foreground'}`} />
      <Switch
        checked={theme === 'dark'}
        onCheckedChange={toggleTheme}
        aria-label="Toggle theme"
        className="data-[state=checked]:bg-primary"
      />
      <Moon className={`h-5 w-5 transition-colors ${theme === 'dark' ? 'text-primary' : 'text-muted-foreground'}`} />
    </div>
  );
}
