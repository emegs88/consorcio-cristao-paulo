# 🗄️ Guia de Migração para PostgreSQL

## Por que migrar?

SQLite não funciona bem em ambientes serverless como Vercel. PostgreSQL é recomendado para produção.

## 📋 Passos para Migração

### 1. Criar Banco PostgreSQL

#### Opção A: Vercel Postgres
1. No dashboard do Vercel, vá em "Storage"
2. Clique em "Create Database"
3. Selecione "Postgres"
4. Escolha um nome e região
5. Copie a connection string

#### Opção B: Supabase (Gratuito)
1. Acesse https://supabase.com
2. Crie uma conta/projeto
3. Vá em Settings > Database
4. Copie a connection string

#### Opção C: Neon (Gratuito)
1. Acesse https://neon.tech
2. Crie uma conta/projeto
3. Copie a connection string

### 2. Atualizar Schema

```bash
# Copiar schema para PostgreSQL
cp prisma/schema.postgresql.prisma prisma/schema.prisma
```

Ou edite manualmente `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### 3. Configurar Variável de Ambiente

No Vercel:
- Settings > Environment Variables
- Adicione: `DATABASE_URL` = sua connection string PostgreSQL

### 4. Gerar e Aplicar Migrations

```bash
# Gerar Prisma Client
npm run db:generate

# Criar migration
npx prisma migrate dev --name init

# Aplicar no banco
npx prisma migrate deploy
```

### 5. Popular Dados Iniciais

```bash
# Popular convenções
npx tsx scripts/seed-conventions.ts

# Criar admin
npx tsx scripts/create-admin.ts
```

## ✅ Checklist

- [ ] Banco PostgreSQL criado
- [ ] Schema atualizado
- [ ] Variável DATABASE_URL configurada
- [ ] Migrations aplicadas
- [ ] Dados iniciais populados
- [ ] Testar conexão
- [ ] Deploy funcionando

---

**Após migração, o deploy no Vercel funcionará perfeitamente!**
