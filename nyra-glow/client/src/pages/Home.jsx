import { useEffect } from 'react';
import AOS from 'aos';
import HeroSection from '../components/sections/HeroSection';
import ServicesSection from '../components/sections/ServicesSection';
import TeamSection from '../components/sections/TeamSection';
import GallerySection from '../components/sections/GallerySection';
import GiftCardsSection from '../components/sections/GiftCardsSection';
import ContactSection from '../components/sections/ContactSection';
import Footer from '../components/Footer';

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 900, once: true, offset: 80, easing: 'ease-out-cubic' });
  }, []);

  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <TeamSection />
      <GallerySection />
      <GiftCardsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
