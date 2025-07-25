'use client';

import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import FeaturedModels from './components/FeaturedModels';
import HowItWorks from './components/HowItWorks';
import WhyUseSection from './components/WhyUseSection';
import PopularCategories from './components/PopularCategories';
import FaqSection from './components/FaqSection';
import StickyBottomNav from './components/StickyBottomNav';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section avec barre de recherche */}
      <HeroSection />
      
      {/* Section des modèles en vedette */}
      <FeaturedModels />
      
      {/* Section explicative sur le fonctionnement du site */}
      <HowItWorks />
      
      {/* Section sur les avantages d'utiliser le site */}
      <WhyUseSection />
      
      {/* Section des catégories populaires */}
      <PopularCategories />
      
      {/* Section FAQ et appel à l'action final */}
      <FaqSection />
      
      {/* Barre de navigation sticky en bas de page */}
      <StickyBottomNav />
      
      {/* Espace en bas pour éviter que le contenu ne soit caché par la barre sticky */}
      <div className="h-16"></div>
    </main>
  );
}
