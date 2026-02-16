'use client';

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Add the SDK",
    description: "Add one dependency to your project. The SDK auto-configures connections to platform services using environment variables. No boilerplate, no scaffolding tools required.",
  },
  {
    number: "02",
    title: "Connect your hardware",
    description: "Build an edge adapter for your specific device by implementing a single interface. Override the methods your hardware supports -- the framework handles registration, streaming, and routing.",
  },
  {
    number: "03",
    title: "Ship to production",
    description: "Deploy to EU cloud or on-premise with the same codebase. Docker containers, environment configuration, and compliance are built into the deployment model from day one.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-6">
            From zero to production in three steps
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Get operational fast. The framework handles infrastructure so you focus on your application logic and hardware integration.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="relative"
            >
              <div className="p-6 bg-card rounded-xl border border-border h-full">
                <span className="text-5xl font-heading font-bold text-primary/15 block mb-4">
                  {step.number}
                </span>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <Button size="lg" className="h-12 px-8 text-base font-medium" asChild>
            <Link href="/docs/sdk/setup">
              Start Building
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
