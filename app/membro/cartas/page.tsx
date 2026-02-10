'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { CreditCard, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

interface Operation {
  id: string
  type: string
  amount: number
  status: string
  description?: string
  createdAt: string
}

export default function CartasDisponiveis() {
  const [operations, setOperations] = useState<Operation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/member/operations?limit=50')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => {
        const approved = (data.operations || []).filter((op: Operation) => op.status === 'approved')
        setOperations(approved)
      })
      .catch(() => toast.error('Erro ao carregar cartas'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="container mx-auto px-4 py-8 relative z-10 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">
          Cartas <span className="gold-gradient-text">Disponiveis</span>
        </h1>
        <p className="text-gray-400">Suas operacoes aprovadas que funcionam como cartas de credito</p>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => <Skeleton key={i} className="h-48 rounded-2xl bg-white/5" />)}
        </div>
      ) : operations.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center">
          <CreditCard className="h-16 w-16 text-gold/30 mx-auto mb-4" />
          <p className="text-gray-400 mb-2">Nenhuma carta disponivel</p>
          <p className="text-gray-500 text-sm mb-6">
            Cartas sao geradas quando suas operacoes sao aprovadas. Crie uma operacao pelo simulador para comecar.
          </p>
          <Link href="/membro/simulador">
            <Button className="bg-gold text-black hover:bg-gold/90 rounded-xl">
              Acessar Simulador
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {operations.map((op) => (
            <div key={op.id} className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium capitalize">{op.type}</h3>
                  <p className="text-gray-500 text-xs">
                    {new Date(op.createdAt).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-gray-500 text-xs mb-1">Valor da Carta</p>
                <p className="text-2xl font-bold gold-gradient-text">
                  R$ {op.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
              {op.description && (
                <p className="text-gray-500 text-sm mb-4">{op.description}</p>
              )}
              <div className="inline-flex items-center text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400">
                <CheckCircle className="h-3 w-3 mr-1" />
                Aprovada
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
