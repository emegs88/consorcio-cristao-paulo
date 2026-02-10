import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession()
    
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    const { id } = await params
    const memberId = id

    const member = await prisma.member.update({
      where: { id: memberId },
      data: {
        approvalStatus: 'REJECTED',
      },
    })

    return NextResponse.json({ success: true, member })
  } catch (error) {
    console.error('Erro ao rejeitar membro:', error)
    return NextResponse.json(
      { error: 'Erro ao rejeitar membro' },
      { status: 500 }
    )
  }
}
