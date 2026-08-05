import './ScienceSection.css';

const WindIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
    </svg>
);

const LayersIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
    </svg>
);

const ZapIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
);

const features = [
    {
        icon: <WindIcon />,
        title: 'Vapor Max Cushioning',
        description: 'Revolutionary air pods that flex with your foot\'s natural movement.',
    },
    {
        icon: <LayersIcon />,
        title: 'Engineered Flyknit',
        description: 'Breathable zonal structures that provide support exactly where needed.',
    },
    {
        icon: <ZapIcon />,
        title: 'Energy Return',
        description: 'Carbon fiber plate technology for explosive take-offs and speed.',
    },
];

export default function ScienceSection() {
    return (
        <section className="science section" id="science">
            <div className="container">
                <div className="science-inner">
                    <div className="science-text">
                        <h2 className="science-title">
                            The Science of<br />
                            <span className="accent">Visible Air</span>
                        </h2>
                        <p className="science-description">
                            The Vapor Max cushioning system provides lightweight responsiveness
                            from heel to toe. Every stride is engineered to return energy back
                            to the athlete, creating a sensation of walking on clouds without
                            sacrificing stability.
                        </p>
                        <div className="science-features">
                            {features.map((f, i) => (
                                <div className="science-feature" key={i}>
                                    <div className="science-feature-icon">{f.icon}</div>
                                    <div>
                                        <h4>{f.title}</h4>
                                        <p>{f.description}</p>
                                        <div className="science-feature-line" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="science-visual">
                        <div className="science-visual-glow" />
                        <img
                            src="/images/nike-blueprint.avif"
                            alt="Air technology visualization"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
