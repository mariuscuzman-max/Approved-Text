import Decimal from 'break_infinity.js';
import type { DecimalSource } from 'break_infinity.js';

export type BigNumber = Decimal;
export type BigNumberSource = DecimalSource;

export function isDecimal(value: unknown): value is BigNumber {
  return value instanceof Decimal;
}

export function toDecimal(value: BigNumberSource | null | undefined): BigNumber {
  if (value === null || value === undefined) {
    return new Decimal(0);
  }

  return Decimal.fromValue(value);
}

export function add(a: BigNumberSource, b: BigNumberSource): BigNumber {
  return Decimal.add(a, b);
}

export function sub(a: BigNumberSource, b: BigNumberSource): BigNumber {
  return Decimal.sub(a, b);
}

export function mul(a: BigNumberSource, b: BigNumberSource): BigNumber {
  return Decimal.mul(a, b);
}

export function div(a: BigNumberSource, b: BigNumberSource): BigNumber {
  return Decimal.div(a, b);
}

export function pow(a: BigNumberSource, b: number | BigNumber): BigNumber {
  return Decimal.pow(a, b);
}

export function gt(a: BigNumberSource, b: BigNumberSource): boolean {
  return Decimal.gt(a, b);
}

export function gte(a: BigNumberSource, b: BigNumberSource): boolean {
  return Decimal.gte(a, b);
}

export function lt(a: BigNumberSource, b: BigNumberSource): boolean {
  return Decimal.lt(a, b);
}

export function lte(a: BigNumberSource, b: BigNumberSource): boolean {
  return Decimal.lte(a, b);
}

export function eq(a: BigNumberSource, b: BigNumberSource): boolean {
  return Decimal.eq(a, b);
}

export function max(a: BigNumberSource, b: BigNumberSource): BigNumber {
  return Decimal.max(a, b);
}

export function min(a: BigNumberSource, b: BigNumberSource): BigNumber {
  return Decimal.min(a, b);
}

function formatCompact(value: BigNumberSource, decimalPlaces: number): string {
  const decimal = toDecimal(value);
  const absolute = Decimal.abs(decimal);

  if (absolute.lt(1000)) {
    return decimal.toFixed(decimalPlaces);
  }

  if (absolute.lt(1e6)) {
    return `${decimal.div(1e3).toFixed(2)}K`;
  }

  if (absolute.lt(1e9)) {
    return `${decimal.div(1e6).toFixed(2)}M`;
  }

  return decimal.toExponential(2).replace('e+', 'e');
}

export function formatMeaning(value: BigNumberSource): string {
  return formatCompact(value, 2);
}

export function formatRate(value: BigNumberSource): string {
  return formatCompact(value, 3);
}

export function serializeBigNumber(value: BigNumberSource): string {
  return toDecimal(value).toString();
}
