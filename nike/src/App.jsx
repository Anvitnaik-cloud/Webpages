import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Hero from './components/Hero';
import NewArrivals from './components/NewArrivals';
import FeaturedCollection from './components/FeaturedCollection';
import ScienceSection from './components/ScienceSection';
import StackingCardsSection from './components/StackingCardsSection';
import TextCarouselSection from './components/TextCarouselSection';
import StorySection from './components/StorySection';
import JoinSquad from './components/JoinSquad';
import Footer from './components/Footer';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Banner />
        <Hero />
        <NewArrivals />
        <FeaturedCollection />
        <ScienceSection />
        <StackingCardsSection />
        <TextCarouselSection />
        <StorySection />
        <JoinSquad />
      </main>
      <Footer />
    </>
  );
}
