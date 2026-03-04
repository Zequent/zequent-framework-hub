'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, ArrowUpRight, BookOpen, Bug, GitPullRequest } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const repositories = [
  {
    name: "Client Java SDK",
    repo: "zqnt-client-sdk-java",
    description: "Add as a dependency — connect to Zequent services from your application.",
    href: "https://github.com/Zequent/zqnt-client-sdk-java",
  },
  {
    name: "Edge Java SDK",
    repo: "zqnt-edge-sdk-java",
    description: "Add as a dependency for the edge side — runs on device, syncs with the platform.",
    href: "https://github.com/Zequent/zqnt-edge-sdk-java",
  },
  {
    name: "Utils",
    repo: "zqnt-utils",
    description: "Shared data models, serialization, and config primitives used across SDKs.",
    href: "https://github.com/Zequent/zqnt-utils",
  },
  {
    name: "Documentation",
    repo: "zequent-framework-docs",
    description: "Zequent ecosystem documentation. Learn how to use Zequent, from SDK setup to advanced features.",
    href: "https://github.com/Zequent/zequent-framework-docs",
  },
];

const Repos = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Sidebar reveal
      if (sidebarRef.current) {
        const els = sidebarRef.current.children;
        gsap.set(els, { opacity: 0, y: 25 });
        gsap.to(els, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: sidebarRef.current, start: 'top 80%', once: true },
        });
      }

      //slide from right
      if (listRef.current) {
        const items = listRef.current.querySelectorAll('a');
        gsap.set(items, { opacity: 0, x: 20 });
        gsap.to(items, {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: listRef.current, start: 'top 82%', once: true },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16">
            <div ref={sidebarRef} className="lg:sticky lg:top-32 lg:self-start">
              <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">
                Repositories
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-5">
                Source code on GitHub
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                The SDKs are distributed as packages through GitHub Packages. The source is fully public — browse the code, report bugs, or contribute.
              </p>

              <div className="space-y-3 mb-10">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <BookOpen className="w-4 h-4 text-primary/70 shrink-0" />
                  <span>Read the source and understand how it works</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Bug className="w-4 h-4 text-primary/70 shrink-0" />
                  <span>Open issues if something is off</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <GitPullRequest className="w-4 h-4 text-primary/70 shrink-0" />
                  <span>Submit pull requests</span>
                </div>
              </div>

              <a
                href="https://github.com/Zequent"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-sm font-medium bg-foreground text-background px-5 py-2.5 rounded-lg hover:bg-foreground/90 transition-colors"
              >
                <Github className="w-4 h-4" />
                github.com/Zequent
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </a>
            </div>

            <div className="relative" ref={listRef}>
              <div className="absolute left-[11px] top-4 bottom-4 w-px bg-border hidden md:block" />

              <div className="space-y-0">
                {repositories.map((repo) => (
                  <a
                    key={repo.repo}
                    href={repo.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-5 py-6 first:pt-0 last:pb-0"
                  >
                    <div className="relative shrink-0 hidden md:flex items-center justify-center w-[23px] h-[23px] mt-0.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-border group-hover:bg-primary transition-colors duration-200" />
                    </div>

                    <div className="flex-1 min-w-0 pb-6 border-b border-border/50 group-last:border-0">
                      <div className="flex items-start justify-between gap-3 mb-1.5">
                        <h3 className="text-lg font-heading font-semibold text-foreground group-hover:text-primary transition-colors">
                          {repo.name}
                        </h3>
                        <ArrowUpRight className="w-4 h-4 text-muted-foreground/25 group-hover:text-primary transition-colors shrink-0 mt-1" />
                      </div>
                      <p className="text-xs font-mono text-muted-foreground/40 mb-2">
                        {repo.repo}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {repo.description}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Repos;
