/**
 * Wallet status - Active or Inactive (Suspended)
 */
export enum WalletStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export enum Currency {
  NGN = "NGN",
  USD = "USD",
  EUR = "EUR"
}

/**
 * Money value object
 */
export class Money {
  constructor(public currency: Currency, public amount: number = 0) {}

  /**
   * Add money
   * @param money Money to add
   */
  add(money: Money): Money {
    if (this.currency !== money.currency) {
      throw new Error("Currencies do not match")
    }

    return new Money(this.currency, this.amount + money.amount)
  }

  /**
   * Subtract money
   * @param money Money to subtract
   */
  subtract(money: Money): Money {
    if (this.currency !== money.currency) {
      throw new Error("Currencies do not match")
    }

    return new Money(this.currency, this.amount - money.amount)
  }
}
