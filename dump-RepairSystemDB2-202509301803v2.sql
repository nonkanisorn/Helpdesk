/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-12.0.2-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: RepairSystemDB2
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
  `closed_date` timestamp NULL DEFAULT NULL,
  `assigned_date` timestamp NULL DEFAULT NULL,
  `work_completed_date` datetime DEFAULT NULL,
  `categories_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`case_id`),
  KEY `technician` (`technician_id`),
  KEY `user` (`user_id`),
  KEY `manager` (`manager_id`),
  KEY `status` (`status_id`),
  KEY `case_device_id` (`case_device_id`),
  KEY `Cases_Categoriesdevice_FK` (`categories_id`),
  CONSTRAINT `Cases_Categoriesdevice_FK` FOREIGN KEY (`categories_id`) REFERENCES `Issuecategory` (`Issusecategory_id`),
  CONSTRAINT `case_device_id` FOREIGN KEY (`case_device_id`) REFERENCES `Device` (`dev_id`),
  CONSTRAINT `manager` FOREIGN KEY (`manager_id`) REFERENCES `Users` (`users_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `status` FOREIGN KEY (`status_id`) REFERENCES `Status` (`status_id`),
  CONSTRAINT `technician` FOREIGN KEY (`technician_id`) REFERENCES `Users` (`users_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user` FOREIGN KEY (`user_id`) REFERENCES `Users` (`users_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cases`
--

LOCK TABLES `Cases` WRITE;
/*!40000 ALTER TABLE `Cases` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `Cases` VALUES
(35,10,11,12,6,'พพพ','พพพพ',2,'tttt','2025-09-04 13:37:05','2025-09-04 06:39:42','2025-09-04 06:38:05','2025-09-04 13:39:21',1),
(36,10,NULL,NULL,1,'dasd','asdasdas',NULL,NULL,'2025-09-04 14:04:36',NULL,NULL,NULL,1),
(37,10,11,12,2,'กฟหกหฟ','กฟหกฟห',NULL,NULL,'2025-09-04 23:20:53',NULL,'2025-09-04 16:22:23',NULL,1),
(38,10,NULL,NULL,1,'test1','test1',NULL,NULL,'2025-09-04 23:42:50',NULL,NULL,NULL,1),
(39,10,NULL,NULL,1,'dasdas','das',NULL,NULL,'2025-09-04 23:44:52',NULL,NULL,NULL,1),
(40,10,NULL,NULL,1,'คอมเปิดไม่ติด','คอมเปิดไม่ติด',NULL,NULL,'2025-09-04 23:47:20',NULL,NULL,NULL,1),
(41,10,11,12,6,'หัวข้อคอมพัง','คอมพัง',2,'1sad','2025-09-04 23:48:06','2025-09-04 16:53:48','2025-09-04 16:50:38','2025-09-04 23:53:39',1),
(42,10,NULL,NULL,1,'dasda','dasdas',NULL,NULL,'2025-09-05 00:11:16',NULL,NULL,NULL,1),
(43,10,NULL,NULL,1,'กฟห','กฟห',NULL,NULL,'2025-09-07 11:32:36',NULL,NULL,NULL,1);
/*!40000 ALTER TABLE `Cases` ENABLE KEYS */;
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
-- Table structure for table `Device`
--

DROP TABLE IF EXISTS `Device`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Device` (
  `dev_id` int(11) NOT NULL AUTO_INCREMENT,
  `dev_name` varchar(255) NOT NULL,
  PRIMARY KEY (`dev_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Device`
--

LOCK TABLES `Device` WRITE;
/*!40000 ALTER TABLE `Device` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `Device` VALUES
(1,'คอมพิวเตอร์-1'),
(2,'ปริ้นเตอร์'),
(3,'คอมพิวเตอร์-2'),
(4,'คอมพิวเตอร์-3');
/*!40000 ALTER TABLE `Device` ENABLE KEYS */;
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
  CONSTRAINT `Historyrepair_Device_FK` FOREIGN KEY (`device_id`) REFERENCES `Device` (`dev_id`),
  CONSTRAINT `Historyrepair_Status_FK` FOREIGN KEY (`status_from`) REFERENCES `Status` (`status_id`),
  CONSTRAINT `Historyrepair_Status_FK_1` FOREIGN KEY (`status_to`) REFERENCES `Status` (`status_id`),
  CONSTRAINT `Historyrepair_Users_FK` FOREIGN KEY (`actor_id`) REFERENCES `Users` (`users_id`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Historyrepair`
--

LOCK TABLES `Historyrepair` WRITE;
/*!40000 ALTER TABLE `Historyrepair` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `Historyrepair` VALUES
(56,35,NULL,10,NULL,1,'created','2025-09-04 13:37:05'),
(57,35,NULL,12,1,2,'assigned','2025-09-04 13:38:05'),
(58,35,2,11,2,3,'technician_complete','2025-09-04 13:39:21'),
(59,35,2,10,3,6,'user_confirmed','2025-09-04 13:39:42'),
(60,36,NULL,10,NULL,1,'created','2025-09-04 14:04:36'),
(61,37,NULL,10,NULL,1,'created','2025-09-04 23:20:53'),
(62,37,NULL,12,1,2,'assigned','2025-09-04 23:22:23'),
(63,38,NULL,10,NULL,1,'created','2025-09-04 23:42:50'),
(64,39,NULL,10,NULL,1,'created','2025-09-04 23:44:52'),
(65,40,NULL,10,NULL,1,'created','2025-09-04 23:47:20'),
(66,41,NULL,10,NULL,1,'created','2025-09-04 23:48:06'),
(67,41,NULL,12,1,2,'assigned','2025-09-04 23:50:38'),
(68,41,2,11,2,3,'technician_complete','2025-09-04 23:53:39'),
(69,41,2,10,3,6,'user_confirmed','2025-09-04 23:53:48'),
(70,42,NULL,10,NULL,1,'created','2025-09-05 00:11:16'),
(71,43,NULL,10,NULL,1,'created','2025-09-07 11:32:36');
/*!40000 ALTER TABLE `Historyrepair` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `Issuecategory`
--

DROP TABLE IF EXISTS `Issuecategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Issuecategory` (
  `Issusecategory_id` int(11) NOT NULL AUTO_INCREMENT,
  `Issuecategory_name` varchar(255) NOT NULL,
  PRIMARY KEY (`Issusecategory_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Issuecategory`
--

LOCK TABLES `Issuecategory` WRITE;
/*!40000 ALTER TABLE `Issuecategory` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `Issuecategory` VALUES
(1,'คอม');
/*!40000 ALTER TABLE `Issuecategory` ENABLE KEYS */;
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
-- Table structure for table `deviceinfo`
--

DROP TABLE IF EXISTS `deviceinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `deviceinfo` (
  `deviceinfo_id` int(11) NOT NULL AUTO_INCREMENT,
  `deviceinfo_detail` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`deviceinfo_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deviceinfo`
--

LOCK TABLES `deviceinfo` WRITE;
/*!40000 ALTER TABLE `deviceinfo` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `deviceinfo` VALUES
(1,'lenovo 5560 ram 128 '),
(2,'acer 66555 ram 256');
/*!40000 ALTER TABLE `deviceinfo` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `devicenumber`
--

DROP TABLE IF EXISTS `devicenumber`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `devicenumber` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `device_number` int(11) DEFAULT NULL,
  `device_serial` varchar(100) DEFAULT NULL,
  `device_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `devicenumber_unique` (`device_number`),
  KEY `devicenumber_deviceinfo_FK` (`device_id`),
  CONSTRAINT `devicenumber_deviceinfo_FK` FOREIGN KEY (`device_id`) REFERENCES `deviceinfo` (`deviceinfo_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devicenumber`
--

LOCK TABLES `devicenumber` WRITE;
/*!40000 ALTER TABLE `devicenumber` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `devicenumber` VALUES
(1,1,'sx2222',1),
(2,2,'sx2345',1),
(3,3,'ac2222',2),
(4,4,'ac22343',2),
(5,5,'sx231231',1);
/*!40000 ALTER TABLE `devicenumber` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Dumping routines for database 'RepairSystemDB2'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2025-09-30 18:03:12
