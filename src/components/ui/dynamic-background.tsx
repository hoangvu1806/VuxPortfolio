"use client";

import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    color: string;
}

const colors = ["#6366f1", "#00ffff", "#ff00e4"];

export function DynamicBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particles: Particle[] = [];
    const maxParticles = 50;

    // Initialize particles
    const initParticles = (canvas: HTMLCanvasElement) => {
        for (let i = 0; i < maxParticles; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                color: colors[Math.floor(Math.random() * colors.length)],
            });
        }
    };

    // Animation loop
    const animate = (
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D
    ) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Background gradient
        const gradient = ctx.createLinearGradient(
            0,
            0,
            canvas.width,
            canvas.height
        );
        gradient.addColorStop(0, "rgba(3, 7, 18, 0.8)");
        gradient.addColorStop(1, "rgba(15, 23, 42, 0.8)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw particles
        particles.forEach((particle, i) => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color + "30"; // Adding transparency
            ctx.fill();

            // Draw connections between particles
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[j].x - particle.x;
                const dy = particles[j].y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 255, 255, ${
                        0.1 - distance / 1000
                    })`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }

            // Update particle position
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Boundary checking
            if (particle.x < 0 || particle.x > canvas.width) {
                particle.speedX = -particle.speedX;
            }
            if (particle.y < 0 || particle.y > canvas.height) {
                particle.speedY = -particle.speedY;
            }
        });

        requestAnimationFrame(() => animate(canvas, ctx));
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas dimensions
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // Reinitialize particles on resize
            particles.length = 0;
            initParticles(canvas);
        };

        // Set initial size
        handleResize();

        // Add event listener for window resize
        window.addEventListener("resize", handleResize);

        // Initialize and start animation
        initParticles(canvas);
        animate(canvas, ctx);

        // Cleanup
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-10"
            style={{ pointerEvents: "none" }}
        />
    );
}
