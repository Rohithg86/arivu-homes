import Image from "next/image";
import Link from "next/link";

export default function TeamPage() {
  const teamMembers = [
    {
      name: "Rohith Gopal",
      role: "Managing Partner",
      bio: "Visionary leader with over 16+ years of experience in Project Management, Business Development, and strategic planning in the Bangalore construction industry.",
      image: "/profile/rohith.jpg",
      slug: "rohith-gopal",
      color: "blue",
      experience: "15+ Years",
      specialties: ["Strategic Planning", "Business Development", "Project Management", "Client Relations"]
    },
    {
      name: "Chethan Kumar S",
      role: "Chief Engineer",
      bio: "Highly skilled civil engineer with 20+ years of experience in construction management and technical leadership across diverse construction projects.",
      image: "/profile/chethan.jpg",
      slug: "chethan-kumar-s",
      color: "green",
      experience: "20+ Years",
      specialties: ["Construction Management", "Technical Leadership", "Quality Control", "Structural Analysis"]
    },
    {
      name: "Shashank D",
      role: "Senior Architect & Structural Engineer",
      bio: "Creative architect and structural engineer with 8+ years of experience in innovative design solutions, sustainable architecture, and integrated structural systems.",
      image: "/profile/shashank.jpg",
      slug: "shashank-d",
      color: "purple",
      experience: "8+ Years",
      specialties: ["Architectural Design", "Structural Engineering", "Sustainable Design", "Innovation"]
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return {
          gradient: "from-blue-500 to-blue-600",
          accent: "blue-500",
          hover: "hover:from-blue-600 hover:to-blue-700"
        };
      case "green":
        return {
          gradient: "from-green-500 to-green-600",
          accent: "green-500",
          hover: "hover:from-green-600 hover:to-green-700"
        };
      case "purple":
        return {
          gradient: "from-purple-500 to-purple-600",
          accent: "purple-500",
          hover: "hover:from-purple-600 hover:to-purple-700"
        };
      default:
        return {
          gradient: "from-gray-500 to-gray-600",
          accent: "gray-500",
          hover: "hover:from-gray-600 hover:to-gray-700"
        };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Team</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the experienced professionals behind Arivu Homes Private Limited. Our team combines 
              decades of expertise in construction, engineering, and architecture to deliver 
              exceptional results for every project.
            </p>
            <div className="mt-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Team Members */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => {
            const colors = getColorClasses(member.color);
            return (
              <Link 
                href={`/team/${member.slug}`} 
                key={member.slug}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                  {/* Image Section */}
                  <div className={`bg-gradient-to-r ${colors.gradient} ${colors.hover} transition-all duration-300 p-8`}>
                    <div className="flex flex-col items-center text-white">
                      <div className="w-32 h-32 relative rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                      <p className="text-lg opacity-90 mb-2">{member.role}</p>
                      <div className="bg-white bg-opacity-20 rounded-full px-3 py-1 text-sm">
                        {member.experience} Experience
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {member.bio}
                    </p>

                    {/* Specialties */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Key Specialties</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.specialties.map((specialty, index) => (
                          <span
                            key={index}
                            className={`bg-${colors.accent}-50 text-${colors.accent}-700 px-3 py-1 rounded-full text-sm`}
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* View Profile Button */}
                    <div className="mt-6">
                      <div className={`bg-${colors.accent}-600 text-white px-4 py-2 rounded-lg text-center group-hover:bg-${colors.accent}-700 transition-colors duration-300`}>
                        View Full Profile →
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Team Stats */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team by Numbers</h2>
            <p className="text-gray-600">Combined expertise and achievements</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">45+</div>
              <div className="text-gray-600">Years Combined Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">30+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">4+</div>
              <div className="text-gray-600">Professional Certifications</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">98%</div>
              <div className="text-gray-600">Client Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-gray-600">The principles that guide our team and work</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-600">We strive for the highest standards in every project, ensuring quality and precision in all our work.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Collaboration</h3>
              <p className="text-gray-600">We believe in working together with clients, partners, and team members to achieve shared goals.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600">We embrace new technologies and sustainable practices to create better, more efficient solutions.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Work with Our Team?</h2>
          <p className="text-blue-100 text-lg mb-8">
            Let our experienced team bring your construction vision to life. 
            Contact us today to discuss your project requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/projects" 
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              View Our Projects
            </Link>
            <Link 
              href="/boq" 
              className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-400 transition-colors"
            >
              Get Cost Estimate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
