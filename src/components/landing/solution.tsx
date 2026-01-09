'use client';

import { motion } from "framer-motion";
import { Layers, Activity, Globe, Shield, CheckCircle2 } from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "Integrated Execution Framework",
    description: "Headless architecture that replaces fragmented systems",
  },
  {
    icon: Activity,
    title: "Runtime-Grade Operations",
    description: "Layer for monitoring, scaling, and full auditability",
  },
  {
    icon: Globe,
    title: "Flexible Deployment",
    description: "Cloud-based (EU) or fully air-gapped on-prem",
  },
  {
    icon: Shield,
    title: "Government-Grade Security",
    description: "GDPR-ready with enterprise compliance",
  },
];

const outcomes = [
  "No black boxes",
  "No glue code", 
  "No vendor lock-in",
];

const Solution = () => {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-muted/20 via-background to-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">
            The Solution
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            Zequent
          </h2>
          <p className="text-xl text-primary font-medium mb-6">
            Operations and Execution Layer for Autonomous Systems
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Teams deploy, operate, and scale autonomy reliably.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start gap-4 p-6 bg-card rounded-lg border border-border hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 flex-shrink-0">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div className="p-6 bg-primary/5 rounded-lg border border-primary/10">
            <p className="text-center mb-4 font-medium text-foreground">Outcome:</p>
            <div className="flex flex-wrap justify-center gap-4">
              {outcomes.map((outcome) => (
                <div key={outcome} className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="font-heading font-medium text-foreground">{outcome}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Solution;
