'use client';

import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and description */}
          <div className="col-span-1">
            <Link href="/" className="text-xl font-bold text-white hover:text-blue-200 transition-colors flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              OnlyFans Search Finder
            </Link>
            <p className="mt-4 text-gray-300 text-sm">
              The ultimate platform to discover and connect with the best OnlyFans creators.
            </p>
          </div>

          {/* Links */}
          <div className="col-span-1">
            <p className="text-gray-400 font-medium mb-2">Quick Links</p>
            <ul className="space-y-2">
              <li>
                <Link href="/best-models" className="text-gray-300 hover:text-blue-200 transition-colors">
                  Best Models
                </Link>
              </li>
              <li>
                <Link href="/free-models" className="text-gray-300 hover:text-blue-200 transition-colors">
                  Free Models
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-300 hover:text-blue-200 transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-blue-200 transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div className="col-span-1">
            <p className="text-gray-400 font-medium mb-2">Legal & Contact</p>
            <ul className="space-y-2">
              <li>
                <Link href="/legal-notice" className="text-gray-300 hover:text-blue-200 transition-colors">
                  Legal Notice
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-300 hover:text-blue-200 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-blue-200 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li className="mt-2">
                <Link href="/contact" className="text-gray-300 hover:text-blue-200 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} OnlyFans Search Finder. All rights reserved. This site is not affiliated with OnlyFans.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;