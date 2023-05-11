const units = ['', 'K', 'M', 'B', 'T', 'Q']
const maxUnitIndex = units.length - 1

export default function formatNumber(num: number, unitIndex = 0): string {
  if (num < 1000 || unitIndex === maxUnitIndex)
    return num.toFixed(Number(Boolean(unitIndex))) + units[unitIndex]
  return formatNumber(num / 1000, unitIndex + 1)
}
