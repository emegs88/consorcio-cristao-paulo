# Prospere Aliança

Portal privado de consórcio para membros cristãos com apoio institucional às igrejas.

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.7-green)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)

## 🎯 Visão

Comunidade privada de planejamento patrimonial para membros cristãos, onde cada membro pode vincular sua igreja e parte dos resultados é destinada como apoio voluntário ao ministério.

## 🚀 Tecnologias

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Prisma** - ORM para banco de dados
- **SQLite** - Banco de dados (pode ser migrado para PostgreSQL)
- **Tailwind CSS** - Estilização
- **Radix UI** - Componentes acessíveis

## 📋 Funcionalidades

### Páginas Públicas
- ✅ Página inicial com apresentação
- ✅ Cadastro de membros
- ✅ Cadastro de igrejas
- ✅ Login

### Área do Membro
- ✅ Dashboard com estatísticas
- ✅ Simulador de consórcio
- ✅ Visualização do apoio gerado à igreja
- ✅ Informações sobre a igreja vinculada

### Área da Igreja
- ✅ Dashboard com estatísticas
- ✅ Visualização de membros vinculados
- ✅ Relatórios de apoio recebido
- ✅ Histórico de repasses

### Área Admin
- ✅ Dashboard administrativo
- ✅ Gerenciamento de igrejas
- ✅ Gerenciamento de membros
- ✅ Controle de repasses

## 🗄️ Estrutura do Banco de Dados

- **User** - Usuários do sistema (membros, igrejas, admin)
- **Member** - Dados dos membros
- **Church** - Dados das igrejas (pode estar vinculada a uma Convention)
- **Convention** - Convenções/Denominações (ex: CBESP)
- **Operation** - Operações de consórcio
- **InstitutionalSupport** - Registros de apoio institucional

## 🎨 Design

- **Cores**: Preto, dourado (#D4AF37), branco, azul escuro (#0a1929)
- **Estilo**: Premium, institucional, respeitoso
- **Linguagem**: Apoio ao ministério, não comissão comercial

## 🔧 Instalação

```bash
# Instalar dependências
npm install

# Gerar cliente Prisma
npm run db:generate

# Criar banco de dados
npm run db:push

# (Opcional) Popular convenções (CBESP, etc)
npx tsx scripts/seed-conventions.ts

# (Opcional) Criar usuário admin
npx tsx scripts/create-admin.ts

# Iniciar servidor de desenvolvimento
npm run dev
```

## 📝 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="seu-secret-aqui"
NEXTAUTH_URL="http://localhost:3000"
```

## 🔒 Segurança

- Senhas são hasheadas com bcrypt
- Aprovação manual de membros e igrejas
- Controle de acesso baseado em roles
- Validação de dados em todas as rotas

## 📊 Lógica de Apoio Institucional

- Percentual padrão: **2%** (configurável)
- Calculado automaticamente sobre cada operação
- Classificado como "apoio voluntário ao ministério"
- Não é comissão comercial

## 🏛️ Convenções e Denominações

O sistema suporta vinculação de igrejas a convenções/denominações. Atualmente está configurado para:

- **CBESP** - Convenção Batista do Estado de São Paulo
  - Página informativa: `/sobre/cbesp`
  - Igrejas podem se vincular à CBESP no cadastro

Para adicionar novas convenções, execute o script de seed ou adicione manualmente no banco.

## 🚧 Próximos Passos

- [ ] Sistema de autenticação completo (NextAuth)
- [ ] Integração com WhatsApp
- [ ] Sistema de notificações
- [ ] Relatórios em PDF
- [ ] Dashboard com gráficos
- [ ] Sistema de convites
- [ ] Integração com gateway de pagamento
- [ ] Relatórios por convenção

## 📄 Licença

Este projeto é privado e confidencial.

---

**Prospere Aliança** - Planejamento Patrimonial com Propósito
