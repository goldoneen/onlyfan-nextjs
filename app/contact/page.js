import ContactForm from '../components/contact/ContactForm';

export const metadata = {
  title: 'Contact - Site Template',
  description: 'Contact us for more information',
  alternates: {
    canonical: '/contact',
  },
  robots: {
    index: false,
    follow: true
  },
  openGraph: {
    title: 'Contact - Site Template',
    description: 'Contact us for more information',
    url: '/contact',
  }
};

export default function Contact() {
  return (
    <main className="container mx-auto px-4 py-16 mt-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
        
        <ContactForm />
      </div>
    </main>
  );
}
