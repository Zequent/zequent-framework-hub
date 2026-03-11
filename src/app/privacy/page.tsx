import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Privacy Policy - Zequent",
  description: "Privacy Policy for Zequent",
};

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="text-muted-foreground mb-8">
          Last updated: February 16, 2026
        </p>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              1. Introduction
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Zequent Technologies ("we", "our", or "us") operates the Zequent platform. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our framework, SDKs, and cloud services.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We are committed to protecting your privacy and ensuring GDPR compliance for all EU-based users and customers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              2. Information We Collect
            </h2>
            
            <h3 className="text-xl font-heading font-semibold text-foreground mb-3 mt-6">
              2.1 Account Information
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              When you create an account or use our services, we collect:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>Email address</li>
              <li>Organization name</li>
              <li>Account credentials (securely hashed)</li>
              <li>Organization and user metadata</li>
            </ul>

            <h3 className="text-xl font-heading font-semibold text-foreground mb-3 mt-6">
              2.2 Usage and Analytics Data
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              To improve our platform and provide better service, we collect:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>API usage metrics and call patterns</li>
              <li>SDK version and framework configuration</li>
              <li>Error logs and performance metrics</li>
              <li>Feature usage statistics</li>
            </ul>

            <h3 className="text-xl font-heading font-semibold text-foreground mb-3 mt-6">
              2.3 What We Do NOT Collect
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We do not collect or store:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Telemetry data from your autonomous systems (drones, robots, vehicles)</li>
              <li>Mission data or operational commands</li>
              <li>Video streams or sensor data from your hardware</li>
              <li>Business-critical or proprietary operational data</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Your operational data remains in your control and is processed by your deployed instances of the framework.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              3. How We Use Your Information
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use the collected information to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Provide and maintain our framework services</li>
              <li>Authenticate and authorize access to platform services</li>
              <li>Improve framework performance and fix bugs</li>
              <li>Analyze usage patterns to guide feature development</li>
              <li>Communicate important updates and security notices</li>
              <li>Provide customer support and respond to inquiries</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              4. Data Storage and Security
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              All data is stored on EU-hosted infrastructure with the following security measures:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>Encrypted data transmission (TLS 1.3)</li>
              <li>Encrypted data storage at rest</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Access controls and authentication mechanisms</li>
              <li>Regular automated backups</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              For on-premise deployments, data security is managed by your infrastructure and security policies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              5. Data Sharing and Disclosure
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We do not sell your personal data. We may share information only in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Service Providers:</strong> Third-party services that help us operate the platform (hosting, analytics, support tools), all bound by data protection agreements</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
              <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, with notice to affected users</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              6. Your Rights Under GDPR
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you are located in the European Economic Area (EEA), you have the following rights:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
              <li><strong>Erasure:</strong> Request deletion of your personal data ("right to be forgotten")</li>
              <li><strong>Restriction:</strong> Restrict processing of your data</li>
              <li><strong>Portability:</strong> Receive your data in a structured, machine-readable format</li>
              <li><strong>Objection:</strong> Object to processing of your data for specific purposes</li>
              <li><strong>Withdraw Consent:</strong> Withdraw consent at any time where processing is based on consent</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              To exercise these rights, contact us at{" "}
              <a href="mailto:privacy@zequent.com" className="text-primary hover:underline">
                privacy@zequent.com
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              7. Data Retention
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We retain your personal data only as long as necessary to provide our services and fulfill the purposes outlined in this policy:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Active account data: Retained while your account is active</li>
              <li>Usage analytics: Aggregated and anonymized after 12 months</li>
              <li>Support records: Retained for 3 years after case closure</li>
              <li>Deleted account data: Removed within 30 days of account deletion request</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              8. Cookies and Tracking
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use essential cookies for authentication and session management. We do not use third-party advertising or tracking cookies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              9. Open Platform and On-Premise Deployments
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              If you use Zequent in an on-premise or self-hosted environment, this Privacy Policy applies only to your use of our documentation website and any cloud services you choose to integrate. Data processing within your on-premise deployment is under your control and responsibility.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              10. Children's Privacy
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              11. Changes to This Policy
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We may update this Privacy Policy from time to time. We will notify you of material changes by:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Updating the "Last updated" date at the top of this policy</li>
              <li>Sending an email notification to registered users</li>
              <li>Posting a notice on our website</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              12. Contact Us
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you have questions about this Privacy Policy or wish to exercise your rights, contact us:
            </p>
            <div className="bg-muted/30 border border-border rounded-lg p-6 space-y-2">
              <p className="text-foreground font-medium mb-2">Zequent Technologies</p>
              <p className="text-muted-foreground">
                Email:{" "}
                <a href="mailto:privacy@zequent.com" className="text-primary hover:underline">
                  privacy@zequent.com
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
