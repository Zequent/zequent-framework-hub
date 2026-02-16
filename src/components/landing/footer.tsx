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
            <p className="text-sm text-muted-foreground">
              The developer framework for autonomous robotics. Build, deploy, and operate autonomous systems at scale.
            </p>
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
                <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Sales
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
