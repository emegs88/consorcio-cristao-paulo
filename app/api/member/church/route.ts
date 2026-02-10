import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/api-auth'
import { apiSuccess, apiError } from '@/lib/api-response'

export async function GET() {
  try {
    const auth = await requireAuth(['MEMBER'])
    if (!auth.success) return auth.response

    const member = await prisma.member.findUnique({
      where: { userId: auth.session!.id },
      include: {
        church: {
          include: {
            _count: { select: { members: true } },
          },
        },
      },
    })

    if (!member) return apiError('Membro não encontrado', 404)
    if (!member.church) return apiError('Você não está vinculado a uma igreja', 404)

    // Volume e apoio gerado pelo membro
    const memberOps = await prisma.operation.aggregate({
      where: { memberId: member.id },
      _sum: { amount: true },
    })

    const memberSupport = await prisma.institutionalSupport.aggregate({
      where: {
        churchId: member.church.id,
        operation: { memberId: member.id },
      },
      _sum: { amount: true },
    })

    // Total de apoio da igreja
    const churchSupport = await prisma.institutionalSupport.aggregate({
      where: { churchId: member.church.id },
      _sum: { amount: true },
    })

    // Volume total da igreja
    const churchVolume = await prisma.operation.aggregate({
      where: { member: { churchId: member.church.id } },
      _sum: { amount: true },
    })

    return apiSuccess({
      name: member.church.name,
      city: member.church.city,
      totalMembers: member.church._count.members,
      totalVolume: churchVolume._sum.amount || 0,
      totalSupport: churchSupport._sum.amount || 0,
      myVolume: memberOps._sum.amount || 0,
      mySupport: memberSupport._sum.amount || 0,
    })
  } catch (error) {
    console.error('Erro ao buscar dados da igreja:', error)
    return apiError('Erro ao buscar dados', 500)
  }
}
