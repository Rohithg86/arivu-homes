import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const team = await prisma.teamMember.findMany({ orderBy: { id: 'asc' } })
  return NextResponse.json(team)
}

export async function POST(req: Request) {
  const body = await req.json()
  const { name, role, bio, photoUrl } = body
  if (!name || !role) return NextResponse.json({ error: 'name and role required' }, { status: 400 })
  const created = await prisma.teamMember.create({ data: { name, role, bio, photoUrl } })
  return NextResponse.json(created, { status: 201 })
}
