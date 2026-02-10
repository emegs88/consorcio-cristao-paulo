# ✅ Correções Aplicadas

## Problema: SQLite não suporta Enums

### Solução Aplicada:
- ✅ Removidos enums `UserRole` e `ApprovalStatus` do schema
- ✅ Convertidos para `String` com valores padrão
- ✅ Schema agora compatível com SQLite

### Mudanças no Schema:
```prisma
// ANTES (não funciona com SQLite):
enum UserRole {
  MEMBER
  CHURCH
  ADMIN
}

// DEPOIS (funciona):
role String // "MEMBER" | "CHURCH" | "ADMIN"
```

## Próximos Passos:

Execute no terminal:

```bash
# 1. Gerar Prisma Client
npm run db:generate

# 2. Criar banco de dados
npm run db:push

# 3. Popular dados
npx tsx scripts/seed-conventions.ts
npx tsx scripts/create-admin.ts

# 4. Iniciar servidor
npm run dev
```

## Status: ✅ Schema Corrigido
