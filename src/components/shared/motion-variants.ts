import { Variants } from "framer-motion";

// Parent container - staggers children's entrance animation
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

// Individual card - fade up on entrance
export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// Hover lift effect for cards
export const cardHover = {
  whileHover: { y: -4, scale: 1.01 },
  transition: { duration: 0.2 },
};