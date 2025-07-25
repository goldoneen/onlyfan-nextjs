'use client';

// Fonction pour générer un salt aléatoire
const generateSalt = (length = 8) => {
  if (typeof window === 'undefined') return '';
  
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const randomValues = new Uint8Array(length);
  
  // Utiliser crypto.getRandomValues si disponible, sinon utiliser Math.random
  if (window.crypto && window.crypto.getRandomValues) {
    window.crypto.getRandomValues(randomValues);
    for (let i = 0; i < length; i++) {
      result += chars[randomValues[i] % chars.length];
    }
  } else {
    for (let i = 0; i < length; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
  }
  
  return result;
};

// Fonction pour encoder l'URL
export const encodeUrl = (url, shouldObfuscate = true) => {
  if (!shouldObfuscate) return url;
  if (typeof window === 'undefined') return url;
  
  try {
    const salt = generateSalt();
    const combined = `${salt}|${url}`;
    const encoded = encodeURIComponent(combined);
    const base64 = btoa(encoded);
    const withoutPadding = base64.replace(/=/g, '');
    return withoutPadding.split('').reverse().join('');
  } catch (error) {
    console.error('Error encoding URL:', error);
    return url;
  }
};

// Fonction pour décoder l'URL
export const decodeUrl = (obfuscated, shouldObfuscate = true) => {
  if (!shouldObfuscate) return obfuscated;
  if (typeof window === 'undefined') return '';
  
  try {
    const reversed = obfuscated.split('').reverse().join('');
    const decoded = atob(reversed);
    const urlDecoded = decodeURIComponent(decoded);
    const [, url] = urlDecoded.split('|');
    return url;
  } catch (error) {
    console.error('Error decoding URL:', error);
    return '';
  }
};

// Gestionnaire de clic pour les liens obfusqués
export const handleObfuscatedClick = (e, obfuscatedUrl, shouldObfuscate = true) => {
  if (e) {
    e.preventDefault();
  }
  
  if (typeof window === 'undefined') return;

  try {
    if (!shouldObfuscate) {
      window.open(obfuscatedUrl, '_blank');
      return;
    }
    
    const decodedUrl = decodeUrl(obfuscatedUrl, shouldObfuscate);
    if (decodedUrl) {
      window.open(decodedUrl, '_blank');
    }
  } catch (error) {
    console.error('Error handling obfuscated click:', error);
  }
};

// Exemple d'URL obfusquée - à remplacer par votre URL d'affiliation
export const OBFUSCATED_AFFILIATE_URL = encodeUrl('https://example.com/affiliate-link/?ref=yourcode');
