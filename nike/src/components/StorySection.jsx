import './StorySection.css';

export default function StorySection() {
    return (
        <section className="story section" id="story">
            <div className="container">
                <div className="story-inner">
                    <div className="story-image">
                        <div className="story-image-overlay" />
                        <img src="/images/nike-neon.jpg" alt="Athlete in action" className="story-image-photo" />
                    </div>
                    <div className="story-text">
                        <div className="story-label">Our Story</div>
                        <h2 className="story-title">
                            Engineered<br />
                            For The<br />
                            <span className="light">Unstoppable</span>
                        </h2>
                        <p className="story-description">
                            Born from the spirit of performance, Air Max has evolved into a symbol
                            of progress. From the track to the street, we continue to push the
                            boundaries of what's possible in footwear engineering.
                        </p>
                        <a href="#" className="story-link">Read the Full Story</a>
                    </div>
                </div>
            </div>
        </section>
    );
}
