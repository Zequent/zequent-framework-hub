import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[965px] flex items-center bg-white dark:bg-[#0f1c2e] overflow-hidden">
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="max-w-[1080px] w-full h-full relative">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-[#e3e8ef]/40 dark:bg-[#1a2f42]/40"></div>
          <div className="absolute left-1/4 top-0 h-1/2 w-px bg-gradient-to-b from-[#e3e8ef]/60 to-transparent dark:from-[#1a2f42]/60"></div>
          <div className="absolute left-1/2 top-0 h-1/2 w-px bg-gradient-to-b from-[#e3e8ef]/60 to-transparent dark:from-[#1a2f42]/60"></div>
          <div className="absolute left-3/4 top-0 h-1/2 w-px bg-gradient-to-b from-[#e3e8ef]/60 to-transparent dark:from-[#1a2f42]/60"></div>
          <div className="absolute right-0 top-0 bottom-0 w-px bg-[#e3e8ef]/40 dark:bg-[#1a2f42]/40"></div>
        </div>
      </div>

      <Container>
        <div className="relative max-w-[640px] pt-32 pb-24">
          <h1 className="text-[64px] md:text-[80px] lg:text-[92px] font-medium text-[#3A3A3A] dark:text-white mb-12 leading-[1.07] tracking-[-0.04em]">
            Build, ship & scale robotics software
          </h1>
          
          <p className="text-lg leading-[28px] tracking-[0.2px] text-[#425466] dark:text-[#adbdcc] mb-12 max-w-[492px] font-light">
            We make developer tools that help software engineers build, ship, and scale great robotics software. Robotics software is fragmented across too many products and tools — We unify them into one secure developer platform.
          </p>
          
          <div className="flex flex-wrap gap-4 items-center">
            <Button href="/docs" size="lg" className="group">
              Start now
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <button className="text-[#0a2540] dark:text-white font-medium text-sm tracking-[0.2px] hover:text-[#0173e7] dark:hover:text-[#3b9eff] transition-colors flex items-center gap-2 group">
              Contact sales
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
