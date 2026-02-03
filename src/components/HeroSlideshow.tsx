"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const SLIDES = [
  { type: "image", src: "/home-extra.jpg", duration: 5000 },
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
          {SLIDES[currentIndex].type === "image" ? (
            <Image
              src={SLIDES[currentIndex].src}
              alt="Background"
              fill
              className="object-cover object-center"
              priority
            />
          ) : (
            <video
              className="w-full h-full object-cover object-center"
              autoPlay
              muted
              loop={false}
              playsInline
              // When video ends, force next slide (optional, backup to timer)
              onEnded={() => setCurrentIndex((prev) => (prev + 1) % SLIDES.length)}
            >
              <source src={SLIDES[currentIndex].src} type="video/mp4" />
            </video>
          )}
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-black/55 z-10" />
    </div>
  );
}
