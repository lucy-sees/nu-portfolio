// hooks/use-cur-section.ts
import { useRouter } from "next/navigation";
import { RefObject, useEffect, useState, useRef } from "react";

export default function useCurSection(
  curSectionRef: RefObject<Element>, 
  amount: number | "all" | "some" = "all"
) {
  const [isInView, setIsInView] = useState(false);
  const router = useRouter();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const animationFrameRef = useRef<number>();
  const lastStateRef = useRef<boolean>(false);

  useEffect(() => {
    if (!curSectionRef.current) return;

    // Convert amount to threshold
    const threshold = amount === "all" ? 1.0 : amount === "some" ? 0.5 : amount;

    // Three.js inspired animation loop for smooth state management
    const updateState = (inView: boolean) => {
      if (lastStateRef.current !== inView) {
        lastStateRef.current = inView;
        setIsInView(inView);

        // Update URL with animation frame for smooth performance
        if (inView) {
          animationFrameRef.current = requestAnimationFrame(() => {
            const sectionId = curSectionRef.current?.id;
            if (sectionId) {
              router.push(`#${sectionId}`, { scroll: false });
            }
          });
        }
      }
    };

    const handleIntersection: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        // Use cubic ease for smooth state transitions
        const visibilityRatio = entry.intersectionRatio;
        const isVisible = visibilityRatio >= threshold;
        
        updateState(isVisible);
      });
    };

    // Create observer with performance-friendly options
    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold: threshold,
      rootMargin: '0px',
    });

    observerRef.current.observe(curSectionRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [curSectionRef, amount, router]);

  return isInView;
}