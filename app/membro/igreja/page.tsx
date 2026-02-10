'use client'

import { useEffect, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Heart, TrendingUp, Users, User } from 'lucide-react'
import toast from 'react-hot-toast'

interface ChurchInfo {
  name: string
  city: string
  totalMembers: number
  totalVolume: number
  totalSupport: number
  myVolume: number
  mySupport: number
}

export default function MinhaIgreja() {
  const [data, setData] = useState<ChurchInfo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/member/church')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(setData)
      .catch(() => toast.error('Erro ao carregar dados da igreja'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Skeleton className="h-12 w-64 mb-8 bg-white/5" />
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {[1, 2, 3].map(i => <Skeleton key={i} className="h-36 rounded-2xl bg-white/5" />)}
        </div>
      </main>
    )
  }

  if (!data) {
    return (
      <main className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
        <div className="glass-card rounded-2xl p-12 text-center">
          <Heart className="h-16 w-16 text-gold/30 mx-auto mb-4" />
          <p className="text-gray-400 mb-2">Voce nao esta vinculado a uma igreja</p>
          <p className="text-gray-500 text-sm">Entre em contato com o administrador para vincular sua conta a uma igreja.</p>
        </div>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8 relative z-10 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">
          <span className="gold-gradient-text">{data.name}</span>
        </h1>
        <p className="text-gray-400">{data.city}</p>
      </div>

      {/* Church Stats */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="stat-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-gold" />
            </div>
            <span className="text-xs text-gray-500 uppercase tracking-wider">Total</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{data.totalMembers}</div>
          <p className="text-gray-400 text-sm">Membros vinculados</p>
        </div>

        <div className="stat-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-gold" />
            </div>
            <span className="text-xs text-gray-500 uppercase tracking-wider">Volume</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">
            R$ {data.totalVolume.toLocaleString('pt-BR')}
          </div>
          <p className="text-gray-400 text-sm">Gerado pela igreja</p>
        </div>

        <div className="stat-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
              <Heart className="h-5 w-5 text-gold" />
            </div>
            <span className="text-xs text-gray-500 uppercase tracking-wider">Apoio</span>
          </div>
          <div className="text-3xl font-bold gold-gradient-text mb-1">
            R$ {data.totalSupport.toLocaleString('pt-BR')}
          </div>
          <p className="text-gray-400 text-sm">Apoio institucional</p>
        </div>
      </div>

      {/* My contribution */}
      <div className="glass-card rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
            <User className="h-5 w-5 text-gold" />
          </div>
          <h3 className="text-lg font-semibold text-white">Minha Contribuicao</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white/[0.03]">
            <p className="text-gray-500 text-xs mb-1">Meu volume</p>
            <p className="text-2xl font-bold text-white">R$ {data.myVolume.toLocaleString('pt-BR')}</p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.03]">
            <p className="text-gray-500 text-xs mb-1">Apoio que gerei</p>
            <p className="text-2xl font-bold gold-gradient-text">R$ {data.mySupport.toLocaleString('pt-BR')}</p>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-3">Sobre o Apoio Institucional</h3>
        <p className="text-gray-400 text-sm mb-3 leading-relaxed">
          Parte dos resultados das operacoes realizadas pelos membros vinculados à sua igreja e destinada como forma de apoio voluntario ao ministerio.
        </p>
        <div className="p-4 rounded-xl bg-gold/5 border border-gold/10">
          <p className="text-sm text-gray-300">
            <strong className="text-gold">Percentual de apoio:</strong> 2% sobre cada operacao
          </p>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          Este apoio e classificado como oferta institucional, nao como comissao comercial.
        </p>
      </div>
    </main>
  )
}
