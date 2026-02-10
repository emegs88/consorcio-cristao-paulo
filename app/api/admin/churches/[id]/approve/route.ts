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
    const churchId = id

    const church = await prisma.church.update({
      where: { id: churchId },
      data: {
        approvalStatus: 'APPROVED',
      },
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
