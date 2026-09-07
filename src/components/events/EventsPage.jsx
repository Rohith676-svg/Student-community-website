import React, { useState, useEffect, useRef, useMemo } from 'react';
import { EventsHeroCanvas, ProgressionCanvas } from './EventsNetworkCanvas';
import {
  EXTERNAL_HACKATHONS,
  HACKATHON_FILTERS,
  MODE_FILTERS,
} from './hackathonsData';
import { initScrollReveal } from '../../utils/revealObserver';
import './EventsPage.css';

const PROGRESSION_STAGES = [
  {
    id: 'learn',
    index: '01',
    tag: 'STAGE 01',
    word: 'LEARN.',
    desc: 'Absorb new ideas, explore modern stacks, and discover what sparks your curiosity beyond the syllabus.',
  },
  {
    id: 'build',
    index: '02',
    tag: 'STAGE 02',
    word: 'BUILD.',
    desc: 'Turn theory into functional software, prototypes, and real-world experiments with fellow builders.',
  },
  {
    id: 'compete',
    index: '03',
    tag: 'STAGE 03',
    word: 'COMPETE.',
    desc: 'Test your capabilities against external challenges, hackathons, and deadlines with confidence.',
  },
  {
    id: 'connect',
    index: '04',
    tag: 'STAGE 04',
    word: 'CONNECT.',
    desc: 'Find collaborators, mentors, and lifelong peers who share the drive to create what is next.',
  },
];

export default function EventsPage({ onNavigate }) {
  // Filter state for external hackathons
  const [activeTheme, setActiveTheme] = useState('ALL');
  const [activeMode, setActiveMode] = useState('ALL');

  // Expanded row state for hackathon accordion (desktop hover & mobile tap)
  const [expandedRowId, setExpandedRowId] = useState(null);

  // Progression scroll progress tracking (ref for 60fps canvas loop + active index state)
  const progressionTrackRef = useRef(null);
  const scrollProgressRef = useRef(0);
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  // Scroll reveal observer using unified engine
  useEffect(() => {
    const cleanup = initScrollReveal();
    return cleanup;
  }, [activeTheme, activeMode]);

  // Track scroll position in Progression story track
  useEffect(() => {
    const handleScroll = () => {
      const track = progressionTrackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const totalScrollable = track.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const progress = Math.min(Math.max(-rect.top / totalScrollable, 0), 1);
      scrollProgressRef.current = progress;

      if (progress < 0.25) {
        setActiveStageIndex(0);
      } else if (progress < 0.52) {
        setActiveStageIndex(1);
      } else if (progress < 0.78) {
        setActiveStageIndex(2);
      } else {
        setActiveStageIndex(3);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filtered hackathon list
  const filteredHackathons = useMemo(() => {
    return EXTERNAL_HACKATHONS.filter((h) => {
      const themeMatch =
        activeTheme === 'ALL' ||
        h.categories.includes(activeTheme) ||
        (activeTheme === 'OTHER' && h.categories.includes('OTHER'));
      const modeMatch = activeMode === 'ALL' || h.mode === activeMode;
      return themeMatch && modeMatch;
    });
  }, [activeTheme, activeMode]);

  const handleRowClick = (id) => {
    setExpandedRowId((prev) => (prev === id ? null : id));
  };

  const handleRowMouseEnter = (id) => {
    // Only expand on hover on fine pointer devices (desktop)
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      setExpandedRowId(id);
    }
  };

  const handleRowMouseLeave = () => {
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      setExpandedRowId(null);
    }
  };

  const scrollToHackathons = (e) => {
    if (e) e.preventDefault();
    const el = document.getElementById('external-hackathons');
    if (el) {
      const headerOffset = 72; // var(--header-height)
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleJoinClick = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('home', 'join');
    }
  };

  return (
    <div className="events-page">
      {/* ====================================================================
          SECTION 1 — HERO
          ==================================================================== */}
      <section className="events-hero" id="events-top">
        <EventsHeroCanvas />

        <div className="container events-hero__inner">
          <div className="events-hero__meta-top events-reveal">
            <span className="label-mono events-hero__eyebrow">
              EVENTS & HACKATHONS
            </span>
            <span className="label-mono events-hero__edition">
              STC / CALENDAR 2026
            </span>
          </div>

          <div className="events-hero__headline-wrap events-reveal">
            <h1 className="events-hero__headline">
              <span className="events-hero__line">THINGS WORTH</span>
              <span className="events-hero__line events-hero__line--accent">
                SHOWING UP FOR.
              </span>
            </h1>
          </div>

          <div className="events-hero__meta-bottom events-reveal">
            <p className="events-hero__sub">
              From the first STC gathering to opportunities beyond campus &mdash;
              this is where learning turns into participation.
            </p>
            <div className="events-hero__scroll-cue" aria-hidden="true">
              <span className="label-mono">SCROLL TO EXPLORE</span>
              <div className="events-hero__scroll-rail">
                <div className="events-hero__scroll-dot"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 2 — STC EVENTS
          ==================================================================== */}
      <section className="stc-events-section" id="stc-events">
        <div className="container">
          <div className="stc-events__header events-reveal">
            <div className="stc-events__label label-mono">01 / STC EVENTS</div>
            <h2 className="stc-events__heading">STARTING HERE.</h2>
            <p className="stc-events__intro">
              The STC calendar is just beginning. These are the moments we build together.
            </p>
          </div>

          {/* Event 01 — Inauguration (Oversized Editorial Viewport Composition) */}
          <article className="inauguration-scene events-reveal">
            <div className="inauguration-scene__rule" aria-hidden="true">
              <span className="inauguration-scene__rule-line"></span>
              <span className="inauguration-scene__rule-dot"></span>
            </div>

            <div className="inauguration-scene__grid">
              <div className="inauguration-scene__left">
                <div className="inauguration-scene__index label-mono">01</div>
                <div className="inauguration-scene__badge-wrap">
                  <span className="inauguration-scene__badge label-mono">
                    OFFICIAL STC EVENT
                  </span>
                </div>
                <p className="inauguration-scene__desc">
                  The beginning of STC &mdash; bringing students together around
                  technology, curiosity, collaboration and the things they want to build.
                </p>
              </div>

              <div className="inauguration-scene__center">
                <h3 className="inauguration-scene__title">
                  <span>STC</span>
                  <span className="inauguration-scene__title-sub">INAUGURATION</span>
                </h3>
              </div>

              <div className="inauguration-scene__right">
                <dl className="inauguration-meta">
                  <div className="inauguration-meta__item">
                    <dt className="label-mono">DATE</dt>
                    <dd>TO BE ANNOUNCED</dd>
                  </div>
                  <div className="inauguration-meta__item">
                    <dt className="label-mono">TIME</dt>
                    <dd>TO BE ANNOUNCED</dd>
                  </div>
                  <div className="inauguration-meta__item">
                    <dt className="label-mono">LOCATION</dt>
                    <dd>TO BE ANNOUNCED</dd>
                  </div>
                </dl>

                <div className="inauguration-scene__cta-wrap">
                  <span className="inauguration-pill label-mono" role="status">
                    DETAILS COMING SOON
                  </span>
                </div>
              </div>
            </div>
          </article>

          {/* Editorial Scroll Link to External Hackathons */}
          <div className="stc-events__jump events-reveal">
            <span className="stc-events__jump-eyebrow label-mono">
              LOOKING TO COMPETE NOW?
            </span>
            <a
              href="#external-hackathons"
              className="btn btn-secondary stc-events__jump-btn stc-events__jump-link"
              onClick={scrollToHackathons}
            >
              <span className="stc-events__jump-text">EXPLORE EXTERNAL HACKATHONS</span>
              <span className="stc-events__jump-arrow" aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 3 — EMPTY FUTURE WITHOUT AN EMPTY STATE
          ==================================================================== */}
      <section className="future-events-section">
        <div className="container">
          <div className="future-events__inner events-reveal">
            <div className="future-events__micro label-mono">
              CALENDAR / BUILDING
            </div>
            <h3 className="future-events__statement">
              MORE TO COME.
            </h3>
            <p className="future-events__copy">
              STC is only getting started. New workshops, meetups, build sessions
              and community gatherings will appear here as they happen.
            </p>
            <div className="future-events__divider" aria-hidden="true"></div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 4 — TRANSITION: WHEN LEARNING ISN'T ENOUGH, BUILD.
          ==================================================================== */}
      <section className="build-transition-section">
        <div className="container build-transition__inner events-reveal">
          <div className="build-transition__rails" aria-hidden="true">
            <div className="build-transition__rail"></div>
            <div className="build-transition__rail"></div>
          </div>

          <div className="build-transition__tag label-mono">
            TRANSITION / HORIZONS
          </div>

          <h2 className="build-transition__statement">
            <span>WHEN LEARNING</span>
            <span className="build-transition__statement-line2">ISN'T ENOUGH,</span>
            <span className="build-transition__statement-accent">BUILD.</span>
          </h2>

          <div className="build-transition__line" aria-hidden="true"></div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 5 — EXTERNAL HACKATHONS
          ==================================================================== */}
      <section className="external-hackathons-section" id="external-hackathons">
        <div className="container">
          <div className="ext-header events-reveal">
            <div className="ext-header__meta">
              <span className="label-mono ext-header__tag">
                02 / EXTERNAL HACKATHONS
              </span>
              <span className="ext-badge label-mono" title="These events are hosted by third parties">
                EXTERNAL &mdash; NOT ORGANIZED BY STC
              </span>
            </div>

            <h2 className="ext-header__title">
              OPPORTUNITIES BEYOND STC.
            </h2>

            <div className="ext-header__bottom">
              <p className="ext-header__sub">
                You don't have to wait for the next STC event to build something.
                Find a challenge, form a team, and go make something real.
              </p>
              <div className="ext-header__freshness label-mono">
                UPDATED SEP 2026
              </div>
            </div>
          </div>

          {/* Minimal Editorial Filter Controls */}
          <div className="ext-controls events-reveal">
            <div className="ext-filters" role="group" aria-label="Filter by theme">
              {HACKATHON_FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className={`ext-filter-btn label-mono ${
                    activeTheme === f.id ? 'is-active' : ''
                  }`}
                  onClick={() => setActiveTheme(f.id)}
                  aria-pressed={activeTheme === f.id}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="ext-meta-bar">
              <div className="ext-modes" role="group" aria-label="Filter by mode">
                {MODE_FILTERS.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    className={`ext-mode-btn label-mono ${
                      activeMode === m.id ? 'is-active' : ''
                    }`}
                    onClick={() => setActiveMode(m.id)}
                    aria-pressed={activeMode === m.id}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              <div className="ext-count label-mono">
                {String(filteredHackathons.length).padStart(2, '0')}{' '}
                {activeTheme === 'ALL' ? 'OPPORTUNITIES' : `${activeTheme} OPPORTUNITIES`}
              </div>
            </div>
          </div>

          {/* Interactive Editorial Hackathon List */}
          <div className="hackathon-list" role="list">
            {filteredHackathons.map((h) => {
              const isExpanded = expandedRowId === h.id;
              return (
                <div
                  key={h.id}
                  className={`hackathon-row ${isExpanded ? 'is-expanded' : ''}`}
                  role="listitem"
                  onMouseEnter={() => handleRowMouseEnter(h.id)}
                  onMouseLeave={handleRowMouseLeave}
                >
                  <button
                    type="button"
                    className="hackathon-row__trigger"
                    onClick={() => handleRowClick(h.id)}
                    aria-expanded={isExpanded}
                    aria-controls={`hackathon-details-${h.id}`}
                  >
                    <div className="hackathon-row__index label-mono">{h.index}</div>

                    <div className="hackathon-row__main">
                      <span className="hackathon-row__name">{h.name}</span>
                      <div className="hackathon-row__tags-mobile">
                        <span className="label-mono">{h.date}</span>
                        <span className="hackathon-mode-badge label-mono">{h.mode}</span>
                      </div>
                    </div>

                    <div className="hackathon-row__theme label-mono">
                      {h.themeDisplay}
                    </div>

                    <div className="hackathon-row__date label-mono">
                      {h.date}
                    </div>

                    <div className="hackathon-row__platform label-mono">
                      {h.platform}
                    </div>

                    <div className="hackathon-row__action" aria-hidden="true">
                      <span className="hackathon-row__arrow">&rarr;</span>
                    </div>
                  </button>

                  {/* Expandable Editorial Metadata Drawer */}
                  <div
                    id={`hackathon-details-${h.id}`}
                    className="hackathon-drawer"
                    aria-hidden={!isExpanded}
                  >
                    <div className="hackathon-drawer__content">
                      <div className="hackathon-drawer__grid">
                        <div className="hackathon-drawer__desc-col">
                          <p className="hackathon-drawer__desc">{h.description}</p>
                        </div>

                        <div className="hackathon-drawer__meta-col">
                          <div className="hackathon-drawer__meta-item">
                            <span className="label-mono">LOCATION</span>
                            <span className="hackathon-drawer__val">{h.location}</span>
                          </div>
                          <div className="hackathon-drawer__meta-item">
                            <span className="label-mono">PLATFORM SOURCE</span>
                            <span className="hackathon-drawer__val">{h.platform}</span>
                          </div>
                          <div className="hackathon-drawer__meta-item">
                            <span className="label-mono">STATUS</span>
                            <span className="hackathon-drawer__val hackathon-drawer__val--status">
                              {h.status}
                            </span>
                          </div>
                        </div>

                        <div className="hackathon-drawer__cta-col">
                          <a
                            href={h.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary hackathon-external-btn"
                            aria-label={`View external event for ${h.name} on ${h.platform}`}
                          >
                            <span>VIEW EXTERNAL EVENT</span>
                            <span aria-hidden="true">&rarr;</span>
                          </a>
                          <span className="label-mono hackathon-drawer__note">
                            Leaves STC site
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredHackathons.length === 0 && (
              <div className="hackathon-empty-filter label-mono">
                NO HACKATHONS FOUND FOR CURRENT FILTERS. SELECT &ldquo;ALL&rdquo; TO EXPAND SEARCH.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 6 — PROGRESSION: LEARN -> BUILD -> COMPETE -> CONNECT
          ==================================================================== */}
      <section className="events-progression-track" ref={progressionTrackRef} id="progression">
        {/* Pinned Background Network Canvas */}
        <div className="events-progression__sticky-canvas-wrap" aria-hidden="true">
          <ProgressionCanvas scrollProgressRef={scrollProgressRef} />
        </div>

        {/* Persistent Story Stage Stepper Indicator */}
        <div className="events-progression__stepper-wrap" aria-hidden="true">
          <div className="container">
            <div className="events-progression__stepper">
              {PROGRESSION_STAGES.map((st, idx) => (
                <div
                  key={st.id}
                  className={`events-progression__step ${
                    idx === activeStageIndex ? 'is-active' : idx < activeStageIndex ? 'is-past' : ''
                  }`}
                >
                  <span className="events-progression__step-number">{st.index}</span>
                  <span className="events-progression__step-label">{st.id.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sequential Milestones in natural DOM flow */}
        <div className="events-progression__milestones">
          {PROGRESSION_STAGES.map((stage, idx) => (
            <div
              key={stage.id}
              className={`events-progression__milestone ${idx === activeStageIndex ? 'is-current' : ''}`}
            >
              <div className="container">
                <div className="events-progression__milestone-card events-reveal">
                  <div className="events-progression__tag label-mono">{stage.tag}</div>

                  <h2 className="events-progression__word">
                    {stage.word}
                  </h2>

                  <p className="events-progression__desc">{stage.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================================
          SECTION 7 — FINAL STATEMENT
          ==================================================================== */}
      <section className="events-statement-section">
        <div className="container events-statement__inner events-reveal">
          <div className="events-statement__tag label-mono">
            04 / COMMUNITY MOMENTUM
          </div>

          <h2 className="events-statement__heading">
            <span>THERE'S ALWAYS</span>
            <span>SOMETHING HAPPENING.</span>
          </h2>

          <p className="events-statement__copy">
            Sometimes it's an STC event. Sometimes it's a hackathon halfway across
            the country. Either way, there's always something worth building toward.
          </p>
        </div>
      </section>

      {/* ====================================================================
          SECTION 8 — FINAL CTA (Atmospheric Dark Grounding)
          ==================================================================== */}
      <section className="events-cta-section" id="events-cta">
        <div className="container events-cta__inner events-reveal">
          <span className="label-mono events-cta__eyebrow">
            05 / GET INVOLVED
          </span>

          <h2 className="events-cta__heading">
            <span>FIND SOMETHING</span>
            <span>WORTH BUILDING.</span>
          </h2>

          <p className="events-cta__copy">
            Join STC, discover opportunities and build with people who are
            curious about what's next.
          </p>

          <div className="events-cta__actions">
            <a
              href="https://chat.whatsapp.com/IGahTMfZbY5GOewoO0SjVu"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary events-cta__btn"
            >
              JOIN THE COMMUNITY &rarr;
            </a>
            <a
              href="#external-hackathons"
              className="btn btn-secondary events-cta__btn-secondary"
              onClick={scrollToHackathons}
            >
              EXPLORE HACKATHONS &rarr;
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
