import { NextResponse } from 'next/server'
import { getSession, SessionUser } from './auth'

type AuthResult =
  | { success: true; session: SessionUser }
  | { success: false; response: NextResponse }

export async function requireAuth(allowedRoles?: string[]): Promise<AuthResult> {
  const session = await getSession()

  if (!session) {
    return {
      success: false,
      response: NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      ),
    }
  }

  if (allowedRoles && !allowedRoles.includes(session.role)) {
    return {
      success: false,
      response: NextResponse.json(
        { error: 'Sem permissão' },
        { status: 403 }
      ),
    }
  }

  return { success: true, session }
}
