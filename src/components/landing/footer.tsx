'use client';

import { Shield } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="py-12 bg-muted/30 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="relative w-8 h-8 rounded overflow-hidden">
                <Image
                  src="/images/logo.jpeg"
                  alt="Zequent Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-heading font-bold text-xl text-foreground">Zequent</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              The developer framework for autonomous robotics. Build, deploy, and operate autonomous systems at scale.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/zequent-technologies"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Framework</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/docs/sdk/setup" className="text-muted-foreground hover:text-primary transition-colors">
                  Setup Guide
                </Link>
              </li>
              <li>
                <Link href="/docs/sdk/client/quickstart" className="text-muted-foreground hover:text-primary transition-colors">
                  Client SDK
                </Link>
              </li>
              <li>
                <Link href="/docs/sdk/edge/overview" className="text-muted-foreground hover:text-primary transition-colors">
                  Edge SDK
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-muted-foreground hover:text-primary transition-colors">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:office@zequent.com" className="text-muted-foreground hover:text-primary transition-colors">
                  office@zequent.com
                </a>
              </li>
              <li>
                <a href="tel:+41762087620" className="text-muted-foreground hover:text-primary transition-colors">
                  +41 (0) 762087620
                </a>
              </li>
              <li>
                <span className="text-muted-foreground">
                  Chüngstrasse 31, 8424 Embrach, ZH, Switzerland
                </span>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4" />
                <span>GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4" />
                <span>EU Hosted</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {new Date().getFullYear()} Zequent Technologies. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
