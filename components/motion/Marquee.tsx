"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface MarqueeProps {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
  innerClassName?: string;
  repeat?: number;
}

export function Marquee({ children, speed = 30, reverse = false, className, innerClassName, repeat = 4 }: MarqueeProps) {
  return (
    <div className={cn("relative overflow-hidden", className)} aria-hidden="true">
      <motion.div
        className={cn("flex w-max", innerClassName)}
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
        style={{ willChange: "transform" }}
      >
        {Array.from({ length: repeat * 2 }).map((_, i) => (
          <div key={i} className="flex shrink-0 items-center gap-12 pr-12">{children}</div>
        ))}
      </motion.div>
    </div>
  );
}
