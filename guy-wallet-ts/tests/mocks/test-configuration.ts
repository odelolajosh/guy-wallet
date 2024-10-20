import { ConfigurationObject, IConfiguration } from "@/infrastructure/config/interfaces";

type TestConfigurationObject = Partial<ConfigurationObject>;

export class TestConfiguration implements IConfiguration {
  private readonly config: TestConfigurationObject;

  constructor(configOverrides: TestConfigurationObject = {}) {
    this.config = {
      ...configOverrides,  // Allow overrides if necessary
    };
  }

  get(key: keyof ConfigurationObject) {
    return this.config[key] ?? "";
  }
}
