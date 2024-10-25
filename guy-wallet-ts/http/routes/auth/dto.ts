import { z } from 'zod';

export const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginRequestDto = z.infer<typeof loginRequestSchema>;

export const registerRequestSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export type RegisterRequestDto = z.infer<typeof registerRequestSchema>;

export const loginResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  user: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    createdAt: z.string(),
  }),
});

export type LoginResponseDto = z.infer<typeof loginResponseSchema>;

export type RegisterResponseDto = LoginResponseDto;

export const oauthRequestQuerySchema = z.object({
  code: z.string(),
  state: z.string(),
});

export type OAuthRequestQuery = z.infer<typeof oauthRequestQuerySchema>;
