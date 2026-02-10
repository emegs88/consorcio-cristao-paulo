# Contribuindo para Prospere Aliança

## 🚀 Como Contribuir

### Setup do Ambiente

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/prospere-alianca.git
cd prospere-alianca
```

2. Instale as dependências
```bash
npm install
```

3. Configure o banco de dados
```bash
npm run db:generate
npm run db:push
```

4. Popule dados iniciais
```bash
npx tsx scripts/seed-conventions.ts
npx tsx scripts/create-admin.ts
```

5. Inicie o servidor
```bash
npm run dev
```

## 📝 Padrões de Código

- Use TypeScript
- Siga os padrões do ESLint
- Use componentes do shadcn/ui
- Mantenha o design premium (dourado/preto)

## 🧪 Testes

Antes de fazer commit, certifique-se de:
- [ ] Código compila sem erros
- [ ] Linter passa (`npm run lint`)
- [ ] Build funciona (`npm run build`)
- [ ] Funcionalidades testadas manualmente

## 📦 Estrutura do Projeto

```
app/              # Páginas Next.js
components/       # Componentes React
lib/             # Utilitários e lógica
prisma/          # Schema do banco
scripts/          # Scripts auxiliares
```

## 🔒 Segurança

- Nunca commite senhas ou tokens
- Use variáveis de ambiente
- Valide todos os inputs
- Use Prisma para queries

## 📄 Licença

Este projeto é privado e confidencial.
