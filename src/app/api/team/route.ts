import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAdminCookieName, verifyAdminSession } from '@/lib/adminAuth'

export async function GET() {
  const team = await prisma.teamMember.findMany({ orderBy: { id: 'asc' } })
  return NextResponse.json(team)
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get(getAdminCookieName())?.value
  const v = verifyAdminSession(token)
  if (!v.ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { name, role, bio, photoUrl } = body
  if (!name || !role) return NextResponse.json({ error: 'name and role required' }, { status: 400 })
  const created = await prisma.teamMember.create({ data: { name, role, bio, photoUrl } })
  return NextResponse.json(created, { status: 201 })
}
