#!/bin/bash

echo "🚀 Preparando para enviar ao GitHub..."

# Inicializar Git
echo "📦 Inicializando repositório Git..."
git init

# Adicionar remote
echo "🔗 Configurando remote..."
git remote add origin https://github.com/emegs88/consorcio-cristao-paulo.git 2>/dev/null || git remote set-url origin https://github.com/emegs88/consorcio-cristao-paulo.git

# Adicionar arquivos
echo "➕ Adicionando arquivos..."
git add .

# Commit
echo "💾 Fazendo commit..."
git commit -m "feat: Versão inicial completa - Portal de consórcio com apoio institucional

✨ Funcionalidades:
- Sistema completo de autenticação e autorização
- Cadastro de membros e igrejas com validação
- Dashboard para membros, igrejas e admin
- Simulador de consórcio completo (5 tipos)
- Sistema de aprovação admin
- Cálculo automático de apoio institucional (2%)
- Integração com CBESP
- Busca e filtros
- Relatórios mensais

🎨 Design:
- Tema premium (dourado/preto)
- Componentes UI completos
- Responsivo e acessível
- Loading states e toast notifications

🛠️ Tecnologias:
- Next.js 14
- TypeScript
- Prisma ORM
- SQLite
- Tailwind CSS
- React Hook Form + Zod"

# Branch main
echo "🌿 Configurando branch main..."
git branch -M main

# Push
echo "📤 Enviando para GitHub..."
git push -u origin main

echo "✅ Concluído! Projeto enviado para GitHub."
echo "🔗 Repositório: https://github.com/emegs88/consorcio-cristao-paulo"
