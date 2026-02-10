'use client'

import { useEffect, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Users, Building2, TrendingUp, DollarSign, FileText, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

interface AdminData {
  totalChurches: number
  totalMembers: number
  totalVolume: number
  totalOperations: number
  totalSupport: number
  pendingChurches: number
  pendingMembers: number
}

export default function AdminDashboard() {
  const [data, setData] = useState<AdminData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/dashboard')
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

  const stats = [
    { icon: Building2, label: 'Igrejas', value: data?.totalChurches || 0, sub: 'Aprovadas', tag: 'Total' },
    { icon: Users, label: 'Membros', value: data?.totalMembers || 0, sub: 'Ativos', tag: 'Total' },
    { icon: TrendingUp, label: 'Volume', value: `R$ ${((data?.totalVolume || 0) / 1000).toFixed(0)}k`, sub: 'Gerado', tag: 'Volume' },
    { icon: DollarSign, label: 'Apoio', value: `R$ ${((data?.totalSupport || 0) / 1000).toFixed(0)}k`, sub: 'Repassado', tag: 'Apoio', gold: true },
  ]

  return (
    <main className="container mx-auto px-4 py-8 relative z-10">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">
          Dashboard <span className="gold-gradient-text">Administrativo</span>
        </h1>
        <p className="text-gray-400">Visao geral da plataforma</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                <stat.icon className="h-5 w-5 text-gold" />
              </div>
              <span className="text-xs text-gray-500 uppercase tracking-wider">{stat.tag}</span>
            </div>
            <div className={`text-3xl font-bold mb-1 ${stat.gold ? 'gold-gradient-text' : 'text-white'}`}>
              {stat.value}
            </div>
            <p className="text-gray-400 text-sm">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <Clock className="h-5 w-5 text-amber-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Pendentes</h3>
          </div>
          <div className="space-y-3">
            <Link href="/admin/igrejas" className="flex justify-between items-center p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-colors">
              <div className="flex items-center gap-3">
                <Building2 className="h-4 w-4 text-gold" />
                <span className="text-white">Igrejas pendentes</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-amber-500/10 text-amber-400 text-xs px-2 py-0.5 rounded-full font-medium">
                  {data?.pendingChurches || 0}
                </span>
                <ArrowRight className="h-4 w-4 text-gray-500" />
              </div>
            </Link>
            <Link href="/admin/membros" className="flex justify-between items-center p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-colors">
              <div className="flex items-center gap-3">
                <Users className="h-4 w-4 text-gold" />
                <span className="text-white">Membros pendentes</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-amber-500/10 text-amber-400 text-xs px-2 py-0.5 rounded-full font-medium">
                  {data?.pendingMembers || 0}
                </span>
                <ArrowRight className="h-4 w-4 text-gray-500" />
              </div>
            </Link>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-5">Visao Geral</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 rounded-xl bg-white/[0.03]">
              <span className="text-gray-400 text-sm">Media de membros por igreja</span>
              <span className="text-white font-semibold text-lg">
                {data && data.totalChurches > 0 ? Math.round(data.totalMembers / data.totalChurches) : 0}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-white/[0.03]">
              <span className="text-gray-400 text-sm">Percentual de apoio</span>
              <span className="text-gold font-semibold text-lg">2%</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-white/[0.03]">
              <span className="text-gray-400 text-sm">Total de operacoes</span>
              <span className="text-white font-semibold text-lg">{data?.totalOperations || 0}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Link href="/admin/igrejas" className="block">
          <Button className="w-full bg-gold text-black hover:bg-gold/90 rounded-xl h-12 font-semibold" size="lg">
            <Building2 className="mr-2 h-4 w-4" />
            Gerenciar Igrejas
          </Button>
        </Link>
        <Link href="/admin/membros" className="block">
          <Button className="w-full rounded-xl h-12 border-white/10 text-white hover:bg-white/5" variant="outline" size="lg">
            <Users className="mr-2 h-4 w-4" />
            Gerenciar Membros
          </Button>
        </Link>
        <Link href="/admin/repasses" className="block">
          <Button className="w-full rounded-xl h-12 border-white/10 text-white hover:bg-white/5" variant="outline" size="lg">
            <FileText className="mr-2 h-4 w-4" />
            Ver Repasses
          </Button>
        </Link>
      </div>
    </main>
  )
}
