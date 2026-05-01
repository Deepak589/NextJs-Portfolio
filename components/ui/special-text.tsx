"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface SpecialTextProps {
  children: string;
  speed?: number;
  delay?: number;
  className?: string;
  inView?: boolean;
  once?: boolean;
}

const RANDOM_CHARS = "_!X$0-+*#";

function getRandomChar(prevChar?: string) {
  let char = "";
  do {
    char = RANDOM_CHARS[Math.floor(Math.random() * RANDOM_CHARS.length)];
  } while (char === prevChar);
  return char;
}

export function SpecialText({
  children,
  speed = 20,
  delay = 0,
  className,
  inView = false,
  once = true,
}: SpecialTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, {
    once,
    margin: "-100px 0px",
  });
  const shouldAnimate = inView ? isInView : true;
  const text = children;

  const [hasStarted, setHasStarted] = useState(() => !inView && delay <= 0);
  const [displayText, setDisplayText] = useState(" ".repeat(text.length));
  const [currentPhase, setCurrentPhase] = useState<"phase1" | "phase2">("phase1");
  const [animationStep, setAnimationStep] = useState(0);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!shouldAnimate || hasStarted) {
      return;
    }

    if (delay <= 0) {
      setHasStarted(true);
      return;
    }

    startTimeoutRef.current = setTimeout(() => setHasStarted(true), delay * 1000);
    return () => {
      if (startTimeoutRef.current) {
        clearTimeout(startTimeoutRef.current);
      }
    };
  }, [delay, hasStarted, shouldAnimate]);

  useEffect(() => {
    if (!hasStarted) {
      return;
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const runPhase1 = () => {
      const maxSteps = text.length * 2;
      const currentLength = Math.min(animationStep + 1, text.length);
      const chars: string[] = [];

      for (let index = 0; index < currentLength; index += 1) {
        chars.push(getRandomChar(index > 0 ? chars[index - 1] : undefined));
      }

      for (let index = currentLength; index < text.length; index += 1) {
        chars.push("\u00A0");
      }

      setDisplayText(chars.join(""));

      if (animationStep < maxSteps - 1) {
        setAnimationStep((prev) => prev + 1);
      } else {
        setCurrentPhase("phase2");
        setAnimationStep(0);
      }
    };

    const runPhase2 = () => {
      const revealedCount = Math.floor(animationStep / 2);
      const chars: string[] = [];

      for (let index = 0; index < revealedCount && index < text.length; index += 1) {
        chars.push(text[index]);
      }

      if (revealedCount < text.length) {
        chars.push(animationStep % 2 === 0 ? "_" : getRandomChar());
      }

      for (let index = chars.length; index < text.length; index += 1) {
        chars.push(getRandomChar());
      }

      setDisplayText(chars.join(""));

      if (animationStep < text.length * 2 - 1) {
        setAnimationStep((prev) => prev + 1);
      } else {
        setDisplayText(text);
      }
    };

    intervalRef.current = setInterval(() => {
      if (currentPhase === "phase1") {
        runPhase1();
      } else {
        runPhase2();
      }
    }, speed);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [animationStep, currentPhase, hasStarted, speed, text]);

  useEffect(() => {
    setDisplayText(" ".repeat(text.length));
    setCurrentPhase("phase1");
    setAnimationStep(0);
  }, [text]);

  return (
    <span
      ref={containerRef}
      className={cn("inline-flex min-h-6 font-mono-display font-medium", className)}
    >
      {displayText}
    </span>
  );
}
