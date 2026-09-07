import React, { useState, useEffect, useRef, useMemo } from 'react';
import RoadmapsHeroCanvas from './RoadmapsHeroCanvas';
import { ROADMAPS, NOT_SURE_CHOICES } from './roadmapsData';
import { initScrollReveal } from '../../utils/revealObserver';
import './RoadmapsPage.css';

export default function RoadmapsPage({ onNavigate }) {
  // Currently selected roadmap ID (defaults to 'web-development')
  const [activeRoadmapId, setActiveRoadmapId] = useState('web-development');

  // Currently active stage in the journey
  const [activeStageId, setActiveStageId] = useState('foundations');

  // Hover state on direction list
  const [hoveredRoadmapId, setHoveredRoadmapId] = useState(null);

  // State indicating if the journey section has scrolled 80% up past top
  const [isPathScrolledPast, setIsPathScrolledPast] = useState(false);

  const journeyRef = useRef(null);
  const journeyProgressRef = useRef(null);

  // Active roadmap object
  const activeRoadmap = useMemo(() => {
    return ROADMAPS.find((r) => r.id === activeRoadmapId) || ROADMAPS[0];
  }, [activeRoadmapId]);

  // Scroll reveal observer using unified engine
  useEffect(() => {
    const cleanup = initScrollReveal();
    return cleanup;
  }, []);

  // Track scroll position:
  // 1. Highlight current stage
  // 2. Hide path section ONLY when it is 80% scrolled up past top, and show again when scrolled back
  useEffect(() => {
    const handleScroll = () => {
      const journey = journeyRef.current;
      if (!journey) return;

      const rect = journey.getBoundingClientRect();
      const sectionHeight = journey.offsetHeight;

      // 80% Scrolled-Up check:
      // When rect.top < 0, the top of the journey has scrolled above the viewport top.
      // -rect.top is the distance scrolled above the viewport.
      if (rect.top < 0 && sectionHeight > 0) {
        const scrolledUpFraction = (-rect.top) / sectionHeight;
        if (scrolledUpFraction >= 0.80) {
          setIsPathScrolledPast(true);
        } else {
          setIsPathScrolledPast(false);
        }
      } else {
        // Above or entering the path section: always visible
        setIsPathScrolledPast(false);
      }

      // Stage active tracking
      const stageElements = journey.querySelectorAll('.journey-stage');
      const viewportMiddle = window.innerHeight * 0.45;

      stageElements.forEach((el) => {
        const sRect = el.getBoundingClientRect();
        if (sRect.top <= viewportMiddle && sRect.bottom >= viewportMiddle) {
          const stageId = el.getAttribute('data-stage-id');
          if (stageId && stageId !== activeStageId) {
            setActiveStageId(stageId);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeStageId]);

  // Handle roadmap selection:
  // Does NOT scroll automatically when clicking categories in Start Here (preserves page position)
  const selectRoadmap = (id, shouldScrollToJourney = false) => {
    setActiveRoadmapId(id);
    setActiveStageId('foundations');

    if (shouldScrollToJourney) {
      setTimeout(() => {
        const el = document.getElementById('roadmap-journey');
        if (el) {
          const headerOffset = 80;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }, 50);
    }
  };

  const scrollToJourney = (e) => {
    if (e) e.preventDefault();
    const el = document.getElementById('roadmap-journey');
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const scrollToDirections = (e) => {
    if (e) e.preventDefault();
    const el = document.getElementById('choose-direction');
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="roadmaps-page">
      {/* ====================================================================
          1. HERO SECTION
          ==================================================================== */}
      <section className="roadmaps-hero" id="roadmaps-top">
        <RoadmapsHeroCanvas />

        <div className="container roadmaps-hero__inner">
          <div className="roadmaps-hero__meta-top roadmaps-reveal">
            <span className="roadmaps-eyebrow label-mono">ROADMAPS</span>
            <span className="roadmaps-edition label-mono">STC / LEARNING &bull; 2026</span>
          </div>

          <div className="roadmaps-hero__title-group roadmaps-reveal">
            <h1 className="roadmaps-hero__heading">
              <span>KNOW WHERE</span>
              <span>YOU’RE GOING.</span>
            </h1>
          </div>

          <p className="roadmaps-hero__copy roadmaps-reveal">
            Curated learning paths to help turn curiosity into skills, projects and opportunities.
          </p>

          <div className="roadmaps-hero__actions roadmaps-reveal">
            <button
              type="button"
              className="btn btn-primary"
              onClick={scrollToDirections}
            >
              CHOOSE A DIRECTION &rarr;
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={scrollToJourney}
            >
              EXPLORE THE PATH &darr;
            </button>
          </div>
        </div>

        <div className="roadmaps-hero__scroll-indicator" aria-hidden="true">
          <span className="label-mono">EXPLORE ROADMAPS</span>
          <span className="roadmaps-hero__scroll-line"></span>
        </div>
      </section>

      {/* ====================================================================
          2. CHOOSE YOUR DIRECTION
          ==================================================================== */}
      <section className="roadmaps-directions-section" id="choose-direction">
        <div className="container roadmaps-directions__inner">
          <div className="roadmaps-directions__header roadmaps-reveal">
            <div className="roadmaps-directions__tag label-mono">START HERE</div>
            <h2 className="roadmaps-directions__heading">WHAT DO YOU WANT TO BUILD?</h2>
            <p className="roadmaps-directions__subhead">
              Pick a direction. You don’t need to know everything yet.
            </p>
          </div>

          <div className="roadmaps-directions__layout">
            {/* Editorial List of 8 Paths: Clicking selects path WITHOUT auto-scrolling */}
            <div
              className="roadmaps-list"
              role="region"
              aria-label="Available Roadmap Directions"
            >
              {ROADMAPS.map((roadmap) => {
                const isSelected = activeRoadmapId === roadmap.id;
                const isHovered = hoveredRoadmapId === roadmap.id;
                const isDimmed = hoveredRoadmapId !== null && !isHovered && !isSelected;

                return (
                  <button
                    key={roadmap.id}
                    type="button"
                    className={`roadmap-row ${isSelected ? 'is-selected' : ''} ${
                      isDimmed ? 'is-dimmed' : ''
                    }`}
                    onClick={() => selectRoadmap(roadmap.id, false)}
                    onMouseEnter={() => setHoveredRoadmapId(roadmap.id)}
                    onMouseLeave={() => setHoveredRoadmapId(null)}
                    aria-pressed={isSelected}
                    id={`roadmap-btn-${roadmap.id}`}
                  >
                    <div className="roadmap-row__left">
                      <span className="roadmap-row__index label-mono">{roadmap.index}</span>
                      <span className="roadmap-row__title">{roadmap.title}</span>
                    </div>

                    <div className="roadmap-row__right">
                      <span className="roadmap-row__tagline label-mono">
                        {roadmap.tagline.split('&')[0]}
                      </span>
                      <span className="roadmap-row__arrow" aria-hidden="true">
                        &rarr;
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Subtle Active Preview / Context Panel */}
            <aside className="roadmap-preview-card roadmaps-reveal" aria-live="polite">
              <div className="roadmap-preview__meta label-mono">
                CURRENT SELECTION &bull; {activeRoadmap.index}
              </div>
              <h3 className="roadmap-preview__title">{activeRoadmap.title}</h3>
              <p className="roadmap-preview__description">{activeRoadmap.description}</p>

              <div className="roadmap-preview__progression-wrap">
                <div className="roadmap-preview__progression-label label-mono">
                  CURATED PROGRESSION
                </div>
                <div className="roadmap-preview__progression-chips">
                  {activeRoadmap.progression.map((step, idx) => (
                    <span key={idx} className="roadmap-preview__chip">
                      {step}
                    </span>
                  ))}
                </div>
              </div>

              <div className="roadmap-preview__footer">
                <button
                  type="button"
                  className="btn btn-primary roadmap-preview__cta"
                  onClick={scrollToJourney}
                >
                  VIEW {activeRoadmap.title} PATH &darr;
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ====================================================================
          4 & 5. MAIN ROADMAP JOURNEY (SCROLL-DRIVEN EXPERIENCE)
          Disappears ONLY when 80% scrolled up, and restores when scrolled back
          ==================================================================== */}
      <section
        className={`roadmaps-journey-section ${isPathScrolledPast ? 'is-scrolled-past' : ''}`}
        id="roadmap-journey"
        ref={journeyRef}
      >
        <div className="container roadmaps-journey__inner">
          <div className="roadmaps-journey__header">
            <div className="roadmaps-journey__tag label-mono">
              THE PATH &bull; {activeRoadmap.title}
            </div>
            <h2 className="roadmaps-journey__heading">LEARN IT. THEN BUILD IT.</h2>
            <p className="roadmaps-journey__subhead">
              Every stage has a purpose. Avoid passive tutorials—focus on shipping real software.
            </p>
          </div>

          {/* Continuous Progression Container */}
          <div className="roadmaps-timeline-container">
            {/* Vertical Line Spine */}
            <div
              className="roadmaps-timeline__spine"
              ref={journeyProgressRef}
              aria-hidden="true"
            >
              <div className="roadmaps-timeline__spine-indicator"></div>
            </div>

            <div className="roadmaps-stages-list" key={activeRoadmapId}>
              {activeRoadmap.stages.map((stage) => {
                const isStageActive = activeStageId === stage.id;
                const isOpportunities = stage.id === 'opportunities';
                const isBuild = stage.id === 'build';

                return (
                  <article
                    key={`${activeRoadmapId}-${stage.id}`}
                    id={`stage-${stage.id}`}
                    data-stage-id={stage.id}
                    className={`journey-stage ${
                      isStageActive ? 'is-active-stage' : ''
                    } ${isBuild ? 'is-build-stage' : ''} ${
                      isOpportunities ? 'is-opportunities-stage' : ''
                    }`}
                  >
                    <div className="journey-stage__node-anchor" aria-hidden="true">
                      <span className="journey-stage__node-dot"></span>
                      <span className="journey-stage__node-number label-mono">
                        {stage.index}
                      </span>
                    </div>

                    <div className="journey-stage__content">
                      <div className="journey-stage__top">
                        <span className="journey-stage__label label-mono">
                          STAGE {stage.index}
                        </span>
                        <h3 className="journey-stage__title">{stage.title}</h3>
                      </div>

                      <blockquote className="journey-stage__quote">
                        “{stage.quote}”
                      </blockquote>

                      <p className="journey-stage__summary">{stage.summary}</p>

                      <div className="journey-stage__items-grid">
                        {stage.items.map((item, iIdx) => (
                          <div key={iIdx} className="journey-stage__item">
                            <span
                              className="journey-stage__item-bullet"
                              aria-hidden="true"
                            >
                              &mdash;
                            </span>
                            <span className="journey-stage__item-text">{item}</span>
                          </div>
                        ))}
                      </div>

                      {isOpportunities && (
                        <div className="journey-opportunities-banner">
                          <div className="journey-opportunities__label label-mono">
                            STC ECOSYSTEM CONNECTIONS
                          </div>
                          <div className="journey-opportunities__tags">
                            <span>INTERNSHIPS</span>
                            <span className="divider">&bull;</span>
                            <span>HACKATHONS</span>
                            <span className="divider">&bull;</span>
                            <span>OPEN SOURCE</span>
                            <span className="divider">&bull;</span>
                            <span>COMMUNITY</span>
                            <span className="divider">&bull;</span>
                            <span>JOBS</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          6. VISUAL TRANSFORMATION (Editorial Concept Path)
          ==================================================================== */}
      <section className="roadmaps-transformation-section">
        <div className="container roadmaps-transformation__inner roadmaps-reveal">
          <div className="roadmaps-transformation__meta label-mono">
            THE LEARNING PHILOSOPHY
          </div>
          <h2 className="roadmaps-transformation__heading">
            FROM WORDS TO REAL OPPORTUNITIES.
          </h2>
          <p className="roadmaps-transformation__copy">
            A roadmap is not a checklist of videos to watch. It is a progression of tangible actions.
          </p>

          <div className="roadmaps-transformation__path" aria-hidden="true">
            <div className="path-step">
              <span className="path-step__num label-mono">01</span>
              <span className="path-step__word">LEARN</span>
              <span className="path-step__sub">Grasp the core syntax & tools</span>
            </div>
            <span className="path-step__arrow">&rarr;</span>
            <div className="path-step">
              <span className="path-step__num label-mono">02</span>
              <span className="path-step__word">BUILD</span>
              <span className="path-step__sub">Create functional programs</span>
            </div>
            <span className="path-step__arrow">&rarr;</span>
            <div className="path-step">
              <span className="path-step__num label-mono">03</span>
              <span className="path-step__word">SHARE</span>
              <span className="path-step__sub">Publish source in public</span>
            </div>
            <span className="path-step__arrow">&rarr;</span>
            <div className="path-step">
              <span className="path-step__num label-mono">04</span>
              <span className="path-step__word">CONNECT</span>
              <span className="path-step__sub">Pair with STC peers</span>
            </div>
            <span className="path-step__arrow">&rarr;</span>
            <div className="path-step">
              <span className="path-step__num label-mono">05</span>
              <span className="path-step__word">GROW</span>
              <span className="path-step__sub">Land internships & roles</span>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          7. PROJECT BRIDGE
          ==================================================================== */}
      <section className="roadmaps-projects-section" id="projects-bridge">
        <div className="container roadmaps-projects__inner">
          <div className="roadmaps-projects__header">
            <div className="roadmaps-projects__tag label-mono">DON’T STOP AT LEARNING</div>
            <h2 className="roadmaps-projects__heading">
              EVERY ROADMAP SHOULD LEAD TO SOMETHING REAL.
            </h2>
            <p className="roadmaps-projects__subhead">
              The fastest way to understand a technology is to use it. Pick a small project,
              build it, break it, fix it and build again.
            </p>
          </div>

          <div className="roadmaps-projects__list" key={`projects-${activeRoadmapId}`}>
            <div className="roadmaps-projects__header-row label-mono">
              <span>PROJECT &bull; {activeRoadmap.title}</span>
              <span>LEVEL &bull; SKILLS</span>
            </div>

            {activeRoadmap.projects.map((proj) => (
              <div key={`${activeRoadmapId}-${proj.index}`} className="project-editorial-row">
                <div className="project-editorial-row__left">
                  <div className="project-editorial-row__identity">
                    <span className="project-editorial-row__index label-mono">
                      {proj.index}
                    </span>
                    <h3 className="project-editorial-row__title">{proj.title}</h3>
                  </div>
                  <p className="project-editorial-row__outcome">{proj.outcome}</p>
                </div>

                <div className="project-editorial-row__right">
                  <span
                    className={`project-difficulty-badge label-mono difficulty--${proj.difficulty.toLowerCase()}`}
                  >
                    {proj.difficulty}
                  </span>

                  <div className="project-skills-list">
                    {proj.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="project-skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          8. ROADMAP.SH HANDOFF
          ==================================================================== */}
      <section className="roadmaps-handoff-section">
        <div className="container roadmaps-handoff__inner roadmaps-reveal">
          <div className="roadmaps-handoff__meta label-mono">GO DEEPER</div>
          <h2 className="roadmaps-handoff__heading">WANT THE FULL PATH?</h2>
          <p className="roadmaps-handoff__copy">
            STC gives you the direction. Explore the detailed developer roadmaps on roadmap.sh.
          </p>

          <div className="roadmaps-handoff__action">
            <a
              href={activeRoadmap.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary roadmaps-handoff__btn"
              id="roadmap-external-link"
              aria-label={`Explore official ${activeRoadmap.title} roadmap on roadmap.sh in a new tab`}
            >
              EXPLORE ON ROADMAP.SH &rarr;
            </a>
          </div>

          <p className="roadmaps-handoff__note label-mono">
            OFFICIAL DESTINATION &bull; {activeRoadmap.externalLabel}
          </p>
        </div>
      </section>

      {/* ====================================================================
          9. NOT SURE WHERE TO START? (DECISION BRIDGE)
          ==================================================================== */}
      <section className="roadmaps-decision-section" id="decision-bridge">
        <div className="container roadmaps-decision__inner">
          <div className="roadmaps-decision__header roadmaps-reveal">
            <div className="roadmaps-decision__tag label-mono">DECISION GUIDE</div>
            <h2 className="roadmaps-decision__heading">NOT SURE WHERE TO START?</h2>
            <p className="roadmaps-decision__subhead">
              Start with what you want to make, not what everyone else is learning.
            </p>
          </div>

          <div className="roadmaps-decision__grid roadmaps-reveal">
            {NOT_SURE_CHOICES.map((choice) => {
              const isCurrent = activeRoadmapId === choice.roadmapId;

              return (
                <button
                  key={choice.id}
                  type="button"
                  className={`decision-card ${isCurrent ? 'is-current' : ''}`}
                  onClick={() => selectRoadmap(choice.roadmapId, true)}
                >
                  <div className="decision-card__prompt">{choice.prompt}</div>
                  <div className="decision-card__target">
                    <span className="label-mono">{choice.label}</span>
                    <span className="decision-card__arrow">&rarr;</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          10. EVENTS CONNECTION
          ==================================================================== */}
      <section className="roadmaps-events-bridge-section">
        <div className="container roadmaps-events-bridge__inner roadmaps-reveal">
          <div className="roadmaps-events-bridge__tag label-mono">
            APPLIED LEARNING
          </div>

          <h2 className="roadmaps-events-bridge__heading">
            <span>LEARN SOMETHING.</span>
            <span>THEN FIND SOMEWHERE TO USE IT.</span>
          </h2>

          <p className="roadmaps-events-bridge__copy">
            Do not let projects sit idle on your local machine. Bring your prototypes to
            upcoming hackathons and STC collaborative circles.
          </p>

          <div className="roadmaps-events-bridge__actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onNavigate && onNavigate('events')}
            >
              EXPLORE EVENTS &rarr;
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => onNavigate && onNavigate('events', 'external-hackathons')}
            >
              FIND A HACKATHON &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* ====================================================================
          11. FINAL STATEMENT & COMMUNITY CTA
          ==================================================================== */}
      <section className="roadmaps-final-cta-section" id="roadmaps-final-cta">
        <div className="container roadmaps-final-cta__inner roadmaps-reveal">
          <div className="roadmaps-final-cta__tag label-mono">
            06 / GET INVOLVED
          </div>

          <h2 className="roadmaps-final-cta__heading">
            <span>DON’T JUST FOLLOW A ROADMAP.</span>
            <span>BUILD ALONG THE WAY.</span>
          </h2>

          <p className="roadmaps-final-cta__copy">
            Learn with people. Build real things. Find opportunities. Grow beyond the classroom.
          </p>

          <div className="roadmaps-final-cta__actions">
            <a
              href="https://chat.whatsapp.com/IGahTMfZbY5GOewoO0SjVu"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary roadmaps-final-cta__btn"
            >
              JOIN THE COMMUNITY &rarr;
            </a>
            <button
              type="button"
              className="btn btn-secondary roadmaps-final-cta__btn-secondary"
              onClick={() => onNavigate && onNavigate('events')}
            >
              EXPLORE EVENTS &rarr;
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
