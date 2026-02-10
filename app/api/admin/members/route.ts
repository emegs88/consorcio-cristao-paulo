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

    const members = await prisma.member.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        church: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    const formattedMembers = members.map(member => ({
      id: member.id,
      name: member.user.name,
      email: member.user.email,
      churchName: member.church?.name || member.churchName,
      city: member.city,
      whatsapp: member.whatsapp,
      approvalStatus: member.approvalStatus,
      createdAt: member.createdAt.toISOString(),
    }))

    return NextResponse.json({ members: formattedMembers })
  } catch (error) {
    console.error('Erro ao buscar membros:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar membros' },
      { status: 500 }
    )
  }
}
