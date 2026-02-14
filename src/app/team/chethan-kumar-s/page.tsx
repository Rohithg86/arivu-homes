import Image from "next/image";
import Link from "next/link";

export default function ChethanShrinivasBio() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Chethan Kumar S</h1>
          <p className="text-gray-600 mt-2">Managing Partner - Arivu Homes Private Limited</p>
        </div>
        <Link href="/" className="text-gray-400 hover:text-gray-900 text-2xl transition-colors bg-white/50 p-2 rounded-full hover:shadow-sm" aria-label="Back to Home">
          ←
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-green-600 to-green-800 text-white p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-48 h-48 relative rounded-full overflow-hidden border-4 border-white shadow-lg">
                <Image
                  src="/profile/chethan.jpg"
                  alt="Chethan Kumar S"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-4xl font-bold mb-2">Chethan Kumar S</h2>
                <p className="text-xl text-green-100 mb-4">Managing Partner</p>
                <p className="text-green-100 text-lg leading-relaxed">
                  Highly skilled civil engineer with 20+ years of experience in construction management
                  and technical leadership across diverse construction projects.
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Professional Summary */}
            <section className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Professional Summary</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Chethan Kumar S is a distinguished civil engineer known for his technical expertise
                and innovative approach to construction challenges. As Managing Partner at Arivu Constructions,
                he oversees all technical aspects of projects, ensuring structural integrity, safety,
                and compliance with industry standards.
              </p>
              <p className="text-gray-700 leading-relaxed">
                His extensive experience in design optimization and construction
                methodologies has been instrumental in delivering complex projects on time and within budget.
                He is recognized for his ability to solve intricate engineering problems and implement
                cutting-edge construction technologies.
              </p>
            </section>

            {/* Experience */}
            <section className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Professional Experience</h3>
              <div className="space-y-6">
                <div className="border-l-4 border-green-500 pl-6">
                  <h4 className="text-lg font-semibold text-gray-900">Managing Partner</h4>
                  <p className="text-green-600 font-medium">Arivu Homes Private Limited (2026 - Present)</p>
                  <ul className="text-gray-700 mt-2 space-y-1">
                    <li>• Technical oversight of all construction projects</li>
                    <li>• Structural design review and optimization</li>
                    <li>• Quality control and safety management</li>
                    <li>• Engineering team leadership and development</li>
                    <li>• Client technical consultation and support</li>
                    <li>• Implementation of advanced construction technologies</li>
                  </ul>
                </div>

                <div className="border-l-4 border-gray-300 pl-6">
                  <h4 className="text-lg font-semibold text-gray-900">Project Manager</h4>
                  <p className="text-gray-600 font-medium">Aiikya Village Sarjapur. (2015-2020 & 2023-2025)</p>
                  <ul className="text-gray-700 mt-2 space-y-1">
                    <li>• Analyzed complex structural systems</li>
                    <li>• Supervised construction of high-rise buildings</li>
                    <li>• Conducted structural inspections and assessments</li>
                    <li>• Collaborated with architects and contractors</li>
                    <li>• Implemented seismic design principles</li>
                  </ul>
                </div>

                <div className="border-l-4 border-gray-300 pl-6">
                  <h4 className="text-lg font-semibold text-gray-900">Project Engineer</h4>
                  <p className="text-gray-600 font-medium"> Rocking Star Yash - House Renovation & Interior Works (2020 - 2022)</p>
                  <ul className="text-gray-700 mt-2 space-y-1">
                    <li>• Managed renovation & interior works of residential apartment Prestige Abshot</li>
                    <li>• Performed structural calculations and designs</li>
                    <li>• Coordinated with design teams and contractors</li>
                    <li>• Ensured compliance with building codes</li>
                    <li>• Managed the project from start to finish</li>
                  </ul>
                </div>

                <div className="border-l-4 border-gray-300 pl-6">
                  <h4 className="text-lg font-semibold text-gray-900">Site Engineer</h4>
                  <p className="text-gray-600 font-medium">Gopalan Enterprises (2005 - 2015)</p>
                  <ul className="text-gray-700 mt-2 space-y-1">
                    <li>• Supervised construction activities of 3 commercial malls, 15 multiplex and 3 miniplex screens</li>
                    <li>• Ensured quality control and safety standards</li>
                    <li>• Managed construction schedules and resources</li>
                    <li>• Coordinated with suppliers and subcontractors</li>
                    <li>• Prepared progress reports and documentation</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Education */}
            <section className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Education & Certifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Diploma in Civil Engineering</h4>
                  <p className="text-gray-600">Civil Engineering</p>
                  <p className="text-sm text-gray-500">Sri Jayachamarajendra Govt Polytechnic, Karnataka (2005)</p>
                </div>
              </div>
            </section>

            {/* Key Achievements */}
            <section className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Key Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <p className="text-gray-700">Supervised construction of 6+ high-rise buildings</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <p className="text-gray-700">Achieved 100% structural safety record across all projects</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <p className="text-gray-700">Implemented innovative foundation techniques saving 15% construction costs</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <p className="text-gray-700">Led technical team of 15+ engineers and technicians</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-700"><strong>Email:</strong> contact.arivuhomes@gmail.com</p>
                  <p className="text-gray-700"><strong>Phone:</strong> +91-81478-53990</p>
                </div>
                <div>
                  <p className="text-gray-700"><strong>LinkedIn:</strong> linkedin.com/in/chethankumars</p>
                  <p className="text-gray-700"><strong>Location:</strong> Bangalore, Karnataka</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
