"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Loader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("diagonal:loaded")) {
      setDone(true);
      return;
    }
    document.body.classList.add("no-scroll");

    let mounted = true;
    let value = 0;
    const interval = setInterval(() => {
      value += Math.random() * 14 + 4;
      if (value >= 100) {
        value = 100;
        clearInterval(interval);
        setTimeout(() => {
          if (!mounted) return;
          setDone(true);
          sessionStorage.setItem("diagonal:loaded", "1");
          document.body.classList.remove("no-scroll");
        }, 280);
      }
      if (mounted) setProgress(Math.min(100, Math.round(value)));
    }, 110);

    return () => {
      mounted = false;
      clearInterval(interval);
      document.body.classList.remove("no-scroll");
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-ink-900 px-6 py-10"
        >
          <div className="flex w-full justify-between font-display text-xs uppercase tracking-widest-2 text-bone-400">
            <span>DIAGONAL</span>
            <span>DROP 01 — 2026</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="font-glitch text-fluid-mega leading-none text-bone-100">DIAGONAL</span>
            <span className="mt-4 font-display text-fluid-sm uppercase tracking-widest-2 text-bone-400">
              Streetwear from another angle
            </span>
          </div>
          <div className="flex w-full items-end justify-between font-display tabular-nums">
            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-widest-2 text-bone-400">Loading</span>
              <span className="font-glitch text-3xl leading-none text-bone-100">
                {String(progress).padStart(3, "0")}
              </span>
            </div>
            <div className="h-px w-1/2 bg-bone-100/10">
              <motion.div
                className="h-full origin-left bg-accent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: progress / 100 }}
                transition={{ ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
