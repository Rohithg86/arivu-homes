import Image from "next/image";
import Link from "next/link";

export default function ShashankDBio() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Shashank D</h1>
              <p className="text-gray-600 mt-1">Senior Architect & Structural Engineer - Arivu Homes Private Limited</p>
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
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-48 h-48 relative rounded-full overflow-hidden border-4 border-white shadow-lg">
                <Image
                  src="/profile/shashank.jpg"
                  alt="Shashank D"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-4xl font-bold mb-2">Shashank D</h2>
                <p className="text-xl text-purple-100 mb-4">Senior Architect & Structural Engineer</p>
                <p className="text-purple-100 text-lg leading-relaxed">
                  Creative architect and structural engineer with 8+ years of experience in innovative 
                  design solutions, sustainable architecture, and integrated structural systems.
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
                Shashank D is a visionary architect and structural engineer who seamlessly blends 
                creative design with technical excellence. His unique dual expertise in architecture 
                and structural engineering allows him to create innovative, sustainable, and 
                structurally sound buildings that exceed client expectations.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Known for his forward-thinking approach to design and his ability to integrate 
                modern architectural trends with structural efficiency, Shashank has been instrumental 
                in establishing Arivu Constructions as a leader in innovative construction solutions. 
                His designs prioritize sustainability, functionality, and aesthetic appeal.
              </p>
            </section>

            {/* Experience */}
            <section className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Professional Experience</h3>
              <div className="space-y-6">
                <div className="border-l-4 border-purple-500 pl-6">
                  <h4 className="text-lg font-semibold text-gray-900">Senior Architect & Structural Engineer</h4>
                  <p className="text-purple-600 font-medium">Arivu Homes Private Limited (2020 - Present)</p>
                  <ul className="text-gray-700 mt-2 space-y-1">
                    <li>• Lead architectural design and structural engineering for all projects</li>
                    <li>• Develop innovative design solutions and sustainable building practices</li>
                    <li>• Coordinate between architectural vision and structural requirements</li>
                    <li>• Mentor junior architects and engineers</li>
                    <li>• Client consultation and design presentations</li>
                    <li>• Implementation of green building technologies</li>
                  </ul>
                </div>
                
                <div className="border-l-4 border-gray-300 pl-6">
                  <h4 className="text-lg font-semibold text-gray-900">Principal Architect</h4>
                  <p className="text-gray-600 font-medium">Design Studio Architects (2016 - 2020)</p>
                  <ul className="text-gray-700 mt-2 space-y-1">
                    <li>• Designed luxury residential and commercial projects</li>
                    <li>• Led design teams and managed project portfolios</li>
                    <li>• Developed sustainable design strategies</li>
                    <li>• Client relationship management and presentations</li>
                    <li>• Collaborated with structural engineers and contractors</li>
                  </ul>
                </div>

                <div className="border-l-4 border-gray-300 pl-6">
                  <h4 className="text-lg font-semibold text-gray-900">Senior Structural Engineer</h4>
                  <p className="text-gray-600 font-medium">TechStruct Engineering (2012 - 2016)</p>
                  <ul className="text-gray-700 mt-2 space-y-1">
                    <li>• Designed complex structural systems for commercial buildings</li>
                    <li>• Performed structural analysis and optimization</li>
                    <li>• Collaborated with architects on integrated design solutions</li>
                    <li>• Conducted structural inspections and assessments</li>
                    <li>• Implemented advanced structural technologies</li>
                  </ul>
                </div>

                <div className="border-l-4 border-gray-300 pl-6">
                  <h4 className="text-lg font-semibold text-gray-900">Architectural Designer</h4>
                  <p className="text-gray-600 font-medium">Urban Design Associates (2008 - 2012)</p>
                  <ul className="text-gray-700 mt-2 space-y-1">
                    <li>• Designed residential and institutional buildings</li>
                    <li>• Created detailed architectural drawings and specifications</li>
                    <li>• Participated in design competitions and won multiple awards</li>
                    <li>• Developed 3D models and renderings</li>
                    <li>• Coordinated with consultants and contractors</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Education */}
            <section className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Education & Certifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Master of Architecture</h4>
                  <p className="text-gray-600">Sustainable Design</p>
                  <p className="text-sm text-gray-500">School of Planning & Architecture, Delhi (2008)</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Bachelor of Architecture</h4>
                  <p className="text-gray-600">Architecture</p>
                  <p className="text-sm text-gray-500">Anna University, Chennai (2006)</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Professional Engineer (PE)</h4>
                  <p className="text-gray-600">Structural Engineering</p>
                  <p className="text-sm text-gray-500">Licensed 2014</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900">LEED Accredited Professional</h4>
                  <p className="text-gray-600">Green Building Design</p>
                  <p className="text-sm text-gray-500">USGBC Certified 2019</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900">IGBC Accredited Professional</h4>
                  <p className="text-gray-600">Green Building Certification</p>
                  <p className="text-sm text-gray-500">IGBC Certified 2020</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900">BIM Professional</h4>
                  <p className="text-gray-600">Revit Architecture & Structure</p>
                  <p className="text-sm text-gray-500">Autodesk Certified 2021</p>
                </div>
              </div>
            </section>

            {/* Design Philosophy */}
            <section className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Design Philosophy</h3>
              <div className="bg-purple-50 p-6 rounded-lg">
                <blockquote className="text-lg italic text-gray-700 mb-4">
                  &ldquo;Architecture is not just about creating beautiful spaces; it&apos;s about creating 
                  spaces that enhance human experience while respecting the environment and 
                  ensuring structural integrity. Every design should tell a story and serve 
                  a purpose beyond aesthetics.&rdquo;
                </blockquote>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Core Principles</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Sustainable and environmentally conscious design</li>
                      <li>• Integration of form and function</li>
                      <li>• Client-centric approach to design solutions</li>
                      <li>• Innovation in structural systems</li>
                      <li>• Cultural sensitivity and contextual design</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Design Approach</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Collaborative design process</li>
                      <li>• Evidence-based design decisions</li>
                      <li>• Technology integration for efficiency</li>
                      <li>• Cost-effective solutions without compromise</li>
                      <li>• Future-proof and adaptable designs</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Technical Expertise */}
            <section className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Technical Expertise</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Design Software</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-700">AutoCAD</span>
                      <span className="text-purple-600 font-medium">Expert</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Revit Architecture</span>
                      <span className="text-purple-600 font-medium">Expert</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">SketchUp</span>
                      <span className="text-purple-600 font-medium">Advanced</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">3ds Max</span>
                      <span className="text-purple-600 font-medium">Advanced</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Photoshop</span>
                      <span className="text-purple-600 font-medium">Advanced</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Structural Software</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-700">ETABS</span>
                      <span className="text-purple-600 font-medium">Expert</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">SAP2000</span>
                      <span className="text-purple-600 font-medium">Expert</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">STAAD.Pro</span>
                      <span className="text-purple-600 font-medium">Advanced</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Revit Structure</span>
                      <span className="text-purple-600 font-medium">Expert</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Tekla Structures</span>
                      <span className="text-purple-600 font-medium">Intermediate</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Notable Projects */}
            <section className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Notable Projects</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold text-gray-900">Eco-Luxury Villa Complex</h4>
                    <p className="text-gray-600 text-sm">Whitefield, Bangalore</p>
                    <p className="text-gray-700 text-sm">Sustainable luxury villas with integrated solar systems and rainwater harvesting</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold text-gray-900">Smart Office Complex</h4>
                    <p className="text-gray-600 text-sm">Koramangala, Bangalore</p>
                    <p className="text-gray-700 text-sm">LEED Platinum certified office building with smart building technologies</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold text-gray-900">Heritage Restoration Project</h4>
                    <p className="text-gray-600 text-sm">Malleshwaram, Bangalore</p>
                    <p className="text-gray-700 text-sm">Restoration and adaptive reuse of heritage building</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold text-gray-900">Modular Housing Development</h4>
                    <p className="text-gray-600 text-sm">Electronic City, Bangalore</p>
                    <p className="text-gray-700 text-sm">Innovative modular construction for affordable housing</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold text-gray-900">Mixed-Use Development</h4>
                    <p className="text-gray-600 text-sm">Indiranagar, Bangalore</p>
                    <p className="text-gray-700 text-sm">Integrated residential and commercial complex with green spaces</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold text-gray-900">Educational Campus</h4>
                    <p className="text-gray-600 text-sm">Hebbal, Bangalore</p>
                    <p className="text-gray-700 text-sm">Modern educational facility with sustainable design features</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Awards & Recognition */}
            <section className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Awards & Recognition</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <p className="text-gray-700">Best Sustainable Design Award - Karnataka State Architecture Awards 2023</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <p className="text-gray-700">Innovation in Construction Award - BuildTech India 2022</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <p className="text-gray-700">Excellence in Green Building Design - IGBC Awards 2021</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <p className="text-gray-700">Young Architect of the Year - Indian Institute of Architects 2020</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <p className="text-gray-700">Best Residential Project - Bangalore Real Estate Awards 2019</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <p className="text-gray-700">Published 8 research papers in architectural journals</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-700"><strong>Email:</strong> shashank@arivuhomes.com</p>
                  <p className="text-gray-700"><strong>Phone:</strong> +91-98765-43212</p>
                </div>
                <div>
                  <p className="text-gray-700"><strong>LinkedIn:</strong> linkedin.com/in/shashankd</p>
                  <p className="text-gray-700"><strong>Portfolio:</strong> shashankd.design</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
