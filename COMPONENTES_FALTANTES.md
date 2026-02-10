# 🧩 Componentes UI Faltantes

Lista de componentes que precisam ser criados para melhorar a experiência.

---

## 🔴 CRÍTICO - Criar Agora

### 1. Toast/Notification System
```typescript
// components/ui/toast.tsx
- Sucesso
- Erro
- Aviso
- Info
- Auto-dismiss
- Posições (top-right, bottom-left, etc)
```

### 2. Modal/Dialog
```typescript
// components/ui/dialog.tsx
- Confirmações
- Formulários modais
- Visualizações detalhadas
- Overlay com blur
```

### 3. Select/Dropdown Melhorado
```typescript
// components/ui/select.tsx
- Busca dentro do select
- Multi-select
- Agrupamento
- Customização visual
```

### 4. Loading States
```typescript
// components/ui/skeleton.tsx
- Skeleton loaders
- Spinners
- Progress bars
- Loading overlays
```

---

## 🟡 IMPORTANTE - Criar em Breve

### 5. Tabs
```typescript
// components/ui/tabs.tsx
- Navegação por abas
- Animações
- Responsivo
```

### 6. Accordion
```typescript
// components/ui/accordion.tsx
- FAQ
- Detalhes expansíveis
- Animações suaves
```

### 7. Tooltip
```typescript
// components/ui/tooltip.tsx
- Informações adicionais
- Posicionamento inteligente
- Delay configurável
```

### 8. Popover
```typescript
// components/ui/popover.tsx
- Menus contextuais
- Informações rápidas
- Formulários inline
```

### 9. Badge
```typescript
// components/ui/badge.tsx
- Status indicators
- Contadores
- Tags
- Variantes (success, error, warning)
```

### 10. Table
```typescript
// components/ui/table.tsx
- Tabelas responsivas
- Ordenação
- Paginação integrada
- Seleção de linhas
```

### 11. Pagination
```typescript
// components/ui/pagination.tsx
- Navegação de páginas
- Informações de total
- Pular páginas
```

### 12. Alert
```typescript
// components/ui/alert.tsx
- Mensagens importantes
- Variantes (info, success, warning, error)
- Ícones
- Dismissible
```

---

## 🟢 RECOMENDADO - Criar Depois

### 13. Date Picker
```typescript
// components/ui/date-picker.tsx
- Seleção de datas
- Range de datas
- Calendário visual
```

### 14. File Upload
```typescript
// components/ui/file-upload.tsx
- Upload de arquivos
- Preview
- Progress
- Drag & drop
```

### 15. Progress
```typescript
// components/ui/progress.tsx
- Barras de progresso
- Circular progress
- Com labels
```

### 16. Separator
```typescript
// components/ui/separator.tsx
- Divisores visuais
- Horizontal/Vertical
```

### 17. Avatar
```typescript
// components/ui/avatar.tsx
- Fotos de perfil
- Iniciais
- Status indicators
```

### 18. Command Palette
```typescript
// components/ui/command.tsx
- Busca rápida
- Atalhos
- Navegação rápida
```

### 19. Sheet/Sidebar
```typescript
// components/ui/sheet.tsx
- Painéis laterais
- Mobile menu
- Animações
```

### 20. Calendar
```typescript
// components/ui/calendar.tsx
- Visualização mensal
- Eventos marcados
- Navegação
```

---

## 📦 BIBLIOTECAS RECOMENDADAS

### Para Componentes
```json
{
  "@radix-ui/react-toast": "^1.1.5",
  "@radix-ui/react-dialog": "^1.0.5",
  "@radix-ui/react-select": "^2.0.0",
  "@radix-ui/react-tabs": "^1.0.4",
  "@radix-ui/react-accordion": "^1.1.2",
  "@radix-ui/react-tooltip": "^1.0.7",
  "@radix-ui/react-popover": "^1.0.7",
  "@radix-ui/react-alert-dialog": "^1.0.5",
  "react-day-picker": "^8.9.1",
  "date-fns": "^2.30.0"
}
```

### Para Animações
```json
{
  "framer-motion": "^10.16.16",
  "react-spring": "^9.7.3"
}
```

### Para Gráficos
```json
{
  "recharts": "^2.10.3",
  "chart.js": "^4.4.0"
}
```

---

## 🎨 PADRÃO DE CRIAÇÃO

Todos os componentes devem seguir:

1. **TypeScript** com tipos completos
2. **Radix UI** como base (quando disponível)
3. **Tailwind CSS** para estilização
4. **Variantes** usando `class-variance-authority`
5. **Acessibilidade** (ARIA, keyboard navigation)
6. **Documentação** com exemplos
7. **Testes** básicos

---

## 📝 EXEMPLO DE ESTRUTURA

```
components/
├── ui/
│   ├── toast.tsx
│   ├── dialog.tsx
│   ├── select.tsx
│   └── ...
├── forms/
│   ├── member-form.tsx
│   ├── church-form.tsx
│   └── ...
├── charts/
│   ├── line-chart.tsx
│   ├── bar-chart.tsx
│   └── ...
└── layout/
    ├── header.tsx
    ├── sidebar.tsx
    └── footer.tsx
```

---

**Prioridade:** Implementar na ordem listada
**Prazo estimado:** 2-3 semanas para componentes críticos
