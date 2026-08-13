import { TextWordCarousel } from '@/components/ui/text-word-carousel';
import './TextCarouselSection.css';

export default function TextCarouselSection() {
  return (
    <section className="carousel-section section" id="innovation">
      <div className="container">
        <div className="carousel-section-inner">
          <p className="carousel-section-label">Innovation Never Stops</p>
          <h2 className="carousel-section-heading">
            Designed to be{' '}
            <TextWordCarousel
              words={['unstoppable', 'legendary', 'fearless', 'limitless']}
              interval={2.5}
              className="carousel-word"
              duration={0.6}
            />
          </h2>
          <p className="carousel-section-sub">
            Every innovation starts with an athlete's need. We engineer products
            that push the boundaries of human potential — from the track to the
            streets and beyond.
          </p>
        </div>
      </div>
    </section>
  );
}
