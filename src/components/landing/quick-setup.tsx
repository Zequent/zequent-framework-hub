'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Terminal, Package, Settings, Code2, Rocket, ChevronDown, Copy, Check } from 'lucide-react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

gsap.registerPlugin(ScrollTrigger);

// CODE BLOCK
const isTerminal = (filename?: string) =>
  !filename || filename === 'terminal';

function CodeBlock({
  code,
  language = 'bash',
  filename,
}: {
  code: string;
  language?: string;
  filename?: string;
}) {
  const [copied, setCopied] = useState(false);
  const terminal = isTerminal(filename);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`relative group rounded-lg overflow-hidden border bg-zinc-950 dark:bg-zinc-900 ${
        terminal
          ? 'border-zinc-700/60 shadow-[0_0_24px_-6px_rgba(0,0,0,0.5)]'
          : 'border-border'
      }`}
    >
      <div
        className={`flex items-center px-4 py-2.5 border-b text-xs font-mono ${
          terminal
            ? 'bg-zinc-800/80 border-zinc-700/50'
            : 'bg-zinc-900 dark:bg-zinc-800 border-border'
        }`}
      >
        <div className="flex items-center gap-1.5 mr-3">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
        <span className="text-zinc-400 flex-1 text-center -ml-8">
          {terminal ? 'Terminal' : filename}
        </span>
        <span className="text-zinc-600 text-[10px] uppercase tracking-wider">
          {language}
        </span>
      </div>

      <div className="relative">
        {terminal && (
          <div className="absolute left-4 top-4 select-none pointer-events-none">
            {code.split('\n').map((line, i) => (
              <div key={i} className="text-[13px] leading-relaxed">
                {line.startsWith('#') ? (
                  <span className="text-transparent">{'  '}</span>
                ) : (
                  <span className="text-emerald-500/70 font-mono">{'$ '}</span>
                )}
              </div>
            ))}
          </div>
        )}
        <pre
          className={`p-4 overflow-x-auto text-[13px] leading-relaxed ${
            terminal ? 'pl-9' : ''
          }`}
        >
          <code className="text-zinc-300 font-mono whitespace-pre">
            {terminal
              ? code.split('\n').map((line, i) => (
                  <span key={i}>
                    {line.startsWith('#') ? (
                      <span className="text-zinc-500 italic">{line}</span>
                    ) : (
                      line
                    )}
                    {'\n'}
                  </span>
                ))
              : code}
          </code>
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-1.5 rounded-md bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
          aria-label="Copy code"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
}

// EXPANDABLE DETAIL
function ExpandableDetail({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="mt-3">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
      >
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
        {label}
      </button>
      <div
        ref={contentRef}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'max-h-[800px] opacity-100 mt-3' : 'max-h-0 opacity-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
}

// STEPS DATA
const steps = [
  {
    number: '01',
    icon: Terminal,
    title: 'Start the platform',
    description: 'Spin up all platform services locally with Docker. One command — the framework handles orchestration, networking, and service discovery.',
    code: `docker compose up -d`,
    language: 'bash',
    filename: 'terminal',
  },
  {
    number: '02',
    icon: Package,
    title: 'Install the SDK',
    description: 'Add the Zequent SDK to your project. Pick the Client SDK for backend applications or the Edge SDK for hardware adapters.',
    tabs: {
      java: {
        label: 'Java',
        code: `<dependency>
    <groupId>com.zqnt.sdk</groupId>
    <artifactId>client-sdk</artifactId>
    <version>1.0.0</version>
</dependency>`,
        language: 'xml',
        filename: 'pom.xml',
      },
      python: {
        label: 'Python',
        soon: true,
        code: `pip install zequent-sdk`,
        language: 'bash',
        filename: 'terminal',
      },
      go: {
        label: 'Go',
        soon: true,
        code: `go get github.com/Zequent/zqnt-client-sdk-go`,
        language: 'bash',
        filename: 'terminal',
      },
    },
  },
  {
    number: '03',
    icon: Settings,
    title: 'Configure your connection',
    description: 'Point the SDK at your platform services. Works the same way locally, in Docker Compose, and in Kubernetes.',
    code: `REMOTE_CONTROL_SERVICE_HOST=localhost
REMOTE_CONTROL_SERVICE_PORT=8002
MISSION_AUTONOMY_SERVICE_HOST=localhost
MISSION_AUTONOMY_SERVICE_PORT=8004
LIVE_DATA_SERVICE_HOST=localhost
LIVE_DATA_SERVICE_PORT=8003`,
    language: 'bash',
    filename: '.env',
    expandable: {
      label: 'See production deployment configs',
      sections: [
        {
          code: `# Docker Compose — use service names
REMOTE_CONTROL_SERVICE_HOST=remote-control-service
MISSION_AUTONOMY_SERVICE_HOST=mission-autonomy-service
LIVE_DATA_SERVICE_HOST=live-data-service`,
          language: 'bash',
          filename: '.env.staging',
        },
        {
          code: `# Kubernetes — enable service discovery
REMOTE_CONTROL_SERVICE_USE_STORK=true
REMOTE_CONTROL_SERVICE_STORK_NAME=remote-control-service
REMOTE_CONTROL_SERVICE_USE_PLAINTEXT=false`,
          language: 'bash',
          filename: '.env.production',
        },
      ],
    },
  },
  {
    number: '04',
    icon: Code2,
    title: 'Write your first command',
    description: 'Inject the client and call typed methods. The SDK handles connections, serialization, retries, and circuit breaking.',
    tabs: {
      java: {
        label: 'Java',
        code: `@Inject
ZequentClient client;

public CompletableFuture<TakeoffResponse> takeoff() {
    return client.remoteControl().takeoff(
        TakeoffRequest.builder()
            .sn("DEVICE_SN")
            .latitude(47.3769f)
            .longitude(8.5417f)
            .altitude(100.0f)
            .build()
    );
}`,
        language: 'java',
        filename: 'DroneController.java',
      },
      python: {
        label: 'Python',
        soon: true,
        code: `client = ZequentClient()

response = await client.remote_control.takeoff(
    sn="DEVICE_SN",
    latitude=47.3769,
    longitude=8.5417,
    altitude=100.0,
)`,
        language: 'python',
        filename: 'drone_controller.py',
      },
      go: {
        label: 'Go',
        soon: true,
        code: `client := zequent.NewClient()

resp, err := client.RemoteControl().Takeoff(ctx, &zequent.TakeoffRequest{
    SN:        "DEVICE_SN",
    Latitude:  47.3769,
    Longitude: 8.5417,
    Altitude:  100.0,
})`,
        language: 'go',
        filename: 'main.go',
      },
    },
  },
  {
    number: '05',
    icon: Rocket,
    title: 'Run it',
    description: 'Start your application and hit the endpoint. Your code talks to the platform — done.',
    code: `mvn quarkus:dev

# Test your endpoint
curl -X POST http://localhost:8080/drone/takeoff`,
    language: 'bash',
    filename: 'terminal',
  },
];

// COMPONENT
const QuickSetup = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        const els = headerRef.current.children;
        gsap.set(els, { opacity: 0, y: 30 });
        gsap.to(els, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%', once: true },
        });
      }

      if (stepsRef.current) {
        const cards = stepsRef.current.querySelectorAll('[data-step]');
        gsap.set(cards, { opacity: 0, y: 40 });
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: stepsRef.current, start: 'top 82%', once: true },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div ref={headerRef} className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">
            Quick Setup
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-6">
            Up and running in five steps
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Install the SDK, configure your connection, and start calling services.
            The platform handles orchestration, communication, and routing.
          </p>
        </div>

        <div ref={stepsRef} className="max-w-6xl mx-auto space-y-14">
          {steps.map((step, idx) => (
            <div key={step.number} data-step className="relative">
              <div className="grid lg:grid-cols-[1fr_1.3fr] gap-8 lg:gap-12 items-start">
                <div className={`flex flex-col justify-center ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 flex items-center justify-center">
                      <step.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-xs font-mono text-primary/60 font-medium tracking-wider">
                      STEP {step.number}
                    </span>
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>

                  {'expandable' in step && step.expandable && (
                    <ExpandableDetail label={step.expandable.label}>
                      {'sections' in step.expandable &&
                        step.expandable.sections?.map((s, i) => (
                          <div key={i} className={i > 0 ? 'mt-3' : ''}>
                            <CodeBlock
                              code={s.code}
                              language={s.language}
                              filename={s.filename}
                            />
                          </div>
                        ))}
                    </ExpandableDetail>
                  )}
                </div>

                <div className={idx % 2 === 1 ? 'lg:order-1' : ''}>
                  {'tabs' in step && step.tabs ? (
                    <Tabs defaultValue={Object.keys(step.tabs)[0]}>
                      <TabsList className="mb-3">
                        {Object.entries(step.tabs).map(([key, tab]) => (
                          <TabsTrigger key={key} value={key} className="gap-1.5">
                            {tab.label}
                            {'soon' in tab && tab.soon && (
                              <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold uppercase leading-none tracking-wider rounded-sm bg-primary/15 text-primary">
                                Soon
                              </span>
                            )}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                      {Object.entries(step.tabs).map(([key, tab]) => (
                        <TabsContent key={key} value={key}>
                          <CodeBlock
                            code={tab.code}
                            language={tab.language}
                            filename={tab.filename}
                          />
                        </TabsContent>
                      ))}
                    </Tabs>
                  ) : (
                    'code' in step &&
                    step.code && (
                      <CodeBlock
                        code={step.code}
                        language={step.language}
                        filename={step.filename}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <Link
            href="/docs/sdk/setup"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            Full setup guide in the docs
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default QuickSetup;
