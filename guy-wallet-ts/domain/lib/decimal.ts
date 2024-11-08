import FloatingPoint from 'decimal.js';

/**
 * Decimal class to handle decimal operations
 */
export class Decimal {
  value: FloatingPoint;

  constructor(n: number | string | Decimal) {
    const argument = n instanceof Decimal ? n.value : n;
    this.value = new FloatingPoint(argument).toDecimalPlaces(2);
  }

  /**
   * Add two decimals
   * @param other 
   * @returns
   */
  plus(other: Decimal) {
    return this.value.plus(other.value);
  }

  /**
   * Subtract two decimals
   * @param other
   * @returns
   */
  minus(other: Decimal) {
    return this.value.minus(other.value);
  }

  /**
   * Multiply two decimals
   * @param other
   * @returns
   */
  times(other: Decimal) {
    return this.value.mul(other.value);
  }

  /**
   * Divide two decimals
   * @param other
   * @returns
   */
  dividedBy(other: Decimal) {
    return this.value.div(other.value);
  }

  /**
   * Modulo of two decimals
   * @param other
   * @returns
   */
  mod(other: Decimal) {
    return this.value.mod(other.value);
  }

  /**
   * Negate the decimal
   * @returns
   */
  negate() {
    return this.value.neg();
  }

  equals(other: Decimal) {
    return this.value.eq(other.value);
  }

  lessThan(other: Decimal) {
    return this.value.lt(other.value);
  }

  greaterThan(other: Decimal) {
    return this.value.gt(other.value);
  }

  lessThanOrEqualTo(other: Decimal) {
    return this.value.lte(other.value);
  }

  greaterThanOrEqualTo(other: Decimal) {
    return this.value.gte(other.value);
  }

  /**
   * Format the decimal to a fixed number of decimals
   * @param other
   * @returns
   */
  toFixed(n: number) {
    return this.value.toFixed(n);
  }

  /**
   * Get the decimal as a number
   * @param other
   * @returns
   */
  toNumber() {
    return this.value.toNumber();
  }

  /**
   * Get the decimal as a string
   * @param other
   * @returns
   */
  toString() {
    return this.value.toString();
  }

  /**
   * Get the parts of the decimal
   * @returns [sign, digits, decimal, exponent]
   */
  getParts() {
    const sign = this.value.s;
    const [digits, decimal] = this.value.d;
    const exponent = this.value.e;
    return [sign, digits, decimal, exponent];
  }

  format() {
    return this.value.toNumber().toLocaleString('en-US', {
      minimumFractionDigits: 2,
    });
  }
}