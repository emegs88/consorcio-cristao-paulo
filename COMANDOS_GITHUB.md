# 🚀 Comandos para Enviar ao GitHub

## Repositório: https://github.com/emegs88/consorcio-cristao-paulo.git

### Opção 1: Script Automatizado

```bash
chmod +x push-to-github.sh
./push-to-github.sh
```

### Opção 2: Comandos Manuais

Execute no terminal dentro da pasta do projeto:

```bash
# 1. Inicializar Git
git init

# 2. Adicionar remote
git remote add origin https://github.com/emegs88/consorcio-cristao-paulo.git

# 3. Adicionar arquivos
git add .

# 4. Commit
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

# 5. Branch main
git branch -M main

# 6. Push
git push -u origin main
```

### ⚠️ Se der erro de autenticação:

Se pedir credenciais, você pode:

1. **Usar Personal Access Token:**
   - Vá em GitHub Settings > Developer settings > Personal access tokens
   - Crie um token com permissão `repo`
   - Use o token como senha

2. **Ou usar SSH:**
   ```bash
   git remote set-url origin git@github.com:emegs88/consorcio-cristao-paulo.git
   git push -u origin main
   ```

### ✅ Após o Push

O projeto estará disponível em:
**https://github.com/emegs88/consorcio-cristao-paulo**

### 📋 Checklist Antes do Push

- [x] Código completo
- [x] .gitignore configurado
- [x] Documentação completa
- [x] Sem arquivos sensíveis (.env, .db)
- [x] README atualizado

---

**Pronto para enviar!** 🚀
