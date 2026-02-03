import Link from "next/link";

const services = [
  { name: 'Residential Construction', desc: 'Villas, apartments, turnkey builds', slug: 'residential-construction' },
  { name: 'Commercial Construction', desc: 'Offices, retail, industrial', slug: 'commercial-construction' },
  { name: 'Renovation & Remodeling', desc: 'Structural retrofits, interiors', slug: 'renovation-remodeling' },
  { name: 'Architectural Design', desc: 'Concept to working drawings', slug: 'architectural-design' },
  { name: 'Structural Engineering', desc: 'Analysis, detailing, peer review', slug: 'structural-engineering' },
  { name: 'Project Management', desc: 'Cost control, timelines, quality', slug: 'project-management' },
  { name: 'Farm House Construction', desc: 'Eco-friendly retreats, weekend homes', slug: 'farm-house-construction' },
];

export default function ServicesPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Our Services</h1>
          <p className="text-gray-600 mt-2">Explore our end-to-end offerings across design, engineering, and construction.</p>
        </div>
        <Link href="/" className="text-gray-400 hover:text-gray-900 text-2xl transition-colors bg-white/50 p-2 rounded-full hover:shadow-sm" aria-label="Back to Home">
          ←
        </Link>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {services.map(s => (
          <Link key={s.slug} href={`/services/${s.slug}`} className="rounded-2xl border bg-white/70 backdrop-blur p-6 hover:shadow-md transition">
            <h3 className="text-xl font-semibold">{s.name}</h3>
            <p className="text-gray-600 mt-1">{s.desc}</p>
            <div className="mt-3 text-blue-600 text-sm font-medium">Learn more →</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
