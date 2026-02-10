import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session')
  const { pathname } = request.nextUrl

  // Rotas públicas
  const publicRoutes = ['/', '/login', '/cadastro', '/sobre']
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))

  // Se não está autenticado e tentando acessar rota protegida
  if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Se está autenticado e tentando acessar login/cadastro
  if (session && (pathname === '/login' || pathname.startsWith('/cadastro'))) {
    try {
      const user = JSON.parse(session.value)
      // Redirecionar baseado no role
      if (user.role === 'MEMBER') {
        return NextResponse.redirect(new URL('/membro/dashboard', request.url))
      } else if (user.role === 'CHURCH') {
        return NextResponse.redirect(new URL('/igreja/dashboard', request.url))
      } else if (user.role === 'ADMIN') {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url))
      }
    } catch {
      // Se erro ao parsear, deixar passar
    }
  }

  // Verificar acesso por role
  if (session) {
    try {
      const user = JSON.parse(session.value)
      
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
    } catch {
      // Se erro, redirecionar para login
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
