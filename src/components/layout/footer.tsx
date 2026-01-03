import { Container } from "@/components/ui/container";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-12 bg-[#f6f9fc] dark:bg-[#1a2738] border-t border-[#e3e8ef] dark:border-[#1a2f42]">
      <Container>
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold text-[#0173e7] dark:text-[#3b9eff] mb-4">
              Zequent
            </h3>
            <p className="text-[#425466] dark:text-[#adbdcc] text-sm">
              A powerful custom framework for modern robotics development.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-[#0a2540] dark:text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#features" className="text-[#425466] dark:text-[#adbdcc] hover:text-[#0173e7] dark:hover:text-[#3b9eff] transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-[#425466] dark:text-[#adbdcc] hover:text-[#0173e7] dark:hover:text-[#3b9eff] transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-[#425466] dark:text-[#adbdcc] hover:text-[#0173e7] dark:hover:text-[#3b9eff] transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-[#0a2540] dark:text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#about" className="text-[#425466] dark:text-[#adbdcc] hover:text-[#0173e7] dark:hover:text-[#3b9eff] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-[#425466] dark:text-[#adbdcc] hover:text-[#0173e7] dark:hover:text-[#3b9eff] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-[#0a2540] dark:text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-[#425466] dark:text-[#adbdcc] hover:text-[#0173e7] dark:hover:text-[#3b9eff] transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-[#425466] dark:text-[#adbdcc] hover:text-[#0173e7] dark:hover:text-[#3b9eff] transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-[#e3e8ef] dark:border-[#1a2f42] text-center text-sm text-[#425466] dark:text-[#adbdcc]">
          <p>2026 Zequent Framework. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
