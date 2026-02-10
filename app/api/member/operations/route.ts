import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/api-auth'
import { apiSuccess, apiError } from '@/lib/api-response'

export async function GET(request: NextRequest) {
  try {
    const auth = await requireAuth(['MEMBER'])
    if (!auth.success) return auth.response

    const member = await prisma.member.findUnique({
      where: { userId: auth.session!.id },
    })

    if (!member) return apiError('Membro não encontrado', 404)

    const { searchParams } = new URL(request.url)
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '20')))
    const skip = (page - 1) * limit

    const [operations, total] = await Promise.all([
      prisma.operation.findMany({
        where: { memberId: member.id },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        select: {
          id: true,
          type: true,
          amount: true,
          description: true,
          status: true,
          createdAt: true,
        },
      }),
      prisma.operation.count({ where: { memberId: member.id } }),
    ])

    return apiSuccess({
      operations,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Erro ao buscar operações:', error)
    return apiError('Erro ao buscar operações', 500)
  }
}
