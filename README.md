# FSSS — Raw Material Management System

ระบบจัดการสารดิบ (Raw Material Management System) สำหรับองค์กรอุตสาห Fitzgerald

## เทคโนโลยีที่ใช้

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Database:** PostgreSQL (ผ่าน Prisma) หรือใช้ JSON files สำหรับพัฒนา
- **Auth:** bcryptjs + custom auth
- **Runtime:** Node.js

## ฟีเจอร์หลัก

1. **จัดการพนักงาน (Employees)** — กำหนดข้อมูลพนักงาน แผนก ตำแหน่ง อัตราค่าจ้าง และสถานะ
2. **ตาราง.shift (Schedules)** — จัดพนักงานลงกะรายสัปดาห์ พร้อมแสดงเป็นตารางสี
3. **จัดการ-shift (Shifts)** — กำหนดรูปแบบ shift (เช้า/บ่าย/กลางคืน) เวลาเริ่ม-จบ และBreak time
4. **แลก-shift (Shift Swaps)** — ระบบที่允许พนักงานขอแลก shift กับเพื่อน พร้อมapprovals
5. **ค่าตอบแทน (Payroll)** — คำนวณเงินเดือนตามชั่วโมงจริง OT และ bonuses/deductions
6. **การเข้า-ออก (Attendance)** — บันทึกการ clock-in/out และชั่วโมงทำงาน
7. **การลาก (Leave Requests)** —  management of leave requests and leave types

## โครงสร้างฐานข้อมูล

### JSON Files (development)
- `data/employees.json` — ข้อมูลพนักงาน
- `data/schedules.json` — ตาราง shift
- `data/shifts.json` — รูปแบบ shift
- `data/shift-swaps.json` — คำขอแลก shift
- `data/payroll.json` — ข้อมูลค่าตอบแทน
- `data/attendance.json` — การเข้า-ออก

### Prisma Models (production)
- `Employee` — พนักงาน
- `Shift` — รูปแบบ shift
- `Schedule` — ตารางทำงาน
- `Attendance` — การเข้า-ออก
- `ShiftSwap` — คำขอแลก shift
- `Payroll` — ค่าตอบแทน
- `LeaveRequest` — การลาก
- `LeaveType` — ประเภทการลาก
- และอีกหลาย models สำหรับ raw materials, suppliers, purchase orders, goods receipts, stock count, sales, customers, accounts receivable/payable, quotations, products

## การเริ่มใช้งาน

```bash
# Development
npm run dev
# Production
npm run build && npm start
```

### Database Setup
- PostgreSQL: `docker-compose -f docker-compose.postgres.yml up -d`
- MySQL: `docker-compose up -d`
- Redis: port 6380
- Prometheus: port 9091
- Grafana: port 3003

## หน้า/screenหลัก

| Path | หน้าที่ |
|------|--------|
| `/` | หน้าแรก (Homepage) |
| `/dashboard` | dashboard |
| `/employees` | จัดการพนักงาน |
| `/schedules` | ตาราง shift |
| `/shifts` | จัดการ shift |
| `/shift-swap` | แลก shift |
| `/attendance` | การเข้า-ออก |
| `/payroll` | ค่าตอบแทน |
| `/import` | นำเข้าข้อมูล |
| `/raw-materials` | สารดิบ |
| `/raw-materials/materials` | วัตถุดิบ |
| `/raw-materials/suppliers` | ผู้ supplying |
| `/raw-materials/purchase-orders` | คำสั่งซื้อ |
| `/raw-materials/goods-receipts` | การรับของ |
| `/raw-materials/material-issues` | การออกวัตถุ |
| `/raw-materials/stock-count` | นับ stock |
| `/raw-materials/warehouses` | คลัง |

## การที่สำคัญ

- **Dark/Light Mode** — Dark mode support
- **Responsive** — tablet และ mobile friendly
- **Color-coded shifts** — shift เข้าสีต่างกัน
- **Store abstraction** — เปลี่ยนจาก JSON ไป Prisma ได้ง่าย
- **API routes** — RESTful API design

## การพัฒนาเพิ่มเติม

ดู docs/fss.md สำหรับรายละเอียดเพิ่มเติม# fsss-factory-data-management
