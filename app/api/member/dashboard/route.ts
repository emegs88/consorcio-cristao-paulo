import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await getSession()
    
    if (!session || session.role !== 'MEMBER') {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    // Buscar dados do membro
    const member = await prisma.member.findUnique({
      where: { userId: session.id },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        church: {
          select: {
            name: true,
          },
        },
        operations: {
          select: {
            id: true,
            amount: true,
            type: true,
            status: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        _count: {
          select: {
            operations: true,
          },
        },
      },
    })

    if (!member) {
      return NextResponse.json(
        { error: 'Membro não encontrado' },
        { status: 404 }
      )
    }

    // Calcular estatísticas
    const totalOperations = member._count.operations
    const totalAmount = member.operations.reduce((sum, op) => sum + op.amount, 0)
    const supportGenerated = totalAmount * 0.02 // 2% de apoio

    return NextResponse.json({
      name: member.user.name,
      churchName: member.church?.name || member.churchName || 'Não vinculada',
      totalOperations,
      totalAmount,
      supportGenerated,
      recentOperations: member.operations.slice(0, 5),
    })
  } catch (error) {
    console.error('Erro ao buscar dados do membro:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar dados' },
      { status: 500 }
    )
  }
}
