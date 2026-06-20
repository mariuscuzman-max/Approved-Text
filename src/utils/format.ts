import type { BigNumberSource } from './bigNumber.ts';
import { formatMeaning, formatRate } from './bigNumber.ts';

export { formatMeaning, formatRate };

export function formatNumber(value: BigNumberSource): string {
  return formatMeaning(value);
}
