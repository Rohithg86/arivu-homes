import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { AssetType } from '@prisma/client'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const typeParam = searchParams.get('type') as AssetType | null
  const where = typeParam ? { type: typeParam } : {}
  const assets = await prisma.asset.findMany({ where, orderBy: { id: 'desc' } })
  return NextResponse.json(assets)
}
