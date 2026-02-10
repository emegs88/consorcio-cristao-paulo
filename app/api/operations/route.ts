import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { calculateInstitutionalSupport } from '@/lib/institutional-support'

/**
 * Cria uma nova operação de consórcio
 * Calcula automaticamente o apoio institucional se o membro tiver igreja vinculada
 */
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { memberId, type, amount, description } = data

    // Criar operação
    const operation = await prisma.operation.create({
      data: {
        memberId,
        type: type || 'consortium',
        amount: parseFloat(amount),
        description: description || null,
        status: 'pending',
      },
      include: {
        member: {
          include: {
            church: true,
          },
        },
      },
    })

    // Calcular apoio institucional automaticamente
    if (operation.member.linkChurch && operation.member.churchId) {
      await calculateInstitutionalSupport(
        operation.id,
        operation.amount,
        0.02 // 2% padrão - pode vir de variável de ambiente
      )
    }

    return NextResponse.json({ success: true, operation })
  } catch (error) {
    console.error('Erro ao criar operação:', error)
    return NextResponse.json(
      { error: 'Erro ao processar operação' },
      { status: 500 }
    )
  }
}

/**
 * Lista operações de um membro
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const memberId = searchParams.get('memberId')

    if (!memberId) {
      return NextResponse.json(
        { error: 'memberId é obrigatório' },
        { status: 400 }
      )
    }

    const operations = await prisma.operation.findMany({
      where: { memberId },
      include: {
        institutionalSupport: {
          include: {
            church: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ operations })
  } catch (error) {
    console.error('Erro ao buscar operações:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar operações' },
      { status: 500 }
    )
  }
}
