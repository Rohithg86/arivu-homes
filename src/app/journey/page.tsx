
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const steps = [
  {
    title: "1. Consultation & Design",
    description: "Your journey starts with understanding your vision. We translate your requirements into functional architectural designs.",
    details: [
      "Requirement analysis & lifestyle mapping",
      "Site visit & feasibility assessment",
      "Conceptual 2D floor plans & Vastu analysis",
      "3D elevation design & material selection",
      "Detailed project estimation & timeline"
    ],
    payment: "Design & Consultation - 10% of Project Value"
  },
  {
    title: "2. Finalizing Plan & Mobilization",
    description: "We handle the paperwork and site preparation to ensure a smooth transition from paper to reality.",
    details: [
      "Submission drawings for local authorities",
      "Structural engineering & detailing",
      "Material procurement planning",
      "Labor mobilization & site setup",
      "Groundbreaking ceremony (Bhoomi Pooja)"
    ],
    payment: "Plan Finalization & Mobilization - 20% of Project Value"
  },
  {
    title: "3. Sub-Structure Construction",
    description: "The most critical phase where we build the strong foundation your dream home stands on.",
    details: [
      "Earthwork & excavation",
      "Foundation work & PCC",
      "Plinth beam construction & termite treatment",
      "Quality check for steel & concrete",
      "Site-level marking for walls"
    ],
    payment: "Plinth Completion - 25% of Project Value"
  },
  {
    title: "4. Super-Structure Construction",
    description: "Watch your home take shape vertically as we complete the load-bearing skeleton and walls.",
    details: [
      "Column & Beam casting",
      "Slab shuttering & reinforcement",
      "Concrete casting (GF/FF/SF/Roof)",
      "Brickwork & solid block masonry",
      "Lintel & Sunshade construction"
    ],
    payment: "Super Structure Completions - 25% of Project Value"
  },
  {
    title: "5. Finishes & Handover",
    description: "The transformation into a livable space through meticulous finishing and quality handover.",
    details: [
      "Plumbing & Electrical internal wiring",
      "Internal & external plastering",
      "Flooring, windows & door installations",
      "Painting & deep cleaning",
      "Final snag audit & key handover"
    ],
    payment: "Finishing & Handover - 20% of Project Value"
  }
];

export default function JourneyPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Your Journey</h1>
          <p className="text-gray-600 mt-2">A step-by-step guide to building your dream home with Arivu Homes.</p>
        </div>
        <Link href="/" className="text-gray-400 hover:text-gray-900 text-2xl transition-colors bg-white/50 p-2 rounded-full hover:shadow-sm" aria-label="Back to Home">
          ←
        </Link>
      </div>

      <div className="relative space-y-12">
        {/* Vertical Timeline Line */}
        <div className="absolute left-6 md:left-[2.75rem] top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 via-indigo-600 to-transparent hidden sm:block opacity-20 rounded-full" />

        {steps.map((s, i) => (
          <div key={i} className="relative grid md:grid-cols-12 gap-6 bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow z-10">
            <div className="md:col-span-1 flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shrink-0">
                {i + 1}
              </div>
            </div>

            <div className="md:col-span-7">
              <h3 className="text-2xl font-bold text-gray-900">{s.title}</h3>
              <p className="text-gray-600 mt-2">{s.description}</p>

              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-blue-600">What we do:</h4>
                  <ul className="space-y-2">
                    {s.details.map((d, j) => (
                      <li key={j} className="flex items-start gap-2 text-gray-700 text-sm">
                        <svg className="w-4 h-4 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-50/50 rounded-2xl p-5 border border-blue-100/50">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-blue-600 mb-3">Payment Milestone:</h4>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 3h12M6 8h12M6 13l8.5 8M6 13h3M9 13c6.667 0 6.667 -10 0 -10" />
                      </svg>
                    </div>
                    <span className="font-semibold text-blue-900 text-sm">{s.payment}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden md:block md:col-span-4 rounded-2xl bg-white border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-full w-full min-h-[200px]">
                <Image
                  src={`/images/journey/step-${i + 1}.png`}
                  alt="Arivu Standard"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-4">
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest opacity-80 mb-1">Arivu Standard</span>
                  <span className="text-white font-bold text-xs">Excellence by Design</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <footer className="mt-16 text-center bg-gray-900 rounded-3xl p-8 sm:p-12 text-white">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to start your journey?</h2>
        <p className="text-gray-400 mb-8 max-w-lg mx-auto">Get in touch with us for a detailed discussion about your dream home project.</p>
        <Link href="/#contact" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold transition-all transform hover:scale-105 shadow-xl">
          Consult Today
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </footer>
    </main>
  );
}
