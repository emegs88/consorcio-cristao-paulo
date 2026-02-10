'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { FileText, ArrowLeft, CheckCircle, Clock, XCircle } from 'lucide-react'
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

export default function Operacoes() {
  const [operations, setOperations] = useState<Operation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadOperations()
  }, [])

  const loadOperations = async () => {
    try {
      const response = await fetch('/api/member/dashboard')
      if (response.ok) {
        const data = await response.json()
        setOperations(data.recentOperations || [])
      }
    } catch (error) {
      toast.error('Erro ao carregar operações')
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-400" />
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-400" />
      default:
        return <XCircle className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Aprovado'
      case 'pending':
        return 'Pendente'
      case 'rejected':
        return 'Rejeitado'
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen premium-gradient py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <Link href="/membro/dashboard" className="inline-flex items-center text-gold hover:text-gold/80 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Link>

        <Card className="bg-black/60 border-gold/50 mb-6">
          <CardHeader>
            <CardTitle className="text-3xl text-gold flex items-center">
              <FileText className="mr-3 h-8 w-8" />
              Minhas Operações
            </CardTitle>
            <CardDescription className="text-gray-300">
              Histórico completo de suas operações de consórcio
            </CardDescription>
          </CardHeader>
        </Card>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="h-20 w-full bg-gold/20" />
            ))}
          </div>
        ) : operations.length === 0 ? (
          <Card className="bg-black/40 border-gold/30">
            <CardContent className="pt-6 text-center">
              <p className="text-gray-400 mb-4">Você ainda não possui operações</p>
              <Link href="/membro/simulador">
                <Button className="bg-gold text-black hover:bg-gold/90">
                  Criar Primeira Operação
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {operations.map((op) => (
              <Card key={op.id} className="bg-black/40 border-gold/30">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getStatusIcon(op.status)}
                        <h3 className="text-white font-semibold text-lg capitalize">
                          {op.type}
                        </h3>
                      </div>
                      {op.description && (
                        <p className="text-gray-400 text-sm mb-2">{op.description}</p>
                      )}
                      <p className="text-gray-400 text-sm">
                        {new Date(op.createdAt).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gold mb-1">
                        R$ {op.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        op.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                        op.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {getStatusText(op.status)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
