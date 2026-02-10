'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'
import { memberSchema, type MemberFormData } from '@/lib/validations'

export default function CadastroMembro() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<MemberFormData>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      linkChurch: true,
    },
  })

  const linkChurch = watch('linkChurch')

  const onSubmit = async (data: MemberFormData) => {
    try {
      const response = await fetch('/api/cadastro/membro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success('Cadastro realizado com sucesso! Aguarde aprovação.')
        router.push('/cadastro/sucesso?tipo=membro')
      } else {
        toast.error(result.error || 'Erro ao cadastrar. Tente novamente.')
      }
    } catch (error) {
      toast.error('Erro ao cadastrar. Tente novamente.')
    }
  }

  return (
    <div className="min-h-screen premium-gradient py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Link href="/" className="inline-flex items-center text-gold hover:text-gold/80 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Link>

        <Card className="bg-black/60 border-gold/50">
          <CardHeader>
            <CardTitle className="text-3xl text-gold">Cadastro de Membro</CardTitle>
            <CardDescription className="text-gray-300">
              Preencha os dados para solicitar acesso à comunidade
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
                <Label htmlFor="name" className="text-white">Nome Completo *</Label>
                <Input
                  id="name"
                  {...register('name')}
                  className="bg-black/40 border-gold/30 text-white"
                />
                {errors.name && (
                  <p className="text-sm text-red-400">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">E-mail *</Label>
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
                <Label htmlFor="password" className="text-white">Senha *</Label>
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

              <div className="space-y-2">
                <Label htmlFor="churchName" className="text-white">Igreja onde congrega *</Label>
                <Input
                  id="churchName"
                  {...register('churchName')}
                  className="bg-black/40 border-gold/30 text-white"
                  placeholder="Nome da igreja"
                />
                {errors.churchName && (
                  <p className="text-sm text-red-400">{errors.churchName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="city" className="text-white">Cidade *</Label>
                <Input
                  id="city"
                  {...register('city')}
                  className="bg-black/40 border-gold/30 text-white"
                />
                {errors.city && (
                  <p className="text-sm text-red-400">{errors.city.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsapp" className="text-white">WhatsApp *</Label>
                <Input
                  id="whatsapp"
                  {...register('whatsapp')}
                  className="bg-black/40 border-gold/30 text-white"
                  placeholder="(00) 00000-0000"
                />
                {errors.whatsapp && (
                  <p className="text-sm text-red-400">{errors.whatsapp.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="referral" className="text-white">Indicação</Label>
                <Input
                  id="referral"
                  {...register('referral')}
                  className="bg-black/40 border-gold/30 text-white"
                  placeholder="Quem te indicou? (opcional)"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="financialGoal" className="text-white">Objetivo Financeiro</Label>
                <Input
                  id="financialGoal"
                  {...register('financialGoal')}
                  className="bg-black/40 border-gold/30 text-white"
                  placeholder="Ex: Compra de imóvel, investimento, etc."
                />
              </div>

              <div className="flex items-center space-x-2 p-4 bg-black/30 rounded-md border border-gold/20">
                <Checkbox
                  id="linkChurch"
                  checked={linkChurch}
                  onCheckedChange={(checked) => setValue('linkChurch', checked as boolean)}
                />
                <Label htmlFor="linkChurch" className="text-white cursor-pointer">
                  Vincular minha igreja para receber apoio institucional
                </Label>
              </div>

              <div className="p-4 bg-gold/10 rounded-md border border-gold/30">
                <p className="text-sm text-gray-300">
                  <strong className="text-gold">Importante:</strong> Parte dos resultados da plataforma é destinada às igrejas vinculadas pelos membros, como forma de apoio voluntário ao ministério.
                </p>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gold text-black hover:bg-gold/90"
                size="lg"
              >
                {isSubmitting ? 'Enviando...' : 'Solicitar Acesso'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
