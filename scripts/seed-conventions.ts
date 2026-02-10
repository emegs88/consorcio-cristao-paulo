/**
 * Script para popular convenções no banco de dados
 * Execute: npx tsx scripts/seed-conventions.ts
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Populando convenções...')

  // Criar CBESP
  const cbesp = await prisma.convention.upsert({
    where: { acronym: 'CBESP' },
    update: {},
    create: {
      name: 'Convenção Batista do Estado de São Paulo',
      acronym: 'CBESP',
      description: 'A CBESP reúne e organiza centenas de igrejas batistas em todo o estado de São Paulo, fortalecendo a obra do Senhor através da união e cooperação.',
    },
  })

  console.log('✅ CBESP criada:', cbesp.name)

  // Aqui você pode adicionar outras convenções no futuro
  // Exemplo:
  // const cbb = await prisma.convention.upsert({
  //   where: { acronym: 'CBB' },
  //   update: {},
  //   create: {
  //     name: 'Convenção Batista Brasileira',
  //     acronym: 'CBB',
  //     description: '...',
  //   },
  // })

  console.log('✅ Convenções populadas com sucesso!')
}

main()
  .catch((e) => {
    console.error('❌ Erro:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
