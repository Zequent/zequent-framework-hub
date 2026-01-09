'use client';

import { motion } from "framer-motion";
import { Target, ShieldCheck, Zap, Users } from "lucide-react";

const reasons = [
  {
    icon: Target,
    title: "Mission-Critical by Design",
    description: "Built from day one for environments where failure is not an option.",
  },
  {
    icon: ShieldCheck,
    title: "Risk Reduction",
    description: "Increases trust in production systems through transparency and auditability.",
  },
  {
    icon: Zap,
    title: "Rapid Deployment",
    description: "Scale quickly across fleets, sites, and jurisdictions without starting over.",
  },
  {
    icon: Users,
    title: "Proven Track Record",
    description: "Trusted by NATO, military, and police operations worldwide.",
  },
];

const WhyZequent = () => {
  return (
    <section className="py-24 lg:py-32 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="inline-block text-sm font-medium text-primary-foreground/70 uppercase tracking-wider mb-4">
            Why Zequent?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-6">
            Built for what matters most
          </h2>
          <p className="text-lg text-primary-foreground/80 leading-relaxed">
            When autonomous systems must work flawlessly, teams choose Zequent.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-lg bg-primary-foreground/5 border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-colors"
            >
              <div className="flex items-center justify-center w-12 h-12 mb-5 rounded-lg bg-primary-foreground/10">
                <reason.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3">
                {reason.title}
              </h3>
              <p className="text-primary-foreground/70 leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyZequent;
