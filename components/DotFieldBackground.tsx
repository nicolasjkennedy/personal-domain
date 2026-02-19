"use client";

import { useEffect, useRef } from "react";

interface DotFieldBackgroundProps {
  density?: number; // 0-1, default: 0.5 (controls particle count)
  speed?: number; // 0-2, default: 0.5 (drift speed)
  dotSize?: number; // 1-3, default: 1.5 (particle size in px)
  opacity?: number; // 0-1, default: 0.6 (base opacity)
  mouseStrength?: number; // 0-2, default: 0.8 (mouse repulsion strength)
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  opacity: number;
  size: number;
  wavePhase: number; // For wave motion
  waveAmplitude: number; // Wave strength
  waveSpeed: number; // Wave speed
  respondsToMouse: boolean; // Only some particles respond to mouse
}

export default function DotFieldBackground({
  density = 0.5,
  speed = 0.5,
  dotSize = 1.5,
  opacity = 0.6,
  mouseStrength = 0.8,
}: DotFieldBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const prefersReducedMotionRef = useRef(false);
  const isVisibleRef = useRef(true);
  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotionRef.current = mediaQuery.matches;

    const handleChange = (e: MediaQueryListEvent) => {
      prefersReducedMotionRef.current = e.matches;
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let prevWidth = width;
    let prevHeight = height;
    const dpr = window.devicePixelRatio || 1;

    // Calculate particle count based on density and screen size (reduced for performance)
    const baseCount = Math.floor((width * height) / 50000); // Base: ~1 particle per 50k pixels (was 15k)
    const particleCount = Math.floor(baseCount * density);
    const clampedCount = Math.min(Math.max(particleCount, 300), 2000); // Reduced from 3000-15000 to 300-2000

    // Initialize particles with simple random distribution (simplified for performance)
    const particles: Particle[] = [];
    
    for (let i = 0; i < clampedCount; i++) {
      // Simple random distribution - much faster than complex clustering
      const x = Math.random() * width;
      const y = Math.random() * height;
      
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * speed * 0.3,
        vy: (Math.random() - 0.5) * speed * 0.3,
        baseX: x,
        baseY: y,
        opacity: opacity * (0.4 + Math.random() * 0.6), // Variation
        size: dotSize * (0.7 + Math.random() * 0.6), // Variation
        wavePhase: Math.random() * Math.PI * 2, // Random wave phase
        waveAmplitude: 15 + Math.random() * 25, // Reduced wave amplitude
        waveSpeed: 0.0002 + Math.random() * 0.0003, // Reduced wave speed
        respondsToMouse: Math.random() < 0.2, // Only 20% respond to mouse (reduced from 30%)
      });
    }

    particlesRef.current = particles;

    const resize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      
      // Calculate scale factors
      const scaleX = prevWidth > 0 ? newWidth / prevWidth : 1;
      const scaleY = prevHeight > 0 ? newHeight / prevHeight : 1;

      // Scale all particle positions proportionally
      particlesRef.current.forEach((p) => {
        // Scale base positions
        p.baseX *= scaleX;
        p.baseY *= scaleY;
        
        // Scale current positions
        p.x *= scaleX;
        p.y *= scaleY;
        
        // Ensure particles stay within bounds
        if (p.baseX < 0) p.baseX = 0;
        if (p.baseX > newWidth) p.baseX = newWidth;
        if (p.baseY < 0) p.baseY = 0;
        if (p.baseY > newHeight) p.baseY = newHeight;
        
        if (p.x < 0) p.x = 0;
        if (p.x > newWidth) p.x = newWidth;
        if (p.y < 0) p.y = 0;
        if (p.y > newHeight) p.y = newHeight;
      });

      // Update dimensions
      width = newWidth;
      height = newHeight;
      prevWidth = width;
      prevHeight = height;

      // Update canvas
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Mouse/touch tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    // Visibility change handler to pause when tab is hidden
    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden;
    };
    
    document.addEventListener("visibilitychange", handleVisibilityChange);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Simplified wave function (reduced calculations for performance)
    const getWaveMotion = (particle: Particle, time: number): { x: number; y: number } => {
      // Single wave calculation instead of multiple
      const wave = Math.sin(particle.baseX * 0.003 + particle.baseY * 0.003 + time * particle.waveSpeed + particle.wavePhase);
      return {
        x: wave * particle.waveAmplitude * 0.08,
        y: wave * particle.waveAmplitude * 0.08,
      };
    };

    let time = 0;
    let frameCount = 0;
    const FRAME_SKIP = 2; // Update every 2nd frame (30fps instead of 60fps)
    
    const animate = () => {
      if (prefersReducedMotionRef.current || !isVisibleRef.current) {
        // Still render but don't animate if reduced motion or tab hidden
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      frameCount++;
      
      // Only update every Nth frame to reduce CPU usage
      if (frameCount % FRAME_SKIP === 0) {
        const isDark = document.documentElement.classList.contains("dark");
        ctx.fillStyle = isDark ? "#0a0a0a" : "#fafafa";
        ctx.fillRect(0, 0, width, height);

        const mouse = mouseRef.current;
        const mouseRadius = 150;
        const mouseRadiusSq = mouseRadius * mouseRadius; // Pre-calculate for distance check
        
        particlesRef.current.forEach((particle) => {
          // Simplified drift
          particle.baseX += particle.vx * speed * 0.05;
          particle.baseY += particle.vy * speed * 0.05;

          // Simplified wave motion
          const waveMotion = getWaveMotion(particle, time);
          particle.x = particle.baseX + waveMotion.x;
          particle.y = particle.baseY + waveMotion.y;

          // Mouse repulsion (simplified distance check)
          if (particle.respondsToMouse) {
            const dx = particle.x - mouse.x;
            const dy = particle.y - mouse.y;
            const distSq = dx * dx + dy * dy; // Use squared distance to avoid sqrt

            if (distSq < mouseRadiusSq && distSq > 0) {
              const dist = Math.sqrt(distSq);
              const force = (1 - dist / mouseRadius) * mouseStrength * 0.8;
              particle.x += (dx / dist) * force;
              particle.y += (dy / dist) * force;
            }
          }

          // Wrap around edges
          if (particle.baseX < -200) particle.baseX = width + 200;
          if (particle.baseX > width + 200) particle.baseX = -200;
          if (particle.baseY < -200) particle.baseY = height + 200;
          if (particle.baseY > height + 200) particle.baseY = -200;

          // Draw particle
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = isDark
            ? `rgba(245, 245, 245, ${particle.opacity})`
            : `rgba(20, 20, 20, ${particle.opacity * 0.4})`;
          ctx.fill();
        });

        time += 16 * FRAME_SKIP;
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [density, speed, dotSize, opacity, mouseStrength]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        background: "var(--background)",
        zIndex: 0,
        position: "fixed",
      }}
      aria-hidden="true"
    />
  );
}
