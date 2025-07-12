// Homepage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Homepage.css'; // Import the dedicated CSS file

// --- ICONS (SVG components for clarity and performance) ---
const MenuIcon = ({ className }) => (
    <svg className={className} stroke="currentColor" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
    </svg>
);

const XIcon = ({ className }) => (
    <svg className={className} stroke="currentColor" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
);

const UserProfileIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="icon-main-color" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
      <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
    </svg>
);

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="icon-main-color" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
        <path d="M21 21l-6 -6" />
    </svg>
);

const SwapIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="icon-main-color" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M15 4l-4 4l4 4" />
        <path d="M9 20l4 -4l-4 -4" />
        <path d="M5 12h14" />
    </svg>
);

const GrowthIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="icon-main-color" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M3 17l6 -6l4 4l8 -8" />
        <path d="M14 7l7 0l0 7" />
    </svg>
);
const ShieldIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="icon-small-color" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" />
    </svg>
);
const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="icon-small-color" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z" />
      <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
      <path d="M8 11v-4a4 4 0 1 1 8 0v4" />
    </svg>
);

const HeartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="icon-small-color" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
    </svg>
);

// --- MODAL COMPONENTS ---
const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={onClose} className="modal-close-btn">
                    <XIcon className="icon-small-color" />
                </button>
                {children}
            </div>
        </div>
    );
};

const SearchModal = ({ isOpen, onClose }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const popularSkills = ['Photoshop', 'Excel', 'Python', 'Yoga', 'Guitar', 'Gardening', 'Digital Marketing', 'Web Development'];

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchTerm);
        // In a real app, you'd navigate to a search results page or filter content
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="modal-title">Find Your Next Skill</h2>
            <form onSubmit={handleSearch} className="modal-form">
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="e.g., 'Photoshop', 'Yoga', 'Python'..."
                        className="modal-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit" className="modal-search-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                    </button>
                </div>
            </form>
            <div className="modal-popular-searches">
                <p className="modal-popular-text">Popular searches:</p>
                <div className="skill-tags-container">
                    {popularSkills.map(skill => (
                        <span
                            key={skill}
                            className="skill-tag"
                            onClick={() => { setSearchTerm(skill); handleSearch({ preventDefault: () => {} }); }}
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </Modal>
    );
};

const AuthModal = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(isLogin? 'Logging in...' : 'Signing up...');
        // In a real app, handle authentication logic
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="modal-title">
                {isLogin? 'Welcome Back!' : 'Join SkillSwap Today!'}
            </h2>
            <form onSubmit={handleSubmit} className="modal-form-auth">
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        className="form-input"
                        placeholder="your@email.com"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="form-input"
                        placeholder="••••••••"
                        required
                    />
                </div>
                {!isLogin && (
                    <div className="form-group">
                        <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm-password"
                            className="form-input"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                )}
                <button
                    type="submit"
                    className="btn btn-primary btn-full-width"
                >
                    {isLogin? 'Login' : 'Sign Up'}
                </button>
            </form>
            <p className="modal-auth-toggle">
                {isLogin? "Don't have an account?" : "Already have an account?"}{' '}
                <button onClick={() => setIsLogin(!isLogin)} className="text-link">
                    {isLogin? 'Sign Up' : 'Login'}
                </button>
            </p>
        </Modal>
    );
};

// --- SECTION COMPONENTS ---
const Header = ({ onJoinClick, onSearchClick }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showLoginOptions, setShowLoginOptions] = useState(false); // State for login options dropdown
    const navigate = useNavigate(); // Initialize useNavigate hook
    const loginOptionsRef = useRef(null); // Ref for click outside detection

    const navLinks = [
        { name: 'How It Works', href: '#how-it-works' },
        { name: 'Explore', href: '#explore' },
        { name: 'Benefits', href: '#benefits' },
    ];

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (loginOptionsRef.current && !loginOptionsRef.current.contains(event.target)) {
                setShowLoginOptions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [loginOptionsRef]);

    const handleLoginClick = () => {
        setShowLoginOptions(!showLoginOptions);
    };

    const handleUserLogin = () => {
        setShowLoginOptions(false);
        navigate('/login'); // Navigate to user login page
    };

    const handleAdminLogin = () => {
        setShowLoginOptions(false);
        navigate('/admin-login'); // Navigate to admin login page
    };

    return (
        <header className="main-header">
            <div className="header-content-wrapper">
                <div className="logo">
                    <a href="/">Skill<span className="logo-accent">Swap</span></a> {/* Changed to '/' for homepage */}
                </div>
                <nav className="desktop-nav">
                    <div className="nav-links">
                        {navLinks.map((link) => (
                            <a key={link.name} href={link.href} className="nav-item">
                                {link.name}
                            </a>
                        ))}
                        <button onClick={onSearchClick} className="nav-item nav-search-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon-small-color icon-margin-right" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                            Search
                        </button>
                        {/* Login button with dropdown */}
                        <div className="login-dropdown-container" ref={loginOptionsRef}>
                            <button onClick={handleLoginClick} className="btn btn-login-option"> {/* Changed class to btn-login-option */}
                                Login
                            </button>
                            {showLoginOptions && (
                                <div className="login-options-dropdown">
                                    <button onClick={handleUserLogin} className="dropdown-item">User Login</button>
                                    <button onClick={handleAdminLogin} className="dropdown-item">Admin Login</button>
                                </div>
                            )}
                        </div>
                    </div>
                    <button onClick={onJoinClick} className="btn btn-primary">
                        Join Free
                    </button>
                </nav>
                <div className="mobile-menu-toggle">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="menu-toggle-btn">
                        {isMenuOpen ? <XIcon className="icon-small-color" /> : <MenuIcon className="icon-small-color" />}
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <div className="mobile-nav-menu">
                    <div className="mobile-nav-links">
                         {navLinks.map((link) => (
                            <a key={link.name} href={link.href} className="mobile-nav-item">
                                {link.name}
                            </a>
                        ))}
                        <button onClick={onSearchClick} className="mobile-nav-item mobile-nav-search-btn">
                            Search Skills
                        </button>
                        <button onClick={handleUserLogin} className="mobile-nav-item">User Login</button>
                        <button onClick={handleAdminLogin} className="mobile-nav-item">Admin Login</button>
                    </div>
                    <div className="mobile-nav-cta">
                        <button onClick={onJoinClick} className="btn btn-primary btn-full-width">
                            Join Free
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

const HeroSection = ({ onJoinClick }) => (
    <section className="hero-section">
        <div className="hero-background-overlay">
            <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="SkillSwap Community Background"
                className="hero-background-image"
            />
        </div>
        <div className="hero-content-wrapper">
            <div className="hero-text-content">
                <h1 className="hero-title animate-fade-in-up">
                    Swap a Skill, <br className="desktop-only" />
                    <span className="hero-accent-text">Gain a Future.</span> For Free.
                </h1>
                <p className="hero-subtitle animate-fade-in-up delay-200">
                    Unlock your potential by exchanging knowledge. Teach what you know, learn what you don't. No money, just a passion for growth in a vibrant community.
                </p>
                <div className="hero-cta-buttons animate-fade-in-up delay-400">
                    <button onClick={onJoinClick} className="btn btn-primary btn-lg">
                        Join Free Now
                    </button>
                    <a href="#explore" className="btn btn-secondary btn-lg">
                        Explore Skills
                    </a>
                </div>
            </div>
            <div className="hero-image-container animate-fade-in-right delay-600">
                <img
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="People collaborating and learning together"
                    className="hero-image"
                />
            </div>
        </div>
    </section>
);

const HowItWorksSection = () => {
    const steps = [
        { icon: <UserProfileIcon />, title: 'Create Your Profile', description: 'Showcase the skills you can teach and list the ones you want to learn. Let the community know who you are.' },
        { icon: <SearchIcon />, title: 'Discover & Connect', description: 'Search for skills you’re interested in, find matching partners, and send a swap request.' },
        { icon: <SwapIcon />, title: 'Swap & Learn', description: 'Arrange a time and connect directly with your partner. Share your knowledge and learn something new.' },
        { icon: <GrowthIcon />, title: 'Grow & Contribute', description: 'Rate your swap experience, watch your skills grow, and continue your journey by helping others.' },
    ];

    return (
        <section id="how-it-works" className="how-it-works-section">
            <div className="section-header">
                <h2 className="section-title">Your Journey to Mutual Growth in 4 Simple Steps</h2>
                <p className="section-subtitle">From signing up to skill mastery, our process is designed to be simple and intuitive.</p>
            </div>
            <div className="steps-grid">
                {steps.map((step, index) => (
                    <div key={step.title} className="step-card">
                        <div className="step-icon-container">
                            {step.icon}
                        </div>
                        <h3 className="step-title">{`Step ${index + 1}: ${step.title}`}</h3>
                        <p className="step-description">{step.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

const FeaturedSkillsSection = ({ onSearchClick }) => {
    const skills = ['Digital Marketing', 'Python Programming', 'Graphic Design', 'Public Speaking', 'Yoga Instruction', 'Financial Literacy', 'Creative Writing', 'Data Analysis'];

    return (
        <section id="explore" className="featured-skills-section">
            <div className="section-header">
                <h2 className="section-title">Explore a World of Skills</h2>
                <p className="section-subtitle">From tech and business to arts and wellness, find your next passion.</p>
            </div>
            <div className="search-bar-container">
                <div className="search-input-group">
                    <input
                        type="search"
                        placeholder="Search for a skill like 'Photoshop' or 'Excel'..."
                        className="search-input"
                        onClick={onSearchClick} // Open modal on click
                        readOnly // Prevent direct typing, force modal interaction
                    />
                    <button onClick={onSearchClick} className="search-button">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                    </button>
                </div>
            </div>
            <div className="skill-tags-wrapper">
                {skills.map(skill => (
                    <span key={skill} className="skill-tag-primary">
                        {skill}
                    </span>
                ))}
            </div>
        </section>
    );
};

const BenefitsSection = () => (
    <section id="benefits" className="benefits-section">
        <div className="section-header">
             <h2 className="section-title">Why SkillSwap? Beyond Traditional Learning</h2>
             <p className="section-subtitle">More than just learning. It's about growth, connection, and unlocking new opportunities.</p>
        </div>
        <div className="benefits-grid">
            <div className="benefit-card">
                <div className="benefit-image-container">
                    <img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Personal Growth" className="benefit-image"/>
                </div>
                <div className="benefit-text-content">
                    <h3 className="benefit-title">Accelerate Personal Growth</h3>
                    <p className="benefit-description">Expand your horizons, discover new hobbies, and become a more well-rounded individual. Learning keeps the mind sharp and life exciting, fostering a sense of accomplishment.</p>
                </div>
            </div>
             <div className="benefit-card reverse-layout">
                <div className="benefit-image-container">
                    <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Career Advancement" className="benefit-image"/>
                </div>
                <div className="benefit-text-content">
                    <h3 className="benefit-title">Boost Your Career & Entrepreneurship</h3>
                    <p className="benefit-description">Acquire in-demand skills that can lead to promotions, new job opportunities, or even the launch of your next big idea. Invest in your professional future, for free.</p>
                </div>
            </div>
        </div>
    </section>
);


const TrustAndSafetySection = () => (
    <section id="trust-safety" className="trust-safety-section">
        <div className="section-header">
            <h2 className="section-title">Your Trust is Our Foundation</h2>
            <p className="section-subtitle">
                We are committed to creating a safe, respectful, and secure environment for everyone. Your privacy and safety are our top priorities.
            </p>
        </div>
        <div className="safety-features-grid">
            <div className="safety-feature-card">
                <div className="safety-icon-container"><ShieldIcon /></div>
                <h3 className="safety-feature-title">Robust Security</h3>
                <p className="safety-feature-description">HTTPS encryption and advanced data protection safeguard your information from cyber threats.</p>
            </div>
            <div className="safety-feature-card">
                <div className="safety-icon-container"><LockIcon /></div>
                <h3 className="safety-feature-title">Transparent Privacy</h3>
                <p className="safety-feature-description">You have granular control over your personal data and privacy settings, with clear, accessible policies.</p>
            </div>
            <div className="safety-feature-card">
                <div className="safety-icon-container"><HeartIcon /></div>
                <h3 className="safety-feature-title">Active Moderation</h3>
                <p className="safety-feature-description">Clear community guidelines and an active moderation team ensure a respectful and spam-free environment.</p>
            </div>
        </div>
    </section>
);


const TestimonialsSection = () => {
    const testimonials = [
        {
            quote: "I taught a beginner's course on Photoshop and in return, I learned the basics of Python. It was an amazing experience that opened up new career possibilities for me!",
            name: 'Sarah J.',
            role: 'Taught Photoshop, Learned Python',
            img: 'https://i.pravatar.cc/150?img=1'
        },
        {
            quote: "SkillSwap helped me connect with a local musician who taught me guitar. Now we jam every weekend! It's more than a platform; it's a community builder.",
            name: 'Mike D.',
            role: 'Taught Excel, Learned Guitar',
            img: 'https://i.pravatar.cc/150?img=3'
        },
        {
            quote: "As a retiree, I wanted to share my gardening skills. I ended up learning how to build my own website. It proves you're never too old to learn something new.",
            name: 'Linda K.',
            role: 'Taught Gardening, Learned Web Design',
            img: 'https://i.pravatar.cc/150?img=5'
        }
    ];

    return (
        <section className="testimonials-section">
            <div className="section-header">
                <h2 className="section-title">Hear From Our Thriving Community</h2>
                <p className="section-subtitle">Real stories of connection, growth, and mutual learning.</p>
            </div>
            <div className="testimonials-grid">
                {testimonials.map(t => (
                    <div key={t.name} className="testimonial-card">
                        <p className="testimonial-quote">"{t.quote}"</p>
                        <div className="testimonial-author-info">
                            <img src={t.img} alt={t.name} className="testimonial-author-img"/>
                            <div className="author-details">
                                <p className="author-name">{t.name}</p>
                                <p className="author-role">{t.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

const CtaSection = ({ onJoinClick }) => (
    <section className="cta-section">
        <div className="cta-content-wrapper">
            <h2 className="cta-title">
                Ready to Start Swapping?
            </h2>
            <p className="cta-subtitle">
                Join thousands of others who are sharing their passions and learning for free. Your next skill is just a swap away.
            </p>
            <button onClick={onJoinClick} className="btn btn-white btn-lg cta-button">
                Create My Free Account
            </button>
        </div>
    </section>
);


const Footer = () => (
    <footer className="main-footer">
        <div className="footer-content-wrapper">
            <div className="footer-col footer-branding">
                <h3 className="footer-logo">Skill<span className="logo-accent">Swap</span></h3>
                <p className="footer-tagline">The community-driven platform for non-monetary skill exchange.</p>
            </div>
            <div className="footer-col">
                <h4 className="footer-heading">Platform</h4>
                <ul className="footer-links">
                    <li><a href="#how-it-works" className="footer-link">How It Works</a></li>
                    <li><a href="#explore" className="footer-link">Explore Skills</a></li>
                    <li><a href="#benefits" className="footer-link">Benefits</a></li>
                </ul>
            </div>
             <div className="footer-col">
                <h4 className="footer-heading">Legal</h4>
                <ul className="footer-links">
                    <li><a href="#" className="footer-link">Privacy Policy</a></li>
                    <li><a href="#" className="footer-link">Terms of Service</a></li>
                    <li><a href="#" className="footer-link">Community Guidelines</a></li>
                </ul>
            </div>
            <div className="footer-col">
                 <h4 className="footer-heading">Connect</h4>
                 <ul className="footer-links">
                    <li><a href="#" className="footer-link">Contact Us</a></li>
                    <li><a href="#" className="footer-link">Twitter</a></li>
                    <li><a href="#" className="footer-link">Instagram</a></li>
                 </ul>
            </div>
        </div>
        <div className="footer-copyright">
            <p>&copy; 2025 SkillSwap. All rights reserved. Built with passion for a connected world.</p>
        </div>
    </footer>
);

// --- MAIN HOMEPAGE COMPONENT ---
function Homepage() {
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    // Effect to prevent body scrolling when modal is open
    useEffect(() => {
        if (isSearchModalOpen || isAuthModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isSearchModalOpen, isAuthModalOpen]);

    return (
        <div className="homepage-wrapper">
            <Header onJoinClick={() => setIsAuthModalOpen(true)} onSearchClick={() => setIsSearchModalOpen(true)} />
            <main>
                <HeroSection onJoinClick={() => setIsAuthModalOpen(true)} />
                <HowItWorksSection />
                <FeaturedSkillsSection onSearchClick={() => setIsSearchModalOpen(true)} />
                <BenefitsSection />
                <TrustAndSafetySection />
                <TestimonialsSection />
                <CtaSection onJoinClick={() => setIsAuthModalOpen(true)} />
            </main>
            <Footer />

            {/* Modals */}
            <SearchModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} />
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </div>
    );
}

export default Homepage;
