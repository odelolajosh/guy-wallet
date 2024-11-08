import { Decimal } from "../lib/decimal"

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
  decimal: Decimal

  constructor(private baseCurrency: Currency, private amount: string | number | Decimal = 0) {
    this.decimal = new Decimal(amount)
  }

  /**
   * Add money
   * @param money Money to add
   * @returns Added money
   * @throws Error if currencies do not match
   */
  add(money: Money) {
    if (this.baseCurrency !== money.baseCurrency) {
      throw new Error("Currencies do not match")
    }

    const other = new Decimal(money.amount)
    return new Money(this.baseCurrency, this.decimal.plus(other).toString())
  }

  /**
   * Subtract money
   * @param money Money to subtract
   * @returns Subtracted money
   * @throws Error if currencies do not match
   */
  subtract(money: Money) {
    if (this.baseCurrency !== money.baseCurrency) {
      throw new Error("Currencies do not match")
    }

    const other = new Decimal(money.amount)
    return new Money(this.baseCurrency , this.decimal.minus(other).toString())
  }

  /**
   * Negate money
   * @returns Negated money
   */
  negate() {
    return new Money(this.baseCurrency, this.decimal.negate().toString())
  }

  /**
   * Check if money is less than the other money
   * @param money Money to compare
   * @returns True if money is greater than the other money
   */
  lessThan(money: Money) {
    if (this.baseCurrency !== money.baseCurrency) {
      throw new Error("Currencies do not match")
    }

    const other = new Decimal(money.amount)
    return this.decimal.lessThan(other)
  }

  /**
   * Check if money is greater than the other money
   * @param money Money to compare
   * @returns True if money is greater than the other money
   */
  greaterThan(money: Money) {
    if (this.baseCurrency !== money.baseCurrency) {
      throw new Error("Currencies do not match")
    }

    const other = new Decimal(money.amount)
    return this.decimal.greaterThan(other)
  }

  /**
   * Check if money is equal to the other money
   * @param money Money to compare
   * @returns True if money is equal to the other money
   */
  equals(money: Money) {
    if (this.baseCurrency !== money.baseCurrency) {
      throw new Error("Currencies do not match")
    }

    const other = new Decimal(money.amount)
    return this.decimal.equals(other)
  }

  get currency() {
    return this.baseCurrency
  }

  toNumber() {
    return new Decimal(this.amount).toNumber()
  }

  toString() {
    return this.decimal.toString()
  }
}
