'use client';

import { motion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";
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
            The framework for{" "}
            <span className="text-primary">autonomous systems</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Build, deploy, and operate autonomous robotics from a single platform. Unified SDKs and services for remote control, live telemetry, mission planning, and AI -- in the cloud or fully on-premise.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 mb-10">
            <Button size="lg" className="h-13 px-7 text-base font-medium" asChild>
              <Link href="/docs">
                <BookOpen className="mr-2 w-5 h-5" />
                Read the Docs
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="h-13 px-7 text-base font-medium" asChild>
              <Link href="/docs/sdk/setup">
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <span>EU Cloud or On-Premise</span>
            <span>GDPR Compliant</span>
            <span>Open Architecture</span>
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
              src="/images/drone-field.jpg"
              alt="Autonomous systems in operation"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
