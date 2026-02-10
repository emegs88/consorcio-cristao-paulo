import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/api-auth'
import { apiSuccess, apiError } from '@/lib/api-response'

export async function GET() {
  try {
    const auth = await requireAuth(['CHURCH'])
    if (!auth.success) return auth.response

    const church = await prisma.church.findUnique({
      where: { userId: auth.session!.id },
    })

    if (!church) return apiError('Igreja não encontrada', 404)

    // Buscar apoio institucional dos últimos 12 meses
    const supports = await prisma.institutionalSupport.findMany({
      where: { churchId: church.id },
      include: {
        operation: {
          select: { amount: true, memberId: true, createdAt: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    // Agrupar por mês
    const monthlyMap = new Map<string, { volume: number; apoio: number; membros: Set<string> }>()

    for (const support of supports) {
      const date = new Date(support.createdAt)
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`

      if (!monthlyMap.has(key)) {
        monthlyMap.set(key, { volume: 0, apoio: 0, membros: new Set() })
      }

      const entry = monthlyMap.get(key)!
      entry.volume += support.operation.amount
      entry.apoio += support.amount
      entry.membros.add(support.operation.memberId)
    }

    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

    const relatorios = Array.from(monthlyMap.entries())
      .sort((a, b) => b[0].localeCompare(a[0]))
      .map(([key, data]) => {
        const [year, month] = key.split('-')
        return {
          mes: `${months[parseInt(month) - 1]} ${year}`,
          volume: data.volume,
          apoio: data.apoio,
          membros: data.membros.size,
        }
      })

    return apiSuccess({ relatorios })
  } catch (error) {
    console.error('Erro ao buscar relatórios:', error)
    return apiError('Erro ao buscar relatórios', 500)
  }
}
