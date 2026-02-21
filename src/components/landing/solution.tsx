'use client';

import { motion } from "framer-motion";
import { ArrowRight, Layers, Radio, Cpu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const pillars = [
  {
    icon: Layers,
    title: "SDKs",
    description: "Build applications that command and monitor autonomous systems. Typed interfaces for remote control, telemetry, missions, and more. Add a dependency, configure, and start calling services.",
    link: "/docs/sdk/client/quickstart",
    linkLabel: "Client SDK Docs",
  },
  {
    icon: Radio,
    title: "Edge Adapters",
    description: "Connect any hardware to the platform. Implement a single interface for your specific device -- drones, docks, vehicles, sensors. The framework handles registration, streaming, and routing.",
    link: "/docs/sdk/edge/overview",
    linkLabel: "Edge SDK Docs",
  },
  {
    icon: Cpu,
    title: "Platform Services",
    description: "Remote control, live telemetry, mission autonomy, asset management, and AI detection -- all exposed as platform services. Your SDKs connect to them automatically.",
    link: "/docs",
    linkLabel: "Full Documentation",
  },
];

const Solution = () => {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">
              The Solution
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-6">
              One platform, edge to cloud
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              zqnt replaces the patchwork of vendor SDKs, custom adapters, and glue code with a single layered architecture. Hardware adapters and application logic connect through well-defined service boundaries. You write the parts that matter -- the framework handles the rest.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Deploy on EU-hosted cloud infrastructure or fully air-gapped on-premise installations. Same platform, same SDKs, same configuration. Your application code does not change between deployment targets.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative rounded-2xl overflow-hidden border border-border aspect-[4/3]">
              <Image
                src="/images/platform-architecture.png"
                alt="Zequent platform architecture — edge to cloud"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 bg-card rounded-xl border border-border hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                <pillar.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-3">
                {pillar.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {pillar.description}
              </p>
              <Link href={pillar.link} className="inline-flex items-center text-sm font-medium text-primary hover:underline">
                {pillar.linkLabel}
                <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solution;
