'use client';

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, ArrowUpRight } from "lucide-react";
import ContactForm from "@/components/landing/contact-form";

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: "office@zequent.com",
    href: "mailto:office@zequent.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+41 (0) 762087620",
    href: "tel:+41762087620",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "Chüngstrasse 31, 8424 Embrach, ZH, Switzerland",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Zequent Technologies",
    href: "https://www.linkedin.com/company/zequent-technologies",
    external: true,
  },
];

const Contact = () => {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
              Contact
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground leading-[1.1] max-w-lg">
              Let&apos;s build something together
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-4 flex flex-col justify-between"
            >
              <div className="space-y-1">
                {contactDetails.map((item, i) => {
                  const content = (
                    <div className="group flex items-start gap-4 py-4 border-b border-border/50 last:border-0">
                      <item.icon className="w-[18px] h-[18px] text-muted-foreground mt-0.5 shrink-0 group-hover:text-primary transition-colors" />
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70 mb-0.5">
                          {item.label}
                        </p>
                        <p className="text-sm text-foreground group-hover:text-primary transition-colors leading-relaxed">
                          {item.value}
                          {item.external && (
                            <ArrowUpRight className="inline w-3.5 h-3.5 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                          )}
                        </p>
                      </div>
                    </div>
                  );

                  return item.href ? (
                    <a
                      key={i}
                      href={item.href}
                      {...(item.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={i}>{content}</div>
                  );
                })}
              </div>

            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-8"
            >
              <div className="p-6 sm:p-10 rounded-2xl border border-border/60 dark:border-white/[0.06] bg-card/50 dark:bg-white/[0.02] backdrop-blur-sm">
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
