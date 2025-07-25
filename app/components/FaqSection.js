'use client';

import { useState } from 'react';

// Données des questions fréquentes
const faqData = [
  {
    question: "Is OnlyFans Search Finder Safe?",
    answer: "Yes! OnlyFans Search Finder simply helps you discover the best OnlyFans creators based on your preferences. We don't store any sensitive data or payment information, and your searches are private."
  },
  {
    question: "What if I have issues and need support?",
    answer: "OnlyFans Search Finder is designed to be easy to use, but if you run into any issues, our support team is here to help. Just email us at support@onlyfanssearchfinder.com and we'll get back to you within one business day."
  },
  {
    question: "How do I access OnlyFans Search Finder?",
    answer: "OnlyFans Search Finder is available online through our website. You don't need to download anything - just sign up and start searching for creators based on your preferences."
  },
  {
    question: "Is OnlyFans Search Finder only for adult content?",
    answer: "No, OnlyFans Search Finder is for all types of creators on OnlyFans. Whether you're looking for fitness trainers, artists, musicians, lifestyle influencers, or adult content creators, OnlyFans Search Finder helps you find creators that match your interests."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">
              Can't find an answer? Email us at <a href="mailto:support@onlyfanssearchfinder.com" className="text-blue-500 hover:text-blue-700">support@onlyfanssearchfinder.com</a>
            </p>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div 
                key={index} 
                className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm"
              >
                <button
                  className="flex justify-between items-center w-full px-6 py-4 text-left focus:outline-none"
                  onClick={() => toggleFaq(index)}
                >
                  <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
                  <span className="ml-6 flex-shrink-0">
                    {openIndex === index ? (
                      <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    ) : (
                      <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </span>
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to find your favorite creators?</h3>
            <p className="text-lg text-gray-600 mb-6">
              Join thousands discovering amazing OnlyFans content daily
            </p>
            <a 
              href="/best" 
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-400 to-cyan-500 text-white font-bold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Start Exploring
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
