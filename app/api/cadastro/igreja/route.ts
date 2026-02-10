import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { churchSchema } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Validar dados
    const validatedData = churchSchema.parse(data)
    const { name, email, password, pastorName, cnpj, city, memberCount, bankAccount, conventionId } = validatedData

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

    // Verificar se CNPJ já existe (se fornecido)
    if (cnpj) {
      const existingChurch = await prisma.church.findUnique({
        where: { cnpj },
      })

      if (existingChurch) {
        return NextResponse.json(
          { error: 'CNPJ já cadastrado' },
          { status: 400 }
        )
      }
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10)

    // Buscar ID da convenção se fornecida
    let conventionIdValue = null
    if (conventionId === 'cbesp') {
      // Buscar ou criar CBESP
      let cbesp = await prisma.convention.findUnique({
        where: { acronym: 'CBESP' },
      })
      
      if (!cbesp) {
        cbesp = await prisma.convention.create({
          data: {
            name: 'Convenção Batista do Estado de São Paulo',
            acronym: 'CBESP',
            description: 'A CBESP reúne e organiza centenas de igrejas batistas em todo o estado de São Paulo.',
          },
        })
      }
      conventionIdValue = cbesp.id
    }

    // Criar usuário e igreja
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name,
        role: 'CHURCH',
        church: {
          create: {
            name,
            pastorName,
            cnpj: cnpj || null,
            city,
            memberCount: memberCount ? parseInt(memberCount) : null,
            bankAccount: bankAccount || null,
            conventionId: conventionIdValue,
            approvalStatus: 'PENDING',
          },
        },
      },
      include: {
        church: true,
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
    
    console.error('Erro ao cadastrar igreja:', error)
    return NextResponse.json(
      { error: error.message || 'Erro ao processar cadastro' },
      { status: 500 }
    )
  }
}
