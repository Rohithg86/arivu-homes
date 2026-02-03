
"use client";

import Link from "next/link";
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
    payment: "Booking - 5% of Project Value"
  },
  {
    title: "2. Approvals & Mobilization",
    description: "We handle the paperwork and site preparation to ensure a smooth transition from paper to reality.",
    details: [
      "Submission drawings for local authorities",
      "Structural engineering & detailing",
      "Material procurement planning",
      "Labor mobilization & site setup",
      "Groundbreaking ceremony (Bhoomi Pooja)"
    ],
    payment: "Agreement - 10% of Project Value"
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
    payment: "Plinth Completion - 20% of Project Value"
  },
  {
    title: "4. Super-Structure Construction",
    description: "Watch your home take shape vertically as we complete the load-bearing skeleton and walls.",
    details: [
      "Column & Beam casting",
      "Slab shuttering & reinforcement",
      "Concrete casting (GF/FF/SF)",
      "Brickwork & solid block masonry",
      "Lintel & Sunshade construction"
    ],
    payment: "Slab Completions - 30% (Split by Slab)"
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
    payment: "Finishing & Handover - 35% (Staged)"
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

      <div className="space-y-8">
        {steps.map((s, i) => (
          <div key={i} className="relative grid md:grid-cols-12 gap-6 bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="md:col-span-1">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="font-semibold text-blue-900 text-sm">{s.payment}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden md:block md:col-span-4 rounded-2xl bg-slate-50 border border-slate-100 p-6">
              <div className="h-full flex flex-col justify-center items-center text-center space-y-2">
                <div className="text-blue-200">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    {i === 0 && <path d="M11 20H4a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v6h-2V5H4v13h7v2m9-10l-1.41-1.41L12.58 14.59l2.83 2.82L20 10m-2 10h4v-2h-4v2z" />}
                    {i === 1 && <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z" />}
                    {i === 2 && <path d="M12 3L2 12h3v8h14v-8h3L12 3zm0 4.19l7 6.31v1.5H5v-1.5l7-6.31zM9 18v-5h6v5H9z" />}
                    {i === 3 && <path d="M17 11V3H7v4H3v14h8v-4h2v4h8V11h-4zM7 19H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm4 4H9v-2h2v2zm0-4H9V9h2v2zm2-2h-2V5h2v2zm4 8h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2z" />}
                    {i === 4 && <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" />}
                  </svg>
                </div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Arivu Standard</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <footer className="mt-16 text-center bg-gray-900 rounded-3xl p-8 sm:p-12 text-white">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to start your journey?</h2>
        <p className="text-gray-400 mb-8 max-w-lg mx-auto">Get in touch with us for a detailed discussion about your dream home project.</p>
        <Link href="/services#contact" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold transition-all transform hover:scale-105 shadow-xl">
          Consult Today
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </footer>
    </main>
  );
}
