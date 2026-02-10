'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Calculator, TrendingUp, Calendar, DollarSign, Heart, Send } from 'lucide-react'
import toast from 'react-hot-toast'

type ConsorcioType = 'imovel' | 'carro' | 'moto' | 'caminhao' | 'servicos'

interface SimulacaoResult {
  valorCredito: number
  prazo: number
  cotas: number
  tipo: ConsorcioType
  parcela: number
  total: number
  taxaAdmin: number
  apoioIgreja: number
  totalComTaxas: number
}

export default function Simulador() {
  const [tipo, setTipo] = useState<ConsorcioType>('imovel')
  const [valorCredito, setValorCredito] = useState('200000')
  const [prazo, setPrazo] = useState('180')
  const [cotas, setCotas] = useState('1')
  const [resultado, setResultado] = useState<SimulacaoResult | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const tiposConsorcio = {
    imovel: { label: 'Imovel', min: 50000, max: 2000000, defaultPrazo: 180 },
    carro: { label: 'Carro', min: 30000, max: 500000, defaultPrazo: 120 },
    moto: { label: 'Moto', min: 10000, max: 100000, defaultPrazo: 84 },
    caminhao: { label: 'Caminhao', min: 100000, max: 800000, defaultPrazo: 180 },
    servicos: { label: 'Servicos', min: 5000, max: 200000, defaultPrazo: 60 },
  }

  const calcular = () => {
    const valorNum = parseFloat(valorCredito.replace(/[^\d,]/g, '').replace(',', '.'))
    const prazoNum = parseInt(prazo)
    const cotasNum = parseInt(cotas)

    if (!valorNum || !prazoNum || !cotasNum) {
      toast.error('Preencha todos os campos')
      return
    }

    if (valorNum < tiposConsorcio[tipo].min || valorNum > tiposConsorcio[tipo].max) {
      toast.error(`Valor deve estar entre R$ ${tiposConsorcio[tipo].min.toLocaleString('pt-BR')} e R$ ${tiposConsorcio[tipo].max.toLocaleString('pt-BR')}`)
      return
    }

    const taxasAdmin: Record<ConsorcioType, number> = {
      imovel: 0.15,
      carro: 0.18,
      moto: 0.20,
      caminhao: 0.16,
      servicos: 0.22,
    }

    const taxaAdmin = taxasAdmin[tipo]
    const totalComTaxas = valorNum * (1 + taxaAdmin)
    const parcela = totalComTaxas / prazoNum
    const apoioIgreja = totalComTaxas * 0.02

    setResultado({
      valorCredito: valorNum,
      prazo: prazoNum,
      cotas: cotasNum,
      tipo,
      parcela,
      total: totalComTaxas,
      taxaAdmin,
      apoioIgreja,
      totalComTaxas,
    })

    toast.success('Simulacao calculada!')
  }

  const handleSolicitar = async () => {
    if (!resultado) return
    setSubmitting(true)
    try {
      const response = await fetch('/api/operations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'consortium',
          amount: resultado.valorCredito,
          description: `Consorcio ${tiposConsorcio[resultado.tipo].label} - ${resultado.prazo} meses - ${resultado.cotas} cota(s)`,
        }),
      })
      if (response.ok) {
        toast.success('Proposta enviada com sucesso!')
        setConfirmOpen(false)
      } else {
        const data = await response.json()
        toast.error(data.error || 'Erro ao enviar proposta')
      }
    } catch {
      toast.error('Erro ao enviar proposta')
    } finally {
      setSubmitting(false)
    }
  }

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(value)

  return (
    <main className="container mx-auto px-4 py-8 relative z-10 max-w-5xl">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Form */}
        <div className="glass-card rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
              <Calculator className="h-6 w-6 text-gold" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Simulador de Consorcio</h1>
              <p className="text-gray-400 text-sm">Calcule suas parcelas</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-gray-300 text-sm">Tipo de Consorcio</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {Object.entries(tiposConsorcio).map(([key, value]) => (
                  <button key={key} onClick={() => { setTipo(key as ConsorcioType); setPrazo(value.defaultPrazo.toString()) }}
                    className={`p-3 rounded-xl border text-sm transition-all ${
                      tipo === key
                        ? 'bg-gold text-black border-gold font-semibold'
                        : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                    }`}>
                    {value.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300 text-sm">Valor do Credito</Label>
              <div className="flex items-center gap-2">
                <span className="text-gold text-sm">R$</span>
                <Input type="text" value={new Intl.NumberFormat('pt-BR').format(parseFloat(valorCredito) || 0)}
                  onChange={(e) => setValorCredito(e.target.value.replace(/\D/g, ''))}
                  className="bg-white/5 border-white/10 text-white rounded-xl" />
              </div>
              <p className="text-xs text-gray-500">
                De R$ {tiposConsorcio[tipo].min.toLocaleString('pt-BR')} a R$ {tiposConsorcio[tipo].max.toLocaleString('pt-BR')}
              </p>
              <input type="range" min={tiposConsorcio[tipo].min} max={tiposConsorcio[tipo].max} step={1000}
                value={valorCredito} onChange={(e) => setValorCredito(e.target.value)}
                className="w-full h-2 bg-gold/20 rounded-lg appearance-none cursor-pointer accent-gold" />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300 text-sm">Prazo (meses)</Label>
              <div className="flex items-center gap-2">
                <Input type="number" min="36" max="200" value={prazo} onChange={(e) => setPrazo(e.target.value)}
                  className="bg-white/5 border-white/10 text-white rounded-xl" />
                <span className="text-gray-500 text-sm">meses</span>
              </div>
              <input type="range" min="36" max="200" step="6" value={prazo} onChange={(e) => setPrazo(e.target.value)}
                className="w-full h-2 bg-gold/20 rounded-lg appearance-none cursor-pointer accent-gold" />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300 text-sm">Quantidade de Cotas</Label>
              <div className="flex items-center gap-2">
                <Input type="number" min="1" max="100" value={cotas} onChange={(e) => setCotas(e.target.value)}
                  className="bg-white/5 border-white/10 text-white rounded-xl" />
                <span className="text-gray-500 text-sm">cotas</span>
              </div>
              <input type="range" min="1" max="10" value={cotas} onChange={(e) => setCotas(e.target.value)}
                className="w-full h-2 bg-gold/20 rounded-lg appearance-none cursor-pointer accent-gold" />
            </div>

            <Button onClick={calcular} className="w-full bg-gold text-black hover:bg-gold/90 rounded-xl h-12 font-semibold" size="lg">
              <Calculator className="mr-2 h-4 w-4" />
              Calcular Simulacao
            </Button>

            <p className="text-xs text-gray-500 text-center">
              * Simulacao ilustrativa. Os valores podem variar.
            </p>
          </div>
        </div>

        {/* Result */}
        <div>
          {resultado ? (
            <div className="glass-card rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-1">Resultado da Simulacao</h2>
              <p className="text-gray-400 text-sm mb-6">{tiposConsorcio[resultado.tipo].label}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-4 w-4 text-gold" />
                    <p className="text-gray-500 text-xs">Valor do Credito</p>
                  </div>
                  <p className="text-xl font-bold text-white">{formatCurrency(resultado.valorCredito)}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-gold" />
                    <p className="text-gray-500 text-xs">Prazo</p>
                  </div>
                  <p className="text-xl font-bold text-white">{resultado.prazo} meses</p>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-gold/5 border border-gold/10 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="h-5 w-5 text-gold" />
                  <p className="text-gray-400 text-sm font-semibold">Valor da Parcela</p>
                </div>
                <p className="text-4xl font-bold gold-gradient-text mb-1">{formatCurrency(resultado.parcela)}</p>
                <p className="text-sm text-gray-500">{resultado.cotas} {resultado.cotas === 1 ? 'cota' : 'cotas'}</p>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between items-center p-3 rounded-xl bg-white/[0.03]">
                  <span className="text-gray-400 text-sm">Valor do Credito</span>
                  <span className="text-white font-semibold">{formatCurrency(resultado.valorCredito)}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-white/[0.03]">
                  <span className="text-gray-400 text-sm">Taxa Admin ({(resultado.taxaAdmin * 100).toFixed(0)}%)</span>
                  <span className="text-white font-semibold">{formatCurrency(resultado.total - resultado.valorCredito)}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-white/[0.03]">
                  <span className="text-gray-400 text-sm">Total do Consorcio</span>
                  <span className="text-white font-bold text-lg">{formatCurrency(resultado.total)}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gold/5 border border-gold/10 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="h-5 w-5 text-gold" />
                  <p className="text-gray-400 text-sm font-semibold">Apoio Gerado à Igreja</p>
                </div>
                <p className="text-2xl font-bold gold-gradient-text mb-1">{formatCurrency(resultado.apoioIgreja)}</p>
                <p className="text-xs text-gray-500">2% destinado como apoio institucional</p>
              </div>

              <Button onClick={() => setConfirmOpen(true)}
                className="w-full bg-gold text-black hover:bg-gold/90 rounded-xl h-12 font-semibold" size="lg">
                <Send className="mr-2 h-4 w-4" />
                Solicitar Proposta
              </Button>
            </div>
          ) : (
            <div className="glass-card rounded-2xl p-12 text-center">
              <Calculator className="h-16 w-16 text-gold/30 mx-auto mb-4" />
              <p className="text-gray-400">
                Preencha os dados e clique em &ldquo;Calcular Simulacao&rdquo; para ver os resultados
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Confirm Dialog */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="bg-[#0c0c1d] border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">Confirmar Proposta</DialogTitle>
            <DialogDescription className="text-gray-400">
              Deseja enviar uma proposta de consorcio de {resultado ? formatCurrency(resultado.valorCredito) : ''} ({resultado?.prazo} meses)?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" className="border-white/10 text-white" onClick={() => setConfirmOpen(false)}>Cancelar</Button>
            <Button className="bg-gold text-black hover:bg-gold/90" onClick={handleSolicitar} disabled={submitting}>
              {submitting ? 'Enviando...' : 'Confirmar Proposta'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}
