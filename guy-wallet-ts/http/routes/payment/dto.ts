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

export const paymentResponseSchema = z.object({
  payment: z.object({
    id: z.string(),
    amount: z.number(),
    currency: z.string(),
    status: z.string(),
    reason: z.string(),
    createdAt: z.string(),
  })
})

export type PaymentResponse = z.infer<typeof paymentResponseSchema>

export const guyWebhookSchema = z.object({
  transfer: z.object({
    status: z.enum(['success', 'failed']),
    amount: z.number(),
    currency: z.string(),
    verified: z.boolean(),
    reference: z.string(),
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

