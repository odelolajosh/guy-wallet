import { z } from "zod";

/**
 * Interfaces the configuration object for the application
 */
export interface IConfiguration {
  /**
   * Gets a configuration value by key
   * @param key - The key to get
   * @returns The configuration value
   */
  get<K extends keyof ConfigurationObject>(key: K): ConfigurationObject[K];
}

export const configurationSchema = z.object({
  // Application specific variables
  PORT: z.string(),

  // JWTs
  JWT_ACCESS_SECRET: z.string(),
  JWT_ACCESS_EXPIRES: z.string(),
  JWT_REFRESH_SECRET: z.string(),
  JWT_REFRESH_EXPIRES: z.string(),
  
  // Google client
  GOOGLE_CLIENT_ID: z.string(),

  // Database
  DB_USER: z.string(),
  DB_HOST: z.string(),
  DB_NAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_PORT: z.string(),

  // Guy payment service
  GUY_PAYMENT_PORT: z.string(),
  GUY_PAYMENT_WEBHOOK: z.string(),
})

/**
 * Defines the configuration object type
 */
export type ConfigurationObject = z.infer<typeof configurationSchema>
