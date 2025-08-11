import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
  return (
    <main className="container mx-auto px-4 py-12 lg:py-24">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Terms of Service</CardTitle>
          <p className="text-muted-foreground">Last updated: August 11, 2025</p>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none space-y-6">
          <p>
            Welcome to NamePulse! These Terms of Service ("Terms") govern your access to and use of the NamePulse
            website and services (collectively, the "Service"). By accessing or using the Service, you agree to be bound
            by these Terms.
          </p>

          <h3 className="text-xl font-semibold">1. Acceptance of Terms</h3>
          <p>
            By using our Service, you confirm that you accept these Terms and that you agree to comply with them. If you
            do not agree to these Terms, you must not use our Service.
          </p>

          <h3 className="text-xl font-semibold">2. Changes to Terms</h3>
          <p>
            We may revise these Terms at any time by amending this page. Please check this page from time to time to
            take notice of any changes we made, as they are binding on you.
          </p>

          <h3 className="text-xl font-semibold">3. Accessing the Service</h3>
          <p>
            We do not guarantee that our Service, or any content on it, will always be available or be uninterrupted. We
            may suspend or withdraw or restrict the availability of all or any part of our Service for business and
            operational reasons.
          </p>

          <h3 className="text-xl font-semibold">4. Your Account</h3>
          <p>
            If you choose, or are provided with, a user identification code, password or any other piece of information
            as part of our security procedures, you must treat such information as confidential. We have the right to
            disable any user identification code or password, whether chosen by you or allocated by us, at any time, if
            in our reasonable opinion you have failed to comply with any of the provisions of these Terms.
          </p>

          <h3 className="text-xl font-semibold">5. Intellectual Property Rights</h3>
          <p>
            We are the owner or the licensee of all intellectual property rights in our Service, and in the material
            published on it. Those works are protected by copyright laws and treaties around the world. All such rights
            are reserved.
          </p>

          <h3 className="text-xl font-semibold">6. Limitation of Liability</h3>
          <p>
            To the extent permitted by law, we exclude all conditions, warranties, representations or other terms which
            may apply to our Service or any content on it, whether express or implied. We will not be liable to any user
            for any loss or damage, whether in contract, tort (including negligence), breach of statutory duty, or
            otherwise, even if foreseeable, arising under or in connection with:
          </p>
          <ul>
            <li>use of, or inability to use, our Service; or</li>
            <li>use of or reliance on any content displayed on our Service.</li>
          </ul>

          <h3 className="text-xl font-semibold">7. Governing Law</h3>
          <p>
            These Terms, their subject matter and their formation, are governed by the laws of the State of California,
            USA. You and we both agree that the courts of California will have exclusive jurisdiction.
          </p>

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
