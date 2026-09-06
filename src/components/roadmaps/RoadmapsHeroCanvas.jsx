import React, { useRef, useEffect } from 'react';

/**
 * RoadmapsHeroCanvas
 * Abstract progression visual using thin branches and subtle nodes.
 * Represents: START ──┬── WEB / AI / DSA / CLOUD / etc.
 * Restrained, editorial, cohesive with STC network canvas aesthetics.
 */
export default function RoadmapsHeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let isVisible = true;

    let width = canvas.offsetWidth || canvas.clientWidth || window.innerWidth;
    let height = canvas.offsetHeight || canvas.clientHeight || 500;
    if (width === 0) width = window.innerWidth;
    if (height === 0) height = 500;

    const setupDimensions = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.offsetWidth || canvas.clientWidth || window.innerWidth;
      height = canvas.offsetHeight || canvas.clientHeight || 500;
      if (width <= 0) width = window.innerWidth;
      if (height <= 0) height = 500;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    setupDimensions();

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Branches definition
    const BRANCHES = [
      { id: 'web', label: 'WEB', yFactor: 0.18, targetOffset: -0.28 },
      { id: 'dsa', label: 'JAVA + DSA', yFactor: 0.28, targetOffset: -0.16 },
      { id: 'python', label: 'PYTHON', yFactor: 0.38, targetOffset: -0.06 },
      { id: 'ai', label: 'AI / ML', yFactor: 0.5, targetOffset: 0.04 },
      { id: 'cloud', label: 'CLOUD', yFactor: 0.62, targetOffset: 0.14 },
      { id: 'cyber', label: 'CYBER', yFactor: 0.74, targetOffset: 0.24 },
      { id: 'ux', label: 'UI / UX', yFactor: 0.84, targetOffset: 0.34 },
    ];

    let time = 0;

    const render = () => {
      if (!isVisible) return;

      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const isMobile = width < 768;

      // Color tokens
      const lineColor = isDark ? 'rgba(200, 197, 189, 0.22)' : 'rgba(82, 87, 92, 0.22)';
      const activeLineColor = isDark ? 'rgba(237, 232, 223, 0.55)' : 'rgba(34, 37, 40, 0.55)';
      const nodeColor = isDark ? '#EDE8DF' : '#222528';
      const textColor = isDark ? '#EDE8DF' : '#171717';
      const mutedText = isDark ? '#8E8A82' : '#6F6B64';
      const surfaceBg = isDark ? '#0F1011' : '#F4F1EA';

      // Layout coordinates
      const startX = isMobile ? 32 : 72;
      const startY = height * 0.5;
      const junctionX = isMobile ? width * 0.35 : width * 0.38;
      const endX = isMobile ? width - 85 : width - 140;

      // Pulse progression over time
      const pulseSpeed = isReducedMotion ? 0 : 0.012;
      time += pulseSpeed;

      // 1. Draw primary stem from START to junction
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(junctionX, startY);
      ctx.strokeStyle = activeLineColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // START node
      ctx.beginPath();
      ctx.arc(startX, startY, 4, 0, Math.PI * 2);
      ctx.fillStyle = nodeColor;
      ctx.fill();

      // START label
      ctx.font = `600 ${isMobile ? '10px' : '11px'} 'JetBrains Mono', monospace`;
      ctx.fillStyle = mutedText;
      ctx.textAlign = 'right';
      ctx.fillText('START', startX - 10, startY + 4);

      // Junction node
      ctx.beginPath();
      ctx.arc(junctionX, startY, 3, 0, Math.PI * 2);
      ctx.fillStyle = nodeColor;
      ctx.fill();

      // 2. Draw branches
      BRANCHES.forEach((branch, idx) => {
        const destY = height * (0.5 + branch.targetOffset * (isMobile ? 0.75 : 0.9));
        const controlX1 = junctionX + (endX - junctionX) * 0.35;
        const controlY1 = startY;
        const controlX2 = junctionX + (endX - junctionX) * 0.65;
        const controlY2 = destY;

        // Subtle dynamic activation wave
        const wave = Math.sin(time + idx * 0.7);
        const isHighlighted = wave > 0.65 && !isReducedMotion;

        // Branch curve
        ctx.beginPath();
        ctx.moveTo(junctionX, startY);
        ctx.bezierCurveTo(controlX1, controlY1, controlX2, controlY2, endX, destY);
        ctx.strokeStyle = isHighlighted ? activeLineColor : lineColor;
        ctx.lineWidth = isHighlighted ? 1.5 : 1;
        ctx.stroke();

        // Branch terminal node
        ctx.beginPath();
        ctx.arc(endX, destY, isHighlighted ? 3.5 : 2.5, 0, Math.PI * 2);
        ctx.fillStyle = isHighlighted ? nodeColor : surfaceBg;
        ctx.strokeStyle = nodeColor;
        ctx.lineWidth = 1.5;
        ctx.fill();
        ctx.stroke();

        // Branch label
        ctx.font = `500 ${isMobile ? '10px' : '11px'} 'Space Grotesk', sans-serif`;
        ctx.fillStyle = isHighlighted ? textColor : mutedText;
        ctx.textAlign = 'left';
        ctx.fillText(branch.label, endX + 12, destY + 3.5);
      });

      if (!isReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    // IntersectionObserver to pause when hero is off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !isReducedMotion) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = requestAnimationFrame(render);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    window.addEventListener('resize', setupDimensions);
    render();

    return () => {
      window.removeEventListener('resize', setupDimensions);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="roadmaps-hero__canvas-container" aria-hidden="true">
      <canvas ref={canvasRef} className="roadmaps-hero__canvas" />
    </div>
  );
}
