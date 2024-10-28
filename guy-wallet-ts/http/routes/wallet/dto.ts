import { Currency } from '@/domain/common/money';
import { z } from 'zod';

const currencySchema = z.enum([Currency.USD, Currency.EUR])

export const createWalletSchema = z.object({
  currency: currencySchema,
})

export type CreateWalletDto = z.infer<typeof createWalletSchema>

const walletResponseSchema = z.object({
  id: z.string(),
  currency: z.string(),
  balance: z.number(),
  createdAt: z.string(),
  status: z.string(),
})

export type WalletResponseDTO = z.infer<typeof walletResponseSchema>

const singleWalletResponseSchema = z.object({
  wallet: walletResponseSchema,
})

export const createWalletResponseSchema = singleWalletResponseSchema

export type CreateWalletResponseDTO = z.infer<typeof createWalletResponseSchema>

export const getWalletByIdSchema = z.object({
  walletId: z.string(),
})

export type WalletParamsDto = z.infer<typeof getWalletByIdSchema>

export const getWalletByIdResponseSchema = singleWalletResponseSchema

export type GetWalletByIdResponseDTO = z.infer<typeof getWalletByIdResponseSchema>

export const initializeTransferRequestSchema = z.object({
  destinationType: z.literal('wallet'),
  walletId: z.string(),
}).or(
  z.object({
    destinationType: z.literal('bank'),
    accountNumber: z.string(),
    bankName: z.string(),
  })
).and(
  z.object({
    amount: z.number(),
    currency: currencySchema,
  })
)

export type InitializeTransferRequestDTO = z.infer<typeof initializeTransferRequestSchema>