import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { memberSchema } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Validar dados
    const validatedData = memberSchema.parse(data)
    const { name, email, password, churchName, city, whatsapp, referral, financialGoal, linkChurch } = validatedData

    // Verificar se email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'E-mail já cadastrado' },
        { status: 400 }
      )
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10)

    // Criar usuário e membro
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'MEMBER',
        member: {
          create: {
            churchName,
            city,
            whatsapp,
            referral: referral || null,
            financialGoal: financialGoal || null,
            linkChurch: linkChurch ?? true,
            approvalStatus: 'PENDING',
          },
        },
      },
      include: {
        member: true,
      },
    })

    return NextResponse.json({ success: true, userId: user.id })
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      )
    }
    
    console.error('Erro ao cadastrar membro:', error)
    return NextResponse.json(
      { error: error.message || 'Erro ao processar cadastro' },
      { status: 500 }
    )
  }
}
