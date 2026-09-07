import React, { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import './Navbar.css';

export default function Navbar({ currentRoute = 'home', onNavigate, theme = 'light', onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        closeMobileMenu();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = (e, targetRoute, sectionId) => {
    e.preventDefault();
    closeMobileMenu();
    if (onNavigate) {
      onNavigate(targetRoute, sectionId);
    }
  };

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <a
          href="#/"
          className="navbar__logo"
          aria-label="STC Home"
          onClick={(e) => handleLinkClick(e, 'home')}
        >
          STC
        </a>

        <nav className="navbar__desktop" aria-label="Main Navigation">
          <ul className="navbar__links">
            <li>
              <a
                href="#/"
                className={`navbar__link ${currentRoute === 'home' ? 'navbar__link--active' : ''}`}
                aria-current={currentRoute === 'home' ? 'page' : undefined}
                onClick={(e) => handleLinkClick(e, 'home')}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#/leads"
                className={`navbar__link ${currentRoute === 'leads' ? 'navbar__link--active' : ''}`}
                aria-current={currentRoute === 'leads' ? 'page' : undefined}
                onClick={(e) => handleLinkClick(e, 'leads')}
              >
                Leads
              </a>
            </li>
            <li>
              <a
                href="#/events"
                className={`navbar__link ${currentRoute === 'events' ? 'navbar__link--active' : ''}`}
                aria-current={currentRoute === 'events' ? 'page' : undefined}
                onClick={(e) => handleLinkClick(e, 'events')}
              >
                Events
              </a>
            </li>
            <li>
              <a
                href="#/roadmaps"
                className={`navbar__link ${currentRoute === 'roadmaps' ? 'navbar__link--active' : ''}`}
                aria-current={currentRoute === 'roadmaps' ? 'page' : undefined}
                onClick={(e) => handleLinkClick(e, 'roadmaps')}
              >
                Roadmaps
              </a>
            </li>
          </ul>
          <div className="navbar__desktop-actions">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <a
              href="https://chat.whatsapp.com/IGahTMfZbY5GOewoO0SjVu"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary navbar__cta"
            >
              Join Community
            </a>
          </div>
        </nav>

        <div className="navbar__mobile-actions">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            type="button"
            className="navbar__toggle"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className={`navbar__hamburger ${mobileMenuOpen ? 'is-active' : ''}`}>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`navbar__mobile-drawer ${mobileMenuOpen ? 'is-open' : ''}`} aria-hidden={!mobileMenuOpen}>
        <nav className="navbar__mobile-nav" aria-label="Mobile Navigation">
          <ul className="navbar__mobile-links">
            <li>
              <a
                href="#/"
                className={`navbar__mobile-link ${currentRoute === 'home' ? 'navbar__link--active' : ''}`}
                onClick={(e) => handleLinkClick(e, 'home')}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#/leads"
                className={`navbar__mobile-link ${currentRoute === 'leads' ? 'navbar__mobile-link--active' : ''}`}
                onClick={(e) => handleLinkClick(e, 'leads')}
              >
                Leads
              </a>
            </li>
            <li>
              <a
                href="#/events"
                className={`navbar__mobile-link ${currentRoute === 'events' ? 'navbar__mobile-link--active' : ''}`}
                onClick={(e) => handleLinkClick(e, 'events')}
              >
                Events
              </a>
            </li>
            <li>
              <a
                href="#/roadmaps"
                className={`navbar__mobile-link ${currentRoute === 'roadmaps' ? 'navbar__mobile-link--active' : ''}`}
                onClick={(e) => handleLinkClick(e, 'roadmaps')}
              >
                Roadmaps
              </a>
            </li>
          </ul>
          <a
            href="https://chat.whatsapp.com/IGahTMfZbY5GOewoO0SjVu"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary navbar__mobile-cta"
            onClick={closeMobileMenu}
          >
            Join Community
          </a>
        </nav>
      </div>
    </header>
  );
}
