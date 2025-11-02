"use client";
import useCurSection from "@/hooks/use-cur-section";
import Image from "next/image";
import { Fragment, useRef, useEffect, useState } from "react";
import * as THREE from 'three';
import lucywmwangi from "@/public/imgs/lucy_avatar.png";

export default function AboutSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const [isImageVisible, setIsImageVisible] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(false);
  
  useCurSection(ref);

  useEffect(() => {
    // Handle image slide-in animation with Three.js timing logic
    const startTime = Date.now();
    const duration = 500; // 0.5 seconds
    
    const animateImage = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animateImage);
      } else {
        setIsImageVisible(true);
      }
    };
    
    animationRef.current = requestAnimationFrame(animateImage);
    
    // Handle text fade-in animation with delay
    const textTimer = setTimeout(() => {
      setIsTextVisible(true);
    }, 700); // 0.7 second delay
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      clearTimeout(textTimer);
    };
  }, []);

  // Calculate image position based on animation state
  const getImageTransform = () => {
    if (isImageVisible) {
      return 'translateX(0)';
    }
    // Start from left (equivalent to x: "-200%" in Framer Motion)
    return 'translateX(-200%)';
  };

  return (
    <div
      ref={ref}
      id="about"
      className="w-full py-12 my-32 bg-muted text-sm md:text-base"
    >
      <h1 className="text-center text-3xl md:text-5xl mb-12">
        <span className="text-gradient-primary">{"{ "}</span>
        About Me
        <span className="text-gradient-primary">{" }"}</span>
      </h1>

      <div className="flex gap-9 items-center flex-col  w-10/12 mx-auto p-5 rounded-lg container">
        <div className="relative flex-shrink-0">
          {/* Gradient background with fade-in */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-primary opacity-50 size-[120px] rounded-full blur-3xl"
            style={{ 
              opacity: isImageVisible ? 0.5 : 0,
              transition: 'opacity 1s ease-in',
              transitionDelay: '0.5s'
            }}
          />
          
          {/* Image container with slide-in animation */}
          <div
            style={{
              transform: getImageTransform(),
              transition: 'transform 0.5s ease-in-out'
            }}
            className="rounded-full size-[200px] bg-gradient-primary p-0.5"
          >
            <Image
              className="size-full rounded-full grayscale hover:grayscale-0 transition-all object-cover"
              width={600}
              height={600}
              alt="about profile image"
              src={lucywmwangi}
            />
          </div>
        </div>

        <div className="space-y-4 text-center lg:text-left">
          <h2 className="text-xl md:text-3xl font-bold">
            <span className="text-secondary">{"< "}</span>

            <span className="text-gradient-secondary">Who am I</span>
            <span className="text-secondary">{" />"}</span>
          </h2>
          
          {/* Text with fade-in and slide-up animation */}
          <div
            style={{
              opacity: isTextVisible ? 1 : 0,
              transform: isTextVisible ? 'translateY(0)' : 'translateY(-20%)',
              transition: 'opacity 0.5s ease-in, transform 0.5s ease-in'
            }}
            className="text-muted-foreground text-justify"
          >
            Hey, I&apos;m Lucy W. Mwangi, a Next.js & React developer who helps
            businesses fix, optimize, scale, and build high-performance web
            applications. If your app is slow, buggy, struggling to scale, or
            missing key AI-driven features—I can help.
            <br />
            <br />
            <span className="font-semibold">📌 What I Do Best:</span>
            <br />
            ✅ Fixing Bugs & Broken Code – Debugging, API issues, UI glitches
            that frustrate users.
            <br />
            ✅ Optimizing Performance – Speeding up apps, improving SEO, and
            delivering a smooth experience.
            <br />
            ✅ Scaling Web Apps – Making sure your app grows without downtime or
            technical limits.
            <br />
            ✅ Building from Scratch – Creating fast, scalable, and future-proof
            Next.js applications.
            <br />
            ✅ AI-Powered Features – Automating workflows, integrating chatbots,
            and enhancing user engagement.
            <br />
            <br />
            <span className="font-semibold">📌 Why Work With Me?</span>
            <br />
            🔹 I focus on real results, not just code. Your web app should run
            fast, handle traffic, and grow without breaking—I make sure it does.
            <br />
            🔹 I work fast and efficiently. No endless back-and-forth, no
            unnecessary delays—just solutions that work.
            <br />
            🔹 I don&apos;t just fix problems—I prevent them. Whether optimizing an
            existing app or building something new, I ensure it&apos;s scalable,
            maintainable, and built for the long run.
            <br />
            <br />
            <span className="font-semibold">📌 Let&apos;s Talk</span>
            <br />
            If your app needs fixing, optimizing, scaling, or building,
            let&apos;s connect.
            <br />
            <a href="#contact" className="text-primary hover:underline">
              ✅ Get in Touch
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}