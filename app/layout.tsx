import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ToastProvider } from '@/components/ui/toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Prospere Aliança - Comunidade Privada de Planejamento Patrimonial',
  description: 'Comunidade privada de planejamento patrimonial para membros cristãos. Ao participar, você fortalece sua família e também a obra onde congrega.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {children}
        <ToastProvider />
      </body>
    </html>
  )
}
