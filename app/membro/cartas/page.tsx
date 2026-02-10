'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText } from 'lucide-react'
import Link from 'next/link'

export default function CartasDisponiveis() {
  // Dados simulados - em produção viriam da API
  const cartas = [
    {
      id: 1,
      tipo: 'Imóvel',
      valor: 200000,
      grupo: '12345',
      parcela: 1500,
      disponivel: true,
    },
    {
      id: 2,
      tipo: 'Veículo',
      valor: 80000,
      grupo: '67890',
      parcela: 1200,
      disponivel: true,
    },
    {
      id: 3,
      tipo: 'Imóvel',
      valor: 350000,
      grupo: '11111',
      parcela: 2800,
      disponivel: false,
    },
  ]

  return (
    <div className="min-h-screen premium-gradient py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <Link href="/membro/dashboard" className="inline-flex items-center text-gold hover:text-gold/80 mb-6">
          ← Voltar
        </Link>

        <Card className="bg-black/60 border-gold/50 mb-6">
          <CardHeader>
            <CardTitle className="text-3xl text-gold flex items-center">
              <FileText className="mr-3 h-8 w-8" />
              Cartas Disponíveis
            </CardTitle>
            <CardDescription className="text-gray-300">
              Consulte as cartas de crédito disponíveis para contemplação
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cartas.map((carta) => (
            <Card
              key={carta.id}
              className={`bg-black/40 border-gold/30 ${
                !carta.disponivel ? 'opacity-60' : ''
              }`}
            >
              <CardHeader>
                <CardTitle className="text-gold">{carta.tipo}</CardTitle>
                <CardDescription className="text-gray-300">
                  Grupo: {carta.grupo}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm">Valor</p>
                    <p className="text-2xl font-bold text-white">
                      R$ {carta.valor.toLocaleString('pt-BR')}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Parcela</p>
                    <p className="text-xl font-semibold text-white">
                      R$ {carta.parcela.toLocaleString('pt-BR')}
                    </p>
                  </div>
                  {carta.disponivel ? (
                    <Button className="w-full bg-gold text-black hover:bg-gold/90">
                      Solicitar Contemplação
                    </Button>
                  ) : (
                    <Button className="w-full" variant="outline" disabled>
                      Indisponível
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
