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
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold text-white leading-tight mb-2">Arivu Homes</h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-2 font-medium max-w-3xl leading-snug">• Building Dreams with Precision<br className="sm:hidden" /> • Crafting Excellence Since Day One</p>
            <p className="text-xs sm:text-sm md:text-base text-white/80 max-w-2xl leading-relaxed">End-to-end construction, architectural design, structural engineering, and project management services in Bangalore.</p>
            <div className="mt-3 flex flex-col sm:flex-row flex-wrap gap-1.5 sm:gap-6 text-sm sm:text-base">
              <p className="flex items-center gap-2">
                <span className="inline-block px-2 py-0.5 rounded bg-white/20 backdrop-blur text-xs sm:text-sm">Managing Partner:</span>
                <Link href="/team/rohith-gopal" className="underline hover:text-white/80 font-bold">Rohith Gopal</Link>
              </p>
              <p className="flex items-center gap-2">
                <span className="inline-block px-2 py-0.5 rounded bg-white/20 backdrop-blur text-xs sm:text-sm">Managing Partner:</span>
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
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-24">
        <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-14 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border border-gray-200/50 flex flex-col">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-4xl font-black text-gray-900 tracking-tight uppercase">Quick Access</h2>
            <div className="w-16 sm:w-20 h-1 sm:h-1.5 bg-blue-600 mx-auto mt-3 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)]"></div>
          </div>
          <div className="grid gap-4 sm:gap-8 md:grid-cols-3">
            <Link href="/projects" className="group flex flex-col h-full rounded-2xl sm:rounded-[2rem] p-6 sm:p-8 bg-slate-50/50 border border-transparent hover:border-emerald-500/30 hover:bg-white hover:shadow-[0_20px_50px_-15px_rgba(16,185,129,0.15)] transition-all duration-500">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl mb-4 sm:mb-6 shadow-md border border-gray-100 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">🏗️</div>
              <h3 className="text-lg sm:text-xl font-black mb-2 text-gray-900 group-hover:text-emerald-700 transition-colors">Current Projects</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 sm:mb-8 flex-grow">Track ongoing developments across Bangalore.</p>
              <div className="flex items-center text-emerald-600 font-bold text-[10px] sm:text-xs uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                View Projects →
              </div>
            </Link>

            <Link href="/journey" className="group flex flex-col h-full rounded-2xl sm:rounded-[2rem] p-6 sm:p-8 bg-slate-50/50 border border-transparent hover:border-blue-500/30 hover:bg-white hover:shadow-[0_20px_50px_-15px_rgba(37,99,235,0.15)] transition-all duration-500">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl mb-4 sm:mb-6 shadow-md border border-gray-100 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">🗺️</div>
              <h3 className="text-lg sm:text-xl font-black mb-2 text-gray-900 group-hover:text-blue-700 transition-colors">Your Journey</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 sm:mb-8 flex-grow">Our step-by-step process of building your dream home.</p>
              <div className="flex items-center text-blue-600 font-bold text-[10px] sm:text-xs uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                Explore Journey →
              </div>
            </Link>

            <Link href="/team" className="group flex flex-col h-full rounded-2xl sm:rounded-[2rem] p-6 sm:p-8 bg-slate-50/50 border border-transparent hover:border-indigo-500/30 hover:bg-white hover:shadow-[0_20px_50px_-15px_rgba(79,70,229,0.15)] transition-all duration-500">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl mb-4 sm:mb-6 shadow-md border border-gray-100 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">👥</div>
              <h3 className="text-lg sm:text-xl font-black mb-2 text-gray-900 group-hover:text-indigo-700 transition-colors">Meet Our Team</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 sm:mb-8 flex-grow">Experienced professionals crafting your vision.</p>
              <div className="flex items-center text-indigo-600 font-bold text-[10px] sm:text-xs uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                View Team →
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-10 grid gap-3 sm:gap-6 md:grid-cols-3">
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
      <section className="bg-blue-50 py-8 sm:py-16 mb-8 sm:mb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">What Our Clients Say</h2>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">Stories of trust and satisfaction from our valued partners.</p>
          </div>
          <TestimonialSlideshow />
        </div>
      </section>

      <section id="contact" className="max-w-6xl mx-auto px-4 sm:px-6 pb-6 sm:pb-16">
        <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl border-2 border-slate-200 p-6 sm:p-8 shadow-lg">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Get In Touch</h2>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">Ready to start your construction project? Contact our team today.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-left sm:text-center">
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md flex items-center sm:block gap-4 border border-gray-100">
                <div className="text-2xl mb-0 sm:mb-3">📍</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-0.5 sm:mb-2 text-sm sm:text-base">Location</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">Bangalore, Karnataka</p>
                </div>
              </div>
              <a href="tel:+916361867464" className="bg-white rounded-xl p-4 sm:p-6 shadow-md flex items-center sm:block gap-4 border border-gray-100 hover:border-blue-200 transition-colors group">
                <div className="text-2xl mb-0 sm:mb-3 group-hover:scale-110 transition-transform">📞</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-0.5 sm:mb-2 text-sm sm:text-base group-hover:text-blue-600 transition-colors">Phone</h3>
                  <p className="text-gray-600 text-xs sm:text-sm text-blue-600 font-medium">+91-6361867464</p>
                </div>
              </a>
              <a href="mailto:contact.arivuhomes@gmail.com" className="bg-white rounded-xl p-4 sm:p-6 shadow-md flex items-center sm:block gap-4 border border-gray-100 hover:border-blue-200 transition-colors group">
                <div className="text-2xl mb-0 sm:mb-3 group-hover:scale-110 transition-transform">✉️</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-0.5 sm:mb-2 text-sm sm:text-base group-hover:text-blue-600 transition-colors">Email</h3>
                  <p className="text-gray-600 text-xs sm:text-sm truncate text-blue-600 font-medium">contact.arivuhomes@gmail.com</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Floating contact widget moved to layout.tsx */}
    </main>
  );
}
