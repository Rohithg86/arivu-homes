'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

type AssetType = 'SITE_PHOTO' | 'DESIGN' | 'ARCHITECTURE' | 'INNOVATION'

type TeamForm = { name: string; role: string; bio?: string; photoUrl?: string }
type UploadForm = { type: AssetType; title?: string; description?: string; file?: FileList }
type ProjectRecord = {
  id: number
  name: string
  location: string
  client?: string | null
  type?: string | null
  startDate?: string | null
  expectedCompletion?: string | null
  completionPercentage?: number | null
  status?: string | null
  description?: string | null
  images?: string[] | null
}

type ProjectForm = {
  name: string
  location: string
  client?: string
  type?: string
  startDate?: string
  expectedCompletion?: string
  completionPercentage?: number
  status?: string
  description?: string
  imagesText?: string
}

function toBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export default function AdminPage() {
  const [tab, setTab] = useState<'team' | 'assets' | 'projects'>('team')
  const teamForm = useForm<TeamForm>({ defaultValues: { name: '', role: '' } })
  const assetForm = useForm<UploadForm>()
  const projectForm = useForm<ProjectForm>({
    defaultValues: {
      name: "",
      location: "",
      client: "",
      type: "",
      startDate: "",
      expectedCompletion: "",
      completionPercentage: 0,
      status: "Planning",
      description: "",
      imagesText: "",
    },
  })
  const [projects, setProjects] = useState<ProjectRecord[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)

  async function refreshProjects() {
    const res = await fetch("/api/projects")
    if (res.ok) setProjects((await res.json()) as ProjectRecord[])
  }

  const submitTeam = teamForm.handleSubmit(async (data) => {
    const res = await fetch('/api/team', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    alert(res.ok ? 'Team member added' : 'Failed')
    if (res.ok) teamForm.reset()
  })

  const submitAsset = assetForm.handleSubmit(async (data) => {
    const file = data.file?.[0]
    if (!file || !data.type) { alert('Select file and type'); return }
    const fileBase64 = await toBase64(file)
    const payload = { type: data.type, title: data.title, description: data.description, fileName: file.name, fileBase64 }
    const res = await fetch('/api/upload', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    alert(res.ok ? 'Uploaded' : 'Upload failed')
    if (res.ok) assetForm.reset()
  })

  const submitProject = projectForm.handleSubmit(async (data) => {
    const images = String(data.imagesText ?? "")
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean)

    const res = await fetch("/api/projects", {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...(editingId ? { id: editingId } : {}),
        ...data,
        images,
      }),
    })
    alert(res.ok ? (editingId ? "Project updated" : "Project added") : "Failed")
    if (res.ok) {
      projectForm.reset()
      setEditingId(null)
      refreshProjects()
    }
  })

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" })
    window.location.href = "/admin-login"
  }

  // initial load
  useEffect(() => {
    refreshProjects()
  }, [])

  return (
    <div className='mx-auto max-w-3xl px-6 py-10'>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-gray-400 hover:text-gray-900 text-2xl transition-colors bg-white/50 p-2 rounded-full hover:shadow-sm" aria-label="Back to Home">
            ←
          </Link>
          <h1 className='text-3xl font-semibold'>Arivu Admin</h1>
        </div>
        <button onClick={logout} className="text-sm text-gray-600 hover:text-gray-900 underline">Logout</button>
      </div>
      <div className='flex gap-4 mb-8'>
        <button className={tab === 'team' ? 'font-bold underline' : ''} onClick={() => setTab('team')}>Team</button>
        <button className={tab === 'assets' ? 'font-bold underline' : ''} onClick={() => setTab('assets')}>Assets</button>
        <button className={tab === 'projects' ? 'font-bold underline' : ''} onClick={() => setTab('projects')}>Projects</button>
      </div>

      {tab === 'team' && (
        <form className='grid gap-4' onSubmit={submitTeam}>
          <input className='border p-2' placeholder='Name' {...teamForm.register('name', { required: true })} />
          <input className='border p-2' placeholder='Role' {...teamForm.register('role', { required: true })} />
          <textarea className='border p-2' placeholder='Bio' rows={4} {...teamForm.register('bio')} />
          <input className='border p-2' placeholder='Photo URL (optional)' {...teamForm.register('photoUrl')} />
          <button className='bg-black text-white px-4 py-2 rounded' type='submit'>Save Member</button>
        </form>
      )}

      {tab === 'assets' && (
        <form className='grid gap-4' onSubmit={submitAsset}>
          <select className='border p-2' {...assetForm.register('type', { required: true })}>
            <option value=''>Select Type</option>
            <option value='SITE_PHOTO'>Site Photo</option>
            <option value='DESIGN'>Design</option>
            <option value='ARCHITECTURE'>Architecture</option>
            <option value='INNOVATION'>Innovation</option>
          </select>
          <input className='border p-2' placeholder='Title (optional)' {...assetForm.register('title')} />
          <textarea className='border p-2' placeholder='Description (optional)' rows={3} {...assetForm.register('description')} />
          <input className='border p-2' type='file' accept='image/*' {...assetForm.register('file', { required: true })} />
          <button className='bg-black text-white px-4 py-2 rounded' type='submit'>Upload</button>
        </form>
      )}

      {tab === "projects" && (
        <div className="space-y-10">
          <form className="grid gap-3" onSubmit={submitProject}>
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold">{editingId ? "Edit Project" : "Add Project"}</div>
              {editingId && (
                <button
                  type="button"
                  className="text-sm underline"
                  onClick={() => {
                    projectForm.reset()
                    setEditingId(null)
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
            <input className="border p-2" placeholder="Name" {...projectForm.register("name", { required: true })} />
            <input className="border p-2" placeholder="Location" {...projectForm.register("location", { required: true })} />
            <input className="border p-2" placeholder="Client (optional)" {...projectForm.register("client")} />
            <input className="border p-2" placeholder="Type" {...projectForm.register("type")} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input className="border p-2" type="date" placeholder="Start Date" {...projectForm.register("startDate")} />
              <input className="border p-2" type="date" placeholder="Expected Completion" {...projectForm.register("expectedCompletion")} />
              <input
                className="border p-2"
                type="number"
                min={0}
                max={100}
                placeholder="Completion %"
                {...projectForm.register("completionPercentage", { valueAsNumber: true })}
              />
              <select className="border p-2" {...projectForm.register("status")}>
                <option value="Planning">Planning</option>
                <option value="Ongoing">Ongoing</option>
                <option value="In Progress">In Progress</option>
                <option value="Near Completion">Near Completion</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <textarea className="border p-2" placeholder="Description" rows={3} {...projectForm.register("description")} />
            <textarea
              className="border p-2 font-mono text-xs"
              placeholder={"Images (one URL per line)\nExample:\n/uploads/projects/jigani/elevation.jpg"}
              rows={5}
              {...projectForm.register("imagesText")}
            />
            <button className="bg-black text-white px-4 py-2 rounded" type="submit">
              {editingId ? "Save" : "Create"}
            </button>
          </form>

          <div>
            <div className="text-lg font-semibold mb-3">Existing Projects</div>
            <div className="grid gap-3">
              {projects.map((p) => (
                <div key={p.id} className="border rounded-lg p-4">
                  <div className="font-medium">{p.name}</div>
                  <div className="text-sm text-gray-600">{p.location}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Status: {p.status ?? "-"} • Progress: {p.completionPercentage ?? 0}% • Images: {(p.images?.length ?? 0)}
                  </div>
                  <div className="mt-3 flex gap-3">
                    <button
                      className="text-sm underline"
                      type="button"
                      onClick={() => {
                        setEditingId(p.id)
                        projectForm.reset({
                          name: p.name ?? "",
                          location: p.location ?? "",
                          client: p.client ?? "",
                          type: p.type ?? "",
                          startDate: p.startDate ?? "",
                          expectedCompletion: p.expectedCompletion ?? "",
                          completionPercentage: p.completionPercentage ?? 0,
                          status: p.status ?? "Planning",
                          description: p.description ?? "",
                          imagesText: Array.isArray(p.images) ? p.images.join("\n") : "",
                        })
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="text-sm underline"
                      onClick={async () => {
                        const ok = confirm("Delete this project?")
                        if (!ok) return
                        const res = await fetch(`/api/projects?id=${p.id}`, { method: "DELETE" })
                        if (res.ok) refreshProjects()
                        else alert("Delete failed")
                      }}
                      type="button"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              {projects.length === 0 && <div className="text-sm text-gray-600">No projects yet.</div>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
