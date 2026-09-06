import React, { useState, useEffect, useRef } from 'react';
import NetworkCanvas from '../NetworkCanvas';
import './LeadsPage.css';

import { initScrollReveal } from '../../utils/revealObserver';
import sumanthImg from '../../assets/sumanth.jpeg';
import kusmithaImg from '../../assets/Kusmitha.png';
import rohithImg from '../../assets/Rohith.png';
import nisaImg from '../../assets/Nisa.png';
import teenaImg from '../../assets/Teena.png';
import rishikaImg from '../../assets/Rishika.png';
import divyaImg from '../../assets/Divya.png';
import bhanuImg from '../../assets/Bhanu.png';
import krishnaImg from '../../assets/Krishna.png';
import purushothamImg from '../../assets/Purushotham.png';
import faadhilImg from '../../assets/faadhil.png';

// Non-technical team interactive data
const NON_TECH_MEMBERS = [
  {
    index: '07',
    name: 'B. Krishna Kowshik',
    role: 'Social Media Lead',
    tag: 'OUTREACH & VISIBILITY',
    image: krishnaImg,
    alt: 'B. Krishna Kowshik - Social Media Lead',
    quote: 'Amplifying the community voice and connecting student builders across campuses.',
  },
  {
    index: '08',
    name: 'B. Purushotham',
    role: 'Coordinators Head',
    tag: 'OPERATIONS & MOMENTUM',
    image: purushothamImg,
    alt: 'B. Purushotham - Coordinators Head',
    quote: 'Harmonizing cross-team initiatives, logistics, and seamless community execution.',
  },
  {
    index: '09',
    name: 'S. Faadhil',
    role: 'Speakers Head',
    tag: 'PERSPECTIVES & SESSIONS',
    image: faadhilImg,
    alt: 'Faadhil - Speakers Head',
    quote: 'Bringing visionary technologists, alumni, and industry mentors into STC circles.',
  },
];

export default function LeadsPage({ onNavigate }) {
  // State for Community Leads scroll transition (0 = Sumanth, 1 = Kusmitha)
  const [activeCommunityLead, setActiveCommunityLead] = useState(0);
  const communityRef = useRef(null);

  // State for Non-Technical interactive row
  const [activeNonTechIndex, setActiveNonTechIndex] = useState(0);

  // Community Lead sticky scroll tracker
  useEffect(() => {
    const handleScroll = () => {
      if (!communityRef.current) return;
      const rect = communityRef.current.getBoundingClientRect();
      const totalScrollable = communityRef.current.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      // Calculate progress through the community section (0.0 to 1.0)
      const scrolled = -rect.top;
      const progress = Math.min(Math.max(scrolled / totalScrollable, 0), 1);

      if (progress > 0.45) {
        setActiveCommunityLead(1);
      } else {
        setActiveCommunityLead(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Section reveal observer using unified engine
  useEffect(() => {
    const cleanup = initScrollReveal();
    return cleanup;
  }, []);

  return (
    <div className="leads-page">
      {/* =========================================================================
          01. OPENING — "THE PEOPLE BEHIND STC"
          ========================================================================= */}
      <section className="leads-hero" id="opening">
        <NetworkCanvas />
        <div className="container leads-hero__inner">
          <div className="leads-hero__meta-top">
            <span className="leads-eyebrow label-mono">THE PEOPLE BEHIND STC</span>
            <span className="leads-edition label-mono">STC / LEADS &bull; 2026 — 27</span>
          </div>

          <div className="leads-hero__title-group">
            <h1 className="leads-hero__heading">
              <span className="leads-hero__line">
                <span className="leads-hero__word">BUILT</span>{' '}
                <span className="leads-hero__word">BY</span>{' '}
                <span className="leads-hero__word">STUDENTS.</span>
              </span>
              <span className="leads-hero__line leads-hero__line--indent">
                <span className="leads-hero__word">DRIVEN</span>{' '}
                <span className="leads-hero__word">BY</span>{' '}
                <span className="leads-hero__word">PEOPLE.</span>
              </span>
            </h1>
          </div>

          <div className="leads-hero__meta-bottom">
            <p className="leads-hero__lead-statement">
              A student-led team bringing ideas, people and opportunities together.
            </p>
            <div className="leads-scroll-cue">
              <span className="label-mono">SCROLL TO REVEAL</span>
              <div className="leads-scroll-cue__line" aria-hidden="true"></div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          02. FIRST TRANSITION & 03. COMMUNITY LEADS — IMMERSIVE REVEAL
          ========================================================================= */}
      <div className="leads-community-container" ref={communityRef} id="community">
        <div className="leads-community-sticky">
          <div className="container leads-community__content">
            {/* Chapter Header */}
            <div className="leads-chapter-header leads-reveal">
              <div className="label-mono leads-chapter-num">01 / COMMUNITY</div>
              <h2 className="leads-chapter-title">
                THE PEOPLE<br />WHO BRING US TOGETHER.
              </h2>
            </div>

            {/* Editorial Showcase */}
            <div className="leads-community-stage">
              {/* Asymmetric Typography Column */}
              <div className="leads-community-text">
                <div className="leads-comm-counter label-mono">
                  <span className={`comm-digit ${activeCommunityLead === 0 ? 'is-active' : ''}`}>01</span>
                  <span className="comm-slash">/</span>
                  <span className={`comm-digit ${activeCommunityLead === 1 ? 'is-active' : ''}`}>02</span>
                </div>

                <div className="leads-comm-info">
                  {/* Lead 01: Avalakunta Sumanth */}
                  <div
                    className={`leads-comm-persona ${activeCommunityLead === 0 ? 'is-active' : 'is-exited'
                      }`}
                    aria-hidden={activeCommunityLead !== 0}
                  >
                    <div className="leads-comm-tag label-mono">COMMUNITY LEAD</div>
                    <h3 className="leads-comm-name">
                      AVALAKUNTA<br />SUMANTH
                    </h3>
                    <div className="leads-comm-role label-mono">MAIN LEAD</div>
                    <p className="leads-comm-bio">
                      Directing community momentum, establishing collaborative direction, and connecting student vision with institutional opportunity.
                    </p>
                  </div>

                  {/* Lead 02: Kusmitha Sai */}
                  <div
                    className={`leads-comm-persona ${activeCommunityLead === 1 ? 'is-active' : 'is-incoming'
                      }`}
                    aria-hidden={activeCommunityLead !== 1}
                  >
                    <div className="leads-comm-tag label-mono">COMMUNITY LEAD</div>
                    <h3 className="leads-comm-name">
                      KUSMITHA<br />SAI
                    </h3>
                    <div className="leads-comm-role label-mono">VICE LEAD</div>
                    <p className="leads-comm-bio">
                      Harmonizing team initiatives, fostering inclusive participation, and ensuring active engagement across academic years.
                    </p>
                  </div>
                </div>

                {/* Progress Indicator */}
                <div className="leads-comm-switcher" aria-label="Community Leads switcher">
                  <button
                    type="button"
                    className={`leads-comm-dot ${activeCommunityLead === 0 ? 'is-active' : ''}`}
                    onClick={() => setActiveCommunityLead(0)}
                    aria-label="View Avalakunta Sumanth"
                  >
                    <span className="label-mono">01 &bull; MAIN LEAD</span>
                  </button>
                  <button
                    type="button"
                    className={`leads-comm-dot ${activeCommunityLead === 1 ? 'is-active' : ''}`}
                    onClick={() => setActiveCommunityLead(1)}
                    aria-label="View Kusmitha Sai"
                  >
                    <span className="label-mono">02 &bull; VICE LEAD</span>
                  </button>
                </div>
              </div>

              {/* Large Editorial Portrait Visual (45-60% viewport width) */}
              <div className="leads-community-portrait-col">
                <div className="leads-portrait-frame">
                  {/* Portrait 1: Sumanth */}
                  <div
                    className={`leads-portrait-slide ${activeCommunityLead === 0 ? 'is-active' : 'is-exited'
                      }`}
                  >
                    <img
                      src={sumanthImg}
                      alt="Avalakunta Sumanth — Community Lead, Main Lead"
                      className="leads-portrait-img"
                      loading="eager"
                    />
                    <div className="leads-portrait-caption">
                      <span className="label-mono">SUMANTH &bull; MAIN LEAD</span>
                    </div>
                  </div>

                  {/* Portrait 2: Kusmitha */}
                  <div
                    className={`leads-portrait-slide ${activeCommunityLead === 1 ? 'is-active' : 'is-incoming'
                      }`}
                  >
                    <img
                      src={kusmithaImg}
                      alt="Kusmitha Sai — Community Lead, Vice Lead"
                      className="leads-portrait-img"
                      loading="lazy"
                    />
                    <div className="leads-portrait-caption">
                      <span className="label-mono">KUSMITHA &bull; VICE LEAD</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Community Close Statement */}
        <div className="leads-community-close">
          <div className="container">
            <div className="leads-comm-settle leads-reveal">
              <span className="label-mono leads-settle-tag">COMMUNITY LEADS</span>
              <p className="leads-settle-text">
                &ldquo;Bringing students together, creating momentum, and keeping the community moving.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          04. TRANSITION — COMMUNITY → TECHNICAL
          ========================================================================= */}
      <section className="leads-transition-tech" id="technical">
        <div className="container">
          <div className="leads-tech-trans__inner leads-reveal">
            <div className="leads-connecting-line" aria-hidden="true"></div>
            <div className="leads-trans-meta">
              <span className="label-mono leads-chapter-tag">CHAPTER 02 &bull; TECHNICAL TEAM</span>
              <span className="label-mono leads-trans-code">02 / CORE BUILD</span>
            </div>
            <h2 className="leads-trans-heading">
              BUILDING THE<br />THINGS STC NEEDS.
            </h2>
            <p className="leads-trans-sub">
              Engineering systems, hands-on development, and collaborative hackathons that turn ideas into working software.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          05. TECHNICAL TEAM — THREE CHAPTERS
          ========================================================================= */}
      <section className="leads-technical-chapters">
        <div className="container">
          {/* Chapter 02.1: PROJECT */}
          <article className="tech-chapter tech-chapter--project leads-reveal" id="project">
            <div className="tech-chapter__header">
              <div className="label-mono tech-chapter__badge">02.1 / PROJECT</div>
              <h3 className="tech-chapter__title">PROJECT</h3>
              <p className="tech-chapter__desc">
                Architecting real-world applications, managing codebases, and translating student community ideas into finished products.
              </p>
            </div>

            <div className="tech-pair-composition">
              {/* Person 01: Joseph Rohith */}
              <div className="tech-member-card">
                <div className="tech-member-frame">
                  <img
                    src={rohithImg}
                    alt="Joseph Rohith — Project Lead"
                    className="tech-member-img"
                    loading="lazy"
                  />
                  <div className="tech-member-badge label-mono">01 &bull; LEAD</div>
                </div>
                <div className="tech-member-info">
                  <span className="tech-member-index label-mono">01</span>
                  <h4 className="tech-member-name">JOSEPH ROHITH</h4>
                  <span className="tech-member-role label-mono">PROJECT LEAD</span>
                </div>
              </div>

              {/* Connecting Vector Line between Project Leads */}
              <div className="tech-connector" aria-hidden="true">
                <div className="tech-connector__line"></div>
                <span className="tech-connector__node"></span>
                <div className="tech-connector__label label-mono">PROJECT EXECUTION</div>
              </div>

              {/* Person 02: C.S. Nisa Santhosh */}
              <div className="tech-member-card">
                <div className="tech-member-frame">
                  <img
                    src={nisaImg}
                    alt="C.S. Nisa Santhosh — Project Vice Lead"
                    className="tech-member-img"
                    loading="lazy"
                  />
                  <div className="tech-member-badge label-mono">02 &bull; VICE LEAD</div>
                </div>
                <div className="tech-member-info">
                  <span className="tech-member-index label-mono">02</span>
                  <h4 className="tech-member-name">C.S. NISA SANTHOSH</h4>
                  <span className="tech-member-role label-mono">PROJECT — VICE LEAD</span>
                </div>
              </div>
            </div>
          </article>

          {/* Chapter 02.2: TECHNOLOGY */}
          <article className="tech-chapter tech-chapter--technology leads-reveal" id="technology">
            <div className="tech-chapter__header">
              <div className="label-mono tech-chapter__badge">02.2 / TECHNOLOGY</div>
              <h3 className="tech-chapter__title">TECHNOLOGY</h3>
              <p className="tech-chapter__desc">
                Guiding core technical stacks, mentoring developers, and maintaining engineering standards across community repositories.
              </p>
            </div>

            <div className="tech-pair-composition">
              {/* Person 03: N. Teena Mohitha Chowdary */}
              <div className="tech-member-card">
                <div className="tech-member-frame">
                  <img
                    src={teenaImg}
                    alt="N. Teena Mohitha Chowdary — Technical Lead"
                    className="tech-member-img"
                    loading="lazy"
                  />
                  <div className="tech-member-badge label-mono">03 &bull; LEAD</div>
                </div>
                <div className="tech-member-info">
                  <span className="tech-member-index label-mono">03</span>
                  <h4 className="tech-member-name">N. TEENA MOHITHA CHOWDARY</h4>
                  <span className="tech-member-role label-mono">TECHNICAL LEAD</span>
                </div>
              </div>

              {/* Connecting Vector Line between Tech Leads */}
              <div className="tech-connector" aria-hidden="true">
                <div className="tech-connector__line"></div>
                <span className="tech-connector__node"></span>
                <div className="tech-connector__label label-mono">TECH ARCHITECTURE</div>
              </div>

              {/* Person 04: N. Rithika Sree */}
              <div className="tech-member-card">
                <div className="tech-member-frame">
                  <img
                    src={rishikaImg}
                    alt="N. Rithika Sree — Technical Vice Lead"
                    className="tech-member-img"
                    loading="lazy"
                  />
                  <div className="tech-member-badge label-mono">04 &bull; VICE LEAD</div>
                </div>
                <div className="tech-member-info">
                  <span className="tech-member-index label-mono">04</span>
                  <h4 className="tech-member-name">N. RITHIKA SREE</h4>
                  <span className="tech-member-role label-mono">TECHNICAL — VICE LEAD</span>
                </div>
              </div>
            </div>
          </article>

          {/* Chapter 02.3: HACKATHONS */}
          <article className="tech-chapter tech-chapter--hackathon leads-reveal" id="hackathons">
            <div className="tech-chapter__header">
              <div className="label-mono tech-chapter__badge">02.3 / HACKATHONS</div>
              <h3 className="tech-chapter__title">HACKATHONS</h3>
              <p className="tech-chapter__desc">
                Organizing high-energy build sprints, rapid prototyping challenges, and campus-wide competitive hackathons.
              </p>
            </div>

            <div className="tech-pair-composition">
              {/* Person 05: G. Divya Sree */}
              <div className="tech-member-card">
                <div className="tech-member-frame">
                  <img
                    src={divyaImg}
                    alt="G. Divya Sree — Hackathon Lead"
                    className="tech-member-img"
                    loading="lazy"
                  />
                  <div className="tech-member-badge label-mono">05 &bull; LEAD</div>
                </div>
                <div className="tech-member-info">
                  <span className="tech-member-index label-mono">05</span>
                  <h4 className="tech-member-name">G. DIVYA SREE</h4>
                  <span className="tech-member-role label-mono">HACKATHON LEAD</span>
                </div>
              </div>

              {/* Connecting Vector Line between Hackathon Leads */}
              <div className="tech-connector" aria-hidden="true">
                <div className="tech-connector__line"></div>
                <span className="tech-connector__node"></span>
                <div className="tech-connector__label label-mono">SPRINT MOMENTUM</div>
              </div>

              {/* Person 06: C. Bhanu Prakash */}
              <div className="tech-member-card">
                <div className="tech-member-frame">
                  <img
                    src={bhanuImg}
                    alt="C. Bhanu Prakash — Hackathon Vice Lead"
                    className="tech-member-img"
                    loading="lazy"
                  />
                  <div className="tech-member-badge label-mono">06 &bull; VICE LEAD</div>
                </div>
                <div className="tech-member-info">
                  <span className="tech-member-index label-mono">06</span>
                  <h4 className="tech-member-name">C. BHANU PRAKASH</h4>
                  <span className="tech-member-role label-mono">HACKATHON — VICE LEAD</span>
                </div>
              </div>
            </div>
          </article>

          {/* Technical Team Summary Statement */}
          <div className="tech-summary-box leads-reveal">
            <span className="label-mono tech-summary-label">TECHNICAL TEAM &bull; COLLECTIVE</span>
            <p className="tech-summary-quote">
              &ldquo;Building the projects, experiments and opportunities that give STC something to build around.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          06. NON-TECHNICAL TEAM — INTERACTIVE EDITORIAL ROWS
          ========================================================================= */}
      <section className="leads-nontech" id="non-technical">
        <div className="container">
          <div className="leads-chapter-header leads-reveal">
            <div className="label-mono leads-chapter-num">03 / NON-TECHNICAL</div>
            <h2 className="leads-chapter-title">
              MAKING THE<br />COMMUNITY MOVE.
            </h2>
            <p className="leads-nontech-sub">
              Driving storytelling, cross-college operations, and world-class speaker sessions that energize the network.
            </p>
          </div>

          <div className="leads-nontech-layout">
            {/* Interactive Rows List */}
            <div className="leads-nontech-list" role="tablist" aria-label="Non-Technical Team members">
              {NON_TECH_MEMBERS.map((member, idx) => {
                const isSelected = activeNonTechIndex === idx;
                return (
                  <div
                    key={member.index}
                    role="tab"
                    tabIndex={0}
                    aria-selected={isSelected}
                    className={`nontech-row ${isSelected ? 'is-active' : ''}`}
                    onMouseEnter={() => setActiveNonTechIndex(idx)}
                    onFocus={() => setActiveNonTechIndex(idx)}
                    onClick={() => setActiveNonTechIndex(idx)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveNonTechIndex(idx);
                      }
                    }}
                  >
                    <div className="nontech-row__index label-mono">{member.index}</div>
                    <div className="nontech-row__main">
                      <h4 className="nontech-row__name">{member.name}</h4>
                      <span className="nontech-row__tag label-mono">{member.tag}</span>
                    </div>
                    <div className="nontech-row__role label-mono">{member.role}</div>
                    <div className="nontech-row__indicator" aria-hidden="true">
                      <span className="nontech-arrow">&rarr;</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sticky Editorial Preview for Active Row */}
            <div className="leads-nontech-preview" aria-live="polite">
              <div className="nontech-preview-card">
                <div className="nontech-preview-frame">
                  {NON_TECH_MEMBERS.map((member, idx) => (
                    <img
                      key={member.index}
                      src={member.image}
                      alt={member.alt}
                      className={`nontech-preview-img ${activeNonTechIndex === idx ? 'is-visible' : ''
                        }`}
                      loading="lazy"
                    />
                  ))}
                  <div className="nontech-preview-index label-mono">
                    {NON_TECH_MEMBERS[activeNonTechIndex].index} / 09
                  </div>
                </div>
                <div className="nontech-preview-caption">
                  <div className="nontech-preview-title">
                    {NON_TECH_MEMBERS[activeNonTechIndex].name}
                  </div>
                  <div className="nontech-preview-sub label-mono">
                    {NON_TECH_MEMBERS[activeNonTechIndex].role}
                  </div>
                  <blockquote className="nontech-preview-quote">
                    &ldquo;{NON_TECH_MEMBERS[activeNonTechIndex].quote}&rdquo;
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          07. TEAM CONVERGENCE — THE PAYOFF
          ========================================================================= */}
      <section className="leads-convergence" id="convergence">
        <div className="container">
          <div className="leads-convergence__inner leads-reveal">
            <div className="convergence-prelabel label-mono">INDIVIDUALS &rarr; ROLES &rarr; ONE COMMUNITY</div>

            {/* Convergence Nodes Grid */}
            <div className="convergence-nodes" aria-hidden="true">
              <span className="convergence-chip chip-1">COMMUNITY</span>
              <span className="convergence-line"></span>
              <span className="convergence-chip chip-2">PROJECT</span>
              <span className="convergence-line"></span>
              <span className="convergence-chip chip-3">TECHNOLOGY</span>
              <span className="convergence-line"></span>
              <span className="convergence-chip chip-4">HACKATHONS</span>
              <span className="convergence-line"></span>
              <span className="convergence-chip chip-5">SOCIAL MEDIA</span>
              <span className="convergence-line"></span>
              <span className="convergence-chip chip-6">COORDINATION</span>
              <span className="convergence-line"></span>
              <span className="convergence-chip chip-7">SPEAKERS</span>
            </div>

            <div className="convergence-payoff">
              <h2 className="convergence-title">
                <span className="convergence-title__line">ONE TEAM.</span>
                <span className="convergence-title__line convergence-title__highlight">
                  BUILT TOGETHER.
                </span>
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          08. FINAL STATEMENT
          ========================================================================= */}
      <section className="leads-statement" id="statement">
        <div className="container">
          <div className="leads-statement__inner leads-reveal">
            <div className="label-mono leads-statement-tag">ALIGNMENT &bull; VISION</div>
            <h2 className="leads-statement-heading">
              DIFFERENT ROLES.<br />ONE DIRECTION.
            </h2>
            <p className="leads-statement-text">
              Different responsibilities. Different strengths. One community moving in the same direction.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          09. JOIN THE TEAM (DARK SECTION)
          ========================================================================= */}
      <section className="leads-join-cta" id="join-team">
        <div className="container">
          <div className="leads-join-cta__inner leads-reveal">
            <div className="label-mono leads-join-eyebrow">CONTRIBUTE &bull; LEAD &bull; BUILD</div>
            <h2 className="leads-join-heading">
              WANT TO<br />BUILD WITH US?
            </h2>
            <p className="leads-join-sub">
              STC grows with every person who decides to contribute.
            </p>
            <div className="leads-join-action">
              <a
                href="#join"
                className="leads-cta-btn"
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate('home', 'join');
                  }
                }}
              >
                <span className="leads-cta-text">JOIN THE TEAM</span>
                <span className="leads-cta-arrow" aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
