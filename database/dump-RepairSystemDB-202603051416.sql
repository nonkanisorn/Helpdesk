/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-12.1.2-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: RepairSystemDB
-- ------------------------------------------------------
-- Server version	12.1.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `Department`
--

DROP TABLE IF EXISTS `Department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Department` (
  `dep_id` int(11) NOT NULL AUTO_INCREMENT,
  `dep_name` varchar(255) NOT NULL,
  PRIMARY KEY (`dep_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Department`
--

LOCK TABLES `Department` WRITE;
/*!40000 ALTER TABLE `Department` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `Department` VALUES
(1,'ไอที'),
(2,'บัญชี'),
(3,'การตลาด'),
(4,'บริการลูกค้า'),
(15,'ทรัพยากรบุคคล');
/*!40000 ALTER TABLE `Department` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `DeviceInstances`
--

DROP TABLE IF EXISTS `DeviceInstances`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `DeviceInstances` (
  `instance_id` int(11) NOT NULL AUTO_INCREMENT,
  `device_id` int(11) DEFAULT NULL,
  `serial_number` varchar(100) NOT NULL,
  `device_number` int(11) DEFAULT NULL,
  `dep_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`instance_id`),
  UNIQUE KEY `DeviceInstances_UNIQUE` (`serial_number`),
  UNIQUE KEY `DeviceInstances_UNIQUE_1` (`device_number`,`device_id`),
  KEY `DeviceInstances_Device_FK` (`device_id`),
  KEY `DeviceInstances_Department_FK` (`dep_id`),
  CONSTRAINT `DeviceInstances_Department_FK` FOREIGN KEY (`dep_id`) REFERENCES `Department` (`dep_id`),
  CONSTRAINT `DeviceInstances_Device_FK` FOREIGN KEY (`device_id`) REFERENCES `Devices` (`dev_id`)
) ENGINE=InnoDB AUTO_INCREMENT=124 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DeviceInstances`
--

LOCK TABLES `DeviceInstances` WRITE;
/*!40000 ALTER TABLE `DeviceInstances` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `DeviceInstances` VALUES
(98,2,'ABC1234',1,2),
(99,NULL,'dsa',1,1),
(101,3,'dasdasd',1,1),
(102,3,'adsd',2,NULL),
(109,1,'NB-V3607VM-0001',1,1),
(115,1,'NB-V3607VM-0002',2,1),
(119,1,'NB-V3607VM-0003',3,1),
(120,5,'A!',1,1);
/*!40000 ALTER TABLE `DeviceInstances` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `Devices`
--

DROP TABLE IF EXISTS `Devices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Devices` (
  `dev_id` int(11) NOT NULL AUTO_INCREMENT,
  `dev_name` varchar(255) NOT NULL,
  `dev_type` int(11) DEFAULT NULL,
  `dev_detail` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`dev_id`),
  KEY `Devices_DeviceType_FK` (`dev_type`),
  CONSTRAINT `Devices_DeviceType_FK` FOREIGN KEY (`dev_type`) REFERENCES `Devicetype` (`devicetype_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Devices`
--

LOCK TABLES `Devices` WRITE;
/*!40000 ALTER TABLE `Devices` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `Devices` VALUES
(1,'Asus Gaming V16 V3607VM-RP524W Black',1,NULL),
(2,'HP Inkjet Advantage 2875 ',2,NULL),
(3,'Epson Ink Tank L3250',2,NULL),
(4,'LENOVO DESKTOP AIO 24IRH9-F0HN00Q1TA Grey',1,NULL),
(5,'ACER DESKTOP AIO Aspire C24-2G-R516G0T23Mi/T001 Black',1,NULL),
(6,'Microsoft Surface Laptop 7 13 inch Pls/16/256 Win11 Platinum',1,NULL),
(25,'NOTEBOOK (โน้ตบุ๊ค) ASUS VIVOBOOK GO 15 X1504GA-NJ322W (MIXED BLACK)',1,NULL),
(26,'NOTEBOOK (โน้ตบุ๊ค) ASUS VIVOBOOK GO 15 X1504GA-NJ322W (MIXED BLACK)',2,NULL);
/*!40000 ALTER TABLE `Devices` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `Devicetype`
--

DROP TABLE IF EXISTS `Devicetype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Devicetype` (
  `devicetype_id` int(11) NOT NULL AUTO_INCREMENT,
  `devicetype_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`devicetype_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Devicetype`
--

LOCK TABLES `Devicetype` WRITE;
/*!40000 ALTER TABLE `Devicetype` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `Devicetype` VALUES
(1,'Computer / Notebook'),
(2,'Printer / Scanner'),
(17,'Network / Internet');
/*!40000 ALTER TABLE `Devicetype` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `Historyrepair`
--

DROP TABLE IF EXISTS `Historyrepair`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Historyrepair` (
  `history_id` int(11) NOT NULL AUTO_INCREMENT,
  `ticket_id` int(11) DEFAULT NULL,
  `device_id` int(11) DEFAULT NULL,
  `actor_id` int(11) DEFAULT NULL,
  `status_from` int(11) DEFAULT NULL,
  `status_to` int(11) DEFAULT NULL,
  `event_type` varchar(100) DEFAULT NULL,
  `occurred_at` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`history_id`),
  KEY `Historyrepair_Cases_FK` (`ticket_id`),
  KEY `Historyrepair_Device_FK` (`device_id`),
  KEY `Historyrepair_Users_FK` (`actor_id`),
  KEY `Historyrepair_Status_FK` (`status_from`),
  KEY `Historyrepair_Status_FK_1` (`status_to`),
  CONSTRAINT `Historyrepair_Device_FK` FOREIGN KEY (`device_id`) REFERENCES `Devices` (`dev_id`),
  CONSTRAINT `Historyrepair_Status_FK` FOREIGN KEY (`status_from`) REFERENCES `Status` (`status_id`),
  CONSTRAINT `Historyrepair_Status_FK_1` FOREIGN KEY (`status_to`) REFERENCES `Status` (`status_id`),
  CONSTRAINT `Historyrepair_Users_FK` FOREIGN KEY (`actor_id`) REFERENCES `Users` (`users_id`)
) ENGINE=InnoDB AUTO_INCREMENT=200 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Historyrepair`
--

LOCK TABLES `Historyrepair` WRITE;
/*!40000 ALTER TABLE `Historyrepair` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `Historyrepair` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `Role`
--

DROP TABLE IF EXISTS `Role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Role` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Role`
--

LOCK TABLES `Role` WRITE;
/*!40000 ALTER TABLE `Role` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `Role` VALUES
(1,'admin'),
(2,'manager'),
(3,'technician'),
(4,'user'),
(14,'dsa');
/*!40000 ALTER TABLE `Role` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `Status`
--

DROP TABLE IF EXISTS `Status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Status` (
  `status_id` int(11) NOT NULL AUTO_INCREMENT,
  `status_name` varchar(255) NOT NULL,
  PRIMARY KEY (`status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Status`
--

LOCK TABLES `Status` WRITE;
/*!40000 ALTER TABLE `Status` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `Status` VALUES
(1,'รอการดำเนินการ'),
(2,'กำลังดำเนินการ'),
(3,'รอการยืนยันการซ่อม'),
(4,'รออะไหล่'),
(5,'เลยกำหนดเวลาซ่อม'),
(6,'เสร็จสิ้น'),
(7,'Open'),
(8,'Assigned'),
(9,'In Progress'),
(10,'Waiting'),
(11,'Closed');
/*!40000 ALTER TABLE `Status` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `users_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `userpassword` varchar(255) NOT NULL,
  `role_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `user_phone` varchar(255) DEFAULT NULL,
  `user_img` longblob DEFAULT NULL,
  `dep_id` int(11) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`users_id`),
  UNIQUE KEY `username` (`username`),
  KEY `role` (`role_id`),
  KEY `dep_id` (`dep_id`),
  CONSTRAINT `dep_id` FOREIGN KEY (`dep_id`) REFERENCES `Department` (`dep_id`),
  CONSTRAINT `role` FOREIGN KEY (`role_id`) REFERENCES `Role` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `Users` VALUES
(1,'admin','$2b$10$UFy5H861j6H5e5rs9x8m7.2jN49Z2WDNOjcW89COA4wfaogcS4c0q',1,'admin','admin@gmail.com','00000000',NULL,1,1),
(2,'user','$2b$10$SUm3Gcg31PClqMiJz.9bB.wV4OowK1lcbeNkL60V5XSN0rkWcSxl.',4,'user','user@gmail.com','111111111',NULL,2,1),
(3,'technician','$2b$10$XpOmjRlMPX7jn3mDziHBH.WHSp8tzxH.ozU2stUzGhBWn8cNkvQkS',3,'technician','technician@gmail.com','11111111',NULL,1,1),
(4,'manager','$2b$10$eKcOT1SmukMDZyJ//G3BrOPFawB0/2AW23vZXY3/kswqBF/La//qe',2,'manager','manager@gmail.com','123132131',NULL,1,1),
(5,'user001','$2b$10$bq967KeLJU9ysw2.yrJbDuRYpoKcgU0xjlEpobxYhoIwlCm2cATqa',4,'ถิระคุณ ไม้ทอง','tirakun@gmail.com','0987529178',NULL,2,1),
(6,'user002','$2b$10$AlzqqOjYRbIDFauWtYZSRezvHYXK/b9WGwTpKcwAp8ZeYuWY77RrW',4,'สรยุทธ สันติวงษ์','sorayut@gmail.com','0984556218',NULL,2,1),
(7,'manager001','$2b$10$X2gv1EXm4Gxzkckj.yTqGO2yLOKCWthy9S6uM94u2hBvsDlV627bm',2,'ฉันทกร ชัยศักดิ์','chatakorn@gmail.com','0882376918',NULL,1,1),
(8,'technician001','$2b$10$Z95zOaXFl/Llk.TtFj0eNuwyqDbvgVs.avtIM1QtQosUeWZPuE5Cu',3,'ธนพัฒน์ ศรีสว่างจันทร์','tanapat@gmail.com','0987384927',NULL,1,1),
(9,'technician002','$2b$10$ovGag7DwD/9v06QLmRphPeInOhc3gcm5Zm/ZzrRXlL3o3ZLj5fIay',3,'ไชยพศ ชาติพิภักดิ์','chaiyapot@gmail.com','0627839475',NULL,1,1),
(54,'testtttttt','$2b$10$1ZvQ6binCWVylZOTDUV46OQ5pUVic/FL.792iMjyQWJEDWRcP/tCG',14,'dsa1zzzzz','1','1',NULL,15,1);
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `issues_categories`
--

DROP TABLE IF EXISTS `issues_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `issues_categories` (
  `issues_categories_id` int(11) NOT NULL AUTO_INCREMENT,
  `issues_categories_name` varchar(255) NOT NULL,
  PRIMARY KEY (`issues_categories_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `issues_categories`
--

LOCK TABLES `issues_categories` WRITE;
/*!40000 ALTER TABLE `issues_categories` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `issues_categories` VALUES
(1,'Computer / Notebook'),
(2,'Printer / Scanner'),
(3,'Network / Internet'),
(4,'Software / Account');
/*!40000 ALTER TABLE `issues_categories` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `status` (
  `status_id` int(11) NOT NULL AUTO_INCREMENT,
  `status_name` varchar(255) NOT NULL,
  PRIMARY KEY (`status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=324 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `status` VALUES
(1,'Open'),
(2,'Assigned'),
(3,'In Progress'),
(4,'Waiting for User Confirmation'),
(5,'Closed'),
(6,'Waiting for Part');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `tickets`
--

DROP TABLE IF EXISTS `tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tickets` (
  `ticket_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `technician_id` int(11) DEFAULT NULL,
  `manager_id` int(11) DEFAULT NULL,
  `status_id` int(11) NOT NULL,
  `issues_categories_id` int(11) DEFAULT NULL,
  `instance_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) NOT NULL,
  `ticket_resolution` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `assigned_at` datetime DEFAULT NULL,
  `started_at` datetime DEFAULT NULL,
  `work_completed_at` datetime DEFAULT NULL,
  `closed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`ticket_id`),
  KEY `Cases_Categoriesdevice_FK` (`issues_categories_id`) USING BTREE,
  KEY `Cases_DeviceInstances_FK` (`instance_id`) USING BTREE,
  KEY `manager` (`manager_id`) USING BTREE,
  KEY `status` (`status_id`) USING BTREE,
  KEY `technician` (`technician_id`) USING BTREE,
  KEY `user` (`user_id`) USING BTREE,
  CONSTRAINT `Cases_Categoriesdevice_FK_copy` FOREIGN KEY (`issues_categories_id`) REFERENCES `issues_categories` (`issues_categories_id`),
  CONSTRAINT `Cases_DeviceInstances_FK_copy` FOREIGN KEY (`instance_id`) REFERENCES `DeviceInstances` (`instance_id`),
  CONSTRAINT `manager_copy` FOREIGN KEY (`manager_id`) REFERENCES `Users` (`users_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `technician_copy` FOREIGN KEY (`technician_id`) REFERENCES `Users` (`users_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tickets_status_FK` FOREIGN KEY (`status_id`) REFERENCES `status` (`status_id`),
  CONSTRAINT `user_copy` FOREIGN KEY (`user_id`) REFERENCES `Users` (`users_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tickets`
--

LOCK TABLES `tickets` WRITE;
/*!40000 ALTER TABLE `tickets` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `tickets` VALUES
(12,5,8,4,4,1,98,'คอมพิวเตอร์เปิดไม่ติด','คอมพิวเตอร์เปิดไม่ติด กดปุ่มเปิดแล้วไม่มีอะไรเกิดขึ้น','adsdas','2026-03-01 11:08:23','2026-03-01 11:10:12','2026-03-01 12:08:42','2026-03-01 12:08:47','2026-03-01 11:16:53'),
(13,5,8,7,3,2,NULL,'ปริ้นงานไม่ได้','ปริ้นงานไม่ได้',NULL,'2026-03-01 11:31:49','2026-03-01 11:41:46','2026-03-01 11:42:16',NULL,NULL),
(14,5,8,7,5,1,98,'คอมจอฟ้า','คอมจอฟ้า','เปลี่ยนRAM','2026-03-01 12:29:33','2026-03-01 12:29:55','2026-03-01 12:30:46','2026-03-01 12:31:51','2026-03-01 19:01:34'),
(15,5,8,7,5,1,109,'คอมเปิดไม่ติด','คอมเปิดไม่ติด','เปลี่ยนสาย PSU','2026-03-01 18:08:40','2026-03-01 18:09:00','2026-03-01 18:09:14','2026-03-01 18:10:35','2026-03-01 19:01:20'),
(20,5,NULL,NULL,1,1,NULL,'คอมจอฟ้า','คอมจอฟ้า',NULL,'2026-03-01 19:52:27',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `tickets` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Dumping routines for database 'RepairSystemDB'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2026-03-05 14:16:45
