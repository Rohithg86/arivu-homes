import Image from "next/image";
import Link from "next/link";
import { ContactWidget } from "@/components/ContactWidget";

export default function Home() {
  return (
    <main>
      <section className="relative isolate">
        <Image
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1600&auto=format&fit=crop"
          alt="Construction site"
          width={1600}
          height={900}
          className="h-[46vh] sm:h-[54vh] w-full object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-white">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-2">Arivu Homes</h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-2 font-medium max-w-3xl">Building Dreams with Precision • Crafting Excellence Since Day One</p>
            <p className="text-xs sm:text-sm md:text-base text-white/80 max-w-2xl">End-to-end construction, architectural design, structural engineering, and project management services in Bangalore.</p>
            <div className="mt-3 space-y-1.5">
              <p>
                <span className="inline-block px-2 py-0.5 rounded bg-white/20 backdrop-blur">Managing Partner:</span>
                <Link href="/team/rohith-gopal" className="ml-2 underline">Rohith Gopal</Link>
              </p>
              <p>
                <span className="inline-block px-2 py-0.5 rounded bg-white/20 backdrop-blur">Chief Engineer:</span>
                <Link href="/team/chethan-kumar-s" className="ml-2 underline">Chethan Kumar S</Link>
              </p>
              <p>
                <span className="inline-block px-2 py-0.5 rounded bg-white/20 backdrop-blur">Senior Architect &amp; Structural Engineer:</span>
                <Link href="/team/shashank-d" className="ml-2 underline">Shashank D</Link>
              </p>
            </div>
            <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4">
              <Link href="/services" className="bg-white text-gray-900 px-6 py-3 rounded-lg shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-300 font-semibold">
                Explore Services
              </Link>
              <Link href="/projects" className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold">
                View Projects
              </Link>
              <Link href="/boq" className="bg-gradient-to-r from-violet-500 to-purple-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold">
                BOQ Calculator
              </Link>
              <a href="#contact" className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">Quick Access</h2>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
          <Link href="/projects" className="rounded-xl p-6 hover:shadow-lg transition-all duration-300 group border" style={{background:"linear-gradient(180deg,#ecfdf5, #ffffff)"}}>
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🏗️</div>
            <h3 className="text-xl font-bold mb-3">Current Projects</h3>
            <p className="text-gray-700 leading-relaxed">Track ongoing projects in Bangalore.</p>
            <div className="mt-4 text-gray-600 text-sm font-medium group-hover:text-gray-900 transition-colors">
              View Projects →
            </div>
          </Link>
          <Link href="/boq" className="rounded-xl p-6 hover:shadow-lg transition-all duration-300 group border" style={{background:"linear-gradient(180deg,#eef2ff, #ffffff)"}}>
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">📊</div>
            <h3 className="text-xl font-bold mb-3">BOQ Calculator</h3>
            <p className="text-gray-700 leading-relaxed">Calculate construction costs and quantities with detailed breakdown by category.</p>
            <div className="mt-4 text-gray-600 text-sm font-medium group-hover:text-gray-900 transition-colors">
              Calculate Costs →
            </div>
          </Link>
          <Link href="/team" className="rounded-xl p-6 hover:shadow-lg transition-all duration-300 group border" style={{background:"linear-gradient(180deg,#fdf2f8, #ffffff)"}}>
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">👥</div>
            <h3 className="text-xl font-bold mb-3">Meet Our Team</h3>
            <p className="text-gray-700 leading-relaxed">Learn about our experienced professionals and their expertise.</p>
            <div className="mt-4 text-gray-600 text-sm font-medium group-hover:text-gray-900 transition-colors">
              View Team →
            </div>
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12 grid gap-4 sm:gap-6 md:grid-cols-3">
        {[
          { name:'Residential Construction', desc:'Villas, apartments, turnkey builds', slug:'residential-construction' },
          { name:'Commercial Construction', desc:'Offices, retail, industrial', slug:'commercial-construction' },
          { name:'Renovation & Remodeling', desc:'Structural retrofits, interiors', slug:'renovation-remodeling' },
          { name:'Architectural Design', desc:'Concept to working drawings', slug:'architectural-design' },
          { name:'Structural Engineering', desc:'Analysis, detailing, peer review', slug:'structural-engineering' },
          { name:'Project Management', desc:'Cost control, timelines, quality', slug:'project-management' },
        ].map((s, index)=> {
          return (
            <Link 
              href={`/services/${s.slug}`} 
              key={s.slug} 
              className={`border rounded-xl p-6 hover:shadow-lg transition-all duration-300 group`}
              style={{background: index % 3 === 0 ? "linear-gradient(180deg,#f0f9ff,#ffffff)" : index % 3 === 1 ? "linear-gradient(180deg,#f7fee7,#ffffff)" : "linear-gradient(180deg,#fae8ff,#ffffff)"}}
            >
              <h3 className={`font-bold text-lg text-gray-900 group-hover:scale-105 transition-transform duration-300`}>{s.name}</h3>
              <p className={`text-sm text-gray-700 mt-2 leading-relaxed`}>{s.desc}</p>
              <div className={`mt-4 text-xs text-gray-600 font-medium group-hover:translate-x-1 transition-transform duration-300`}>
                Learn More →
              </div>
            </Link>
          );
        })}
      </section>

      <section id="contact" className="max-w-6xl mx-auto px-6 pb-16">
        <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl border-2 border-slate-200 p-8 shadow-lg">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-gray-600 mb-6">Ready to start your construction project? Contact our team today.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="text-2xl mb-3">📍</div>
                <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
                <p className="text-gray-600">Bangalore, Karnataka</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="text-2xl mb-3">📞</div>
                <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
                <p className="text-gray-600">+91-6361867464</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="text-2xl mb-3">✉️</div>
                <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                <p className="text-gray-600">contact.arivuhomes@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating contact widget (home only) */}
      <ContactWidget />
    </main>
  );
}

