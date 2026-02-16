'use client';

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Contact = () => {
  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-6 leading-[1.1]">
                Start building with the framework
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                The documentation covers everything from initial setup to production deployment. Add the SDK to your project and send your first command in under 10 minutes. For custom deployment requirements or enterprise licensing, reach out directly.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="h-12 px-6 text-base font-medium" asChild>
                  <Link href="/docs/sdk/setup">
                    Framework Setup
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="h-12 px-6 text-base font-medium" asChild>
                  <a href="mailto:office@zequent.com">
                    Contact Sales
                  </a>
                </Button>
              </div>
            </motion.div>

            <div className="space-y-6 lg:pt-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="p-5 bg-card rounded-xl border border-border"
              >
                <h3 className="text-base font-heading font-semibold text-foreground mb-2">
                  Documentation
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  Setup guides, SDK references, and architecture overviews. Everything you need to integrate the framework into your stack.
                </p>
                <Link href="/docs" className="inline-flex items-center text-sm font-medium text-primary hover:underline">
                  Browse docs
                  <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="p-5 bg-card rounded-xl border border-border"
              >
                <h3 className="text-base font-heading font-semibold text-foreground mb-2">
                  SDK Quickstart
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  Add the dependency, configure your environment, and send your first command. Step-by-step walkthrough with examples.
                </p>
                <Link href="/docs/sdk/client/quickstart" className="inline-flex items-center text-sm font-medium text-primary hover:underline">
                  Start here
                  <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="p-5 bg-card rounded-xl border border-border"
              >
                <h3 className="text-base font-heading font-semibold text-foreground mb-2">
                  Edge Adapters
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  Connect drones, docks, vehicles, and sensors to the platform. Build adapters that translate framework commands into hardware actions.
                </p>
                <Link href="/docs/sdk/edge/overview" className="inline-flex items-center text-sm font-medium text-primary hover:underline">
                  Read overview
                  <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
