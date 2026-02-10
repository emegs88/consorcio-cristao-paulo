import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, Shield, TrendingUp, Calculator, Church, Home as HomeIcon, Speaker, Snowflake, ArrowRight, Star, ChevronRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen premium-gradient">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0c0c1d]/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold gold-gradient-text tracking-tight">
            Prospere Alianca
          </Link>
          <nav className="hidden md:flex items-center gap-2">
            <Link href="#como-funciona" className="nav-link">Como Funciona</Link>
            <Link href="#consorcio" className="nav-link">Consorcio</Link>
            <Link href="#depoimentos" className="nav-link">Depoimentos</Link>
            <div className="w-px h-6 bg-white/10 mx-2" />
            <Link href="/login" className="nav-link">Entrar</Link>
            <Link href="/cadastro/membro">
              <Button size="sm" className="bg-gold text-black hover:bg-gold/90 font-semibold rounded-full px-6">
                Solicitar Acesso
              </Button>
            </Link>
          </nav>
          <Link href="/login" className="md:hidden">
            <Button size="sm" variant="outline" className="border-gold/50 text-gold rounded-full">
              Entrar
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium mb-8">
            <Star className="h-4 w-4" />
            Comunidade exclusiva para membros cristãos
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight max-w-4xl mx-auto">
            Planejamento patrimonial com{' '}
            <span className="gold-gradient-text">proposito</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Ao participar, voce fortalece sua familia e tambem a obra onde congrega. Cada operacao gera apoio direto à sua igreja.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/cadastro/membro">
              <Button size="lg" className="bg-gold text-black hover:bg-gold/90 rounded-full px-8 py-6 text-base font-semibold shadow-lg shadow-gold/20">
                Solicitar Acesso
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5 rounded-full px-8 py-6 text-base">
                Ja sou membro
              </Button>
            </Link>
          </div>

          {/* Stats inline */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-16">
            {[
              { value: '500+', label: 'Membros Ativos' },
              { value: '50+', label: 'Igrejas Parceiras' },
              { value: 'R$ 10M+', label: 'Volume Total' },
              { value: 'R$ 200k+', label: 'Apoio Gerado' },
            ].map((stat) => (
              <div key={stat.label} className="stat-card p-4 md:p-6">
                <div className="text-2xl md:text-3xl font-bold gold-gradient-text mb-1">{stat.value}</div>
                <p className="text-gray-400 text-xs md:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Shield, title: 'Acesso Restrito', desc: 'Comunidade exclusiva para membros aprovados, garantindo seguranca e confianca.' },
            { icon: Heart, title: 'Apoio à Igreja', desc: 'Parte dos resultados e destinada à sua igreja como forma de apoio voluntario ao ministerio.' },
            { icon: TrendingUp, title: 'Planejamento com Proposito', desc: 'Ferramentas e suporte para planejamento patrimonial alinhado com seus valores.' },
          ].map((feature) => (
            <div key={feature.title} className="glass-card rounded-2xl p-8">
              <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-5">
                <feature.icon className="h-7 w-7 text-gold" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section id="como-funciona" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Como <span className="gold-gradient-text">Funciona</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">Quatro passos simples para comecar</p>
        </div>
        <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {[
            { n: '01', title: 'Solicite Acesso', desc: 'Preencha o cadastro e aguarde aprovacao' },
            { n: '02', title: 'Vincule sua Igreja', desc: 'Escolha a igreja onde congrega' },
            { n: '03', title: 'Participe do Consorcio', desc: 'Acesse oportunidades de planejamento' },
            { n: '04', title: 'Gere Impacto', desc: 'Sua igreja recebe apoio institucional' },
          ].map((step) => (
            <div key={step.n} className="text-center group">
              <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/20 text-gold flex items-center justify-center text-lg font-bold mx-auto mb-5 group-hover:bg-gold group-hover:text-black transition-all duration-300">
                {step.n}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ampliação do Reino */}
      <section id="consorcio" className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ampliacao do <span className="gold-gradient-text">Reino</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Veja o que sua igreja pode conquistar atraves do consorcio
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Church, title: 'Reforma e Ampliacao de Templos', desc: 'Construa, reforme e amplie o espaco de adoracao da sua comunidade' },
              { icon: HomeIcon, title: 'Chacaras e Acampamentos Religiosos', desc: 'Espacos para retiros, acampamentos e eventos da comunidade' },
              { icon: Speaker, title: 'Equipamentos Eletronicos e Sonorizacao', desc: 'Som profissional, projetores, instrumentos e equipamentos de midia' },
              { icon: Snowflake, title: 'Climatizacao, Ornamentacao e Assentos', desc: 'Ar-condicionado, cadeiras, decoracao e conforto para os fieis' },
            ].map((item) => (
              <div key={item.title} className="glass-card rounded-2xl p-6 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-5">
                  <item.icon className="h-8 w-8 text-gold" />
                </div>
                <h3 className="text-gold font-semibold text-base mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="depoimentos" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            O que nossos membros <span className="gold-gradient-text">dizem</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { text: 'Uma plataforma que realmente entende nossos valores. Estou planejando meu futuro enquanto apoio minha igreja.', name: 'Maria Silva', role: 'Membro desde 2023' },
            { text: 'Finalmente encontrei uma forma de fazer planejamento financeiro alinhado com minha fe.', name: 'Joao Santos', role: 'Membro desde 2024' },
            { text: 'Nossa igreja recebe apoio constante atraves desta plataforma. E uma bencao!', name: 'Pastor Carlos', role: 'Igreja Parceira' },
          ].map((t) => (
            <div key={t.name} className="glass-card rounded-2xl p-8">
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map(s => <Star key={s} className="h-4 w-4 text-gold fill-gold" />)}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed italic">
                &ldquo;{t.text}&rdquo;
              </p>
              <div>
                <p className="text-white font-semibold">{t.name}</p>
                <p className="text-gray-500 text-sm">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Simulator CTA */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto glass-card rounded-3xl p-10 md:p-16 text-center gold-glow">
          <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-6">
            <Calculator className="h-8 w-8 text-gold" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Simulador de Consorcio
          </h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Calcule suas parcelas e descubra como e facil planejar sua conquista
          </p>
          <Link href="/membro/simulador">
            <Button size="lg" className="bg-gold text-black hover:bg-gold/90 rounded-full px-8 py-6 text-base font-semibold">
              <Calculator className="mr-2 h-5 w-5" />
              Acessar Simulador
            </Button>
          </Link>
          <p className="text-xs text-gray-500 mt-4">
            * Simulacao ilustrativa. Valores podem variar conforme condicoes especificas.
          </p>
        </div>
      </section>

      {/* CTA Final */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Faca parte desta comunidade
        </h2>
        <p className="text-gray-400 text-lg mb-8 max-w-lg mx-auto">
          Junte-se a membros que estao construindo seu futuro financeiro enquanto apoiam a obra de Deus.
        </p>
        <Link href="/cadastro/membro">
          <Button size="lg" className="bg-gold text-black hover:bg-gold/90 rounded-full px-10 py-6 text-lg font-semibold shadow-lg shadow-gold/20">
            Solicitar Acesso Agora
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="gold-gradient-text font-bold text-lg">Prospere Alianca</div>
            <p className="text-gray-500 text-sm">Planejamento Patrimonial com Proposito</p>
            <div className="flex gap-6 text-sm">
              <Link href="/cadastro/igreja" className="text-gray-400 hover:text-gold transition">
                Cadastrar Igreja
              </Link>
              <Link href="/sobre/cbesp" className="text-gray-400 hover:text-gold transition">
                Sobre a CBESP
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
