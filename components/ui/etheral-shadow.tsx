"use client";

import type { CSSProperties } from "react";

interface AnimationConfig {
  scale: number;
  speed: number;
}

interface NoiseConfig {
  opacity: number;
  scale: number;
}

interface EtherealShadowProps {
  sizing?: "fill" | "stretch";
  color?: string;
  animation?: AnimationConfig;
  noise?: NoiseConfig;
  style?: CSSProperties;
  className?: string;
  title?: string;
  subtitle?: string;
}

function mapRange(value: number, fromLow: number, fromHigh: number, toLow: number, toHigh: number) {
  if (fromLow === fromHigh) {
    return toLow;
  }
  return toLow + ((value - fromLow) / (fromHigh - fromLow)) * (toHigh - toLow);
}

/**
 * Animated backdrop.
 *
 * This used to drive an SVG filter chain (feTurbulence -> 2x feDisplacementMap
 * -> blur) across the whole viewport and rewrite feColorMatrix every frame.
 * That re-rasterised the full viewport at 60fps and starved the main thread.
 *
 * The drift is now a compositor-only transform animation on the masked layer:
 * same sense of slow movement, no per-frame raster work, nothing on the main
 * thread. `animation.speed` maps to the drift duration so callers keep working.
 */
export function EtherealShadow({
  sizing = "fill",
  color = "rgba(59, 99, 200, 0.85)",
  animation,
  noise,
  style,
  className,
  title,
  subtitle,
}: EtherealShadowProps) {
  const animationEnabled = Boolean(animation && animation.scale > 0);
  // higher speed -> shorter cycle, clamped to a slow, ambient range
  const driftSeconds = animation ? mapRange(animation.speed, 1, 100, 60, 12) : 0;

  return (
    <div
      className={className}
      style={{
        overflow: "hidden",
        position: "relative",
        width: "100%",
        height: "100%",
        ...style,
      }}
    >
      <div
        className={animationEnabled ? "ethereal-drift" : undefined}
        style={{
          position: "absolute",
          inset: "-8%",
          backgroundColor: color,
          maskImage:
            "url('https://framerusercontent.com/images/ceBGguIpUU8luwByxuQz79t7To.png')",
          WebkitMaskImage:
            "url('https://framerusercontent.com/images/ceBGguIpUU8luwByxuQz79t7To.png')",
          maskSize: sizing === "stretch" ? "100% 100%" : "cover",
          WebkitMaskSize: sizing === "stretch" ? "100% 100%" : "cover",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
          animationDuration: animationEnabled ? `${driftSeconds}s` : undefined,
          willChange: animationEnabled ? "transform" : undefined,
        }}
      />

      {title || subtitle ? (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
          <div className="text-center">
            {title ? (
              <h2 className="font-display text-6xl tracking-[0.08em] text-white md:text-7xl lg:text-8xl">
                {title}
              </h2>
            ) : null}
            {subtitle ? (
              <p className="mt-3 font-mono-display text-xs uppercase tracking-[0.4em] text-blue-100/70">
                {subtitle}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}

      {noise && noise.opacity > 0 ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              'url("https://framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png")',
            backgroundSize: `${noise.scale * 200}px`,
            backgroundRepeat: "repeat",
            opacity: noise.opacity / 2,
          }}
        />
      ) : null}
    </div>
  );
}
