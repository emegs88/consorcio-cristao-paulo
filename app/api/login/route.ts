import { NextRequest, NextResponse } from 'next/server'
import { verifyCredentials, signPayload } from '@/lib/auth'
import { loginSchema } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validar dados
    const validatedData = loginSchema.parse(body)
    const { email, password } = validatedData

    // Verificar credenciais
    const user = await verifyCredentials(email, password)

    if (!user) {
      return NextResponse.json(
        { error: 'E-mail ou senha incorretos, ou cadastro ainda não aprovado' },
        { status: 401 }
      )
    }

    // Criar sessão
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })

    // Definir cookie de sessão
    response.cookies.set('session', signPayload(JSON.stringify(user)), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      )
    }
    
    console.error('Erro ao fazer login:', error)
    return NextResponse.json(
      { error: 'Erro ao processar login' },
      { status: 500 }
    )
  }
}
