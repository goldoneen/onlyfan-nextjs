

export const metadata = {
  title: 'Legal Notice - OnlyFans Search Finder',
  description: 'Legal notice and terms of service',
  alternates: {
    canonical: '/legal-notice',
  },
  robots: {
    index: false,
    follow: true
  },
  openGraph: {
    title: 'Legal Notice - Site Template',
    description: 'Legal notice and terms of service',
    url: '/legal-notice',
  }
};

export default function LegalNotice() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Legal Notice</h1>
      <div className="prose max-w-none">
        <p className="mb-8">In accordance with the provisions of Articles 6-III and 19 of Law No. 2004-575 of June 21, 2004 for Confidence in the Digital Economy (L.C.E.N.), we inform users and visitors of the website yoursite.com of the following information:</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Website Publisher</h2>
          <p className="mb-4">The website yoursite.com is published at: https://www.onlyfans-search-finder.com/</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Hosting</h2>
          <p className="mb-4">The website is hosted by:<br />
          Hosting Provider: Vercel Inc.<br />
          Address: 340 S Lemon Ave #4133, Walnut, CA 91789, USA<br />
          Website: www.vercel.com</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Responsibility</h2>
          <p className="mb-4">The publisher strives to provide the most accurate information possible on the website. However, they cannot be held responsible for omissions, inaccuracies, or deficiencies in the updates, whether due to their own fault or that of third-party partners who supply this information.</p>
          <p className="mb-4">All information provided on the website yoursite.com is for informational purposes only, is not exhaustive, and is subject to change.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
          <p className="mb-4">All content available on this site (texts, images, logos, etc.) is the exclusive property of yoursite.com, unless otherwise stated. Any reproduction, distribution, modification, adaptation, retransmission, or publication of such content, even partial, is strictly prohibited without the prior written consent of the publisher.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
          <p className="mb-4">For any inquiries, please use the contact form.</p>
        </section>
      </div>
    </main>
  );
}
