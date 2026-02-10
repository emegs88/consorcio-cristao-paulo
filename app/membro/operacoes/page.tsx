'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { FileText, Plus, CheckCircle, Clock, XCircle, ChevronLeft, ChevronRight } from 'lucide-react'
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

interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

export default function Operacoes() {
  const [operations, setOperations] = useState<Operation[]>([])
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 20, total: 0, totalPages: 0 })
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [newOp, setNewOp] = useState({ type: 'consortium', amount: '', description: '' })

  useEffect(() => { loadOperations(1) }, [])

  const loadOperations = async (page: number) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/member/operations?page=${page}&limit=20`)
      if (response.ok) {
        const data = await response.json()
        setOperations(data.operations || [])
        setPagination(data.pagination || { page: 1, limit: 20, total: 0, totalPages: 0 })
      }
    } catch {
      toast.error('Erro ao carregar operacoes')
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async () => {
    const amount = parseFloat(newOp.amount)
    if (!amount || amount <= 0) { toast.error('Valor invalido'); return }
    setSubmitting(true)
    try {
      const response = await fetch('/api/operations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: newOp.type, amount, description: newOp.description || undefined }),
      })
      if (response.ok) {
        toast.success('Operacao criada com sucesso!')
        setDialogOpen(false)
        setNewOp({ type: 'consortium', amount: '', description: '' })
        loadOperations(1)
      } else {
        const data = await response.json()
        toast.error(data.error || 'Erro ao criar operacao')
      }
    } catch {
      toast.error('Erro ao criar operacao')
    } finally {
      setSubmitting(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      approved: 'bg-emerald-500/10 text-emerald-400',
      pending: 'bg-amber-500/10 text-amber-400',
      rejected: 'bg-red-500/10 text-red-400',
    }
    const labels: Record<string, string> = { approved: 'Aprovado', pending: 'Pendente', rejected: 'Rejeitado' }
    return (
      <span className={`inline-flex items-center text-xs px-2 py-0.5 rounded-full ${styles[status as keyof typeof styles] || 'bg-gray-500/10 text-gray-400'}`}>
        {labels[status] || status}
      </span>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8 relative z-10 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">
            Minhas <span className="gold-gradient-text">Operacoes</span>
          </h1>
          <p className="text-gray-400">Historico completo de suas operacoes de consorcio</p>
        </div>
        <Button onClick={() => setDialogOpen(true)} className="bg-gold text-black hover:bg-gold/90 rounded-xl font-semibold">
          <Plus className="mr-2 h-4 w-4" />
          Nova Operacao
        </Button>
      </div>

      {loading ? (
        <div className="space-y-4">{[1, 2, 3].map(i => <Skeleton key={i} className="h-20 w-full rounded-2xl bg-white/5" />)}</div>
      ) : operations.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center">
          <FileText className="h-16 w-16 text-gold/30 mx-auto mb-4" />
          <p className="text-gray-400 mb-4">Voce ainda nao possui operacoes</p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => setDialogOpen(true)} className="bg-gold text-black hover:bg-gold/90 rounded-xl">
              <Plus className="mr-2 h-4 w-4" /> Nova Operacao
            </Button>
            <Link href="/membro/simulador">
              <Button variant="outline" className="border-white/10 text-white rounded-xl">Simulador</Button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {operations.map((op) => (
              <div key={op.id} className="glass-card rounded-2xl p-5 flex flex-col md:flex-row justify-between md:items-center gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                    {op.status === 'approved' ? <CheckCircle className="h-5 w-5 text-emerald-400" /> :
                     op.status === 'pending' ? <Clock className="h-5 w-5 text-amber-400" /> :
                     <XCircle className="h-5 w-5 text-gray-400" />}
                  </div>
                  <div>
                    <h3 className="text-white font-medium capitalize">{op.type}</h3>
                    {op.description && <p className="text-gray-500 text-sm">{op.description}</p>}
                    <p className="text-gray-500 text-sm">
                      {new Date(op.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                </div>
                <div className="text-right md:text-right pl-13 md:pl-0">
                  <p className="text-xl font-bold text-gold mb-1">
                    R$ {op.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                  {getStatusBadge(op.status)}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <Button variant="outline" size="sm" className="border-white/10 text-white rounded-lg"
                disabled={pagination.page <= 1} onClick={() => loadOperations(pagination.page - 1)}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-gray-400 text-sm">
                Pagina {pagination.page} de {pagination.totalPages}
              </span>
              <Button variant="outline" size="sm" className="border-white/10 text-white rounded-lg"
                disabled={pagination.page >= pagination.totalPages} onClick={() => loadOperations(pagination.page + 1)}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      )}

      {/* Create Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[#0c0c1d] border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">Nova Operacao</DialogTitle>
            <DialogDescription className="text-gray-400">Crie uma nova operacao de consorcio</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-300 text-sm">Tipo</Label>
              <Select value={newOp.type} onValueChange={(v) => setNewOp(prev => ({ ...prev, type: v }))}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#0c0c1d] border-white/10">
                  <SelectItem value="consortium">Consorcio</SelectItem>
                  <SelectItem value="investment">Investimento</SelectItem>
                  <SelectItem value="services">Servicos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300 text-sm">Valor (R$)</Label>
              <Input type="number" placeholder="100000" value={newOp.amount}
                onChange={(e) => setNewOp(prev => ({ ...prev, amount: e.target.value }))}
                className="bg-white/5 border-white/10 text-white rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300 text-sm">Descricao (opcional)</Label>
              <Input placeholder="Ex: Consorcio para imovel" value={newOp.description}
                onChange={(e) => setNewOp(prev => ({ ...prev, description: e.target.value }))}
                className="bg-white/5 border-white/10 text-white rounded-xl" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" className="border-white/10 text-white" onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <Button className="bg-gold text-black hover:bg-gold/90" onClick={handleCreate} disabled={submitting}>
              {submitting ? 'Criando...' : 'Criar Operacao'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}
