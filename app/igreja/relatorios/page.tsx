'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Calendar, DollarSign } from 'lucide-react'
import Link from 'next/link'

export default function Relatorios() {
  // Dados simulados - em produção viriam da API
  const relatorios = [
    {
      mes: 'Janeiro 2024',
      volume: 450000,
      apoio: 9000,
      membros: 12,
    },
    {
      mes: 'Fevereiro 2024',
      volume: 520000,
      apoio: 10400,
      membros: 15,
    },
    {
      mes: 'Março 2024',
      volume: 480000,
      apoio: 9600,
      membros: 14,
    },
  ]

  return (
    <div className="min-h-screen premium-gradient py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <Link href="/igreja/dashboard" className="inline-flex items-center text-gold hover:text-gold/80 mb-6">
          ← Voltar
        </Link>

        <Card className="bg-black/60 border-gold/50 mb-6">
          <CardHeader>
            <CardTitle className="text-3xl text-gold flex items-center">
              <FileText className="mr-3 h-8 w-8" />
              Relatórios Mensais
            </CardTitle>
            <CardDescription className="text-gray-300">
              Histórico de apoio institucional recebido
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="space-y-4">
          {relatorios.map((relatorio, index) => (
            <Card key={index} className="bg-black/40 border-gold/30">
              <CardHeader>
                <CardTitle className="text-gold flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  {relatorio.mes}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Volume Gerado</p>
                    <p className="text-2xl font-bold text-white">
                      R$ {relatorio.volume.toLocaleString('pt-BR')}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Apoio Recebido</p>
                    <p className="text-2xl font-bold text-gold">
                      R$ {relatorio.apoio.toLocaleString('pt-BR')}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Membros Ativos</p>
                    <p className="text-2xl font-bold text-white">{relatorio.membros}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-black/60 border-gold/50 mt-6">
          <CardContent className="pt-6">
            <Button className="w-full bg-gold text-black hover:bg-gold/90" size="lg">
              <DollarSign className="mr-2 h-4 w-4" />
              Exportar Relatório Completo
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
