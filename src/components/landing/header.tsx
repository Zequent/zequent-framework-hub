'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Menu, X } from "lucide-react";
import Link from "next/link";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [getStartedHover, setGetStartedHover] = useState(false);
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
    { label: 'Platform', href: '#platform' },
    { label: 'Develop', href: '#develop' },
    { label: 'Quick Setup', href: '#quick-setup' },
    { label: 'Features', href: '#features' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header
      ref={headerRef}
      style={{ opacity: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-zequent-black border-b border-primary/60"
    >
      <div className="container px-6">
        <div className="relative h-[65px] flex items-center">
          <Link href="/" className="flex items-center lg:absolute lg:left-0 lg:top-1/2 lg:-translate-y-1/2">
            <img
              src="/images/Zequent_logo_black.svg"
              alt="Zequent"
              className="h-7 w-auto dark:hidden"
            />
            <img
              src="/images/Zequent_logo_white.svg"
              alt="Zequent"
              className="h-7 w-auto hidden dark:block"
            />
          </Link>

          <nav className="hidden lg:flex items-center justify-center gap-7 w-full h-full">
            {navLinks.map((link) => (
              link.href.startsWith('#') ? (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              )
            ))}
          </nav>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="ml-auto lg:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        <Link
          href="/docs/sdk/setup"
          className="hidden lg:inline-flex absolute top-0 right-0 h-[65px] items-center px-8 border-l border-primary/40 text-sm font-semibold overflow-hidden"
          style={{
            background: '#8B3A2A',
            color: getStartedHover ? '#8B3A2A' : '#ffffff',
            transition: 'color 0.15s ease 0.18s',
          }}
          onMouseEnter={() => setGetStartedHover(true)}
          onMouseLeave={() => setGetStartedHover(false)}
        >
          <span
            className="absolute inset-0"
            style={{
              background: '#ffffff',
              transform: getStartedHover ? 'scaleX(1)' : 'scaleX(0)',
              transformOrigin: getStartedHover ? 'left' : 'right',
              transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
          <span className="relative z-10 whitespace-nowrap">Get started</span>
        </Link>

        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                link.href.startsWith('#') ? (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                  >
                    {link.label}
                  </Link>
                )
              ))}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                {/* <ThemeToggle />  hidden for now */}
                <Link
                  href="/docs/sdk/setup"
                  className="inline-flex items-center gap-3 flex-1 justify-center px-5 py-2.5 border border-foreground text-sm font-semibold text-foreground hover:bg-foreground hover:text-background transition-all duration-200"
                >
                  <span>Get started</span>
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
