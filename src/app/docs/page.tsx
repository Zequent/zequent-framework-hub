import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0f1c2e] pt-20">
      <Container>
        <div className="py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0a2540] dark:text-white mb-6">
            Documentation
          </h1>
          <p className="text-xl text-[#425466] dark:text-[#adbdcc] mb-8">
            Comprehensive guides and references for the Zequent Framework.
          </p>
          <Button href="/">Back to Home</Button>
          
          <div className="mt-12 prose prose-lg dark:prose-invert max-w-none">
            <h2>Getting Started</h2>
            <p>
              Welcome to the Zequent Framework documentation. This guide will help you get started
              with building robotics applications using our framework.
            </p>
            
            <h2>Installation</h2>
            <p>
              Installation instructions and setup guide will be added here.
            </p>
            
            <h2>Core Concepts</h2>
            <p>
              Learn about the fundamental concepts and architecture of the Zequent Framework.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
