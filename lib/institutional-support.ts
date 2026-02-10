import { prisma } from './prisma'

/**
 * Calcula e registra o apoio institucional para uma operação
 * @param operationId ID da operação
 * @param amount Valor da operação
 * @param percentage Percentual de apoio (padrão 2%)
 */
export async function calculateInstitutionalSupport(
  operationId: string,
  amount: number,
  percentage: number = 0.02 // 2% padrão
) {
  try {
    // Buscar a operação com o membro e igreja
    const operation = await prisma.operation.findUnique({
      where: { id: operationId },
      include: {
        member: {
          include: {
            church: true,
          },
        },
      },
    })

    if (!operation || !operation.member) {
      throw new Error('Operação ou membro não encontrado')
    }

    // Verificar se o membro tem igreja vinculada e se optou por vincular
    if (!operation.member.churchId || !operation.member.linkChurch) {
      return null // Não há apoio se não houver igreja vinculada
    }

    // Calcular valor do apoio
    const supportAmount = amount * percentage

    // Criar registro de apoio institucional
    const support = await prisma.institutionalSupport.create({
      data: {
        churchId: operation.member.churchId,
        operationId: operation.id,
        amount: supportAmount,
        percentage: percentage,
        status: 'pending',
      },
    })

    return support
  } catch (error) {
    console.error('Erro ao calcular apoio institucional:', error)
    throw error
  }
}

/**
 * Processa o repasse de apoio para uma igreja
 * @param supportId ID do apoio institucional
 */
export async function processSupportPayment(supportId: string) {
  try {
    const support = await prisma.institutionalSupport.update({
      where: { id: supportId },
      data: {
        status: 'paid',
      },
    })

    return support
  } catch (error) {
    console.error('Erro ao processar repasse:', error)
    throw error
  }
}

/**
 * Obtém estatísticas de apoio para uma igreja
 */
export async function getChurchSupportStats(churchId: string) {
  try {
    const stats = await prisma.institutionalSupport.aggregate({
      where: {
        churchId,
      },
      _sum: {
        amount: true,
      },
      _count: {
        id: true,
      },
    })

    const pending = await prisma.institutionalSupport.aggregate({
      where: {
        churchId,
        status: 'pending',
      },
      _sum: {
        amount: true,
      },
    })

    return {
      total: stats._sum.amount || 0,
      count: stats._count.id,
      pending: pending._sum.amount || 0,
    }
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error)
    throw error
  }
}
