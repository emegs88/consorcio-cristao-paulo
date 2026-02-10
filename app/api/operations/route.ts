import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { calculateInstitutionalSupport } from '@/lib/institutional-support'
import { requireAuth } from '@/lib/api-auth'
import { operationSchema } from '@/lib/validations'

/**
 * Cria uma nova operação de consórcio
 * Calcula automaticamente o apoio institucional se o membro tiver igreja vinculada
 */
export async function POST(request: NextRequest) {
  try {
    const auth = await requireAuth(['MEMBER'])
    if (!auth.success) return auth.response

    const data = await request.json()
    const validated = operationSchema.parse(data)

    // Buscar membro do usuário autenticado
    const member = await prisma.member.findUnique({
      where: { userId: auth.session.id },
    })

    if (!member) {
      return NextResponse.json(
        { error: 'Membro não encontrado' },
        { status: 404 }
      )
    }

    // Criar operação usando o memberId da sessão (não do body)
    const operation = await prisma.operation.create({
      data: {
        memberId: member.id,
        type: validated.type,
        amount: validated.amount,
        description: validated.description || null,
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
        0.02 // 2% padrão
      )
    }

    return NextResponse.json({ success: true, operation })
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      )
    }
    console.error('Erro ao criar operação:', error)
    return NextResponse.json(
      { error: 'Erro ao processar operação' },
      { status: 500 }
    )
  }
}

/**
 * Lista operações do membro autenticado
 */
export async function GET(request: NextRequest) {
  try {
    const auth = await requireAuth(['MEMBER'])
    if (!auth.success) return auth.response

    const member = await prisma.member.findUnique({
      where: { userId: auth.session.id },
    })

    if (!member) {
      return NextResponse.json(
        { error: 'Membro não encontrado' },
        { status: 404 }
      )
    }

    const { searchParams } = new URL(request.url)
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '20')))
    const skip = (page - 1) * limit

    const [operations, total] = await Promise.all([
      prisma.operation.findMany({
        where: { memberId: member.id },
        include: {
          institutionalSupport: {
            include: {
              church: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.operation.count({ where: { memberId: member.id } }),
    ])

    return NextResponse.json({
      operations,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    })
  } catch (error) {
    console.error('Erro ao buscar operações:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar operações' },
      { status: 500 }
    )
  }
}
