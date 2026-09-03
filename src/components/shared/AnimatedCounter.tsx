"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

interface Props {
  value: number;
  prefix?: string;
  duration?: number;
}

// Animates a number counting up from 0 to its target value on mount
export function AnimatedCounter({ value, prefix = "", duration = 1.2 }: Props) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const controls = animate(count, value, { duration, ease: "easeOut" });
    const unsubscribe = rounded.on("change", (v) => setDisplay(v));
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [value]);

  return (
    <motion.span>
      {prefix}
      {display}
    </motion.span>
  );
}