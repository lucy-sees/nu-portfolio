// components/sections/home/index.tsx
"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRef, useEffect } from "react";
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

  // GSAP Animations
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

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-full flex flex-col xl:flex-row gap-12 p-6 items-center justify-center overflow-hidden container text-center md:text-left"
    >
      {/* Animated grid background */}
      <motion.div
        ref={gridRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-auto w-10/12 max-w-[1250px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 2 }}
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
      </motion.div>

      {/* Floating particles background */}
      <div className="absolute inset-0 -z-10 pattern-grid-lg h-full w-full opacity-10 [mask-image:linear-gradient(transparent,black)]" 
       style={{backgroundImage: 'linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px)', 
               backgroundSize: '40px 40px'}}>
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div className="space-y-7 text-center xl:text-left xl:text-xl relative">
        <div className="-space-y-1">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-cyan-400 neon-text-cyan"
          >
            Hello 👋, I&apos;m
          </motion.p>
          <h1 className="relative text-6xl xl:text-8xl !leading-[1.4]" ref={nameRef}>
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-20 w-full h-10 blur-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 2 }}
              style={{
                background: "radial-gradient(circle, #FF1A75 0%, #9D00FF 100%)"
              }}
            />
            <TextAnimation>{data.home.name}</TextAnimation>
          </h1>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
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
          </motion.h2>
        </div>
        <div className="space-x-4">
          <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={() => router.push("#projects")}
            variant="gradientOutline"
            className="relative overflow-hidden hc-border"
          >
            <span className="relative z-10 rounded-md">
              See My Work
            </span>
            <div className="absolute inset-0 rounded-md animate-rotate-gradient bg-gradient-to-r from-primary via-secondary to-accent" />
          </Button>
        </motion.div>
        {data.home.cvLink && (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            asChild
            variant="gradientOutline"
            className="relative overflow-hidden hc-border"
          >
            <Link href={data.home.cvLink}>
              <span className="relative z-10 rounded-md">
                Contact Me
              </span>
              <div className="absolute inset-0 rounded-md animate-rotate-gradient bg-gradient-to-r from-secondary via-accent to-primary" />
            </Link>
          </Button>
        </motion.div>
      )}
    </div>
      </div>

      {/* Enhanced CodeTyping with neon glow */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative w-full max-w-2xl neon-code-container"
      >
        <CodeTyping />
        <div className="absolute inset-0 -z-10 bg-cyan-400/20 blur-3xl rounded-lg" />
      </motion.div>

      {/* Animated scroll indicator */}
      <motion.div
        className="hidden lg:block absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={() => router.push("#about")}
      >
        <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex items-start justify-center p-1 neon-border-cyan">
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1.5 h-3 bg-cyan-400 rounded-full neon-glow-cyan"
          />
        </div>
      </motion.div>
    </section>
  );
}

const TextAnimation = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="overflow-hidden relative">
      <motion.div
        className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-pink-500 to-purple-600 origin-left"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: [1, 0] }}
        transition={{ duration: 0.5, ease: "circOut" }}
      />
      <motion.div
        initial={{ y: "-100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "backOut" }}
        className="neon-text-pink"
      >
        {children}
      </motion.div>
    </div>
  );
};