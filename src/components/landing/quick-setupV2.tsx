'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Install the SDK',
    description:
      'Add the Zequent SDK to your project using your language\'s package manager. Choose the Edge SDK to connect a device, or the Client SDK to control devices from your application.',
    image: '/images/setup/step-1-install.svg',
    alt: 'Package manager config showing the Zequent SDK dependency and registry setup',
  },
  {
    number: '02',
    title: 'Configure Your Adapter',
    description:
      'Declare your device identity — serial number, asset type, and platform endpoints. A single config file is all it takes to describe your edge node to the platform.',
    image: '/images/setup/step-2-configure.svg',
    alt: 'Config file showing edge identity and platform service endpoint settings',
  },
  {
    number: '03',
    title: 'Run Zequent',
    description:
      'Start the platform services, then bring your adapter online. It registers automatically, establishes a connection, and is ready to receive commands and push telemetry.',
    image: '/images/setup/step-3-run.svg',
    alt: 'Terminal showing platform services starting and adapter connecting to the platform',
  },
];

const QuickSetupV2 = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }

      if (stepsRef.current) {
        const cards = stepsRef.current.children;
        gsap.from(cards, {
          opacity: 0,
          y: 40,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: stepsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="quick-setup"
      className="relative bg-zequent-black py-24 lg:py-32 overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div ref={headingRef} className="mb-16 lg:mb-20">
          <h2 className="font-soehne text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light text-white leading-[1.1] tracking-tight max-w-3xl">
            Up and running in three steps.
          </h2>
        </div>

        <div
          ref={stepsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-px border border-white/10"
        >
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="flex flex-col bg-zequent-black p-8 lg:p-10"
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="font-soehne text-xs font-medium text-white/20 tabular-nums">
                  {step.number}
                </span>
                <div className="flex-1 h-px bg-white/8" />
              </div>

              <div className="mb-8 rounded-lg overflow-hidden border border-white/10">
                <img
                  src={step.image}
                  alt={step.alt}
                  className="w-full h-auto block"
                  loading="lazy"
                />
              </div>

              <h3 className="font-soehne text-xl sm:text-2xl font-light text-white mb-3">
                {step.title}
              </h3>
              <p className="font-soehne text-base text-white/50 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default QuickSetupV2;
