import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function NotFound() {
  return (
    <div className="min-h-screen premium-gradient flex items-center justify-center">
      <Card className="bg-black/60 border-gold/50 max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl text-gold">404</CardTitle>
          <CardDescription className="text-gray-300 text-lg">
            Página não encontrada
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400 mb-6">
            A página que você está procurando não existe ou foi movida.
          </p>
          <Link href="/">
            <Button className="w-full bg-gold text-black hover:bg-gold/90">
              Voltar à Página Inicial
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
