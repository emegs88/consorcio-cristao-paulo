'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Building2, TrendingUp, DollarSign } from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
  // Dados simulados - em produção viriam da API
  const stats = {
    totalChurches: 12,
    totalMembers: 450,
    totalVolume: 15000000,
    totalSupport: 300000,
  }

  return (
    <div className="min-h-screen premium-gradient">
      <header className="border-b border-gold/20">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="text-2xl font-bold text-gold">Prospere Aliança - Admin</div>
          <nav className="flex gap-4">
            <Link href="/admin/dashboard" className="text-white hover:text-gold">Dashboard</Link>
            <Link href="/admin/igrejas" className="text-white hover:text-gold">Igrejas</Link>
            <Link href="/admin/membros" className="text-white hover:text-gold">Membros</Link>
            <Link href="/admin/repasses" className="text-white hover:text-gold">Repasses</Link>
            <Button variant="outline" className="border-gold text-gold" onClick={async () => {
              await fetch('/api/logout', { method: 'POST' })
              window.location.href = '/login'
            }}>Sair</Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">Dashboard Administrativo</h1>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-black/40 border-gold/30">
            <CardHeader>
              <CardTitle className="text-gold flex items-center text-lg">
                <Building2 className="mr-2 h-5 w-5" />
                Igrejas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{stats.totalChurches}</div>
              <p className="text-gray-400 text-sm">Cadastradas</p>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-gold/30">
            <CardHeader>
              <CardTitle className="text-gold flex items-center text-lg">
                <Users className="mr-2 h-5 w-5" />
                Membros
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{stats.totalMembers}</div>
              <p className="text-gray-400 text-sm">Ativos</p>
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
                R$ {(stats.totalVolume / 1000000).toFixed(1)}M
              </div>
              <p className="text-gray-400 text-sm">Gerado</p>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-gold/30">
            <CardHeader>
              <CardTitle className="text-gold flex items-center text-lg">
                <DollarSign className="mr-2 h-5 w-5" />
                Apoio Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gold">
                R$ {(stats.totalSupport / 1000).toFixed(0)}k
              </div>
              <p className="text-gray-400 text-sm">Repassado</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-black/60 border-gold/50">
            <CardHeader>
              <CardTitle className="text-gold">Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/admin/igrejas">
                <Button className="w-full" variant="outline" size="lg">
                  Gerenciar Igrejas
                </Button>
              </Link>
              <Link href="/admin/membros">
                <Button className="w-full" variant="outline" size="lg">
                  Gerenciar Membros
                </Button>
              </Link>
              <Link href="/admin/repasses">
                <Button className="w-full" variant="outline" size="lg">
                  Ver Repasses
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-black/60 border-gold/50">
            <CardHeader>
              <CardTitle className="text-gold">Visão Geral</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm">Média de membros por igreja</p>
                  <p className="text-2xl font-bold text-white">
                    {Math.round(stats.totalMembers / stats.totalChurches)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Percentual de apoio</p>
                  <p className="text-2xl font-bold text-gold">2%</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Volume médio por membro</p>
                  <p className="text-xl font-semibold text-white">
                    R$ {(stats.totalVolume / stats.totalMembers).toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
