// components/sections/home/code-typing.tsx
"use client";
import { useEffect, useState, useRef } from "react";
import { Highlight, themes } from "prism-react-renderer";

const defaultProps = {
  theme: themes.vsDark,
};

const codeSnippet = `
// Welcome to my AI-Powered Portfolio! 🚀
import { NextDeveloper } from 'lucywmwangi';
import { AIExpertise } from '@/skills';

function createAmazingWebsite() {
  const mySkills = {
    webDev: ["Next.js", "React", "TS"],
    aiTools: ["ChatGPT", "ML"],
    passion: "Building AI web apps"
  };

  return {
    message: "Let's work together!",
    services: ["Web Apps", "AI Features",],
    contact: "Scroll down to connect →"
  };
};`;

export default function CodeTyping() {
  const [displayedLines, setDisplayedLines] = useState<string[]>(
    Array(codeSnippet.split("\n").length).fill("")
  );
  const [currentLine, setCurrentLine] = useState(0);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [containerOpacity, setContainerOpacity] = useState(0);
  const [lineAnimations, setLineAnimations] = useState<{[key: number]: {opacity: number; x: number}}>({});
  const [cursorOpacity, setCursorOpacity] = useState(0);
  
  const lines = codeSnippet.split("\n");
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>(0);
  const cursorStartTimeRef = useRef<number>(0);

  // Three.js inspired animation system
  useEffect(() => {
    startTimeRef.current = Date.now();
    
    const animateContainer = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(elapsed / 600, 1); // 0.6 second fade in
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      setContainerOpacity(easeOut);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animateContainer);
      }
    };
    
    animationRef.current = requestAnimationFrame(animateContainer);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Cursor blink animation
  useEffect(() => {
    cursorStartTimeRef.current = Date.now();
    
    const animateCursor = () => {
      const elapsed = Date.now() - cursorStartTimeRef.current;
      const cycleTime = 1000; // 1 second cycle
      const progress = (elapsed % cycleTime) / cycleTime;
      
      // Blink pattern: 0.2s on, 0.8s off
      const opacity = progress < 0.2 ? 1 : 0;
      setCursorOpacity(opacity);
      
      animationRef.current = requestAnimationFrame(animateCursor);
    };
    
    animationRef.current = requestAnimationFrame(animateCursor);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [currentLine, cursorPosition]);

  // Line animations
  useEffect(() => {
    const updatedAnimations: {[key: number]: {opacity: number; x: number}} = {};
    const lineAnimationStartTime = Date.now();
    
    const animateLines = () => {
      const elapsed = Date.now() - lineAnimationStartTime;
      
      displayedLines.forEach((line, index) => {
        if (line.length > 0) {
          const delay = index * 50; // Staggered delay
          const lineElapsed = Math.max(0, elapsed - delay);
          const progress = Math.min(lineElapsed / 300, 1); // 0.3 second animation
          const easeOut = 1 - Math.pow(1 - progress, 3);
          
          updatedAnimations[index] = {
            opacity: easeOut,
            x: -10 * (1 - easeOut)
          };
        }
      });
      
      setLineAnimations(updatedAnimations);
      
      if (Object.keys(updatedAnimations).length > 0) {
        animationRef.current = requestAnimationFrame(animateLines);
      }
    };
    
    if (displayedLines.some(line => line.length > 0)) {
      animationRef.current = requestAnimationFrame(animateLines);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [displayedLines]);

  // Code typing logic
  useEffect(() => {
    if (currentLine >= lines.length) return;

    const currentText = lines[currentLine];
    const timeout = setTimeout(() => {
      if (cursorPosition < currentText.length) {
        setDisplayedLines((prev) =>
          prev.map((line, i) =>
            i === currentLine ? currentText.slice(0, cursorPosition + 1) : line
          )
        );
        setCursorPosition(cursorPosition + 1);
      } else {
        setCurrentLine(currentLine + 1);
        setCursorPosition(0);
      }
    }, Math.random() * 60 + 30);

    return () => clearTimeout(timeout);
  }, [currentLine, cursorPosition, lines]);

  return (
    <div
      style={{
        opacity: containerOpacity,
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      className="rounded-lg bg-muted p-4 w-full max-w-[450px] font-mono max-[400px]:text-[0.6rem] text-xs sm:text-sm overflow-hidden shadow-lg justify-self-center"
    >
      {/* Fake MacOS Window Buttons */}
      <div className="flex items-center gap-1.5 mb-3">
        <div className="h-3 w-3 rounded-full bg-red-500" />
        <div className="h-3 w-3 rounded-full bg-yellow-500" />
        <div className="h-3 w-3 rounded-full bg-green-500" />
      </div>

      {/* Code Highlighting Section */}
      <div className="space-y-1 text-gray-300 text-left">
        <Highlight
          {...defaultProps}
          code={displayedLines.join("\n")}
          language="tsx"
          theme={{
            ...themes.vsDark,
            plain: {
              ...themes.vsDark.plain,
              backgroundColor: '#000000',
              color: '#FFFFFF',
            },
            styles: [
              { types: ['keyword'], style: { color: 'hsl(var(--primary))' } },
              { types: ['string'], style: { color: 'hsl(var(--highlight))' } },
              { types: ['function'], style: { color: 'hsl(var(--secondary))' } },
              { types: ['punctuation'], style: { color: 'hsl(var(--foreground))' } },
            ]
          }}
        >
          {({ tokens, getLineProps, getTokenProps }) => (
            <>
              {tokens.map((line, i) => (
                <div
                  key={i}
                  style={{
                    opacity: lineAnimations[i]?.opacity || 0,
                    transform: `translateX(${lineAnimations[i]?.x || -10}px)`,
                    transition: 'opacity 0.3s ease, transform 0.3s ease'
                  }}
                  {...getLineProps({ line })}
                  className="flex"
                >
                  <span className="mr-4 select-none opacity-50 w-6 text-right">
                    {i + 1}
                  </span>
                  <span
                    className="relative flex-1"
                    style={{
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                      paddingLeft: `${
                        line[0]?.content?.match(/^\s*/)?.[0]?.length ||
                        0 * 0.6
                      }em`,
                      textIndent: `-${
                        line[0]?.content?.match(/^\s*/)?.[0]?.length ||
                        0 * 0.6
                      }em`,
                    }}
                  >
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                    {i === currentLine && (
                      <span
                        style={{
                          opacity: cursorOpacity,
                          left: `${cursorPosition * 0.6}em`,
                          transition: 'opacity 0.1s ease'
                        }}
                        className="absolute inline-block h-[1.2em] w-[2px] bg-white"
                      />
                    )}
                  </span>
                </div>
              ))}
            </>
          )}
        </Highlight>
      </div>
    </div>
  );
}