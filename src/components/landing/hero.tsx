'use client';

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-foreground leading-[1.08] tracking-tight mb-6">
            Infrastructure for{" "}
            <span className="text-primary">
              autonomous systems
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Engineering teams use Zequent to deploy autonomous systems faster, operate them safely, and scale them without rewriting their stack.<br className="hidden sm:block" />
            Think Kubernetes, but for autonomous systems running in the real world.
          </p>

          <Link href="/docs/sdk/setup" className="inline-block group">
            <div className="relative p-1 rounded-xl bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 dark:from-primary/30 dark:via-primary/20 dark:to-primary/30">
              <div className="absolute -inset-2 bg-primary/0 group-hover:bg-primary/10 dark:group-hover:bg-primary/20 rounded-2xl blur-xl transition-all duration-500" />
              <div className="relative px-10 py-4 bg-background hover:bg-muted/50 dark:hover:bg-muted/30 rounded-lg border-2 border-primary/50 dark:border-primary/60 group-hover:border-primary dark:group-hover:border-primary transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-primary/20 dark:via-primary/30 to-transparent" />
                <div className="relative flex items-center gap-3 text-lg font-semibold text-foreground">
                  <span>Get Started</span>
                  <Play className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 text-primary fill-primary" />
                </div>
              </div>
            </div>
          </Link>

          <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground/60">
            <span>EU Cloud & On-Premise</span>
            <span>•</span>
            <span>GDPR Compliant</span>
            <span>•</span>
            <span>Open Source</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative rounded-2xl overflow-hidden border border-border shadow-2xl shadow-primary/5 aspect-[16/9]">
            <Image
              src="/images/counter-intrusion.jpg"
              alt="Autonomous systems in night operations"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
