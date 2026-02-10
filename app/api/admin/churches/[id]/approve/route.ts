import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/api-auth'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireAuth(['ADMIN'])
    if (!auth.success) return auth.response

    const { id } = await params

    const existing = await prisma.church.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json(
        { error: 'Igreja não encontrada' },
        { status: 404 }
      )
    }

    if (existing.approvalStatus !== 'PENDING') {
      return NextResponse.json(
        { error: `Igreja já está com status: ${existing.approvalStatus}` },
        { status: 400 }
      )
    }

    const church = await prisma.church.update({
      where: { id },
      data: { approvalStatus: 'APPROVED' },
    })

    return NextResponse.json({ success: true, church })
  } catch (error) {
    console.error('Erro ao aprovar igreja:', error)
    return NextResponse.json(
      { error: 'Erro ao aprovar igreja' },
      { status: 500 }
    )
  }
}
