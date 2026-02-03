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
  const [isAdmin, setIsAdmin] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadProjectId, setUploadProjectId] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadCancel, setUploadCancel] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailsProjectId, setDetailsProjectId] = useState<number | null>(null);
  const [detailsImageIndex, setDetailsImageIndex] = useState(0);

  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
  const [projectForm, setProjectForm] = useState<
    Partial<Project> & { completionPercentageText?: string }
  >({
    name: "",
    location: "",
    client: "",
    type: "",
    startDate: "",
    expectedCompletion: "",
    completionPercentageText: "",
    status: "Planning",
    description: "",
    images: [],
  });

  async function refreshProjects() {
    const res = await fetch("/api/projects", { cache: "no-store" });
    if (!res.ok) return;
    const data = (await res.json()) as unknown as Array<Partial<Project>>;
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

  useEffect(() => {
    (async () => {
      const [projectsRes, meRes] = await Promise.all([
        fetch("/api/projects", { cache: "no-store" }),
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

  // ESC key handler for modals
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showProjectForm) {
          setShowProjectForm(false);
          setEditingProjectId(null);
        }
        if (detailsOpen) {
          setDetailsOpen(false);
        }
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [showProjectForm, detailsOpen]);

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

  const openAddProject = () => {
    setSaveError(null);
    setSaveSuccess(null);
    setEditingProjectId(null);
    setProjectForm({
      name: "",
      location: "",
      client: "",
      type: "",
      startDate: "",
      expectedCompletion: "",
      completionPercentageText: "",
      status: "Planning",
      description: "",
      images: [],
    });
    setShowProjectForm(true);
  };

  const openEditProject = (projectId: number) => {
    const p = projects.find((x) => x.id === projectId);
    if (!p) return;
    setSaveError(null);
    setSaveSuccess(null);
    setEditingProjectId(projectId);
    setProjectForm({
      ...p,
      completionPercentageText: String(p.completionPercentage ?? 0),
    });
    setShowProjectForm(true);
  };

  const submitProjectForm = async () => {
    if (!isAdmin) return;
    setSaving(true);
    setSaveError(null);
    setSaveSuccess(null);

    try {
      const rawPct = String(projectForm.completionPercentageText ?? "").trim();
      const digits = rawPct.replace(/\D/g, "").replace(/^0+(?=\d)/, "");
      const pct = Math.max(0, Math.min(100, digits ? Number(digits) : 0));

      const payload = {
        ...(editingProjectId ? { id: editingProjectId } : {}),
        name: String(projectForm.name ?? "").trim(),
        location: String(projectForm.location ?? "").trim(),
        client: String(projectForm.client ?? "").trim() || null,
        type: String(projectForm.type ?? "").trim(),
        startDate: String(projectForm.startDate ?? "").trim(),
        expectedCompletion: String(projectForm.expectedCompletion ?? "").trim(),
        completionPercentage: pct,
        status: String(projectForm.status ?? "Planning"),
        description: String(projectForm.description ?? "").trim(),
        // Keep existing images; manage additions via Upload Image(s)
        images: Array.isArray(projectForm.images) ? projectForm.images : [],
      };

      const res = await fetch("/api/projects", {
        method: editingProjectId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json().catch(() => null)) as { error?: string } | null;

      if (!res.ok) {
        setSaveError(data?.error ?? `Failed to ${editingProjectId ? "update" : "create"} project. Please try again.`);
        setSaving(false);
        return;
      }

      setShowProjectForm(false);
      setEditingProjectId(null);
      await refreshProjects();
      setSaveSuccess(editingProjectId ? "Project updated successfully." : "Project created successfully.");
    } catch {
      setSaveError("Network error. Please check your connection and try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleUploadImage = (projectId: number) => {
    if (!isAdmin) return;
    setSaveError(null);
    setSaveSuccess(null);
    setUploadProjectId(projectId);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isAdmin) return;
    if (uploadProjectId === null) return;
    const input = e.target;
    if (!input.files || input.files.length === 0) return;

    setUploading(true);
    setUploadCancel(false);
    setSaveError(null);
    setSaveSuccess(null);
    const project = projects.find((p) => p.id === uploadProjectId);
    if (!project) {
      setUploading(false);
      return;
    }

    const files = Array.from(input.files);
    const uploadedUrls: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        if (uploadCancel) {
          setSaveError("Upload cancelled.");
          input.value = "";
          setUploadProjectId(null);
          setUploading(false);
          setUploadCancel(false);
          return;
        }

        const file = files[i];
        const fileBase64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject(new Error("Failed to read file"));
          reader.readAsDataURL(file);
        });

        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "SITE_PHOTO",
            title: project.name,
            description: "Project image",
            fileName: file.name,
            fileBase64,
          }),
        });

        const data = (await res.json().catch(() => null)) as { url?: string; error?: string } | null;
        if (!res.ok || !data?.url) {
          setSaveError(data?.error ?? `Upload failed for ${file.name}. Please try again.`);
          input.value = "";
          setUploadProjectId(null);
          setUploading(false);
          setUploadCancel(false);
          return;
        }
        uploadedUrls.push(data.url);
      }

      if (uploadCancel) {
        setSaveError("Upload cancelled.");
        input.value = "";
        setUploadProjectId(null);
        setUploading(false);
        setUploadCancel(false);
        return;
      }

      const nextImages = [...uploadedUrls, ...(project.images ?? [])];
      const updateRes = await fetch("/api/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: project.id, images: nextImages }),
      });

      const updateData = (await updateRes.json().catch(() => null)) as { error?: string } | null;
      if (!updateRes.ok) {
        setSaveError(updateData?.error ?? "Failed to save project images. Please try again.");
        input.value = "";
        setUploadProjectId(null);
        setUploading(false);
        setUploadCancel(false);
        return;
      }

      await refreshProjects();
      openDetails(project.id, 0);
      setSaveSuccess(`${uploadedUrls.length} image(s) added to gallery.`);
    } catch {
      setSaveError("Network error during upload. Please check your connection and try again.");
    } finally {
      input.value = '';
      setUploadProjectId(null);
      setUploading(false);
      setUploadCancel(false);
    }
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

  async function signOut() {
    await fetch("/api/admin/logout", { method: "POST" });
    setIsAdmin(false);
    window.location.href = "/projects";
  }

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
            <div className="flex gap-3 items-center flex-wrap justify-end">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                ← Back to Home
              </Link>
              {isAdmin && (
                <>
                  <button
                    type="button"
                    onClick={openAddProject}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Add New Project
                  </button>
                  <button
                    type="button"
                    onClick={signOut}
                    className="border border-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-50"
                  >
                    Sign out
                  </button>
                </>
              )}
              {!isAdmin && (
                <Link href="/admin-login" className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800">
                  Admin Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Project Form Modal */}
      {showProjectForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={(e) => e.target === e.currentTarget && (setShowProjectForm(false), setEditingProjectId(null))}>
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-1">{editingProjectId ? "Edit Project" : "Add New Project"}</h2>
            <p className="text-sm text-gray-600 mb-4">Fields marked * are required.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                <input
                  type="text"
                  value={projectForm.name ?? ""}
                  onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Enter project name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={projectForm.location ?? ""}
                  onChange={(e) => setProjectForm({ ...projectForm, location: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Enter location"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
                <input
                  type="text"
                  value={projectForm.client ?? ""}
                  onChange={(e) => setProjectForm({ ...projectForm, client: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Client name (optional)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
                <select
                  value={projectForm.type ?? ""}
                  onChange={(e) => setProjectForm({ ...projectForm, type: e.target.value })}
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
                  value={projectForm.status ?? "Planning"}
                  onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value })}
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
                  value={projectForm.startDate ?? ""}
                  onChange={(e) => setProjectForm({ ...projectForm, startDate: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expected Completion</label>
                <input
                  type="date"
                  value={projectForm.expectedCompletion ?? ""}
                  onChange={(e) => setProjectForm({ ...projectForm, expectedCompletion: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Completion %</label>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={projectForm.completionPercentageText ?? ""}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, "").replace(/^0+(?=\d)/, "");
                    const clamped = digits ? String(Math.min(100, Number(digits))) : "";
                    setProjectForm({ ...projectForm, completionPercentageText: clamped });
                  }}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="0 to 100"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={projectForm.description ?? ""}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  rows={3}
                  placeholder="Enter project description"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                type="button"
                disabled={saving || !String(projectForm.name ?? "").trim() || !String(projectForm.location ?? "").trim()}
                onClick={submitProjectForm}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60"
              >
                {saving ? "Saving..." : editingProjectId ? "Save Changes" : "Add Project"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowProjectForm(false);
                  setEditingProjectId(null);
                }}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
            {saveError && <div className="mt-3 text-sm text-red-600">{saveError}</div>}
          </div>
        </div>
      )}

      {(saveSuccess || saveError) && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4">
          {saveSuccess && <div className="rounded-xl border bg-green-50 text-green-800 px-4 py-3 text-sm">{saveSuccess}</div>}
          {saveError && <div className="rounded-xl border bg-red-50 text-red-700 px-4 py-3 text-sm mt-2">{saveError}</div>}
        </div>
      )}

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Ongoing Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {ongoingProjects.map((project) => (
            <div key={project.id} className="glass-card rounded-lg shadow-md overflow-hidden">
              {renderProjectImages(project)}
              <div className="p-4 sm:p-6">
                <div className="space-y-2 mb-3 text-sm flex-grow">
                  <div className="min-h-[3rem] mb-2">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2">{project.name}</h3>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-gray-600">Client</span>
                    <span className="text-gray-800">{project.client ?? "-"}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-gray-600">Location</span>
                    <span className="text-gray-800 line-clamp-1 text-right">{project.location}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-gray-600">Type</span>
                    <span className="text-gray-800">{project.type}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-gray-600">Start Date</span>
                    <span className="text-gray-800">{project.startDate || "-"}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-gray-600">Completion</span>
                    <span className="text-gray-800">{project.expectedCompletion || "-"}</span>
                  </div>
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
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-gray-600">Name:</span>
                    <span className="text-gray-800 font-medium">{project.name}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <p className="text-gray-600 text-sm">{project.description}</p>
                </div>

                {isAdmin && (
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      className="bg-gray-900 text-white px-3 py-2 rounded text-sm hover:bg-gray-800"
                      onClick={() => openEditProject(project.id)}
                    >
                      Edit Project
                    </button>
                    <button
                      type="button"
                      disabled={uploading}
                      className="bg-gray-50 text-gray-700 px-3 py-2 rounded text-sm hover:bg-gray-100 disabled:opacity-60"
                      onClick={() => handleUploadImage(project.id)}
                    >
                      {uploading && uploadProjectId === project.id ? "Uploading..." : "Upload Image(s)"}
                    </button>
                    {uploading && uploadProjectId === project.id && (
                      <button
                        type="button"
                        className="col-span-2 bg-red-50 text-red-700 px-3 py-2 rounded text-sm hover:bg-red-100"
                        onClick={() => setUploadCancel(true)}
                      >
                        Cancel Upload
                      </button>
                    )}
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
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        className="bg-gray-900 text-white px-3 py-2 rounded text-sm hover:bg-gray-800"
                        onClick={() => openEditProject(project.id)}
                      >
                        Edit Project
                      </button>
                      <button
                        type="button"
                        disabled={uploading}
                        className="bg-gray-50 text-gray-700 px-3 py-2 rounded text-sm hover:bg-gray-100 disabled:opacity-60"
                        onClick={() => handleUploadImage(project.id)}
                      >
                        {uploading && uploadProjectId === project.id ? "Uploading..." : "Upload Image(s)"}
                      </button>
                      {uploading && uploadProjectId === project.id && (
                        <button
                          type="button"
                          className="col-span-2 bg-red-50 text-red-700 px-3 py-2 rounded text-sm hover:bg-red-100"
                          onClick={() => setUploadCancel(true)}
                        >
                          Cancel Upload
                        </button>
                      )}
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
                onClick={openAddProject}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Add Project
              </button>
            )}
          </div>
        )}
      </div>

      {/* Single hidden file input for uploads (admin only) */}
      {isAdmin && (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
      )}

      {/* Details modal with full image gallery */}
      {detailsOpen && detailsProject && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setDetailsOpen(false)} onKeyDown={(e) => e.key === "Escape" && setDetailsOpen(false)} />
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
                        className={`relative h-14 w-20 flex-none overflow-hidden rounded border ${idx === detailsImageIndex ? "ring-2 ring-blue-600" : ""
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
