"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface Project {
  id: number;
  name: string;
  location: string;
  client?: string;
  type: string;
  startDate: string;
  expectedCompletion: string;
  completionPercentage: number;
  status: string;
  description: string;
  images: string[];
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [currentUploadIndex, setCurrentUploadIndex] = useState<number | null>(null);
  const [dirtyById, setDirtyById] = useState<Record<number, boolean>>({});
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailsProjectId, setDetailsProjectId] = useState<number | null>(null);
  const [detailsImageIndex, setDetailsImageIndex] = useState(0);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    name: "",
    location: "",
    client: "",
    type: "",
    startDate: "",
    expectedCompletion: "",
    completionPercentage: 0,
    status: "Planning",
    description: "",
    images: [],
  });

  useEffect(() => {
    (async () => {
      const [projectsRes, meRes] = await Promise.all([
        fetch("/api/projects"),
        fetch("/api/admin/me"),
      ]);
      if (projectsRes.ok) {
        const data = (await projectsRes.json()) as unknown as Array<Partial<Project>>;
        const normalized = data.map((p) => ({
          id: Number(p.id),
          name: String(p.name ?? ""),
          location: String(p.location ?? ""),
          client: (p.client ?? "") as string,
          type: String(p.type ?? ""),
          startDate: String(p.startDate ?? ""),
          expectedCompletion: String(p.expectedCompletion ?? ""),
          completionPercentage: Number(p.completionPercentage ?? 0),
          status: String(p.status ?? "Planning"),
          description: String(p.description ?? ""),
          images: Array.isArray(p.images) ? (p.images as string[]) : [],
        }));
        setProjects(normalized as Project[]);
      }
      if (meRes.ok) {
        const me = (await meRes.json()) as { isAdmin: boolean };
        setIsAdmin(!!me.isAdmin);
      }
    })();
  }, []);

  const isFeaturedProject = (project: Project) => {
    const t = `${project.name} ${project.location}`.toLowerCase();
    return t.includes("jigani") || t.includes("magadi");
  };

  const renderProjectImages = (project: Project) => {
    if (!project.images || project.images.length === 0) return null;
    return (
      <div className="space-y-2">
        <button
          type="button"
          className="h-48 relative w-full block"
          onClick={() => openDetails(project.id, 0)}
          title="Open gallery"
        >
          <Image src={project.images[0]} alt={project.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute bottom-2 left-3 text-xs font-medium text-white">
            {project.images.length} photo{project.images.length === 1 ? "" : "s"} — click to open
          </div>
        </button>

        {project.images.length > 1 && (
          <div className="px-6">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {project.images.map((src, idx) => (
                <button
                  key={`${project.id}-thumb-${idx}`}
                  type="button"
                  className="relative h-12 w-16 flex-none overflow-hidden rounded border hover:opacity-90"
                  onClick={() => openDetails(project.id, idx)}
                  title={`Open image ${idx + 1}`}
                >
                  <Image src={src} alt={`${project.name} ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
            {isFeaturedProject(project) && (
              <div className="text-xs text-gray-500 mt-1">All site photos shown for Jigani/Magadi</div>
            )}
          </div>
        )}
      </div>
    );
  };

  const openDetails = (projectId: number, imageIndex = 0) => {
    setDetailsProjectId(projectId);
    setDetailsImageIndex(imageIndex);
    setDetailsOpen(true);
  };

  const updateProjectLocal = (projectId: number, patch: Partial<Project>) => {
    setProjects((prev) => prev.map((p) => (p.id === projectId ? { ...p, ...patch } : p)));
    setDirtyById((prev) => ({ ...prev, [projectId]: true }));
  };

  const saveProject = async (projectId: number) => {
    if (!isAdmin) return;
    const project = projects.find((p) => p.id === projectId);
    if (!project) return;

    const res = await fetch("/api/projects", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: project.id,
        name: project.name,
        location: project.location,
        client: project.client ?? "",
        type: project.type ?? "",
        startDate: project.startDate ?? "",
        expectedCompletion: project.expectedCompletion ?? "",
        completionPercentage: Number(project.completionPercentage ?? 0),
        status: project.status ?? "Planning",
        description: project.description ?? "",
        images: Array.isArray(project.images) ? project.images : [],
      }),
    });

    if (res.ok) {
      setDirtyById((prev) => ({ ...prev, [projectId]: false }));
    }
  };

  const handleAddProject = async () => {
    if (!isAdmin) return;
    if (newProject.name && newProject.location) {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newProject.name,
          location: newProject.location,
          client: newProject.client ?? "",
          type: newProject.type ?? "",
          startDate: newProject.startDate ?? "",
          expectedCompletion: newProject.expectedCompletion ?? "",
          completionPercentage: Number(newProject.completionPercentage ?? 0),
          status: newProject.status ?? "Planning",
          description: newProject.description ?? "",
          images: Array.isArray(newProject.images) ? newProject.images : [],
        }),
      });

      if (res.ok) {
        const created = (await res.json().catch(() => null)) as Project | null;
        if (created) {
          setProjects((prev) => [created, ...prev]);
        }
        setNewProject({
          name: "",
          location: "",
          client: "",
          type: "",
          startDate: "",
          expectedCompletion: "",
          completionPercentage: 0,
          status: "Planning",
          description: "",
          images: [],
        });
        setShowAddForm(false);
      }
    }
  };

  const handleUploadImage = (projectIndex: number) => {
    if (!isAdmin) return;
    setCurrentUploadIndex(projectIndex);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isAdmin) return;
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
      const project = projects[currentUploadIndex];
      const nextImages = [data.url, ...(project?.images ?? [])];
      updateProjectLocal(project.id, { images: nextImages });
      await saveProject(project.id);
    }
    input.value = '';
    setCurrentUploadIndex(null);
  };

  // Inline edit handlers can be added here when needed.

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ongoing": return "bg-blue-100 text-blue-800";
      case "Planning": return "bg-yellow-100 text-yellow-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Near Completion": return "bg-orange-100 text-orange-800";
      case "Completed": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const ongoingProjects = projects.filter((p) => p.status !== "Completed");
  const completedProjects = projects.filter((p) => p.status === "Completed");
  const detailsProject = detailsProjectId ? projects.find((p) => p.id === detailsProjectId) ?? null : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Current Projects</h1>
              <p className="text-gray-600 mt-1">Our ongoing projects in Bangalore</p>
            </div>
            <div className="flex gap-3">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                ← Back to Home
              </Link>
              {isAdmin && (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Add New Project
                </button>
              )}
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
                  onChange={(e) => setNewProject({...newProject, status: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="Planning">Planning</option>
                  <option value="Ongoing">Ongoing</option>
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
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Ongoing Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {ongoingProjects.map((project) => (
            <div key={project.id} className="glass-card rounded-lg shadow-md overflow-hidden">
              {renderProjectImages(project)}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                
                <div className="space-y-2 mb-3 text-sm">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-gray-600">Client</span>
                    {isAdmin ? (
                      <input
                        className="border rounded px-2 py-1 w-40"
                        value={project.client ?? ""}
                        onChange={(e) => updateProjectLocal(project.id, { client: e.target.value })}
                      />
                    ) : (
                      <span className="text-gray-800">{project.client ?? "-"}</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-gray-600">Location</span>
                    {isAdmin ? (
                      <input
                        className="border rounded px-2 py-1 w-40"
                        value={project.location}
                        onChange={(e) => updateProjectLocal(project.id, { location: e.target.value })}
                      />
                    ) : (
                      <span className="text-gray-800">{project.location}</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-gray-600">Type</span>
                    {isAdmin ? (
                      <input
                        className="border rounded px-2 py-1 w-40"
                        value={project.type}
                        onChange={(e) => updateProjectLocal(project.id, { type: e.target.value })}
                      />
                    ) : (
                      <span className="text-gray-800">{project.type}</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-gray-600">Completion (Estd)</span>
                    {isAdmin ? (
                      <input
                        type="date"
                        className="border rounded px-2 py-1"
                        value={project.expectedCompletion}
                        onChange={(e) => updateProjectLocal(project.id, { expectedCompletion: e.target.value })}
                      />
                    ) : (
                      <span className="text-gray-800">{project.expectedCompletion || "-"}</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-gray-600">Start Date</span>
                    {isAdmin ? (
                      <input
                        type="date"
                        className="border rounded px-2 py-1"
                        value={project.startDate}
                        onChange={(e) => updateProjectLocal(project.id, { startDate: e.target.value })}
                      />
                    ) : (
                      <span className="text-gray-800">{project.startDate || "-"}</span>
                    )}
                  </div>
                  {isAdmin && (
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-gray-600">Status</span>
                      <select
                        className="border rounded px-2 py-1"
                        value={project.status}
                        onChange={(e) => updateProjectLocal(project.id, { status: e.target.value })}
                      >
                        <option value="Planning">Planning</option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Near Completion">Near Completion</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  )}
                </div>
                
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
                  {isAdmin && (
                    <div className="mt-2 flex items-center justify-between gap-2 text-sm">
                      <span className="text-gray-600">Update %</span>
                      <input
                        type="number"
                        min={0}
                        max={100}
                        className="border rounded px-2 py-1 w-24"
                        value={project.completionPercentage}
                        onChange={(e) => updateProjectLocal(project.id, { completionPercentage: Number(e.target.value) })}
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-gray-600">Name:</span>
                    {isAdmin ? (
                      <input
                        type="text"
                        value={project.name}
                        onChange={(e) => updateProjectLocal(project.id, { name: e.target.value })}
                        className="w-48 border rounded px-2 py-1"
                      />
                    ) : (
                      <span className="text-gray-800 font-medium">{project.name}</span>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  {isAdmin ? (
                    <textarea
                      className="w-full border rounded px-2 py-1 text-sm"
                      rows={3}
                      value={project.description}
                      onChange={(e) => updateProjectLocal(project.id, { description: e.target.value })}
                    />
                  ) : (
                    <p className="text-gray-600 text-sm">{project.description}</p>
                  )}
                </div>

                {isAdmin && (
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      className="bg-gray-50 text-gray-600 px-3 py-2 rounded text-sm hover:bg-gray-100"
                      onClick={() => handleUploadImage(projects.findIndex((p) => p.id === project.id))}
                    >
                      Upload Image
                    </button>
                    <button
                      type="button"
                      disabled={!dirtyById[project.id]}
                      className="bg-black text-white px-3 py-2 rounded text-sm disabled:opacity-60"
                      onClick={() => saveProject(project.id)}
                    >
                      Save Changes
                    </button>
                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-4">Completed Projects</h2>
        {completedProjects.length === 0 ? (
          <div className="rounded-xl border bg-white p-6 text-gray-600">
            Completed projects will be listed here.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {completedProjects.map((project) => (
              <div key={project.id} className="glass-card rounded-lg shadow-md overflow-hidden">
                {renderProjectImages(project)}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{project.location}</p>
                  {isAdmin && (
                    <div className="mt-4">
                      <button
                        type="button"
                        disabled={!dirtyById[project.id]}
                        className="w-full bg-black text-white px-3 py-2 rounded text-sm disabled:opacity-60"
                        onClick={() => saveProject(project.id)}
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {projects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🏗️</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
            <p className="text-gray-600 mb-4">Start by adding your first construction project</p>
            {isAdmin && (
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Add Project
              </button>
            )}
          </div>
        )}
      </div>

      {/* Details modal with full image gallery */}
      {detailsOpen && detailsProject && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setDetailsOpen(false)} />
          <div className="relative w-full sm:max-w-4xl bg-white rounded-t-2xl sm:rounded-2xl shadow-xl border overflow-hidden">
            <div className="flex items-start justify-between gap-4 p-4 sm:p-5 border-b">
              <div>
                <div className="text-lg font-semibold">{detailsProject.name}</div>
                <div className="text-sm text-gray-600">{detailsProject.location}</div>
              </div>
              <button
                type="button"
                className="text-sm text-gray-500 hover:text-gray-900"
                onClick={() => setDetailsOpen(false)}
              >
                Close
              </button>
            </div>

            <div className="p-4 sm:p-5">
              {detailsProject.images.length === 0 ? (
                <div className="text-sm text-gray-600">No images yet.</div>
              ) : (
                <div className="grid gap-4">
                  <div className="relative w-full aspect-[16/9] bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={detailsProject.images[Math.min(detailsImageIndex, detailsProject.images.length - 1)]}
                      alt={`${detailsProject.name} image`}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <button
                      type="button"
                      className="px-3 py-1 rounded border hover:bg-gray-50 disabled:opacity-50"
                      disabled={detailsImageIndex <= 0}
                      onClick={() => setDetailsImageIndex((i) => Math.max(0, i - 1))}
                    >
                      Prev
                    </button>
                    <div>
                      {detailsImageIndex + 1} / {detailsProject.images.length}
                    </div>
                    <button
                      type="button"
                      className="px-3 py-1 rounded border hover:bg-gray-50 disabled:opacity-50"
                      disabled={detailsImageIndex >= detailsProject.images.length - 1}
                      onClick={() => setDetailsImageIndex((i) => Math.min(detailsProject.images.length - 1, i + 1))}
                    >
                      Next
                    </button>
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {detailsProject.images.map((src, idx) => (
                      <button
                        key={`${detailsProject.id}-thumb-${idx}`}
                        type="button"
                        className={`relative h-14 w-20 flex-none overflow-hidden rounded border ${
                          idx === detailsImageIndex ? "ring-2 ring-blue-600" : ""
                        }`}
                        onClick={() => setDetailsImageIndex(idx)}
                        title={`Image ${idx + 1}`}
                      >
                        <Image src={src} alt={`${detailsProject.name} thumb ${idx + 1}`} fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
