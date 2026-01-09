'use client';

import { motion } from "framer-motion";
import { ArrowRight, DollarSign, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-muted/30 to-background dark:from-muted/10 dark:to-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(90deg, hsl(var(--foreground)) 0px, hsl(var(--foreground)) 1px, transparent 1px, transparent 280px)`,
          backgroundSize: '280px 100%'
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:pt-4"
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6 leading-[1.1]">
                Ready to get started?
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed mb-10">
                Explore Zequent, or create an account instantly and start building robotics software. You can also contact us to design a custom package for your business use case.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="group h-14 px-6 text-base font-medium">
                  Start now
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="outline" size="lg" className="h-14 px-6 text-base font-medium">
                  Contact sales
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </motion.div>

            <div className="space-y-8 lg:pt-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="relative pl-6 border-l-2 border-primary"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                    Always know what you pay
                  </h3>
                </div>
                <p className="text-base text-muted-foreground leading-relaxed mb-4">
                  Transparent per-asset pricing with no hidden fees.
                </p>
                <a href="#pricing" className="inline-flex items-center text-base font-medium text-primary hover:underline">
                  Pricing details
                  <ArrowRight className="ml-1.5 w-4 h-4" />
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative pl-6 border-l-2 border-primary"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                    Start your integration
                  </h3>
                </div>
                <p className="text-base text-muted-foreground leading-relaxed mb-4">
                  Get up and running with Zequent in as little as 10 minutes.
                </p>
                <a href="#docs" className="inline-flex items-center text-base font-medium text-primary hover:underline">
                  API reference
                  <ArrowRight className="ml-1.5 w-4 h-4" />
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
