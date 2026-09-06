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

    // Single interval for the whole sequence. Step state lives in refs so a
    // step never re-runs this effect (which previously rebuilt the timer on
    // every character and made the reveal take many times longer than `speed`).
    let phase: "phase1" | "phase2" = "phase1";
    let step = 0;
    // Fixed tick budget per phase. Stepping per-character meant a long string
    // (the 67-char tagline) took 4 * length ticks = over six seconds to read.
    const PHASE_STEPS = 16;

    const tick = () => {
      const chars: string[] = [];

      if (phase === "phase1") {
        const currentLength = Math.min(
          Math.ceil(((step + 1) / PHASE_STEPS) * text.length),
          text.length,
        );
        for (let index = 0; index < currentLength; index += 1) {
          chars.push(getRandomChar(index > 0 ? chars[index - 1] : undefined));
        }
        for (let index = currentLength; index < text.length; index += 1) {
          chars.push("\u00A0");
        }
        setDisplayText(chars.join(""));

        step += 1;
        if (step >= PHASE_STEPS) {
          phase = "phase2";
          step = 0;
        }
        return;
      }

      const revealedCount = Math.floor((step / PHASE_STEPS) * text.length);
      for (let index = 0; index < revealedCount && index < text.length; index += 1) {
        chars.push(text[index]);
      }
      if (revealedCount < text.length) {
        chars.push(step % 2 === 0 ? "_" : getRandomChar());
      }
      for (let index = chars.length; index < text.length; index += 1) {
        chars.push(getRandomChar());
      }
      setDisplayText(chars.join(""));

      step += 1;
      if (step >= PHASE_STEPS) {
        setDisplayText(text);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    };

    intervalRef.current = setInterval(tick, speed);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [hasStarted, speed, text]);

  useEffect(() => {
    setDisplayText(" ".repeat(text.length));
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
