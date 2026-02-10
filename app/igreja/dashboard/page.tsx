'use client'

import { useEffect, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Users, TrendingUp, Heart, FileText, DollarSign } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

interface ChurchData {
  name: string
  city: string
  pastorName: string
  totalMembers: number
  totalVolume: number
  totalSupport: number
  pendingSupport: number
  monthlySupport: number
}

export default function IgrejaDashboard() {
  const [data, setData] = useState<ChurchData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/church/dashboard')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(setData)
      .catch(() => toast.error('Erro ao carregar dados'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <Skeleton className="h-12 w-64 mb-8 bg-white/5" />
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-36 rounded-2xl bg-white/5" />)}
        </div>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8 relative z-10">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">
          <span className="gold-gradient-text">{data?.name}</span>
        </h1>
        <p className="text-gray-400">{data?.city} &bull; Pastor {data?.pastorName}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Users, value: data?.totalMembers || 0, label: 'Membros vinculados', tag: 'Total' },
          { icon: TrendingUp, value: `R$ ${((data?.totalVolume || 0) / 1000).toFixed(0)}k`, label: 'Gerado', tag: 'Volume' },
          { icon: Heart, value: `R$ ${(data?.totalSupport || 0).toLocaleString('pt-BR')}`, label: 'Acumulado', tag: 'Apoio', gold: true },
          { icon: DollarSign, value: `R$ ${(data?.pendingSupport || 0).toLocaleString('pt-BR')}`, label: 'A receber', tag: 'Pendente' },
        ].map((stat) => (
          <div key={stat.tag} className="stat-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                <stat.icon className="h-5 w-5 text-gold" />
              </div>
              <span className="text-xs text-gray-500 uppercase tracking-wider">{stat.tag}</span>
            </div>
            <div className={`text-2xl md:text-3xl font-bold mb-1 ${stat.gold ? 'gold-gradient-text' : 'text-white'}`}>{stat.value}</div>
            <p className="text-gray-400 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Resumo Mensal</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 rounded-xl bg-white/[0.03]">
              <span className="text-gray-400 text-sm">Apoio deste mes</span>
              <span className="text-gold font-semibold text-lg">R$ {(data?.monthlySupport || 0).toLocaleString('pt-BR')}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-white/[0.03]">
              <span className="text-gray-400 text-sm">Membros ativos</span>
              <span className="text-white font-semibold text-lg">{data?.totalMembers || 0}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-white/[0.03]">
              <span className="text-gray-400 text-sm">Percentual de apoio</span>
              <span className="text-gold font-semibold text-lg">2%</span>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Sobre o Apoio</h3>
          <p className="text-gray-400 text-sm mb-4 leading-relaxed">
            O apoio institucional e calculado automaticamente sobre as operacoes realizadas pelos membros vinculados à sua igreja.
          </p>
          <p className="text-gray-500 text-xs mb-6 leading-relaxed">
            Este valor e classificado como oferta voluntaria de apoio ao ministerio, nao como comissao comercial.
          </p>
          <Link href="/igreja/relatorios">
            <Button className="w-full bg-gold text-black hover:bg-gold/90 rounded-xl h-12 font-semibold" size="lg">
              <FileText className="mr-2 h-4 w-4" />
              Ver Relatorios Detalhados
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
