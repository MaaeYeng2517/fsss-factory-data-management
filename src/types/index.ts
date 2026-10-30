export type Role = 'admin' | 'manager' | 'employee';

export interface Employee {
  id: string;
  employeeCode: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  role: Role;
  department?: string;
  hireDate: string;
  active: boolean;
  hourlyRate?: number; // สำหรับระบบค่าตอบแทน
}

export interface Shift {
  id: string;
  name: string;
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  breakMinutes?: number;
  color?: string;
}

export interface Schedule {
  id: string;
  employeeId: string;
  shiftId: string;
  date: string; // YYYY-MM-DD
  note?: string;
}

export interface Attendance {
  id: string;
  employeeId: string;
  date: string; // YYYY-MM-DD
  clockIn?: string; // ISO
  clockOut?: string; // ISO
  status: string;
  hoursWorked?: number;
  note?: string;
}

export interface ShiftSwap {
  id: string;
  requesterId: string;
  receiverId?: string;
  fromScheduleId: string;
  toScheduleId?: string;
  desiredDate?: string;
  reason: string;
  status: string;
  createdAt: string;
  reviewedAt?: string;
  reviewerId?: string;
}

export interface Payroll {
  id: string;
  employeeId: string;
  periodStart: string;
  periodEnd: string;
  totalHours: number;
  overtimeHours: number;
  hourlyRate: number;
  basePay: number;
  overtimePay: number;
  deductions: number;
  bonuses: number;
  netPay: number;
  status: string;
  generatedAt: string;
}
