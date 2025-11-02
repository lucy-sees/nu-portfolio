// components/sections/home/index.tsx
"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import * as THREE from 'three';
import data from "@/data";
import Link from "next/link";
import CodeTyping from "./code-typing";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HomeSection() {
  const router = useRouter();
  const ref = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLImageElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  
  // Three.js animation states
  const [containerOpacity, setContainerOpacity] = useState(0);
  const [gridOpacity, setGridOpacity] = useState(0);
  const [greetingAnimation, setGreetingAnimation] = useState({ opacity: 0, y: 20 });
  const [nameGlowAnimation, setNameGlowAnimation] = useState({ opacity: 0 });
  const [descriptionAnimation, setDescriptionAnimation] = useState({ opacity: 0 });
  const [codeAnimation, setCodeAnimation] = useState({ opacity: 0, y: 50 });
  const [scrollIndicatorAnimation, setScrollIndicatorAnimation] = useState({ opacity: 0 });
  const [buttonAnimations, setButtonAnimations] = useState<{[key: string]: {scale: number}}>({});
  const [particles, setParticles] = useState<Array<{id: number; opacity: number; scale: number; left: string; top: string}>>([]);

  // GSAP Animations (preserved since it's already using GSAP)
  useEffect(() => {
    // Grid animation
    gsap.fromTo(gridRef.current,
      { rotation: 0, scale: 0.95 },
      {
        rotation: 360,
        duration: 120,
        repeat: -1,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );

    // Name neon pulse
    gsap.to(nameRef.current, {
      duration: 2,
      ease: "power1.inOut",
      textShadow: `
        0 0 10px rgba(255,26,117,0.8),
        0 0 20px rgba(255,26,117,0.6),
        0 0 30px rgba(255,26,117,0.4)
      `,
      repeat: -1,
      yoyo: true
    });
  }, []);

  // Three.js inspired animation system
  useEffect(() => {
    let animationFrameId: number;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      
      // Container fade in
      const containerProgress = Math.min(elapsed / 2000, 1);
      setContainerOpacity(containerProgress);
      
      // Grid fade in
      const gridProgress = Math.min(elapsed / 2000, 1);
      setGridOpacity(gridProgress);
      
      // Greeting animation (starts immediately)
      const greetingProgress = Math.min(elapsed / 800, 1);
      const greetingEase = 1 - Math.pow(1 - greetingProgress, 3);
      setGreetingAnimation({
        opacity: greetingEase,
        y: 20 * (1 - greetingEase)
      });
      
      // Name glow animation (after greeting)
      if (elapsed > 300) {
        const nameProgress = Math.min((elapsed - 300) / 1000, 1);
        setNameGlowAnimation({ opacity: 0.5 * nameProgress });
      }
      
      // Description animation (after name)
      if (elapsed > 800) {
        const descProgress = Math.min((elapsed - 800) / 800, 1);
        setDescriptionAnimation({ opacity: descProgress });
      }
      
      // Code animation (with delay)
      if (elapsed > 1300) {
        const codeProgress = Math.min((elapsed - 1300) / 1000, 1);
        const codeEase = 1 - Math.pow(1 - codeProgress, 3);
        setCodeAnimation({
          opacity: codeEase,
          y: 50 * (1 - codeEase)
        });
      }
      
      // Scroll indicator (delayed)
      if (elapsed > 2000) {
        setScrollIndicatorAnimation({ opacity: 1 });
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  // Particle animation system
  useEffect(() => {
    // Initialize particles
    const initialParticles = [...Array(30)].map((_, i) => ({
      id: i,
      opacity: 0,
      scale: 0,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`
    }));
    setParticles(initialParticles);

    let particleFrameId: number;
    const particleStartTime = Date.now();
    
    const animateParticles = () => {
      const elapsed = Date.now() - particleStartTime;
      
      const updatedParticles = particles.map(particle => {
        const particleTime = (elapsed + particle.id * 200) % 6000; // 6 second cycle per particle
        const progress = particleTime / 6000;
        
        // Create pulse effect: 0-0.3: fade in, 0.3-0.6: stay, 0.6-1: fade out
        let opacity = 0;
        let scale = 0;
        
        if (progress < 0.3) {
          // Fade in and scale up
          const phaseProgress = progress / 0.3;
          opacity = 0.6 * phaseProgress;
          scale = 1.5 * phaseProgress;
        } else if (progress < 0.6) {
          // Stay visible
          opacity = 0.6;
          scale = 1.5;
        } else {
          // Fade out and scale down
          const phaseProgress = (progress - 0.6) / 0.4;
          opacity = 0.6 * (1 - phaseProgress);
          scale = 1.5 * (1 - phaseProgress);
        }
        
        return {
          ...particle,
          opacity,
          scale
        };
      });
      
      setParticles(updatedParticles);
      particleFrameId = requestAnimationFrame(animateParticles);
    };
    
    particleFrameId = requestAnimationFrame(animateParticles);
    
    return () => {
      if (particleFrameId) {
        cancelAnimationFrame(particleFrameId);
      }
    };
  }, []);

  // Button hover/tap animations
  const handleButtonHover = (buttonId: string, isHovering: boolean) => {
    setButtonAnimations(prev => ({
      ...prev,
      [buttonId]: {
        scale: isHovering ? 1.05 : 1
      }
    }));
  };

  const handleButtonTap = (buttonId: string, isTapping: boolean) => {
    setButtonAnimations(prev => ({
      ...prev,
      [buttonId]: {
        scale: isTapping ? 0.95 : 1.05
      }
    }));
  };

  return (
    <section
      id="home"
      ref={ref}
      style={{ opacity: containerOpacity }}
      className="relative min-h-full flex flex-col xl:flex-row gap-12 p-6 items-center justify-center overflow-hidden container text-center md:text-left"
    >
      {/* Animated grid background */}
      <div
        ref={gridRef}
        style={{ opacity: gridOpacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-auto w-10/12 max-w-[1250px]"
      >
        <svg viewBox="0 0 100 100" className="text-transparent">
          <path
            d="M0 50h100M50 0v100"
            stroke="url(#neonGradient)"
            strokeWidth="1"
            strokeOpacity="0.5"
          />
          <defs>
            <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF1A75" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#00F3FF" stopOpacity="0.7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Floating particles background */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: particle.left,
              top: particle.top,
              opacity: particle.opacity,
              transform: `scale(${particle.scale})`,
              transition: 'opacity 0.3s ease, transform 0.3s ease'
            }}
          />
        ))}
      </div>

      <div className="space-y-7 text-center xl:text-left xl:text-xl relative">
        <div className="-space-y-1">
          <p
            style={{
              opacity: greetingAnimation.opacity,
              transform: `translateY(${greetingAnimation.y}px)`,
              transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            className="text-cyan-400 neon-text-cyan"
          >
            Hello 👋, I&apos;m
          </p>
          <h1 className="relative text-6xl xl:text-8xl !leading-[1.4]" ref={nameRef}>
            <div
              style={{
                opacity: nameGlowAnimation.opacity,
                transition: 'opacity 1s ease'
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-20 w-full h-10 blur-3xl"
            />
            <TextAnimation>{data.home.name}</TextAnimation>
          </h1>
          <h2
            style={{
              opacity: descriptionAnimation.opacity,
              transition: 'opacity 0.8s ease'
            }}
            className="text-cyan-300 neon-text-cyan font-mono"
          >
            {"// "}
            {data.home.description.split(/#(\w+)/g).map((e, i) =>
              i % 2 === 0 ? (
                e
              ) : (
                <span
                  key={`wrapped_${i}`}
                  className="text-purple-400 neon-text-purple"
                >
                  {`{${e.replaceAll("__", "-").replaceAll("_", " ")}}`}
                </span>
              )
            )}
          </h2>
        </div>

        {/* Buttons Section */}
        <div className="flex flex-row gap-4">
          {/* Filled Button */}
          <div
            onMouseEnter={() => handleButtonHover('work', true)}
            onMouseLeave={() => handleButtonHover('work', false)}
            onMouseDown={() => handleButtonTap('work', true)}
            onMouseUp={() => handleButtonTap('work', false)}
            style={{
              transform: `scale(${buttonAnimations['work']?.scale || 1})`,
              transition: 'transform 0.2s ease'
            }}
          >
            <Button
              onClick={() => router.push("#projects")}
              className="relative overflow-hidden bg-gradient-to-r from-primary to-secondary text-white filled-button"
            >
              <span className="relative z-10">See My Work</span>
              <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </div>

          {/* Outlined Button with Animated Border */}
          {data.home.cvLink && (
            <div
              onMouseEnter={() => handleButtonHover('contact', true)}
              onMouseLeave={() => handleButtonHover('contact', false)}
              onMouseDown={() => handleButtonTap('contact', true)}
              onMouseUp={() => handleButtonTap('contact', false)}
              style={{
                transform: `scale(${buttonAnimations['contact']?.scale || 1})`,
                transition: 'transform 0.2s ease'
              }}
            >
              <div className="relative p-[2px] rounded-lg animate-rotate-gradient bg-gradient-to-r from-gradient-pink via-gradient-cyan to-gradient-purple bg-[length:400%_400%]">
                <Button
                  asChild
                  variant="ghost"
                  className="relative bg-background hover:bg-background text-foreground outlined-button"
                >
                  <Link href={data.home.cvLink}>
                    <span className="relative z-10">Contact Me</span>
                    <div className="absolute inset-0 bg-background/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced CodeTyping with neon glow */}
      <div
        style={{
          opacity: codeAnimation.opacity,
          transform: `translateY(${codeAnimation.y}px)`,
          transition: 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        className="relative w-full max-w-2xl neon-code-container"
      >
        <CodeTyping />
        <div className="absolute inset-0 -z-10 bg-cyan-400/20 blur-3xl rounded-lg" />
      </div>

      {/* Animated scroll indicator */}
      <div
        style={{
          opacity: scrollIndicatorAnimation.opacity,
          transition: 'opacity 0.5s ease'
        }}
        className="hidden lg:block absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={() => router.push("#about")}
      >
        <ScrollIndicator />
      </div>
    </section>
  );
}

const TextAnimation = ({ children }: { children: React.ReactNode }) => {
  const [animationState, setAnimationState] = useState({
    scaleX: 1,
    textY: '-100%',
    textOpacity: 0
  });

  useEffect(() => {
    let animationFrameId: number;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      
      // Scale animation (0-500ms)
      const scaleProgress = Math.min(elapsed / 500, 1);
      const scaleEase = 1 - Math.pow(1 - scaleProgress, 4); // Strong ease out
      const scaleX = 1 - scaleEase;
      
      // Text animation (starts at 300ms)
      let textY = '-100%';
      let textOpacity = 0;
      
      if (elapsed > 300) {
        const textProgress = Math.min((elapsed - 300) / 500, 1);
        const textEase = 1 - Math.pow(1 - textProgress, 3); // Back out ease
        textY = `${-100 * (1 - textEase)}%`;
        textOpacity = textEase;
      }
      
      setAnimationState({
        scaleX,
        textY,
        textOpacity
      });
      
      if (elapsed < 800) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div className="overflow-hidden relative">
      <div
        style={{
          transform: `scaleX(${animationState.scaleX})`,
          transformOrigin: 'left',
          transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
        className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-pink-500 to-purple-600"
      />
      <div
        style={{
          transform: `translateY(${animationState.textY})`,
          opacity: animationState.textOpacity,
          transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s ease'
        }}
        className="neon-text-pink"
      >
        {children}
      </div>
    </div>
  );
};

const ScrollIndicator = () => {
  const [wheelAnimation, setWheelAnimation] = useState({ y: 2, opacity: 0 });

  useEffect(() => {
    let animationFrameId: number;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = (elapsed % 1600) / 1600; // 1.6 second cycle
      
      let y = 2;
      let opacity = 0;
      
      if (progress < 0.125) {
        // Fade in and move down (0-0.2s)
        const phaseProgress = progress / 0.125;
        y = 2 + (18 * phaseProgress);
        opacity = phaseProgress;
      } else if (progress < 0.375) {
        // Stay at bottom (0.2-0.6s)
        y = 20;
        opacity = 1;
      } else if (progress < 0.5) {
        // Fade out and reset (0.6-0.8s)
        const phaseProgress = (progress - 0.375) / 0.125;
        y = 20;
        opacity = 1 - phaseProgress;
      }
      // Remain invisible until next cycle
      
      setWheelAnimation({ y, opacity });
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div className="mouse w-24 mx-auto">
      <div className="mouse-icon w-6 h-11 border-2 border-cyan-400 rounded-full relative text-center">
        <span
          style={{
            transform: `translateY(${wheelAnimation.y}px)`,
            opacity: wheelAnimation.opacity,
            transition: 'transform 0.3s ease, opacity 0.3s ease'
          }}
          className="mouse-wheel block w-1 h-1.5 bg-cyan-400 rounded-full mx-auto"
        />
      </div>
    </div>
  );
};