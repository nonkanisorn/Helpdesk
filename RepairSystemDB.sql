-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 10, 2024 at 10:40 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `RepairSystemDB`
--

-- --------------------------------------------------------

--
-- Table structure for table `Cases`
--

CREATE TABLE `Cases` (
  `case_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `technician_id` int(11) DEFAULT NULL,
  `manager_id` int(11) DEFAULT NULL,
  `status_id` int(11) NOT NULL,
  `case_title` varchar(255) DEFAULT NULL,
  `case_detail` varchar(255) NOT NULL,
  `case_resolution` varchar(255) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `closed_date` timestamp NULL DEFAULT NULL,
  `assigned_date` timestamp NULL DEFAULT NULL,
  `completed_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Cases`
--

INSERT INTO `Cases` (`case_id`, `user_id`, `technician_id`, `manager_id`, `status_id`, `case_title`, `case_detail`, `case_resolution`, `created_date`, `closed_date`, `assigned_date`, `completed_date`) VALUES
(102, 3, 5, 7, 1, 'testuser1', 'testuser1detail', 'teact', '2024-08-30 11:08:55', '2024-08-30 04:50:41', '2024-08-30 04:09:48', '2024-08-30 11:10:12'),
(103, 2, 5, 7, 2, '1234', '1234', NULL, '2024-09-04 20:19:45', NULL, '2024-09-04 13:43:49', NULL),
(104, 2, 5, 7, 3, 'testsystemtopic', 'testsystemdetail', 'ทำงานเสร็จแล้ว', '2024-09-04 20:38:26', '2024-09-04 13:41:57', '2024-09-04 13:39:15', '2024-09-04 20:39:52');

-- --------------------------------------------------------

--
-- Table structure for table `Department`
--

CREATE TABLE `Department` (
  `dep_id` int(11) NOT NULL,
  `dep_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Department`
--

INSERT INTO `Department` (`dep_id`, `dep_name`) VALUES
(1, 'IT'),
(2, 'd');

-- --------------------------------------------------------

--
-- Table structure for table `Device`
--

CREATE TABLE `Device` (
  `dev_id` int(11) NOT NULL,
  `dev_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Device`
--

INSERT INTO `Device` (`dev_id`, `dev_name`) VALUES
(1, 'คอม');

-- --------------------------------------------------------

--
-- Table structure for table `Role`
--

CREATE TABLE `Role` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Role`
--

INSERT INTO `Role` (`role_id`, `role_name`) VALUES
(1, 'admin'),
(2, 'manager'),
(3, 'technician'),
(4, 'user'),
(7, 'test');

-- --------------------------------------------------------

--
-- Table structure for table `Status`
--

CREATE TABLE `Status` (
  `status_id` int(11) NOT NULL,
  `status_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Status`
--

INSERT INTO `Status` (`status_id`, `status_name`) VALUES
(1, 'รอดำเนินการ'),
(2, 'กำลังดำเนินการ'),
(3, 'เสร็จสิ้น'),
(4, 'รอการยืนยัน');

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `users_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `userpassword` varchar(255) NOT NULL,
  `role_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `user_phone` varchar(255) DEFAULT NULL,
  `user_img` longblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`users_id`, `username`, `userpassword`, `role_id`, `name`, `user_email`, `user_phone`, `user_img`) VALUES
(1, 'admin', '$2b$10$pRwQFHBPbhFE7Ds02MWA7eLkvKjuDs9Rt7KAEug8MPPXybkYnlcNK', 1, 'adminName', NULL, NULL, NULL),
(2, 'user', '$2b$10$dXDtSj97jLmhRf3JdZxjzOAVzsXURP2osznT2y.MN.g4ta/6E3BuG', 4, 'userName', NULL, NULL, NULL),
(3, 'user1', '$2b$10$/EQziLUjZq.oDouXDvZoauW5oxWV2HcloR6n8nAtb7qG3KodVcGMa', 4, 'user1Name', NULL, NULL, NULL),
(5, 'tech', '$2b$10$grpyblR06fT9Ranr2g2PB.7eNtfRbsAULaF.sXm44chbhk9b2nCdu', 3, 'techName', NULL, NULL, NULL),
(6, 'tech1', '$2b$10$Pj5ZBudN2oaabbojHWAa7.Uhf2hxjSm8sPAbiQi2fuDefUYgYUZZC', 3, 'tech1Name', NULL, NULL, NULL),
(7, 'manager', '$2b$10$N9mgspG60gp8poKgjUdETuV2A14BS2u/lRM0pNB9/sEAS42HyQh8a', 2, 'managerName', NULL, NULL, NULL),
(8, 'manager1', '$2b$10$o2C84jTS8ypCctpt7EOI3.9HyA2sCla5bL8Er8KnZmNfMKzB9mr0G', 2, 'manager1Name', NULL, NULL, NULL),
(9, '13', '$2b$10$iaIr.d6ijgaM8YD2BCM5geYzu.57PHR9VltAoxTQD9qzTB3K0kEy.', 1, '23', NULL, NULL, NULL),
(10, '31', '$2b$10$ZhtLTvCURGLcN1HQ//IRN.LSQSiTKLFU6Kyno.NFntIwXZhCtLgMe', 1, '34', NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Cases`
--
ALTER TABLE `Cases`
  ADD PRIMARY KEY (`case_id`),
  ADD KEY `technician` (`technician_id`),
  ADD KEY `user` (`user_id`),
  ADD KEY `manager` (`manager_id`),
  ADD KEY `status` (`status_id`);

--
-- Indexes for table `Department`
--
ALTER TABLE `Department`
  ADD PRIMARY KEY (`dep_id`);

--
-- Indexes for table `Device`
--
ALTER TABLE `Device`
  ADD PRIMARY KEY (`dev_id`);

--
-- Indexes for table `Role`
--
ALTER TABLE `Role`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `Status`
--
ALTER TABLE `Status`
  ADD PRIMARY KEY (`status_id`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`users_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `role` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Cases`
--
ALTER TABLE `Cases`
  MODIFY `case_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT for table `Department`
--
ALTER TABLE `Department`
  MODIFY `dep_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Device`
--
ALTER TABLE `Device`
  MODIFY `dev_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Role`
--
ALTER TABLE `Role`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `Status`
--
ALTER TABLE `Status`
  MODIFY `status_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `users_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Cases`
--
ALTER TABLE `Cases`
  ADD CONSTRAINT `manager` FOREIGN KEY (`manager_id`) REFERENCES `Users` (`users_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `status` FOREIGN KEY (`status_id`) REFERENCES `Status` (`status_id`),
  ADD CONSTRAINT `technician` FOREIGN KEY (`technician_id`) REFERENCES `Users` (`users_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user` FOREIGN KEY (`user_id`) REFERENCES `Users` (`users_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Users`
--
ALTER TABLE `Users`
  ADD CONSTRAINT `role` FOREIGN KEY (`role_id`) REFERENCES `Role` (`role_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
