import { HeroSlideshow } from "@/components/HeroSlideshow";
import Link from "next/link";
import { TestimonialSlideshow } from "@/components/TestimonialSlideshow";

export default function Home() {
  return (
    <main>
      <section className="relative isolate h-[65vh] sm:h-[90vh] overflow-hidden">
        <HeroSlideshow />
        <div className="absolute inset-0 flex items-center z-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-white w-full">
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-2">Arivu Homes</h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-2 font-medium max-w-3xl">• Building Dreams with Precision • Crafting Excellence Since Day One</p>
            <p className="text-xs sm:text-sm md:text-base text-white/80 max-w-2xl">End-to-end construction, architectural design, structural engineering, and project management services in Bangalore.</p>
            <div className="mt-3 flex flex-col sm:flex-row flex-wrap gap-1.5 sm:gap-6 text-sm sm:text-base">
              <p className="flex items-center gap-2">
                <span className="inline-block px-2 py-0.5 rounded bg-white/20 backdrop-blur text-xs sm:text-sm">Managing Partner:</span>
                <Link href="/team/rohith-gopal" className="underline hover:text-white/80 font-bold">Rohith Gopal</Link>
              </p>
              <p className="flex items-center gap-2">
                <span className="inline-block px-2 py-0.5 rounded bg-white/20 backdrop-blur text-xs sm:text-sm">Chief Engineer:</span>
                <Link href="/team/chethan-kumar-s" className="underline hover:text-white/80 font-bold">Chethan Kumar S</Link>
              </p>
              <p className="flex items-center gap-2">
                <span className="inline-block px-2 py-0.5 rounded bg-white/20 backdrop-blur text-xs sm:text-sm">Senior Architect:</span>
                <Link href="/team/shashank-d" className="underline hover:text-white/80 font-bold">Shashank D</Link>
              </p>
            </div>
            <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4">
              <Link href="/services" className="bg-white text-gray-900 px-6 py-3 rounded-lg shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-300 font-semibold">
                Explore Services
              </Link>
              <Link href="/projects" className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold">
                View Projects
              </Link>
              <Link href="/journey" className="bg-gradient-to-r from-violet-500 to-purple-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold">
                Your Journey
              </Link>
              <a href="#contact" className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="bg-white rounded-[2.5rem] p-8 sm:p-14 shadow-xl border border-gray-100 flex flex-col">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight uppercase">Quick Access</h2>
            <div className="w-20 h-1.5 bg-blue-600 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <Link href="/projects" className="group flex flex-col h-full rounded-[2rem] p-8 bg-slate-50 border border-transparent hover:border-emerald-200 hover:bg-white hover:shadow-2xl transition-all duration-500">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500">🏗️</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-emerald-700 transition-colors">Current Projects</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-grow">Track ongoing developments and real-time updates across Bangalore.</p>
              <div className="flex items-center text-emerald-600 font-bold text-xs uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                View Projects →
              </div>
            </Link>

            <Link href="/journey" className="group flex flex-col h-full rounded-[2rem] p-8 bg-slate-50 border border-transparent hover:border-blue-200 hover:bg-white hover:shadow-2xl transition-all duration-500">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500">🗺️</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-700 transition-colors">Your Journey</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-grow">Explore our meticulous step-by-step process of building your dream home.</p>
              <div className="flex items-center text-blue-600 font-bold text-xs uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                Explore Journey →
              </div>
            </Link>

            <Link href="/team" className="group flex flex-col h-full rounded-[2rem] p-8 bg-slate-50 border border-transparent hover:border-indigo-200 hover:bg-white hover:shadow-2xl transition-all duration-500">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500">👥</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-indigo-700 transition-colors">Meet Our Team</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-grow">Learn about the experienced professionals crafting your vision into reality.</p>
              <div className="flex items-center text-indigo-600 font-bold text-xs uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                View Team →
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 grid gap-3 sm:gap-6 md:grid-cols-3">
        {[
          { name: 'Residential Construction', desc: 'Villas, apartments, turnkey builds', slug: 'residential-construction' },
          { name: 'Commercial Construction', desc: 'Offices, retail, industrial', slug: 'commercial-construction' },
          { name: 'Farm House Construction', desc: 'Eco-friendly retreats, weekend homes', slug: 'farm-house-construction' },
          { name: 'Architectural Design', desc: 'Concept to working drawings', slug: 'architectural-design' },
          { name: 'Structural Engineering', desc: 'Analysis, detailing, peer review', slug: 'structural-engineering' },
          { name: 'Renovation, Remodeling & PM', desc: 'Upgrades, retrofits, and management', slug: 'renovation-remodeling' },
        ].map((s, index) => {
          return (
            <Link
              href={`/services/${s.slug}`}
              key={s.slug}
              className={`border rounded-xl p-5 hover:shadow-lg transition-all duration-300 group`}
              style={{ background: index % 3 === 0 ? "linear-gradient(180deg,#f0f9ff,#ffffff)" : index % 3 === 1 ? "linear-gradient(180deg,#f7fee7,#ffffff)" : "linear-gradient(180deg,#fae8ff,#ffffff)" }}
            >
              <h3 className={`font-bold text-lg text-gray-900 group-hover:scale-105 transition-transform duration-300`}>{s.name}</h3>
              <p className={`text-sm text-gray-700 mt-1.5 leading-relaxed`}>{s.desc}</p>
              <div className={`mt-3 text-xs text-gray-600 font-medium group-hover:translate-x-1 transition-transform duration-300`}>
                Learn More →
              </div>
            </Link>
          );
        })}
      </section>

      {/* Testimonials Section */}
      <section className="bg-blue-50 py-10 sm:py-16 mb-8 sm:mb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">What Our Clients Say</h2>
            <p className="text-gray-600 mt-2">Stories of trust and satisfaction from our valued partners.</p>
          </div>
          <TestimonialSlideshow />
        </div>
      </section>

      <section id="contact" className="max-w-6xl mx-auto px-6 pb-8 sm:pb-16">
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

      {/* Floating contact widget moved to layout.tsx */}
    </main>
  );
}
