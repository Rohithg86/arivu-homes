import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { prisma } from '@/lib/prisma'
import { AssetType } from '@prisma/client'
import { getAdminCookieName, verifyAdminSession } from '@/lib/adminAuth'

type UploadBody = {
  type: AssetType
  title?: string
  description?: string
  fileName: string
  fileBase64: string
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get(getAdminCookieName())?.value
    const v = verifyAdminSession(token)
    if (!v.ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = (await req.json()) as UploadBody
    const { type, title, description, fileName, fileBase64 } = body
    if (!type || !fileName || !fileBase64) {
      return NextResponse.json({ error: 'type, fileName, fileBase64 required' }, { status: 400 })
    }

    // Extract base64 data
    const base64 = fileBase64.split(',').pop() ?? fileBase64
    const buffer = Buffer.from(base64, 'base64')

    // Create a safe filename
    const safeFileName = String(fileName).replace(/[^a-zA-Z0-9._-]/g, '_')
    const uniqueName = `projects/${Date.now()}-${Math.random().toString(16).slice(2)}-${safeFileName}`

    // Upload to Vercel Blob
    const blob = await put(uniqueName, buffer, {
      access: 'public',
      contentType: fileName.endsWith('.png') ? 'image/png' :
        fileName.endsWith('.jpg') || fileName.endsWith('.jpeg') ? 'image/jpeg' :
          fileName.endsWith('.gif') ? 'image/gif' :
            fileName.endsWith('.webp') ? 'image/webp' : 'image/jpeg'
    })

    // Save to database
    const created = await prisma.asset.create({
      data: {
        type,
        title,
        description,
        url: blob.url
      }
    })

    return NextResponse.json({ ...created, url: blob.url }, { status: 201 })
  } catch (error) {
    console.error('Upload error:', error);
    const message = error instanceof Error ? error.message : 'Upload failed';
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
