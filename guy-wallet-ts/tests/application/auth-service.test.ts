import { AuthService } from '@/application/auth/auth-service'
import { beforeAll, describe, expect, it } from 'vitest'
import { TestConfiguration } from '../mocks/test-configuration'
import { TestUserRepository } from '../mocks/user-repository'
import { IAuthService } from '@/application/auth/auth-interface'

describe('AuthService', () => {
  let authService: IAuthService

  const name = 'Guy Fieri'
  const email = 'guy@gmail.com'
  const password = 'GuYf!Er1'
  let accessToken: string

  beforeAll(() => {
    const config = new TestConfiguration({
      JWT_ACCESS_EXPIRES: "2m",
      JWT_ACCESS_SECRET: "access_secret",
      JWT_REFRESH_EXPIRES: "5m",
      JWT_REFRESH_SECRET: "refresh_secret"
    })
    const userRepository = new TestUserRepository()
    authService = new AuthService(config, userRepository)
  })

  // login should fail here
  it('should fail to login with non-existent user', async () => {
    await expect(() => authService.login(email, password)).rejects.toThrowError(/invalid/i)
  })

  it('should register a new, non-existent user', async () => {
    const user = await authService.register(name, email, password)
    expect(user).toHaveProperty('id')
    expect(user).toHaveProperty('email', email)
    expect(user).toHaveProperty('password')
    expect(user.password).not.toBe(password)
    expect(user).toHaveProperty('createdAt')
  })

  it('should login the newly registered user', async () => {
    const user = await authService.login(email, password)
    expect(user).toHaveProperty('id')
    expect(user).toHaveProperty('email', email)
    expect(user).toHaveProperty('password')
    expect(user.password).not.toBe(password)
    expect(user).toHaveProperty('createdAt')
  })

  it('should fail to register an already existing user', async () => {
    await expect(() => authService.register(name, email, password)).rejects.toThrowError(/exist/i)
  });

  it('should fail to login with invalid credentials', async () => {
    await expect(() => authService.login(email, 'wrongpassword')).rejects.toThrowError(/invalid/i)
  })

  it('should generate auth tokens', async () => {
    const user = await authService.login(email, password)
    const tokens = await authService.generateTokens(user)
    expect(tokens).toHaveProperty('accessToken')
    expect(tokens).toHaveProperty('refreshToken')

    accessToken = tokens.accessToken
  })

  it('should verify access token', async () => {
    const user = await authService.verifyAccessToken(accessToken)
    expect(user).toHaveProperty('id')
    expect(user).toHaveProperty('email', email)
    expect(user).toHaveProperty('password')
    expect(user!.password).not.toBe(password)
    expect(user).toHaveProperty('createdAt')
  });
})
