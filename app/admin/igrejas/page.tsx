'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { Search, Check, X } from 'lucide-react'
import toast from 'react-hot-toast'

interface Church {
  id: string
  name: string
  email: string
  pastorName: string
  city: string
  approvalStatus: string
  createdAt: string
}

export default function AdminIgrejas() {
  const [churches, setChurches] = useState<Church[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedChurch, setSelectedChurch] = useState<Church | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => { loadChurches() }, [])

  const loadChurches = async () => {
    try {
      const response = await fetch('/api/admin/churches')
      if (response.ok) {
        const data = await response.json()
        setChurches(data.churches || [])
      }
    } catch {
      toast.error('Erro ao carregar igrejas')
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (churchId: string) => {
    try {
      const response = await fetch(`/api/admin/churches/${churchId}/approve`, { method: 'POST' })
      if (response.ok) { toast.success('Igreja aprovada!'); loadChurches(); setDialogOpen(false) }
      else toast.error('Erro ao aprovar igreja')
    } catch { toast.error('Erro ao aprovar igreja') }
  }

  const handleReject = async (churchId: string) => {
    try {
      const response = await fetch(`/api/admin/churches/${churchId}/reject`, { method: 'POST' })
      if (response.ok) { toast.success('Igreja rejeitada'); loadChurches(); setDialogOpen(false) }
      else toast.error('Erro ao rejeitar igreja')
    } catch { toast.error('Erro ao rejeitar igreja') }
  }

  const filteredChurches = churches.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.city.toLowerCase().includes(search.toLowerCase())
  )
  const pendingChurches = filteredChurches.filter(c => c.approvalStatus === 'PENDING')
  const approvedChurches = filteredChurches.filter(c => c.approvalStatus === 'APPROVED')

  return (
    <main className="container mx-auto px-4 py-8 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">Gerenciar Igrejas</h1>
          <p className="text-gray-400">Aprovar ou rejeitar cadastros de igrejas</p>
        </div>
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input placeholder="Buscar igrejas..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="pl-10 w-full md:w-72 bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl h-11 focus:border-gold/50" />
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">{[1, 2, 3].map(i => <Skeleton key={i} className="h-20 w-full rounded-2xl bg-white/5" />)}</div>
      ) : (
        <>
          <div className="glass-card rounded-2xl p-6 mb-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="bg-amber-500/10 text-amber-400 text-xs px-2 py-0.5 rounded-full">{pendingChurches.length}</span>
              Pendentes de Aprovacao
            </h2>
            {pendingChurches.length === 0 ? (
              <p className="text-gray-500 text-sm">Nenhuma igreja pendente</p>
            ) : (
              <div className="space-y-3">
                {pendingChurches.map((church) => (
                  <div key={church.id} className="flex flex-col md:flex-row justify-between md:items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-colors">
                    <div>
                      <h3 className="text-white font-medium">{church.name}</h3>
                      <p className="text-gray-500 text-sm">{church.email}</p>
                      <p className="text-gray-500 text-sm">{church.city} &bull; Pastor: {church.pastorName}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 rounded-lg"
                        onClick={() => { setSelectedChurch(church); setDialogOpen(true) }}>
                        <Check className="h-4 w-4 mr-1" /> Aprovar
                      </Button>
                      <Button size="sm" variant="destructive" className="rounded-lg" onClick={() => handleReject(church.id)}>
                        <X className="h-4 w-4 mr-1" /> Rejeitar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2 py-0.5 rounded-full">{approvedChurches.length}</span>
              Igrejas Aprovadas
            </h2>
            {approvedChurches.length === 0 ? (
              <p className="text-gray-500 text-sm">Nenhuma igreja aprovada</p>
            ) : (
              <div className="space-y-3">
                {approvedChurches.map((church) => (
                  <div key={church.id} className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                    <h3 className="text-white font-medium">{church.name}</h3>
                    <p className="text-gray-500 text-sm">{church.email}</p>
                    <p className="text-gray-500 text-sm">{church.city} &bull; Pastor: {church.pastorName}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[#0c0c1d] border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">Confirmar Aprovacao</DialogTitle>
            <DialogDescription className="text-gray-400">Deseja aprovar a igreja {selectedChurch?.name}?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" className="border-white/10 text-white" onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <Button className="bg-gold text-black hover:bg-gold/90" onClick={() => selectedChurch && handleApprove(selectedChurch.id)}>Confirmar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}
