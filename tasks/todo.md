# Perf pass on the original design

Keep the dark design exactly as it looks. Remove what made it lag.

Measured with Chrome under 4x CPU throttling + CPU rasterization
(GPU off), which is what reproduces the stutter.

| Metric              | Before          | After         |
|---------------------|-----------------|---------------|
| Hero name visible   | 2186 ms         | 879 ms        |
| Scroll FPS          | 19              | 60            |
| Long-task blocking  | 1808 ms / 31    | 77 ms / 1     |

## What changed

1. EtherealShadow: dropped the animated SVG filter chain (feTurbulence ->
   2x feDisplacementMap -> blur) that was re-rasterising the whole viewport
   every frame via a per-frame feColorMatrix write. The drift is now a CSS
   transform animation, which runs on the compositor. 197 -> 122 lines.
2. Removed backdrop-filter from .glass-card, the nav and the orbit shell.
   Each was a live blur pass on every scroll frame; slightly more opaque
   fills read the same over a dark backdrop. 5 small node glows remain and
   cost nothing measurable.
3. Scroll progress bar: was setState per scroll event, re-rendering the
   whole 676-line tree. Now a rAF-throttled direct style write via ref.
4. SpecialText: the effect had animationStep in its deps, so every character
   rebuilt the interval. One interval now drives the whole sequence.
5. SpecialText duration is bounded to 32 ticks. It was 4 ticks per character,
   so the 67-char tagline took 6.4s to become readable regardless of speed.
6. Orbital timeline: rotation paused when scrolled off screen, tick 50ms ->
   75ms. It re-rendered every node 20x/sec forever, visible or not.
7. TiltCard: transform written to the node instead of setState per mousemove.
8. Fonts self-hosted via next/font, removing a render-blocking @import.
9. Reveal observer unobserves after firing.
10. Added app/icon.svg, fixing a /favicon.ico 404.

## Also fixed
Orbit nodes sat at radius 190 inside a 420px overflow-hidden box, so the
top and bottom labels were clipped. Radius is now 148 and the ring 296px.

## Not done
Node glows still use blur-xl (5 small elements). Measured cost is nil, and
they carry the look. Revisit only if a profile says otherwise.
