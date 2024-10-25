import { Currency } from '@/domain/wallet/values';
import { z } from 'zod';

const currencySchema = z.union([z.literal(Currency.NGN), z.literal(Currency.USD), z.literal(Currency.EUR)])

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

export type GetWalletByIdDto = z.infer<typeof getWalletByIdSchema>

export const getWalletByIdResponseSchema = singleWalletResponseSchema

export type GetWalletByIdResponseDTO = z.infer<typeof getWalletByIdResponseSchema>