/**
 * Утилиты конвертации валют (UZS <-> USD)
 * По умолчанию курс: 1 USD = 12 800 UZS (может настраиваться через process.env.NEXT_PUBLIC_USD_TO_UZS_RATE)
 */

export const DEFAULT_USD_TO_UZS_RATE = Number(process.env.NEXT_PUBLIC_USD_TO_UZS_RATE) || 12800;

/**
 * Конвертирует сумы (UZS) в доллары (USD)
 */
export function uzsToUsd(uzsAmount: number, rate = DEFAULT_USD_TO_UZS_RATE): number {
  if (!uzsAmount || uzsAmount <= 0) return 0;
  return Number((uzsAmount / rate).toFixed(2));
}

/**
 * Конвертирует доллары (USD) в сумы (UZS)
 */
export function usdToUzs(usdAmount: number, rate = DEFAULT_USD_TO_UZS_RATE): number {
  if (!usdAmount || usdAmount <= 0) return 0;
  return Math.round(usdAmount * rate);
}

/**
 * Форматирует число в строку с валютой
 */
export function formatCurrency(amount: number, currency: 'UZS' | 'USD' = 'UZS'): string {
  if (currency === 'USD') {
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return `${Math.round(amount).toLocaleString('ru-RU')} сум`;
}
