import Link from "next/link";
import { notFound } from "next/navigation";

const serviceContent: Record<string, { title: string; intro: string; bullets: string[] }> = {
  "residential-construction": {
    title: "Residential Construction",
    intro: "Turnkey villas and apartments with quality, transparency, and on-time delivery.",
    bullets: [
      "Soil test, design brief, and detailed estimates",
      "RCC structure with M25+ grade concrete and FE500D steel",
      "Wiring, plumbing, waterproofing, and finishes with branded materials",
      "Weekly progress reports and site audits",
    ],
  },
  "commercial-construction": {
    title: "Commercial Construction",
    intro: "Office, retail, and industrial spaces built for performance and compliance.",
    bullets: [
      "Pre-construction planning and statutory approvals",
      "Structural optimization for span and load",
      "MEP coordination and fire-safety compliance",
      "Handover with as-built drawings and O&M manuals",
    ],
  },
  "renovation-remodeling": {
    title: "Renovation & Remodeling",
    intro: "Adaptive reuse, interior remodeling, and structural retrofits without surprises.",
    bullets: [
      "Structural assessment and retrofit strategy",
      "Phased execution with dust and noise control",
      "Material reuse and recycling where feasible",
      "Premium finishes and turnkey interiors",
    ],
  },
  "architectural-design": {
    title: "Architectural Design",
    intro: "Concept to GFC drawings aligned to lifestyle, climate, and Vastu.",
    bullets: [
      "Concepts, 3D views, and zoning",
      "Vastu-aligned planning options",
      "GFC drawings and BOQs",
      "Authority submission support",
    ],
  },
  "structural-engineering": {
    title: "Structural Engineering",
    intro: "Safe, economical, and code-compliant design & peer reviews.",
    bullets: [
      "ETABS/STAAD analysis and detailing",
      "Seismic design to IS 1893 & ductile detailing IS 13920",
      "Peer review and value engineering",
      "Construction method statements",
    ],
  },
  "project-management": {
    title: "Project Management",
    intro: "Transparent cost control, scheduling, QA/QC, and vendor management.",
    bullets: [
      "Baseline schedule, cashflow, and risk register",
      "Quality checklists and stage-wise inspections",
      "Weekly client reporting and site reviews",
      "Snag rectification and close-out",
    ],
  },
};

export default async function ServiceDetails({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = serviceContent[slug];
  if (!data) return notFound();
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">{data.title}</h1>
          <p className="text-gray-600 mt-2 max-w-3xl">{data.intro}</p>
        </div>
        <Link href="/" className="text-gray-400 hover:text-gray-900 text-2xl transition-colors bg-white/50 p-2 rounded-full hover:shadow-sm" aria-label="Back to Home">
          ←
        </Link>
      </div>
      <div className="mt-6 rounded-2xl border bg-white/70 backdrop-blur p-6">
        <h2 className="text-xl font-semibold">What we deliver</h2>
        <ul className="mt-3 list-disc pl-6 text-gray-700 space-y-1">
          {data.bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      </div>
    </main>
  );
}
