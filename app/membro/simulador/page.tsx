'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calculator, TrendingUp, Calendar, DollarSign } from 'lucide-react'
import Link from 'next/link'
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

  const tiposConsorcio = {
    imovel: { label: 'Imóvel', min: 50000, max: 2000000, defaultPrazo: 180 },
    carro: { label: 'Carro', min: 30000, max: 500000, defaultPrazo: 120 },
    moto: { label: 'Moto', min: 10000, max: 100000, defaultPrazo: 84 },
    caminhao: { label: 'Caminhão', min: 100000, max: 800000, defaultPrazo: 180 },
    servicos: { label: 'Serviços', min: 5000, max: 200000, defaultPrazo: 60 },
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

    // Taxa de administração varia por tipo
    const taxasAdmin: Record<ConsorcioType, number> = {
      imovel: 0.15, // 15%
      carro: 0.18, // 18%
      moto: 0.20, // 20%
      caminhao: 0.16, // 16%
      servicos: 0.22, // 22%
    }

    const taxaAdmin = taxasAdmin[tipo]
    const totalComTaxas = valorNum * (1 + taxaAdmin)
    const parcela = totalComTaxas / prazoNum
    const apoioIgreja = totalComTaxas * 0.02 // 2% para a igreja

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

    toast.success('Simulação calculada com sucesso!')
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(value)
  }

  return (
    <div className="min-h-screen premium-gradient py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <Link href="/membro/dashboard" className="inline-flex items-center text-gold hover:text-gold/80 mb-6">
          ← Voltar
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Formulário */}
          <Card className="bg-black/60 border-gold/50">
            <CardHeader>
              <CardTitle className="text-3xl text-gold flex items-center">
                <Calculator className="mr-3 h-8 w-8" />
                Simulador de Consórcio
              </CardTitle>
              <CardDescription className="text-gray-300">
                Calcule suas parcelas e veja quanto você vai pagar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Tipo de Consórcio */}
              <div className="space-y-2">
                <Label className="text-white">Tipo de Consórcio</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {Object.entries(tiposConsorcio).map(([key, value]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setTipo(key as ConsorcioType)
                        setPrazo(value.defaultPrazo.toString())
                      }}
                      className={`p-3 rounded-md border transition ${
                        tipo === key
                          ? 'bg-gold text-black border-gold font-semibold'
                          : 'bg-black/40 border-gold/30 text-white hover:bg-gold/20'
                      }`}
                    >
                      {value.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Valor do Crédito */}
              <div className="space-y-2">
                <Label htmlFor="valor" className="text-white">
                  Valor do Crédito
                </Label>
                <div className="flex items-center gap-2">
                  <span className="text-gold">R$</span>
                  <Input
                    id="valor"
                    type="text"
                    value={new Intl.NumberFormat('pt-BR').format(parseFloat(valorCredito) || 0)}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '')
                      setValorCredito(value)
                    }}
                    className="bg-black/40 border-gold/30 text-white text-lg"
                    placeholder="200.000"
                  />
                </div>
                <p className="text-xs text-gray-400">
                  De R$ {tiposConsorcio[tipo].min.toLocaleString('pt-BR')} a R$ {tiposConsorcio[tipo].max.toLocaleString('pt-BR')}
                </p>
                <input
                  type="range"
                  min={tiposConsorcio[tipo].min}
                  max={tiposConsorcio[tipo].max}
                  step={1000}
                  value={valorCredito}
                  onChange={(e) => setValorCredito(e.target.value)}
                  className="w-full h-2 bg-gold/20 rounded-lg appearance-none cursor-pointer accent-gold"
                />
              </div>

              {/* Prazo */}
              <div className="space-y-2">
                <Label htmlFor="prazo" className="text-white">
                  Prazo (meses)
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="prazo"
                    type="number"
                    min="36"
                    max="200"
                    value={prazo}
                    onChange={(e) => setPrazo(e.target.value)}
                    className="bg-black/40 border-gold/30 text-white"
                  />
                  <span className="text-gray-400 text-sm">meses</span>
                </div>
                <p className="text-xs text-gray-400">De 36 a 200 meses</p>
                <input
                  type="range"
                  min="36"
                  max="200"
                  step="6"
                  value={prazo}
                  onChange={(e) => setPrazo(e.target.value)}
                  className="w-full h-2 bg-gold/20 rounded-lg appearance-none cursor-pointer accent-gold"
                />
              </div>

              {/* Quantidade de Cotas */}
              <div className="space-y-2">
                <Label htmlFor="cotas" className="text-white">
                  Quantidade de Cotas
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="cotas"
                    type="number"
                    min="1"
                    max="100"
                    value={cotas}
                    onChange={(e) => setCotas(e.target.value)}
                    className="bg-black/40 border-gold/30 text-white"
                  />
                  <span className="text-gray-400 text-sm">cotas</span>
                </div>
                <p className="text-xs text-gray-400">De 1 a 100 cotas</p>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={cotas}
                  onChange={(e) => setCotas(e.target.value)}
                  className="w-full h-2 bg-gold/20 rounded-lg appearance-none cursor-pointer accent-gold"
                />
              </div>

              <Button
                onClick={calcular}
                className="w-full bg-gold text-black hover:bg-gold/90"
                size="lg"
              >
                <Calculator className="mr-2 h-4 w-4" />
                Calcular Simulação
              </Button>

              <p className="text-xs text-gray-400 text-center">
                * Simulação ilustrativa. Os valores podem variar de acordo com a administradora, taxa de administração e condições específicas de cada grupo.
              </p>
            </CardContent>
          </Card>

          {/* Resultado */}
          <div>
            {resultado ? (
              <Card className="bg-black/60 border-gold/50 mb-6">
                <CardHeader>
                  <CardTitle className="text-2xl text-gold">Resultado da Simulação</CardTitle>
                  <CardDescription className="text-gray-300">
                    {tiposConsorcio[resultado.tipo].label}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-black/40 rounded-lg border border-gold/30">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="h-5 w-5 text-gold" />
                        <p className="text-gray-400 text-sm">Valor do Crédito</p>
                      </div>
                      <p className="text-2xl font-bold text-white">
                        {formatCurrency(resultado.valorCredito)}
                      </p>
                    </div>

                    <div className="p-4 bg-black/40 rounded-lg border border-gold/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-5 w-5 text-gold" />
                        <p className="text-gray-400 text-sm">Prazo</p>
                      </div>
                      <p className="text-2xl font-bold text-white">
                        {resultado.prazo} meses
                      </p>
                    </div>
                  </div>

                  <div className="p-6 bg-gold/10 rounded-lg border border-gold/30">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="h-6 w-6 text-gold" />
                      <p className="text-gray-400 text-sm font-semibold">Valor da Parcela</p>
                    </div>
                    <p className="text-4xl font-bold text-gold mb-2">
                      {formatCurrency(resultado.parcela)}
                    </p>
                    <p className="text-sm text-gray-400">
                      {resultado.cotas} {resultado.cotas === 1 ? 'cota' : 'cotas'}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-black/40 rounded">
                      <span className="text-gray-300">Valor do Crédito</span>
                      <span className="text-white font-semibold">
                        {formatCurrency(resultado.valorCredito)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-black/40 rounded">
                      <span className="text-gray-300">Taxa de Administração ({(resultado.taxaAdmin * 100).toFixed(0)}%)</span>
                      <span className="text-white font-semibold">
                        {formatCurrency(resultado.total - resultado.valorCredito)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-black/40 rounded">
                      <span className="text-gray-300">Total do Consórcio</span>
                      <span className="text-white font-bold text-lg">
                        {formatCurrency(resultado.total)}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-gold/10 rounded-lg border border-gold/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="h-5 w-5 text-gold" />
                      <p className="text-gray-400 text-sm font-semibold">Apoio Gerado à Igreja</p>
                    </div>
                    <p className="text-2xl font-bold text-gold mb-1">
                      {formatCurrency(resultado.apoioIgreja)}
                    </p>
                    <p className="text-xs text-gray-400">
                      Parte deste valor será destinado à sua igreja como apoio institucional (2%)
                    </p>
                  </div>

                  <Button className="w-full bg-gold text-black hover:bg-gold/90" size="lg">
                    Solicitar Proposta
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-black/60 border-gold/50">
                <CardContent className="pt-6 text-center">
                  <Calculator className="h-16 w-16 text-gold/50 mx-auto mb-4" />
                  <p className="text-gray-400">
                    Preencha os dados ao lado e clique em "Calcular Simulação" para ver os resultados
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
