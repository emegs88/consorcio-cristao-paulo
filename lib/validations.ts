import { z } from 'zod'

// Schema de cadastro de membro
export const memberSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  churchName: z.string().min(2, 'Nome da igreja é obrigatório'),
  city: z.string().min(2, 'Cidade é obrigatória'),
  whatsapp: z.string().min(10, 'WhatsApp inválido'),
  referral: z.string().optional(),
  financialGoal: z.string().optional(),
  linkChurch: z.boolean().default(true),
})

// Schema de cadastro de igreja
export const churchSchema = z.object({
  name: z.string().min(3, 'Nome da igreja deve ter pelo menos 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  pastorName: z.string().min(3, 'Nome do pastor é obrigatório'),
  cnpj: z.string().optional(),
  city: z.string().min(2, 'Cidade é obrigatória'),
  memberCount: z.string().optional(),
  bankAccount: z.string().optional(),
  conventionId: z.string().optional(),
})

// Schema de login
export const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
})

// Schema de operação
export const operationSchema = z.object({
  memberId: z.string(),
  type: z.string().default('consortium'),
  amount: z.number().positive('Valor deve ser positivo'),
  description: z.string().optional(),
})

export type MemberFormData = z.infer<typeof memberSchema>
export type ChurchFormData = z.infer<typeof churchSchema>
export type LoginFormData = z.infer<typeof loginSchema>
export type OperationFormData = z.infer<typeof operationSchema>
