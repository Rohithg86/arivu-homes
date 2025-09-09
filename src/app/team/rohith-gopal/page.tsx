import Image from "next/image";
import Link from "next/link";

export default function RohithGopalBio() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Rohith Gopal</h1>
              <p className="text-gray-600 mt-1">Managing Partner - Arivu Homes Private Limited</p>
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
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-48 h-48 relative rounded-full overflow-hidden border-4 border-white shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                  alt="Rohith Gopal"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-4xl font-bold mb-2">Rohith Gopal</h2>
                <p className="text-xl text-blue-100 mb-4">Managing Partner</p>
                <p className="text-blue-100 text-lg leading-relaxed">
                  Visionary leader with over 15 years of experience in construction management, 
                  business development, and strategic planning in the Bangalore construction industry.
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
                Rohith Gopal brings exceptional leadership and strategic vision to Arivu Constructions. 
                With a deep understanding of the construction industry and a passion for delivering 
                excellence, he has been instrumental in establishing Arivu as a trusted name in 
                Bangalore&apos;s construction landscape.
              </p>
              <p className="text-gray-700 leading-relaxed">
                His expertise spans across project management, client relations, business development, 
                and operational excellence. Under his leadership, Arivu Constructions has successfully 
                completed numerous residential and commercial projects, earning recognition for 
                quality, timeliness, and innovation.
              </p>
            </section>

            {/* Experience */}
            <section className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Professional Experience</h3>
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-6">
                  <h4 className="text-lg font-semibold text-gray-900">Managing Partner</h4>
                  <p className="text-blue-600 font-medium">Arivu Homes Private Limited (2020 - Present)</p>
                  <ul className="text-gray-700 mt-2 space-y-1">
                    <li>• Strategic planning and business development</li>
                    <li>• Client relationship management and project acquisition</li>
                    <li>• Financial planning and budget oversight</li>
                    <li>• Team leadership and organizational development</li>
                    <li>• Quality assurance and project delivery excellence</li>
                  </ul>
                </div>
                
                <div className="border-l-4 border-gray-300 pl-6">
                  <h4 className="text-lg font-semibold text-gray-900">Senior Project Manager</h4>
                  <p className="text-gray-600 font-medium">ABC Construction Ltd. (2015 - 2020)</p>
                  <ul className="text-gray-700 mt-2 space-y-1">
                    <li>• Managed multiple residential and commercial projects</li>
                    <li>• Coordinated with architects, engineers, and contractors</li>
                    <li>• Implemented quality control and safety protocols</li>
                    <li>• Budget management and cost optimization</li>
                  </ul>
                </div>

                <div className="border-l-4 border-gray-300 pl-6">
                  <h4 className="text-lg font-semibold text-gray-900">Construction Engineer</h4>
                  <p className="text-gray-600 font-medium">XYZ Builders (2010 - 2015)</p>
                  <ul className="text-gray-700 mt-2 space-y-1">
                    <li>• Site supervision and construction management</li>
                    <li>• Technical planning and execution</li>
                    <li>• Vendor management and procurement</li>
                    <li>• Quality assurance and compliance</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Education */}
            <section className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Education & Certifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Bachelor of Engineering</h4>
                  <p className="text-gray-600">Civil Engineering</p>
                  <p className="text-sm text-gray-500">Visvesvaraya Technological University (2008)</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Project Management Professional (PMP)</h4>
                  <p className="text-gray-600">Project Management Institute</p>
                  <p className="text-sm text-gray-500">Certified 2018</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Construction Management</h4>
                  <p className="text-gray-600">Indian Institute of Management</p>
                  <p className="text-sm text-gray-500">Executive Program 2016</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Safety Management</h4>
                  <p className="text-gray-600">National Safety Council</p>
                  <p className="text-sm text-gray-500">Certified 2019</p>
                </div>
              </div>
            </section>

            {/* Key Achievements */}
            <section className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Key Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <p className="text-gray-700">Led successful completion of 50+ residential and commercial projects</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <p className="text-gray-700">Achieved 98% client satisfaction rate across all projects</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <p className="text-gray-700">Implemented sustainable construction practices reducing environmental impact by 30%</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <p className="text-gray-700">Established strategic partnerships with leading suppliers and contractors</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <p className="text-gray-700">Developed innovative project management methodologies</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <p className="text-gray-700">Mentored and developed 20+ construction professionals</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-700"><strong>Email:</strong> rohith@arivuhomes.com</p>
                  <p className="text-gray-700"><strong>Phone:</strong> +91-98765-43210</p>
                </div>
                <div>
                  <p className="text-gray-700"><strong>LinkedIn:</strong> linkedin.com/in/rohithgopal</p>
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
