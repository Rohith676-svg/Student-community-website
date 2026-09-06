import React, { useRef, useEffect, useState } from 'react';
import './Purpose.css';

const STAGES = [
  {
    id: 'opening',
    index: '00',
    tag: 'OUR PURPOSE',
    title: ['DIFFERENT INTERESTS.', 'ONE COMMUNITY.'],
    desc: 'Everyone starts somewhere different.',
  },
  {
    id: 'learn',
    index: '01',
    tag: 'STAGE 01',
    title: ['LEARN'],
    desc: 'Learn beyond the classroom. Explore new technologies, sharpen your skills, and gain practical knowledge through curated resources, workshops, and hands-on experiences.',
  },
  {
    id: 'build',
    index: '02',
    tag: 'STAGE 02',
    title: ['BUILD'],
    desc: 'Turn what you learn into something real. Build projects with us and your fellow community members',
  },
  {
    id: 'connect',
    index: '03',
    tag: 'STAGE 03',
    title: ['CONNECT'],
    desc: 'Find people who are building toward the same things. Connect with like-minded people turn your idea into reality',
  },
  {
    id: 'grow',
    index: '04',
    tag: 'STAGE 04',
    title: ['GROW'],
    desc: 'Grow together as you build, connect, and share your journey. Celebrate wins, learn from challenges, and support each other’s growth, inside and outside the classroom.',
  },
];

const LABELS = ['JAVA', 'WEB', 'AI', 'DSA', 'DESIGN', 'CLOUD', 'DEV'];

export default function Purpose() {
  const storyTrackRef = useRef(null);
  const canvasRef = useRef(null);
  const scrollProgressRef = useRef(0);
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  // Track overall scroll progress through the purpose story track
  useEffect(() => {
    const handleScroll = () => {
      const track = storyTrackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const totalScrollable = track.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      // Progress from 0.0 to 1.0 within the story track
      const progress = Math.min(Math.max(-rect.top / totalScrollable, 0), 1);
      scrollProgressRef.current = progress;

      // Update active stage indicator based on progress
      if (progress < 0.2) {
        setActiveStageIndex(0);
      } else if (progress < 0.42) {
        setActiveStageIndex(1);
      } else if (progress < 0.65) {
        setActiveStageIndex(2);
      } else if (progress < 0.85) {
        setActiveStageIndex(3);
      } else {
        setActiveStageIndex(4);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Purpose Network Canvas Simulation — mounted once, never resets on scroll
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = canvas.offsetWidth || canvas.clientWidth || window.innerWidth;
    let height = canvas.offsetHeight || canvas.clientHeight || window.innerHeight;
    if (width === 0) width = window.innerWidth;
    if (height === 0) height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const NODE_COUNT = isMobile ? 26 : 48;

    // Cluster centroids across dimensions
    const getClusterCenters = (w, h) => [
      { x: w * 0.28, y: h * 0.36 }, // Web & Design
      { x: w * 0.72, y: h * 0.34 }, // AI & Data
      { x: w * 0.32, y: h * 0.68 }, // Systems & DSA
      { x: w * 0.68, y: h * 0.66 }, // Cloud & Infra
    ];

    let clusterCenters = getClusterCenters(width, height);

    // Initialize nodes with larger, more prominent base radii
    const nodes = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const clusterIdx = i % 4;
      const hasLabel = i < LABELS.length;
      const isAccent = i % 6 === 0;

      // Stage 0: scattered across the full canvas area
      const origX = Math.random() * (width - 60) + 30;
      const origY = Math.random() * (height - 60) + 30;

      // Stage 1-2: cluster coordinates with organic jitter
      const center = clusterCenters[clusterIdx];
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * (isMobile ? 55 : 110);
      const clusterX = center.x + Math.cos(angle) * dist;
      const clusterY = center.y + Math.sin(angle) * dist;

      // Stage 4: expansive harmonized web
      const spreadAngle = (i / NODE_COUNT) * Math.PI * 2;
      const spreadDist = (isMobile ? 110 : 250) * (0.45 + 0.55 * Math.random());
      const expandX = width * 0.5 + Math.cos(spreadAngle) * spreadDist;
      const expandY = height * 0.5 + Math.sin(spreadAngle) * (spreadDist * 0.72);

      nodes.push({
        origX,
        origY,
        clusterX,
        clusterY,
        expandX,
        expandY,
        x: origX,
        y: origY,
        vx: (Math.random() - 0.5) * (isMobile ? 0.12 : 0.2),
        vy: (Math.random() - 0.5) * (isMobile ? 0.12 : 0.2),
        clusterIdx,
        isAccent,
        label: hasLabel ? LABELS[i] : null,
        // Increased base dot radius
        baseRadius: isAccent ? 4.6 : hasLabel ? 3.8 : 3.0,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const newWidth = canvas.offsetWidth || canvas.clientWidth || window.innerWidth;
      const newHeight = canvas.offsetHeight || canvas.clientHeight || window.innerHeight;
      if (newWidth <= 0 || newHeight <= 0) return;

      width = newWidth;
      height = newHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      clusterCenters = getClusterCenters(width, height);

      nodes.forEach((n, idx) => {
        const center = clusterCenters[n.clusterIdx];
        const angle = (idx / NODE_COUNT) * Math.PI * 2;
        const dist = Math.random() * (isMobile ? 55 : 110);
        n.clusterX = center.x + Math.cos(angle) * dist;
        n.clusterY = center.y + Math.sin(angle) * dist;

        const spreadDist = (isMobile ? 110 : 250) * (0.45 + 0.55 * Math.random());
        n.expandX = width * 0.5 + Math.cos(angle) * spreadDist;
        n.expandY = height * 0.5 + Math.sin(angle) * (spreadDist * 0.72);

        if (n.x <= 10 || n.origX <= 10) {
          n.origX = Math.random() * (width - 60) + 30;
          n.x = n.origX;
        }
      });
    };

    window.addEventListener('resize', handleResize);

    let currentProgress = prefersReducedMotion ? 1 : scrollProgressRef.current;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (!prefersReducedMotion) {
        currentProgress += (scrollProgressRef.current - currentProgress) * 0.045;
      } else {
        currentProgress = 1;
      }

      // Calculate node positions
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        let targetX, targetY;
        if (currentProgress < 0.2) {
          targetX = n.origX;
          targetY = n.origY;
        } else if (currentProgress < 0.6) {
          const t = (currentProgress - 0.2) / 0.4;
          targetX = n.origX + (n.clusterX - n.origX) * t;
          targetY = n.origY + (n.clusterY - n.origY) * t;
        } else if (currentProgress < 0.8) {
          const t = (currentProgress - 0.6) / 0.2;
          targetX = n.clusterX + (n.expandX - n.clusterX) * (t * 0.35);
          targetY = n.clusterY + (n.expandY - n.clusterY) * (t * 0.35);
        } else {
          const t = (currentProgress - 0.8) / 0.2;
          const midX = n.clusterX + (n.expandX - n.clusterX) * 0.35;
          const midY = n.clusterY + (n.expandY - n.clusterY) * 0.35;
          targetX = midX + (n.expandX - midX) * t;
          targetY = midY + (n.expandY - midY) * t;
        }

        if (!prefersReducedMotion) {
          n.x += (targetX - n.x) * 0.08 + n.vx;
          n.y += (targetY - n.y) * 0.08 + n.vy;
        } else {
          n.x = targetX;
          n.y = targetY;
        }
      }

      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

      // Connection threshold distance expands with community growth
      const baseDist = isMobile ? 70 : 105;
      const activeDist = baseDist + currentProgress * (isMobile ? 55 : 90);

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const sameCluster = nodes[i].clusterIdx === nodes[j].clusterIdx;

          let allowConnection = false;
          if (currentProgress < 0.32) {
            allowConnection = dist < activeDist * 0.75;
          } else if (currentProgress < 0.65) {
            allowConnection = sameCluster ? dist < activeDist * 1.15 : dist < activeDist * 0.55;
          } else {
            allowConnection = dist < activeDist;
          }

          if (allowConnection) {
            // Controlled opacity: subtle in individuals stage, progressively denser & more visible as community forms
            const progressAlpha = isDark
              ? (0.22 + currentProgress * 0.36)
              : (0.20 + currentProgress * 0.34);
            const alpha = (1 - dist / activeDist) * progressAlpha;

            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);

            // Refined lines: subtle #52575C in light theme, graphite in dark theme
            if (nodes[i].isAccent || nodes[j].isAccent) {
              ctx.strokeStyle = isDark
                ? `rgba(237, 232, 223, ${alpha * 1.45})`
                : `rgba(34, 37, 40, ${alpha * 1.45})`;
            } else {
              ctx.strokeStyle = isDark
                ? `rgba(148, 154, 159, ${alpha})`
                : `rgba(82, 87, 92, ${alpha})`;
            }
            // More substantial lines as connection forms across stages
            ctx.lineWidth = currentProgress > 0.5 ? 1.2 : 0.9;
            ctx.stroke();
          }
        }
      }

      // Dynamic dot scaling: dots grow noticeably as the network connects into community!
      const connectScale = 1 + currentProgress * 0.45;

      // Render nodes & technical labels with clear contrast in both themes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const activeRadius = n.baseRadius * connectScale;

        ctx.beginPath();
        ctx.arc(n.x, n.y, activeRadius, 0, Math.PI * 2);
        if (n.isAccent) {
          ctx.fillStyle = isDark ? '#FFFFFF' : '#0F1011';
        } else if (n.label) {
          ctx.fillStyle = isDark ? '#EDE8DF' : '#222528';
        } else {
          ctx.fillStyle = isDark ? '#949A9F' : '#3A3E42';
        }
        ctx.fill();

        // Graphite halo on accent dots for editorial depth
        if (n.isAccent) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, activeRadius + 5.5, 0, Math.PI * 2);
          ctx.strokeStyle = isDark
            ? 'rgba(237, 232, 223, 0.35)'
            : 'rgba(34, 37, 40, 0.3)';
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }

        // Technical interest label
        if (n.label) {
          ctx.font = '600 10px "JetBrains Mono", monospace';
          ctx.fillStyle = isDark
            ? (n.isAccent ? '#FFFFFF' : '#EDE8DF')
            : (n.isAccent ? '#0F1011' : '#222528');
          ctx.fillText(n.label, n.x + activeRadius + 6, n.y + 3);
        }
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section id="purpose" className="purpose-section">
      {/* Self-contained Story Track: Sticky canvas strictly unpins when milestones finish */}
      <div ref={storyTrackRef} className="purpose__story-track">
        {/* Pinned Background Network Canvas */}
        <div className="purpose__sticky-canvas-wrap" aria-hidden="true">
          <canvas ref={canvasRef} className="purpose__canvas" />
        </div>

        {/* Persistent Story Stage Stepper Indicator */}
        <div className="purpose__stepper-wrap" aria-hidden="true">
          <div className="container">
            <div className="purpose__stepper">
              {STAGES.map((s, idx) => (
                <div
                  key={s.id}
                  className={`purpose__step ${idx === activeStageIndex ? 'is-active' : ''} ${idx < activeStageIndex ? 'is-past' : ''
                    }`}
                >
                  <span className="purpose__step-number">{s.index}</span>
                  <span className="purpose__step-label">{s.id.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sequential Storytelling Milestones */}
        <div className="purpose__milestones">
          {STAGES.map((stage, idx) => (
            <div
              key={stage.id}
              className={`purpose__milestone ${idx === activeStageIndex ? 'is-current' : ''}`}
            >
              <div className="container">
                <div className="purpose__milestone-card reveal">
                  <div className="purpose__tag label-mono">{stage.tag}</div>

                  <h2 className="purpose__headline">
                    {stage.title.map((line, i) => (
                      <span key={i} className="purpose__headline-line">
                        {line}
                      </span>
                    ))}
                  </h2>

                  <p className="purpose__description">{stage.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Purpose Closing Statement — completely outside story track, solid surface grounding */}
      <div className="purpose__closing reveal">
        <div className="container purpose__closing-inner">
          <div className="purpose__closing-label label-mono">01 / Why STC Exists</div>

          <h3 className="purpose__closing-headline">
            <span>TECHNOLOGY IS BETTER</span>
            <span>WHEN YOU DON'T LEARN IT ALONE.</span>
          </h3>

          <p className="purpose__closing-copy">
            STC brings students who are curious about technology into one place — to learn from each other,
            build together, discover opportunities and grow beyond the classroom.
          </p>
        </div>
      </div>
    </section>
  );
}
