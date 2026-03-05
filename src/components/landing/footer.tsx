'use client';

import { Shield, Linkedin, Github } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-12 py-14">
          <div className="col-span-2 md:col-span-4">
            <Link href="/" className="inline-flex items-center mb-5">
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
            <p className="text-sm text-muted-foreground leading-relaxed mb-5 max-w-xs">
              The developer framework for autonomous robotics. Build, deploy, and operate at scale.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/Zequent"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/zequent-technologies"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/70 mb-4">
              Framework
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/docs/sdk/setup" className="text-muted-foreground hover:text-foreground transition-colors">
                  Setup Guide
                </Link>
              </li>
              <li>
                <Link href="/docs/sdk/client/quickstart" className="text-muted-foreground hover:text-foreground transition-colors">
                  Client SDK
                </Link>
              </li>
              <li>
                <Link href="/docs/sdk/edge/overview" className="text-muted-foreground hover:text-foreground transition-colors">
                  Edge SDK
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/70 mb-4">
              Company
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="mailto:office@zequent.com" className="text-muted-foreground hover:text-foreground transition-colors">
                  office@zequent.com
                </a>
              </li>
              <li>
                <a href="tel:+41762087620" className="text-muted-foreground hover:text-foreground transition-colors">
                  +41 (0) 762087620
                </a>
              </li>
              <li className="text-muted-foreground leading-relaxed">
                Chüngstrasse 31<br />
                8424 Embrach, ZH<br />
                Switzerland
              </li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/70 mb-4">
              Legal
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="py-6 border-t border-border/40">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground/60">
                <Shield className="w-3.5 h-3.5" />
                <span>GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground/60">
                <Shield className="w-3.5 h-3.5" />
                <span>EU Hosted</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground/60">
              &copy; {new Date().getFullYear()} Zequent Technologies. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
