'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isHuman, setIsHuman] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isHuman) {
      setSubmitResult({
        success: false,
        message: 'Please verify that you are human before sending the message.'
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Send data to the API endpoint
      const response = await fetch('/api/send-mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (result.success) {
        setSubmitResult({
          success: true,
          message: 'Your message has been sent successfully. We will respond as soon as possible.'
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitResult({
          success: false,
          message: result.message || 'An error occurred while sending your message. Please try again.'
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitResult({
        success: false,
        message: 'An error occurred while sending your message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      {submitResult ? (
        <div className={`p-4 mb-6 rounded-lg ${submitResult.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          <p>{submitResult.message}</p>
          {submitResult.success && (
            <button 
              onClick={() => setSubmitResult(null)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Send Another Message
            </button>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block mb-2 font-medium text-gray-700">Name</label>
            <input 
              type="text" 
              id="name" 
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your name"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block mb-2 font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              id="email" 
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your@email.com"
              required
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block mb-2 font-medium text-gray-700">Message</label>
            <textarea 
              id="message" 
              rows="6" 
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your message"
              required
            ></textarea>
          </div>
          
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="human-verification"
              checked={isHuman}
              onChange={() => setIsHuman(!isHuman)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              required
            />
            <label htmlFor="human-verification" className="ml-2 text-sm font-medium text-gray-700">
              I verify that I am human
            </label>
          </div>
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:transform-none"
          >
            {isSubmitting ? 'Sending...' : 'Send'}
          </button>
        </form>
      )}
    </div>
  );
}
