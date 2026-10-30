-- CreateTable
CREATE TABLE `MaterialCategory` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `MaterialCategory_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Supplier` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `contactPerson` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `taxId` VARCHAR(191) NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Supplier_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Warehouse` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Warehouse_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StorageLocation` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `warehouseId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `aisle` VARCHAR(191) NULL,
    `rack` VARCHAR(191) NULL,
    `bin` VARCHAR(191) NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `StorageLocation_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Material` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `categoryId` VARCHAR(191) NULL,
    `unit` VARCHAR(191) NOT NULL DEFAULT 'กก.',
    `description` VARCHAR(191) NULL,
    `specifications` VARCHAR(191) NULL,
    `standardPrice` DOUBLE NOT NULL DEFAULT 0,
    `minStock` DOUBLE NOT NULL DEFAULT 0,
    `maxStock` DOUBLE NOT NULL DEFAULT 0,
    `reorderPoint` DOUBLE NOT NULL DEFAULT 0,
    `leadTimeDays` INTEGER NOT NULL DEFAULT 0,
    `shelfLifeDays` INTEGER NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Material_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PurchaseOrder` (
    `id` VARCHAR(191) NOT NULL,
    `poNumber` VARCHAR(191) NOT NULL,
    `supplierId` VARCHAR(191) NOT NULL,
    `orderDate` VARCHAR(191) NOT NULL,
    `expectedDate` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'pending',
    `totalAmount` DOUBLE NOT NULL DEFAULT 0,
    `notes` VARCHAR(191) NULL,
    `requestedBy` VARCHAR(191) NULL,
    `approvedBy` VARCHAR(191) NULL,
    `approvedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PurchaseOrder_poNumber_key`(`poNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PurchaseOrderItem` (
    `id` VARCHAR(191) NOT NULL,
    `purchaseOrderId` VARCHAR(191) NOT NULL,
    `materialId` VARCHAR(191) NOT NULL,
    `quantity` DOUBLE NOT NULL,
    `unitPrice` DOUBLE NOT NULL,
    `totalPrice` DOUBLE NOT NULL,
    `receivedQty` DOUBLE NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GoodsReceipt` (
    `id` VARCHAR(191) NOT NULL,
    `grNumber` VARCHAR(191) NOT NULL,
    `purchaseOrderId` VARCHAR(191) NULL,
    `supplierId` VARCHAR(191) NOT NULL,
    `warehouseId` VARCHAR(191) NOT NULL,
    `receiptDate` VARCHAR(191) NOT NULL,
    `deliveryNote` VARCHAR(191) NULL,
    `invoiceNo` VARCHAR(191) NULL,
    `receivedBy` VARCHAR(191) NULL,
    `inspectedBy` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'pending',
    `notes` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `GoodsReceipt_grNumber_key`(`grNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GoodsReceiptItem` (
    `id` VARCHAR(191) NOT NULL,
    `goodsReceiptId` VARCHAR(191) NOT NULL,
    `materialId` VARCHAR(191) NOT NULL,
    `quantity` DOUBLE NOT NULL,
    `unitPrice` DOUBLE NOT NULL,
    `totalPrice` DOUBLE NOT NULL,
    `lotNumber` VARCHAR(191) NULL,
    `expiryDate` VARCHAR(191) NULL,
    `inspected` BOOLEAN NOT NULL DEFAULT false,
    `passed` BOOLEAN NULL,
    `inspectionNotes` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MaterialLot` (
    `id` VARCHAR(191) NOT NULL,
    `lotNumber` VARCHAR(191) NOT NULL,
    `materialId` VARCHAR(191) NOT NULL,
    `goodsReceiptId` VARCHAR(191) NULL,
    `quantityReceived` DOUBLE NOT NULL,
    `quantityRemaining` DOUBLE NOT NULL,
    `manufactureDate` VARCHAR(191) NULL,
    `expiryDate` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'available',
    `inspectionStatus` VARCHAR(191) NOT NULL DEFAULT 'pending',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `MaterialLot_materialId_lotNumber_key`(`materialId`, `lotNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InventoryBalance` (
    `id` VARCHAR(191) NOT NULL,
    `materialId` VARCHAR(191) NOT NULL,
    `warehouseId` VARCHAR(191) NOT NULL,
    `storageLocationId` VARCHAR(191) NULL,
    `materialLotId` VARCHAR(191) NULL,
    `quantity` DOUBLE NOT NULL DEFAULT 0,
    `reservedQuantity` DOUBLE NOT NULL DEFAULT 0,
    `availableQuantity` DOUBLE NOT NULL DEFAULT 0,
    `lastUpdated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `InventoryBalance_materialId_warehouseId_storageLocationId_ma_key`(`materialId`, `warehouseId`, `storageLocationId`, `materialLotId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InventoryTransaction` (
    `id` VARCHAR(191) NOT NULL,
    `transactionNo` VARCHAR(191) NOT NULL,
    `materialId` VARCHAR(191) NOT NULL,
    `materialLotId` VARCHAR(191) NULL,
    `transactionType` VARCHAR(191) NOT NULL,
    `quantity` DOUBLE NOT NULL,
    `unitPrice` DOUBLE NOT NULL DEFAULT 0,
    `referenceType` VARCHAR(191) NULL,
    `referenceId` VARCHAR(191) NULL,
    `fromWarehouseId` VARCHAR(191) NULL,
    `toWarehouseId` VARCHAR(191) NULL,
    `performedBy` VARCHAR(191) NULL,
    `approvedBy` VARCHAR(191) NULL,
    `reason` VARCHAR(191) NULL,
    `notes` VARCHAR(191) NULL,
    `transactionDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `InventoryTransaction_transactionNo_key`(`transactionNo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductionOrder` (
    `id` VARCHAR(191) NOT NULL,
    `moNumber` VARCHAR(191) NOT NULL,
    `productName` VARCHAR(191) NOT NULL,
    `quantity` DOUBLE NOT NULL,
    `startDate` VARCHAR(191) NULL,
    `dueDate` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'pending',
    `requestedBy` VARCHAR(191) NULL,
    `approvedBy` VARCHAR(191) NULL,
    `notes` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ProductionOrder_moNumber_key`(`moNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BillOfMaterial` (
    `id` VARCHAR(191) NOT NULL,
    `productionOrderId` VARCHAR(191) NOT NULL,
    `materialId` VARCHAR(191) NOT NULL,
    `requiredQuantity` DOUBLE NOT NULL,
    `unit` VARCHAR(191) NOT NULL,
    `notes` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MaterialIssue` (
    `id` VARCHAR(191) NOT NULL,
    `miNumber` VARCHAR(191) NOT NULL,
    `productionOrderId` VARCHAR(191) NULL,
    `warehouseId` VARCHAR(191) NOT NULL,
    `issueDate` VARCHAR(191) NOT NULL,
    `requestedBy` VARCHAR(191) NULL,
    `issuedBy` VARCHAR(191) NULL,
    `approvedBy` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'pending',
    `notes` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `MaterialIssue_miNumber_key`(`miNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MaterialIssueItem` (
    `id` VARCHAR(191) NOT NULL,
    `materialIssueId` VARCHAR(191) NOT NULL,
    `materialId` VARCHAR(191) NOT NULL,
    `quantity` DOUBLE NOT NULL,
    `issuedQuantity` DOUBLE NOT NULL DEFAULT 0,
    `notes` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StockCount` (
    `id` VARCHAR(191) NOT NULL,
    `scNumber` VARCHAR(191) NOT NULL,
    `warehouseId` VARCHAR(191) NOT NULL,
    `countDate` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'draft',
    `countedBy` VARCHAR(191) NULL,
    `approvedBy` VARCHAR(191) NULL,
    `approvedAt` DATETIME(3) NULL,
    `notes` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `StockCount_scNumber_key`(`scNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StockCountItem` (
    `id` VARCHAR(191) NOT NULL,
    `stockCountId` VARCHAR(191) NOT NULL,
    `materialCode` VARCHAR(191) NOT NULL,
    `materialName` VARCHAR(191) NOT NULL,
    `systemQuantity` DOUBLE NOT NULL,
    `countedQuantity` DOUBLE NOT NULL,
    `difference` DOUBLE NOT NULL DEFAULT 0,
    `reason` VARCHAR(191) NULL,
    `adjusted` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AuditLog` (
    `id` VARCHAR(191) NOT NULL,
    `action` VARCHAR(191) NOT NULL,
    `entity` VARCHAR(191) NOT NULL,
    `entityId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NULL,
    `userName` VARCHAR(191) NULL,
    `oldValues` VARCHAR(191) NULL,
    `newValues` VARCHAR(191) NULL,
    `ipAddress` VARCHAR(191) NULL,
    `userAgent` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `passwordHash` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `role` ENUM('EXECUTIVE', 'DIVISION_HEAD', 'DEPT_HEAD', 'SUPERVISOR', 'OPERATOR', 'GENERAL_WORKER', 'ADMIN') NOT NULL DEFAULT 'GENERAL_WORKER',
    `department` VARCHAR(191) NULL,
    `division` VARCHAR(191) NULL,
    `employeeId` VARCHAR(191) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `lastLoginAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_employeeId_key`(`employeeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Employee` (
    `id` VARCHAR(191) NOT NULL,
    `employeeCode` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'employee',
    `department` VARCHAR(191) NULL,
    `division` VARCHAR(191) NULL,
    `hireDate` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `hourlyRate` DOUBLE NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Employee_employeeCode_key`(`employeeCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Shift` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `startTime` VARCHAR(191) NOT NULL,
    `endTime` VARCHAR(191) NOT NULL,
    `breakMinutes` INTEGER NOT NULL DEFAULT 0,
    `color` VARCHAR(191) NOT NULL DEFAULT '#6b7280',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Schedule` (
    `id` VARCHAR(191) NOT NULL,
    `employeeId` VARCHAR(191) NOT NULL,
    `shiftId` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `note` VARCHAR(191) NULL,

    INDEX `Schedule_employeeId_date_idx`(`employeeId`, `date`),
    INDEX `Schedule_shiftId_date_idx`(`shiftId`, `date`),
    UNIQUE INDEX `Schedule_employeeId_date_key`(`employeeId`, `date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Attendance` (
    `id` VARCHAR(191) NOT NULL,
    `employeeId` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `clockIn` DATETIME(3) NULL,
    `clockOut` DATETIME(3) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'present',
    `hoursWorked` DOUBLE NOT NULL DEFAULT 0,
    `note` VARCHAR(191) NULL,

    INDEX `Attendance_employeeId_date_idx`(`employeeId`, `date`),
    UNIQUE INDEX `Attendance_employeeId_date_key`(`employeeId`, `date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ShiftSwap` (
    `id` VARCHAR(191) NOT NULL,
    `requesterId` VARCHAR(191) NOT NULL,
    `receiverId` VARCHAR(191) NULL,
    `fromScheduleId` VARCHAR(191) NULL,
    `toScheduleId` VARCHAR(191) NULL,
    `desiredDate` VARCHAR(191) NULL,
    `reason` VARCHAR(191) NOT NULL DEFAULT '',
    `status` VARCHAR(191) NOT NULL DEFAULT 'pending',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `reviewedAt` DATETIME(3) NULL,
    `reviewerId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payroll` (
    `id` VARCHAR(191) NOT NULL,
    `employeeId` VARCHAR(191) NOT NULL,
    `periodStart` DATETIME(3) NOT NULL,
    `periodEnd` DATETIME(3) NOT NULL,
    `totalHours` DOUBLE NOT NULL DEFAULT 0,
    `overtimeHours` DOUBLE NOT NULL DEFAULT 0,
    `hourlyRate` DOUBLE NOT NULL,
    `basePay` DOUBLE NOT NULL,
    `overtimePay` DOUBLE NOT NULL,
    `deductions` DOUBLE NOT NULL DEFAULT 0,
    `bonuses` DOUBLE NOT NULL DEFAULT 0,
    `netPay` DOUBLE NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'draft',
    `generatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Payroll_employeeId_idx`(`employeeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CustomerCategory` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `CustomerCategory_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Customer` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `nameEn` VARCHAR(191) NULL,
    `categoryId` VARCHAR(191) NULL,
    `customerType` VARCHAR(191) NOT NULL DEFAULT 'domestic',
    `contactPerson` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `fax` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `addressEn` VARCHAR(191) NULL,
    `taxId` VARCHAR(191) NULL,
    `country` VARCHAR(191) NOT NULL DEFAULT 'TH',
    `currency` VARCHAR(191) NOT NULL DEFAULT 'THB',
    `creditLimit` DOUBLE NOT NULL DEFAULT 0,
    `creditTermDays` INTEGER NOT NULL DEFAULT 0,
    `paymentMethod` VARCHAR(191) NULL,
    `shippingAddress` VARCHAR(191) NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `notes` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Customer_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Quotation` (
    `id` VARCHAR(191) NOT NULL,
    `qtNumber` VARCHAR(191) NOT NULL,
    `customerId` VARCHAR(191) NOT NULL,
    `quoteDate` VARCHAR(191) NOT NULL,
    `validUntil` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'draft',
    `currency` VARCHAR(191) NOT NULL DEFAULT 'THB',
    `exchangeRate` DOUBLE NOT NULL DEFAULT 1,
    `subtotal` DOUBLE NOT NULL DEFAULT 0,
    `discountAmount` DOUBLE NOT NULL DEFAULT 0,
    `vatAmount` DOUBLE NOT NULL DEFAULT 0,
    `totalAmount` DOUBLE NOT NULL DEFAULT 0,
    `deliveryTerm` VARCHAR(191) NULL,
    `paymentTerm` VARCHAR(191) NULL,
    `notes` VARCHAR(191) NULL,
    `terms` VARCHAR(191) NULL,
    `preparedBy` VARCHAR(191) NULL,
    `approvedBy` VARCHAR(191) NULL,
    `approvedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Quotation_qtNumber_key`(`qtNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `QuotationItem` (
    `id` VARCHAR(191) NOT NULL,
    `quotationId` VARCHAR(191) NOT NULL,
    `productCode` VARCHAR(191) NOT NULL,
    `productName` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `quantity` DOUBLE NOT NULL,
    `unit` VARCHAR(191) NOT NULL DEFAULT 'ชิ้น',
    `unitPrice` DOUBLE NOT NULL,
    `discount` DOUBLE NOT NULL DEFAULT 0,
    `totalPrice` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SalesOrder` (
    `id` VARCHAR(191) NOT NULL,
    `soNumber` VARCHAR(191) NOT NULL,
    `quotationId` VARCHAR(191) NULL,
    `customerId` VARCHAR(191) NOT NULL,
    `orderDate` VARCHAR(191) NOT NULL,
    `deliveryDate` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'pending',
    `currency` VARCHAR(191) NOT NULL DEFAULT 'THB',
    `exchangeRate` DOUBLE NOT NULL DEFAULT 1,
    `subtotal` DOUBLE NOT NULL DEFAULT 0,
    `discountAmount` DOUBLE NOT NULL DEFAULT 0,
    `vatAmount` DOUBLE NOT NULL DEFAULT 0,
    `totalAmount` DOUBLE NOT NULL DEFAULT 0,
    `deliveryAddress` VARCHAR(191) NULL,
    `deliveryTerm` VARCHAR(191) NULL,
    `paymentTerm` VARCHAR(191) NULL,
    `notes` VARCHAR(191) NULL,
    `requestedBy` VARCHAR(191) NULL,
    `approvedBy` VARCHAR(191) NULL,
    `approvedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `SalesOrder_soNumber_key`(`soNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SalesOrderItem` (
    `id` VARCHAR(191) NOT NULL,
    `salesOrderId` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NULL,
    `productCode` VARCHAR(191) NOT NULL,
    `productName` VARCHAR(191) NOT NULL,
    `quantity` DOUBLE NOT NULL,
    `unit` VARCHAR(191) NOT NULL DEFAULT 'ชิ้น',
    `unitPrice` DOUBLE NOT NULL,
    `discount` DOUBLE NOT NULL DEFAULT 0,
    `totalPrice` DOUBLE NOT NULL,
    `deliveredQty` DOUBLE NOT NULL DEFAULT 0,
    `invoicedQty` DOUBLE NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DeliveryNote` (
    `id` VARCHAR(191) NOT NULL,
    `dnNumber` VARCHAR(191) NOT NULL,
    `salesOrderId` VARCHAR(191) NULL,
    `customerId` VARCHAR(191) NOT NULL,
    `deliveryDate` VARCHAR(191) NOT NULL,
    `deliveryAddress` VARCHAR(191) NULL,
    `deliveredBy` VARCHAR(191) NULL,
    `receivedBy` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'pending',
    `notes` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `DeliveryNote_dnNumber_key`(`dnNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DeliveryNoteItem` (
    `id` VARCHAR(191) NOT NULL,
    `deliveryNoteId` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NULL,
    `productCode` VARCHAR(191) NOT NULL,
    `productName` VARCHAR(191) NOT NULL,
    `quantity` DOUBLE NOT NULL,
    `unit` VARCHAR(191) NOT NULL DEFAULT 'ชิ้น',
    `lotNumber` VARCHAR(191) NULL,
    `notes` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SalesInvoice` (
    `id` VARCHAR(191) NOT NULL,
    `invNumber` VARCHAR(191) NOT NULL,
    `salesOrderId` VARCHAR(191) NULL,
    `deliveryNoteId` VARCHAR(191) NULL,
    `customerId` VARCHAR(191) NOT NULL,
    `invoiceDate` VARCHAR(191) NOT NULL,
    `dueDate` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'unpaid',
    `currency` VARCHAR(191) NOT NULL DEFAULT 'THB',
    `exchangeRate` DOUBLE NOT NULL DEFAULT 1,
    `subtotal` DOUBLE NOT NULL DEFAULT 0,
    `discountAmount` DOUBLE NOT NULL DEFAULT 0,
    `vatRate` DOUBLE NOT NULL DEFAULT 7,
    `vatAmount` DOUBLE NOT NULL DEFAULT 0,
    `totalAmount` DOUBLE NOT NULL DEFAULT 0,
    `paidAmount` DOUBLE NOT NULL DEFAULT 0,
    `balanceAmount` DOUBLE NOT NULL DEFAULT 0,
    `taxInvoiceNo` VARCHAR(191) NULL,
    `notes` VARCHAR(191) NULL,
    `preparedBy` VARCHAR(191) NULL,
    `approvedBy` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `SalesInvoice_invNumber_key`(`invNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SalesInvoiceItem` (
    `id` VARCHAR(191) NOT NULL,
    `salesInvoiceId` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NULL,
    `productCode` VARCHAR(191) NOT NULL,
    `productName` VARCHAR(191) NOT NULL,
    `quantity` DOUBLE NOT NULL,
    `unit` VARCHAR(191) NOT NULL DEFAULT 'ชิ้น',
    `unitPrice` DOUBLE NOT NULL,
    `discount` DOUBLE NOT NULL DEFAULT 0,
    `totalPrice` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SalesReceipt` (
    `id` VARCHAR(191) NOT NULL,
    `receiptNumber` VARCHAR(191) NOT NULL,
    `customerId` VARCHAR(191) NOT NULL,
    `receiptDate` VARCHAR(191) NOT NULL,
    `paymentMethod` VARCHAR(191) NOT NULL DEFAULT 'cash',
    `bankAccountId` VARCHAR(191) NULL,
    `referenceNo` VARCHAR(191) NULL,
    `totalAmount` DOUBLE NOT NULL DEFAULT 0,
    `receivedBy` VARCHAR(191) NULL,
    `notes` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'posted',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `SalesReceipt_receiptNumber_key`(`receiptNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SalesReceiptItem` (
    `id` VARCHAR(191) NOT NULL,
    `salesReceiptId` VARCHAR(191) NOT NULL,
    `salesInvoiceId` VARCHAR(191) NOT NULL,
    `amountPaid` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductCategory` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ProductCategory_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `nameEn` VARCHAR(191) NULL,
    `categoryId` VARCHAR(191) NULL,
    `unit` VARCHAR(191) NOT NULL DEFAULT 'ชิ้น',
    `barcode` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `specifications` VARCHAR(191) NULL,
    `standardCost` DOUBLE NOT NULL DEFAULT 0,
    `sellingPrice` DOUBLE NOT NULL DEFAULT 0,
    `minStock` DOUBLE NOT NULL DEFAULT 0,
    `maxStock` DOUBLE NOT NULL DEFAULT 0,
    `reorderPoint` DOUBLE NOT NULL DEFAULT 0,
    `shelfLifeDays` INTEGER NULL,
    `isSellable` BOOLEAN NOT NULL DEFAULT true,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Product_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductLot` (
    `id` VARCHAR(191) NOT NULL,
    `lotNumber` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `productionReceiptId` VARCHAR(191) NULL,
    `quantityReceived` DOUBLE NOT NULL,
    `quantityRemaining` DOUBLE NOT NULL,
    `manufactureDate` VARCHAR(191) NULL,
    `expiryDate` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'available',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ProductLot_productId_lotNumber_key`(`productId`, `lotNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WarehouseLocationRef` (
    `id` VARCHAR(191) NOT NULL,
    `note` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FinishedGoodsBalance` (
    `id` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `warehouseId` VARCHAR(191) NOT NULL,
    `storageLocationId` VARCHAR(191) NULL,
    `productLotId` VARCHAR(191) NULL,
    `quantity` DOUBLE NOT NULL DEFAULT 0,
    `reservedQuantity` DOUBLE NOT NULL DEFAULT 0,
    `availableQuantity` DOUBLE NOT NULL DEFAULT 0,
    `lastUpdated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `FinishedGoodsBalance_productId_warehouseId_storageLocationId_key`(`productId`, `warehouseId`, `storageLocationId`, `productLotId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FinishedGoodsTransaction` (
    `id` VARCHAR(191) NOT NULL,
    `transactionNo` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `productLotId` VARCHAR(191) NULL,
    `transactionType` VARCHAR(191) NOT NULL,
    `quantity` DOUBLE NOT NULL,
    `unitPrice` DOUBLE NOT NULL DEFAULT 0,
    `referenceType` VARCHAR(191) NULL,
    `referenceId` VARCHAR(191) NULL,
    `fromWarehouseId` VARCHAR(191) NULL,
    `toWarehouseId` VARCHAR(191) NULL,
    `performedBy` VARCHAR(191) NULL,
    `approvedBy` VARCHAR(191) NULL,
    `reason` VARCHAR(191) NULL,
    `notes` VARCHAR(191) NULL,
    `transactionDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `FinishedGoodsTransaction_transactionNo_key`(`transactionNo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductionReceipt` (
    `id` VARCHAR(191) NOT NULL,
    `prNumber` VARCHAR(191) NOT NULL,
    `productionOrderId` VARCHAR(191) NULL,
    `warehouseId` VARCHAR(191) NOT NULL,
    `receiptDate` VARCHAR(191) NOT NULL,
    `receivedBy` VARCHAR(191) NULL,
    `inspectedBy` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'pending',
    `notes` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ProductionReceipt_prNumber_key`(`prNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductionReceiptItem` (
    `id` VARCHAR(191) NOT NULL,
    `productionReceiptId` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `quantity` DOUBLE NOT NULL,
    `lotNumber` VARCHAR(191) NULL,
    `manufactureDate` VARCHAR(191) NULL,
    `expiryDate` VARCHAR(191) NULL,
    `notes` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Account` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `nameEn` VARCHAR(191) NULL,
    `accountType` VARCHAR(191) NOT NULL,
    `accountGroup` VARCHAR(191) NULL,
    `parentId` VARCHAR(191) NULL,
    `normalBalance` VARCHAR(191) NOT NULL DEFAULT 'DEBIT',
    `level` INTEGER NOT NULL DEFAULT 1,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `isSystem` BOOLEAN NOT NULL DEFAULT false,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Account_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JournalEntry` (
    `id` VARCHAR(191) NOT NULL,
    `jeNumber` VARCHAR(191) NOT NULL,
    `entryDate` VARCHAR(191) NOT NULL,
    `entryType` VARCHAR(191) NOT NULL DEFAULT 'GENERAL',
    `referenceType` VARCHAR(191) NULL,
    `referenceId` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'draft',
    `totalDebit` DOUBLE NOT NULL DEFAULT 0,
    `totalCredit` DOUBLE NOT NULL DEFAULT 0,
    `postedBy` VARCHAR(191) NULL,
    `postedAt` DATETIME(3) NULL,
    `reversedBy` VARCHAR(191) NULL,
    `reversedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `JournalEntry_jeNumber_key`(`jeNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JournalEntryLine` (
    `id` VARCHAR(191) NOT NULL,
    `journalEntryId` VARCHAR(191) NOT NULL,
    `debitAccountId` VARCHAR(191) NULL,
    `creditAccountId` VARCHAR(191) NULL,
    `debitAmount` DOUBLE NOT NULL DEFAULT 0,
    `creditAmount` DOUBLE NOT NULL DEFAULT 0,
    `description` VARCHAR(191) NULL,
    `reference` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BankAccount` (
    `id` VARCHAR(191) NOT NULL,
    `accountNo` VARCHAR(191) NOT NULL,
    `bankName` VARCHAR(191) NOT NULL,
    `branchName` VARCHAR(191) NULL,
    `accountName` VARCHAR(191) NOT NULL,
    `accountType` VARCHAR(191) NOT NULL DEFAULT 'savings',
    `currency` VARCHAR(191) NOT NULL DEFAULT 'THB',
    `openingBalance` DOUBLE NOT NULL DEFAULT 0,
    `currentBalance` DOUBLE NOT NULL DEFAULT 0,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `notes` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `BankAccount_accountNo_key`(`accountNo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AccountsReceivable` (
    `id` VARCHAR(191) NOT NULL,
    `arNumber` VARCHAR(191) NOT NULL,
    `customerId` VARCHAR(191) NOT NULL,
    `salesInvoiceId` VARCHAR(191) NULL,
    `invoiceDate` VARCHAR(191) NOT NULL,
    `dueDate` VARCHAR(191) NULL,
    `amount` DOUBLE NOT NULL DEFAULT 0,
    `paidAmount` DOUBLE NOT NULL DEFAULT 0,
    `balanceAmount` DOUBLE NOT NULL DEFAULT 0,
    `status` VARCHAR(191) NOT NULL DEFAULT 'open',
    `currency` VARCHAR(191) NOT NULL DEFAULT 'THB',
    `notes` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `AccountsReceivable_arNumber_key`(`arNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AccountsPayable` (
    `id` VARCHAR(191) NOT NULL,
    `apNumber` VARCHAR(191) NOT NULL,
    `supplierId` VARCHAR(191) NOT NULL,
    `purchaseOrderId` VARCHAR(191) NULL,
    `goodsReceiptId` VARCHAR(191) NULL,
    `invoiceDate` VARCHAR(191) NOT NULL,
    `dueDate` VARCHAR(191) NULL,
    `amount` DOUBLE NOT NULL DEFAULT 0,
    `paidAmount` DOUBLE NOT NULL DEFAULT 0,
    `balanceAmount` DOUBLE NOT NULL DEFAULT 0,
    `status` VARCHAR(191) NOT NULL DEFAULT 'open',
    `currency` VARCHAR(191) NOT NULL DEFAULT 'THB',
    `invoiceNo` VARCHAR(191) NULL,
    `notes` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `AccountsPayable_apNumber_key`(`apNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `id` VARCHAR(191) NOT NULL,
    `paymentNumber` VARCHAR(191) NOT NULL,
    `paymentDate` VARCHAR(191) NOT NULL,
    `paymentType` VARCHAR(191) NOT NULL,
    `partyType` VARCHAR(191) NOT NULL,
    `partyId` VARCHAR(191) NOT NULL,
    `partyName` VARCHAR(191) NULL,
    `amount` DOUBLE NOT NULL DEFAULT 0,
    `paymentMethod` VARCHAR(191) NOT NULL DEFAULT 'cash',
    `bankAccountId` VARCHAR(191) NULL,
    `referenceNo` VARCHAR(191) NULL,
    `referenceType` VARCHAR(191) NULL,
    `referenceId` VARCHAR(191) NULL,
    `receivedBy` VARCHAR(191) NULL,
    `paidBy` VARCHAR(191) NULL,
    `notes` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'posted',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Payment_paymentNumber_key`(`paymentNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LeaveType` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `paidLeave` BOOLEAN NOT NULL DEFAULT true,
    `maxDays` INTEGER NULL,
    `requireDoc` BOOLEAN NOT NULL DEFAULT false,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `LeaveType_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LeaveRequest` (
    `id` VARCHAR(191) NOT NULL,
    `requestNo` VARCHAR(191) NOT NULL,
    `employeeId` VARCHAR(191) NOT NULL,
    `leaveTypeId` VARCHAR(191) NOT NULL,
    `startDate` VARCHAR(191) NOT NULL,
    `endDate` VARCHAR(191) NOT NULL,
    `totalDays` DOUBLE NOT NULL,
    `reason` VARCHAR(191) NULL,
    `attachment` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'pending',
    `requestedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `reviewedBy` VARCHAR(191) NULL,
    `reviewedAt` DATETIME(3) NULL,
    `reviewNote` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `LeaveRequest_requestNo_key`(`requestNo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EmployeeDocument` (
    `id` VARCHAR(191) NOT NULL,
    `employeeId` VARCHAR(191) NOT NULL,
    `docType` VARCHAR(191) NOT NULL,
    `docName` VARCHAR(191) NOT NULL,
    `filePath` VARCHAR(191) NULL,
    `fileUrl` VARCHAR(191) NULL,
    `issueDate` VARCHAR(191) NULL,
    `expiryDate` VARCHAR(191) NULL,
    `notes` VARCHAR(191) NULL,
    `uploadedBy` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `StorageLocation` ADD CONSTRAINT `StorageLocation_warehouseId_fkey` FOREIGN KEY (`warehouseId`) REFERENCES `Warehouse`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Material` ADD CONSTRAINT `Material_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `MaterialCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PurchaseOrder` ADD CONSTRAINT `PurchaseOrder_supplierId_fkey` FOREIGN KEY (`supplierId`) REFERENCES `Supplier`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PurchaseOrderItem` ADD CONSTRAINT `PurchaseOrderItem_purchaseOrderId_fkey` FOREIGN KEY (`purchaseOrderId`) REFERENCES `PurchaseOrder`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PurchaseOrderItem` ADD CONSTRAINT `PurchaseOrderItem_materialId_fkey` FOREIGN KEY (`materialId`) REFERENCES `Material`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GoodsReceipt` ADD CONSTRAINT `GoodsReceipt_purchaseOrderId_fkey` FOREIGN KEY (`purchaseOrderId`) REFERENCES `PurchaseOrder`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GoodsReceipt` ADD CONSTRAINT `GoodsReceipt_supplierId_fkey` FOREIGN KEY (`supplierId`) REFERENCES `Supplier`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GoodsReceipt` ADD CONSTRAINT `GoodsReceipt_warehouseId_fkey` FOREIGN KEY (`warehouseId`) REFERENCES `Warehouse`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GoodsReceiptItem` ADD CONSTRAINT `GoodsReceiptItem_goodsReceiptId_fkey` FOREIGN KEY (`goodsReceiptId`) REFERENCES `GoodsReceipt`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GoodsReceiptItem` ADD CONSTRAINT `GoodsReceiptItem_materialId_fkey` FOREIGN KEY (`materialId`) REFERENCES `Material`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MaterialLot` ADD CONSTRAINT `MaterialLot_materialId_fkey` FOREIGN KEY (`materialId`) REFERENCES `Material`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MaterialLot` ADD CONSTRAINT `MaterialLot_goodsReceiptId_fkey` FOREIGN KEY (`goodsReceiptId`) REFERENCES `GoodsReceipt`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryBalance` ADD CONSTRAINT `InventoryBalance_materialId_fkey` FOREIGN KEY (`materialId`) REFERENCES `Material`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryBalance` ADD CONSTRAINT `InventoryBalance_warehouseId_fkey` FOREIGN KEY (`warehouseId`) REFERENCES `Warehouse`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryBalance` ADD CONSTRAINT `InventoryBalance_storageLocationId_fkey` FOREIGN KEY (`storageLocationId`) REFERENCES `StorageLocation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryBalance` ADD CONSTRAINT `InventoryBalance_materialLotId_fkey` FOREIGN KEY (`materialLotId`) REFERENCES `MaterialLot`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryTransaction` ADD CONSTRAINT `InventoryTransaction_materialId_fkey` FOREIGN KEY (`materialId`) REFERENCES `Material`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryTransaction` ADD CONSTRAINT `InventoryTransaction_materialLotId_fkey` FOREIGN KEY (`materialLotId`) REFERENCES `MaterialLot`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BillOfMaterial` ADD CONSTRAINT `BillOfMaterial_productionOrderId_fkey` FOREIGN KEY (`productionOrderId`) REFERENCES `ProductionOrder`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BillOfMaterial` ADD CONSTRAINT `BillOfMaterial_materialId_fkey` FOREIGN KEY (`materialId`) REFERENCES `Material`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MaterialIssue` ADD CONSTRAINT `MaterialIssue_productionOrderId_fkey` FOREIGN KEY (`productionOrderId`) REFERENCES `ProductionOrder`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MaterialIssue` ADD CONSTRAINT `MaterialIssue_warehouseId_fkey` FOREIGN KEY (`warehouseId`) REFERENCES `Warehouse`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MaterialIssueItem` ADD CONSTRAINT `MaterialIssueItem_materialIssueId_fkey` FOREIGN KEY (`materialIssueId`) REFERENCES `MaterialIssue`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MaterialIssueItem` ADD CONSTRAINT `MaterialIssueItem_materialId_fkey` FOREIGN KEY (`materialId`) REFERENCES `Material`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StockCount` ADD CONSTRAINT `StockCount_warehouseId_fkey` FOREIGN KEY (`warehouseId`) REFERENCES `Warehouse`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StockCountItem` ADD CONSTRAINT `StockCountItem_stockCountId_fkey` FOREIGN KEY (`stockCountId`) REFERENCES `StockCount`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Schedule` ADD CONSTRAINT `Schedule_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Schedule` ADD CONSTRAINT `Schedule_shiftId_fkey` FOREIGN KEY (`shiftId`) REFERENCES `Shift`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attendance` ADD CONSTRAINT `Attendance_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShiftSwap` ADD CONSTRAINT `ShiftSwap_requesterId_fkey` FOREIGN KEY (`requesterId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShiftSwap` ADD CONSTRAINT `ShiftSwap_receiverId_fkey` FOREIGN KEY (`receiverId`) REFERENCES `Employee`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShiftSwap` ADD CONSTRAINT `ShiftSwap_fromScheduleId_fkey` FOREIGN KEY (`fromScheduleId`) REFERENCES `Schedule`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShiftSwap` ADD CONSTRAINT `ShiftSwap_toScheduleId_fkey` FOREIGN KEY (`toScheduleId`) REFERENCES `Schedule`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payroll` ADD CONSTRAINT `Payroll_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `CustomerCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Quotation` ADD CONSTRAINT `Quotation_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuotationItem` ADD CONSTRAINT `QuotationItem_quotationId_fkey` FOREIGN KEY (`quotationId`) REFERENCES `Quotation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SalesOrder` ADD CONSTRAINT `SalesOrder_quotationId_fkey` FOREIGN KEY (`quotationId`) REFERENCES `Quotation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SalesOrder` ADD CONSTRAINT `SalesOrder_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SalesOrderItem` ADD CONSTRAINT `SalesOrderItem_salesOrderId_fkey` FOREIGN KEY (`salesOrderId`) REFERENCES `SalesOrder`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DeliveryNote` ADD CONSTRAINT `DeliveryNote_salesOrderId_fkey` FOREIGN KEY (`salesOrderId`) REFERENCES `SalesOrder`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DeliveryNote` ADD CONSTRAINT `DeliveryNote_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DeliveryNoteItem` ADD CONSTRAINT `DeliveryNoteItem_deliveryNoteId_fkey` FOREIGN KEY (`deliveryNoteId`) REFERENCES `DeliveryNote`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SalesInvoice` ADD CONSTRAINT `SalesInvoice_salesOrderId_fkey` FOREIGN KEY (`salesOrderId`) REFERENCES `SalesOrder`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SalesInvoice` ADD CONSTRAINT `SalesInvoice_deliveryNoteId_fkey` FOREIGN KEY (`deliveryNoteId`) REFERENCES `DeliveryNote`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SalesInvoice` ADD CONSTRAINT `SalesInvoice_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SalesInvoiceItem` ADD CONSTRAINT `SalesInvoiceItem_salesInvoiceId_fkey` FOREIGN KEY (`salesInvoiceId`) REFERENCES `SalesInvoice`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SalesReceipt` ADD CONSTRAINT `SalesReceipt_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SalesReceiptItem` ADD CONSTRAINT `SalesReceiptItem_salesReceiptId_fkey` FOREIGN KEY (`salesReceiptId`) REFERENCES `SalesReceipt`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SalesReceiptItem` ADD CONSTRAINT `SalesReceiptItem_salesInvoiceId_fkey` FOREIGN KEY (`salesInvoiceId`) REFERENCES `SalesInvoice`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `ProductCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductLot` ADD CONSTRAINT `ProductLot_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductLot` ADD CONSTRAINT `ProductLot_productionReceiptId_fkey` FOREIGN KEY (`productionReceiptId`) REFERENCES `ProductionReceipt`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FinishedGoodsBalance` ADD CONSTRAINT `FinishedGoodsBalance_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FinishedGoodsBalance` ADD CONSTRAINT `FinishedGoodsBalance_warehouseId_fkey` FOREIGN KEY (`warehouseId`) REFERENCES `Warehouse`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FinishedGoodsBalance` ADD CONSTRAINT `FinishedGoodsBalance_storageLocationId_fkey` FOREIGN KEY (`storageLocationId`) REFERENCES `StorageLocation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FinishedGoodsBalance` ADD CONSTRAINT `FinishedGoodsBalance_productLotId_fkey` FOREIGN KEY (`productLotId`) REFERENCES `ProductLot`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FinishedGoodsTransaction` ADD CONSTRAINT `FinishedGoodsTransaction_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FinishedGoodsTransaction` ADD CONSTRAINT `FinishedGoodsTransaction_productLotId_fkey` FOREIGN KEY (`productLotId`) REFERENCES `ProductLot`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductionReceipt` ADD CONSTRAINT `ProductionReceipt_productionOrderId_fkey` FOREIGN KEY (`productionOrderId`) REFERENCES `ProductionOrder`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductionReceipt` ADD CONSTRAINT `ProductionReceipt_warehouseId_fkey` FOREIGN KEY (`warehouseId`) REFERENCES `Warehouse`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductionReceiptItem` ADD CONSTRAINT `ProductionReceiptItem_productionReceiptId_fkey` FOREIGN KEY (`productionReceiptId`) REFERENCES `ProductionReceipt`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductionReceiptItem` ADD CONSTRAINT `ProductionReceiptItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `Account`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `JournalEntryLine` ADD CONSTRAINT `JournalEntryLine_journalEntryId_fkey` FOREIGN KEY (`journalEntryId`) REFERENCES `JournalEntry`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JournalEntryLine` ADD CONSTRAINT `JournalEntryLine_debitAccountId_fkey` FOREIGN KEY (`debitAccountId`) REFERENCES `Account`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JournalEntryLine` ADD CONSTRAINT `JournalEntryLine_creditAccountId_fkey` FOREIGN KEY (`creditAccountId`) REFERENCES `Account`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AccountsReceivable` ADD CONSTRAINT `AccountsReceivable_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AccountsReceivable` ADD CONSTRAINT `AccountsReceivable_salesInvoiceId_fkey` FOREIGN KEY (`salesInvoiceId`) REFERENCES `SalesInvoice`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AccountsPayable` ADD CONSTRAINT `AccountsPayable_supplierId_fkey` FOREIGN KEY (`supplierId`) REFERENCES `Supplier`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AccountsPayable` ADD CONSTRAINT `AccountsPayable_purchaseOrderId_fkey` FOREIGN KEY (`purchaseOrderId`) REFERENCES `PurchaseOrder`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AccountsPayable` ADD CONSTRAINT `AccountsPayable_goodsReceiptId_fkey` FOREIGN KEY (`goodsReceiptId`) REFERENCES `GoodsReceipt`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LeaveRequest` ADD CONSTRAINT `LeaveRequest_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LeaveRequest` ADD CONSTRAINT `LeaveRequest_leaveTypeId_fkey` FOREIGN KEY (`leaveTypeId`) REFERENCES `LeaveType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmployeeDocument` ADD CONSTRAINT `EmployeeDocument_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
