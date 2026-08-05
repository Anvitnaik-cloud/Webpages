import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Hero from './components/Hero';
import NewArrivals from './components/NewArrivals';
import FeaturedCollection from './components/FeaturedCollection';
import ScienceSection from './components/ScienceSection';
import TextCarouselSection from './components/TextCarouselSection';
import StorySection from './components/StorySection';
import JoinSquad from './components/JoinSquad';
import Footer from './components/Footer';
import Lenis from '@studio-freight/lenis';

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

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
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
        <TextCarouselSection />
        <StorySection />
        <JoinSquad />
      </main>
      <Footer />
    </>
  );
}
