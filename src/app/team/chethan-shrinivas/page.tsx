import Image from "next/image";
import Link from "next/link";

export default function ChethanShrinivasBio() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Chethan Shrinivas</h1>
              <p className="text-gray-600 mt-1">Chief Engineer - Arivu Homes Private Limited</p>
            </div>
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-green-600 to-green-800 text-white p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-48 h-48 relative rounded-full overflow-hidden border-4 border-white shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
                  alt="Chethan Shrinivas"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-4xl font-bold mb-2">Chethan Shrinivas</h2>
                <p className="text-xl text-green-100 mb-4">Chief Engineer</p>
                <p className="text-green-100 text-lg leading-relaxed">
                  Highly skilled civil engineer with 18+ years of experience in structural design, 
                  construction management, and technical leadership across diverse construction projects.
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
                Chethan Shrinivas is a distinguished civil engineer known for his technical expertise 
                and innovative approach to construction challenges. As Chief Engineer at Arivu Constructions, 
                he oversees all technical aspects of projects, ensuring structural integrity, safety, 
                and compliance with industry standards.
              </p>
              <p className="text-gray-700 leading-relaxed">
                His extensive experience in structural analysis, design optimization, and construction 
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
                  <h4 className="text-lg font-semibold text-gray-900">Chief Engineer</h4>
                  <p className="text-green-600 font-medium">Arivu Homes Private Limited (2020 - Present)</p>
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
                  <h4 className="text-lg font-semibold text-gray-900">Senior Structural Engineer</h4>
                  <p className="text-gray-600 font-medium">Metro Construction Ltd. (2015 - 2020)</p>
                  <ul className="text-gray-700 mt-2 space-y-1">
                    <li>• Designed and analyzed complex structural systems</li>
                    <li>• Supervised construction of high-rise buildings</li>
                    <li>• Conducted structural inspections and assessments</li>
                    <li>• Collaborated with architects and contractors</li>
                    <li>• Implemented seismic design principles</li>
                  </ul>
                </div>

                <div className="border-l-4 border-gray-300 pl-6">
                  <h4 className="text-lg font-semibold text-gray-900">Project Engineer</h4>
                  <p className="text-gray-600 font-medium">Infrastructure Solutions Pvt. Ltd. (2010 - 2015)</p>
                  <ul className="text-gray-700 mt-2 space-y-1">
                    <li>• Managed construction of residential complexes</li>
                    <li>• Performed structural calculations and designs</li>
                    <li>• Coordinated with design teams and contractors</li>
                    <li>• Ensured compliance with building codes</li>
                    <li>• Conducted site investigations and soil testing</li>
                  </ul>
                </div>

                <div className="border-l-4 border-gray-300 pl-6">
                  <h4 className="text-lg font-semibold text-gray-900">Site Engineer</h4>
                  <p className="text-gray-600 font-medium">BuildTech Engineers (2006 - 2010)</p>
                  <ul className="text-gray-700 mt-2 space-y-1">
                    <li>• Supervised construction activities on-site</li>
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
                  <h4 className="font-semibold text-gray-900">Master of Technology</h4>
                  <p className="text-gray-600">Structural Engineering</p>
                  <p className="text-sm text-gray-500">Indian Institute of Technology, Delhi (2006)</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Bachelor of Engineering</h4>
                  <p className="text-gray-600">Civil Engineering</p>
                  <p className="text-sm text-gray-500">Bangalore University (2004)</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Professional Engineer (PE)</h4>
                  <p className="text-gray-600">Civil Engineering</p>
                  <p className="text-sm text-gray-500">Licensed 2012</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Advanced Structural Analysis</h4>
                  <p className="text-gray-600">ETABS & SAP2000</p>
                  <p className="text-sm text-gray-500">Certified 2018</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Seismic Design</h4>
                  <p className="text-gray-600">IS 1893 & IS 13920</p>
                  <p className="text-sm text-gray-500">Certified 2019</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Green Building Design</h4>
                  <p className="text-gray-600">IGBC Accredited Professional</p>
                  <p className="text-sm text-gray-500">Certified 2020</p>
                </div>
              </div>
            </section>

            {/* Technical Expertise */}
            <section className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Technical Expertise</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Software Proficiency</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-700">ETABS</span>
                      <span className="text-green-600 font-medium">Expert</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">SAP2000</span>
                      <span className="text-green-600 font-medium">Expert</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">STAAD.Pro</span>
                      <span className="text-green-600 font-medium">Advanced</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">AutoCAD</span>
                      <span className="text-green-600 font-medium">Expert</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Revit Structure</span>
                      <span className="text-green-600 font-medium">Advanced</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Specializations</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">High-rise Building Design</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">Seismic Analysis & Design</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">Foundation Engineering</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">Pre-stressed Concrete</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">Steel Structure Design</span>
                    </div>
                  </div>
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
                    <p className="text-gray-700">Designed and supervised construction of 30+ high-rise buildings</p>
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
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <p className="text-gray-700">Published 5 technical papers in construction journals</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <p className="text-gray-700">Received Excellence in Engineering Award 2022</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-700"><strong>Email:</strong> chethan@arivuhomes.com</p>
                  <p className="text-gray-700"><strong>Phone:</strong> +91-98765-43211</p>
                </div>
                <div>
                  <p className="text-gray-700"><strong>LinkedIn:</strong> linkedin.com/in/chethanshrinivas</p>
                  <p className="text-gray-700"><strong>Location:</strong> Bangalore, Karnataka</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
