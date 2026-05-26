import { forwardRef, useImperativeHandle, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export interface PageTransitionRef {
  trigger: (onMidpoint: () => void) => Promise<void>;
}

export const PageTransition = forwardRef<PageTransitionRef, {}>((_, ref) => {
  const [isActive, setIsActive] = useState(false);
  const midpointTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const completeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (midpointTimeoutRef.current) clearTimeout(midpointTimeoutRef.current);
      if (completeTimeoutRef.current) clearTimeout(completeTimeoutRef.current);
    };
  }, []);

  useImperativeHandle(ref, () => ({
    trigger: (onMidpoint: () => void) => {
      // Clear any pending timeouts from rapid clicks
      if (midpointTimeoutRef.current) clearTimeout(midpointTimeoutRef.current);
      if (completeTimeoutRef.current) clearTimeout(completeTimeoutRef.current);

      return new Promise<void>((resolve) => {
        setIsActive(true);

        // Midpoint scroll callback triggers when screen is fully covered (720ms - 1080ms window)
        midpointTimeoutRef.current = setTimeout(() => {
          onMidpoint();
        }, 750);

        // End transition after animation duration of 1.8s
        completeTimeoutRef.current = setTimeout(() => {
          setIsActive(false);
          resolve();
        }, 1800);
      });
    },
  }));

  // Curved SVG path / border radius animation for the wave transition
  // Using GPU-accelerated translate Y for smooth 60/120fps performance
  const slideVariants = {
    initial: {
      y: "-100%",
      borderRadius: "0 0 100vw 100vw",
    },
    animate: {
      y: ["-100%", "0%", "0%", "100%"],
      borderRadius: [
        "0 0 100vw 100vw",
        "0 0 0vw 0vw",
        "0 0 0vw 0vw",
        "100vw 100vw 0 0"
      ],
      transition: {
        duration: 1.8,
        times: [0, 0.4, 0.6, 1],
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  const textVariants = {
    initial: { opacity: 0, y: 50 },
    animate: {
      opacity: [0, 1, 1, 0],
      y: [30, 0, 0, -30],
      transition: {
        duration: 1.2,
        times: [0, 0.3, 0.7, 1],
        ease: "easeInOut",
        delay: 0.2,
      },
    },
  };

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          key="wipe-overlay"
          className="fixed top-0 left-0 w-full h-screen bg-primary z-[9999] flex items-center justify-center overflow-hidden pointer-events-auto select-none"
          variants={slideVariants}
          initial="initial"
          animate="animate"
        >
          {/* Noise effect inside the transition overlay */}
          <div className="absolute inset-0 bg-noise opacity-[0.04] pointer-events-none mix-blend-overlay" />
          
          <motion.div
            variants={textVariants}
            initial="initial"
            animate="animate"
            className="flex flex-col items-center gap-2 text-black select-none"
          >
            <span className="font-serif italic text-6xl tracking-wide">Gielang*</span>
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase font-bold opacity-60">
              Loading Experience
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

PageTransition.displayName = "PageTransition";

