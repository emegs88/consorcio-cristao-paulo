#!/bin/bash

echo "🚀 Configurando Prospere Aliança..."

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

# Gerar cliente Prisma
echo "🗄️ Gerando cliente Prisma..."
npm run db:generate

# Criar banco de dados
echo "💾 Criando banco de dados..."
npm run db:push

# Popular convenções
echo "🏛️ Populando convenções..."
npx tsx scripts/seed-conventions.ts

# Criar admin (opcional)
echo "👤 Criando usuário admin..."
echo "Email padrão: admin@prosperealianca.com"
echo "Senha padrão: admin123"
npx tsx scripts/create-admin.ts

echo "✅ Setup completo!"
echo "🚀 Iniciando servidor..."
npm run dev
