'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { Users, Search, Check, X } from 'lucide-react'
import Link from 'next/link'
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

  useEffect(() => {
    loadMembers()
  }, [])

  const loadMembers = async () => {
    try {
      const response = await fetch('/api/admin/members')
      if (response.ok) {
        const data = await response.json()
        setMembers(data.members || [])
      }
    } catch (error) {
      toast.error('Erro ao carregar membros')
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (memberId: string) => {
    try {
      const response = await fetch(`/api/admin/members/${memberId}/approve`, {
        method: 'POST',
      })

      if (response.ok) {
        toast.success('Membro aprovado com sucesso!')
        loadMembers()
        setDialogOpen(false)
      } else {
        toast.error('Erro ao aprovar membro')
      }
    } catch (error) {
      toast.error('Erro ao aprovar membro')
    }
  }

  const handleReject = async (memberId: string) => {
    try {
      const response = await fetch(`/api/admin/members/${memberId}/reject`, {
        method: 'POST',
      })

      if (response.ok) {
        toast.success('Membro rejeitado')
        loadMembers()
        setDialogOpen(false)
      } else {
        toast.error('Erro ao rejeitar membro')
      }
    } catch (error) {
      toast.error('Erro ao rejeitar membro')
    }
  }

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(search.toLowerCase()) ||
    member.email.toLowerCase().includes(search.toLowerCase()) ||
    member.city.toLowerCase().includes(search.toLowerCase())
  )

  const pendingMembers = filteredMembers.filter(m => m.approvalStatus === 'PENDING')
  const approvedMembers = filteredMembers.filter(m => m.approvalStatus === 'APPROVED')

  return (
    <div className="min-h-screen premium-gradient">
      <header className="border-b border-gold/20">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <Link href="/admin/dashboard" className="text-2xl font-bold text-gold">Prospere Aliança - Admin</Link>
          <nav className="flex gap-4">
            <Link href="/admin/dashboard" className="text-white hover:text-gold">Dashboard</Link>
            <Link href="/admin/igrejas" className="text-white hover:text-gold">Igrejas</Link>
            <Link href="/admin/membros" className="text-white hover:text-gold font-bold">Membros</Link>
            <Button variant="outline" className="border-gold text-gold" onClick={async () => {
              await fetch('/api/logout', { method: 'POST' })
              window.location.href = '/login'
            }}>Sair</Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Gerenciar Membros</h1>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar membros..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 w-64 bg-black/40 border-gold/30 text-white"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
        ) : (
          <>
            <Card className="bg-black/60 border-gold/50 mb-6">
              <CardHeader>
                <CardTitle className="text-gold">Pendentes de Aprovação ({pendingMembers.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {pendingMembers.length === 0 ? (
                  <p className="text-gray-400">Nenhum membro pendente</p>
                ) : (
                  <div className="space-y-4">
                    {pendingMembers.map((member) => (
                      <div
                        key={member.id}
                        className="p-4 bg-black/40 rounded-lg border border-gold/30 flex justify-between items-center"
                      >
                        <div>
                          <h3 className="text-white font-semibold">{member.name}</h3>
                          <p className="text-gray-400 text-sm">{member.email}</p>
                          <p className="text-gray-400 text-sm">{member.city} • {member.churchName || 'Sem igreja'}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => {
                              setSelectedMember(member)
                              setDialogOpen(true)
                            }}
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Aprovar
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleReject(member.id)}
                          >
                            <X className="h-4 w-4 mr-2" />
                            Rejeitar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-black/60 border-gold/50">
              <CardHeader>
                <CardTitle className="text-gold">Membros Aprovados ({approvedMembers.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {approvedMembers.length === 0 ? (
                  <p className="text-gray-400">Nenhum membro aprovado</p>
                ) : (
                  <div className="space-y-4">
                    {approvedMembers.map((member) => (
                      <div
                        key={member.id}
                        className="p-4 bg-black/40 rounded-lg border border-gold/30"
                      >
                        <h3 className="text-white font-semibold">{member.name}</h3>
                        <p className="text-gray-400 text-sm">{member.email}</p>
                        <p className="text-gray-400 text-sm">{member.city} • {member.churchName || 'Sem igreja'}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="bg-black/95 border-gold/50">
            <DialogHeader>
              <DialogTitle className="text-gold">Confirmar Aprovação</DialogTitle>
              <DialogDescription className="text-gray-300">
                Deseja aprovar o membro {selectedMember?.name}?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancelar
              </Button>
              <Button
                className="bg-gold text-black hover:bg-gold/90"
                onClick={() => selectedMember && handleApprove(selectedMember.id)}
              >
                Confirmar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}
