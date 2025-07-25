export const metadata = {
  title: 'Privacy Policy - OnlyFans Search Finder',
  description: 'Privacy policy for our website',
  alternates: {
    canonical: '/privacy-policy',
  },
  robots: {
    index: false,
    follow: true
  },
  openGraph: {
    title: 'Privacy Policy - Site Template',
    description: 'Privacy policy for our website',
    url: '/privacy-policy',
  }
};

export default function PrivacyPolicy() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <div className="prose max-w-none">
        <p className="mb-8">At our company, we place great importance on confidentiality and protecting your personal data. This policy explains how we collect, use, and safeguard your information.</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Information Collected</h2>
          <p className="mb-4">We collect the following information when you use our site:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Information provided in contact forms.</li>
            <li>Browsing data on our site.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Use of Data</h2>
          <p className="mb-4">We use your personal information for the following purposes:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>To provide our services and respond to your requests.</li>
            <li>To contact you regarding your registration or application.</li>
            <li>To enhance the user experience on our site.</li>
            <li>To ensure security and prevent fraudulent activities.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Data Sharing</h2>
          <p className="mb-4">We do not share your personal information with third parties, except in the following cases:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>When necessary to provide the requested services (e.g., third-party messaging or payment tools).</li>
            <li>To comply with legal obligations or at the request of competent authorities.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Security</h2>
          <p className="mb-4">We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, loss, or alteration.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
          <p className="mb-4">In accordance with the General Data Protection Regulation (GDPR), you have the following rights:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>The right to access your data.</li>
            <li>The right to correct your personal information.</li>
            <li>The right to delete your data.</li>
            <li>The right to object to or limit processing.</li>
            <li>The right to transfer your data to another service provider.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Cookies</h2>
          <p className="mb-4">We use cookies to improve your experience on our site. You can configure your browser to refuse cookies or to alert you when a cookie is placed on your device.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Contact</h2>
          <p className="mb-4">For any questions about our privacy policy or to exercise your rights, please contact us via our <a href="/contact" className="text-blue-600 hover:underline">contact form</a>.</p>
        </section>
      </div>
    </main>
  );
}
