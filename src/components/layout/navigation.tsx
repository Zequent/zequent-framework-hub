"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useState } from "react";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#0f1c2e]/80 backdrop-blur-md border-b border-[#e3e8ef] dark:border-[#1a2f42]">
      <Container>
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-[#0173e7] dark:text-[#3b9eff]">
              Zequent
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#features"
              className="text-[#425466] hover:text-[#0173e7] dark:text-[#adbdcc] dark:hover:text-[#3b9eff] transition-colors"
            >
              Features
            </Link>
            <Link
              href="#about"
              className="text-[#425466] hover:text-[#0173e7] dark:text-[#adbdcc] dark:hover:text-[#3b9eff] transition-colors"
            >
              About
            </Link>
            <Link
              href="#pricing"
              className="text-[#425466] hover:text-[#0173e7] dark:text-[#adbdcc] dark:hover:text-[#3b9eff] transition-colors"
            >
              Pricing
            </Link>
            <Button href="/docs" size="sm">
              Documentation
            </Button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5 text-[#425466] dark:text-[#adbdcc]" />
              ) : (
                <Sun className="w-5 h-5 text-[#425466] dark:text-[#adbdcc]" />
              )}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5 text-[#425466] dark:text-[#adbdcc]" />
              ) : (
                <Sun className="w-5 h-5 text-[#425466] dark:text-[#adbdcc]" />
              )}
            </button>
            <button
              className="text-[#425466] dark:text-[#adbdcc]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#e3e8ef] dark:border-[#1a2f42]">
            <div className="flex flex-col space-y-4">
              <Link
                href="#features"
                className="text-[#425466] hover:text-[#0173e7] dark:text-[#adbdcc] dark:hover:text-[#3b9eff] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#about"
                className="text-[#425466] hover:text-[#0173e7] dark:text-[#adbdcc] dark:hover:text-[#3b9eff] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="#pricing"
                className="text-[#425466] hover:text-[#0173e7] dark:text-[#adbdcc] dark:hover:text-[#3b9eff] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Button href="/docs" size="sm">
                Documentation
              </Button>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
