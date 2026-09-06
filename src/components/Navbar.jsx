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
                href={currentRoute === 'home' ? '#purpose' : '#/'}
                className="navbar__link"
                onClick={(e) => handleLinkClick(e, 'home', 'purpose')}
              >
                About
              </a>
            </li>
            <li>
              <a
                href={currentRoute === 'home' ? '#events' : '#/'}
                className="navbar__link"
                onClick={(e) => handleLinkClick(e, 'home', 'events')}
              >
                Events
              </a>
            </li>
            <li>
              <a
                href={currentRoute === 'home' ? '#roadmaps' : '#/'}
                className="navbar__link"
                onClick={(e) => handleLinkClick(e, 'home', 'roadmaps')}
              >
                Roadmaps
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
          </ul>
          <div className="navbar__desktop-actions">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <a
              href={currentRoute === 'home' ? '#join' : '#join-team'}
              className="btn btn-primary navbar__cta"
              onClick={(e) => {
                if (currentRoute === 'home') {
                  handleLinkClick(e, 'home', 'join');
                } else {
                  const el = document.getElementById('join-team');
                  if (el) {
                    e.preventDefault();
                    el.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    handleLinkClick(e, 'home', 'join');
                  }
                }
              }}
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
                href={currentRoute === 'home' ? '#purpose' : '#/'}
                className="navbar__mobile-link"
                onClick={(e) => handleLinkClick(e, 'home', 'purpose')}
              >
                About
              </a>
            </li>
            <li>
              <a
                href={currentRoute === 'home' ? '#events' : '#/'}
                className="navbar__mobile-link"
                onClick={(e) => handleLinkClick(e, 'home', 'events')}
              >
                Events
              </a>
            </li>
            <li>
              <a
                href={currentRoute === 'home' ? '#roadmaps' : '#/'}
                className="navbar__mobile-link"
                onClick={(e) => handleLinkClick(e, 'home', 'roadmaps')}
              >
                Roadmaps
              </a>
            </li>
            <li>
              <a
                href="#/leads"
                className={`navbar__mobile-link ${currentRoute === 'leads' ? 'navbar__link--active' : ''}`}
                onClick={(e) => handleLinkClick(e, 'leads')}
              >
                Leads
              </a>
            </li>
          </ul>
          <a
            href={currentRoute === 'home' ? '#join' : '#join-team'}
            className="btn btn-primary navbar__mobile-cta"
            onClick={(e) => {
              if (currentRoute === 'home') {
                handleLinkClick(e, 'home', 'join');
              } else {
                closeMobileMenu();
                const el = document.getElementById('join-team');
                if (el) {
                  e.preventDefault();
                  el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  handleLinkClick(e, 'home', 'join');
                }
              }
            }}
          >
            Join Community
          </a>
        </nav>
      </div>
    </header>
  );
}
