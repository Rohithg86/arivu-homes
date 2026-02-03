
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const steps = [
  {
    title: "Plot Assessment & Feasibility", details: [
      "Soil/contour checks, road access, setbacks",
      "Authority norms review and risk identification",
    ]
  },
  {
    title: "Requirement Gathering & Budgeting", details: [
      "Lifestyle needs, room matrix, parking, future expansion",
      "Ballpark cost, timelines, and delivery model (item-rate/turnkey)",
    ]
  },
  {
    title: "Concept & Floor Plans (with Vastu options)", details: [
      "2-3 planning options, Vastu aligned entrances/kitchen/master",
      "Sunlight and ventilation studies",
    ]
  },
  {
    title: "Elevation & Structural Design", details: [
      "3D elevations, material palettes, mock views",
      "Structural analysis, foundation design, ductile detailing",
    ]
  },
  {
    title: "Rituals & Groundbreaking", details: [
      "Pooja scheduling, site readiness, barricading, safety setup",
    ]
  },
  {
    title: "Construction – Substructure to Superstructure", details: [
      "Excavation, PCC, footing, plinth beam, backfilling",
      "Columns, beams, slabs (GF/FF/SF)",
      "Staircase, blockwork, lintels, roof treatments",
    ]
  },
  {
    title: "Services & Finishes", details: [
      "Electrical & plumbing first/second fix, waterproofing",
      "Plastering, flooring (tiles/granite), painting, doors & windows",
      "Kitchen & wardrobes (optional)",
    ]
  },
  {
    title: "Handover & Close-Out", details: [
      "Snag rectification, final bill, as-built drawings, warranties",
    ]
  },
];

const paymentPlan = [
  { stage: "Booking", percent: 5, note: "Advance to initiate design" },
  { stage: "Concept & Floor Plan Freeze", percent: 10, note: "Design deliverables" },
  { stage: "Agreement & Mobilization", percent: 10, note: "Site setup and mobilization" },
  { stage: "Foundation Complete", percent: 15, note: "Substructure done" },
  { stage: "Ground Floor Slab", percent: 15, note: "Structure milestone" },
  { stage: "First Floor Slab", percent: 15, note: "Structure milestone" },
  { stage: "Second Floor / Roof", percent: 10, note: "Superstructure complete" },
  { stage: "Finishes – Mid", percent: 10, note: "Flooring, doors, paint work" },
  { stage: "Handover", percent: 10, note: "Snag close-out" },
];

export default function JourneyPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [needsSoundClick, setNeedsSoundClick] = useState(false);

  useEffect(() => {
    // Attempt to autoplay WITH sound. If blocked by the browser,
    // fall back to muted autoplay and show a "Tap to unmute" overlay.
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.volume = 1;
    const p = v.play();
    if (p && typeof (p as Promise<void>).catch === "function") {
      (p as Promise<void>).catch(async () => {
        try {
          v.muted = true;
          await v.play();
          setNeedsSoundClick(true);
        } catch {
          setNeedsSoundClick(true);
        }
      });
    }
  }, []);

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold">Your Journey</h1>
        <Link href="/" className="text-gray-600 hover:text-gray-900 text-2xl transition-colors" aria-label="Back to Home">
          ←
        </Link>
      </div>

      {/* Video: reduced frame significantly as requested */}
      <div className="mt-5 sm:mt-6 max-w-3xl mx-auto shadow-2xl rounded-2xl overflow-hidden border bg-black">
        <div className="relative w-full" style={{ aspectRatio: '32/9' }}>
          <video
            ref={videoRef}
            className="block w-full h-auto"
            controls
            autoPlay
            playsInline
            preload="auto"
          >
            <source src="/videos/home-2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {needsSoundClick && (
            <button
              type="button"
              className="absolute inset-0 flex items-center justify-center bg-black/35 text-white"
              onClick={async () => {
                const v = videoRef.current;
                if (!v) return;
                v.muted = false;
                v.volume = 1;
                try {
                  await v.play();
                } catch {
                  // ignore
                }
                setNeedsSoundClick(false);
              }}
            >
              <span className="rounded-full bg-white/15 backdrop-blur px-5 py-2 text-sm font-semibold border border-white/20">
                Tap to unmute
              </span>
            </button>
          )}
        </div>
      </div>

      <section className="mt-6 sm:mt-8 grid gap-4 sm:gap-6 md:grid-cols-2">
        {steps.map((s, i) => (
          <div key={i} className="rounded-2xl border bg-white/70 backdrop-blur p-4 sm:p-6">
            <div className="text-xs sm:text-sm text-blue-600 font-semibold">Step {i + 1}</div>
            <h3 className="text-lg sm:text-xl font-semibold mt-1">{s.title}</h3>
            <ul className="mt-3 pl-5 list-disc text-sm sm:text-base text-gray-700 space-y-1.5">
              {s.details.map((d, j) => <li key={j}>{d}</li>)}
            </ul>
          </div>
        ))}
      </section>

      <section className="mt-10 sm:mt-12 rounded-2xl border bg-white/70 backdrop-blur p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold">Payment Plan</h2>
        <div className="mt-4 grid gap-3">
          {paymentPlan.map((p, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-12 items-start md:items-center rounded-xl border bg-white/50 p-4">
              <div className="md:col-span-4 font-medium text-sm sm:text-base">{p.stage}</div>
              <div className="md:col-span-2 text-blue-600 font-semibold text-sm sm:text-base mt-1 md:mt-0">{p.percent}%</div>
              <div className="md:col-span-6 text-gray-700 text-sm sm:text-base mt-2 md:mt-0">{p.note}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-3">Note: Percentages are indicative; exact plan depends on scope and agreement.</p>
      </section>
    </main>
  );
}
