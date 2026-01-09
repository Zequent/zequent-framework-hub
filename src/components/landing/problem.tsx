'use client';

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

const challenges = [
  {
    without: "Stitching together 10+ vendor SDKs, protocols, and black-boxed dependencies",
    with: "Single integrated execution framework with open architecture",
  },
  {
    without: "Weeks to integrate new hardware, brittle connections that break on updates",
    with: "Plug-and-play hardware onboarding with stable APIs",
  },
  {
    without: "Zero visibility into production systems, debugging becomes guesswork",
    with: "Full observability with runtime-grade monitoring and auditability",
  },
  {
    without: "Scaling from 5 to 50 robots means rewriting everything",
    with: "Scale fleets seamlessly from prototype to production",
  },
  {
    without: "Vendor lock-in forces compromise on security and deployment",
    with: "Deploy anywhere: EU cloud, on-premise, or fully air-gapped",
  },
];

const Problem = () => {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.03]" />
      
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">
            What We Solve
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Replace fragmented tooling with{" "}
            <span className="text-primary">unified infrastructure</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Stop maintaining brittle integrations. Zequent eliminates the complexity of building production-grade autonomous systems.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-6">
          {challenges.map((challenge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <div className="flex gap-4 p-6 rounded-xl bg-card border border-border/50 opacity-60 group-hover:opacity-70 transition-opacity">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center">
                      <X className="w-4 h-4 text-destructive" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground leading-relaxed line-through decoration-destructive/30">
                      {challenge.without}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 p-6 rounded-xl bg-card border border-primary/20 group-hover:border-primary/40 group-hover:shadow-lg group-hover:shadow-primary/5 transition-all duration-300">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground leading-relaxed font-medium">
                      {challenge.with}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-10 h-10 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problem;
