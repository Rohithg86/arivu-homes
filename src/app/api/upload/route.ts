import { NextRequest, NextResponse } from 'next/server'
import path from 'node:path'
import { writeFile } from 'node:fs/promises'
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
    const base64 = fileBase64.split(',').pop() ?? fileBase64
    const buffer = Buffer.from(base64, 'base64')
    const uploadPath = path.join(process.cwd(), 'public', 'uploads', fileName)
    await writeFile(uploadPath, buffer)
    const url = `/uploads/${fileName}`
    const created = await prisma.asset.create({ data: { type, title, description, url } })
    return NextResponse.json(created, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'upload failed' }, { status: 500 })
  }
}
