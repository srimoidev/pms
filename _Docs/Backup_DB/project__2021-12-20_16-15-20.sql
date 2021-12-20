-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 20, 2021 at 04:15 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project`
--

-- --------------------------------------------------------

--
-- Table structure for table `app_environments`
--

CREATE TABLE `app_environments` (
  `EnvID` int(11) NOT NULL,
  `EnvName` varchar(255) NOT NULL,
  `EnvValue` varchar(255) NOT NULL,
  `CreatedBy` int(11) NOT NULL,
  `CreatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int(11) NOT NULL,
  `UpdatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `app_environments`
--

INSERT INTO `app_environments` (`EnvID`, `EnvName`, `EnvValue`, `CreatedBy`, `CreatedTime`, `UpdatedBy`, `UpdatedTime`) VALUES
(1, 'FormFirstRequire', '26', 0, '2021-10-13 04:57:54', 0, '2021-10-13 04:58:19');

-- --------------------------------------------------------

--
-- Table structure for table `app_menus`
--

CREATE TABLE `app_menus` (
  `id` int(11) NOT NULL,
  `MenuID` int(11) NOT NULL,
  `ParentID` int(11) NOT NULL,
  `Sequence` int(11) NOT NULL,
  `MenuName` varchar(255) DEFAULT NULL,
  `Icon` varchar(255) DEFAULT NULL,
  `IconAlt` varchar(255) DEFAULT NULL,
  `CreatedBy` int(11) DEFAULT NULL,
  `CreatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `app_menus`
--

INSERT INTO `app_menus` (`id`, `MenuID`, `ParentID`, `Sequence`, `MenuName`, `Icon`, `IconAlt`, `CreatedBy`, `CreatedTime`, `UpdatedBy`, `UpdatedTime`) VALUES
(1, 1, 0, 1, 'ภาพรวม', 'mdi-chart-bar', '', NULL, '2021-12-10 12:30:52', NULL, '2021-12-10 12:30:52'),
(2, 2, 0, 2, 'โครงงาน', 'mdi-clipboard-file-outline', '', NULL, '2021-12-10 12:30:52', NULL, '2021-12-10 12:30:52'),
(3, 3, 0, 4, 'เอกสาร', 'mdi-file-document-multiple-outline', '', NULL, '2021-12-10 12:30:52', NULL, '2021-12-10 12:30:52'),
(4, 4, 0, 6, 'คู่มือการทำโครงงาน', 'mdi-file-download-outline', '', NULL, '2021-12-10 12:30:52', NULL, '2021-12-10 12:30:52'),
(5, 5, 0, 7, 'จัดการทรัพยากร', 'mdi-group', '', NULL, '2021-12-10 12:30:52', NULL, '2021-12-10 12:30:52'),
(6, 6, 0, 3, 'โครงงานทั้งหมด', 'mdi-account-box-multiple-outline', '', NULL, '2021-12-10 12:30:52', NULL, '2021-12-10 12:30:52'),
(7, 7, 0, 9, 'นัดหมาย', 'mdi-calendar-clock', '', NULL, '2021-12-10 12:30:52', NULL, '2021-12-10 12:30:52'),
(8, 8, 0, 10, 'บันทึกความก้าวหน้า', '', '', NULL, '2021-12-10 12:30:52', NULL, '2021-12-10 12:30:52'),
(9, 9, 0, 11, 'ที่ปรึกษาโครงงาน', 'mdi-group', '', NULL, '2021-12-10 12:30:52', NULL, '2021-12-10 12:30:52'),
(10, 10, 0, 12, 'กรรมการสอบ', 'mdi-notebook-check-outline', '', NULL, '2021-12-10 12:30:52', NULL, '2021-12-10 12:30:52'),
(11, 11, 0, 13, 'จัดการผู้ใช้', 'mdi-group', '', NULL, '2021-12-10 12:30:52', NULL, '2021-12-10 12:30:52'),
(12, 100, 0, 5, 'อาจารย์ที่ปรึกษา', 'mdi-chevron-up', 'mdi-chevron-down', NULL, '2021-12-10 12:30:52', NULL, '2021-12-10 12:30:52'),
(13, 101, 100, 1, 'ขออนุมัติเป็นที่ปรึกษา', 'mdi-file-document-edit-outline', '', NULL, '2021-12-10 12:30:52', NULL, '2021-12-10 12:30:52'),
(14, 102, 100, 3, 'ขออนุมัติเอกสาร', 'mdi-file-document-edit-outline', '', NULL, '2021-12-10 12:30:52', NULL, '2021-12-10 12:30:52'),
(15, 103, 100, 2, 'ขอสอบ', 'mdi-teach', '', NULL, '2021-12-10 12:30:52', NULL, '2021-12-10 12:30:52'),
(16, 200, 0, 6, 'อาจารย์ประจำวิชา', 'mdi-chevron-up', 'mdi-chevron-down', NULL, '2021-12-10 12:30:52', NULL, '2021-12-10 12:30:52'),
(17, 201, 200, 1, 'ขออนุมัติเอกสาร', 'mdi-group', '', NULL, '2021-12-10 12:30:52', NULL, '2021-12-10 12:30:52'),
(18, 202, 200, 2, 'โครงงานใหม่', 'mdi-group', '', NULL, '2021-12-10 12:30:52', NULL, '2021-12-10 12:30:52');

-- --------------------------------------------------------

--
-- Table structure for table `app_privileges`
--

CREATE TABLE `app_privileges` (
  `id` int(11) NOT NULL,
  `UserTypeID` int(11) NOT NULL,
  `MenuID` int(11) NOT NULL,
  `Route` varchar(255) NOT NULL,
  `CreatedBy` int(11) DEFAULT NULL,
  `CreatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `app_privileges`
--

INSERT INTO `app_privileges` (`id`, `UserTypeID`, `MenuID`, `Route`, `CreatedBy`, `CreatedTime`, `UpdatedBy`, `UpdatedTime`) VALUES
(1, 1, 1, '/student/overview', NULL, '2021-12-10 12:30:53', NULL, '2021-12-10 12:30:53'),
(2, 1, 2, '/student/project', NULL, '2021-12-10 12:30:53', NULL, '2021-12-10 12:30:53'),
(3, 1, 3, '/student/documents', NULL, '2021-12-10 12:30:53', NULL, '2021-12-10 12:30:53'),
(4, 1, 4, '/student/project_manual', NULL, '2021-12-10 12:30:53', NULL, '2021-12-10 12:30:53'),
(5, 1, 6, '/student/all_project', NULL, '2021-12-10 12:30:53', NULL, '2021-12-10 12:30:53'),
(6, 1, 7, '/student/meeting', NULL, '2021-12-10 12:30:53', NULL, '2021-12-10 12:30:53'),
(7, 2, 1, '/teacher/overview', NULL, '2021-12-10 12:30:53', NULL, '2021-12-10 12:30:53'),
(8, 2, 6, '/teacher/all_project', NULL, '2021-12-10 12:30:53', NULL, '2021-12-10 12:30:53'),
(9, 2, 100, '', NULL, '2021-12-10 12:30:53', NULL, '2021-12-10 12:30:53'),
(10, 2, 101, '/teacher/advisor_req', NULL, '2021-12-10 12:30:53', NULL, '2021-12-10 12:30:53'),
(11, 2, 102, '/teacher/approvement_req', NULL, '2021-12-10 12:30:53', NULL, '2021-12-10 12:30:53'),
(12, 2, 103, '/teacher/test_req', NULL, '2021-12-10 12:30:53', NULL, '2021-12-10 12:30:53'),
(13, 2, 7, '/teacher/meeting', NULL, '2021-12-10 12:30:53', NULL, '2021-12-10 12:30:53'),
(14, 2, 9, '/teacher/project', NULL, '2021-12-10 12:30:53', NULL, '2021-12-10 12:30:53'),
(15, 2, 10, '/teacher/exam', NULL, '2021-12-10 12:30:53', NULL, '2021-12-10 12:30:53'),
(16, 3, 1, '/teacher/overview', NULL, '2021-12-10 12:30:53', NULL, '2021-12-10 12:30:53'),
(17, 3, 6, '/teacher/all_project', NULL, '2021-12-10 12:30:53', NULL, '2021-12-10 12:30:53'),
(18, 3, 100, '', NULL, '2021-12-10 12:30:53', NULL, '2021-12-10 12:30:53'),
(19, 3, 101, '/teacher/advisor_req', NULL, '2021-12-10 12:30:53', NULL, '2021-12-10 12:30:53'),
(20, 3, 102, '/teacher/approvement_req', NULL, '2021-12-10 12:30:53', NULL, '2021-12-10 12:30:53'),
(21, 3, 103, '/teacher/test_req', NULL, '2021-12-10 12:30:53', NULL, '2021-12-10 12:30:53'),
(22, 3, 200, '', NULL, '2021-12-10 12:30:53', NULL, '2021-12-10 12:30:53'),
(23, 3, 201, '/teacher/approvement_req', NULL, '2021-12-10 12:30:53', NULL, '2021-12-10 12:30:53'),
(24, 3, 202, '/teacher/new_projects', NULL, '2021-12-10 12:30:53', NULL, '2021-12-10 12:30:53'),
(25, 3, 7, '/teacher/meeting', NULL, '2021-12-10 12:30:53', NULL, '2021-12-10 12:30:53'),
(26, 3, 10, '/teacher/exam', NULL, '2021-12-10 12:30:53', NULL, '2021-12-10 12:30:53'),
(27, 3, 4, '/teacher/project_manual', NULL, '2021-12-10 12:30:53', NULL, '2021-12-10 12:30:53'),
(28, 3, 5, '/teacher/app_configs', NULL, '2021-12-10 12:30:53', NULL, '2021-12-10 12:30:53'),
(29, 3, 13, '/teacher/manage_users', NULL, '2021-12-10 12:30:53', NULL, '2021-12-10 12:30:53'),
(30, 4, 1, '/admin/dashboard', NULL, '2021-12-10 12:30:53', NULL, '2021-12-10 12:30:53'),
(31, 4, 4, '/admin/project_manual', NULL, '2021-12-10 12:30:53', NULL, '2021-12-10 12:30:53'),
(32, 4, 5, '/admin/app_configs', NULL, '2021-12-10 12:30:53', NULL, '2021-12-10 12:30:53'),
(33, 4, 11, '/admin/manage_users', NULL, '2021-12-10 12:30:53', NULL, '2021-12-10 12:30:53'),
(34, 5, 1, '/teacher/overview', NULL, '2021-12-10 12:30:53', NULL, '2021-12-10 12:30:53'),
(35, 5, 6, '/teacher/all_project', NULL, '2021-12-10 12:30:53', NULL, '2021-12-10 12:30:53'),
(36, 5, 100, '', NULL, '2021-12-10 12:30:53', NULL, '2021-12-10 12:30:53'),
(37, 5, 101, '/teacher/advisor_req', NULL, '2021-12-10 12:30:53', NULL, '2021-12-10 12:30:53'),
(38, 5, 102, '/teacher/approvement_req', NULL, '2021-12-10 12:30:53', NULL, '2021-12-10 12:30:53'),
(39, 5, 103, '/teacher/test_req', NULL, '2021-12-10 12:30:53', NULL, '2021-12-10 12:30:53'),
(40, 5, 200, '', NULL, '2021-12-10 12:30:53', NULL, '2021-12-10 12:30:53'),
(41, 5, 201, '/teacher/approvement_req', NULL, '2021-12-10 12:30:53', NULL, '2021-12-10 12:30:53'),
(42, 5, 202, '/teacher/new_projects', NULL, '2021-12-10 12:30:53', NULL, '2021-12-10 12:30:53'),
(43, 5, 7, '/teacher/meeting', NULL, '2021-12-10 12:30:53', NULL, '2021-12-10 12:30:53'),
(44, 5, 10, '/teacher/exam', NULL, '2021-12-10 12:30:53', NULL, '2021-12-10 12:30:53'),
(45, 5, 4, '/teacher/project_manual', NULL, '2021-12-10 12:30:53', NULL, '2021-12-10 12:30:53'),
(46, 5, 5, '/teacher/app_configs', NULL, '2021-12-10 12:30:53', NULL, '2021-12-10 12:30:53'),
(47, 5, 13, '/teacher/manage_users', NULL, '2021-12-10 12:30:53', NULL, '2021-12-10 12:30:53');

-- --------------------------------------------------------

--
-- Table structure for table `deadline`
--

CREATE TABLE `deadline` (
  `DeadlineID` int(5) UNSIGNED NOT NULL,
  `SectionID` int(5) DEFAULT NULL,
  `FormTypeID` int(5) DEFAULT NULL,
  `OnDate` datetime DEFAULT NULL,
  `CreatedBy` int(11) DEFAULT NULL,
  `CreatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `deadline`
--

INSERT INTO `deadline` (`DeadlineID`, `SectionID`, `FormTypeID`, `OnDate`, `CreatedBy`, `CreatedTime`, `UpdatedBy`, `UpdatedTime`) VALUES
(246, 29, 26, NULL, 492, '2021-08-07 08:14:39', 492, '2021-08-07 08:14:39'),
(247, 29, 27, NULL, 492, '2021-08-07 08:14:39', 492, '2021-08-07 08:14:39'),
(249, 30, 26, NULL, 492, '2021-08-07 08:28:52', 492, '2021-08-07 08:28:52'),
(250, 30, 27, NULL, 492, '2021-08-07 08:28:52', 492, '2021-09-17 13:32:50'),
(252, 31, 26, NULL, 492, '2021-08-07 09:41:56', 492, '2021-08-07 09:41:56'),
(253, 31, 27, NULL, 492, '2021-08-07 09:41:56', 492, '2021-08-07 09:41:56'),
(255, 32, 26, NULL, 1625, '2021-08-07 09:46:22', 1625, '2021-08-07 09:46:22'),
(256, 32, 27, NULL, 1625, '2021-08-07 09:46:22', 492, '2021-09-17 13:32:50'),
(259, 33, 26, NULL, 1624, '2021-08-07 09:56:20', 1624, '2021-08-07 09:56:20'),
(260, 33, 27, NULL, 1624, '2021-08-07 09:56:20', 492, '2021-09-17 13:32:50'),
(266, 29, 31, NULL, 1625, '2021-08-07 12:12:53', 492, '2021-09-17 13:32:57'),
(267, 31, 31, NULL, 1625, '2021-08-07 12:12:53', 492, '2021-09-17 13:32:57'),
(268, 32, 31, NULL, 1625, '2021-08-07 12:12:53', 492, '2021-09-17 13:32:57'),
(272, 29, 33, NULL, 1625, '2021-08-07 12:17:56', 492, '2021-09-17 13:33:02'),
(273, 31, 33, NULL, 1625, '2021-08-07 12:17:56', 492, '2021-09-17 13:33:02'),
(274, 32, 33, NULL, 1625, '2021-08-07 12:17:56', 492, '2021-09-17 13:33:02'),
(275, 29, 34, '2021-08-21 21:43:00', 1625, '2021-08-07 12:18:10', 1625, '2021-08-18 14:43:55'),
(276, 31, 34, NULL, 1625, '2021-08-07 12:18:10', 1625, '2021-08-07 12:18:10'),
(277, 32, 34, NULL, 1625, '2021-08-07 12:18:10', 1625, '2021-08-07 12:18:10'),
(278, 29, 35, NULL, 1625, '2021-08-07 12:18:20', 1625, '2021-08-07 12:18:20'),
(279, 31, 35, NULL, 1625, '2021-08-07 12:18:20', 1625, '2021-08-07 12:18:20'),
(280, 32, 35, NULL, 1625, '2021-08-07 12:18:20', 1625, '2021-08-07 12:18:20'),
(284, 29, 37, NULL, 1625, '2021-08-07 12:20:38', 492, '2021-09-17 13:33:51'),
(285, 31, 37, NULL, 1625, '2021-08-07 12:20:38', 492, '2021-09-17 13:33:51'),
(286, 32, 37, NULL, 1625, '2021-08-07 12:20:38', 492, '2021-09-17 13:33:52'),
(287, 30, 39, NULL, 1624, '2021-08-08 13:13:47', 1624, '2021-08-08 13:13:47'),
(288, 33, 39, NULL, 1624, '2021-08-08 13:13:47', 1624, '2021-08-08 13:13:47'),
(289, 34, 26, NULL, 1625, '2021-08-18 14:36:32', 1625, '2021-08-18 14:36:32'),
(290, 34, 27, NULL, 1625, '2021-08-18 14:36:32', 492, '2021-09-17 13:32:50'),
(291, 34, 31, NULL, 1625, '2021-08-18 14:36:32', 492, '2021-09-17 13:32:57'),
(292, 34, 33, NULL, 1625, '2021-08-18 14:36:32', 492, '2021-09-17 13:33:02'),
(293, 34, 34, NULL, 1625, '2021-08-18 14:36:32', 1625, '2021-08-18 14:36:32'),
(294, 34, 35, NULL, 1625, '2021-08-18 14:36:32', 1625, '2021-08-18 14:36:32'),
(295, 34, 37, NULL, 1625, '2021-08-18 14:36:32', 492, '2021-09-17 13:33:52'),
(296, 34, 39, NULL, 1625, '2021-08-18 14:36:32', 1625, '2021-08-18 14:36:32'),
(297, 29, 40, NULL, 1625, '2021-08-18 14:41:35', 1625, '2021-08-18 14:41:35'),
(298, 31, 40, NULL, 1625, '2021-08-18 14:41:35', 1625, '2021-08-18 14:41:35'),
(299, 32, 40, NULL, 1625, '2021-08-18 14:41:35', 1625, '2021-08-18 14:41:35'),
(300, 34, 40, NULL, 1625, '2021-08-18 14:41:35', 1625, '2021-08-18 14:41:35'),
(301, 35, 41, '2021-12-20 21:35:00', 1, '2021-12-19 14:35:46', 1, '2021-12-19 14:35:46');

-- --------------------------------------------------------

--
-- Table structure for table `document`
--

CREATE TABLE `document` (
  `Document_ID` int(5) UNSIGNED NOT NULL,
  `Document_Name` varchar(50) NOT NULL,
  `Document_FileName` varchar(50) NOT NULL,
  `Document_DateTime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `document`
--

INSERT INTO `document` (`Document_ID`, `Document_Name`, `Document_FileName`, `Document_DateTime`) VALUES
(1, 'Document1', 'Document1.pdf', '0000-00-00 00:00:00'),
(3, 'Document2 Edited', 'Document2.pdf', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `example_file`
--

CREATE TABLE `example_file` (
  `ExampleFileID` int(11) NOT NULL,
  `OriginalFileName` varchar(50) NOT NULL,
  `ExampleFileName` varchar(50) NOT NULL,
  `FileSize` bigint(20) NOT NULL,
  `CreatedBy` int(11) DEFAULT NULL,
  `CreatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `example_file`
--

INSERT INTO `example_file` (`ExampleFileID`, `OriginalFileName`, `ExampleFileName`, `FileSize`, `CreatedBy`, `CreatedTime`, `UpdatedBy`, `UpdatedTime`) VALUES
(1, 'Advanced_Port_Scanner_2.5.3680.exe', '22bba23f-2e57-4d12-ae35-a80ef3ec0ff9.exe', 20462744, 1623, '2021-08-16 00:44:32', 1623, '2021-08-16 00:44:32'),
(3, 'อิ้งค์-2-819x1024.jpg', '04f751f0-cb5e-46a4-ad1b-66d425abba80.jpg', 55896, 1624, '2021-08-16 11:51:27', 1624, '2021-08-16 11:51:27');

-- --------------------------------------------------------

--
-- Table structure for table `form_comment`
--

CREATE TABLE `form_comment` (
  `CommentID` int(5) UNSIGNED NOT NULL,
  `FormID` int(5) DEFAULT NULL,
  `CommentText` text,
  `CreatedBy` int(5) DEFAULT NULL,
  `CreatedTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `form_comment`
--

INSERT INTO `form_comment` (`CommentID`, `FormID`, `CommentText`, `CreatedBy`, `CreatedTime`, `UpdatedBy`, `UpdatedTime`) VALUES
(7, 26, 'ดีแล้ว ผ่านนน', 5, '2021-07-03 11:03:02', 5, '2021-07-03 11:03:02'),
(8, 27, 'asdasd', 5, '2021-07-09 17:35:05', 5, '2021-07-09 17:35:05'),
(9, 43, 'กลับไปแก้ความเป็นมา', 1394, '2021-07-29 20:39:52', 1394, '2021-07-29 20:39:52'),
(10, 55, 'aaa', 1623, '2021-08-18 11:53:19', 1623, '2021-08-18 11:53:19'),
(11, 69, 'comment', 1623, '2021-08-18 13:42:37', 1623, '2021-08-18 13:42:37'),
(12, 71, '1', 1623, '2021-08-18 13:58:27', 1623, '2021-08-18 13:58:27'),
(13, 71, '2', 1623, '2021-08-18 13:58:30', 1623, '2021-08-18 13:58:30'),
(14, 71, '3', 1623, '2021-08-18 13:58:33', 1623, '2021-08-18 13:58:33'),
(15, 72, '111', 1623, '2021-08-18 14:01:02', 1623, '2021-08-18 14:01:02'),
(16, 73, '12345', 1625, '2021-09-17 13:37:01', 1625, '2021-09-17 13:37:01');

-- --------------------------------------------------------

--
-- Table structure for table `form_prerequisite`
--

CREATE TABLE `form_prerequisite` (
  `PrerequisiteID` int(5) UNSIGNED NOT NULL,
  `FormTypeID` int(5) DEFAULT NULL,
  `FormReqTypeID` int(5) DEFAULT NULL,
  `CreatedBy` int(11) DEFAULT NULL,
  `CreatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `form_prerequisite`
--

INSERT INTO `form_prerequisite` (`PrerequisiteID`, `FormTypeID`, `FormReqTypeID`, `CreatedBy`, `CreatedTime`, `UpdatedBy`, `UpdatedTime`) VALUES
(8, 2, 1, NULL, '2021-07-18 11:43:31', NULL, '2021-07-18 11:43:31'),
(9, 4, 1, NULL, '2021-07-18 12:25:36', NULL, '2021-07-18 12:25:36'),
(10, 4, 2, NULL, '2021-07-18 12:25:36', NULL, '2021-07-18 12:25:36'),
(19, 35, 26, NULL, '2021-08-07 12:24:36', NULL, '2021-08-07 12:24:36'),
(23, 40, 31, NULL, '2021-08-18 14:41:57', NULL, '2021-08-18 14:41:57'),
(24, 40, 34, NULL, '2021-08-18 14:41:57', NULL, '2021-08-18 14:41:57'),
(25, 34, 26, NULL, '2021-08-18 14:43:55', NULL, '2021-08-18 14:43:55'),
(30, 27, 26, NULL, '2021-09-17 13:33:16', NULL, '2021-09-17 13:33:16'),
(31, 31, 26, NULL, '2021-09-17 13:33:23', NULL, '2021-09-17 13:33:23'),
(32, 33, 26, NULL, '2021-09-17 13:33:28', NULL, '2021-09-17 13:33:28'),
(33, 33, 27, NULL, '2021-09-17 13:33:28', NULL, '2021-09-17 13:33:28'),
(34, 37, 26, NULL, '2021-09-17 13:33:52', NULL, '2021-09-17 13:33:52'),
(35, 37, 33, NULL, '2021-09-17 13:33:52', NULL, '2021-09-17 13:33:52');

-- --------------------------------------------------------

--
-- Table structure for table `form_sent`
--

CREATE TABLE `form_sent` (
  `FormID` int(5) UNSIGNED NOT NULL,
  `ProjectID` int(5) NOT NULL,
  `FormTypeID` int(5) NOT NULL,
  `FileName` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `FormStatusID` int(5) NOT NULL DEFAULT '1',
  `CompletedTime` datetime DEFAULT NULL,
  `CreatedBy` int(11) DEFAULT NULL,
  `CreatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `form_sent`
--

INSERT INTO `form_sent` (`FormID`, `ProjectID`, `FormTypeID`, `FileName`, `FormStatusID`, `CompletedTime`, `CreatedBy`, `CreatedTime`, `UpdatedBy`, `UpdatedTime`) VALUES
(55, 65, 26, '3428b6f4-2fbc-4913-a473-0a0bbfd2afe2.pdf', 5, NULL, 1581, '2021-08-08 13:23:38', 1623, '2021-08-08 13:24:40'),
(56, 65, 26, '76667382-98f6-476f-ba3d-6f9bd30d8ef6.pdf', 5, NULL, 1581, '2021-08-08 13:25:06', 1623, '2021-08-08 13:25:12'),
(57, 65, 26, 'baf342f1-3099-4150-858f-dab03476a47e.pdf', 5, NULL, 1581, '2021-08-08 13:28:00', 1623, '2021-08-08 13:32:16'),
(58, 65, 26, '2f9e1fe7-4a53-4cfd-9b6c-5e8b0e582c1f.pdf', 5, NULL, 1581, '2021-08-08 13:33:06', 1623, '2021-08-08 13:36:07'),
(60, 65, 26, '013d5dd3-bcb7-4e2d-8be6-a54f2f29c421.pdf', 5, NULL, 1581, '2021-08-08 13:40:53', 1623, '2021-08-08 13:43:29'),
(61, 65, 26, 'db462d7d-783a-4d18-a720-22d171cf8865.pdf', 4, NULL, 1581, '2021-08-08 13:45:30', 1625, '2021-08-08 16:41:11'),
(62, 65, 26, '9434b6df-bc04-4c00-b148-0cc1b1cc80fb.pdf', 2, NULL, 1581, '2021-08-08 14:17:31', 1623, '2021-08-08 15:12:15'),
(63, 66, 26, 'e558fd51-d88b-4153-a822-c05cc26244f6.pdf', 3, NULL, 1582, '2021-08-08 15:13:29', 1625, '2021-08-08 16:43:11'),
(64, 65, 26, 'c6663584-6f4d-4b36-8555-721e642bee95.pdf', 5, NULL, 1581, '2021-08-08 15:21:33', 1625, '2021-08-08 15:41:33'),
(65, 65, 27, 'dc0a3bfd-5e7f-40ab-bcfc-49c001c80059.pdf', 5, NULL, 1581, '2021-08-08 15:41:57', 1625, '2021-08-08 15:43:40'),
(66, 65, 31, 'd844598c-7af7-4baa-933a-3c2fae333bf6.pdf', 3, NULL, 1581, '2021-08-08 15:44:04', 1623, '2021-08-08 15:44:16'),
(67, 65, 33, 'f8ec97b3-bcd3-48c2-9363-14a5d8f535d9.pdf', 4, NULL, 1581, '2021-08-08 15:45:30', 1625, '2021-08-08 15:46:01'),
(68, 67, 26, '8fd52713-5f36-4844-a347-3883c32afe10.pdf', 1, NULL, 1583, '2021-08-08 16:29:52', 1583, '2021-08-08 16:29:52'),
(69, 69, 26, '2d69a5d4-d2d7-4287-a0ad-0d46a57ddc10.pdf', 3, NULL, 1588, '2021-08-18 13:40:39', 1623, '2021-08-18 13:44:51'),
(70, 69, 26, 'ca179536-641d-4443-911a-277cb2e045c8.pdf', 1, NULL, 1588, '2021-08-18 13:45:48', 1588, '2021-08-18 13:45:48'),
(71, 69, 26, '2973abaa-306c-4c42-b729-5b54f7d23473.pdf', 5, NULL, 1588, '2021-08-18 13:46:04', 1625, '2021-08-18 13:47:10'),
(72, 69, 26, '96501161-497b-4d3b-9009-ee1d0058f086.pdf', 2, NULL, 1588, '2021-08-18 14:00:45', 1623, '2021-08-18 14:14:16'),
(73, 65, 33, 'ef4dc606-1c0d-46fc-956f-28d5fe6564d1.pdf', 5, NULL, 1581, '2021-09-17 13:34:15', 1625, '2021-09-17 13:36:12'),
(74, 72, 26, '23519618-ba22-4a69-a274-d185b9ff69ab.pdf', 1, NULL, 1581, '2021-10-13 04:56:26', 1581, '2021-10-13 04:56:26'),
(75, 72, 26, '2ce3bc88-3ec5-4220-aa27-23ba58af5143.pdf', 1, NULL, 1581, '2021-10-13 04:58:35', 1581, '2021-10-13 04:58:35'),
(76, 72, 26, '8c89cd8b-22b8-4efe-bee1-468602031b34.pdf', 1, NULL, 1581, '2021-10-13 04:59:05', 1581, '2021-10-13 04:59:05'),
(77, 72, 26, '311fc25b-acec-47bf-990e-d9a8233f4adc.pdf', 1, NULL, 1581, '2021-10-13 05:00:41', 1581, '2021-10-13 05:00:41'),
(78, 72, 26, '898eeec6-9868-4aa0-aab9-22f35fe7ff65.pdf', 1, NULL, 1581, '2021-10-13 05:02:30', 1581, '2021-10-13 05:02:30'),
(79, 72, 26, '5684c5e3-3f6f-4e2d-9a78-986ec4803e11.pdf', 1, NULL, 1581, '2021-10-13 05:02:58', 1581, '2021-10-13 05:02:58'),
(80, 73, 26, '1aeadd62-402b-4b58-a461-11621d6c34d0.pdf', 1, NULL, 1581, '2021-10-13 05:04:41', 1581, '2021-10-13 05:04:41'),
(81, 74, 26, 'a78de298-92a4-4863-a052-c70e31eea8e6.pdf', 1, NULL, 1581, '2021-10-13 05:06:57', 1581, '2021-10-13 05:06:57');

-- --------------------------------------------------------

--
-- Table structure for table `form_status`
--

CREATE TABLE `form_status` (
  `FormStatusID` int(5) UNSIGNED NOT NULL,
  `StatusName` varchar(255) DEFAULT NULL,
  `StatusDetail` varchar(255) DEFAULT NULL,
  `CreatedBy` int(11) DEFAULT NULL,
  `CreatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `form_status`
--

INSERT INTO `form_status` (`FormStatusID`, `StatusName`, `StatusDetail`, `CreatedBy`, `CreatedTime`, `UpdatedBy`, `UpdatedTime`) VALUES
(1, 'Wait Advisors', 'รอการอนุมัติจากที่ปรึกษา', NULL, '2021-06-26 10:47:38', NULL, '2021-06-26 10:58:43'),
(2, 'Wait Instructor', 'รอการอนุมัติจากอาจารย์ประจำวิชา', NULL, '2021-06-26 10:47:38', NULL, '2021-06-26 10:58:45'),
(3, 'Advisor Rejected', 'ปฏิเสธโดยอาจารย์ที่ปรึกษา', NULL, '2021-06-26 10:47:38', NULL, '2021-06-26 10:58:47'),
(4, 'Instructor Rejected', 'ปฏิเสธโดยอาจารย์ประจำวิชา', NULL, '2021-06-26 10:47:38', NULL, '2021-06-26 10:58:49'),
(5, 'Approved', 'อนุมัติแล้ว', NULL, '2021-06-26 10:47:38', NULL, '2021-06-26 10:58:51');

-- --------------------------------------------------------

--
-- Table structure for table `form_type`
--

CREATE TABLE `form_type` (
  `FormTypeID` int(5) UNSIGNED NOT NULL,
  `FormTypeName` varchar(255) DEFAULT NULL,
  `FormTypeDetail` varchar(255) DEFAULT NULL,
  `Project` tinyint(1) DEFAULT '0',
  `PreProject` tinyint(1) DEFAULT '0',
  `isActive` tinyint(1) NOT NULL,
  `CreatedBy` int(11) DEFAULT NULL,
  `CreatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `form_type`
--

INSERT INTO `form_type` (`FormTypeID`, `FormTypeName`, `FormTypeDetail`, `Project`, `PreProject`, `isActive`, `CreatedBy`, `CreatedTime`, `UpdatedBy`, `UpdatedTime`) VALUES
(41, 'CE01', '', 0, 1, 1, 1, '2021-12-19 14:35:45', 1, '2021-12-19 14:35:45');

-- --------------------------------------------------------

--
-- Table structure for table `meeting`
--

CREATE TABLE `meeting` (
  `MeetingID` int(5) UNSIGNED NOT NULL,
  `Title` varchar(255) NOT NULL,
  `Detail` text NOT NULL,
  `ProjectID` int(5) NOT NULL,
  `TeacherID` int(5) NOT NULL,
  `OnDate` datetime NOT NULL,
  `RequestStatus` int(5) NOT NULL,
  `MeetingType` int(5) NOT NULL,
  `Note` text,
  `IsActive` tinyint(1) NOT NULL,
  `CreatedBy` int(5) NOT NULL,
  `CreatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int(5) NOT NULL,
  `UpdatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `NotiID` int(11) NOT NULL,
  `NotiTypeID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `Title` varchar(255) DEFAULT NULL,
  `Message` varchar(255) DEFAULT NULL,
  `IsRead` tinyint(1) NOT NULL DEFAULT '0',
  `CreatedBy` int(11) DEFAULT NULL,
  `CreatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`NotiID`, `NotiTypeID`, `UserID`, `Title`, `Message`, `IsRead`, `CreatedBy`, `CreatedTime`, `UpdatedBy`, `UpdatedTime`) VALUES
(1, 1, 1610, 'สร้างกลุ่ม PMS', 'lสร้างกลุ่ม PMS และเพิ่มคุณเป็นสมาชิก', 0, 1581, '2021-12-12 15:21:20', 1581, '2021-12-13 11:56:07'),
(2, 1, 1610, 'ส่งเอกสาร CE01', 'ส่งเอกสาร CE01 เรียบร้อยแล้ว', 1, 492, '2021-12-12 16:11:31', 492, '2021-12-13 11:56:53'),
(3, 1, 1610, 'อนุมัติ CE01', 'อนุมัติ CE01 เรียบร้อบแล้ว', 0, 492, '2021-12-13 11:32:12', NULL, '2021-12-13 11:57:31'),
(16, 1, 4254, 'สร้างกลุ่ม accacaa', 'สร้างกลุ่ม accacaa และเพิ่มคุณเป็นสมาชิก', 0, 4253, '2021-12-19 16:35:48', 4253, '2021-12-19 16:35:48'),
(17, 1, 4254, 'สร้างกลุ่ม zxczxc', 'สร้างกลุ่ม zxczxc และเพิ่มคุณเป็นสมาชิก', 0, 4253, '2021-12-19 16:37:30', 4253, '2021-12-19 16:37:30'),
(18, 1, 4254, 'สร้างกลุ่ม qawdasd', 'สร้างกลุ่ม qawdasd และเพิ่มคุณเป็นสมาชิก', 0, 4253, '2021-12-19 16:37:53', 4253, '2021-12-19 16:37:53'),
(19, 1, 4254, 'สร้างกลุ่ม acaca', 'สร้างกลุ่ม acaca และเพิ่มคุณเป็นสมาชิก', 0, 4253, '2021-12-19 16:39:51', 4253, '2021-12-19 16:39:51'),
(20, 1, 4254, 'สร้างกลุ่ม qqqqq', 'สร้างกลุ่ม qqqqq และเพิ่มคุณเป็นสมาชิก', 0, 4253, '2021-12-19 16:43:26', 4253, '2021-12-19 16:43:26'),
(21, 1, 4254, 'สร้างกลุ่ม zxczxczxc', 'สร้างกลุ่ม zxczxczxc และเพิ่มคุณเป็นสมาชิก', 0, 4253, '2021-12-19 16:45:42', 4253, '2021-12-19 16:45:42'),
(22, 1, 4295, 'สร้างกลุ่ม zxczxczxc', 'สร้างกลุ่ม zxczxczxc และเพิ่มคุณเป็นอาจารย์ที่ปรึกษา', 0, 4253, '2021-12-19 16:45:43', 4253, '2021-12-19 16:45:43');

-- --------------------------------------------------------

--
-- Table structure for table `notification_types`
--

CREATE TABLE `notification_types` (
  `id` int(11) NOT NULL,
  `NotiTypeID` int(11) NOT NULL,
  `UserTypeID` int(11) DEFAULT NULL,
  `NotiTypeName` varchar(255) NOT NULL,
  `TitleTemplate` varchar(255) DEFAULT NULL,
  `MessageTemplate` varchar(255) DEFAULT NULL,
  `ActionPage` varchar(255) DEFAULT NULL,
  `CreatedBy` int(11) DEFAULT NULL,
  `CreatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `notification_types`
--

INSERT INTO `notification_types` (`id`, `NotiTypeID`, `UserTypeID`, `NotiTypeName`, `TitleTemplate`, `MessageTemplate`, `ActionPage`, `CreatedBy`, `CreatedTime`, `UpdatedBy`, `UpdatedTime`) VALUES
(1, 1, 1, 'Add Project', 'สร้างกลุ่ม {ProjectName}', 'สร้างกลุ่ม {ProjectName} และเพิ่มคุณเป็นสมาชิก', '/student/project', NULL, '2021-12-12 15:19:24', NULL, '2021-12-19 16:01:32'),
(2, 1, 2, 'Add Project', 'สร้างกลุ่ม {ProjectName}', 'สร้างกลุ่ม {ProjectName} และเพิ่มคุณเป็นอาจารย์ที่ปรึกษา', '/teacher/project', NULL, '2021-12-13 12:27:14', NULL, '2021-12-19 16:01:25'),
(3, 1, 3, 'Add Project', 'สร้างกลุ่ม {ProjectName}', 'กลุ่ม {ProjectName} รอรับการพิจารณาอนุมัติ', '/teacher/project', NULL, '2021-12-13 12:27:22', NULL, '2021-12-19 14:41:24'),
(4, 1, 4, 'Add Project', 'สร้างกลุ่ม {ProjectName}', '', '/teacher/project', NULL, '2021-12-13 12:27:31', NULL, '2021-12-19 15:53:51'),
(5, 1, 5, 'Add Project', 'สร้างกลุ่ม {ProjectName}', 'กลุ่ม {ProjectName} รอรับการพิจารณาอนุมัติ', '/student/project', NULL, '2021-12-13 12:27:37', NULL, '2021-12-19 14:41:38'),
(6, 2, 1, 'ส่งเอกสาร CE', 'ส่งเอกสาร {CEName}', 'ส่งเอกสาร {CEName} เรียบร้อยแล้ว', '/student/form_preview?d={DocumentID}', NULL, '2021-12-13 12:37:51', NULL, '2021-12-19 14:41:41'),
(7, 2, 2, 'ส่งเอกสาร CE', 'กลุ่ม {ProjectName} ส่งเอกสาร {CEName}', ' ส่งเอกสาร {CEName} รอรับการตรวจจากคุณ', '/student/form_preview?d={DocumentID}', NULL, '2021-12-13 12:38:07', NULL, '2021-12-19 14:41:45'),
(8, 2, 3, 'ส่งเอกสาร CE', 'กลุ่ม {ProjectName} ส่งเอกสาร {CEName}', ' ส่งเอกสาร {CEName} รอรับการตรวจจากคุณ', '/student/form_preview?d={DocumentID}', NULL, '2021-12-13 12:38:13', NULL, '2021-12-19 14:41:48'),
(9, 2, 4, 'ส่งเอกสาร CE', 'ส่งเอกสาร {CEName}', 'ส่งเอกสาร {CEName} เรียบร้อยแล้ว', '/student/form_preview?d={DocumentID}', NULL, '2021-12-13 12:38:19', NULL, '2021-12-19 14:41:51'),
(10, 2, 5, 'ส่งเอกสาร CE', 'กลุ่ม {ProjectName} ส่งเอกสาร {CEName}', ' ส่งเอกสาร {CEName} รอรับการตรวจจากคุณ', '/student/form_preview?d={DocumentID}', NULL, '2021-12-13 12:38:25', NULL, '2021-12-19 14:41:54');

-- --------------------------------------------------------

--
-- Table structure for table `project_advisor`
--

CREATE TABLE `project_advisor` (
  `AdvisorID` int(5) UNSIGNED NOT NULL,
  `ProjectID` int(5) DEFAULT NULL,
  `UserID` int(5) NOT NULL,
  `RequestStatus` tinyint(1) DEFAULT NULL,
  `CreatedBy` int(11) DEFAULT NULL,
  `CreatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `project_advisor`
--

INSERT INTO `project_advisor` (`AdvisorID`, `ProjectID`, `UserID`, `RequestStatus`, `CreatedBy`, `CreatedTime`, `UpdatedBy`, `UpdatedTime`) VALUES
(179, 105, 4295, NULL, 4253, '2021-12-19 15:51:12', 4253, '2021-12-19 15:51:12'),
(180, 106, 4295, NULL, 4253, '2021-12-19 16:10:27', 4253, '2021-12-19 16:10:27'),
(181, 107, 4295, NULL, 4253, '2021-12-19 16:11:44', 4253, '2021-12-19 16:11:44'),
(182, 108, 4295, NULL, 4253, '2021-12-19 16:15:22', 4253, '2021-12-19 16:15:22'),
(183, 109, 4295, NULL, 4253, '2021-12-19 16:24:36', 4253, '2021-12-19 16:24:36'),
(184, 110, 4295, NULL, 4253, '2021-12-19 16:29:24', 4253, '2021-12-19 16:29:24'),
(185, 111, 4295, NULL, 4253, '2021-12-19 16:35:48', 4253, '2021-12-19 16:35:48'),
(186, 112, 4295, NULL, 4253, '2021-12-19 16:37:30', 4253, '2021-12-19 16:37:30'),
(187, 113, 4295, NULL, 4253, '2021-12-19 16:37:53', 4253, '2021-12-19 16:37:53'),
(188, 114, 4295, NULL, 4253, '2021-12-19 16:39:51', 4253, '2021-12-19 16:39:51'),
(189, 115, 4295, NULL, 4253, '2021-12-19 16:43:26', 4253, '2021-12-19 16:43:26'),
(190, 116, 4295, NULL, 4253, '2021-12-19 16:45:42', 4253, '2021-12-19 16:45:42');

-- --------------------------------------------------------

--
-- Table structure for table `project_committee`
--

CREATE TABLE `project_committee` (
  `CommitteeID` int(5) UNSIGNED NOT NULL,
  `ProjectID` int(5) DEFAULT NULL,
  `UserID` int(5) DEFAULT NULL,
  `CommitteeRoleID` int(5) DEFAULT NULL,
  `PresentScore` int(3) DEFAULT NULL,
  `DocumentScore` int(3) DEFAULT NULL,
  `AdvisorScore` int(3) DEFAULT NULL,
  `RequestStatusID` int(5) DEFAULT NULL,
  `CreatedBy` int(11) DEFAULT NULL,
  `CreatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `project_committee`
--

INSERT INTO `project_committee` (`CommitteeID`, `ProjectID`, `UserID`, `CommitteeRoleID`, `PresentScore`, `DocumentScore`, `AdvisorScore`, `RequestStatusID`, `CreatedBy`, `CreatedTime`, `UpdatedBy`, `UpdatedTime`) VALUES
(3, 50, 1, 1, 0, 0, 0, 1, NULL, '2021-06-26 12:28:47', NULL, '2021-06-26 12:28:47'),
(4, 26, 5, 2, 50, 50, 50, 1, NULL, '2021-06-26 12:28:47', NULL, '2021-06-26 12:28:47');

-- --------------------------------------------------------

--
-- Table structure for table `project_committee_role`
--

CREATE TABLE `project_committee_role` (
  `CommitteeRoleID` int(5) UNSIGNED NOT NULL,
  `CommitteeRoleName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `project_committee_role`
--

INSERT INTO `project_committee_role` (`CommitteeRoleID`, `CommitteeRoleName`) VALUES
(1, 'อาจารย์ที่ปรึกษา'),
(2, 'อาจารย์กรรมการสอบ');

-- --------------------------------------------------------

--
-- Table structure for table `project_info`
--

CREATE TABLE `project_info` (
  `ProjectID` int(5) UNSIGNED NOT NULL,
  `ProjectNameTH` varchar(255) DEFAULT NULL,
  `ProjectNameEN` varchar(255) DEFAULT NULL,
  `ProjectDetail` text,
  `ProjectTypeID` int(5) DEFAULT NULL,
  `MaxMember` int(2) DEFAULT NULL,
  `SectionID` int(5) DEFAULT NULL,
  `ProjectStatusID` int(5) DEFAULT NULL,
  `RejectedRemark` text,
  `IsProject` tinyint(1) NOT NULL DEFAULT '0',
  `CreatedBy` int(11) DEFAULT NULL,
  `CreatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `project_info`
--

INSERT INTO `project_info` (`ProjectID`, `ProjectNameTH`, `ProjectNameEN`, `ProjectDetail`, `ProjectTypeID`, `MaxMember`, `SectionID`, `ProjectStatusID`, `RejectedRemark`, `IsProject`, `CreatedBy`, `CreatedTime`, `UpdatedBy`, `UpdatedTime`) VALUES
(105, 'asd', 'asdasd', '', 1, 2, 35, 1, NULL, 0, 4253, '2021-12-19 15:51:11', 4253, '2021-12-19 15:51:11'),
(106, 'asd', 'asd', '', 2, 2, 35, 1, NULL, 0, 4253, '2021-12-19 16:10:27', 4253, '2021-12-19 16:10:27'),
(107, 'zxc', 'zxc', '', 1, 2, 35, 1, NULL, 0, 4253, '2021-12-19 16:11:44', 4253, '2021-12-19 16:11:44'),
(108, 'qqqqq', 'qqqqqq', '', 1, 2, 35, 1, NULL, 0, 4253, '2021-12-19 16:15:22', 4253, '2021-12-19 16:15:22'),
(109, 'zxczxczxc', 'zxczxczxc', '', 1, 2, 35, 1, NULL, 0, 4253, '2021-12-19 16:24:36', 4253, '2021-12-19 16:24:36'),
(110, 'asd', 'asd', 'asd', 2, 2, 35, 1, NULL, 0, 4253, '2021-12-19 16:29:24', 4253, '2021-12-19 16:29:24'),
(111, 'accacaa', 'acacac', 'ac', 1, 2, 35, 1, NULL, 0, 4253, '2021-12-19 16:35:48', 4253, '2021-12-19 16:35:48'),
(112, 'zxczxc', 'zxczxc', '', 1, 2, 35, 1, NULL, 0, 4253, '2021-12-19 16:37:30', 4253, '2021-12-19 16:37:30'),
(113, 'qawdasd', 'asdasd', '', 1, 2, 35, 1, NULL, 0, 4253, '2021-12-19 16:37:53', 4253, '2021-12-19 16:37:53'),
(114, 'acaca', 'acacac', '', 1, 2, 35, 1, NULL, 0, 4253, '2021-12-19 16:39:50', 4253, '2021-12-19 16:39:50'),
(115, 'qqqqq', 'qqqqqqq', '', 2, 2, 35, 1, NULL, 0, 4253, '2021-12-19 16:43:26', 4253, '2021-12-19 16:43:26'),
(116, 'zxczxczxc', 'zxczxczxczxc', '', 1, 2, 35, 1, NULL, 0, 4253, '2021-12-19 16:45:42', 4253, '2021-12-19 16:45:42');

-- --------------------------------------------------------

--
-- Table structure for table `project_member`
--

CREATE TABLE `project_member` (
  `MemberID` int(5) UNSIGNED NOT NULL,
  `UserID` int(5) DEFAULT NULL,
  `ProjectID` int(5) DEFAULT NULL,
  `RequestStatusID` int(5) NOT NULL,
  `CreatedBy` int(11) DEFAULT NULL,
  `CreatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `project_member`
--

INSERT INTO `project_member` (`MemberID`, `UserID`, `ProjectID`, `RequestStatusID`, `CreatedBy`, `CreatedTime`, `UpdatedBy`, `UpdatedTime`) VALUES
(135, 4253, 116, 0, 4253, '2021-12-19 16:45:42', 4253, '2021-12-19 16:45:42'),
(136, 4254, 116, 0, 4253, '2021-12-19 16:45:42', 4253, '2021-12-19 16:45:42');

-- --------------------------------------------------------

--
-- Table structure for table `project_progress`
--

CREATE TABLE `project_progress` (
  `Progress_ID` int(5) UNSIGNED NOT NULL,
  `Progress_Name` varchar(255) NOT NULL,
  `Progress_Start` datetime NOT NULL,
  `Progress_End` datetime NOT NULL,
  `Progress_ProjectID` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `project_progress`
--

INSERT INTO `project_progress` (`Progress_ID`, `Progress_Name`, `Progress_Start`, `Progress_End`, `Progress_ProjectID`) VALUES
(1, 'TEST1', '2020-10-01 06:17:44', '2020-10-23 06:17:44', 24),
(2, 'TEST2', '2020-10-01 06:17:44', '2020-10-23 06:17:44', 24);

-- --------------------------------------------------------

--
-- Table structure for table `project_status`
--

CREATE TABLE `project_status` (
  `ProjectStatusID` int(5) UNSIGNED NOT NULL,
  `ProjectStatusName` varchar(50) DEFAULT NULL,
  `ProjectStatusDetail` varchar(255) DEFAULT NULL,
  `CreatedBy` int(11) DEFAULT NULL,
  `CreatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `project_status`
--

INSERT INTO `project_status` (`ProjectStatusID`, `ProjectStatusName`, `ProjectStatusDetail`, `CreatedBy`, `CreatedTime`, `UpdatedBy`, `UpdatedTime`) VALUES
(1, 'Draft', 'รายการร่าง', NULL, '2021-06-26 12:12:12', NULL, '2021-06-26 12:12:44'),
(2, 'Wair Advisor', 'รอที่ปรึกษา', NULL, '2021-06-26 12:12:12', NULL, '2021-06-26 12:12:52'),
(3, 'Wait Instructor', 'รออาจารย์ประจำวิชา', NULL, '2021-06-26 12:12:12', NULL, '2021-06-26 12:13:02'),
(4, 'In Progress', 'กำลังดำเนินการ', NULL, '2021-06-26 12:12:12', NULL, '2021-06-26 12:13:11'),
(5, 'Incomplete', 'ติด I', NULL, '2021-06-26 12:12:12', NULL, '2021-06-26 12:13:28'),
(6, 'Failure', 'สอบไม่ผ่าน', NULL, '2021-06-26 12:12:12', NULL, '2021-07-18 16:27:37'),
(7, 'Completed', 'เสร็จสมบูรณ์', NULL, '2021-06-26 12:12:12', NULL, '2021-07-18 16:27:08'),
(8, 'Rejected', 'ถูกปฏิเสธ', NULL, '2021-06-26 12:12:12', NULL, '2021-06-26 12:14:21');

-- --------------------------------------------------------

--
-- Table structure for table `project_type`
--

CREATE TABLE `project_type` (
  `ProjectTypeID` int(5) UNSIGNED NOT NULL,
  `ProjectTypeNameTH` varchar(50) DEFAULT NULL,
  `ProjectTypeNameEN` varchar(50) DEFAULT NULL,
  `CreatedBy` int(11) DEFAULT NULL,
  `CreatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `project_type`
--

INSERT INTO `project_type` (`ProjectTypeID`, `ProjectTypeNameTH`, `ProjectTypeNameEN`, `CreatedBy`, `CreatedTime`, `UpdatedBy`, `UpdatedTime`) VALUES
(1, 'ฮาร์ดแวร์', 'Hardware', NULL, '2021-06-26 12:17:20', NULL, '2021-07-16 14:33:20'),
(2, 'ซอฟต์แวร์', 'Software', NULL, '2021-06-26 12:17:20', NULL, '2021-06-26 12:18:18'),
(3, 'ฮาร์ดแวร์และซอฟต์แวร์', 'Hardware and Software', NULL, '2021-06-26 12:17:20', NULL, '2021-06-26 12:18:33');

-- --------------------------------------------------------

--
-- Table structure for table `section`
--

CREATE TABLE `section` (
  `SectionID` int(5) UNSIGNED NOT NULL,
  `Subject` int(11) DEFAULT NULL,
  `Sequence` int(11) DEFAULT NULL,
  `Year` varchar(10) DEFAULT NULL,
  `Term` int(1) NOT NULL,
  `Detail` varchar(255) DEFAULT NULL,
  `Instructor` int(11) DEFAULT NULL,
  `DayOfWeek` int(11) DEFAULT NULL,
  `StartTime` time DEFAULT NULL,
  `EndTime` time DEFAULT NULL,
  `CreatedBy` int(11) DEFAULT NULL,
  `CreatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `section`
--

INSERT INTO `section` (`SectionID`, `Subject`, `Sequence`, `Year`, `Term`, `Detail`, `Instructor`, `DayOfWeek`, `StartTime`, `EndTime`, `CreatedBy`, `CreatedTime`, `UpdatedBy`, `UpdatedTime`) VALUES
(35, 1, 1, '2021', 1, NULL, 4295, 4, '21:35:00', '22:35:00', 1, '2021-12-19 14:35:16', 1, '2021-12-19 14:35:16');

-- --------------------------------------------------------

--
-- Table structure for table `user_profile`
--

CREATE TABLE `user_profile` (
  `UserID` int(5) UNSIGNED NOT NULL,
  `Username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `Password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `Prefix` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Firstname` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Lastname` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `StudentID` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `TelephoneNo` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `AcademicYear` varchar(4) COLLATE utf8_unicode_ci DEFAULT NULL,
  `UserTypeID` int(5) NOT NULL,
  `IsActive` tinyint(1) NOT NULL,
  `ImgProfile` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `CreatedBy` int(11) DEFAULT NULL,
  `CreatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user_profile`
--

INSERT INTO `user_profile` (`UserID`, `Username`, `Password`, `Prefix`, `Firstname`, `Lastname`, `StudentID`, `Email`, `TelephoneNo`, `AcademicYear`, `UserTypeID`, `IsActive`, `ImgProfile`, `CreatedBy`, `CreatedTime`, `UpdatedBy`, `UpdatedTime`) VALUES
(1, 'admin', '$2b$10$FTZK7HKf8R8NJ11iKZ5s1uD5zfGkuJG4P5w3fRdGSsvFHl8LC2SqC', NULL, 'admin', 'admin', NULL, NULL, NULL, NULL, 4, 1, NULL, NULL, '2021-12-19 13:36:17', NULL, '2021-12-19 13:36:48'),
(4253, 'user02', '$2b$10$ZxnEctzZWUNFQYqkL1vYxukTrJ5wYD3DpeRsEKVwocavov2/8eiKe', 'นาย', 'กฤษติพงศ์', 'ชัยตัน', '59543206001-9', '', '', '2559', 1, 1, '96f35242-6f12-457d-9fd8-caf4cf69a236.jpg', 1, '2021-12-19 14:34:39', 1, '2021-12-19 16:56:52'),
(4254, 'user03', '$2b$10$1OnJgiSKyjtv5oXszrnEeOdQfcDb.4icfMWJRGJg4rjTJqaZKCg2O', 'นาย', 'กิตติธัช', 'วัฒนานุกร', '59543206002-7', '', '', '2559', 1, 1, NULL, 1, '2021-12-19 14:34:39', 1, '2021-12-19 14:34:39'),
(4255, 'user04', '$2b$10$n3RvrE0GgU5rwMUGfRrr7OTkA7zveFN3wL0XyUPgAirWadKYiOpW2', 'นาย', 'ชนชนนท์', 'หาวา', '59543206006-8', '', '', '2559', 1, 1, NULL, 1, '2021-12-19 14:34:39', 1, '2021-12-19 14:34:39'),
(4256, 'user05', '$2b$10$.I93k8.2ZA7TPVGI01pe6OseoNLojgksLlef/YPm1pmtM1q/Kgi/C', 'นาย', 'ชาคริต', 'ใจเย็น', '59543206007-6', '', '', '2559', 1, 1, NULL, 1, '2021-12-19 14:34:39', 1, '2021-12-19 14:34:39'),
(4257, 'user06', '$2b$10$SHZ8AAxq/MoY4s.29Vg4kO8VqbgtFeoBnyiwOJ/AFRKO2LRmqnGra', 'นาย', 'ณัฐสิษธิ์', 'สุขประเสริฐ', '59543206008-4', '', '', '2559', 1, 1, NULL, 1, '2021-12-19 14:34:39', 1, '2021-12-19 14:34:39'),
(4258, 'user07', '$2b$10$9FDtmGAd7i8zyr3dZLVbNuBK08FVG4MfFhNaAS9A1W9ZuBEKi/Azm', 'นาย', 'ดัตวศุทธิ์', 'อินผูก', '59543206009-2', '', '', '2559', 1, 1, NULL, 1, '2021-12-19 14:34:39', 1, '2021-12-19 14:34:39'),
(4259, 'user08', '$2b$10$XwMRqZFfPV2uk1bUzG8pZeLbWTXZzeZhX5ytgAmVmrjs07YpdJd1q', 'นาย', 'ธรรมชาติ', 'สุรินทร์', '59543206012-6', '', '', '2559', 1, 1, NULL, 1, '2021-12-19 14:34:39', 1, '2021-12-19 14:34:39'),
(4260, 'user09', '$2b$10$dTvPGEBbSFF6BOhXRT4KPebgoFvZyukX34YVAZW7tWfnvTEVJUKe2', 'นาย', 'ปิยพงศ์', 'สุขทองงาม', '59543206015-9', '', '', '2559', 1, 1, NULL, 1, '2021-12-19 14:34:39', 1, '2021-12-19 14:34:39'),
(4261, 'user10', '$2b$10$sGoCoKBJXmqU4rZ0CQhZ8.wZFMJZgP2XDGgHvhgeP5rqHxd1CZDmy', 'นางสาว', 'พงศ์ลดา', 'จิตติกรกาญจน์', '59543206016-7', '', '', '2559', 1, 1, NULL, 1, '2021-12-19 14:34:39', 1, '2021-12-19 14:34:39'),
(4262, 'user11', '$2b$10$fx8g7JRtuV02oia4z9osyedsA6vmapgLt48yrzlJYELAYN/PrRcsa', 'นาย', 'พลเชษฐ์', 'คำมุง', '59543206017-5', '', '', '2559', 1, 1, NULL, 1, '2021-12-19 14:34:39', 1, '2021-12-19 14:34:39'),
(4263, 'user12', '$2b$10$dheR9Kdcs/OCSe8eyx1Fwe65zYXvr85aJzsK/E9eizPLoBtURXdeS', 'นาย', 'ภานุเดช', 'ขันธ์สำราญ', '59543206018-3', '', '', '2559', 1, 1, NULL, 1, '2021-12-19 14:34:39', 1, '2021-12-19 14:34:39'),
(4264, 'user13', '$2b$10$JY4R0lH1tgrjABL7EagV6.HPB8QYnp8eV/BuhYZ8xqMaijmPW5w96', 'นาย', 'วิรยุทร', 'บัวเพชร', '59543206019-1', '', '', '2559', 1, 1, NULL, 1, '2021-12-19 14:34:39', 1, '2021-12-19 14:34:39'),
(4265, 'user14', '$2b$10$oQurafwCjdLPXuIDUAx53O2zyzTnuEfGoWNDyzuBW/VD7L8rHvVvO', 'นาย', 'ศักดิ์ดากรณ์', 'สุขไกว', '59543206020-9', '', '', '2559', 1, 1, NULL, 1, '2021-12-19 14:34:39', 1, '2021-12-19 14:34:39'),
(4266, 'user15', '$2b$10$g0ogBMbQNbJVwIurstTn2.mh4KPHQG/jgDmF0Dcn6A7q5mLsxI1kS', 'นาย', 'ศุภกิจ', 'คิดหมาย', '59543206021-7', '', '', '2559', 1, 1, NULL, 1, '2021-12-19 14:34:39', 1, '2021-12-19 14:34:39'),
(4267, 'user16', '$2b$10$ACxG7Qb559gszBbycpF1QuDTb4SThUITYc/T.1a5N9SCb3JZBYvg.', 'นาย', 'อิทธิพันธ์', 'พุทธสันตพงศ์', '59543206023-3', '', '', '2559', 1, 1, NULL, 1, '2021-12-19 14:34:39', 1, '2021-12-19 14:34:39'),
(4268, 'user17', '$2b$10$kYxoQ7Dlc14h6rT13abqK.ZWyl8DTtKTFD9ph.3G5V.XS0Q560Mim', 'นาย', 'เอื้ออังกูล', 'พันธ์วงค์', '59543206024-1', '', '', '2559', 1, 1, NULL, 1, '2021-12-19 14:34:39', 1, '2021-12-19 14:34:39'),
(4269, 'user18', '$2b$10$9CyphfcaM7PzjfWgOB3dYeuL5dMarfSRl6Cimuj6C.LwmdtHeRgoC', 'นาย', 'กฤติพงศ์', 'วชิรางกุล', '59543206026-6', '', '', '2559', 1, 1, NULL, 1, '2021-12-19 14:34:39', 1, '2021-12-19 14:34:39'),
(4270, 'user19', '$2b$10$UbZdthjsw0BVMgZqmmR3..aHRHG3cj/mNBP3W22GZfxX.hhlREgxC', 'นาย', 'จักรกฤษ', 'ทาอภัย', '59543206028-2', '', '', '2559', 1, 1, NULL, 1, '2021-12-19 14:34:39', 1, '2021-12-19 14:34:39'),
(4271, 'user20', '$2b$10$3aX5Mju2KCpfZxN9nIrsOe8bEDrX6wXz1rZ6W402ogxrU67iR0xpy', 'นาย', 'จิรวัฒน์', 'สุภาธง', '59543206029-0', '', '', '2559', 1, 1, NULL, 1, '2021-12-19 14:34:39', 1, '2021-12-19 14:34:39'),
(4272, 'user21', '$2b$10$8unexeDWWDDXOeeETUitu.bJBngwTfcpG.NQqkJOHcRAs9s5WDSi2', 'นาย', 'เจษฎา', 'ปราศรัย', '59543206030-8', '', '', '2559', 1, 1, NULL, 1, '2021-12-19 14:34:39', 1, '2021-12-19 14:34:39'),
(4273, 'user22', '$2b$10$.gU7EGRZdLoJihIUrik8huDtEBkgCe90tvfFy2ENEguTAeJ4SWpgO', 'นาย', 'ชนม์แดน', 'อุตตาลกาญจนา', '59543206031-6', '', '', '2559', 1, 1, NULL, 1, '2021-12-19 14:34:39', 1, '2021-12-19 14:34:39'),
(4274, 'user23', '$2b$10$TKXsM6HeJV8qHUvRVf3fHOwVMWNiFHi2cV1djf06DLl6.l3mmt/Ze', 'นาย', 'ชัชวาล', 'ถาคำ', '59543206032-4', '', '', '2559', 1, 1, NULL, 1, '2021-12-19 14:34:39', 1, '2021-12-19 14:34:39'),
(4275, 'user24', '$2b$10$mrnrcF0/sWstZNMcPnxBv.n0dRjHP41ZyIQmfMmOqGFvDTUwlfi9m', 'นาย', 'ชัยชาญ', 'แต้มคู', '59543206033-2', '', '', '2559', 1, 1, NULL, 1, '2021-12-19 14:34:39', 1, '2021-12-19 14:34:39'),
(4276, 'user25', '$2b$10$arp.dwR/WGqiDj/cDkm2pegx3LRYgV5oFe8wcteH/m7/6PMGXPo4u', 'นาย', 'ชำนาญ', 'แต้มคู', '59543206034-0', '', '', '2559', 1, 1, NULL, 1, '2021-12-19 14:34:39', 1, '2021-12-19 14:34:39'),
(4277, 'user26', '$2b$10$saRo0Aq4tmvJ.ZV.iiUsGO/3Own0vmgFja44WJT1rXYjsu4e4nGsu', 'นางสาว', 'ฐิติยา', 'มะโนวัง', '59543206035-7', '', '', '2559', 1, 1, NULL, 1, '2021-12-19 14:34:39', 1, '2021-12-19 14:34:39'),
(4278, 'user27', '$2b$10$mYeADQ.MaxnW9jgt7qnQKuh0cdPU4Y6i0kV1MxM9lmzwrTWGnrfQy', 'นาย', 'ณัฐดนัย', 'จิระกังวาน', '59543206037-3', '', '', '2559', 1, 1, NULL, 1, '2021-12-19 14:34:39', 1, '2021-12-19 14:34:39'),
(4279, 'user28', '$2b$10$k7XGZtFao/bLSpARH21teO4FY/1m5H7EU5md2ywJzvqe3zYcpXOOO', 'นาย', 'ทินวัฒน์', 'มูลซาว', '59543206038-1', '', '', '2559', 1, 1, NULL, 1, '2021-12-19 14:34:39', 1, '2021-12-19 14:34:39'),
(4280, 'user29', '$2b$10$Aiwq.8aVLeOFFBDeth10FeN0aSIc0YB8EPtfqsrtZjlPNFo9jzYp6', 'นาย', 'บุญฤทธิ์', 'ดวงหิรัญภักดี', '59543206040-7', '', '', '2559', 1, 1, NULL, 1, '2021-12-19 14:34:39', 1, '2021-12-19 14:34:39'),
(4281, 'user30', '$2b$10$bW3MNRxtYEO70xUSFREzZ.UF8lwjiCA6/5nBBtYlnkVB8VAzlIcP2', 'นาย', 'พงสกร', 'พิทักษ์คณิคกุล', '59543206042-3', '', '', '2559', 1, 1, NULL, 1, '2021-12-19 14:34:39', 1, '2021-12-19 14:34:39'),
(4282, 'user31', '$2b$10$JqeBGvpQVLdIxJOUTrelBOqteMS73YeGQ1RSwOR.MSFKetwoHU5Za', 'นาย', 'พฤทธ์บดินทร์', 'ปุณณะบุตร', '59543206043-1', '', '', '2559', 1, 1, NULL, 1, '2021-12-19 14:34:39', 1, '2021-12-19 14:34:39'),
(4283, 'user32', '$2b$10$zp9K8pkDVzjfMfDoZj45/eLzFgNMf1cMDT1AylV/ReJcCw98fRCGq', 'นาย', 'พิชญะ', 'อิทร์บัว', '59543206044-9', '', '', '2559', 1, 1, NULL, 1, '2021-12-19 14:34:39', 1, '2021-12-19 14:34:39'),
(4284, 'user33', '$2b$10$Wu.wegMx7JQk5on36XXVfuYjpT.4ur4Cy42Wxpat2ZdN1QVAoc6nm', 'นาย', 'พิสิทธิ์', 'มูลเฟย', '59543206045-6', '', '', '2559', 1, 1, NULL, 1, '2021-12-19 14:34:39', 1, '2021-12-19 14:34:39'),
(4285, 'user34', '$2b$10$ZTwONvqWVlAnXKHCDzhGkObCGm9VdXVp9FbE1q7pF5Wk/A8JYr4sW', 'นาย', 'ภาณุวัฒ', 'สืบมงคลชัย', '59543206046-4', '', '', '2559', 1, 1, NULL, 1, '2021-12-19 14:34:39', 1, '2021-12-19 14:34:39'),
(4286, 'user35', '$2b$10$Tko6wtDrHE2Z/Cizr2aW1OSFwNpjZi9X.mau1U.ERawMgS0ztJxtC', 'นาย', 'ภานุพงษ์', 'เทพเมือง', '59543206047-2', '', '', '2559', 1, 1, NULL, 1, '2021-12-19 14:34:39', 1, '2021-12-19 14:34:39'),
(4287, 'user36', '$2b$10$Qo7BeRx97HC02mWkKkwGAeddJYq13HYyCS4ukZ5UvQ5T4IJN1gUwm', 'นาย', 'โรบิ้น', 'ซิ้งค์', '59543206048-0', '', '', '2559', 1, 1, NULL, 1, '2021-12-19 14:34:39', 1, '2021-12-19 14:34:39'),
(4288, 'user37', '$2b$10$feM0EEbWhL0bPytNRUGbO.fCGLlBTQ1J2EBjwehRckdkJMLylf4wm', 'นาย', 'วรภพ', 'โสมนัส', '59543206049-8', '', '', '2559', 1, 1, NULL, 1, '2021-12-19 14:34:39', 1, '2021-12-19 14:34:39'),
(4289, 'user38', '$2b$10$NNE4iYDs6u6AfsBNlKbSLO0jaR5qh1/fOXZTzHTsYHQeG9qd2LcWO', 'นาย', 'วุฒิพงษ์', 'สูตรเลข', '59543206052-2', '', '', '2559', 1, 1, NULL, 1, '2021-12-19 14:34:39', 1, '2021-12-19 14:34:39'),
(4290, 'user39', '$2b$10$nrJoSg8PQdPw21T7.lvUJeG5LocCJDEiAvQCUkyo62uaX3sUsGYa.', 'นาย', 'สมภพ', 'แก้วขวัญไกร', '59543206054-8', '', '', '2559', 1, 1, NULL, 1, '2021-12-19 14:34:39', 1, '2021-12-19 14:34:39'),
(4291, 'user40', '$2b$10$2a.n4XmdnKgebAow5C/HeOO8aZ6lRGLiM1BWNQgl4anNtC4ieApTa', 'นาย', 'สรนันท์', 'จันทาชา', '59543206055-5', '', '', '2559', 1, 1, NULL, 1, '2021-12-19 14:34:39', 1, '2021-12-19 14:34:39'),
(4292, 'user41', '$2b$10$lVN9t2yLW./BlWZ63vqpoOG8.jwNepc7zY5GDleDmI9TUl2BdYX2K', 'นางสาว', 'สุคนธ์ทิพย์', 'โกฏิคำ', '59543206056-3', '', '', '2559', 1, 1, NULL, 1, '2021-12-19 14:34:39', 1, '2021-12-19 14:34:39'),
(4293, 'user42', '$2b$10$jXMlqZDvfPkZy5pNBT1ybuFBXziiekLegS0ljvq5dnG51NS/PFwOC', 'นาย', 'สุทธิรักษา', 'ธรรมใจ', '59543206057-1', '', '', '2559', 1, 1, NULL, 1, '2021-12-19 14:34:39', 1, '2021-12-19 14:34:39'),
(4294, 'user43', '$2b$10$DtjNNq0oYBM3oGp3CjMuteH4gwOySl3FrjBKBSU.a2PX5jYCa8OEa', 'นาย', 'อัมรินทร์', 'อัมรารัมย์', '59543206058-9', '', '', '2559', 1, 1, NULL, 1, '2021-12-19 14:34:39', 1, '2021-12-19 14:34:39'),
(4295, 'teacher1', '$2b$10$ycs72K7wSxBKhJJhtJTdOOrMsN2zwAJCGQH6srXhZDp47CkO6iHei', 'นาย', 'ปรัชญ์', 'ปิยะวงศ์วิศาล', '', '', '', '', 2, 1, NULL, 1, '2021-12-19 14:34:39', 1, '2021-12-19 14:34:39'),
(4296, 'teacher2', '$2b$10$KGaPMn7MRG265GHgDVyE5eCebXWbCZhhSAe9KlW5E9dAg2B1LGw1i', 'นาย', 'อนุชล', 'หอมเสียง', '', '', '', '', 2, 1, NULL, 1, '2021-12-19 14:34:39', 1, '2021-12-19 14:34:39');

-- --------------------------------------------------------

--
-- Table structure for table `user_type`
--

CREATE TABLE `user_type` (
  `UserTypeID` int(5) UNSIGNED NOT NULL,
  `UserTypeName` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `UserTypeNameEN` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `CreatedBy` int(11) DEFAULT NULL,
  `CreatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user_type`
--

INSERT INTO `user_type` (`UserTypeID`, `UserTypeName`, `UserTypeNameEN`, `CreatedBy`, `CreatedTime`, `UpdatedBy`, `UpdatedTime`) VALUES
(1, 'นักศึกษา', 'Student', NULL, '2021-06-26 14:36:10', NULL, '2021-06-26 14:36:10'),
(2, 'อาจารย์', 'Teacher', NULL, '2021-06-26 14:36:10', NULL, '2021-06-26 14:36:10'),
(3, 'อาจารย์ประจำวิชา Pre-Project', 'Pre-Project Instructor', NULL, '2021-06-26 14:36:10', NULL, '2021-08-07 11:12:30'),
(4, 'ผู้ดูแลระบบ', 'Admin', NULL, '2021-06-26 14:36:10', NULL, '2021-06-26 14:36:10'),
(5, 'อาจารย์ประจำวิชา Project', 'Project Instructor', NULL, '2021-08-07 08:20:23', NULL, '2021-08-07 11:12:23');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `app_environments`
--
ALTER TABLE `app_environments`
  ADD PRIMARY KEY (`EnvID`);

--
-- Indexes for table `app_menus`
--
ALTER TABLE `app_menus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `app_privileges`
--
ALTER TABLE `app_privileges`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `deadline`
--
ALTER TABLE `deadline`
  ADD PRIMARY KEY (`DeadlineID`),
  ADD KEY `Deadline_SectionID` (`SectionID`),
  ADD KEY `Deadline_FormTypeID` (`FormTypeID`);

--
-- Indexes for table `document`
--
ALTER TABLE `document`
  ADD PRIMARY KEY (`Document_ID`);

--
-- Indexes for table `example_file`
--
ALTER TABLE `example_file`
  ADD PRIMARY KEY (`ExampleFileID`);

--
-- Indexes for table `form_comment`
--
ALTER TABLE `form_comment`
  ADD PRIMARY KEY (`CommentID`);

--
-- Indexes for table `form_prerequisite`
--
ALTER TABLE `form_prerequisite`
  ADD PRIMARY KEY (`PrerequisiteID`);

--
-- Indexes for table `form_sent`
--
ALTER TABLE `form_sent`
  ADD PRIMARY KEY (`FormID`);

--
-- Indexes for table `form_status`
--
ALTER TABLE `form_status`
  ADD PRIMARY KEY (`FormStatusID`);

--
-- Indexes for table `form_type`
--
ALTER TABLE `form_type`
  ADD PRIMARY KEY (`FormTypeID`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`NotiID`);

--
-- Indexes for table `notification_types`
--
ALTER TABLE `notification_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `project_advisor`
--
ALTER TABLE `project_advisor`
  ADD PRIMARY KEY (`AdvisorID`);

--
-- Indexes for table `project_committee`
--
ALTER TABLE `project_committee`
  ADD PRIMARY KEY (`CommitteeID`);

--
-- Indexes for table `project_committee_role`
--
ALTER TABLE `project_committee_role`
  ADD PRIMARY KEY (`CommitteeRoleID`);

--
-- Indexes for table `project_info`
--
ALTER TABLE `project_info`
  ADD PRIMARY KEY (`ProjectID`);

--
-- Indexes for table `project_member`
--
ALTER TABLE `project_member`
  ADD PRIMARY KEY (`MemberID`);

--
-- Indexes for table `project_progress`
--
ALTER TABLE `project_progress`
  ADD PRIMARY KEY (`Progress_ID`);

--
-- Indexes for table `project_status`
--
ALTER TABLE `project_status`
  ADD PRIMARY KEY (`ProjectStatusID`);

--
-- Indexes for table `project_type`
--
ALTER TABLE `project_type`
  ADD PRIMARY KEY (`ProjectTypeID`);

--
-- Indexes for table `section`
--
ALTER TABLE `section`
  ADD PRIMARY KEY (`SectionID`);

--
-- Indexes for table `user_profile`
--
ALTER TABLE `user_profile`
  ADD PRIMARY KEY (`UserID`),
  ADD UNIQUE KEY `Username` (`Username`),
  ADD KEY `User_TypeID` (`UserTypeID`);

--
-- Indexes for table `user_type`
--
ALTER TABLE `user_type`
  ADD PRIMARY KEY (`UserTypeID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `app_environments`
--
ALTER TABLE `app_environments`
  MODIFY `EnvID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `app_menus`
--
ALTER TABLE `app_menus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `app_privileges`
--
ALTER TABLE `app_privileges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `deadline`
--
ALTER TABLE `deadline`
  MODIFY `DeadlineID` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=302;

--
-- AUTO_INCREMENT for table `document`
--
ALTER TABLE `document`
  MODIFY `Document_ID` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `example_file`
--
ALTER TABLE `example_file`
  MODIFY `ExampleFileID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `form_comment`
--
ALTER TABLE `form_comment`
  MODIFY `CommentID` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `form_prerequisite`
--
ALTER TABLE `form_prerequisite`
  MODIFY `PrerequisiteID` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `form_sent`
--
ALTER TABLE `form_sent`
  MODIFY `FormID` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT for table `form_status`
--
ALTER TABLE `form_status`
  MODIFY `FormStatusID` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `form_type`
--
ALTER TABLE `form_type`
  MODIFY `FormTypeID` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `NotiID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `notification_types`
--
ALTER TABLE `notification_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `project_advisor`
--
ALTER TABLE `project_advisor`
  MODIFY `AdvisorID` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=191;

--
-- AUTO_INCREMENT for table `project_committee`
--
ALTER TABLE `project_committee`
  MODIFY `CommitteeID` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `project_committee_role`
--
ALTER TABLE `project_committee_role`
  MODIFY `CommitteeRoleID` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `project_info`
--
ALTER TABLE `project_info`
  MODIFY `ProjectID` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=117;

--
-- AUTO_INCREMENT for table `project_member`
--
ALTER TABLE `project_member`
  MODIFY `MemberID` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=137;

--
-- AUTO_INCREMENT for table `project_progress`
--
ALTER TABLE `project_progress`
  MODIFY `Progress_ID` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `project_status`
--
ALTER TABLE `project_status`
  MODIFY `ProjectStatusID` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `project_type`
--
ALTER TABLE `project_type`
  MODIFY `ProjectTypeID` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `section`
--
ALTER TABLE `section`
  MODIFY `SectionID` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `user_profile`
--
ALTER TABLE `user_profile`
  MODIFY `UserID` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4297;

--
-- AUTO_INCREMENT for table `user_type`
--
ALTER TABLE `user_type`
  MODIFY `UserTypeID` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
