import { Currency } from '@/domain/common/money';
import { z } from 'zod';

const currencySchema = z.nativeEnum(Currency, { message: 'Invalid currency' })

export const walletParamSchema = z.object({
  walletId: z.string(),
})

export type WalletParamsDto = z.infer<typeof walletParamSchema>

export const initializeTransferSchema = z.object({
  amount: z.number(),
  currency: currencySchema,
  destination: z.object({
    type: z.literal('wallet'),
    walletId: z.string(),
  }).or(
    z.object({
      type: z.literal('bank'),
      accountNumber: z.string(),
      bankName: z.string(),
      accountName: z.string(),
    })
  )
})


export type InitializeTransferDTO = z.infer<typeof initializeTransferSchema>

const paymentPartySchema = z.object({
  type: z.string(),
  walletId: z.string().optional(),
  accountNumber: z.string().optional(),
  bankName: z.string().optional(),
  accountName: z.string().optional(),
})

const paymentSchema = z.object({
  id: z.string(),
  amount: z.string(),
  currency: currencySchema,
  status: z.string(),
  reason: z.string(),
  to: paymentPartySchema,
  from: paymentPartySchema,
  createdAt: z.string().or(z.date()),
})

export const paymentResponseSchema = z.object({
  payment: paymentSchema
})

export type PaymentResponse = z.infer<typeof paymentResponseSchema>

export const paymentsResponseSchema = z.object({
  payments: z.array(paymentSchema)
})

export type PaymentsResponse = z.infer<typeof paymentsResponseSchema>

export const guyWebhookSchema = z.object({
  transfer: z.object({
    status: z.enum(['success', 'failed']),
    amount: z.string(),
    currency: z.string(),
    verified: z.boolean(),
    reference: z.string().optional(),
    reason: z.string().optional(),
    senderBankName: z.string(),
    senderAccountNumber: z.string(),
    senderAccountName: z.string(),
    receiverBankName: z.string(),
    receiverAccountNumber: z.string(),
    receiverAccountName: z.string(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
  })
})

export type GuyWebhookRequestDto = z.infer<typeof guyWebhookSchema>

