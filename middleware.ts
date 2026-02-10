import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

interface SessionUser {
  id: string
  email: string
  name: string
  role: 'MEMBER' | 'CHURCH' | 'ADMIN'
}

const SESSION_SECRET = process.env.SESSION_SECRET || 'default-secret-change-in-production'

function base64urlEncode(data: Uint8Array): string {
  let binary = ''
  for (let i = 0; i < data.length; i++) {
    binary += String.fromCharCode(data[i])
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

async function verifySessionCookie(signed: string): Promise<SessionUser | null> {
  try {
    const parts = signed.split('.')
    if (parts.length !== 2) return null
    const [payloadB64, signature] = parts

    const payload = atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/'))

    const encoder = new TextEncoder()
    const key = await globalThis.crypto.subtle.importKey(
      'raw',
      encoder.encode(SESSION_SECRET),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    )

    const sig = await globalThis.crypto.subtle.sign('HMAC', key, encoder.encode(payload))
    const expectedSig = base64urlEncode(new Uint8Array(sig))

    if (expectedSig !== signature) return null
    return JSON.parse(payload) as SessionUser
  } catch {
    return null
  }
}

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('session')
  const { pathname } = request.nextUrl

  const user = sessionCookie ? await verifySessionCookie(sessionCookie.value) : null

  // Rotas públicas
  const publicRoutes = ['/', '/login', '/cadastro', '/sobre']
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))

  // Se não está autenticado e tentando acessar rota protegida
  if (!user && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Se está autenticado e tentando acessar login/cadastro
  if (user && (pathname === '/login' || pathname.startsWith('/cadastro'))) {
    if (user.role === 'MEMBER') {
      return NextResponse.redirect(new URL('/membro/dashboard', request.url))
    } else if (user.role === 'CHURCH') {
      return NextResponse.redirect(new URL('/igreja/dashboard', request.url))
    } else if (user.role === 'ADMIN') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }
  }

  // Verificar acesso por role
  if (user) {
    // Admin pode acessar tudo
    if (user.role === 'ADMIN') {
      return NextResponse.next()
    }

    // Membros só podem acessar rotas de membro
    if (user.role === 'MEMBER' && !pathname.startsWith('/membro')) {
      return NextResponse.redirect(new URL('/membro/dashboard', request.url))
    }

    // Igrejas só podem acessar rotas de igreja
    if (user.role === 'CHURCH' && !pathname.startsWith('/igreja')) {
      return NextResponse.redirect(new URL('/igreja/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
