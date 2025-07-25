'use client';

import { handleObfuscatedClick, OBFUSCATED_AFFILIATE_URL } from '../utils/linkObfuscator';

export default function AffiliateButton({ 
  text = 'Get Offer', 
  className = '', 
  obfuscatedUrl = OBFUSCATED_AFFILIATE_URL,
  variant = 'primary',
  size = 'medium'
}) {
  // Styles de base et variantes
  const baseStyles = "inline-block cursor-pointer font-bold rounded-lg transition-all duration-300 transform hover:scale-105";
  
  // Variantes de couleur
  const variantStyles = {
    primary: "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white shadow-lg hover:shadow-xl",
    secondary: "bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-800 shadow-md hover:shadow-lg",
    success: "bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white shadow-lg hover:shadow-xl",
    danger: "bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white shadow-lg hover:shadow-xl",
    warning: "bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white shadow-lg hover:shadow-xl",
    info: "bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl",
  };
  
  // Tailles
  const sizeStyles = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg",
    xlarge: "px-10 py-5 text-xl",
  };

  // Combiner les styles
  const spanStyles = `${baseStyles} ${variantStyles[variant] || variantStyles.primary} ${sizeStyles[size] || sizeStyles.medium} ${className}`;

  return (
    <span
      onClick={(e) => handleObfuscatedClick(e, obfuscatedUrl)}
      className={spanStyles}
      role="button"
      tabIndex="0"
      aria-label={text}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleObfuscatedClick(e, obfuscatedUrl);
        }
      }}
    >
      {text}
    </span>
  );
}
