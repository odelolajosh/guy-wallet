/**
 * Currency enum
 */
export enum Currency {
  NGN = "NGN",
  USD = "USD",
  EUR = "EUR"
}

/**
 * Money value object
 */
export class Money {
  constructor(public currency: Currency, public value: number = 0) {}

  /**
   * Add money
   * @param money Money to add
   * @returns Added money
   * @throws Error if currencies do not match
   */
  add(money: Money) {
    if (this.currency !== money.currency) {
      throw new Error("Currencies do not match")
    }

    return new Money(this.currency, this.value + money.value)
  }

  /**
   * Subtract money
   * @param money Money to subtract
   * @returns Subtracted money
   * @throws Error if currencies do not match
   */
  subtract(money: Money) {
    if (this.currency !== money.currency) {
      throw new Error("Currencies do not match")
    }

    return new Money(this.currency, this.value - money.value)
  }

  /**
   * Negate money
   * @returns Negated money
   */
  negate() {
    return new Money(this.currency, -this.value)
  }
}
