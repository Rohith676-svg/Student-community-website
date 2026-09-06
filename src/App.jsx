import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Purpose from './components/Purpose';
import FacultyPreview from './components/FacultyPreview';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import LeadsPage from './components/leads/LeadsPage';
import EventsPage from './components/events/EventsPage';
import RoadmapsPage from './components/roadmaps/RoadmapsPage';
import { initScrollReveal } from './utils/revealObserver';

export default function App() {
  // Theme state: defaults to 'light' unless user explicitly chose otherwise in localStorage
  const getInitialTheme = () => {
    try {
      const saved = localStorage.getItem('stc-theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return 'light'; // Light theme is strictly the default, ignoring OS preference
    } catch {
      return 'light';
    }
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('stc-theme', theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const getRouteFromHash = () => {
    const hash = window.location.hash || '';
    const path = window.location.pathname || '';
    if (hash.startsWith('#/leads') || hash === '#leads' || path === '/leads') {
      return 'leads';
    }
    if (hash.startsWith('#/events') || hash === '#events' || path === '/events') {
      return 'events';
    }
    if (hash.startsWith('#/roadmaps') || hash === '#roadmaps' || path === '/roadmaps') {
      return 'roadmaps';
    }
    return 'home';
  };

  const [currentRoute, setCurrentRoute] = useState(getRouteFromHash);
  const [transitionState, setTransitionState] = useState('idle'); // 'idle' | 'leaving' | 'entering'
  const isNavigatingRef = useRef(false);

  // Smooth page transition helper
  const executePageTransition = (targetRoute, sectionId) => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;

    // 1. Leaving animation
    setTransitionState('leaving');

    setTimeout(() => {
      // 2. Switch route and reset scroll
      setCurrentRoute(targetRoute);
      if (targetRoute === 'leads') {
        window.location.hash = '#/leads';
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (targetRoute === 'events') {
        window.location.hash = '#/events';
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (targetRoute === 'roadmaps') {
        window.location.hash = '#/roadmaps';
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        if (sectionId) {
          window.location.hash = `#${sectionId}`;
        } else {
          window.location.hash = '#/';
        }
        if (sectionId) {
          setTimeout(() => {
            const el = document.getElementById(sectionId);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 40);
        } else {
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      }

      // 3. Entering animation
      setTransitionState('entering');

      setTimeout(() => {
        setTransitionState('idle');
        isNavigatingRef.current = false;
      }, 340);
    }, 240);
  };

  // Hash listener for browser back/forward history navigation
  useEffect(() => {
    const handleHashChange = () => {
      const newRoute = getRouteFromHash();
      if (newRoute !== currentRoute && !isNavigatingRef.current) {
        executePageTransition(newRoute);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentRoute]);

  const handleNavigate = (targetRoute, sectionId) => {
    if (targetRoute === currentRoute) {
      if (sectionId) {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    executePageTransition(targetRoute, sectionId);
  };

  useEffect(() => {
    // Run unified scroll reveal engine across all routes once page is entered
    if (transitionState === 'idle') {
      const cleanup = initScrollReveal();
      return cleanup;
    }
  }, [currentRoute, transitionState]);

  return (
    <div className="stc-app">
      <Navbar
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <div
        className={`page-transition-wrapper ${
          transitionState === 'leaving'
            ? 'is-leaving'
            : transitionState === 'entering'
            ? 'is-entering'
            : ''
        }`}
      >
        {currentRoute === 'leads' ? (
          <main id="main-content">
            <LeadsPage onNavigate={handleNavigate} />
          </main>
        ) : currentRoute === 'events' ? (
          <main id="main-content">
            <EventsPage onNavigate={handleNavigate} />
          </main>
        ) : currentRoute === 'roadmaps' ? (
          <main id="main-content">
            <RoadmapsPage onNavigate={handleNavigate} />
          </main>
        ) : (
          <main id="main-content">
            <Hero />
            <Purpose />
            <FacultyPreview />
            <FinalCTA />
          </main>
        )}
      </div>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
