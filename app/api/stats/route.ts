import { prisma } from '@/lib/prisma'
import { apiSuccess, apiError } from '@/lib/api-response'

export async function GET() {
  try {
    const [members, churches, operationsAgg, supportAgg] = await Promise.all([
      prisma.member.count({ where: { approvalStatus: 'APPROVED' } }),
      prisma.church.count({ where: { approvalStatus: 'APPROVED' } }),
      prisma.operation.aggregate({ _sum: { amount: true } }),
      prisma.institutionalSupport.aggregate({ _sum: { amount: true } }),
    ])

    return apiSuccess({
      members,
      churches,
      volume: operationsAgg._sum.amount || 0,
      support: supportAgg._sum.amount || 0,
    })
  } catch (error) {
    console.error('Erro ao buscar stats:', error)
    return apiError('Erro ao buscar dados', 500)
  }
}
