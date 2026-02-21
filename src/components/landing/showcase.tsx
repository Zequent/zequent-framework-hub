'use client';

import { motion } from "framer-motion";
import Image from "next/image";

const images = [
  {
    src: "/images/eu-autonomous-brain.jpg",
    alt: "Autonomous systems intelligence",
    label: "Defense & Security",
    span: "",
    aspect: "aspect-[16/10]",
  },
  {
    src: "/images/industrial-inspection.jpg",
    alt: "Autonomous industrial inspection",
    label: "Industrial Inspection",
    span: "",
    aspect: "aspect-[16/10]",
  },
  {
    src: "/images/drone-agriculture.jpg",
    alt: "Agricultural drone in the field",
    label: "Agriculture",
    span: "",
    aspect: "aspect-[16/10]",
  },
  {
    src: "/images/drone-fleet.jpg",
    alt: "Coordinated autonomous drone fleet",
    label: "Fleet Operations",
    span: "",
    aspect: "aspect-[16/10]",
  },
];

const Showcase = () => {
  return (
    <section className="py-24 lg:py-32 bg-muted/30 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">
            In the Field
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-6">
            Built for real-world operations
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Defense, public safety, agriculture, industrial inspection -- the leading companies rely on Zequent for running autonomous systems in mission-critical production.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-4 max-w-6xl mx-auto mb-16">
          {images.map((img, index) => (
            <motion.div
              key={img.label}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={img.span}
            >
              <div className={`relative rounded-xl overflow-hidden border border-border ${img.aspect}`}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="inline-block text-xs font-semibold uppercase tracking-wider text-white bg-black/60 backdrop-blur-sm rounded-md px-3 py-1.5">
                    {img.label}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="text-2xl sm:text-3xl font-heading font-bold text-foreground leading-tight">
            From prototype to production. Same platform, any scale.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Showcase;
