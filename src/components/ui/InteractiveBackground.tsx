"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  originalX: number;
  originalY: number;
}

// Throttle function to limit how often a function is called
const throttle = (callback: Function, delay: number) => {
  let lastCall = 0;
  return function(...args: any[]) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      callback(...args);
    }
  };
};

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create a 2D canvasContext
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = Math.min(Math.floor(window.innerWidth / 10), 200);
      
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particlesRef.current.push({
          x,
          y,
          originalX: x,
          originalY: y,
          size: Math.random() * 3 + 1.5, 
          speedX: (Math.random() - 0.5) * 0.6,
          speedY: (Math.random() - 0.5) * 0.6,
          color: `rgba(${100 + Math.random() * 155}, ${100 + Math.random() * 155}, 255, ${Math.random() * 0.5 + 0.3})`,
        });
      }
    };

    const updateParticlePosition = (particle: Particle) => {
      // Update position based on speed
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Wrap particles when they move out of bounds
      if (particle.x > canvas.width) particle.x = 0;
      else if (particle.x < 0) particle.x = canvas.width;
      if (particle.y > canvas.height) particle.y = 0;
      else if (particle.y < 0) particle.y = canvas.height;
    };

    const applyMouseInteraction = (particle: Particle) => {
      // Calculate distance from mouse pointer
      const dx = mouseRef.current.x - particle.x;
      const dy = mouseRef.current.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // If mouse is near, push particle away
      if (distance < 150) { 
        const angle = Math.atan2(dy, dx);
        const force = 0.15; 
        const pushX = Math.cos(angle) * force;
        const pushY = Math.sin(angle) * force;
        
        particle.speedX -= pushX;
        particle.speedY -= pushY;
      }

      // Slight random variation in speed
      if (Math.random() < 0.01) {
        particle.speedX += (Math.random() - 0.5) * 0.1;
        particle.speedY += (Math.random() - 0.5) * 0.1;
      }

      // Limit the maximum speed
      const maxSpeed = 0.8;
      const currentSpeed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY);
      if (currentSpeed > maxSpeed) {
        particle.speedX = (particle.speedX / currentSpeed) * maxSpeed;
        particle.speedY = (particle.speedY / currentSpeed) * maxSpeed;
      }
    };

    const drawParticle = (particle: Particle) => {
      // Draw the particle as a circle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
    };

    const drawConnections = () => {
      const particles = particlesRef.current;
      // Draw connections between particles if they're close enough
      // for loops so only checking each pair of particles once
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const particle = particles[i];
          const otherParticle = particles[j];
          
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(150, 150, 255, ${0.2 - distance / 1200})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw each particle
      particlesRef.current.forEach((particle) => {
        updateParticlePosition(particle);
        applyMouseInteraction(particle);
        drawParticle(particle);
      });
      
      // Draw connections after all particles have been updated
      drawConnections();

      // Schedule the next frame
      animationFrameRef.current = requestAnimationFrame(drawParticles);
    };

    // Throttle mouse move event to improve performance
    const handleMouseMove = throttle((e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    }, 16); // ~60fps (1000ms / 60 ≈ 16ms)

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove as EventListener);
    
    resizeCanvas();
    drawParticles();
    
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove as EventListener);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 bg-gradient-to-b from-blue-950 via-indigo-950 to-black"
      style={{ position: 'fixed', zIndex: -1, pointerEvents: 'none' }}
    />
  );
}
