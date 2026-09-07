import React from 'react';
import './FinalCTA.css';

export default function FinalCTA() {
  return (
    <section id="join" className="final-cta">
      <div className="container final-cta__inner">
        <div className="final-cta__eyebrow label-mono reveal">03 / The Community</div>

        <h2 className="final-cta__headline reveal reveal-delay-1">
          <span>FIND YOUR PEOPLE.</span>
          <span>BUILD SOMETHING TOGETHER.</span>
        </h2>

        <p className="final-cta__copy reveal reveal-delay-2">
          There's always room for one more builder.
        </p>

        <div className="final-cta__actions reveal reveal-delay-3">
          <a
            href="https://chat.whatsapp.com/IGahTMfZbY5GOewoO0SjVu"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary final-cta__btn"
          >
            Join the Community &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
