export function generateId(): string {
  return Math.random().toString(36).substring(2, 15)
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat(en-US, {
    year: numeric,
    month: short,
    day: numeric,
  }).format(new Date(date))
}

export function formatNumber(num: number, decimals: number = 2): string {
  return num.toLocaleString(en-US, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

export function formatPercentage(num: number, decimals: number = 2): string {
  return (num * 100).toFixed(decimals) + %
}

export function calculateChange(current: number, previous: number): number {
  return ((current - previous) / previous) * 100
}

export function getSignalFromScore(score: number): bullish | bearish | neutral {
  if (score > 20) return bullish
  if (score < -20) return bearish
  return neutral
}

export function getSignalColor(score: number): string {
  if (score > 20) return text-success
  if (score < -20) return text-destructive
  return text-muted-foreground
}

export function getSignalBgColor(score: number): string {
  if (score > 20) return bg-success/10
  if (score < -20) return bg-destructive/10
  return bg-muted/10
}