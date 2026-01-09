'use client';

import { motion } from "framer-motion";
import Image from "next/image";

const Showcase = () => {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">
            Battle-Tested in Production
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Powering missions that demand perfection
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            From defense operations to law enforcement, Zequent delivers the reliability and performance required for mission-critical autonomous systems.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto mb-12"
        >
          <div className="relative rounded-2xl overflow-hidden border border-border shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
            <Image
              src="/assets/images/drone.jpg"
              alt="Autonomous drone in operation"
              width={1200}
              height={600}
              className="w-full h-auto"
              priority
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-foreground leading-tight">
            Real missions. Real stakes. Zero compromise.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Showcase;
