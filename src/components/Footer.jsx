import React, { useEffect } from 'react';
import './Footer.css';

const AUTHOR_NAME = 'Built by Rohith Joseph';
Object.freeze(AUTHOR_NAME);

export default function Footer({ onNavigate }) {
  const currentYear = new Date().getFullYear();

  const handleNav = (e, targetRoute, sectionId) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(targetRoute, sectionId);
    }
  };

  // Tamper-proof enforcement for "Built by Rohith Joseph"
  useEffect(() => {
    const targetTextId = 'stc-author-text';
    const containerId = 'stc-author-container';

    const enforceCredit = () => {
      const footer = document.getElementById('stc-footer');
      if (!footer) return;

      let container = document.getElementById(containerId);
      const topRow = footer.querySelector('.footer__top-row');

      if (!container && topRow) {
        // If node was deleted, re-create and inject
        container = document.createElement('div');
        container.className = 'footer__credit-lock';
        container.id = containerId;
        container.setAttribute('data-author', AUTHOR_NAME);
        container.innerHTML = `
          <span class="footer__credit-badge label-mono">PROJECT LEAD</span>
          <span class="footer__credit-text" id="${targetTextId}">${AUTHOR_NAME}</span>
        `;
        topRow.appendChild(container);
      }

      if (container) {
        // Prevent hiding via inline CSS
        if (container.style.display === 'none') container.style.display = 'inline-flex';
        if (container.style.visibility === 'hidden') container.style.visibility = 'visible';
        if (container.style.opacity === '0') container.style.opacity = '1';

        const textEl = document.getElementById(targetTextId);
        if (textEl && textEl.textContent !== AUTHOR_NAME) {
          textEl.textContent = AUTHOR_NAME;
        }
      }
    };

    enforceCredit();

    // DOM MutationObserver detecting any modifications or deletions
    const footerEl = document.getElementById('stc-footer');
    if (!footerEl) return;

    const observer = new MutationObserver(() => {
      enforceCredit();
    });

    observer.observe(footerEl, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['style', 'class', 'hidden'],
    });

    const interval = setInterval(enforceCredit, 800);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  return (
    <footer className="footer" id="stc-footer">
      <div className="container footer__inner reveal">
        {/* Top row containing the permanent author badge at top right */}
        <div className="footer__top-row">
          <div
            className="footer__credit-lock"
            id="stc-author-container"
            data-author={AUTHOR_NAME}
            aria-label="Built by Rohith Joseph"
          >
            <span className="footer__credit-badge label-mono">PROJECT LEAD</span>
            <span className="footer__credit-text" id="stc-author-text">
              {AUTHOR_NAME}
            </span>
          </div>
        </div>

        <div className="footer__top">
          <div className="footer__brand">
            <a
              href="#/"
              className="footer__logo"
              aria-label="STC Home"
              onClick={(e) => handleNav(e, 'home')}
            >
              STC
            </a>
            <p className="footer__tagline">
              Student Technology Community. Different interests. One community.
            </p>
          </div>

          <nav className="footer__nav" aria-label="Footer Navigation">
            <ul className="footer__links">
              <li>
                <a
                  href="#/"
                  className="footer__link"
                  onClick={(e) => handleNav(e, 'home')}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#/"
                  className="footer__link"
                  onClick={(e) => handleNav(e, 'home', 'purpose')}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#/events"
                  className="footer__link"
                  onClick={(e) => handleNav(e, 'events')}
                >
                  Events
                </a>
              </li>
              <li>
                <a
                  href="#/"
                  className="footer__link"
                  onClick={(e) => handleNav(e, 'home', 'roadmaps')}
                >
                  Roadmaps
                </a>
              </li>
              <li>
                <a
                  href="#/leads"
                  className="footer__link"
                  onClick={(e) => handleNav(e, 'leads')}
                >
                  Leads
                </a>
              </li>
              <li>
                <a
                  href="#/"
                  className="footer__link"
                  onClick={(e) => handleNav(e, 'home', 'join')}
                >
                  Join
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; {currentYear} Student Technology Community. Built for builders.
          </p>

          <div className="footer__socials" aria-label="Social links">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="GitHub"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="Discord"
            >
              Discord
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="X"
            >
              X
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
