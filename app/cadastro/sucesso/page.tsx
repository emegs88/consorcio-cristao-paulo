'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

function CadastroSucessoContent() {
  const searchParams = useSearchParams()
  const tipo = searchParams.get('tipo')

  return (
    <div className="min-h-screen premium-gradient flex items-center justify-center py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="bg-black/60 border-gold/50 text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-gold" />
            </div>
            <CardTitle className="text-3xl text-gold">
              Cadastro Realizado com Sucesso!
            </CardTitle>
            <CardDescription className="text-gray-300 text-lg mt-4">
              {tipo === 'igreja' 
                ? 'Sua igreja foi cadastrada e está aguardando aprovação. Você receberá um e-mail quando o acesso for liberado.'
                : 'Seu cadastro foi enviado e está aguardando aprovação. Você receberá um e-mail quando o acesso for liberado.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/">
              <Button className="bg-gold text-black hover:bg-gold/90" size="lg">
                Voltar à Página Inicial
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function CadastroSucesso() {
  return (
    <Suspense fallback={
      <div className="min-h-screen premium-gradient flex items-center justify-center">
        <div className="text-white">Carregando...</div>
      </div>
    }>
      <CadastroSucessoContent />
    </Suspense>
  )
}
