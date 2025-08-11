'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

type AssetType = 'SITE_PHOTO' | 'DESIGN' | 'ARCHITECTURE' | 'INNOVATION'

type TeamForm = { name: string; role: string; bio?: string; photoUrl?: string }
type UploadForm = { type: AssetType; title?: string; description?: string; file?: FileList }

function toBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export default function AdminPage() {
  const [tab, setTab] = useState<'team'|'assets'>('team')
  const teamForm = useForm<TeamForm>({ defaultValues: { name: '', role: '' } })
  const assetForm = useForm<UploadForm>()

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

  return (
    <div className='mx-auto max-w-3xl px-6 py-10'>
      <h1 className='text-3xl font-semibold mb-6'>Arivu Admin</h1>
      <div className='flex gap-4 mb-8'>
        <button className={tab==='team'?'font-bold underline':''} onClick={()=>setTab('team')}>Team</button>
        <button className={tab==='assets'?'font-bold underline':''} onClick={()=>setTab('assets')}>Assets</button>
      </div>

      {tab==='team' && (
        <form className='grid gap-4' onSubmit={submitTeam}>
          <input className='border p-2' placeholder='Name' {...teamForm.register('name', { required: true })} />
          <input className='border p-2' placeholder='Role' {...teamForm.register('role', { required: true })} />
          <textarea className='border p-2' placeholder='Bio' rows={4} {...teamForm.register('bio')} />
          <input className='border p-2' placeholder='Photo URL (optional)' {...teamForm.register('photoUrl')} />
          <button className='bg-black text-white px-4 py-2 rounded' type='submit'>Save Member</button>
        </form>
      )}

      {tab==='assets' && (
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
    </div>
  )
}
