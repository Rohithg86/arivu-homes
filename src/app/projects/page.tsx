"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface Project {
  id: number;
  name: string;
  location: string;
  type: string;
  startDate: string;
  expectedCompletion: string;
  completionPercentage: number;
  status: "Planning" | "In Progress" | "Near Completion" | "Completed";
  description: string;
  images: string[];
  budget: number;
  actualCost: number;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [currentUploadIndex, setCurrentUploadIndex] = useState<number | null>(null);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    name: "",
    location: "",
    type: "",
    startDate: "",
    expectedCompletion: "",
    completionPercentage: 0,
    status: "Planning",
    description: "",
    images: [],
    budget: 0,
    actualCost: 0,
  });

  // Sample data for demonstration
  useEffect(() => {
    setProjects([
      {
        id: 1,
        name: "Luxury Villa - Whitefield",
        location: "Whitefield, Bangalore",
        type: "Residential",
        startDate: "2024-01-15",
        expectedCompletion: "2024-12-30",
        completionPercentage: 75,
        status: "In Progress",
        description: "Modern luxury villa with smart home features and sustainable design.",
        images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400"],
        budget: 25000000,
        actualCost: 18750000,
      },
      {
        id: 2,
        name: "Commercial Complex - Koramangala",
        location: "Koramangala, Bangalore",
        type: "Commercial",
        startDate: "2024-03-01",
        expectedCompletion: "2025-06-15",
        completionPercentage: 45,
        status: "In Progress",
        description: "Multi-story commercial complex with retail and office spaces.",
        images: ["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400"],
        budget: 50000000,
        actualCost: 22500000,
      },
      {
        id: 3,
        name: "Apartment Renovation - Indiranagar",
        location: "Indiranagar, Bangalore",
        type: "Renovation",
        startDate: "2024-02-10",
        expectedCompletion: "2024-08-20",
        completionPercentage: 90,
        status: "Near Completion",
        description: "Complete renovation of 3BHK apartment with modern interiors.",
        images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400"],
        budget: 1500000,
        actualCost: 1350000,
      },
    ]);
  }, []);

  const handleAddProject = () => {
    if (newProject.name && newProject.location) {
      const project: Project = {
        id: projects.length + 1,
        name: newProject.name!,
        location: newProject.location!,
        type: newProject.type!,
        startDate: newProject.startDate!,
        expectedCompletion: newProject.expectedCompletion!,
        completionPercentage: newProject.completionPercentage!,
        status: newProject.status!,
        description: newProject.description!,
        images: newProject.images!,
        budget: newProject.budget!,
        actualCost: newProject.actualCost!,
      };
      setProjects([...projects, project]);
      setNewProject({
        name: "",
        location: "",
        type: "",
        startDate: "",
        expectedCompletion: "",
        completionPercentage: 0,
        status: "Planning",
        description: "",
        images: [],
        budget: 0,
        actualCost: 0,
      });
      setShowAddForm(false);
    }
  };

  const handleUploadImage = (projectIndex: number) => {
    setCurrentUploadIndex(projectIndex);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (currentUploadIndex === null) return;
    const input = e.target;
    if (!input.files || input.files.length === 0) return;
    const file = input.files[0];
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const parts = result.split(',');
        resolve(parts[1] ?? '');
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'SITE_PHOTO',
        title: projects[currentUploadIndex].name,
        description: 'Project image',
        fileName: file.name,
        fileBase64: `data:${file.type};base64,${base64}`,
      })
    });
    const data = await res.json();
    if (res.ok && data.url) {
      const updated = [...projects];
      updated[currentUploadIndex].images = [data.url, ...updated[currentUploadIndex].images];
      setProjects(updated);
    }
    input.value = '';
    setCurrentUploadIndex(null);
  };

  // Inline edit handlers can be added here when needed.

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Planning": return "bg-yellow-100 text-yellow-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Near Completion": return "bg-orange-100 text-orange-800";
      case "Completed": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Current Projects</h1>
              <p className="text-gray-600 mt-1">Track ongoing construction projects in Bangalore</p>
            </div>
            <div className="flex gap-3">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                ← Back to Home
              </Link>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Add New Project
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Project Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Add New Project</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                <input
                  type="text"
                  value={newProject.name}
                  onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Enter project name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={newProject.location}
                  onChange={(e) => setNewProject({...newProject, location: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Enter location"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
                <select
                  value={newProject.type}
                  onChange={(e) => setNewProject({...newProject, type: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="">Select type</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Renovation">Renovation</option>
                  <option value="Infrastructure">Infrastructure</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={newProject.status}
                  onChange={(e) => setNewProject({...newProject, status: e.target.value as "Planning" | "In Progress" | "Near Completion" | "Completed"})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="Planning">Planning</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Near Completion">Near Completion</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  value={newProject.startDate}
                  onChange={(e) => setNewProject({...newProject, startDate: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expected Completion</label>
                <input
                  type="date"
                  value={newProject.expectedCompletion}
                  onChange={(e) => setNewProject({...newProject, expectedCompletion: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Completion %</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={newProject.completionPercentage}
                  onChange={(e) => setNewProject({...newProject, completionPercentage: parseInt(e.target.value)})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Budget (₹)</label>
                <input
                  type="number"
                  value={newProject.budget}
                  onChange={(e) => setNewProject({...newProject, budget: parseInt(e.target.value)})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Enter budget"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  rows={3}
                  placeholder="Enter project description"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddProject}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Add Project
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.map((project) => (
            <div key={project.id} className="glass-card rounded-lg shadow-md overflow-hidden">
              {project.images.length > 0 && (
                <div className="h-48 relative">
                  <Image
                    src={project.images[0]}
                    alt={project.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-2">{project.location}</p>
                <p className="text-gray-500 text-sm mb-3">{project.type}</p>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{project.completionPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.completionPercentage}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-gray-600">Budget:</span>
                    <input
                      type="number"
                      value={project.budget}
                      onChange={(e)=>{
                        const updated=[...projects];
                        updated.find(p=>p.id===project.id)!.budget = Number(e.target.value);
                        setProjects(updated);
                      }}
                      className="w-28 border rounded px-2 py-1 text-right"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-gray-600">Spent:</span>
                    <input
                      type="number"
                      value={project.actualCost}
                      onChange={(e)=>{
                        const updated=[...projects];
                        updated.find(p=>p.id===project.id)!.actualCost = Number(e.target.value);
                        setProjects(updated);
                      }}
                      className="w-28 border rounded px-2 py-1 text-right"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-gray-600">Name:</span>
                    <input
                      type="text"
                      value={project.name}
                      onChange={(e)=>{
                        const updated=[...projects];
                        updated.find(p=>p.id===project.id)!.name = e.target.value;
                        setProjects(updated);
                      }}
                      className="w-48 border rounded px-2 py-1"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-gray-600">Location:</span>
                    <input
                      type="text"
                      value={project.location}
                      onChange={(e)=>{
                        const updated=[...projects];
                        updated.find(p=>p.id===project.id)!.location = e.target.value;
                        setProjects(updated);
                      }}
                      className="w-48 border rounded px-2 py-1"
                    />
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <p className="text-gray-600 text-sm">{project.description}</p>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button className="bg-blue-50 text-blue-600 px-3 py-2 rounded text-sm hover:bg-blue-100">
                    View Details
                  </button>
                  <button className="bg-gray-50 text-gray-600 px-3 py-2 rounded text-sm hover:bg-gray-100" onClick={()=>handleUploadImage(projects.findIndex(p=>p.id===project.id))}>
                    Upload Image
                  </button>
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🏗️</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
            <p className="text-gray-600 mb-4">Start by adding your first construction project</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Add Project
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
