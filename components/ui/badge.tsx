import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-[0.22em] uppercase transition-colors",
  {
    variants: {
      variant: {
        default: "border-blue-300/20 bg-blue-400/10 text-blue-100",
        secondary: "border-white/10 bg-white/6 text-slate-200",
        outline: "border-white/20 bg-transparent text-slate-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
