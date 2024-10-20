import { z } from 'zod';

export const loginRequestDto = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginRequestDto = z.infer<typeof loginRequestDto>;

export const registerRequestDto = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export type RegisterRequestDto = z.infer<typeof registerRequestDto>;

export const loginResponseDto = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  user: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    createdAt: z.string(),
  }),
});

export type LoginResponseDto = z.infer<typeof loginResponseDto>;

export type RegisterResponseDto = LoginResponseDto;

export const oauthRequestQuery = z.object({
  code: z.string(),
  state: z.string(),
});

export type OAuthRequestQuery = z.infer<typeof oauthRequestQuery>;
