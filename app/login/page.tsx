'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
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
        // Redirecionar baseado no role
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
    } catch (error) {
      toast.error('Erro ao fazer login. Tente novamente.')
    }
  }

  return (
    <div className="min-h-screen premium-gradient flex items-center justify-center py-12">
      <div className="container mx-auto px-4 max-w-md">
        <Link href="/" className="inline-flex items-center text-gold hover:text-gold/80 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Link>

        <Card className="bg-black/60 border-gold/50">
          <CardHeader>
            <CardTitle className="text-3xl text-gold">Login</CardTitle>
            <CardDescription className="text-gray-300">
              Acesse sua conta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {Object.keys(errors).length > 0 && (
                <Alert variant="destructive">
                  <AlertDescription>
                    Por favor, corrija os erros no formulário.
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  className="bg-black/40 border-gold/30 text-white"
                />
                {errors.email && (
                  <p className="text-sm text-red-400">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  {...register('password')}
                  className="bg-black/40 border-gold/30 text-white"
                />
                {errors.password && (
                  <p className="text-sm text-red-400">{errors.password.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gold text-black hover:bg-gold/90"
                size="lg"
              >
                {isSubmitting ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                Não tem uma conta?{' '}
                <Link href="/cadastro/membro" className="text-gold hover:underline">
                  Solicite acesso
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
