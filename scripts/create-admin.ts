/**
 * Script para criar usuário admin inicial
 * Execute: npx tsx scripts/create-admin.ts
 */

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@prosperealianca.com'
  const password = process.env.ADMIN_PASSWORD || 'admin123'
  const name = process.env.ADMIN_NAME || 'Administrador'

  // Verificar se já existe
  const existing = await prisma.user.findUnique({
    where: { email },
  })

  if (existing) {
    console.log('Usuário admin já existe!')
    return
  }

  // Hash da senha
  const hashedPassword = await bcrypt.hash(password, 10)

  // Criar admin
  const admin = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role: 'ADMIN',
    },
  })

  console.log('✅ Usuário admin criado com sucesso!')
  console.log(`Email: ${email}`)
  console.log(`Senha: ${password}`)
  console.log('⚠️  Altere a senha após o primeiro login!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
