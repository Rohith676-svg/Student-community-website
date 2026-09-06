import React, { useRef, useEffect } from 'react';
import './NetworkCanvas.css';

const LABELS = ['JAVA', 'WEB', 'AI', 'DSA', 'DESIGN', 'CLOUD', 'OPEN SOURCE'];

export default function NetworkCanvas() {
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

    // Node count: restrained for performance and sparse aesthetic look
    const NODE_COUNT = isMobile ? 22 : 44;
    const CONNECTION_DIST = isMobile ? 90 : 135;
    const MOUSE_DIST = 140;

    let mouse = { x: -1000, y: -1000, active: false };

    // Initialize nodes uniformly across dimensions
    const nodes = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const hasLabel = i < LABELS.length;
      const isAccent = i % 6 === 0;
      const x = Math.random() * (width - 40) + 20;
      const y = Math.random() * (height - 40) + 20;

      nodes.push({
        x,
        y,
        vx: (Math.random() - 0.5) * (isMobile ? 0.18 : 0.28),
        vy: (Math.random() - 0.5) * (isMobile ? 0.18 : 0.28),
        baseRadius: isAccent ? 4.2 : hasLabel ? 3.4 : 2.7,
        radius: isAccent ? 4.2 : hasLabel ? 3.4 : 2.7,
        label: hasLabel ? LABELS[i] : null,
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

      // Re-distribute any nodes that fell out of bounds or were clamped to edge
      nodes.forEach((node) => {
        if (node.x <= 5 || node.x >= width - 5) {
          node.x = Math.random() * (width - 40) + 20;
        }
        if (node.y <= 5 || node.y >= height - 5) {
          node.y = Math.random() * (height - 40) + 20;
        }
      });
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
        mouse.active = true;
      }
    };

    const handleTouchEnd = () => {
      mouse.active = false;
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
    canvas.addEventListener('touchend', handleTouchEnd);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle connection lines between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.2;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);

            // Refined charcoal line tones (dynamically adapting to dark / light mode)
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            if (nodes[i].isAccent || nodes[j].isAccent) {
              ctx.strokeStyle = isDark
                ? `rgba(242, 239, 233, ${alpha * 1.8})`
                : `rgba(26, 28, 31, ${alpha * 1.6})`;
            } else {
              ctx.strokeStyle = isDark
                ? `rgba(155, 161, 167, ${alpha * 1.2})`
                : `rgba(100, 97, 92, ${alpha})`;
            }
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Cursor gentle influence on desktop
      const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark';
      if (mouse.active && !prefersReducedMotion) {
        for (let i = 0; i < nodes.length; i++) {
          const dx = mouse.x - nodes[i].x;
          const dy = mouse.y - nodes[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MOUSE_DIST) {
            const alpha = (1 - dist / MOUSE_DIST) * 0.3;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = isDarkTheme
              ? `rgba(242, 239, 233, ${alpha * 1.2})`
              : `rgba(30, 32, 35, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();

            // Very gentle repulsion vector
            const force = (1 - dist / MOUSE_DIST) * 0.45;
            nodes[i].x -= (dx / dist) * force;
            nodes[i].y -= (dy / dist) * force;
          }
        }
      }

      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (!prefersReducedMotion) {
          node.x += node.vx;
          node.y += node.vy;

          // Boundary bounce with soft damping
          if (node.x < 15) { node.x = 15; node.vx = Math.abs(node.vx); }
          if (node.x > width - 15) { node.x = width - 15; node.vx = -Math.abs(node.vx); }
          if (node.y < 15) { node.y = 15; node.vy = Math.abs(node.vy); }
          if (node.y > height - 15) { node.y = height - 15; node.vy = -Math.abs(node.vy); }
        }

        // Draw node in rich charcoal or luminous off-white
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        if (node.isAccent) {
          ctx.fillStyle = isDarkTheme ? '#F2EFE9' : '#171717';
        } else {
          ctx.fillStyle = isDarkTheme ? 'rgba(210, 215, 220, 0.75)' : 'rgba(35, 38, 41, 0.7)';
        }
        ctx.fill();

        // Subtle graphite halo ring for featured accent nodes
        if (node.isAccent) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 4.5, 0, Math.PI * 2);
          ctx.strokeStyle = isDarkTheme ? 'rgba(242, 239, 233, 0.35)' : 'rgba(25, 27, 30, 0.25)';
          ctx.lineWidth = 1.0;
          ctx.stroke();
        }

        // Technical interest label
        if (node.label) {
          ctx.font = '600 9.5px "JetBrains Mono", monospace';
          ctx.fillStyle = node.isAccent
            ? (isDarkTheme ? '#F2EFE9' : '#171717')
            : (isDarkTheme ? 'rgba(200, 205, 210, 0.75)' : 'rgba(40, 42, 45, 0.65)');
          ctx.fillText(node.label, node.x + node.radius + 5, node.y + 3);
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
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div className="network-canvas-container" aria-hidden="true">
      <canvas ref={canvasRef} className="network-canvas" />
    </div>
  );
}
