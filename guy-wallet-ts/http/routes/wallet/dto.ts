import { Currency } from '@/domain/common/money';
import { z } from 'zod';

const currencySchema = z.nativeEnum(Currency, { message: 'Invalid currency' })

export const createWalletSchema = z.object({
  currency: currencySchema,
})

export type CreateWalletDto = z.infer<typeof createWalletSchema>

const walletResponseSchema = z.object({
  id: z.string(),
  currency: z.string(),
  balance: z.string(),
  accountNumber: z.string(),
  bankName: z.string(),
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

export const walletsResponseSchema = z.object({
  wallets: z.array(walletResponseSchema),
})

export type GetWalletsResponseDTO = z.infer<typeof walletsResponseSchema>

export const getPaymentsResponseSchema = z.object({
  payments: z.array(z.object({
    id: z.string(),
    amount: z.number(),
    currency: z.string(),
    status: z.string(),
    description: z.string(),
    createdAt: z.string(),
  }))
})

export type GetPaymentResponse = z.infer<typeof getPaymentsResponseSchema>
