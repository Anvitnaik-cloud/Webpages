import ExpandableGallery from './ui/gallery-animation';
import './NewArrivals.css';

const newArrivalImages = [
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=80&w=2025&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=1974&auto=format&fit=crop',
  '/nike_red_shoe.png',
  '/nike_blue_shoe.png',
];

export default function NewArrivals() {
  return (
    <section className="new-arrivals section" id="new-arrivals">
      <div className="container">
        <div className="new-arrivals-header">
          <div>
            <div className="new-arrivals-label">Just Dropped</div>
            <h2 className="new-arrivals-title">New Arrivals</h2>
          </div>
          <p className="new-arrivals-subtitle">
            Explore the latest additions to our collection — engineered for performance, designed for style.
          </p>
        </div>
        <ExpandableGallery
          images={newArrivalImages}
          className="new-arrivals-gallery"
        />
      </div>
    </section>
  );
}
