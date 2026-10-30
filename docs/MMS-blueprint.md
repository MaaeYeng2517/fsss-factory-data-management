# Manufacturing Management System (MMS) — Architecture Blueprint

Source: user-provided design spec (Thai). See conversation for full content.

## Stack
- Frontend: Next.js + TypeScript
- Backend: Laravel (Business API)
- DB: PostgreSQL (transactional), separate analytics mart
- Jobs: Laravel Queue + Redis
- Storage: MinIO/S3-compatible (on-prem)
- Auth: Keycloak / self-hosted IdP
- Proxy: Nginx
- Deploy: Docker Compose (initial)
- Monitoring: Prometheus + Grafana
- OT Gateway: OPC UA / MQTT

## Modules (10)
ERP/Master Data, Procurement, WMS, Production Planning, MES, QMS, HR/Shift, Maintenance/CMMS, Sales/Delivery, Finance/Analytics.

## Key business rules
1. No over-issue of materials without special approval.
2. Uninspected materials quarantined, not usable in production.
3. Production start requires materials + machine + workforce readiness.
4. Output recording requires WO, operation, good qty, scrap qty, operator.
5. Uninspected finished goods cannot be shipped.
6. Approved/closed docs editable only via reversal/adjustment docs.
7. Every stock movement needs source doc, actor, time, reason.
8. Costing separates material/labor/overhead; inventory valuation method defined.

## Workflow
Sales Order → Planning/MRP → Purchase Requisition/PO → Receive → IQC → Release to inventory → Scheduling → Work Order → Issue materials → Routing execution → Output/scrap recording → In-process/Final QC → FG warehouse → Delivery → Finance/Costing → Analytics/KPI.

## DB
See `/prisma/schema.prisma` (to be extended) and SQL in blueprint. Core tables: departments, employees, units, products, materials, bom_headers, bom_lines, suppliers, purchase_orders, purchase_order_lines, warehouses, material_lots, inventory_balances, inventory_transactions, customers, sales_orders, sales_order_lines, work_orders, work_order_operations, production_outputs, quality_inspections, audit_logs.

## RBAC roles
System Admin, Executive, Procurement Officer, Warehouse Officer, Production Planner, Production Operator, Quality Inspector, Maintenance Technician, HR Officer, Accountant, Auditor. SoD enforced (creator ≠ approver).

## Roadmap (8 phases)
0 Explore/Design → 1 Core Platform & Master Data → 2 Procurement & WMS → 3 Planning & MES → 4 QMS & Maintenance → 5 HR & Workforce → 6 Sales & Finance → 7 Analytics, Integration & Go-live.

## Next steps
Implement Phase 1 in this repo: auth, RBAC, organization, products, materials, suppliers, audit. Migrate from JSON file storage to PostgreSQL via Prisma.
