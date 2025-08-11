import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPage() {
  return (
    <main className="container mx-auto px-4 py-12 lg:py-24">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
          <p className="text-muted-foreground">Last updated: August 11, 2025</p>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none space-y-6">
          <p>
            Your privacy is important to us. This Privacy Policy explains how NamePulse ("we," "us," or "our") collects,
            uses, and discloses information about you when you use our website and services (collectively, the
            "Service").
          </p>

          <h3 className="text-xl font-semibold">1. Information We Collect</h3>
          <p>We collect information about you in various ways when you use our Service:</p>
          <ul>
            <li>
              **Information you provide directly:** This includes information you provide when you create an account,
              contact us, or use certain features of the Service (e.g., email address, password, search queries, saved
              domains).
            </li>
            <li>
              **Information collected automatically:** When you access and use our Service, we may automatically collect
              certain information, including your IP address, device information, browser type, operating system,
              referring URLs, and information about your usage of the Service (e.g., pages visited, features used).
            </li>
            <li>
              **Cookies and similar technologies:** We use cookies and similar tracking technologies to track the
              activity on our Service and hold certain information.
            </li>
          </ul>

          <h3 className="text-xl font-semibold">2. How We Use Your Information</h3>
          <p>We use the information we collect for various purposes, including to:</p>
          <ul>
            <li>Provide, maintain, and improve our Service.</li>
            <li>Process your requests and transactions.</li>
            <li>Send you technical notices, updates, security alerts, and support messages.</li>
            <li>Respond to your comments, questions, and customer service requests.</li>
            <li>Monitor and analyze trends, usage, and activities in connection with our Service.</li>
            <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities.</li>
            <li>
              Personalize and improve the Service and provide advertisements, content, or features that match your
              interests.
            </li>
          </ul>

          <h3 className="text-xl font-semibold">3. Sharing of Information</h3>
          <p>We may share information about you as follows:</p>
          <ul>
            <li>
              **With service providers:** We may share your information with third-party vendors, consultants, and other
              service providers who perform services on our behalf.
            </li>
            <li>
              **For legal compliance:** We may disclose your information if required to do so by law or in response to
              valid requests by public authorities.
            </li>
            <li>
              **Business transfers:** We may share or transfer your information in connection with, or during
              negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our
              business to another company.
            </li>
            <li>**With your consent:** We may share your information with your consent or at your direction.</li>
          </ul>

          <h3 className="text-xl font-semibold">4. Data Retention</h3>
          <p>
            We retain the information we collect for as long as necessary to provide the Service and for other
            legitimate business purposes, such as complying with our legal obligations, resolving disputes, and
            enforcing our agreements.
          </p>

          <h3 className="text-xl font-semibold">5. Your Choices</h3>
          <p>
            You may update, correct, or delete information about you at any time by logging into your account or by
            contacting us. You can also choose to disable cookies through your browser settings.
          </p>

          <h3 className="text-xl font-semibold">6. Contact Us</h3>
          <p>If you have any questions about this Privacy Policy, please contact us at [Your Contact Email].</p>

          <div className="mt-8 text-center">
            <Link href="/" className="inline-flex items-center text-sm font-medium text-[#42cae5] hover:underline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
