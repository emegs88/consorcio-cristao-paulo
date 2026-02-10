'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { Building2, Search, Check, X } from 'lucide-react'
import Link from 'next/link'
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

  useEffect(() => {
    loadChurches()
  }, [])

  const loadChurches = async () => {
    try {
      const response = await fetch('/api/admin/churches')
      if (response.ok) {
        const data = await response.json()
        setChurches(data.churches || [])
      }
    } catch (error) {
      toast.error('Erro ao carregar igrejas')
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (churchId: string) => {
    try {
      const response = await fetch(`/api/admin/churches/${churchId}/approve`, {
        method: 'POST',
      })

      if (response.ok) {
        toast.success('Igreja aprovada com sucesso!')
        loadChurches()
        setDialogOpen(false)
      } else {
        toast.error('Erro ao aprovar igreja')
      }
    } catch (error) {
      toast.error('Erro ao aprovar igreja')
    }
  }

  const handleReject = async (churchId: string) => {
    try {
      const response = await fetch(`/api/admin/churches/${churchId}/reject`, {
        method: 'POST',
      })

      if (response.ok) {
        toast.success('Igreja rejeitada')
        loadChurches()
        setDialogOpen(false)
      } else {
        toast.error('Erro ao rejeitar igreja')
      }
    } catch (error) {
      toast.error('Erro ao rejeitar igreja')
    }
  }

  const filteredChurches = churches.filter(church =>
    church.name.toLowerCase().includes(search.toLowerCase()) ||
    church.email.toLowerCase().includes(search.toLowerCase()) ||
    church.city.toLowerCase().includes(search.toLowerCase())
  )

  const pendingChurches = filteredChurches.filter(c => c.approvalStatus === 'PENDING')
  const approvedChurches = filteredChurches.filter(c => c.approvalStatus === 'APPROVED')

  return (
    <div className="min-h-screen premium-gradient">
      <header className="border-b border-gold/20">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <Link href="/admin/dashboard" className="text-2xl font-bold text-gold">Prospere Aliança - Admin</Link>
          <nav className="flex gap-4">
            <Link href="/admin/dashboard" className="text-white hover:text-gold">Dashboard</Link>
            <Link href="/admin/igrejas" className="text-white hover:text-gold font-bold">Igrejas</Link>
            <Link href="/admin/membros" className="text-white hover:text-gold">Membros</Link>
            <Button variant="outline" className="border-gold text-gold" onClick={async () => {
              await fetch('/api/logout', { method: 'POST' })
              window.location.href = '/login'
            }}>Sair</Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Gerenciar Igrejas</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar igrejas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 w-64 bg-black/40 border-gold/30 text-white"
            />
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
                <CardTitle className="text-gold">Pendentes de Aprovação ({pendingChurches.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {pendingChurches.length === 0 ? (
                  <p className="text-gray-400">Nenhuma igreja pendente</p>
                ) : (
                  <div className="space-y-4">
                    {pendingChurches.map((church) => (
                      <div
                        key={church.id}
                        className="p-4 bg-black/40 rounded-lg border border-gold/30 flex justify-between items-center"
                      >
                        <div>
                          <h3 className="text-white font-semibold">{church.name}</h3>
                          <p className="text-gray-400 text-sm">{church.email}</p>
                          <p className="text-gray-400 text-sm">{church.city} • Pastor: {church.pastorName}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => {
                              setSelectedChurch(church)
                              setDialogOpen(true)
                            }}
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Aprovar
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleReject(church.id)}
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
                <CardTitle className="text-gold">Igrejas Aprovadas ({approvedChurches.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {approvedChurches.length === 0 ? (
                  <p className="text-gray-400">Nenhuma igreja aprovada</p>
                ) : (
                  <div className="space-y-4">
                    {approvedChurches.map((church) => (
                      <div
                        key={church.id}
                        className="p-4 bg-black/40 rounded-lg border border-gold/30"
                      >
                        <h3 className="text-white font-semibold">{church.name}</h3>
                        <p className="text-gray-400 text-sm">{church.email}</p>
                        <p className="text-gray-400 text-sm">{church.city} • Pastor: {church.pastorName}</p>
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
                Deseja aprovar a igreja {selectedChurch?.name}?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancelar
              </Button>
              <Button
                className="bg-gold text-black hover:bg-gold/90"
                onClick={() => selectedChurch && handleApprove(selectedChurch.id)}
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
