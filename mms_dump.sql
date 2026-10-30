mysqldump: [Warning] Using a password on the command line interface can be insecure.
-- MySQL dump 10.13  Distrib 26.7.0, for macos26.6 (arm64)
--
-- Host: 127.0.0.1    Database: mms
-- ------------------------------------------------------
-- Server version	8.4.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Account`
--

DROP TABLE IF EXISTS `Account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Account` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nameEn` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `accountType` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `accountGroup` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `parentId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `normalBalance` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'DEBIT',
  `level` int NOT NULL DEFAULT '1',
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `isSystem` tinyint(1) NOT NULL DEFAULT '0',
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Account_code_key` (`code`),
  KEY `Account_parentId_fkey` (`parentId`),
  CONSTRAINT `Account_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `Account` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Account`
--

LOCK TABLES `Account` WRITE;
/*!40000 ALTER TABLE `Account` DISABLE KEYS */;
/*!40000 ALTER TABLE `Account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AccountsPayable`
--

DROP TABLE IF EXISTS `AccountsPayable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AccountsPayable` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `apNumber` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `supplierId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `purchaseOrderId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `goodsReceiptId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `invoiceDate` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dueDate` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `amount` double NOT NULL DEFAULT '0',
  `paidAmount` double NOT NULL DEFAULT '0',
  `balanceAmount` double NOT NULL DEFAULT '0',
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'open',
  `currency` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'THB',
  `invoiceNo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `AccountsPayable_apNumber_key` (`apNumber`),
  KEY `AccountsPayable_supplierId_fkey` (`supplierId`),
  KEY `AccountsPayable_purchaseOrderId_fkey` (`purchaseOrderId`),
  KEY `AccountsPayable_goodsReceiptId_fkey` (`goodsReceiptId`),
  CONSTRAINT `AccountsPayable_goodsReceiptId_fkey` FOREIGN KEY (`goodsReceiptId`) REFERENCES `GoodsReceipt` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `AccountsPayable_purchaseOrderId_fkey` FOREIGN KEY (`purchaseOrderId`) REFERENCES `PurchaseOrder` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `AccountsPayable_supplierId_fkey` FOREIGN KEY (`supplierId`) REFERENCES `Supplier` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AccountsPayable`
--

LOCK TABLES `AccountsPayable` WRITE;
/*!40000 ALTER TABLE `AccountsPayable` DISABLE KEYS */;
/*!40000 ALTER TABLE `AccountsPayable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AccountsReceivable`
--

DROP TABLE IF EXISTS `AccountsReceivable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AccountsReceivable` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `arNumber` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customerId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `salesInvoiceId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `invoiceDate` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dueDate` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `amount` double NOT NULL DEFAULT '0',
  `paidAmount` double NOT NULL DEFAULT '0',
  `balanceAmount` double NOT NULL DEFAULT '0',
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'open',
  `currency` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'THB',
  `notes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `AccountsReceivable_arNumber_key` (`arNumber`),
  KEY `AccountsReceivable_customerId_fkey` (`customerId`),
  KEY `AccountsReceivable_salesInvoiceId_fkey` (`salesInvoiceId`),
  CONSTRAINT `AccountsReceivable_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `AccountsReceivable_salesInvoiceId_fkey` FOREIGN KEY (`salesInvoiceId`) REFERENCES `SalesInvoice` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AccountsReceivable`
--

LOCK TABLES `AccountsReceivable` WRITE;
/*!40000 ALTER TABLE `AccountsReceivable` DISABLE KEYS */;
/*!40000 ALTER TABLE `AccountsReceivable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Attendance`
--

DROP TABLE IF EXISTS `Attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Attendance` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `employeeId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `clockIn` datetime(3) DEFAULT NULL,
  `clockOut` datetime(3) DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'present',
  `hoursWorked` double NOT NULL DEFAULT '0',
  `note` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Attendance_employeeId_date_key` (`employeeId`,`date`),
  KEY `Attendance_employeeId_date_idx` (`employeeId`,`date`),
  CONSTRAINT `Attendance_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Attendance`
--

LOCK TABLES `Attendance` WRITE;
/*!40000 ALTER TABLE `Attendance` DISABLE KEYS */;
/*!40000 ALTER TABLE `Attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AuditLog`
--

DROP TABLE IF EXISTS `AuditLog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AuditLog` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `action` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `entity` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `entityId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userName` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `oldValues` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `newValues` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ipAddress` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userAgent` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AuditLog`
--

LOCK TABLES `AuditLog` WRITE;
/*!40000 ALTER TABLE `AuditLog` DISABLE KEYS */;
/*!40000 ALTER TABLE `AuditLog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BankAccount`
--

DROP TABLE IF EXISTS `BankAccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BankAccount` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `accountNo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bankName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `branchName` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `accountName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `accountType` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'savings',
  `currency` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'THB',
  `openingBalance` double NOT NULL DEFAULT '0',
  `currentBalance` double NOT NULL DEFAULT '0',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `notes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `BankAccount_accountNo_key` (`accountNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BankAccount`
--

LOCK TABLES `BankAccount` WRITE;
/*!40000 ALTER TABLE `BankAccount` DISABLE KEYS */;
/*!40000 ALTER TABLE `BankAccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BillOfMaterial`
--

DROP TABLE IF EXISTS `BillOfMaterial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BillOfMaterial` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productionOrderId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `materialId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `requiredQuantity` double NOT NULL,
  `unit` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `notes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `BillOfMaterial_productionOrderId_fkey` (`productionOrderId`),
  KEY `BillOfMaterial_materialId_fkey` (`materialId`),
  CONSTRAINT `BillOfMaterial_materialId_fkey` FOREIGN KEY (`materialId`) REFERENCES `Material` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `BillOfMaterial_productionOrderId_fkey` FOREIGN KEY (`productionOrderId`) REFERENCES `ProductionOrder` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BillOfMaterial`
--

LOCK TABLES `BillOfMaterial` WRITE;
/*!40000 ALTER TABLE `BillOfMaterial` DISABLE KEYS */;
/*!40000 ALTER TABLE `BillOfMaterial` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Customer`
--

DROP TABLE IF EXISTS `Customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Customer` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nameEn` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `categoryId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `customerType` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'domestic',
  `contactPerson` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fax` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `addressEn` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `taxId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'TH',
  `currency` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'THB',
  `creditLimit` double NOT NULL DEFAULT '0',
  `creditTermDays` int NOT NULL DEFAULT '0',
  `paymentMethod` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shippingAddress` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `notes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Customer_code_key` (`code`),
  KEY `Customer_categoryId_fkey` (`categoryId`),
  CONSTRAINT `Customer_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `CustomerCategory` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Customer`
--

LOCK TABLES `Customer` WRITE;
/*!40000 ALTER TABLE `Customer` DISABLE KEYS */;
/*!40000 ALTER TABLE `Customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CustomerCategory`
--

DROP TABLE IF EXISTS `CustomerCategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CustomerCategory` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `CustomerCategory_code_key` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CustomerCategory`
--

LOCK TABLES `CustomerCategory` WRITE;
/*!40000 ALTER TABLE `CustomerCategory` DISABLE KEYS */;
/*!40000 ALTER TABLE `CustomerCategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DeliveryNote`
--

DROP TABLE IF EXISTS `DeliveryNote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DeliveryNote` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dnNumber` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `salesOrderId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `customerId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deliveryDate` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deliveryAddress` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deliveredBy` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `receivedBy` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `notes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `DeliveryNote_dnNumber_key` (`dnNumber`),
  KEY `DeliveryNote_salesOrderId_fkey` (`salesOrderId`),
  KEY `DeliveryNote_customerId_fkey` (`customerId`),
  CONSTRAINT `DeliveryNote_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `DeliveryNote_salesOrderId_fkey` FOREIGN KEY (`salesOrderId`) REFERENCES `SalesOrder` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DeliveryNote`
--

LOCK TABLES `DeliveryNote` WRITE;
/*!40000 ALTER TABLE `DeliveryNote` DISABLE KEYS */;
/*!40000 ALTER TABLE `DeliveryNote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DeliveryNoteItem`
--

DROP TABLE IF EXISTS `DeliveryNoteItem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DeliveryNoteItem` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deliveryNoteId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `productCode` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` double NOT NULL,
  `unit` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ชิ้น',
  `lotNumber` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `DeliveryNoteItem_deliveryNoteId_fkey` (`deliveryNoteId`),
  CONSTRAINT `DeliveryNoteItem_deliveryNoteId_fkey` FOREIGN KEY (`deliveryNoteId`) REFERENCES `DeliveryNote` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DeliveryNoteItem`
--

LOCK TABLES `DeliveryNoteItem` WRITE;
/*!40000 ALTER TABLE `DeliveryNoteItem` DISABLE KEYS */;
/*!40000 ALTER TABLE `DeliveryNoteItem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Employee`
--

DROP TABLE IF EXISTS `Employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Employee` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `employeeCode` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'employee',
  `department` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `division` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hireDate` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `hourlyRate` double NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Employee_employeeCode_key` (`employeeCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Employee`
--

LOCK TABLES `Employee` WRITE;
/*!40000 ALTER TABLE `Employee` DISABLE KEYS */;
/*!40000 ALTER TABLE `Employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EmployeeDocument`
--

DROP TABLE IF EXISTS `EmployeeDocument`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `EmployeeDocument` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `employeeId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `docType` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `docName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `filePath` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fileUrl` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `issueDate` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `expiryDate` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `uploadedBy` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `EmployeeDocument_employeeId_fkey` (`employeeId`),
  CONSTRAINT `EmployeeDocument_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EmployeeDocument`
--

LOCK TABLES `EmployeeDocument` WRITE;
/*!40000 ALTER TABLE `EmployeeDocument` DISABLE KEYS */;
/*!40000 ALTER TABLE `EmployeeDocument` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FinishedGoodsBalance`
--

DROP TABLE IF EXISTS `FinishedGoodsBalance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FinishedGoodsBalance` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `warehouseId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `storageLocationId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `productLotId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantity` double NOT NULL DEFAULT '0',
  `reservedQuantity` double NOT NULL DEFAULT '0',
  `availableQuantity` double NOT NULL DEFAULT '0',
  `lastUpdated` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `FinishedGoodsBalance_productId_warehouseId_storageLocationId_key` (`productId`,`warehouseId`,`storageLocationId`,`productLotId`),
  KEY `FinishedGoodsBalance_warehouseId_fkey` (`warehouseId`),
  KEY `FinishedGoodsBalance_storageLocationId_fkey` (`storageLocationId`),
  KEY `FinishedGoodsBalance_productLotId_fkey` (`productLotId`),
  CONSTRAINT `FinishedGoodsBalance_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `FinishedGoodsBalance_productLotId_fkey` FOREIGN KEY (`productLotId`) REFERENCES `ProductLot` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FinishedGoodsBalance_storageLocationId_fkey` FOREIGN KEY (`storageLocationId`) REFERENCES `StorageLocation` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FinishedGoodsBalance_warehouseId_fkey` FOREIGN KEY (`warehouseId`) REFERENCES `Warehouse` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FinishedGoodsBalance`
--

LOCK TABLES `FinishedGoodsBalance` WRITE;
/*!40000 ALTER TABLE `FinishedGoodsBalance` DISABLE KEYS */;
/*!40000 ALTER TABLE `FinishedGoodsBalance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FinishedGoodsTransaction`
--

DROP TABLE IF EXISTS `FinishedGoodsTransaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FinishedGoodsTransaction` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `transactionNo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productLotId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `transactionType` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` double NOT NULL,
  `unitPrice` double NOT NULL DEFAULT '0',
  `referenceType` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `referenceId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fromWarehouseId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `toWarehouseId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `performedBy` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approvedBy` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reason` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `transactionDate` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `FinishedGoodsTransaction_transactionNo_key` (`transactionNo`),
  KEY `FinishedGoodsTransaction_productId_fkey` (`productId`),
  KEY `FinishedGoodsTransaction_productLotId_fkey` (`productLotId`),
  CONSTRAINT `FinishedGoodsTransaction_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `FinishedGoodsTransaction_productLotId_fkey` FOREIGN KEY (`productLotId`) REFERENCES `ProductLot` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FinishedGoodsTransaction`
--

LOCK TABLES `FinishedGoodsTransaction` WRITE;
/*!40000 ALTER TABLE `FinishedGoodsTransaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `FinishedGoodsTransaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `GoodsReceipt`
--

DROP TABLE IF EXISTS `GoodsReceipt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `GoodsReceipt` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `grNumber` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `purchaseOrderId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `supplierId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `warehouseId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `receiptDate` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deliveryNote` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `invoiceNo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `receivedBy` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `inspectedBy` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `notes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `GoodsReceipt_grNumber_key` (`grNumber`),
  KEY `GoodsReceipt_purchaseOrderId_fkey` (`purchaseOrderId`),
  KEY `GoodsReceipt_supplierId_fkey` (`supplierId`),
  KEY `GoodsReceipt_warehouseId_fkey` (`warehouseId`),
  CONSTRAINT `GoodsReceipt_purchaseOrderId_fkey` FOREIGN KEY (`purchaseOrderId`) REFERENCES `PurchaseOrder` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `GoodsReceipt_supplierId_fkey` FOREIGN KEY (`supplierId`) REFERENCES `Supplier` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `GoodsReceipt_warehouseId_fkey` FOREIGN KEY (`warehouseId`) REFERENCES `Warehouse` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `GoodsReceipt`
--

LOCK TABLES `GoodsReceipt` WRITE;
/*!40000 ALTER TABLE `GoodsReceipt` DISABLE KEYS */;
/*!40000 ALTER TABLE `GoodsReceipt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `GoodsReceiptItem`
--

DROP TABLE IF EXISTS `GoodsReceiptItem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `GoodsReceiptItem` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `goodsReceiptId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `materialId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` double NOT NULL,
  `unitPrice` double NOT NULL,
  `totalPrice` double NOT NULL,
  `lotNumber` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `expiryDate` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `inspected` tinyint(1) NOT NULL DEFAULT '0',
  `passed` tinyint(1) DEFAULT NULL,
  `inspectionNotes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `GoodsReceiptItem_goodsReceiptId_fkey` (`goodsReceiptId`),
  KEY `GoodsReceiptItem_materialId_fkey` (`materialId`),
  CONSTRAINT `GoodsReceiptItem_goodsReceiptId_fkey` FOREIGN KEY (`goodsReceiptId`) REFERENCES `GoodsReceipt` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `GoodsReceiptItem_materialId_fkey` FOREIGN KEY (`materialId`) REFERENCES `Material` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `GoodsReceiptItem`
--

LOCK TABLES `GoodsReceiptItem` WRITE;
/*!40000 ALTER TABLE `GoodsReceiptItem` DISABLE KEYS */;
/*!40000 ALTER TABLE `GoodsReceiptItem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `InventoryBalance`
--

DROP TABLE IF EXISTS `InventoryBalance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `InventoryBalance` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `materialId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `warehouseId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `storageLocationId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `materialLotId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantity` double NOT NULL DEFAULT '0',
  `reservedQuantity` double NOT NULL DEFAULT '0',
  `availableQuantity` double NOT NULL DEFAULT '0',
  `lastUpdated` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `InventoryBalance_materialId_warehouseId_storageLocationId_ma_key` (`materialId`,`warehouseId`,`storageLocationId`,`materialLotId`),
  KEY `InventoryBalance_warehouseId_fkey` (`warehouseId`),
  KEY `InventoryBalance_storageLocationId_fkey` (`storageLocationId`),
  KEY `InventoryBalance_materialLotId_fkey` (`materialLotId`),
  CONSTRAINT `InventoryBalance_materialId_fkey` FOREIGN KEY (`materialId`) REFERENCES `Material` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `InventoryBalance_materialLotId_fkey` FOREIGN KEY (`materialLotId`) REFERENCES `MaterialLot` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `InventoryBalance_storageLocationId_fkey` FOREIGN KEY (`storageLocationId`) REFERENCES `StorageLocation` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `InventoryBalance_warehouseId_fkey` FOREIGN KEY (`warehouseId`) REFERENCES `Warehouse` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `InventoryBalance`
--

LOCK TABLES `InventoryBalance` WRITE;
/*!40000 ALTER TABLE `InventoryBalance` DISABLE KEYS */;
/*!40000 ALTER TABLE `InventoryBalance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `InventoryTransaction`
--

DROP TABLE IF EXISTS `InventoryTransaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `InventoryTransaction` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `transactionNo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `materialId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `materialLotId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `transactionType` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` double NOT NULL,
  `unitPrice` double NOT NULL DEFAULT '0',
  `referenceType` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `referenceId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fromWarehouseId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `toWarehouseId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `performedBy` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approvedBy` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reason` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `transactionDate` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `InventoryTransaction_transactionNo_key` (`transactionNo`),
  KEY `InventoryTransaction_materialId_fkey` (`materialId`),
  KEY `InventoryTransaction_materialLotId_fkey` (`materialLotId`),
  CONSTRAINT `InventoryTransaction_materialId_fkey` FOREIGN KEY (`materialId`) REFERENCES `Material` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `InventoryTransaction_materialLotId_fkey` FOREIGN KEY (`materialLotId`) REFERENCES `MaterialLot` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `InventoryTransaction`
--

LOCK TABLES `InventoryTransaction` WRITE;
/*!40000 ALTER TABLE `InventoryTransaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `InventoryTransaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `JournalEntry`
--

DROP TABLE IF EXISTS `JournalEntry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `JournalEntry` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jeNumber` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `entryDate` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `entryType` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'GENERAL',
  `referenceType` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `referenceId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'draft',
  `totalDebit` double NOT NULL DEFAULT '0',
  `totalCredit` double NOT NULL DEFAULT '0',
  `postedBy` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `postedAt` datetime(3) DEFAULT NULL,
  `reversedBy` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reversedAt` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `JournalEntry_jeNumber_key` (`jeNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `JournalEntry`
--

LOCK TABLES `JournalEntry` WRITE;
/*!40000 ALTER TABLE `JournalEntry` DISABLE KEYS */;
/*!40000 ALTER TABLE `JournalEntry` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `JournalEntryLine`
--

DROP TABLE IF EXISTS `JournalEntryLine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `JournalEntryLine` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `journalEntryId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `debitAccountId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `creditAccountId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `debitAmount` double NOT NULL DEFAULT '0',
  `creditAmount` double NOT NULL DEFAULT '0',
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reference` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `JournalEntryLine_journalEntryId_fkey` (`journalEntryId`),
  KEY `JournalEntryLine_debitAccountId_fkey` (`debitAccountId`),
  KEY `JournalEntryLine_creditAccountId_fkey` (`creditAccountId`),
  CONSTRAINT `JournalEntryLine_creditAccountId_fkey` FOREIGN KEY (`creditAccountId`) REFERENCES `Account` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `JournalEntryLine_debitAccountId_fkey` FOREIGN KEY (`debitAccountId`) REFERENCES `Account` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `JournalEntryLine_journalEntryId_fkey` FOREIGN KEY (`journalEntryId`) REFERENCES `JournalEntry` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `JournalEntryLine`
--

LOCK TABLES `JournalEntryLine` WRITE;
/*!40000 ALTER TABLE `JournalEntryLine` DISABLE KEYS */;
/*!40000 ALTER TABLE `JournalEntryLine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LeaveRequest`
--

DROP TABLE IF EXISTS `LeaveRequest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `LeaveRequest` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `requestNo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `employeeId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `leaveTypeId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `startDate` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `endDate` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `totalDays` double NOT NULL,
  `reason` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `attachment` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `requestedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `reviewedBy` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reviewedAt` datetime(3) DEFAULT NULL,
  `reviewNote` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `LeaveRequest_requestNo_key` (`requestNo`),
  KEY `LeaveRequest_employeeId_fkey` (`employeeId`),
  KEY `LeaveRequest_leaveTypeId_fkey` (`leaveTypeId`),
  CONSTRAINT `LeaveRequest_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `LeaveRequest_leaveTypeId_fkey` FOREIGN KEY (`leaveTypeId`) REFERENCES `LeaveType` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LeaveRequest`
--

LOCK TABLES `LeaveRequest` WRITE;
/*!40000 ALTER TABLE `LeaveRequest` DISABLE KEYS */;
/*!40000 ALTER TABLE `LeaveRequest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LeaveType`
--

DROP TABLE IF EXISTS `LeaveType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `LeaveType` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `paidLeave` tinyint(1) NOT NULL DEFAULT '1',
  `maxDays` int DEFAULT NULL,
  `requireDoc` tinyint(1) NOT NULL DEFAULT '0',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `LeaveType_code_key` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LeaveType`
--

LOCK TABLES `LeaveType` WRITE;
/*!40000 ALTER TABLE `LeaveType` DISABLE KEYS */;
/*!40000 ALTER TABLE `LeaveType` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Material`
--

DROP TABLE IF EXISTS `Material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Material` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `categoryId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `unit` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'กก.',
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `specifications` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `standardPrice` double NOT NULL DEFAULT '0',
  `minStock` double NOT NULL DEFAULT '0',
  `maxStock` double NOT NULL DEFAULT '0',
  `reorderPoint` double NOT NULL DEFAULT '0',
  `leadTimeDays` int NOT NULL DEFAULT '0',
  `shelfLifeDays` int DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Material_code_key` (`code`),
  KEY `Material_categoryId_fkey` (`categoryId`),
  CONSTRAINT `Material_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `MaterialCategory` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Material`
--

LOCK TABLES `Material` WRITE;
/*!40000 ALTER TABLE `Material` DISABLE KEYS */;
/*!40000 ALTER TABLE `Material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MaterialCategory`
--

DROP TABLE IF EXISTS `MaterialCategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MaterialCategory` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `MaterialCategory_code_key` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MaterialCategory`
--

LOCK TABLES `MaterialCategory` WRITE;
/*!40000 ALTER TABLE `MaterialCategory` DISABLE KEYS */;
/*!40000 ALTER TABLE `MaterialCategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MaterialIssue`
--

DROP TABLE IF EXISTS `MaterialIssue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MaterialIssue` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `miNumber` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productionOrderId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `warehouseId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `issueDate` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `requestedBy` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `issuedBy` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approvedBy` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `notes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `MaterialIssue_miNumber_key` (`miNumber`),
  KEY `MaterialIssue_productionOrderId_fkey` (`productionOrderId`),
  KEY `MaterialIssue_warehouseId_fkey` (`warehouseId`),
  CONSTRAINT `MaterialIssue_productionOrderId_fkey` FOREIGN KEY (`productionOrderId`) REFERENCES `ProductionOrder` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `MaterialIssue_warehouseId_fkey` FOREIGN KEY (`warehouseId`) REFERENCES `Warehouse` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MaterialIssue`
--

LOCK TABLES `MaterialIssue` WRITE;
/*!40000 ALTER TABLE `MaterialIssue` DISABLE KEYS */;
/*!40000 ALTER TABLE `MaterialIssue` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MaterialIssueItem`
--

DROP TABLE IF EXISTS `MaterialIssueItem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MaterialIssueItem` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `materialIssueId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `materialId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` double NOT NULL,
  `issuedQuantity` double NOT NULL DEFAULT '0',
  `notes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `MaterialIssueItem_materialIssueId_fkey` (`materialIssueId`),
  KEY `MaterialIssueItem_materialId_fkey` (`materialId`),
  CONSTRAINT `MaterialIssueItem_materialId_fkey` FOREIGN KEY (`materialId`) REFERENCES `Material` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `MaterialIssueItem_materialIssueId_fkey` FOREIGN KEY (`materialIssueId`) REFERENCES `MaterialIssue` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MaterialIssueItem`
--

LOCK TABLES `MaterialIssueItem` WRITE;
/*!40000 ALTER TABLE `MaterialIssueItem` DISABLE KEYS */;
/*!40000 ALTER TABLE `MaterialIssueItem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MaterialLot`
--

DROP TABLE IF EXISTS `MaterialLot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MaterialLot` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lotNumber` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `materialId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `goodsReceiptId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantityReceived` double NOT NULL,
  `quantityRemaining` double NOT NULL,
  `manufactureDate` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `expiryDate` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'available',
  `inspectionStatus` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `MaterialLot_materialId_lotNumber_key` (`materialId`,`lotNumber`),
  KEY `MaterialLot_goodsReceiptId_fkey` (`goodsReceiptId`),
  CONSTRAINT `MaterialLot_goodsReceiptId_fkey` FOREIGN KEY (`goodsReceiptId`) REFERENCES `GoodsReceipt` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `MaterialLot_materialId_fkey` FOREIGN KEY (`materialId`) REFERENCES `Material` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MaterialLot`
--

LOCK TABLES `MaterialLot` WRITE;
/*!40000 ALTER TABLE `MaterialLot` DISABLE KEYS */;
/*!40000 ALTER TABLE `MaterialLot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Payment`
--

DROP TABLE IF EXISTS `Payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Payment` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `paymentNumber` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `paymentDate` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `paymentType` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `partyType` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `partyId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `partyName` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `amount` double NOT NULL DEFAULT '0',
  `paymentMethod` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'cash',
  `bankAccountId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `referenceNo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `referenceType` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `referenceId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `receivedBy` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paidBy` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'posted',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Payment_paymentNumber_key` (`paymentNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Payment`
--

LOCK TABLES `Payment` WRITE;
/*!40000 ALTER TABLE `Payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `Payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Payroll`
--

DROP TABLE IF EXISTS `Payroll`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Payroll` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `employeeId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `periodStart` datetime(3) NOT NULL,
  `periodEnd` datetime(3) NOT NULL,
  `totalHours` double NOT NULL DEFAULT '0',
  `overtimeHours` double NOT NULL DEFAULT '0',
  `hourlyRate` double NOT NULL,
  `basePay` double NOT NULL,
  `overtimePay` double NOT NULL,
  `deductions` double NOT NULL DEFAULT '0',
  `bonuses` double NOT NULL DEFAULT '0',
  `netPay` double NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'draft',
  `generatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Payroll_employeeId_idx` (`employeeId`),
  CONSTRAINT `Payroll_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Payroll`
--

LOCK TABLES `Payroll` WRITE;
/*!40000 ALTER TABLE `Payroll` DISABLE KEYS */;
/*!40000 ALTER TABLE `Payroll` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Product`
--

DROP TABLE IF EXISTS `Product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Product` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nameEn` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `categoryId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `unit` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ชิ้น',
  `barcode` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `specifications` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `standardCost` double NOT NULL DEFAULT '0',
  `sellingPrice` double NOT NULL DEFAULT '0',
  `minStock` double NOT NULL DEFAULT '0',
  `maxStock` double NOT NULL DEFAULT '0',
  `reorderPoint` double NOT NULL DEFAULT '0',
  `shelfLifeDays` int DEFAULT NULL,
  `isSellable` tinyint(1) NOT NULL DEFAULT '1',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Product_code_key` (`code`),
  KEY `Product_categoryId_fkey` (`categoryId`),
  CONSTRAINT `Product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `ProductCategory` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Product`
--

LOCK TABLES `Product` WRITE;
/*!40000 ALTER TABLE `Product` DISABLE KEYS */;
/*!40000 ALTER TABLE `Product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ProductCategory`
--

DROP TABLE IF EXISTS `ProductCategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProductCategory` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ProductCategory_code_key` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProductCategory`
--

LOCK TABLES `ProductCategory` WRITE;
/*!40000 ALTER TABLE `ProductCategory` DISABLE KEYS */;
/*!40000 ALTER TABLE `ProductCategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ProductLot`
--

DROP TABLE IF EXISTS `ProductLot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProductLot` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lotNumber` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productionReceiptId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantityReceived` double NOT NULL,
  `quantityRemaining` double NOT NULL,
  `manufactureDate` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `expiryDate` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'available',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ProductLot_productId_lotNumber_key` (`productId`,`lotNumber`),
  KEY `ProductLot_productionReceiptId_fkey` (`productionReceiptId`),
  CONSTRAINT `ProductLot_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `ProductLot_productionReceiptId_fkey` FOREIGN KEY (`productionReceiptId`) REFERENCES `ProductionReceipt` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProductLot`
--

LOCK TABLES `ProductLot` WRITE;
/*!40000 ALTER TABLE `ProductLot` DISABLE KEYS */;
/*!40000 ALTER TABLE `ProductLot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ProductionOrder`
--

DROP TABLE IF EXISTS `ProductionOrder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProductionOrder` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `moNumber` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` double NOT NULL,
  `startDate` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dueDate` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `requestedBy` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approvedBy` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ProductionOrder_moNumber_key` (`moNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProductionOrder`
--

LOCK TABLES `ProductionOrder` WRITE;
/*!40000 ALTER TABLE `ProductionOrder` DISABLE KEYS */;
/*!40000 ALTER TABLE `ProductionOrder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ProductionReceipt`
--

DROP TABLE IF EXISTS `ProductionReceipt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProductionReceipt` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `prNumber` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productionOrderId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `warehouseId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `receiptDate` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `receivedBy` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `inspectedBy` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `notes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ProductionReceipt_prNumber_key` (`prNumber`),
  KEY `ProductionReceipt_productionOrderId_fkey` (`productionOrderId`),
  KEY `ProductionReceipt_warehouseId_fkey` (`warehouseId`),
  CONSTRAINT `ProductionReceipt_productionOrderId_fkey` FOREIGN KEY (`productionOrderId`) REFERENCES `ProductionOrder` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `ProductionReceipt_warehouseId_fkey` FOREIGN KEY (`warehouseId`) REFERENCES `Warehouse` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProductionReceipt`
--

LOCK TABLES `ProductionReceipt` WRITE;
/*!40000 ALTER TABLE `ProductionReceipt` DISABLE KEYS */;
/*!40000 ALTER TABLE `ProductionReceipt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ProductionReceiptItem`
--

DROP TABLE IF EXISTS `ProductionReceiptItem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProductionReceiptItem` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productionReceiptId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` double NOT NULL,
  `lotNumber` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `manufactureDate` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `expiryDate` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ProductionReceiptItem_productionReceiptId_fkey` (`productionReceiptId`),
  KEY `ProductionReceiptItem_productId_fkey` (`productId`),
  CONSTRAINT `ProductionReceiptItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `ProductionReceiptItem_productionReceiptId_fkey` FOREIGN KEY (`productionReceiptId`) REFERENCES `ProductionReceipt` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProductionReceiptItem`
--

LOCK TABLES `ProductionReceiptItem` WRITE;
/*!40000 ALTER TABLE `ProductionReceiptItem` DISABLE KEYS */;
/*!40000 ALTER TABLE `ProductionReceiptItem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PurchaseOrder`
--

DROP TABLE IF EXISTS `PurchaseOrder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PurchaseOrder` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `poNumber` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `supplierId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `orderDate` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expectedDate` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `totalAmount` double NOT NULL DEFAULT '0',
  `notes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `requestedBy` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approvedBy` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approvedAt` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `PurchaseOrder_poNumber_key` (`poNumber`),
  KEY `PurchaseOrder_supplierId_fkey` (`supplierId`),
  CONSTRAINT `PurchaseOrder_supplierId_fkey` FOREIGN KEY (`supplierId`) REFERENCES `Supplier` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PurchaseOrder`
--

LOCK TABLES `PurchaseOrder` WRITE;
/*!40000 ALTER TABLE `PurchaseOrder` DISABLE KEYS */;
/*!40000 ALTER TABLE `PurchaseOrder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PurchaseOrderItem`
--

DROP TABLE IF EXISTS `PurchaseOrderItem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PurchaseOrderItem` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `purchaseOrderId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `materialId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` double NOT NULL,
  `unitPrice` double NOT NULL,
  `totalPrice` double NOT NULL,
  `receivedQty` double NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `PurchaseOrderItem_purchaseOrderId_fkey` (`purchaseOrderId`),
  KEY `PurchaseOrderItem_materialId_fkey` (`materialId`),
  CONSTRAINT `PurchaseOrderItem_materialId_fkey` FOREIGN KEY (`materialId`) REFERENCES `Material` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `PurchaseOrderItem_purchaseOrderId_fkey` FOREIGN KEY (`purchaseOrderId`) REFERENCES `PurchaseOrder` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PurchaseOrderItem`
--

LOCK TABLES `PurchaseOrderItem` WRITE;
/*!40000 ALTER TABLE `PurchaseOrderItem` DISABLE KEYS */;
/*!40000 ALTER TABLE `PurchaseOrderItem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Quotation`
--

DROP TABLE IF EXISTS `Quotation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Quotation` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `qtNumber` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customerId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quoteDate` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `validUntil` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'draft',
  `currency` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'THB',
  `exchangeRate` double NOT NULL DEFAULT '1',
  `subtotal` double NOT NULL DEFAULT '0',
  `discountAmount` double NOT NULL DEFAULT '0',
  `vatAmount` double NOT NULL DEFAULT '0',
  `totalAmount` double NOT NULL DEFAULT '0',
  `deliveryTerm` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paymentTerm` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `terms` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `preparedBy` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approvedBy` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approvedAt` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Quotation_qtNumber_key` (`qtNumber`),
  KEY `Quotation_customerId_fkey` (`customerId`),
  CONSTRAINT `Quotation_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Quotation`
--

LOCK TABLES `Quotation` WRITE;
/*!40000 ALTER TABLE `Quotation` DISABLE KEYS */;
/*!40000 ALTER TABLE `Quotation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `QuotationItem`
--

DROP TABLE IF EXISTS `QuotationItem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `QuotationItem` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quotationId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productCode` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantity` double NOT NULL,
  `unit` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ชิ้น',
  `unitPrice` double NOT NULL,
  `discount` double NOT NULL DEFAULT '0',
  `totalPrice` double NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `QuotationItem_quotationId_fkey` (`quotationId`),
  CONSTRAINT `QuotationItem_quotationId_fkey` FOREIGN KEY (`quotationId`) REFERENCES `Quotation` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `QuotationItem`
--

LOCK TABLES `QuotationItem` WRITE;
/*!40000 ALTER TABLE `QuotationItem` DISABLE KEYS */;
/*!40000 ALTER TABLE `QuotationItem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SalesInvoice`
--

DROP TABLE IF EXISTS `SalesInvoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SalesInvoice` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `invNumber` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `salesOrderId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deliveryNoteId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `customerId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `invoiceDate` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dueDate` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'unpaid',
  `currency` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'THB',
  `exchangeRate` double NOT NULL DEFAULT '1',
  `subtotal` double NOT NULL DEFAULT '0',
  `discountAmount` double NOT NULL DEFAULT '0',
  `vatRate` double NOT NULL DEFAULT '7',
  `vatAmount` double NOT NULL DEFAULT '0',
  `totalAmount` double NOT NULL DEFAULT '0',
  `paidAmount` double NOT NULL DEFAULT '0',
  `balanceAmount` double NOT NULL DEFAULT '0',
  `taxInvoiceNo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `preparedBy` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approvedBy` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `SalesInvoice_invNumber_key` (`invNumber`),
  KEY `SalesInvoice_salesOrderId_fkey` (`salesOrderId`),
  KEY `SalesInvoice_deliveryNoteId_fkey` (`deliveryNoteId`),
  KEY `SalesInvoice_customerId_fkey` (`customerId`),
  CONSTRAINT `SalesInvoice_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `SalesInvoice_deliveryNoteId_fkey` FOREIGN KEY (`deliveryNoteId`) REFERENCES `DeliveryNote` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `SalesInvoice_salesOrderId_fkey` FOREIGN KEY (`salesOrderId`) REFERENCES `SalesOrder` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SalesInvoice`
--

LOCK TABLES `SalesInvoice` WRITE;
/*!40000 ALTER TABLE `SalesInvoice` DISABLE KEYS */;
/*!40000 ALTER TABLE `SalesInvoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SalesInvoiceItem`
--

DROP TABLE IF EXISTS `SalesInvoiceItem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SalesInvoiceItem` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `salesInvoiceId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `productCode` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` double NOT NULL,
  `unit` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ชิ้น',
  `unitPrice` double NOT NULL,
  `discount` double NOT NULL DEFAULT '0',
  `totalPrice` double NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `SalesInvoiceItem_salesInvoiceId_fkey` (`salesInvoiceId`),
  CONSTRAINT `SalesInvoiceItem_salesInvoiceId_fkey` FOREIGN KEY (`salesInvoiceId`) REFERENCES `SalesInvoice` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SalesInvoiceItem`
--

LOCK TABLES `SalesInvoiceItem` WRITE;
/*!40000 ALTER TABLE `SalesInvoiceItem` DISABLE KEYS */;
/*!40000 ALTER TABLE `SalesInvoiceItem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SalesOrder`
--

DROP TABLE IF EXISTS `SalesOrder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SalesOrder` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `soNumber` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quotationId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `customerId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `orderDate` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deliveryDate` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `currency` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'THB',
  `exchangeRate` double NOT NULL DEFAULT '1',
  `subtotal` double NOT NULL DEFAULT '0',
  `discountAmount` double NOT NULL DEFAULT '0',
  `vatAmount` double NOT NULL DEFAULT '0',
  `totalAmount` double NOT NULL DEFAULT '0',
  `deliveryAddress` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deliveryTerm` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paymentTerm` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `requestedBy` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approvedBy` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approvedAt` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `SalesOrder_soNumber_key` (`soNumber`),
  KEY `SalesOrder_quotationId_fkey` (`quotationId`),
  KEY `SalesOrder_customerId_fkey` (`customerId`),
  CONSTRAINT `SalesOrder_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `SalesOrder_quotationId_fkey` FOREIGN KEY (`quotationId`) REFERENCES `Quotation` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SalesOrder`
--

LOCK TABLES `SalesOrder` WRITE;
/*!40000 ALTER TABLE `SalesOrder` DISABLE KEYS */;
/*!40000 ALTER TABLE `SalesOrder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SalesOrderItem`
--

DROP TABLE IF EXISTS `SalesOrderItem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SalesOrderItem` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `salesOrderId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `productCode` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` double NOT NULL,
  `unit` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ชิ้น',
  `unitPrice` double NOT NULL,
  `discount` double NOT NULL DEFAULT '0',
  `totalPrice` double NOT NULL,
  `deliveredQty` double NOT NULL DEFAULT '0',
  `invoicedQty` double NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `SalesOrderItem_salesOrderId_fkey` (`salesOrderId`),
  CONSTRAINT `SalesOrderItem_salesOrderId_fkey` FOREIGN KEY (`salesOrderId`) REFERENCES `SalesOrder` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SalesOrderItem`
--

LOCK TABLES `SalesOrderItem` WRITE;
/*!40000 ALTER TABLE `SalesOrderItem` DISABLE KEYS */;
/*!40000 ALTER TABLE `SalesOrderItem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SalesReceipt`
--

DROP TABLE IF EXISTS `SalesReceipt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SalesReceipt` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `receiptNumber` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customerId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `receiptDate` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `paymentMethod` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'cash',
  `bankAccountId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `referenceNo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `totalAmount` double NOT NULL DEFAULT '0',
  `receivedBy` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'posted',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `SalesReceipt_receiptNumber_key` (`receiptNumber`),
  KEY `SalesReceipt_customerId_fkey` (`customerId`),
  CONSTRAINT `SalesReceipt_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SalesReceipt`
--

LOCK TABLES `SalesReceipt` WRITE;
/*!40000 ALTER TABLE `SalesReceipt` DISABLE KEYS */;
/*!40000 ALTER TABLE `SalesReceipt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SalesReceiptItem`
--

DROP TABLE IF EXISTS `SalesReceiptItem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SalesReceiptItem` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `salesReceiptId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `salesInvoiceId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amountPaid` double NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `SalesReceiptItem_salesReceiptId_fkey` (`salesReceiptId`),
  KEY `SalesReceiptItem_salesInvoiceId_fkey` (`salesInvoiceId`),
  CONSTRAINT `SalesReceiptItem_salesInvoiceId_fkey` FOREIGN KEY (`salesInvoiceId`) REFERENCES `SalesInvoice` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `SalesReceiptItem_salesReceiptId_fkey` FOREIGN KEY (`salesReceiptId`) REFERENCES `SalesReceipt` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SalesReceiptItem`
--

LOCK TABLES `SalesReceiptItem` WRITE;
/*!40000 ALTER TABLE `SalesReceiptItem` DISABLE KEYS */;
/*!40000 ALTER TABLE `SalesReceiptItem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Schedule`
--

DROP TABLE IF EXISTS `Schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Schedule` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `employeeId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shiftId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `note` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Schedule_employeeId_date_key` (`employeeId`,`date`),
  KEY `Schedule_employeeId_date_idx` (`employeeId`,`date`),
  KEY `Schedule_shiftId_date_idx` (`shiftId`,`date`),
  CONSTRAINT `Schedule_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Schedule_shiftId_fkey` FOREIGN KEY (`shiftId`) REFERENCES `Shift` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Schedule`
--

LOCK TABLES `Schedule` WRITE;
/*!40000 ALTER TABLE `Schedule` DISABLE KEYS */;
/*!40000 ALTER TABLE `Schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Shift`
--

DROP TABLE IF EXISTS `Shift`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Shift` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `startTime` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `endTime` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `breakMinutes` int NOT NULL DEFAULT '0',
  `color` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '#6b7280',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Shift`
--

LOCK TABLES `Shift` WRITE;
/*!40000 ALTER TABLE `Shift` DISABLE KEYS */;
/*!40000 ALTER TABLE `Shift` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ShiftSwap`
--

DROP TABLE IF EXISTS `ShiftSwap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ShiftSwap` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `requesterId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `receiverId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fromScheduleId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `toScheduleId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `desiredDate` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reason` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `reviewedAt` datetime(3) DEFAULT NULL,
  `reviewerId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ShiftSwap_requesterId_fkey` (`requesterId`),
  KEY `ShiftSwap_receiverId_fkey` (`receiverId`),
  KEY `ShiftSwap_fromScheduleId_fkey` (`fromScheduleId`),
  KEY `ShiftSwap_toScheduleId_fkey` (`toScheduleId`),
  CONSTRAINT `ShiftSwap_fromScheduleId_fkey` FOREIGN KEY (`fromScheduleId`) REFERENCES `Schedule` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `ShiftSwap_receiverId_fkey` FOREIGN KEY (`receiverId`) REFERENCES `Employee` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `ShiftSwap_requesterId_fkey` FOREIGN KEY (`requesterId`) REFERENCES `Employee` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `ShiftSwap_toScheduleId_fkey` FOREIGN KEY (`toScheduleId`) REFERENCES `Schedule` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ShiftSwap`
--

LOCK TABLES `ShiftSwap` WRITE;
/*!40000 ALTER TABLE `ShiftSwap` DISABLE KEYS */;
/*!40000 ALTER TABLE `ShiftSwap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `StockCount`
--

DROP TABLE IF EXISTS `StockCount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `StockCount` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `scNumber` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `warehouseId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `countDate` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'draft',
  `countedBy` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approvedBy` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approvedAt` datetime(3) DEFAULT NULL,
  `notes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `StockCount_scNumber_key` (`scNumber`),
  KEY `StockCount_warehouseId_fkey` (`warehouseId`),
  CONSTRAINT `StockCount_warehouseId_fkey` FOREIGN KEY (`warehouseId`) REFERENCES `Warehouse` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `StockCount`
--

LOCK TABLES `StockCount` WRITE;
/*!40000 ALTER TABLE `StockCount` DISABLE KEYS */;
/*!40000 ALTER TABLE `StockCount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `StockCountItem`
--

DROP TABLE IF EXISTS `StockCountItem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `StockCountItem` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stockCountId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `materialCode` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `materialName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `systemQuantity` double NOT NULL,
  `countedQuantity` double NOT NULL,
  `difference` double NOT NULL DEFAULT '0',
  `reason` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `adjusted` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `StockCountItem_stockCountId_fkey` (`stockCountId`),
  CONSTRAINT `StockCountItem_stockCountId_fkey` FOREIGN KEY (`stockCountId`) REFERENCES `StockCount` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `StockCountItem`
--

LOCK TABLES `StockCountItem` WRITE;
/*!40000 ALTER TABLE `StockCountItem` DISABLE KEYS */;
/*!40000 ALTER TABLE `StockCountItem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `StorageLocation`
--

DROP TABLE IF EXISTS `StorageLocation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `StorageLocation` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `warehouseId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `aisle` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rack` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bin` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `StorageLocation_code_key` (`code`),
  KEY `StorageLocation_warehouseId_fkey` (`warehouseId`),
  CONSTRAINT `StorageLocation_warehouseId_fkey` FOREIGN KEY (`warehouseId`) REFERENCES `Warehouse` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `StorageLocation`
--

LOCK TABLES `StorageLocation` WRITE;
/*!40000 ALTER TABLE `StorageLocation` DISABLE KEYS */;
/*!40000 ALTER TABLE `StorageLocation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Supplier`
--

DROP TABLE IF EXISTS `Supplier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Supplier` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contactPerson` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `taxId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Supplier_code_key` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Supplier`
--

LOCK TABLES `Supplier` WRITE;
/*!40000 ALTER TABLE `Supplier` DISABLE KEYS */;
/*!40000 ALTER TABLE `Supplier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `passwordHash` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fullName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('EXECUTIVE','DIVISION_HEAD','DEPT_HEAD','SUPERVISOR','OPERATOR','GENERAL_WORKER','ADMIN') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'GENERAL_WORKER',
  `department` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `division` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `employeeId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `lastLoginAt` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_username_key` (`username`),
  UNIQUE KEY `User_email_key` (`email`),
  UNIQUE KEY `User_employeeId_key` (`employeeId`),
  CONSTRAINT `User_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Warehouse`
--

DROP TABLE IF EXISTS `Warehouse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Warehouse` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `location` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Warehouse_code_key` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Warehouse`
--

LOCK TABLES `Warehouse` WRITE;
/*!40000 ALTER TABLE `Warehouse` DISABLE KEYS */;
/*!40000 ALTER TABLE `Warehouse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `WarehouseLocationRef`
--

DROP TABLE IF EXISTS `WarehouseLocationRef`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `WarehouseLocationRef` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `note` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `WarehouseLocationRef`
--

LOCK TABLES `WarehouseLocationRef` WRITE;
/*!40000 ALTER TABLE `WarehouseLocationRef` DISABLE KEYS */;
/*!40000 ALTER TABLE `WarehouseLocationRef` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('f3e9a184-cfb7-4994-9949-f8a09d12a845','fa48c9b2edff286dbaeded7f4c4079046a3fa52d094aba8c541a7c99b27637cf','2026-10-29 02:49:33.083','20261029024619_init_mysql',NULL,NULL,'2026-10-29 02:49:31.136',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-10-29 12:57:13
