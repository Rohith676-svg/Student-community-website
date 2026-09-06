import React, { useState } from 'react';
import './ThemeToggle.css';

export default function ThemeToggle({ theme = 'light', onToggle }) {
  const [animating, setAnimating] = useState(false);
  const isDark = theme === 'dark';

  const handleClick = () => {
    setAnimating(true);
    if (onToggle) {
      onToggle();
    }
    setTimeout(() => setAnimating(false), 300);
  };

  return (
    <button
      type="button"
      className={`theme-toggle ${isDark ? 'theme-toggle--dark' : 'theme-toggle--light'} ${
        animating ? 'theme-toggle--animating' : ''
      }`}
      onClick={handleClick}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Activate Light Theme' : 'Activate Dark Theme'}
    >
      <div className="theme-toggle__track">
        {/* Animated Sun / Moon SVG */}
        <svg
          className="theme-toggle__svg"
          viewBox="0 0 24 24"
          width="20"
          height="20"
          aria-hidden="true"
        >
          {/* Mask for the crescent moon shape */}
          <mask id="stc-theme-moon-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="#ffffff" />
            <circle
              className="theme-toggle__mask-hole"
              cx={isDark ? '17' : '28'}
              cy={isDark ? '7' : '-5'}
              r="7"
              fill="#000000"
            />
          </mask>

          {/* Central core circle (Sun disc in light mode, Crescent moon body in dark mode) */}
          <circle
            className="theme-toggle__core"
            cx="12"
            cy="12"
            r={isDark ? '8' : '4.5'}
            fill="currentColor"
            mask="url(#stc-theme-moon-mask)"
          />

          {/* Sun Rays group - smoothly bursts out in light mode, retracts in dark mode */}
          <g className="theme-toggle__rays" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
            <line x1="12" y1="1.75" x2="12" y2="3.75" />
            <line x1="12" y1="20.25" x2="12" y2="22.25" />
            <line x1="4.75" y1="4.75" x2="6.16" y2="6.16" />
            <line x1="17.84" y1="17.84" x2="19.25" y2="19.25" />
            <line x1="1.75" y1="12" x2="3.75" y2="12" />
            <line x1="20.25" y1="12" x2="22.25" y2="12" />
            <line x1="4.75" y1="19.25" x2="6.16" y2="17.84" />
            <line x1="17.84" y1="6.16" x2="19.25" y2="4.75" />
          </g>

          {/* Subtle micro star for night mode */}
          <circle
            className="theme-toggle__star"
            cx="17.5"
            cy="16"
            r="1.2"
            fill="currentColor"
          />
        </svg>
      </div>
    </button>
  );
}
