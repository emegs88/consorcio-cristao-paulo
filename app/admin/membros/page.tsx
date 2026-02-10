'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { Search, Check, X } from 'lucide-react'
import toast from 'react-hot-toast'

interface Member {
  id: string
  name: string
  email: string
  churchName: string | null
  city: string
  whatsapp: string
  approvalStatus: string
  createdAt: string
}

export default function AdminMembros() {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => { loadMembers() }, [])

  const loadMembers = async () => {
    try {
      const response = await fetch('/api/admin/members')
      if (response.ok) {
        const data = await response.json()
        setMembers(data.members || [])
      }
    } catch {
      toast.error('Erro ao carregar membros')
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (memberId: string) => {
    try {
      const response = await fetch(`/api/admin/members/${memberId}/approve`, { method: 'POST' })
      if (response.ok) { toast.success('Membro aprovado!'); loadMembers(); setDialogOpen(false) }
      else toast.error('Erro ao aprovar membro')
    } catch { toast.error('Erro ao aprovar membro') }
  }

  const handleReject = async (memberId: string) => {
    try {
      const response = await fetch(`/api/admin/members/${memberId}/reject`, { method: 'POST' })
      if (response.ok) { toast.success('Membro rejeitado'); loadMembers(); setDialogOpen(false) }
      else toast.error('Erro ao rejeitar membro')
    } catch { toast.error('Erro ao rejeitar membro') }
  }

  const filteredMembers = members.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase()) ||
    m.city.toLowerCase().includes(search.toLowerCase())
  )
  const pendingMembers = filteredMembers.filter(m => m.approvalStatus === 'PENDING')
  const approvedMembers = filteredMembers.filter(m => m.approvalStatus === 'APPROVED')

  return (
    <main className="container mx-auto px-4 py-8 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">Gerenciar Membros</h1>
          <p className="text-gray-400">Aprovar ou rejeitar cadastros de membros</p>
        </div>
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input placeholder="Buscar membros..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="pl-10 w-full md:w-72 bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl h-11 focus:border-gold/50" />
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">{[1, 2, 3].map(i => <Skeleton key={i} className="h-20 w-full rounded-2xl bg-white/5" />)}</div>
      ) : (
        <>
          <div className="glass-card rounded-2xl p-6 mb-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="bg-amber-500/10 text-amber-400 text-xs px-2 py-0.5 rounded-full">{pendingMembers.length}</span>
              Pendentes de Aprovacao
            </h2>
            {pendingMembers.length === 0 ? (
              <p className="text-gray-500 text-sm">Nenhum membro pendente</p>
            ) : (
              <div className="space-y-3">
                {pendingMembers.map((member) => (
                  <div key={member.id} className="flex flex-col md:flex-row justify-between md:items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-colors">
                    <div>
                      <h3 className="text-white font-medium">{member.name}</h3>
                      <p className="text-gray-500 text-sm">{member.email}</p>
                      <p className="text-gray-500 text-sm">{member.city} &bull; {member.churchName || 'Sem igreja'}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 rounded-lg"
                        onClick={() => { setSelectedMember(member); setDialogOpen(true) }}>
                        <Check className="h-4 w-4 mr-1" /> Aprovar
                      </Button>
                      <Button size="sm" variant="destructive" className="rounded-lg" onClick={() => handleReject(member.id)}>
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
              <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2 py-0.5 rounded-full">{approvedMembers.length}</span>
              Membros Aprovados
            </h2>
            {approvedMembers.length === 0 ? (
              <p className="text-gray-500 text-sm">Nenhum membro aprovado</p>
            ) : (
              <div className="space-y-3">
                {approvedMembers.map((member) => (
                  <div key={member.id} className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                    <h3 className="text-white font-medium">{member.name}</h3>
                    <p className="text-gray-500 text-sm">{member.email}</p>
                    <p className="text-gray-500 text-sm">{member.city} &bull; {member.churchName || 'Sem igreja'}</p>
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
            <DialogDescription className="text-gray-400">Deseja aprovar o membro {selectedMember?.name}?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" className="border-white/10 text-white" onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <Button className="bg-gold text-black hover:bg-gold/90" onClick={() => selectedMember && handleApprove(selectedMember.id)}>Confirmar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}
