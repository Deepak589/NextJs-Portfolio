"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  title: string;
  description: string;
  tags: string[];
  href?: string;
  accent?: string;
  className?: string;
}

export function TiltCard({
  title,
  description,
  tags,
  href,
  accent = "from-blue-400/30 via-indigo-400/12 to-transparent",
  className,
}: TiltCardProps) {
  const [transform, setTransform] = useState("perspective(1200px) rotateX(0deg) rotateY(0deg)");

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.25)] transition-transform duration-300",
        className,
      )}
      style={{ transform }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
        const offsetY = (event.clientY - rect.top) / rect.height - 0.5;
        setTransform(
          `perspective(1200px) rotateX(${offsetY * -8}deg) rotateY(${offsetX * 10}deg) translateY(-4px)`,
        );
      }}
      onMouseLeave={() =>
        setTransform("perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px)")
      }
    >
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-80", accent)} />
      <div className="absolute inset-[1px] rounded-[calc(1.5rem-1px)] bg-[linear-gradient(180deg,rgba(6,10,18,0.92),rgba(4,7,14,0.88))]" />
      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-4 flex items-start justify-between gap-4">
          <Badge variant="secondary">Featured Project</Badge>
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/10 p-2 text-slate-300 transition-colors hover:border-blue-300/40 hover:text-white"
              aria-label={`Open ${title}`}
            >
              <ArrowUpRight size={16} />
            </a>
          ) : null}
        </div>

        <h3 className="font-heading text-2xl text-white">{title}</h3>
        <p className="mt-4 text-sm leading-7 text-slate-300">{description}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
