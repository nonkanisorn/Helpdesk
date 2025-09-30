/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-12.0.2-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: RepairSystemDB
-- ------------------------------------------------------
-- Server version	12.0.2-MariaDB

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
-- Table structure for table `Cases`
--

DROP TABLE IF EXISTS `Cases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Cases` (
  `case_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `technician_id` int(11) DEFAULT NULL,
  `manager_id` int(11) DEFAULT NULL,
  `status_id` int(11) NOT NULL,
  `case_title` varchar(255) DEFAULT NULL,
  `case_detail` varchar(255) NOT NULL,
  `case_device_id` int(11) DEFAULT NULL,
  `case_resolution` varchar(255) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `assigned_date` timestamp NULL DEFAULT NULL,
  `closed_date` timestamp NULL DEFAULT NULL,
  `work_completed_date` datetime DEFAULT NULL,
  `categories_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`case_id`),
  KEY `technician` (`technician_id`),
  KEY `user` (`user_id`),
  KEY `manager` (`manager_id`),
  KEY `status` (`status_id`),
  KEY `case_device_id` (`case_device_id`),
  KEY `Cases_Categoriesdevice_FK` (`categories_id`),
  CONSTRAINT `Cases_Categoriesdevice_FK` FOREIGN KEY (`categories_id`) REFERENCES `Categoriesdevice` (`categories_id`),
  CONSTRAINT `case_device_id` FOREIGN KEY (`case_device_id`) REFERENCES `Devices` (`dev_id`),
  CONSTRAINT `manager` FOREIGN KEY (`manager_id`) REFERENCES `Users` (`users_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `status` FOREIGN KEY (`status_id`) REFERENCES `Status` (`status_id`),
  CONSTRAINT `technician` FOREIGN KEY (`technician_id`) REFERENCES `Users` (`users_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user` FOREIGN KEY (`user_id`) REFERENCES `Users` (`users_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cases`
--

LOCK TABLES `Cases` WRITE;
/*!40000 ALTER TABLE `Cases` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `Cases` VALUES
(50,10,11,12,4,'test1','test1',NULL,NULL,'2025-09-07 12:23:16','2025-09-07 05:23:25','2025-09-07 05:24:07',NULL,1),
(51,10,11,12,5,'test','test',2,'testt','2025-09-07 14:01:28','2025-09-07 07:02:10','2025-09-07 07:03:29','2025-09-07 14:03:02',1),
(52,10,11,12,5,'test','dddd',3,'321','2025-09-13 00:00:28','2025-09-12 17:01:31',NULL,'2025-09-13 00:03:24',1),
(53,10,NULL,NULL,1,'dsad','dasdasd',NULL,NULL,'2025-09-16 17:15:09',NULL,NULL,NULL,2),
(54,10,NULL,NULL,6,'dasd','asdas',NULL,NULL,'2025-09-16 17:15:20',NULL,NULL,NULL,2),
(55,10,11,12,5,'testtt','testtt',3,'dsaasd','2025-09-16 20:38:52','2025-09-16 13:38:59','2025-09-16 13:39:26','2025-09-16 20:39:13',1);
/*!40000 ALTER TABLE `Cases` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `Categoriesdevice`
--

DROP TABLE IF EXISTS `Categoriesdevice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Categoriesdevice` (
  `categories_id` int(11) NOT NULL AUTO_INCREMENT,
  `categories_name` varchar(255) NOT NULL,
  PRIMARY KEY (`categories_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Categoriesdevice`
--

LOCK TABLES `Categoriesdevice` WRITE;
/*!40000 ALTER TABLE `Categoriesdevice` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `Categoriesdevice` VALUES
(1,'คอมพิวเตอร์'),
(2,'โปรเจคเตอร์'),
(3,'อินเทอร์เน็ต'),
(4,'อื่นๆ');
/*!40000 ALTER TABLE `Categoriesdevice` ENABLE KEYS */;
UNLOCK TABLES;
commit;

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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Department`
--

LOCK TABLES `Department` WRITE;
/*!40000 ALTER TABLE `Department` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `Department` VALUES
(1,'ไอที'),
(2,'บัญชี');
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
  `device_number` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`instance_id`),
  UNIQUE KEY `DeviceInstances_UNIQUE` (`serial_number`),
  KEY `DeviceInstances_Device_FK` (`device_id`),
  CONSTRAINT `DeviceInstances_Device_FK` FOREIGN KEY (`device_id`) REFERENCES `Devices` (`dev_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DeviceInstances`
--

LOCK TABLES `DeviceInstances` WRITE;
/*!40000 ALTER TABLE `DeviceInstances` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `DeviceInstances` VALUES
(1,2,'CNBX123456','1'),
(3,2,'TH1234ABC5','2'),
(4,1,'KR9XYZ5678','1'),
(5,1,'ABC123XYZ789','2'),
(6,1,'SN12345678QW','3');
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
  PRIMARY KEY (`dev_id`),
  KEY `Devices_DeviceType_FK` (`dev_type`),
  CONSTRAINT `Devices_DeviceType_FK` FOREIGN KEY (`dev_type`) REFERENCES `Devicetype` (`devicetype_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Devices`
--

LOCK TABLES `Devices` WRITE;
/*!40000 ALTER TABLE `Devices` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `Devices` VALUES
(1,'Asus Gaming V16 V3607VM-RP524W Black',1),
(2,'HP Inkjet Advantage 2875 ',2),
(3,'Epson Ink Tank L3250',2),
(4,'LENOVO DESKTOP AIO 24IRH9-F0HN00Q1TA Grey',3),
(5,'ACER DESKTOP AIO Aspire C24-2G-R516G0T23Mi/T001 Black',3),
(6,'Microsoft Surface Laptop 7 13 inch Pls/16/256 Win11 Platinum',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Devicetype`
--

LOCK TABLES `Devicetype` WRITE;
/*!40000 ALTER TABLE `Devicetype` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `Devicetype` VALUES
(1,'Notebook'),
(2,'Printer'),
(3,'PC'),
(4,'Monitor'),
(6,'dsadsa');
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
  `case_id` int(11) DEFAULT NULL,
  `device_id` int(11) DEFAULT NULL,
  `actor_id` int(11) DEFAULT NULL,
  `status_from` int(11) DEFAULT NULL,
  `status_to` int(11) DEFAULT NULL,
  `event_type` varchar(100) DEFAULT NULL,
  `occurred_at` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`history_id`),
  KEY `Historyrepair_Cases_FK` (`case_id`),
  KEY `Historyrepair_Device_FK` (`device_id`),
  KEY `Historyrepair_Users_FK` (`actor_id`),
  KEY `Historyrepair_Status_FK` (`status_from`),
  KEY `Historyrepair_Status_FK_1` (`status_to`),
  CONSTRAINT `Historyrepair_Cases_FK` FOREIGN KEY (`case_id`) REFERENCES `Cases` (`case_id`),
  CONSTRAINT `Historyrepair_Device_FK` FOREIGN KEY (`device_id`) REFERENCES `Devices` (`dev_id`),
  CONSTRAINT `Historyrepair_Status_FK` FOREIGN KEY (`status_from`) REFERENCES `Status` (`status_id`),
  CONSTRAINT `Historyrepair_Status_FK_1` FOREIGN KEY (`status_to`) REFERENCES `Status` (`status_id`),
  CONSTRAINT `Historyrepair_Users_FK` FOREIGN KEY (`actor_id`) REFERENCES `Users` (`users_id`)
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Historyrepair`
--

LOCK TABLES `Historyrepair` WRITE;
/*!40000 ALTER TABLE `Historyrepair` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `Historyrepair` VALUES
(87,50,NULL,10,NULL,1,'created','2025-09-07 12:23:16'),
(88,50,NULL,12,1,2,'assigned','2025-09-07 12:23:25'),
(89,51,NULL,10,NULL,1,'created','2025-09-07 14:01:28'),
(90,51,NULL,12,1,2,'assigned','2025-09-07 14:02:10'),
(91,51,2,11,2,3,'technician_complete','2025-09-07 14:03:02'),
(92,51,2,10,3,6,'user_confirmed','2025-09-07 14:03:29'),
(93,52,NULL,10,NULL,1,'created','2025-09-13 00:00:28'),
(94,52,NULL,12,1,2,'assigned','2025-09-13 00:00:53'),
(95,52,NULL,12,2,2,'assigned','2025-09-13 00:01:18'),
(96,52,NULL,12,2,3,'assigned','2025-09-13 00:01:22'),
(97,52,NULL,12,3,2,'assigned','2025-09-13 00:01:31'),
(98,52,3,11,2,3,'technician_complete','2025-09-13 00:03:24'),
(99,53,NULL,10,NULL,1,'created','2025-09-16 17:15:09'),
(100,54,NULL,10,NULL,1,'created','2025-09-16 17:15:20'),
(101,55,NULL,10,NULL,1,'created','2025-09-16 20:38:52'),
(102,55,NULL,12,1,2,'assigned','2025-09-16 20:38:59'),
(103,55,3,11,2,3,'technician_complete','2025-09-16 20:39:13'),
(104,55,3,10,3,6,'user_confirmed','2025-09-16 20:39:26');
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
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
(4,'user');
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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
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
(6,'เสร็จสิ้น');
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
  PRIMARY KEY (`users_id`),
  UNIQUE KEY `username` (`username`),
  KEY `role` (`role_id`),
  KEY `dep_id` (`dep_id`),
  CONSTRAINT `dep_id` FOREIGN KEY (`dep_id`) REFERENCES `Department` (`dep_id`),
  CONSTRAINT `role` FOREIGN KEY (`role_id`) REFERENCES `Role` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `Users` VALUES
(9,'admin','$2b$10$UFy5H861j6H5e5rs9x8m7.2jN49Z2WDNOjcW89COA4wfaogcS4c0q',1,'admin','admin@gmail.com','00000000',NULL,1),
(10,'user','$2b$10$SUm3Gcg31PClqMiJz.9bB.wV4OowK1lcbeNkL60V5XSN0rkWcSxl.',4,'user','user@gmail.com','111111111',NULL,2),
(11,'technician','$2b$10$XpOmjRlMPX7jn3mDziHBH.WHSp8tzxH.ozU2stUzGhBWn8cNkvQkS',3,'technician','technician@gmail.com','11111111',NULL,1),
(12,'manager','$2b$10$eKcOT1SmukMDZyJ//G3BrOPFawB0/2AW23vZXY3/kswqBF/La//qe',2,'manager','manager@gmail.com','123132131',NULL,1),
(13,'dasd','$2b$10$uxYpijyvFyVWUY8jgSMxQOqS0xkDWYkmU.YbGMVQb8yctocR5ml4e',2,'asdasd','asdsadasd','123123213',NULL,1);
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
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

-- Dump completed on 2025-09-30 18:02:02
