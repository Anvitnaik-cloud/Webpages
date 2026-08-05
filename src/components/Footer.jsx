import './Footer.css';

const TwitterIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const InstagramIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
);

const YoutubeIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 3.993L9 16z" />
    </svg>
);

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-inner">
                    <div className="footer-brand">
                        <div className="footer-logo">
                            AIR MAX <span className="accent">CORE</span>
                        </div>
                        <p className="footer-copy">© 2026 Air Max Core. All rights reserved.</p>
                    </div>
                    <div className="footer-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                        <a href="#">Cookie Settings</a>
                        <a href="#">Sustainability</a>
                        <a href="#">Contact Us</a>
                    </div>
                    <div className="footer-socials">
                        <a href="#" className="footer-social" aria-label="Twitter">
                            <TwitterIcon />
                        </a>
                        <a href="#" className="footer-social" aria-label="Instagram">
                            <InstagramIcon />
                        </a>
                        <a href="#" className="footer-social" aria-label="YouTube">
                            <YoutubeIcon />
                        </a>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>Designed & Engineered for Performance</p>
                </div>
            </div>
        </footer>
    );
}
