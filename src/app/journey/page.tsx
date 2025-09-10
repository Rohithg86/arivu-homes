import Link from "next/link";

const steps = [
  { title: "Plot Assessment & Feasibility", details: [
    "Soil/contour checks, road access, setbacks, FAR/FSI study",
    "Authority norms review and risk identification",
  ]},
  { title: "Requirement Gathering & Budgeting", details: [
    "Lifestyle needs, room matrix, parking, future expansion",
    "Ballpark cost, timelines, and delivery model (item-rate/turnkey)",
  ]},
  { title: "Concept & Floor Plans (with Vastu options)", details: [
    "2-3 planning options, Vastu aligned entrances/kitchen/master",
    "Sunlight and ventilation studies",
  ]},
  { title: "Elevation & Structural Design", details: [
    "3D elevations, material palettes, mock views",
    "Structural analysis, foundation design, ductile detailing",
  ]},
  { title: "Rituals & Groundbreaking", details: [
    "Pooja scheduling, site readiness, barricading, safety setup",
  ]},
  { title: "Construction – Substructure to Superstructure", details: [
    "Excavation, PCC, footing, plinth beam, backfilling",
    "Columns, beams, slabs (GF/FF/SF)",
    "Staircase, blockwork, lintels, roof treatments",
  ]},
  { title: "Services & Finishes", details: [
    "Electrical & plumbing first/second fix, waterproofing",
    "Plastering, flooring (tiles/granite), painting, doors & windows",
    "Kitchen & wardrobes (optional)",
  ]},
  { title: "Handover & Close-Out", details: [
    "Snag rectification, final bill, as-built drawings, warranties",
  ]},
];

const paymentPlan = [
  { stage: "Booking", percent: 5, note: "Advance to initiate design" },
  { stage: "Concept & Floor Plan Freeze", percent: 10, note: "Design deliverables" },
  { stage: "Agreement & Mobilization", percent: 10, note: "Site setup and mobilization" },
  { stage: "Foundation Complete", percent: 15, note: "Substructure done" },
  { stage: "Ground Floor Slab", percent: 15, note: "Structure milestone" },
  { stage: "First Floor Slab", percent: 15, note: "Structure milestone" },
  { stage: "Second Floor / Roof", percent: 10, note: "Superstructure complete" },
  { stage: "Finishes – Mid", percent: 10, note: "Flooring, doors, MEP second fix" },
  { stage: "Handover", percent: 10, note: "Snag close-out and documentation" },
];

export default function JourneyPage(){
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Client Journey</h1>
        <Link href="/" className="text-gray-600 hover:text-gray-900 text-sm">← Back to Home</Link>
      </div>

      <div className="mt-6 rounded-2xl overflow-hidden border">
        <iframe
          className="w-full aspect-video"
          src="https://www.youtube.com/embed/0o3Zr7G4JmE?rel=0&modestbranding=1"
          title="Arivu Homes Journey"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>

      <section className="mt-8 grid gap-6 md:grid-cols-2">
        {steps.map((s, i)=> (
          <div key={i} className="rounded-2xl border bg-white/70 backdrop-blur p-6">
            <div className="text-sm text-blue-600 font-semibold">Step {i+1}</div>
            <h3 className="text-xl font-semibold mt-1">{s.title}</h3>
            <ul className="mt-3 pl-5 list-disc text-gray-700 space-y-1">
              {s.details.map((d, j)=> <li key={j}>{d}</li>)}
            </ul>
          </div>
        ))}
      </section>

      <section className="mt-12 rounded-2xl border bg-white/70 backdrop-blur p-6">
        <h2 className="text-2xl font-bold">Payment Plan</h2>
        <div className="mt-4 grid gap-3">
          {paymentPlan.map((p, i)=> (
            <div key={i} className="grid grid-cols-1 md:grid-cols-12 items-center rounded-xl border bg-white/50 p-4">
              <div className="md:col-span-4 font-medium">{p.stage}</div>
              <div className="md:col-span-2 text-blue-600 font-semibold">{p.percent}%</div>
              <div className="md:col-span-6 text-gray-700">{p.note}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-3">Note: Percentages are indicative; exact plan depends on scope and agreement.</p>
      </section>
    </main>
  );
}
