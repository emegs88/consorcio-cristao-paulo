import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/api-auth'
import { apiSuccess, apiError } from '@/lib/api-response'
import { getChurchSupportStats } from '@/lib/institutional-support'

export async function GET() {
  try {
    const auth = await requireAuth(['CHURCH'])
    if (!auth.success) return auth.response

    const church = await prisma.church.findUnique({
      where: { userId: auth.session!.id },
      include: {
        user: { select: { name: true, email: true } },
        _count: { select: { members: true } },
      },
    })

    if (!church) return apiError('Igreja não encontrada', 404)

    const supportStats = await getChurchSupportStats(church.id)

    // Volume total das operações dos membros vinculados
    const membersVolume = await prisma.operation.aggregate({
      where: { member: { churchId: church.id } },
      _sum: { amount: true },
    })

    // Apoio do mês corrente
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const monthlySupport = await prisma.institutionalSupport.aggregate({
      where: {
        churchId: church.id,
        createdAt: { gte: startOfMonth },
      },
      _sum: { amount: true },
    })

    return apiSuccess({
      name: church.name,
      city: church.city,
      pastorName: church.pastorName,
      totalMembers: church._count.members,
      totalVolume: membersVolume._sum.amount || 0,
      totalSupport: supportStats.total,
      pendingSupport: supportStats.pending,
      monthlySupport: monthlySupport._sum.amount || 0,
    })
  } catch (error) {
    console.error('Erro ao buscar dados da igreja:', error)
    return apiError('Erro ao buscar dados', 500)
  }
}
