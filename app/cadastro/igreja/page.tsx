'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'
import { churchSchema, type ChurchFormData } from '@/lib/validations'

export default function CadastroIgreja() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<ChurchFormData>({
    resolver: zodResolver(churchSchema),
  })

  const conventionId = watch('conventionId')

  const onSubmit = async (data: ChurchFormData) => {
    try {
      const response = await fetch('/api/cadastro/igreja', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success('Cadastro realizado com sucesso! Aguarde aprovação.')
        router.push('/cadastro/sucesso?tipo=igreja')
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
            <CardTitle className="text-3xl text-gold">Cadastro de Igreja</CardTitle>
            <CardDescription className="text-gray-300">
              Cadastre sua igreja para receber apoio institucional dos membros
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
                <Label htmlFor="name" className="text-white">Nome da Igreja *</Label>
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
                <Label htmlFor="email" className="text-white">E-mail para Login *</Label>
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
                <Label htmlFor="pastorName" className="text-white">Pastor Responsável *</Label>
                <Input
                  id="pastorName"
                  {...register('pastorName')}
                  className="bg-black/40 border-gold/30 text-white"
                />
                {errors.pastorName && (
                  <p className="text-sm text-red-400">{errors.pastorName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cnpj" className="text-white">CNPJ</Label>
                <Input
                  id="cnpj"
                  {...register('cnpj')}
                  className="bg-black/40 border-gold/30 text-white"
                  placeholder="00.000.000/0000-00"
                />
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
                <Label htmlFor="memberCount" className="text-white">Número de Membros</Label>
                <Input
                  id="memberCount"
                  type="number"
                  {...register('memberCount')}
                  className="bg-black/40 border-gold/30 text-white"
                  placeholder="Aproximadamente"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bankAccount" className="text-white">Conta Bancária</Label>
                <Input
                  id="bankAccount"
                  {...register('bankAccount')}
                  className="bg-black/40 border-gold/30 text-white"
                  placeholder="Banco, Agência, Conta"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="conventionId" className="text-white">Convenção/Denominação</Label>
                <Select
                  value={conventionId || ''}
                  onValueChange={(value) => setValue('conventionId', value)}
                >
                  <SelectTrigger className="bg-black/40 border-gold/30 text-white">
                    <SelectValue placeholder="Selecione uma convenção" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Nenhuma (Igreja independente)</SelectItem>
                    <SelectItem value="cbesp">CBESP - Convenção Batista do Estado de São Paulo</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-400 mt-1">
                  <Link href="/sobre/cbesp" className="text-gold hover:underline">
                    Saiba mais sobre a CBESP
                  </Link>
                </p>
              </div>

              <div className="p-4 bg-gold/10 rounded-md border border-gold/30">
                <p className="text-sm text-gray-300">
                  <strong className="text-gold">Atenção:</strong> Após o cadastro, sua igreja passará por um processo de aprovação. Você receberá um e-mail quando o acesso for liberado.
                </p>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gold text-black hover:bg-gold/90"
                size="lg"
              >
                {isSubmitting ? 'Enviando...' : 'Cadastrar Igreja'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
