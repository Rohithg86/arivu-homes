import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="relative isolate">
        <Image
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1600&auto=format&fit=crop"
          alt="Construction site"
          width={1600}
          height={900}
          className="h-[54vh] w-full object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-6xl mx-auto px-6 text-white">
            <h1 className="text-4xl md:text-5xl font-bold">Arivu Constructions</h1>
            <p className="mt-3 max-w-2xl text-white/90">End-to-end construction, architectural design, structural engineering, and project management services in Bangalore.</p>
            <p className="mt-1 text-white/80"><strong>Managing Partner:</strong> Rohith Gopal  <strong>Chief Engineer:</strong> Chethan Shrinivas  <strong>Senior Architect &amp; Structural Engineer:</strong> Shashank D</p>
            <div className="mt-6 flex gap-3">
              <Link href="/services" className="bg-white text-gray-900 px-4 py-2 rounded shadow hover:bg-gray-100">Explore Services</Link>
              <a href="#contact" className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-500">Contact Us</a>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12 grid gap-6 md:grid-cols-3">
        {[
          { name:'Residential Construction', desc:'Villas, apartments, turnkey builds', slug:'residential-construction' },
          { name:'Commercial Construction', desc:'Offices, retail, industrial', slug:'commercial-construction' },
          { name:'Renovation & Remodeling', desc:'Structural retrofits, interiors', slug:'renovation-remodeling' },
          { name:'Architectural Design', desc:'Concept to working drawings', slug:'architectural-design' },
          { name:'Structural Engineering', desc:'Analysis, detailing, peer review', slug:'structural-engineering' },
          { name:'Project Management', desc:'Cost control, timelines, quality', slug:'project-management' },
        ].map((s)=> (
          <Link href={`/services/${s.slug}`} key={s.slug} className="border rounded-lg p-5 hover:shadow-md transition">
            <h3 className="font-semibold">{s.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{s.desc}</p>
          </Link>
        ))}
      </section>

      <section id="contact" className="max-w-6xl mx-auto px-6 pb-16">
        <div className="rounded-xl border p-6 bg-gray-50">
          <h2 className="text-xl font-semibold">Contact</h2>
          <p className="text-gray-600 mt-1">Bangalore  +91-XXXXXXXXXX  contact@arivuconstructions.com</p>
        </div>
      </section>
    </main>
  );
}

