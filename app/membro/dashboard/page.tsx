'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { TrendingUp, Heart, FileText, Calculator, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

interface MemberData {
  name: string
  churchName: string
  totalOperations: number
  totalAmount: number
  supportGenerated: number
  recentOperations?: Array<{
    id: string
    amount: number
    type: string
    status: string
    createdAt: string
  }>
}

export default function MembroDashboard() {
  const [data, setData] = useState<MemberData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const response = await fetch('/api/member/dashboard')
      if (response.ok) {
        const result = await response.json()
        setData(result)
      } else {
        // Fallback para dados simulados se API falhar
        setData({
          name: 'Membro',
          churchName: 'Igreja',
          totalOperations: 0,
          totalAmount: 0,
          supportGenerated: 0,
        })
      }
    } catch (error) {
      toast.error('Erro ao carregar dados')
      setData({
        name: 'Membro',
        churchName: 'Igreja',
        totalOperations: 0,
        totalAmount: 0,
        supportGenerated: 0,
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen premium-gradient">
        <header className="border-b border-gold/20">
          <div className="container mx-auto px-4 py-6 flex justify-between items-center">
            <Skeleton className="h-8 w-48 bg-gold/20" />
            <Skeleton className="h-10 w-32 bg-gold/20" />
          </div>
        </header>
        <main className="container mx-auto px-4 py-12">
          <Skeleton className="h-12 w-64 mb-4 bg-gold/20" />
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="h-32 bg-gold/20" />
            ))}
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen premium-gradient">
      <header className="border-b border-gold/20">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="text-2xl font-bold text-gold">Prospere Aliança</div>
          <nav className="flex gap-4">
            <Link href="/membro/dashboard" className="text-white hover:text-gold">Dashboard</Link>
            <Link href="/membro/simulador" className="text-white hover:text-gold">Simulador</Link>
            <Link href="/membro/cartas" className="text-white hover:text-gold">Cartas</Link>
            <Link href="/membro/operacoes" className="text-white hover:text-gold">Operações</Link>
            <Link href="/membro/igreja" className="text-white hover:text-gold">Minha Igreja</Link>
            <Button variant="outline" className="border-gold text-gold" onClick={async () => {
              await fetch('/api/logout', { method: 'POST' })
              window.location.href = '/login'
            }}>Sair</Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-2">Bem-vindo, {data?.name}</h1>
        <p className="text-gray-300 mb-8">Seu planejamento patrimonial com propósito</p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-black/40 border-gold/30">
            <CardHeader>
              <CardTitle className="text-gold flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Operações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{data?.totalOperations}</div>
              <p className="text-gray-400 text-sm">Total de operações</p>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-gold/30">
            <CardHeader>
              <CardTitle className="text-gold flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                Volume Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">
                R$ {data?.totalAmount.toLocaleString('pt-BR')}
              </div>
              <p className="text-gray-400 text-sm">Valor acumulado</p>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-gold/30">
            <CardHeader>
              <CardTitle className="text-gold flex items-center">
                <Heart className="mr-2 h-5 w-5" />
                Apoio Gerado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">
                R$ {data?.supportGenerated.toLocaleString('pt-BR')}
              </div>
              <p className="text-gray-400 text-sm">Para sua igreja</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-black/40 border-gold/30">
            <CardHeader>
              <CardTitle className="text-gold">Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/membro/simulador">
                <Button className="w-full bg-gold text-black hover:bg-gold/90" size="lg">
                  <Calculator className="mr-2 h-4 w-4" />
                  Simulador de Consórcio
                </Button>
              </Link>
              <Link href="/membro/cartas">
                <Button className="w-full" variant="outline" size="lg">
                  <FileText className="mr-2 h-4 w-4" />
                  Cartas Disponíveis
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-gold/30">
            <CardHeader>
              <CardTitle className="text-gold">Apoio à Sua Igreja</CardTitle>
              <CardDescription className="text-gray-300">
                {data?.churchName}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400">Total gerado</p>
                  <p className="text-2xl font-bold text-gold">
                    R$ {data?.supportGenerated.toLocaleString('pt-BR')}
                  </p>
                </div>
                <p className="text-sm text-gray-300">
                  Parte das suas operações é destinada à sua igreja como forma de apoio voluntário ao ministério.
                </p>
                <Link href="/membro/igreja">
                  <Button variant="outline" className="w-full border-gold text-gold">
                    Ver Detalhes
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {data?.recentOperations && data.recentOperations.length > 0 && (
          <Card className="bg-black/40 border-gold/30">
            <CardHeader>
              <CardTitle className="text-gold flex items-center justify-between">
                <span className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  Operações Recentes
                </span>
                <Link href="/membro/operacoes" className="text-sm text-gold hover:underline flex items-center">
                  Ver todas <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {data.recentOperations.map((op) => (
                  <div
                    key={op.id}
                    className="p-4 bg-black/30 rounded-lg border border-gold/20 flex justify-between items-center"
                  >
                    <div>
                      <p className="text-white font-semibold">{op.type}</p>
                      <p className="text-gray-400 text-sm">
                        {new Date(op.createdAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-gold font-bold">
                        R$ {op.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                      <p className={`text-xs ${
                        op.status === 'approved' ? 'text-green-400' :
                        op.status === 'pending' ? 'text-yellow-400' :
                        'text-gray-400'
                      }`}>
                        {op.status === 'approved' ? 'Aprovado' :
                         op.status === 'pending' ? 'Pendente' :
                         op.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
