import { prisma } from './prisma'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import crypto from 'crypto'

export interface SessionUser {
  id: string
  email: string
  name: string
  role: 'MEMBER' | 'CHURCH' | 'ADMIN'
}

const SESSION_SECRET = process.env.SESSION_SECRET || 'default-secret-change-in-production'

export function signPayload(payload: string): string {
  const signature = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('base64url')
  return `${Buffer.from(payload).toString('base64url')}.${signature}`
}

export function verifyAndParse(signed: string): SessionUser | null {
  const parts = signed.split('.')
  if (parts.length !== 2) return null
  const [payloadB64, signature] = parts
  const payload = Buffer.from(payloadB64, 'base64url').toString('utf-8')
  const expectedSig = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('base64url')
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))) return null
  return JSON.parse(payload) as SessionUser
}

export async function createSession(user: SessionUser) {
  const cookieStore = await cookies()
  cookieStore.set('session', signPayload(JSON.stringify(user)), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}

export async function getSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get('session')
    if (!session) return null
    return verifyAndParse(session.value)
  } catch {
    return null
  }
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}

export async function verifyCredentials(email: string, password: string): Promise<SessionUser | null> {
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      member: true,
      church: true,
    },
  })

  if (!user) return null

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) return null

  // Verificar aprovação
  if (user.role === 'MEMBER' && user.member?.approvalStatus !== 'APPROVED') {
    return null
  }

  if (user.role === 'CHURCH' && user.church?.approvalStatus !== 'APPROVED') {
    return null
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role as SessionUser['role'],
  }
}
