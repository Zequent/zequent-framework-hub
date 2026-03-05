'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
    );
  }, []);

  const navLinks = [
    { label: "Architecture", href: "#solution" },
    { label: "Services", href: "#features" },
    { label: "Getting Started", href: "#how-it-works" },
    { label: "Why Zequent", href: "#showcase" },
  ];

  return (
    <header
      ref={headerRef}
      style={{ opacity: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
    >
      <div className="container px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <img
              src="/images/Zequent_logo_black.svg"
              alt="Zequent"
              className="h-8 w-auto dark:hidden"
            />
            <img
              src="/images/Zequent_logo_white.svg"
              alt="Zequent"
              className="h-8 w-auto hidden dark:block"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/docs"
              className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Docs
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Button size="sm" asChild>
              <Link href="/docs/sdk/setup">Get Started</Link>
            </Button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div
            className="md:hidden py-4 border-t border-border"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
              <Link
                href="/docs"
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors py-2"
              >
                Documentation
              </Link>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <ThemeToggle />
                <Button size="sm" className="flex-1" asChild>
                  <Link href="/docs/sdk/setup">Get Started</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
