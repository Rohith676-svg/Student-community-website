import React, { useRef, useEffect } from 'react';

/**
 * Ambient Quiet Network Canvas for the Events Hero.
 * Quieter, fewer nodes, slower motion, generous whitespace.
 */
export function EventsHeroCanvas() {
  const canvasRef = useRef(null);

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

    // Quieter node count: 18 on desktop, 10 on mobile
    const NODE_COUNT = isMobile ? 10 : 20;
    const CONNECTION_DIST = isMobile ? 85 : 130;

    const nodes = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const isAccent = i % 5 === 0;
      nodes.push({
        x: Math.random() * (width - 60) + 30,
        y: Math.random() * (height - 60) + 30,
        vx: (Math.random() - 0.5) * (isMobile ? 0.08 : 0.14), // slow, meditative drift
        vy: (Math.random() - 0.5) * (isMobile ? 0.08 : 0.14),
        baseRadius: isAccent ? 3.8 : 2.5,
        isAccent,
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
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * (isDark ? 0.22 : 0.18);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = isDark
              ? `rgba(148, 154, 159, ${alpha})`
              : `rgba(82, 87, 92, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Draw quiet nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        if (!prefersReducedMotion) {
          n.x += n.vx;
          n.y += n.vy;

          if (n.x < 15) { n.x = 15; n.vx = Math.abs(n.vx); }
          if (n.x > width - 15) { n.x = width - 15; n.vx = -Math.abs(n.vx); }
          if (n.y < 15) { n.y = 15; n.vy = Math.abs(n.vy); }
          if (n.y > height - 15) { n.y = height - 15; n.vy = -Math.abs(n.vy); }
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.baseRadius, 0, Math.PI * 2);
        if (n.isAccent) {
          ctx.fillStyle = isDark ? '#FFFFFF' : '#0F1011';
        } else {
          ctx.fillStyle = isDark ? '#949A9F' : '#3A3E42';
        }
        ctx.fill();

        if (n.isAccent) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.baseRadius + 4, 0, Math.PI * 2);
          ctx.strokeStyle = isDark ? 'rgba(237, 232, 223, 0.3)' : 'rgba(34, 37, 40, 0.25)';
          ctx.lineWidth = 0.9;
          ctx.stroke();
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
    <div className="events-hero-canvas-container" aria-hidden="true">
      <canvas ref={canvasRef} className="events-hero-canvas" />
    </div>
  );
}

/**
 * Progression Network Canvas for LEARN -> BUILD -> COMPETE -> CONNECT.
 * Smooth 60fps damped simulation tracking scrollProgressRef.
 * Gradually draws connections and consolidates nodes into a cohesive unified network.
 */
export function ProgressionCanvas({ scrollProgressRef }) {
  const canvasRef = useRef(null);

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
    const NODE_COUNT = isMobile ? 22 : 38;
    const LABELS = ['CODE', 'BUILD', 'HACK', 'SOLVE', 'DEPLOY', 'GROW', 'SYNC'];

    // Seed deterministic node coordinates
    const nodes = [];
    const centerX = width * 0.5;
    const centerY = height * 0.5;

    for (let i = 0; i < NODE_COUNT; i++) {
      const angle = (i / NODE_COUNT) * Math.PI * 2;
      const initialDist = (isMobile ? 120 : 250) * (0.45 + 0.55 * Math.sin(i * 3.7));
      const origX = Math.max(30, Math.min(width - 30, centerX + Math.cos(angle) * initialDist));
      const origY = Math.max(30, Math.min(height - 30, centerY + Math.sin(angle) * (initialDist * 0.7)));

      // Clustered target (Stage 2: BUILD / Stage 3: COMPETE)
      const clusterIdx = i % 3;
      const clusterAngle = (clusterIdx / 3) * Math.PI * 2;
      const cDist = isMobile ? 65 : 120;
      const clusterX = centerX + Math.cos(clusterAngle) * cDist + (Math.sin(i * 1.5) * 40);
      const clusterY = centerY + Math.sin(clusterAngle) * (cDist * 0.7) + (Math.cos(i * 1.5) * 35);

      // Connected unified network target (Stage 4: CONNECT)
      const unifiedDist = (isMobile ? 90 : 180) * (0.6 + 0.4 * Math.cos(i * 2.1));
      const unifiedX = centerX + Math.cos(angle * 2) * unifiedDist;
      const unifiedY = centerY + Math.sin(angle * 2) * (unifiedDist * 0.65);

      const hasLabel = i < LABELS.length;

      nodes.push({
        origX,
        origY,
        clusterX,
        clusterY,
        unifiedX,
        unifiedY,
        x: origX,
        y: origY,
        vx: (Math.random() - 0.5) * (isMobile ? 0.16 : 0.24),
        vy: (Math.random() - 0.5) * (isMobile ? 0.16 : 0.24),
        isAccent: i % 4 === 0,
        label: hasLabel ? LABELS[i] : null,
        baseRadius: (i % 4 === 0) ? 4.2 : hasLabel ? 3.4 : 2.7,
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
    };

    window.addEventListener('resize', handleResize);

    let currentProgress = 0;

    // Continuous 60fps render loop with smooth progress damping
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

      // Read latest scroll progress from ref and damp smoothly
      const targetProgress = scrollProgressRef ? scrollProgressRef.current : 0;
      currentProgress += (targetProgress - currentProgress) * 0.08;

      // Update node positions based on scroll interpolation + subtle organic drift
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        let targetX, targetY;
        if (currentProgress < 0.33) {
          // LEARN -> scattered
          const t = currentProgress / 0.33;
          targetX = n.origX + (n.clusterX - n.origX) * (t * 0.35);
          targetY = n.origY + (n.clusterY - n.origY) * (t * 0.35);
        } else if (currentProgress < 0.66) {
          // BUILD -> COMPETE
          const t = (currentProgress - 0.33) / 0.33;
          targetX = n.origX * (1 - t) + n.clusterX * t;
          targetY = n.origY * (1 - t) + n.clusterY * t;
        } else {
          // COMPETE -> CONNECT
          const t = (currentProgress - 0.66) / 0.34;
          targetX = n.clusterX * (1 - t) + n.unifiedX * t;
          targetY = n.clusterY * (1 - t) + n.unifiedY * t;
        }

        if (!prefersReducedMotion) {
          n.x += (targetX - n.x) * 0.1 + n.vx;
          n.y += (targetY - n.y) * 0.1 + n.vy;

          if (n.x < 15) { n.x = 15; n.vx = Math.abs(n.vx); }
          if (n.x > width - 15) { n.x = width - 15; n.vx = -Math.abs(n.vx); }
          if (n.y < 15) { n.y = 15; n.vy = Math.abs(n.vy); }
          if (n.y > height - 15) { n.y = height - 15; n.vy = -Math.abs(n.vy); }
        } else {
          n.x = targetX;
          n.y = targetY;
        }
      }

      // Max connection distance expands as progress increases
      const maxDist = (isMobile ? 75 : 125) + currentProgress * (isMobile ? 70 : 130);

      // Draw connection network
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * (0.12 + currentProgress * 0.42);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);

            if (nodes[i].isAccent || nodes[j].isAccent) {
              ctx.strokeStyle = isDark
                ? `rgba(237, 232, 223, ${alpha * 1.5})`
                : `rgba(34, 37, 40, ${alpha * 1.5})`;
            } else {
              ctx.strokeStyle = isDark
                ? `rgba(148, 154, 159, ${alpha})`
                : `rgba(82, 87, 92, ${alpha})`;
            }
            ctx.lineWidth = currentProgress > 0.5 ? 1.2 : 0.8;
            ctx.stroke();
          }
        }
      }

      // Dynamic dot scaling: dots grow noticeably as the network connects into community!
      const connectScale = 1 + currentProgress * 0.35;

      // Draw nodes & domain labels
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

        if (n.isAccent) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, activeRadius + 5, 0, Math.PI * 2);
          ctx.strokeStyle = isDark
            ? 'rgba(237, 232, 223, 0.35)'
            : 'rgba(34, 37, 40, 0.3)';
          ctx.lineWidth = 1.0;
          ctx.stroke();
        }

        // Technical domain label
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
  }, [scrollProgressRef]);

  return (
    <div className="events-progression-canvas-container" aria-hidden="true">
      <canvas ref={canvasRef} className="events-progression-canvas" />
    </div>
  );
}
