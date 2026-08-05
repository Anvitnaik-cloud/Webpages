import './Hero.css';

export default function Hero() {
    return (
        <section className="hero" id="hero">
            <div className="hero-bg-gradient" />
            <div className="hero-content">
                <div className="hero-text">
                    <div className="hero-label">New Release</div>
                    <h1 className="hero-title">
                        AIR MAX
                        <span className="accent">EVOLUTION</span>
                    </h1>
                    <p className="hero-subtitle">
                        Defining the future of visible air technology. Engineered for peak performance and street dominance.
                    </p>
                    <div className="hero-buttons">
                        <a href="#featured" className="btn-primary">Shop the Collection</a>
                        <a href="#science" className="btn-ghost">Explore Tech</a>
                    </div>
                </div>
                <div className="hero-image">
                    <div className="hero-image-ring" />
                    <div className="hero-image-ring" />
                    <img
                        src="/images/hero-sneaker.png"
                        alt="Air Max Obsidian Edition"
                        loading="eager"
                    />
                </div>
            </div>
        </section>
    );
}
