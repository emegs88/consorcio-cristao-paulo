import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await getSession()
    
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    const churches = await prisma.church.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    const formattedChurches = churches.map(church => ({
      id: church.id,
      name: church.name,
      email: church.user.email,
      pastorName: church.pastorName,
      city: church.city,
      approvalStatus: church.approvalStatus,
      createdAt: church.createdAt.toISOString(),
    }))

    return NextResponse.json({ churches: formattedChurches })
  } catch (error) {
    console.error('Erro ao buscar igrejas:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar igrejas' },
      { status: 500 }
    )
  }
}
