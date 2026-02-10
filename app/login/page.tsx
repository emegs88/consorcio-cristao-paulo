'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Link from 'next/link'
import { ArrowLeft, Lock } from 'lucide-react'
import toast from 'react-hot-toast'
import { loginSchema, type LoginFormData } from '@/lib/validations'

export default function Login() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok && result.user) {
        toast.success('Login realizado com sucesso!')
        if (result.user.role === 'MEMBER') {
          router.push('/membro/dashboard')
        } else if (result.user.role === 'CHURCH') {
          router.push('/igreja/dashboard')
        } else if (result.user.role === 'ADMIN') {
          router.push('/admin/dashboard')
        }
        router.refresh()
      } else {
        toast.error(result.error || 'E-mail ou senha incorretos')
      }
    } catch {
      toast.error('Erro ao fazer login. Tente novamente.')
    }
  }

  return (
    <div className="min-h-screen premium-gradient flex items-center justify-center py-12">
      <div className="container mx-auto px-4 max-w-md relative z-10">
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-gold transition mb-8 text-sm">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar ao inicio
        </Link>

        <div className="glass-card rounded-3xl p-8 md:p-10 gold-glow">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-4">
              <Lock className="h-7 w-7 text-gold" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Entrar</h1>
            <p className="text-gray-400">Acesse sua conta Prospere Alianca</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {Object.keys(errors).length > 0 && (
              <Alert variant="destructive" className="rounded-xl">
                <AlertDescription>
                  Por favor, corrija os erros no formulario.
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300 text-sm">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                {...register('email')}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl h-12 focus:border-gold/50"
              />
              {errors.email && (
                <p className="text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300 text-sm">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Sua senha"
                {...register('password')}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl h-12 focus:border-gold/50"
              />
              {errors.password && (
                <p className="text-sm text-red-400">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gold text-black hover:bg-gold/90 rounded-xl h-12 font-semibold text-base"
              size="lg"
            >
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              Nao tem uma conta?{' '}
              <Link href="/cadastro/membro" className="text-gold hover:underline font-medium">
                Solicite acesso
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
