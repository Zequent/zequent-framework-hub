'use client';

import { motion } from "framer-motion";
import { Boxes, Activity, Joystick, MapPin, Eye } from "lucide-react";

const features = [
  {
    icon: Boxes,
    category: "Modular Solutions",
    title: "A fully integrated suite of programmable services",
    description: "Bring together everything required to program, automate and scale robotics. Zequent's products power robotics for SaaS, Platforms, Managed Services, and everything in between.",
    tags: ["Integrated", "Scalable", "Flexible"],
  },
  {
    icon: Activity,
    category: "Live Data Service",
    title: "Real-time data streaming and telemetry",
    description: "Stream live position data, battery status, and telemetry from your entire fleet. High-throughput data pipeline provides instant visibility into operational metrics across all systems.",
    tags: ["Streaming", "Position", "Battery", "Telemetry"],
  },
  {
    icon: Joystick,
    category: "Remote Control Service",
    title: "Human control and live task management",
    description: "Direct robot control with live input handling, gimbal control, and real-time command execution. Secure, low-latency connection ensures responsive operation from anywhere.",
    tags: ["Live inputs", "Gimbal", "Control"],
  },
  {
    icon: MapPin,
    category: "Mission Autonomy Service",
    title: "Mission planning, management and scheduling",
    description: "Comprehensive mission lifecycle management from planning to execution. Define operations, tasks, and waypoints with intelligent scheduling and real-time monitoring.",
    tags: ["Operations", "Tasks", "Waypoints", "Lifecycle"],
  },
  {
    icon: Eye,
    category: "Detection/AI Service",
    title: "Computer vision and analytics",
    description: "Advanced object detection, tracking, and AI-powered analytics. Deploy smart features with chat interfaces and intelligent decision-making capabilities at the edge.",
    tags: ["Object detection", "Tracking", "AI detection", "Chat", "Smart features"],
  },
];

const Features = () => {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">
            Platform Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Everything you need to build great robotics software
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Robotics software is fragmented across too many products — We unify them into one secure developer platform.
          </p>
        </motion.div>

        <div className="space-y-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-8 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 group-hover:bg-primary/15 transition-colors">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                      {feature.category}
                    </span>
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {feature.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium bg-primary/5 text-primary rounded-full border border-primary/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
