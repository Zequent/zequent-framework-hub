'use client';

import { motion } from "framer-motion";
import { Wrench, Eye, Rocket, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Wrench,
    title: "Build & Integrate",
    description: "Integrated, headless execution framework replaces fragmented systems",
    color: "bg-primary/10",
  },
  {
    number: "02",
    icon: Eye,
    title: "Operate & Monitor",
    description: "Runtime-grade ops layer ensures reliability & auditability",
    color: "bg-primary/10",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Scale Anywhere",
    description: "Cloud or air-gapped on-prem deployment for mission-critical environments",
    color: "bg-primary/10",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-muted/30 to-background">
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground">
            Three steps to reliable autonomy
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 relative">
            <div className="hidden lg:block absolute top-24 left-[calc(33.33%+1rem)] right-[calc(33.33%+1rem)] h-[2px] bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />
            
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                <div className="bg-card rounded-xl border border-border p-8 h-full hover:shadow-lg hover:border-primary/30 hover:shadow-primary/5 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-5xl font-heading font-bold text-primary/20">
                      {step.number}
                    </span>
                    <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${step.color}`}>
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>

                  <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-4">
                    <ArrowRight className="w-6 h-6 text-primary/40 rotate-90" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
