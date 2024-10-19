import dotenv from "dotenv";
import { ConfigurationObject, configurationSchema, IConfiguration } from "./interfaces";

dotenv.config()

/**
 * Thrown when the environment variables doen't match
 */
export class InvalidEnvironmentError extends Error {
  readonly message = "Invalid Environment Error"
}

/**
 * Thrown when the environment is not found
 */
export class EnvironmentNotFoundError extends Error {
  constructor(key: string) {
    super(`Environment variable ${key} not found`)
  }
}

/**
 * Loads the application configuration from environment variables
 */
export class EnvConfiguration implements IConfiguration {
  private readonly configuration: ConfigurationObject;

  constructor() {
    const result = configurationSchema.safeParse(process.env)
    if (result.error) {
      throw new InvalidEnvironmentError()
    }

    this.configuration = result.data;
  }

  get(key: keyof ConfigurationObject) {
    // There shouldn't be a case where the key is not present
    if (!this.configuration[key]) {
      throw new EnvironmentNotFoundError(key);
    }
    return this.configuration[key];
  }
}
