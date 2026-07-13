"use client";

import { motion, useMotionValue, useSpring, type HTMLMotionProps } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface MagneticButtonProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  strength?: number;
  className?: string;
}

export function MagneticButton({ children, strength = 24, className, ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set(((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * strength);
        y.set(((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * strength);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className={cn("inline-block", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
