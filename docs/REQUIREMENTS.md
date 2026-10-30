# Requirements Specification (MMS)

Source: Master Prompt — Manufacturing Management System (Discrete Manufacturing, 50–500 staff, on-prem).

## Modules (M01–M22)
Identity/RBAC, Organization/Factory, Master Data, Sales & Orders, BOM/Engineering, MRP/Demand Planning, Production Planning & Scheduling, Production Orders, MES/Shop Floor, WMS/Inventory, Procurement, QMS, Maintenance, Traceability/Recall, Costing, Delivery/FG, Dashboard/BI/Reporting, Workflow/Approval, Notification/Tasks, Integration Hub, Audit/Governance, System Admin.

## Non-functional
Security (RBAC server-side, audit log, no secrets in logs), on-prem Docker Compose, MySQL, backup/restore, observability, i18n (th/en), timezones.

## Acceptance
Build, migration, tests, deployment, UAT must pass. No claim of completion without evidence.

## Stack divergence note
Current repo: Next.js 16 + Prisma + SQLite. Master Prompt target: Laravel 13 + MySQL 8.4 + React/Vite. Decision pending (see IMPLEMENTATION_STATUS.md).
