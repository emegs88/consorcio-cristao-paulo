'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, TrendingUp, Heart, FileText } from 'lucide-react'
import Link from 'next/link'

export default function IgrejaDashboard() {
  // Dados simulados - em produção viriam da API
  const dados = {
    name: 'Igreja Exemplo',
    totalMembers: 45,
    totalVolume: 2500000,
    totalSupport: 50000,
    monthlySupport: 4500,
    pendingSupport: 1200,
  }

  return (
    <div className="min-h-screen premium-gradient">
      <header className="border-b border-gold/20">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="text-2xl font-bold text-gold">Prospere Aliança</div>
          <nav className="flex gap-4">
            <Link href="/igreja/dashboard" className="text-white hover:text-gold">Dashboard</Link>
            <Link href="/igreja/relatorios" className="text-white hover:text-gold">Relatórios</Link>
            <Button variant="outline" className="border-gold text-gold" onClick={async () => {
              await fetch('/api/logout', { method: 'POST' })
              window.location.href = '/login'
            }}>Sair</Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-2">{dados.name}</h1>
        <p className="text-gray-300 mb-8">Painel de Apoio Institucional</p>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-black/40 border-gold/30">
            <CardHeader>
              <CardTitle className="text-gold flex items-center text-lg">
                <Users className="mr-2 h-5 w-5" />
                Membros
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{dados.totalMembers}</div>
              <p className="text-gray-400 text-sm">Vinculados</p>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-gold/30">
            <CardHeader>
              <CardTitle className="text-gold flex items-center text-lg">
                <TrendingUp className="mr-2 h-5 w-5" />
                Volume Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">
                R$ {(dados.totalVolume / 1000).toFixed(0)}k
              </div>
              <p className="text-gray-400 text-sm">Gerado</p>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-gold/30">
            <CardHeader>
              <CardTitle className="text-gold flex items-center text-lg">
                <Heart className="mr-2 h-5 w-5" />
                Apoio Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gold">
                R$ {(dados.totalSupport / 1000).toFixed(0)}k
              </div>
              <p className="text-gray-400 text-sm">Acumulado</p>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-gold/30">
            <CardHeader>
              <CardTitle className="text-gold flex items-center text-lg">
                <FileText className="mr-2 h-5 w-5" />
                Pendente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">
                R$ {dados.pendingSupport.toLocaleString('pt-BR')}
              </div>
              <p className="text-gray-400 text-sm">Este mês</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-black/60 border-gold/50">
            <CardHeader>
              <CardTitle className="text-gold">Resumo Mensal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm">Apoio deste mês</p>
                  <p className="text-2xl font-bold text-gold">
                    R$ {dados.monthlySupport.toLocaleString('pt-BR')}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Membros ativos</p>
                  <p className="text-xl font-semibold text-white">{dados.totalMembers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/60 border-gold/50">
            <CardHeader>
              <CardTitle className="text-gold">Sobre o Apoio</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm mb-4">
                O apoio institucional é calculado automaticamente sobre as operações realizadas pelos membros vinculados à sua igreja.
              </p>
              <p className="text-gray-400 text-xs">
                Este valor é classificado como oferta voluntária de apoio ao ministério, não como comissão comercial.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Link href="/igreja/relatorios">
            <Button className="bg-gold text-black hover:bg-gold/90" size="lg">
              Ver Relatórios Detalhados
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
