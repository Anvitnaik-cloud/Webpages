import './FeaturedCollection.css';

const products = [
    {
        id: 1,
        name: 'Air Max Pulse',
        color: 'Neon / Obsidian',
        price: '$169',
        image: '/images/sneaker-teal.png',
        tag: 'New',
    },
    {
        id: 2,
        name: 'Air Max 270',
        color: 'Pure Platinum',
        price: '$159',
        image: '/images/sneaker-white.png',
        tag: null,
    },
    {
        id: 3,
        name: 'Air Max Terrascape',
        color: 'Anthracite',
        price: '$189',
        image: '/images/sneaker-black.png',
        tag: 'Limited',
    },
    {
        id: 4,
        name: 'Air Max 90 SE',
        color: 'Multi-Color Heritage',
        price: '$149',
        image: '/images/sneaker-multi.png',
        tag: null,
    },
];

function CartIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
        </svg>
    );
}

export default function FeaturedCollection() {
    return (
        <section className="featured section" id="featured">
            <div className="container">
                <div className="featured-header">
                    <div>
                        <div className="featured-label">Starting at $149</div>
                        <h2 className="featured-title">Featured Collection</h2>
                    </div>
                    <a href="#" className="featured-viewall">View All</a>
                </div>
                <div className="featured-grid">
                    {products.map((product) => (
                        <article className="product-card" key={product.id}>
                            <div className="product-card-image">
                                {product.tag && (
                                    <span className="product-card-tag">{product.tag}</span>
                                )}
                                <img src={product.image} alt={product.name} loading="lazy" />
                            </div>
                            <div className="product-card-body">
                                <h3 className="product-card-name">{product.name}</h3>
                                <p className="product-card-color">{product.color}</p>
                                <div className="product-card-footer">
                                    <span className="product-card-price">{product.price}</span>
                                    <button className="product-card-cart" aria-label="Add to cart">
                                        <CartIcon />
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
