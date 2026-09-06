/**
 * STC Unified Scroll Reveal Engine
 * Provides intentional, high-performance scroll entrance animations across all routes.
 * Immediately reveals above-the-fold elements so users never see blank placeholders.
 */

export function initScrollReveal() {
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const elements = document.querySelectorAll(
    '.reveal, .leads-reveal, .events-reveal, .roadmaps-reveal'
  );

  if (elements.length === 0) return () => {};

  const markRevealed = (el) => {
    if (el.classList.contains('leads-reveal')) {
      el.classList.add('is-visible');
    }
    el.classList.add('is-revealed');
  };

  if (isReducedMotion || !('IntersectionObserver' in window)) {
    elements.forEach(markRevealed);
    return () => {};
  }

  // Immediate check for elements already in viewport on mount (prevents above-the-fold delay)
  const windowHeight = window.innerHeight;
  const remainingElements = [];

  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < windowHeight * 0.95) {
      markRevealed(el);
    } else {
      remainingElements.push(el);
    }
  });

  if (remainingElements.length === 0) return () => {};

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          markRevealed(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  remainingElements.forEach((el) => observer.observe(el));

  return () => observer.disconnect();
}
