'use client'

import { useEffect, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { FileText, Calendar, Download } from 'lucide-react'
import toast from 'react-hot-toast'
import { exportCSV } from '@/lib/csv-export'

interface Relatorio {
  mes: string
  volume: number
  apoio: number
  membros: number
}

export default function Relatorios() {
  const [relatorios, setRelatorios] = useState<Relatorio[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/church/reports')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => setRelatorios(data.relatorios || []))
      .catch(() => toast.error('Erro ao carregar relatorios'))
      .finally(() => setLoading(false))
  }, [])

  const handleExport = () => {
    if (relatorios.length === 0) { toast.error('Nao ha dados para exportar'); return }
    exportCSV(
      ['Mes', 'Volume (R$)', 'Apoio (R$)', 'Membros Ativos'],
      relatorios.map(r => [r.mes, r.volume.toFixed(2), r.apoio.toFixed(2), String(r.membros)]),
      `relatorio-igreja-${new Date().toISOString().slice(0, 10)}.csv`
    )
    toast.success('Relatorio exportado!')
  }

  return (
    <main className="container mx-auto px-4 py-8 relative z-10 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">
            Relatorios <span className="gold-gradient-text">Mensais</span>
          </h1>
          <p className="text-gray-400">Historico de apoio institucional recebido</p>
        </div>
        <Button onClick={handleExport} className="bg-gold text-black hover:bg-gold/90 rounded-xl font-semibold">
          <Download className="mr-2 h-4 w-4" />
          Exportar CSV
        </Button>
      </div>

      {loading ? (
        <div className="space-y-4">{[1, 2, 3].map(i => <Skeleton key={i} className="h-32 w-full rounded-2xl bg-white/5" />)}</div>
      ) : relatorios.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center">
          <FileText className="h-16 w-16 text-gold/30 mx-auto mb-4" />
          <p className="text-gray-400 mb-2">Nenhum relatorio disponivel</p>
          <p className="text-gray-500 text-sm">Os relatorios serao gerados conforme as operacoes dos membros.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {relatorios.map((relatorio, index) => (
            <div key={index} className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-gold" />
                </div>
                <h3 className="text-lg font-semibold text-white">{relatorio.mes}</h3>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 rounded-xl bg-white/[0.03]">
                  <p className="text-gray-500 text-xs mb-1">Volume Gerado</p>
                  <p className="text-xl font-bold text-white">R$ {relatorio.volume.toLocaleString('pt-BR')}</p>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03]">
                  <p className="text-gray-500 text-xs mb-1">Apoio Recebido</p>
                  <p className="text-xl font-bold gold-gradient-text">R$ {relatorio.apoio.toLocaleString('pt-BR')}</p>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03]">
                  <p className="text-gray-500 text-xs mb-1">Membros Ativos</p>
                  <p className="text-xl font-bold text-white">{relatorio.membros}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
