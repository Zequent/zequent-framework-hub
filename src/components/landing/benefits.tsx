'use client';

import { motion } from "framer-motion";

const reasons = [
  {
    title: "No glue code",
    description: "The framework defines clean interfaces between your application and the hardware layer. Add a dependency, call typed methods -- no custom protocols or serialization layers in between.",
  },
  {
    title: "Hardware-agnostic",
    description: "Switching vendors means writing a new adapter, not rewriting your application. The framework abstracts hardware operations so your application logic stays the same regardless of the hardware underneath.",
  },
  {
    title: "Deploy anywhere",
    description: "EU cloud or fully air-gapped on-premise. Same containers, same configuration, same SDKs. Your application code does not change between deployment targets. GDPR compliance is built into the architecture.",
  },
  {
    title: "Production-grade scale",
    description: "Services scale independently. Sustained telemetry from hundreds of assets, concurrent mission operations with conflict detection. This is framework infrastructure for real deployments, not a prototype toolkit.",
  },
  {
    title: "Open, not opaque",
    description: "You see the interfaces. You see the data models. You control the adapter code. No proprietary black boxes between your application and your hardware. The framework provides structure. The logic is yours.",
  },
  {
    title: "Modern stack",
    description: "Built on a modern, battle-tested runtime optimized for fast startup, low memory footprint, and native compilation. The same stack that runs cloud microservices at scale, applied to robotics.",
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
            Why zqnt
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-6">
            What you actually get
          </h2>
          <p className="text-lg text-primary-foreground/80 leading-relaxed">
            Technical decisions that make a difference when you are shipping autonomous systems to production environments.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="p-6 rounded-lg bg-primary-foreground/5 border border-primary-foreground/10"
            >
              <h3 className="text-lg font-heading font-semibold mb-3">
                {reason.title}
              </h3>
              <p className="text-sm text-primary-foreground/70 leading-relaxed">
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
