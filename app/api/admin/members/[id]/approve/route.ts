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

    const existing = await prisma.member.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json(
        { error: 'Membro não encontrado' },
        { status: 404 }
      )
    }

    if (existing.approvalStatus !== 'PENDING') {
      return NextResponse.json(
        { error: `Membro já está com status: ${existing.approvalStatus}` },
        { status: 400 }
      )
    }

    const member = await prisma.member.update({
      where: { id },
      data: { approvalStatus: 'APPROVED' },
    })

    return NextResponse.json({ success: true, member })
  } catch (error) {
    console.error('Erro ao aprovar membro:', error)
    return NextResponse.json(
      { error: 'Erro ao aprovar membro' },
      { status: 500 }
    )
  }
}
