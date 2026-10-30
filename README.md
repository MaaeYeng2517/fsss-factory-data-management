# fsss-factory-data-management

Manufacturing Management System (MMS) — on-premises factory management for discrete manufacturing (50–500 employees).

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
| Sales | quotations, sales orders, delivery notes, sales reps | ✅ |
| Finance | invoices, receipts, accounts, journal entries, payables, receivables, payments | ✅ |
| Analytics | production KPIs, financial reports | ✅ |
| Approvals | document approval workflow | ✅ |
| Audit | audit logs, internal audit | ✅ |
| UI | top menubar, full-width, footer | ✅ |

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

## Tech Stack
- Frontend: Next.js 16 (App Router) + TypeScript + Tailwind CSS
- Backend: Next.js API routes + Prisma ORM
- Database: MySQL
- Auth: session-based

## Setup
```bash
npm install
# configure .env DATABASE_URL
npx prisma db push
npm run dev
```
Open http://localhost:3000

## API
REST under `/api/*` with CRUD for all modules. Audit logs at `/api/audit-logs`.

## License
MIT
