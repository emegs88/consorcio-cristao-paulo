'use client'

import { useEffect, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { TrendingUp, Heart, FileText, Calculator, Clock, ArrowRight, CreditCard } from 'lucide-react'
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
    fetch('/api/member/dashboard')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(setData)
      .catch(() => {
        toast.error('Erro ao carregar dados')
        setData({ name: 'Membro', churchName: 'Igreja', totalOperations: 0, totalAmount: 0, supportGenerated: 0 })
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <Skeleton className="h-12 w-64 mb-8 bg-white/5" />
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map(i => <Skeleton key={i} className="h-36 rounded-2xl bg-white/5" />)}
        </div>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8 relative z-10">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">
          Bem-vindo, <span className="gold-gradient-text">{data?.name}</span>
        </h1>
        <p className="text-gray-400">Seu planejamento patrimonial com proposito</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="stat-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
              <FileText className="h-5 w-5 text-gold" />
            </div>
            <span className="text-xs text-gray-500 uppercase tracking-wider">Total</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{data?.totalOperations}</div>
          <p className="text-gray-400 text-sm">Operacoes realizadas</p>
        </div>

        <div className="stat-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-gold" />
            </div>
            <span className="text-xs text-gray-500 uppercase tracking-wider">Volume</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">
            R$ {data?.totalAmount.toLocaleString('pt-BR')}
          </div>
          <p className="text-gray-400 text-sm">Valor acumulado</p>
        </div>

        <div className="stat-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
              <Heart className="h-5 w-5 text-gold" />
            </div>
            <span className="text-xs text-gray-500 uppercase tracking-wider">Apoio</span>
          </div>
          <div className="text-3xl font-bold gold-gradient-text mb-1">
            R$ {data?.supportGenerated.toLocaleString('pt-BR')}
          </div>
          <p className="text-gray-400 text-sm">Gerado para sua igreja</p>
        </div>
      </div>

      {/* Quick Actions + Church Support */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Acoes Rapidas</h3>
          <div className="space-y-3">
            <Link href="/membro/simulador" className="block">
              <Button className="w-full bg-gold text-black hover:bg-gold/90 rounded-xl h-12 font-semibold" size="lg">
                <Calculator className="mr-2 h-4 w-4" />
                Simulador de Consorcio
              </Button>
            </Link>
            <Link href="/membro/cartas" className="block">
              <Button className="w-full rounded-xl h-12 border-white/10 text-white hover:bg-white/5" variant="outline" size="lg">
                <CreditCard className="mr-2 h-4 w-4" />
                Cartas Disponiveis
              </Button>
            </Link>
            <Link href="/membro/operacoes" className="block">
              <Button className="w-full rounded-xl h-12 border-white/10 text-white hover:bg-white/5" variant="outline" size="lg">
                <FileText className="mr-2 h-4 w-4" />
                Minhas Operacoes
              </Button>
            </Link>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Apoio à Sua Igreja</h3>
            <span className="text-xs text-gold bg-gold/10 px-3 py-1 rounded-full">{data?.churchName}</span>
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">Total gerado</p>
            <p className="text-3xl font-bold gold-gradient-text">
              R$ {data?.supportGenerated.toLocaleString('pt-BR')}
            </p>
          </div>
          <p className="text-sm text-gray-400 mb-4 leading-relaxed">
            Parte das suas operacoes e destinada à sua igreja como forma de apoio voluntario ao ministerio.
          </p>
          <Link href="/membro/igreja">
            <Button variant="outline" className="w-full rounded-xl border-gold/20 text-gold hover:bg-gold/5">
              Ver Detalhes
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Recent Operations */}
      {data?.recentOperations && data.recentOperations.length > 0 && (
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-gold" />
              </div>
              <h3 className="text-lg font-semibold text-white">Operacoes Recentes</h3>
            </div>
            <Link href="/membro/operacoes" className="text-sm text-gold hover:text-gold/80 flex items-center gap-1">
              Ver todas <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {data.recentOperations.map((op) => (
              <div key={op.id} className="flex justify-between items-center p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-colors">
                <div>
                  <p className="text-white font-medium">{op.type}</p>
                  <p className="text-gray-500 text-sm">
                    {new Date(op.createdAt).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gold font-semibold">
                    R$ {op.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                  <span className={`inline-flex items-center text-xs px-2 py-0.5 rounded-full ${
                    op.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400' :
                    op.status === 'pending' ? 'bg-amber-500/10 text-amber-400' :
                    'bg-gray-500/10 text-gray-400'
                  }`}>
                    {op.status === 'approved' ? 'Aprovado' :
                     op.status === 'pending' ? 'Pendente' :
                     op.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
