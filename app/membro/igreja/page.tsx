'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, TrendingUp, Users } from 'lucide-react'
import Link from 'next/link'

export default function MinhaIgreja() {
  // Dados simulados - em produção viriam da API
  const igreja = {
    name: 'Igreja Exemplo',
    city: 'São Paulo, SP',
    totalMembers: 45,
    totalVolume: 2500000,
    totalSupport: 50000,
    monthlySupport: 4500,
  }

  return (
    <div className="min-h-screen premium-gradient py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/membro/dashboard" className="inline-flex items-center text-gold hover:text-gold/80 mb-6">
          ← Voltar
        </Link>

        <Card className="bg-black/60 border-gold/50 mb-6">
          <CardHeader>
            <CardTitle className="text-3xl text-gold flex items-center">
              <Heart className="mr-3 h-8 w-8" />
              Minha Igreja
            </CardTitle>
            <CardDescription className="text-gray-300 text-lg">
              {igreja.name} - {igreja.city}
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <Card className="bg-black/40 border-gold/30">
            <CardHeader>
              <CardTitle className="text-gold flex items-center text-lg">
                <Users className="mr-2 h-5 w-5" />
                Membros
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{igreja.totalMembers}</div>
              <p className="text-gray-400 text-sm">Membros vinculados</p>
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
                R$ {igreja.totalVolume.toLocaleString('pt-BR')}
              </div>
              <p className="text-gray-400 text-sm">Gerado pelos membros</p>
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
                R$ {igreja.totalSupport.toLocaleString('pt-BR')}
              </div>
              <p className="text-gray-400 text-sm">Apoio institucional</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-black/60 border-gold/50">
          <CardHeader>
            <CardTitle className="text-gold">Sobre o Apoio Institucional</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-300">
              Parte dos resultados das operações realizadas pelos membros vinculados à sua igreja é destinada como forma de <strong className="text-gold">apoio voluntário ao ministério</strong>.
            </p>
            <div className="p-4 bg-gold/10 rounded-md border border-gold/30">
              <p className="text-sm text-gray-300">
                <strong className="text-gold">Valor mensal médio:</strong> R$ {igreja.monthlySupport.toLocaleString('pt-BR')}
              </p>
            </div>
            <p className="text-sm text-gray-400">
              Este apoio é calculado automaticamente sobre cada operação realizada e é classificado como oferta institucional, não como comissão comercial.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
