# 🚀 Guia de Deploy - Prospere Aliança

## 📦 Deploy no Vercel (Recomendado)

### Opção 1: Deploy Automático via GitHub

1. **Acesse o Vercel:**
   - Vá para https://vercel.com
   - Faça login com sua conta GitHub

2. **Importar Projeto:**
   - Clique em "Add New Project"
   - Selecione o repositório: `emegs88/consorcio-cristao-paulo`
   - Clique em "Import"

3. **Configurações do Projeto:**
   - **Framework Preset:** Next.js (detectado automaticamente)
   - **Root Directory:** `./` (raiz)
   - **Build Command:** `npm run build` (já configurado)
   - **Output Directory:** `.next` (padrão)
   - **Install Command:** `npm install` (padrão)

4. **Variáveis de Ambiente:**
   Adicione no Vercel:
   ```
   DATABASE_URL=file:./dev.db
   NEXTAUTH_SECRET=seu-secret-aqui
   NEXTAUTH_URL=https://seu-dominio.vercel.app
   ```

5. **Deploy:**
   - Clique em "Deploy"
   - Aguarde o build completar
   - Seu site estará em: `https://consorcio-cristao-paulo.vercel.app`

### ⚠️ Importante: Banco de Dados

**SQLite não funciona bem no Vercel!** Você precisa:

#### Opção A: Migrar para PostgreSQL (Recomendado)

1. **Criar banco no Vercel Postgres:**
   - No dashboard do Vercel, vá em "Storage"
   - Crie um novo Postgres database
   - Copie a connection string

2. **Atualizar schema.prisma:**
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

3. **Atualizar variável de ambiente:**
   - Use a connection string do Vercel Postgres

#### Opção B: Usar Supabase/Neon (Alternativa)

1. Crie conta em https://supabase.com ou https://neon.tech
2. Crie um novo projeto
3. Copie a connection string
4. Atualize `DATABASE_URL` no Vercel

### 📋 Checklist de Deploy

- [ ] Repositório conectado ao Vercel
- [ ] Variáveis de ambiente configuradas
- [ ] Banco de dados configurado (PostgreSQL)
- [ ] Build passando
- [ ] Site acessível
- [ ] Testar login/cadastro
- [ ] Testar funcionalidades principais

### 🔧 Comandos Úteis

```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer deploy
vercel

# Deploy em produção
vercel --prod
```

### 🌐 Domínio Customizado

1. No Vercel, vá em "Settings" > "Domains"
2. Adicione seu domínio
3. Configure DNS conforme instruções

---

## 📊 Status do Deploy

✅ **Código:** Pronto
✅ **Configurações:** Prontas
⚠️ **Banco de Dados:** Precisa migrar para PostgreSQL

---

**Próximo passo:** Conectar o repositório no Vercel e configurar o banco de dados!
