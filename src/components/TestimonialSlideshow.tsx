"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const TESTIMONIALS = [
    {
        id: 1,
        text: "Arivu Homes transformed our vision into reality. The attention to detail and dedication to quality were outstanding throughout the entire construction process.",
        name: "Rajesh Kumar",
        role: "Villa Owner",
        location: "Bangalore"
    },
    {
        id: 2,
        text: "Professional, transparent, and timely. Managing the project from abroad was seamless thanks to their regular updates and trustworthy team.",
        name: "Priya Sharma",
        role: "NRI Client",
        location: "USA / Bangalore"
    },
    {
        id: 3,
        text: "The structural expertise they brought to our commercial project saved us both time and money. Highly recommended for complex builds.",
        name: "Anand Reddy",
        role: "Commercial Developer",
        location: "Jigani"
    },
    {
        id: 4,
        text: "Renovating our ancestral home was emotional, but the team handled it with such care and respect, preserving the heritage while modernizing the amenities.",
        name: "Lakshmi Narayan",
        role: "Renovation Client",
        location: "Magadi Road"
    }
];

export function TestimonialSlideshow() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full max-w-4xl mx-auto px-4">
            <div className="relative min-h-[250px] sm:min-h-[200px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="text-center w-full"
                    >
                        <div className="text-4xl sm:text-5xl text-blue-200 mb-4 font-serif">&quot;</div>
                        <p className="text-lg sm:text-xl md:text-2xl text-gray-800 font-medium leading-relaxed italic mb-6">
                            {TESTIMONIALS[index].text}
                        </p>
                        <div>
                            <h4 className="text-gray-900 font-bold text-lg">{TESTIMONIALS[index].name}</h4>
                            <p className="text-sm text-gray-600">{TESTIMONIALS[index].role} • {TESTIMONIALS[index].location}</p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="flex justify-center gap-2 mt-8">
                {TESTIMONIALS.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === index ? "bg-blue-600 w-8" : "bg-gray-300 hover:bg-gray-400"
                            }`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
