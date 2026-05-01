"use client";

import { useEffect, useMemo, useRef, useState, type ElementType } from "react";
import { ArrowRight, Link2, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
  bullets: string[];
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
  selectedId: number;
  onSelect: (item: TimelineItem) => void;
}

export function RadialOrbitalTimeline({
  timelineData,
  selectedId,
  onSelect,
}: RadialOrbitalTimelineProps) {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [centerOffset] = useState({ x: 0, y: 0 });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const active = timelineData.find((item) => item.id === selectedId);
    if (!active) {
      return;
    }

    const nodeIndex = timelineData.findIndex((item) => item.id === active.id);
    const targetAngle = (nodeIndex / timelineData.length) * 360;
    setRotationAngle(270 - targetAngle);
  }, [selectedId, timelineData]);

  useEffect(() => {
    if (!autoRotate) {
      return;
    }

    intervalRef.current = setInterval(() => {
      setRotationAngle((prev) => (prev + 0.2) % 360);
    }, 50);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoRotate]);

  const selectedItem = useMemo(
    () => timelineData.find((item) => item.id === selectedId) ?? timelineData[0],
    [selectedId, timelineData],
  );

  const getRelatedItems = (itemId: number) =>
    timelineData.find((item) => item.id === itemId)?.relatedIds ?? [];

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 190;
    const radian = (angle * Math.PI) / 180;

    return {
      x: radius * Math.cos(radian) + centerOffset.x,
      y: radius * Math.sin(radian) + centerOffset.y,
      zIndex: Math.round(100 + 50 * Math.cos(radian)),
      opacity: Math.max(0.45, Math.min(1, 0.5 + 0.5 * ((1 + Math.sin(radian)) / 2))),
    };
  };

  return (
    <div className="orbital-shell">
      <div className="relative mx-auto flex h-[420px] w-full max-w-[520px] items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-black/45 p-6 backdrop-blur-xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(118,168,255,0.12),transparent_55%)]" />
        <div className="absolute h-24 w-24 rounded-full border border-white/10 bg-white/[0.03]" />
        <div className="absolute h-[380px] w-[380px] rounded-full border border-white/10" />
        <div className="absolute h-14 w-14 rounded-full bg-gradient-to-br from-blue-400 via-indigo-400 to-violet-300 shadow-[0_0_50px_rgba(99,102,241,0.45)]">
          <div className="absolute inset-0 animate-ping rounded-full bg-blue-300/20" />
        </div>

        {timelineData.map((item, index) => {
          const position = calculateNodePosition(index, timelineData.length);
          const isSelected = item.id === selectedId;
          const isRelated = getRelatedItems(selectedId).includes(item.id);
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              aria-label={`Focus ${item.title} at ${item.category}`}
              className="group absolute -translate-x-1/2 -translate-y-1/2 text-left transition-all duration-500"
              style={{
                left: `calc(50% + ${position.x}px)`,
                top: `calc(50% + ${position.y}px)`,
                zIndex: isSelected ? 220 : position.zIndex,
                opacity: isSelected ? 1 : position.opacity,
              }}
              onMouseEnter={() => setAutoRotate(false)}
              onMouseLeave={() => setAutoRotate(true)}
              onClick={() => {
                setAutoRotate(false);
                onSelect(item);
              }}
            >
              <span
                className={cn(
                  "absolute -inset-2 rounded-full blur-xl transition-opacity",
                  isSelected
                    ? "opacity-100 bg-blue-300/20"
                    : isRelated
                      ? "opacity-100 bg-white/10"
                      : "opacity-0",
                )}
              />
              <span
                className={cn(
                  "relative flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300",
                  isSelected
                    ? "scale-125 border-blue-200 bg-blue-300/20 text-blue-100 shadow-[0_0_32px_rgba(96,165,250,0.45)]"
                    : isRelated
                      ? "border-white/50 bg-white/10 text-white"
                      : "border-white/20 bg-black/45 text-slate-300 group-hover:border-blue-200/60 group-hover:text-white",
                )}
              >
                <Icon size={16} />
              </span>
              <span
                className={cn(
                  "absolute top-full left-1/2 mt-3 -translate-x-1/2 whitespace-nowrap font-mono-display text-[10px] uppercase tracking-[0.22em]",
                  isSelected ? "text-blue-200" : "text-slate-400 group-hover:text-slate-200",
                )}
              >
                {item.category}
              </span>
            </button>
          );
        })}
      </div>

      <Card className="overflow-hidden border-blue-300/15 bg-blue-500/[0.05]">
        <CardHeader className="border-b border-white/10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <Badge className="mb-3" variant="default">
                Selected from orbital timeline
              </Badge>
              <CardTitle className="text-xl text-white">{selectedItem.title}</CardTitle>
              <p className="mt-2 font-mono-display text-xs uppercase tracking-[0.22em] text-blue-200/80">
                {selectedItem.category}
              </p>
            </div>
            <div className="text-right">
              <span className="block font-mono-display text-xs text-slate-400">
                {selectedItem.date}
              </span>
              <span className="mt-1 block font-mono-display text-xs text-blue-300/70">
                {selectedItem.status.replace("-", " ")}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <p className="text-sm leading-7 text-slate-300">{selectedItem.content}</p>

          <ul className="space-y-3">
            {selectedItem.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3 text-sm text-slate-300">
                <span className="mt-1 shrink-0 text-blue-300/80">›</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
            <div className="mb-2 flex items-center justify-between text-xs text-slate-300">
              <span className="flex items-center gap-1.5 font-mono-display uppercase tracking-[0.18em]">
                <Zap size={12} />
                Energy Level
              </span>
              <span className="font-mono-display">{selectedItem.energy}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400"
                style={{ width: `${selectedItem.energy}%` }}
              />
            </div>
          </div>

          {selectedItem.relatedIds.length > 0 ? (
            <div>
              <div className="mb-3 flex items-center gap-2 font-mono-display text-[10px] uppercase tracking-[0.22em] text-slate-400">
                <Link2 size={12} />
                Connected Nodes
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedItem.relatedIds.map((relatedId) => {
                  const relatedItem = timelineData.find((item) => item.id === relatedId);
                  if (!relatedItem) {
                    return null;
                  }

                  return (
                    <Button
                      key={relatedId}
                      variant="outline"
                      size="sm"
                      onClick={() => onSelect(relatedItem)}
                    >
                      {relatedItem.title}
                      <ArrowRight size={12} className="ml-2" />
                    </Button>
                  );
                })}
              </div>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
