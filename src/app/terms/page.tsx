import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Terms of Service - Zequent",
  description: "Terms of Service for Zequent",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <Button variant="ghost" size="sm" className="mb-8" asChild>
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>

        <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
          Terms of Service
        </h1>
        <p className="text-muted-foreground mb-8">
          Last updated: February 16, 2026
        </p>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              By accessing or using Zequent, including our SDKs, documentation, and cloud services (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms").
            </p>
            <p className="text-muted-foreground leading-relaxed">
              If you are using the Services on behalf of an organization, you represent that you have the authority to bind that organization to these Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              2. Service Description
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Zequent provides Zequent, a developer framework for building, deploying, and operating autonomous systems. The Services include:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Client and Edge SDKs for building autonomous applications</li>
              <li>Cloud-hosted platform services (optional)</li>
              <li>Documentation and developer resources</li>
              <li>On-premise deployment capabilities</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              3. Service Plans and Fees
            </h2>
            
            <h3 className="text-xl font-heading font-semibold text-foreground mb-3 mt-6">
              3.1 Free Tier
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The free tier includes:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>Access to SDK source code and documentation</li>
              <li>Limited cloud service usage within defined quotas</li>
              <li>Community support through public channels</li>
            </ul>

            <h3 className="text-xl font-heading font-semibold text-foreground mb-3 mt-6">
              3.2 Enterprise Features
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Paid enterprise plans include additional features such as:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>Higher usage limits and dedicated resources</li>
              <li>Priority support and SLA guarantees</li>
              <li>Advanced security and compliance features</li>
              <li>Custom deployment assistance</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Pricing and quotas for enterprise plans are available upon request. Contact us at{" "}
              <a href="mailto:office@zequent.com" className="text-primary hover:underline">
                office@zequent.com
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              4. License Grant
            </h2>
            
            <h3 className="text-xl font-heading font-semibold text-foreground mb-3 mt-6">
              4.1 SDK License
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Subject to your compliance with these Terms, we grant you a non-exclusive, non-transferable license to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>Use and integrate the SDKs into your applications</li>
              <li>Modify the SDK source code for your internal use</li>
              <li>Deploy applications built with the framework in production environments</li>
            </ul>

            <h3 className="text-xl font-heading font-semibold text-foreground mb-3 mt-6">
              4.2 License Restrictions
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You may not:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Redistribute or resell the framework as a competing product</li>
              <li>Remove or modify proprietary notices or attributions</li>
              <li>Use the Services to build products that directly compete with Zequent</li>
              <li>Reverse engineer cloud services or attempt unauthorized access</li>
              <li>Use the Services for illegal purposes or to violate applicable laws</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              5. Your Responsibilities
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              When using the Services, you are responsible for:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Maintaining the security of your account credentials</li>
              <li>All activity that occurs under your account</li>
              <li>Compliance with all applicable laws and regulations</li>
              <li>The safety and operation of your autonomous systems</li>
              <li>Proper implementation of hardware adapters and safety controls</li>
              <li>Backup and disaster recovery for your deployments</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              6. Acceptable Use Policy
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You agree not to use the Services to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Violate any laws, regulations, or third-party rights</li>
              <li>Distribute malware, spam, or harmful content</li>
              <li>Interfere with or disrupt the Services or servers</li>
              <li>Attempt unauthorized access to systems or accounts</li>
              <li>Abuse free tier resources or circumvent usage limits</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              7. Intellectual Property
            </h2>
            
            <h3 className="text-xl font-heading font-semibold text-foreground mb-3 mt-6">
              7.1 Our IP
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Zequent retains all rights, title, and interest in the framework, Services, documentation, and any updates or modifications. The license granted here does not transfer ownership.
            </p>

            <h3 className="text-xl font-heading font-semibold text-foreground mb-3 mt-6">
              7.2 Your IP
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              You retain all rights to your applications, data, and content. We do not claim ownership of the applications you build using the framework or the data processed by your systems.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              8. Warranties and Disclaimers
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              THE SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>The Services will be uninterrupted, secure, or error-free</li>
              <li>Results obtained from the Services will be accurate or reliable</li>
              <li>All bugs or defects will be corrected</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              YOU ARE SOLELY RESPONSIBLE FOR THE OPERATION AND SAFETY OF YOUR AUTONOMOUS SYSTEMS. WE ARE NOT LIABLE FOR HARDWARE MALFUNCTIONS, OPERATIONAL FAILURES, OR SAFETY INCIDENTS.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              9. Limitation of Liability
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, ZEQUENT SHALL NOT BE LIABLE FOR:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>Indirect, incidental, consequential, or special damages</li>
              <li>Loss of profits, data, or business opportunities</li>
              <li>Property damage or personal injury resulting from your use of the Services</li>
              <li>Failures or malfunctions of autonomous systems built with the framework</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID TO US IN THE 12 MONTHS PRECEDING THE CLAIM, OR $100 IF NO FEES WERE PAID.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              10. Indemnification
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              You agree to indemnify and hold harmless Zequent from any claims, damages, liabilities, and expenses (including legal fees) arising from: (a) your use of the Services; (b) your applications or autonomous systems; (c) your violation of these Terms; or (d) your violation of any third-party rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              11. Data Protection and GDPR
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our processing of personal data is governed by our{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
              . For cloud services, we act as a data processor, and you are the data controller for any end-user data processed through your applications.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              For enterprise customers requiring a Data Processing Agreement (DPA), please contact us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              12. Termination
            </h2>
            
            <h3 className="text-xl font-heading font-semibold text-foreground mb-3 mt-6">
              12.1 By You
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You may terminate your account at any time by contacting us or using account settings.
            </p>

            <h3 className="text-xl font-heading font-semibold text-foreground mb-3 mt-6">
              12.2 By Us
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We may suspend or terminate your access if:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>You violate these Terms or our Acceptable Use Policy</li>
              <li>Your account is inactive for an extended period</li>
              <li>Required by law or to prevent harm</li>
            </ul>

            <h3 className="text-xl font-heading font-semibold text-foreground mb-3 mt-6">
              12.3 Effect of Termination
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Upon termination, your right to use cloud services ends immediately. SDK licenses for applications already deployed may continue subject to the license terms. We will delete your account data within 30 days unless retention is required by law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              13. Changes to Terms
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We may modify these Terms from time to time. We will notify you of material changes by:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>Updating the "Last updated" date</li>
              <li>Sending an email to registered users</li>
              <li>Posting a notice on our website</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Your continued use of the Services after changes take effect constitutes acceptance of the modified Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              14. Governing Law and Disputes
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              These Terms are governed by the laws of the European Union and the jurisdiction where Zequent Technologies is registered, without regard to conflict of law principles.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Any disputes shall be resolved through good-faith negotiation. If negotiation fails, disputes will be resolved in the courts of the EU jurisdiction where Zequent is registered.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              15. Miscellaneous
            </h2>
            
            <h3 className="text-xl font-heading font-semibold text-foreground mb-3 mt-6">
              15.1 Entire Agreement
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              These Terms, together with our Privacy Policy, constitute the entire agreement between you and Zequent regarding the Services.
            </p>

            <h3 className="text-xl font-heading font-semibold text-foreground mb-3 mt-6">
              15.2 Severability
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If any provision is found unenforceable, the remaining provisions remain in full effect.
            </p>

            <h3 className="text-xl font-heading font-semibold text-foreground mb-3 mt-6">
              15.3 No Waiver
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              No waiver of any term shall be deemed a further or continuing waiver of such term or any other term.
            </p>

            <h3 className="text-xl font-heading font-semibold text-foreground mb-3 mt-6">
              15.4 Assignment
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              You may not assign these Terms without our prior written consent. We may assign our rights and obligations without restriction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              16. Contact Us
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Questions about these Terms? Contact us:
            </p>
            <div className="bg-muted/30 border border-border rounded-lg p-6 space-y-2">
              <p className="text-foreground font-medium mb-2">Zequent Technologies</p>
              <p className="text-muted-foreground">
                Email:{" "}
                <a href="mailto:legal@zequent.com" className="text-primary hover:underline">
                  legal@zequent.com
                </a>
              </p>
              <p className="text-muted-foreground">
                General inquiries:{" "}
                <a href="mailto:office@zequent.com" className="text-primary hover:underline">
                  office@zequent.com
                </a>
              </p>
              <p className="text-muted-foreground">
                Phone:{" "}
                <a href="tel:+41762087620" className="text-primary hover:underline">
                  +41 (0) 762087620
                </a>
              </p>
              <p className="text-muted-foreground">
                Chüngstrasse 31, 8424 Embrach, ZH, Switzerland
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
