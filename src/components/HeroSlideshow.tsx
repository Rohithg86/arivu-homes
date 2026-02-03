"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SLIDES = [
  { type: "video", src: "/videos/client-journey.mp4", duration: 15000 },
];

export function HeroSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const slide = SLIDES[currentIndex];
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, slide.duration);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full"
        >
          <video
            className="w-full h-full object-cover object-center"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={SLIDES[0].src} type="video/mp4" />
          </video>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
