import React from 'react';
import NetworkCanvas from './NetworkCanvas';
import './Hero.css';

export default function Hero() {
  return (
    <section id="top" className="hero">
      <NetworkCanvas />

      <div className="container hero__content">
        <div className="hero__eyebrow label-mono reveal">
          Student Technology Community
        </div>

        <h1 className="hero__headline reveal reveal-delay-1">
          <span>FIND YOUR PEOPLE.</span>
          <span>BUILD WHAT'S NEXT.</span>
        </h1>

        <p className="hero__description reveal reveal-delay-2">
          A student-led technology community bringing curious minds together to learn, build, connect and grow. Organised by department of CSE.
        </p>

        <div className="hero__actions reveal reveal-delay-3">
          <a
            href="https://chat.whatsapp.com/IGahTMfZbY5GOewoO0SjVu"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary hero__cta-primary"
          >
            Join the Community &rarr;
          </a>
          <a href="#purpose" className="btn btn-secondary hero__cta-secondary">
            Explore &rarr;
          </a>
        </div>
      </div>

      <div className="hero__scroll-indicator reveal reveal-delay-3" aria-hidden="true">
        <span className="label-mono">Scroll to explore</span>
        <span className="hero__scroll-line"></span>
      </div>
    </section>
  );
}
