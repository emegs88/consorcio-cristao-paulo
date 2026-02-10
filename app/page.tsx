import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, Shield, Users, TrendingUp, Calculator } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen premium-gradient">
      {/* Header */}
      <header className="border-b border-gold/20">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="text-2xl font-bold text-gold">
            Prospere Aliança
          </div>
          <nav className="flex gap-6">
            <Link href="/login" className="text-white hover:text-gold transition">
              Já sou membro
            </Link>
            <Link href="/cadastro/membro">
              <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-black">
                Solicitar Acesso
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Comunidade privada de planejamento patrimonial
          <br />
          <span className="text-gold">para membros cristãos</span>
        </h1>
        <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
          Ao participar, você fortalece sua família e também a obra onde congrega.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/cadastro/membro">
            <Button size="lg" className="bg-gold text-black hover:bg-gold/90 px-8 py-6 text-lg">
              Solicitar Acesso
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline" className="border-gold text-gold hover:bg-gold hover:text-black px-8 py-6 text-lg">
              Já sou membro
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-black/40 border-gold/30 text-white">
            <CardHeader>
              <Shield className="h-12 w-12 text-gold mb-4" />
              <CardTitle className="text-gold">Acesso Restrito</CardTitle>
              <CardDescription className="text-gray-300">
                Comunidade exclusiva para membros aprovados, garantindo segurança e confiança.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-black/40 border-gold/30 text-white">
            <CardHeader>
              <Heart className="h-12 w-12 text-gold mb-4" />
              <CardTitle className="text-gold">Apoio à Igreja</CardTitle>
              <CardDescription className="text-gray-300">
                Parte dos resultados é destinada à sua igreja como forma de apoio voluntário ao ministério.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-black/40 border-gold/30 text-white">
            <CardHeader>
              <TrendingUp className="h-12 w-12 text-gold mb-4" />
              <CardTitle className="text-gold">Planejamento com Propósito</CardTitle>
              <CardDescription className="text-gray-300">
                Ferramentas e suporte para planejamento patrimonial alinhado com seus valores.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* How it Works */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Como Funciona
        </h2>
        <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gold text-black flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="text-xl font-semibold text-gold mb-2">Solicite Acesso</h3>
            <p className="text-gray-300">Preencha o cadastro e aguarde aprovação</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gold text-black flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="text-xl font-semibold text-gold mb-2">Vincule sua Igreja</h3>
            <p className="text-gray-300">Escolha a igreja onde congrega</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gold text-black flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="text-xl font-semibold text-gold mb-2">Participe do Consórcio</h3>
            <p className="text-gray-300">Acesse oportunidades de planejamento</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gold text-black flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              4
            </div>
            <h3 className="text-xl font-semibold text-gold mb-2">Gere Impacto</h3>
            <p className="text-gray-300">Sua igreja recebe apoio institucional</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
          <div className="text-center">
            <div className="text-4xl font-bold text-gold mb-2">500+</div>
            <p className="text-gray-300">Membros Ativos</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gold mb-2">50+</div>
            <p className="text-gray-300">Igrejas Parceiras</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gold mb-2">R$ 10M+</div>
            <p className="text-gray-300">Volume Total</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gold mb-2">R$ 200k+</div>
            <p className="text-gray-300">Apoio Gerado</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          O que nossos membros dizem
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="bg-black/40 border-gold/30">
            <CardContent className="pt-6">
              <p className="text-gray-300 mb-4 italic">
                "Uma plataforma que realmente entende nossos valores. Estou planejando meu futuro enquanto apoio minha igreja."
              </p>
              <p className="text-gold font-semibold">— Maria Silva</p>
              <p className="text-gray-400 text-sm">Membro desde 2023</p>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-gold/30">
            <CardContent className="pt-6">
              <p className="text-gray-300 mb-4 italic">
                "Finalmente encontrei uma forma de fazer planejamento financeiro alinhado com minha fé."
              </p>
              <p className="text-gold font-semibold">— João Santos</p>
              <p className="text-gray-400 text-sm">Membro desde 2024</p>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-gold/30">
            <CardContent className="pt-6">
              <p className="text-gray-300 mb-4 italic">
                "Nossa igreja recebe apoio constante através desta plataforma. É uma bênção!"
              </p>
              <p className="text-gold font-semibold">— Pastor Carlos</p>
              <p className="text-gray-400 text-sm">Igreja Parceira</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Simulador Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-black/60 border-gold/50">
            <CardHeader>
              <CardTitle className="text-3xl text-gold text-center flex items-center justify-center">
                <Calculator className="mr-3 h-8 w-8" />
                Simulador de Consórcio
              </CardTitle>
              <CardDescription className="text-gray-300 text-center text-lg">
                Calcule suas parcelas e veja quanto você vai pagar
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-300 mb-6">
                Experimente nosso simulador e descubra como é fácil planejar sua conquista
              </p>
              <Link href="/membro/simulador">
                <Button size="lg" className="bg-gold text-black hover:bg-gold/90 px-8 py-6 text-lg">
                  <Calculator className="mr-2 h-5 w-5" />
                  Acessar Simulador
                </Button>
              </Link>
              <p className="text-xs text-gray-400 mt-4">
                * Simulação ilustrativa. Valores podem variar conforme condições específicas.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Card className="bg-black/60 border-gold/50 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl text-gold mb-4">
              Faça parte desta comunidade
            </CardTitle>
            <CardDescription className="text-gray-300 text-lg">
              Junte-se a membros que estão construindo seu futuro financeiro enquanto apoiam a obra de Deus.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/cadastro/membro">
              <Button size="lg" className="bg-gold text-black hover:bg-gold/90 px-8 py-6 text-lg">
                Solicitar Acesso Agora
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-gold/20 py-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>Prospere Aliança - Planejamento Patrimonial com Propósito</p>
          <p className="mt-2 text-sm">
            <Link href="/cadastro/igreja" className="hover:text-gold transition">
              Sou uma igreja e quero me cadastrar
            </Link>
            {' • '}
            <Link href="/sobre/cbesp" className="hover:text-gold transition">
              Sobre a CBESP
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
