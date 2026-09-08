import React, { useState, useEffect, useRef, useMemo } from 'react';
import { EventsHeroCanvas, ProgressionCanvas } from './EventsNetworkCanvas';
import {
  EXTERNAL_HACKATHONS,
  HACKATHON_FILTERS,
  MODE_FILTERS,
} from './hackathonsData';
import { initScrollReveal } from '../../utils/revealObserver';
import { collection, query, where, onSnapshot, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
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
  const { currentUser } = useAuth();
  const [liveEvents, setLiveEvents] = useState([]);
  const [userRegistrations, setUserRegistrations] = useState({});
  const [registeringId, setRegisteringId] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  // Fetch published events from backend API & subscribe to real-time updates
  const fetchEvents = async () => {
    try {
      const res = await api.get('/events');
      if (res.data?.events) {
        setLiveEvents(res.data.events);
      }
    } catch (e) {
      console.warn('API fetch events error:', e.message);
    }
  };

  useEffect(() => {
    fetchEvents();

    // Set up real-time onSnapshot listener
    let unsubscribe = () => {};
    try {
      const q = query(collection(db, 'events'), where('status', '==', 'PUBLISHED'));
      unsubscribe = onSnapshot(q, (snapshot) => {
        const list = [];
        snapshot.forEach((d) => {
          list.push({ id: d.id, ...d.data() });
        });
        if (list.length > 0) {
          setLiveEvents(list);
        }
      }, (err) => {
        console.warn('Real-time events listener notice (using API fallback):', err.message);
      });
    } catch (e) {
      console.warn('Firestore subscription setup error:', e);
    }

    // Periodic sync interval as backup
    const interval = setInterval(fetchEvents, 8000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  // Sync user registration status across published events
  useEffect(() => {
    if (!currentUser || liveEvents.length === 0) {
      setUserRegistrations({});
      return;
    }

    // 1. Fetch authoritative registration status from backend API
    liveEvents.forEach(async (ev) => {
      try {
        const res = await api.get(`/events/${ev.id}/my-registration`);
        if ((res.data?.isRegistered || res.data?.registered) && res.data?.registration) {
          setUserRegistrations((prev) => ({ ...prev, [ev.id]: res.data.registration }));
        }
      } catch (e) {
        // Safe ignore
      }
    });

    // 2. Real-time Firestore listener when client rules permit
    const unsubs = [];
    liveEvents.forEach((ev) => {
      try {
        const regRef = doc(db, 'events', ev.id, 'registrations', currentUser.uid);
        const unsub = onSnapshot(regRef, (docSnap) => {
          if (docSnap.exists()) {
            setUserRegistrations((prev) => ({ ...prev, [ev.id]: docSnap.data() }));
          }
        }, () => {});
        unsubs.push(unsub);
      } catch (e) {
        // Safe listener ignore
      }
    });

    return () => {
      unsubs.forEach((u) => u());
    };
  }, [currentUser, liveEvents]);

  const handleRegister = async (eventId) => {
    if (!currentUser) {
      if (onNavigate) onNavigate('login');
      return;
    }

    try {
      setRegisteringId(eventId);
      const res = await api.post(`/events/${eventId}/register`);
      if (res.data.success) {
        showToast('Registration confirmed! Check your email for details.');
        setUserRegistrations((prev) => ({ ...prev, [eventId]: res.data.registration }));
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed. Please try again.';
      showToast(msg);
      if (err.response?.status === 409 && err.response?.data?.registrationId) {
        setUserRegistrations((prev) => ({ ...prev, [eventId]: { id: err.response.data.registrationId } }));
      }
    } finally {
      setRegisteringId(null);
    }
  };

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
  }, [activeTheme, activeMode, liveEvents]);

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

  // Combined hackathon list: combines Firestore external hackathons with static reference hackathons
  const combinedHackathons = useMemo(() => {
    const liveExternal = liveEvents
      .filter((e) => e.type === 'EXTERNAL_HACKATHON')
      .map((e, idx) => ({
        id: e.id,
        index: String(idx + 1).padStart(2, '0'),
        name: e.name || e.title,
        date: e.startDate ? (e.endDate ? `${e.startDate} – ${e.endDate}` : e.startDate) : (e.date || 'TBA'),
        mode: e.mode || 'ONLINE',
        categories: e.categories || ['OTHER'],
        themeDisplay: (e.categories || ['OTHER']).join(' / '),
        location: e.location || 'ONLINE',
        platform: e.platform || e.organizer || 'STC',
        status: e.status || 'UPCOMING',
        description: e.description || '',
        externalUrl: e.registrationUrl || '#',
      }));

    return [...liveExternal, ...EXTERNAL_HACKATHONS];
  }, [liveEvents]);

  // Filtered hackathon list
  const filteredHackathons = useMemo(() => {
    return combinedHackathons.filter((h) => {
      const themeMatch =
        activeTheme === 'ALL' ||
        (h.categories && h.categories.includes(activeTheme)) ||
        (activeTheme === 'OTHER' && h.categories && h.categories.includes('OTHER'));
      const modeMatch = activeMode === 'ALL' || h.mode === activeMode;
      return themeMatch && modeMatch;
    });
  }, [combinedHackathons, activeTheme, activeMode]);

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

          {/* Live STC Events or Inauguration Fallback */}
          {liveEvents.filter(e => !e.type || e.type === 'STC_EVENT' || e.type === 'INTERNAL_HACKATHON').length > 0 ? (
            liveEvents
              .filter(e => !e.type || e.type === 'STC_EVENT' || e.type === 'INTERNAL_HACKATHON')
              .map((ev, idx) => {
                const isRegistered = !!userRegistrations[ev.id];
                const isClosed = ev.registrationStatus === 'CLOSED';
                const isDeadlinePassed = ev.registrationDeadline && new Date(ev.registrationDeadline) < new Date();
                const isCancelled = ev.status === 'CANCELLED';
                const isCompleted = ev.status === 'COMPLETED';
                const isFull = Number(ev.capacity) > 0 && Number(ev.registrationCount || 0) >= Number(ev.capacity);
                const isTBA = (ev.date === 'TBA' || ev.date === 'TO BE ANNOUNCED') && ev.registrationStatus !== 'OPEN';

                return (
                  <article key={ev.id} className="inauguration-scene events-reveal" style={{ marginBottom: '32px' }}>
                    <div className="inauguration-scene__rule" aria-hidden="true">
                      <span className="inauguration-scene__rule-line"></span>
                      <span className="inauguration-scene__rule-dot"></span>
                    </div>

                    <div className="inauguration-scene__grid">
                      <div className="inauguration-scene__left">
                        <div className="inauguration-scene__index label-mono">
                          {String(idx + 1).padStart(2, '0')}
                        </div>
                        <div className="inauguration-scene__badge-wrap">
                          <span className="inauguration-scene__badge label-mono">
                            {ev.type === 'INTERNAL_HACKATHON' ? 'INTERNAL HACKATHON' : 'OFFICIAL STC EVENT'}
                          </span>
                        </div>
                        <p className="inauguration-scene__desc">
                          {ev.description || 'Bringing students together around technology, curiosity, collaboration and the things they want to build.'}
                        </p>
                      </div>

                      <div className="inauguration-scene__center">
                        <h3 className="inauguration-scene__title">
                          {ev.title || ev.name || 'STC EVENT'}
                        </h3>
                        {ev.category && (
                          <span className="inauguration-scene__title-sub label-mono">
                            {ev.category.toUpperCase()}
                          </span>
                        )}
                      </div>

                      <div className="inauguration-scene__right">
                        <dl className="inauguration-meta">
                          <div className="inauguration-meta__item">
                            <dt className="label-mono">DATE</dt>
                            <dd>{ev.date || 'TO BE ANNOUNCED'}</dd>
                          </div>
                          <div className="inauguration-meta__item">
                            <dt className="label-mono">TIME</dt>
                            <dd>{ev.time || 'TO BE ANNOUNCED'}</dd>
                          </div>
                          <div className="inauguration-meta__item">
                            <dt className="label-mono">LOCATION</dt>
                            <dd>{ev.location || ev.venue || 'TO BE ANNOUNCED'}</dd>
                          </div>
                        </dl>

                        <div className="inauguration-scene__cta-wrap">
                          {isRegistered ? (
                            <span
                              className="inauguration-pill label-mono"
                              role="status"
                              style={{ border: '1px solid currentColor', opacity: 0.9 }}
                            >
                              REGISTERED ✓
                            </span>
                          ) : isCancelled ? (
                            <span className="inauguration-pill label-mono" role="status">
                              EVENT CANCELLED
                            </span>
                          ) : isCompleted ? (
                            <span className="inauguration-pill label-mono" role="status">
                              EVENT CONCLUDED
                            </span>
                          ) : (isClosed || isDeadlinePassed) ? (
                            <span className="inauguration-pill label-mono" role="status">
                              REGISTRATION CLOSED
                            </span>
                          ) : isFull ? (
                            <span className="inauguration-pill label-mono" role="status">
                              CAPACITY REACHED
                            </span>
                          ) : isTBA ? (
                            <span className="inauguration-pill label-mono" role="status">
                              DETAILS COMING SOON
                            </span>
                          ) : (
                            <button
                              type="button"
                              className="btn btn-primary label-mono"
                              style={{ padding: '8px 18px', fontSize: '11px', letterSpacing: '0.08em' }}
                              onClick={() => handleRegister(ev.id)}
                              disabled={registeringId === ev.id}
                            >
                              {registeringId === ev.id ? 'REGISTERING...' : 'REGISTER FOR EVENT →'}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })
          ) : (
            /* Event 01 — Inauguration (Oversized Editorial Viewport Composition) */
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
          )}

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

      {/* Floating Action Feedback Toast */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 9999,
            background: 'var(--accent, #171717)',
            color: 'var(--bg-main, #ffffff)',
            padding: '12px 20px',
            borderRadius: '4px',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            letterSpacing: '0.04em',
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            maxWidth: '360px',
            lineHeight: 1.5,
          }}
          role="status"
          aria-live="polite"
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}
