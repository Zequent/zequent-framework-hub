'use client';

import { motion } from "framer-motion";
import Image from "next/image";

const painPoints = [
  {
    label: "Integration hell",
    description: "Every hardware vendor ships its own SDK with its own protocol and data format. You write adapter code instead of application logic.",
  },
  {
    label: "No standard for operations",
    description: "No unified way to plan a mission, stream telemetry, or send a command across different hardware. New device, new pipeline, from scratch.",
  },
  {
    label: "Fragile at scale",
    description: "What works for 3 drones in a lab breaks at 30 in the field. Telemetry pipelines, mission planners, and deployments don't scale without a rewrite.",
  },
  {
    label: "Deployment constraints",
    description: "Defense and public safety need on-premise, sometimes fully air-gapped. You need EU cloud and isolated on-prem from one codebase, with compliance built in.",
  },
];

const Problem = () => {
  return (
    <section className="py-24 lg:py-32 bg-muted/30 relative overflow-hidden">
      <div className="container mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">
                The Problem
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-6">
                Autonomous systems break in production
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Teams building autonomous systems spend more time on infrastructure plumbing than on the product itself. The tooling landscape is fragmented, vendor-specific, and not designed for production.
              </p>
            </motion.div>

            <div className="space-y-4">
              {painPoints.map((point, index) => (
                <motion.div
                  key={point.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-5 bg-card rounded-xl border border-border"
                >
                  <h3 className="text-base font-heading font-semibold text-foreground mb-2">
                    {point.label}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {point.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="hidden lg:block"
          >
            <div className="relative rounded-2xl overflow-hidden border border-border aspect-[4/5]">
              <Image
                src="/images/network.jpg"
                alt="Complex network infrastructure"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
