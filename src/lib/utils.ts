export function formatDate(date: string | Date) {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toISOString().split('T')[0];
}

export function calculateHours(clockIn?: string, clockOut?: string) {
  if (!clockIn || !clockOut) return 0;
  const start = new Date(clockIn);
  const end = new Date(clockOut);
  const diffMs = end.getTime() - start.getTime();
  if (diffMs <= 0) return 0;
  return Math.round((diffMs / (1000 * 60 * 60)) * 100) / 100;
}

export function calcPayroll(hours: number, rate: number, overtimeHours = 0, overtimeRate = 1.5, deductions = 0, bonuses = 0) {
  const basePay = Math.max(0, hours - overtimeHours) * rate;
  const otPay = overtimeHours * rate * overtimeRate;
  const netPay = basePay + otPay + bonuses - deductions;
  return {
    basePay: Math.round(basePay * 100) / 100,
    overtimePay: Math.round(otPay * 100) / 100,
    netPay: Math.round(netPay * 100) / 100,
  };
}
