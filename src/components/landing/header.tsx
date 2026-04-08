'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";

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

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      setIsOpen(false);
    }
  };

  const navLinks = [
    { label: "Quick Setup", href: "#quick-setup" },
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Showcase", href: "#showcase" },
    { label: "Open Source", href: "#repos" },
  ];

  return (
    <header
      ref={headerRef}
      style={{ opacity: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-zequent-black border-b border-primary/60"
    >
      <div className="container px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <img
              src="/images/Zequent_logo_black.svg"
              alt="Zequent"
              className="h-6 w-auto dark:hidden"
            />
            <img
              src="/images/Zequent_logo_white.svg"
              alt="Zequent"
              className="h-6 w-auto hidden dark:block"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-5">
            <a
              href="#contact"
              onClick={(e) => handleAnchorClick(e, '#contact')}
              className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </a>
            {/* <ThemeToggle />  hidden for now */}
            <Link
              href="/docs/sdk/setup"
              className="inline-flex items-center gap-2 px-4 py-1.5 border border-foreground text-sm font-semibold text-foreground hover:bg-foreground hover:text-background transition-all duration-200"
            >
              <span>Get started</span>
              <img
                src="/images/button_arrow_tomato.svg"
                alt=""
                className="w-3.5 h-3.5"
              />
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => handleAnchorClick(e, '#contact')}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                Contact
              </a>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                {/* <ThemeToggle />  hidden for now */}
                <Link
                  href="/docs/sdk/setup"
                  className="inline-flex items-center gap-2 flex-1 justify-center px-5 py-2 border border-foreground text-sm font-semibold text-foreground hover:bg-foreground hover:text-background transition-all duration-200"
                >
                  <span>Get started</span>
                  <img src="/images/button_arrow_tomato.svg" alt="" className="w-4 h-4" />
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
