export function formatMeaning(value: number): string {
  return value.toFixed(2);
}

export function formatRate(value: number): string {
  return value.toFixed(3);
}

export function formatNumber(value: number): string {
  return formatMeaning(value);
}
