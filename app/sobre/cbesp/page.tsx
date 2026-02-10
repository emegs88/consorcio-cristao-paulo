import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Building2, Users, Heart, Link as LinkIcon } from 'lucide-react'
import Link from 'next/link'

export default function SobreCBESP() {
  return (
    <div className="min-h-screen premium-gradient">
      {/* Header */}
      <header className="border-b border-gold/20">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gold">
            Prospere Aliança
          </Link>
          <nav className="flex gap-6">
            <Link href="/" className="text-white hover:text-gold transition">
              Início
            </Link>
            <Link href="/cadastro/igreja">
              <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-black">
                Cadastrar Igreja
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            <span className="text-gold">CBESP</span>
            <br />
            Convenção Batista do Estado de São Paulo
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A CBESP reúne e organiza centenas de igrejas batistas em todo o estado de São Paulo,
            fortalecendo a obra do Senhor através da união e cooperação.
          </p>
        </div>

        {/* O que é a CBESP */}
        <Card className="bg-black/60 border-gold/50 mb-8">
          <CardHeader>
            <CardTitle className="text-3xl text-gold flex items-center">
              <Building2 className="mr-3 h-8 w-8" />
              O que é a CBESP
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-300 text-lg leading-relaxed">
              A <strong className="text-gold">Convenção Batista do Estado de São Paulo (CBESP)</strong> é uma organização 
              que reúne e organiza centenas de igrejas batistas em todo o estado de São Paulo.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Com o propósito de fortalecer a obra do Senhor, a CBESP promove a união, cooperação e 
              crescimento das igrejas batistas, oferecendo suporte institucional, recursos e 
              oportunidades de desenvolvimento ministerial.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Através da convenção, as igrejas compartilham experiências, recursos e trabalham juntas 
              em projetos que beneficiam toda a comunidade batista paulista.
            </p>
          </CardContent>
        </Card>

        {/* Benefícios */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-black/40 border-gold/30">
            <CardHeader>
              <Users className="h-12 w-12 text-gold mb-4" />
              <CardTitle className="text-gold">Rede de Igrejas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Conecte-se com centenas de igrejas batistas em todo o estado, compartilhando 
                experiências e recursos.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-gold/30">
            <CardHeader>
              <Heart className="h-12 w-12 text-gold mb-4" />
              <CardTitle className="text-gold">Apoio Institucional</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Receba suporte e recursos para fortalecer o ministério da sua igreja através 
                da convenção.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-gold/30">
            <CardHeader>
              <LinkIcon className="h-12 w-12 text-gold mb-4" />
              <CardTitle className="text-gold">Crescimento</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Participe de projetos e iniciativas que promovem o crescimento e desenvolvimento 
                das igrejas batistas.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Integração com Prospere Aliança */}
        <Card className="bg-black/60 border-gold/50 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-gold">CBESP e Prospere Aliança</CardTitle>
            <CardDescription className="text-gray-300">
              Fortalecendo a obra através do planejamento patrimonial
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-300 leading-relaxed">
              Igrejas vinculadas à <strong className="text-gold">CBESP</strong> podem se cadastrar 
              no <strong className="text-gold">Prospere Aliança</strong> e receber apoio institucional 
              dos membros que participam do consórcio.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Quando membros cristãos vinculam suas igrejas ao sistema, parte dos resultados das 
              operações é destinada como <strong className="text-gold">apoio voluntário ao ministério</strong>, 
              fortalecendo a obra onde congregam.
            </p>
            <div className="p-4 bg-gold/10 rounded-md border border-gold/30">
              <p className="text-sm text-gray-300">
                <strong className="text-gold">Igrejas da CBESP:</strong> Ao se cadastrar, você pode 
                vincular sua igreja à Convenção Batista do Estado de São Paulo e fazer parte desta 
                rede de fortalecimento ministerial.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <Card className="bg-black/60 border-gold/50 max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-gold">
                Sua igreja é da CBESP?
              </CardTitle>
              <CardDescription className="text-gray-300">
                Cadastre sua igreja e comece a receber apoio institucional
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/cadastro/igreja">
                <Button size="lg" className="bg-gold text-black hover:bg-gold/90 px-8">
                  Cadastrar Igreja da CBESP
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gold/20 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>Prospere Aliança - Planejamento Patrimonial com Propósito</p>
          <p className="mt-2 text-sm">
            <Link href="/" className="hover:text-gold transition">
              Voltar à página inicial
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
