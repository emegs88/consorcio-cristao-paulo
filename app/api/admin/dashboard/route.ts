import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/api-auth'
import { apiSuccess, apiError } from '@/lib/api-response'

export async function GET() {
  try {
    const auth = await requireAuth(['ADMIN'])
    if (!auth.success) return auth.response

    const [totalChurches, totalMembers, operationsAgg, supportAgg, pendingChurches, pendingMembers] = await Promise.all([
      prisma.church.count({ where: { approvalStatus: 'APPROVED' } }),
      prisma.member.count({ where: { approvalStatus: 'APPROVED' } }),
      prisma.operation.aggregate({ _sum: { amount: true }, _count: { id: true } }),
      prisma.institutionalSupport.aggregate({ _sum: { amount: true } }),
      prisma.church.count({ where: { approvalStatus: 'PENDING' } }),
      prisma.member.count({ where: { approvalStatus: 'PENDING' } }),
    ])

    return apiSuccess({
      totalChurches,
      totalMembers,
      totalVolume: operationsAgg._sum.amount || 0,
      totalOperations: operationsAgg._count.id,
      totalSupport: supportAgg._sum.amount || 0,
      pendingChurches,
      pendingMembers,
    })
  } catch (error) {
    console.error('Erro ao buscar dados admin:', error)
    return apiError('Erro ao buscar dados', 500)
  }
}
