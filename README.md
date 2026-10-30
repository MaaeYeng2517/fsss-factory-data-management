# fsss-factory-data-management

## สรุปฟีเจอร์

| โมดูล | ฟีเจอร์ | สถานะ |
|---|---|---|
| Master Data | materials, products, suppliers, customers, warehouses, categories | ✅ |
| Procurement | purchase orders, goods receipts | ✅ |
| WMS | inventory balances, transactions, stock count | ✅ |
| Production | production orders CRUD, status, search, detail view | ✅ |
| QMS | quality inspections | ✅ |
| Maintenance | maintenance requests | ✅ |
| HR/Shift | employees, shifts, schedules, attendance, leave, payroll | ✅ |
| Sales | quotations, sales orders, delivery notes | ✅ |
| Finance | invoices, receipts, accounts, journal entries, payables, receivables, payments | ✅ |
| Analytics | production KPIs, financial reports | ✅ |
| Approvals | document approval workflow | ✅ |
| Audit | audit logs | ✅ |
| UI | top menubar, full-width, footer, collapsible | ✅ |


## ไดอะแกรมการทำงาน

```mermaid
flowchart LR
  SO[Sales Order] --> PLAN[Planning/MRP]
  PLAN --> PO[Purchase Order]
  PO --> RECV[Receive]
  RECV --> QC[QC]
  QC --> INV[Release to Inventory]
  INV --> SCHED[Scheduling]
  SCHED --> WO[Work Order]
  WO --> ISSUE[Issue Materials]
  ISSUE --> ROUTE[Routing]
  ROUTE --> OUT[Output/Scrap]
  OUT --> FQC[Final QC]
  FQC --> FG[FG Warehouse]
  FG --> DEL[Delivery]
  DEL --> FIN[Finance/Costing]
  FIN --> AN[Analytics]
```


FSSS — Factory Management System



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
4. **แลก-shift (Shift Swaps)** — ระบบพนักงานขอแลก shift กับเพื่อน พร้อมapprovals
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
