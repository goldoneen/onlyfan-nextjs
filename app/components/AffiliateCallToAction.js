'use client';

import { OBFUSCATED_AFFILIATE_URL } from '../utils/linkObfuscator';
import AffiliateButton from './AffiliateButton';

export default function AffiliateCallToAction({
  title = "Limited Time Offer",
  description = "Don't miss this exclusive opportunity. Click below to get started!",
  buttonText = "Get Offer Now",
  variant = "primary",
  size = "large",
  obfuscatedUrl = OBFUSCATED_AFFILIATE_URL,
  className = "",
}) {
  return (
    <section className={`py-12 bg-gradient-to-r from-gray-900 to-gray-800 relative overflow-hidden ${className}`}>
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-gray-800/50 via-gray-800/30 to-gray-800/50 rounded-2xl p-8 border border-blue-900/20 backdrop-blur-sm relative">
            {/* Glow Effects */}
            <div className="absolute -inset-px bg-gradient-to-r from-blue-600/10 via-blue-600/5 to-blue-600/10 blur-sm" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />
            
            <div className="relative flex flex-col items-center text-center gap-6">
                <p className="text-3xl md:text-4xl font-bold text-white">{title}</p>
              <p className="text-gray-300 text-lg max-w-2xl">{description}</p>
              
              {/* Main Button (as span) */}
              <AffiliateButton 
                text={buttonText}
                variant={variant}
                size={size}
                obfuscatedUrl={obfuscatedUrl}
                className="w-full md:w-auto"
              />
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                <div className="flex items-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Secure Checkout</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Satisfaction Guaranteed</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Limited Time Offer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
