import './JoinSquad.css';

export default function JoinSquad() {
    return (
        <section className="join section" id="join">
            <div className="container">
                <div className="join-banner">
                    <h2 className="join-title">Join the Squad</h2>
                    <p className="join-subtitle">
                        Get early access to drops and exclusive tech updates.
                    </p>
                    <form className="join-form" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="email"
                            className="join-input"
                            placeholder="Enter your email"
                            aria-label="Email address"
                        />
                        <button type="submit" className="join-button">Sign Up</button>
                    </form>
                </div>
            </div>
        </section>
    );
}
