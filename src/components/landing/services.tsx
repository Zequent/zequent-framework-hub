import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const features = [
  {
    category: "Modular Solutions",
    title: "A fully integrated suite of programmable services",
    description: "We bring together everything that's required to program, automate and scale robotics for a wide range of business models. Zequent's products power robotics for SaaS, Platforms, Managed Services, and everything in between.",
    cta: "Start with Modular Solutions",
  },
  {
    category: "Live Data",
    title: "Leverage live data from robotics and IoT",
    description: "Access real-time telemetry, diagnostics, and operational data from your entire fleet. Our data pipeline handles millions of events per second, giving you instant visibility into your robotics operations at any scale.",
    cta: "Start with Live Data",
  },
  {
    category: "Remote Control",
    title: "Task and control robotics remotely at scale and speed",
    description: "Command and control your robots from anywhere in the world. Our secure, low-latency infrastructure ensures responsive control even in bandwidth-constrained environments, with built-in failsafes and redundancy.",
    cta: "Start with Remote Control",
  },
  {
    category: "AI as a Service",
    title: "Enhance robotics with centralized intelligence",
    description: "Deploy sophisticated AI models without infrastructure overhead. Our edge-to-cloud AI pipeline handles everything from computer vision to path planning, with automatic model updates and performance optimization.",
    cta: "Start with AI as a Service",
  },
];

export function Services() {
  return (
    <section id="features" className="py-32 bg-[#f6f9fc] dark:bg-[#0a2540]">
      <Container>
        <div className="max-w-[1080px] mx-auto space-y-20">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col gap-8">
              <div className="max-w-[540px]">
                <div className="pl-4 space-y-6">
                  <div className="text-[17.7px] leading-[28px] tracking-[0.2px] font-medium text-[#0173e7] dark:text-[#3b9eff]">
                    {feature.category}
                  </div>
                  <h2 className="text-[37px] leading-[48px] tracking-[-0.2px] font-medium text-[#0A2540] dark:text-white max-w-[508px]">
                    {feature.title}
                  </h2>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-0">
                <div className="md:w-[540px] pl-4 pr-8">
                  <p className="text-lg leading-[28px] tracking-[0.2px] font-light text-[#425466] dark:text-[#adbdcc] max-w-[492px]">
                    {feature.description}
                  </p>
                </div>
                <div className="md:w-[540px]"></div>
              </div>
              
              <div className="max-w-[540px] pl-4">
                <Button href="#" size="lg" className="group">
                  {feature.cta}
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
