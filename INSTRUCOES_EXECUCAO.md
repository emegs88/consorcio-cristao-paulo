# 🚀 Instruções de Execução - Prospere Aliança

## ⚡ Setup Rápido

### 1. Instalar Dependências
```bash
npm install
```

**Se der erro de permissão, execute:**
```bash
sudo npm install
```

### 2. Configurar Banco de Dados
```bash
# Gerar cliente Prisma
npm run db:generate

# Criar banco de dados
npm run db:push
```

### 3. Popular Dados Iniciais
```bash
# Popular convenções (CBESP)
npx tsx scripts/seed-conventions.ts

# Criar usuário admin
npx tsx scripts/create-admin.ts
```

**Credenciais do Admin:**
- Email: `admin@prosperealianca.com`
- Senha: `admin123`

### 4. Iniciar Servidor
```bash
npm run dev
```

### 5. Acessar no Browser
Abra: **http://localhost:3000**

---

## 🔧 Script Automatizado

Execute tudo de uma vez:
```bash
chmod +x setup.sh
./setup.sh
```

---

## ✅ Correções Aplicadas

### 1. Rotas Dinâmicas Next.js 14
- ✅ Corrigido `params` para ser `Promise<{ id: string }>`
- ✅ Adicionado `await params` em todas as rotas dinâmicas

### 2. useSearchParams
- ✅ Envolvido em `Suspense` para Next.js 14

### 3. Componentes UI
- ✅ Todos os componentes criados e funcionais

---

## 🐛 Problemas Comuns

### Erro: "Cannot find module"
**Solução:** Execute `npm install`

### Erro: "Prisma Client not generated"
**Solução:** Execute `npm run db:generate`

### Erro: "Database not found"
**Solução:** Execute `npm run db:push`

### Erro de permissão no npm
**Solução:** Execute com `sudo` ou corrija permissões do npm

---

## 📋 Checklist de Execução

- [ ] `npm install` executado com sucesso
- [ ] `npm run db:generate` executado
- [ ] `npm run db:push` executado
- [ ] Convenções populadas
- [ ] Admin criado
- [ ] Servidor iniciado (`npm run dev`)
- [ ] Site acessível em http://localhost:3000

---

## 🎯 Próximos Passos Após Setup

1. Acesse http://localhost:3000
2. Faça login como admin:
   - Email: `admin@prosperealianca.com`
   - Senha: `admin123`
3. Aprove membros e igrejas em `/admin/membros` e `/admin/igrejas`
4. Teste o cadastro de novos membros e igrejas

---

**Status:** ✅ Todas as correções aplicadas
**Pronto para executar!** 🚀
