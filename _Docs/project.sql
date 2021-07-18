-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 12, 2021 at 07:20 PM
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
-- Table structure for table `app_menus`
--

CREATE TABLE `app_menus` (
  `id` int(11) NOT NULL,
  `MenuID` int(11) NOT NULL,
  `ParentID` int(11) NOT NULL,
  `Sequence` int(11) NOT NULL,
  `MenuName` varchar(255) DEFAULT NULL,
  `Icon` varchar(255) DEFAULT NULL,
  `IconAlt` varchar(255) NOT NULL,
  `CreatedBy` int(11) DEFAULT NULL,
  `CreatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `app_menus`
--

INSERT INTO `app_menus` (`id`, `MenuID`, `ParentID`, `Sequence`, `MenuName`, `Icon`, `IconAlt`, `CreatedBy`, `CreatedTime`, `UpdatedBy`, `UpdatedTime`) VALUES
(1, 10, 0, 1, 'ภาพรวม', 'mdi-chart-bar', '', NULL, '2021-06-26 11:50:06', NULL, '2021-06-26 11:50:06'),
(2, 20, 0, 3, 'โปรเจ็ค', 'mdi-group', '', NULL, '2021-06-26 11:50:06', NULL, '2021-06-26 11:50:06'),
(3, 30, 0, 3, 'เอกสาร', 'mdi-bookshelf', '', NULL, '2021-06-26 11:50:06', NULL, '2021-06-26 11:50:06'),
(4, 40, 0, 4, 'คำขออนุมัติ', 'mdi-chevron-up', 'mdi-chevron-down', NULL, '2021-06-26 11:50:06', NULL, '2021-06-26 11:50:06'),
(5, 41, 40, 7, 'ขอสอบ', 'mdi-teach', '', NULL, '2021-06-26 11:50:06', NULL, '2021-06-26 11:50:06'),
(6, 42, 40, 6, 'ขออนุมัติเอกสาร', 'mdi-file-document-edit-outline', '', NULL, '2021-06-26 11:50:06', NULL, '2021-06-26 11:50:06'),
(7, 43, 40, 5, 'ขออนุมัติเป็นที่ปรึกษา', 'mdi-file-document-edit-outline', '', NULL, '2021-06-26 11:50:06', NULL, '2021-06-26 11:50:06'),
(8, 50, 0, 8, 'คู่มือปริญญานิพนธ์', 'mdi-bookshelf', '', NULL, '2021-06-26 11:50:06', NULL, '2021-06-26 11:50:06'),
(9, 60, 0, 9, 'จัดการทรัพยากร', 'mdi-group', '', NULL, '2021-06-26 11:50:06', NULL, '2021-06-26 11:50:06'),
(10, 70, 0, 2, 'โปรเจ็คทั้งหมด', 'mdi-group', '', NULL, '2021-06-26 11:50:06', NULL, '2021-06-26 11:50:06'),
(11, 80, 0, 5, 'นัดหมาย', 'mdi-bookshelf', '', NULL, '2021-06-26 11:50:06', NULL, '2021-07-11 18:29:14'),
(12, 90, 0, 5, 'บันทึกความก้าวหน้า', NULL, '', NULL, '2021-06-26 11:50:06', NULL, '2021-06-26 11:50:06'),
(13, 100, 0, 3, 'โปรเจ็คในความดูแล', 'mdi-group', '', NULL, '2021-06-26 11:50:06', NULL, '2021-06-26 11:50:06'),
(14, 110, 40, 8, 'โปรเจ็คใหม่', 'mdi-group', '', NULL, '2021-06-26 11:50:06', NULL, '2021-06-26 11:50:06');

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
(1, 1, 10, '/student/overview', NULL, '2021-06-26 11:52:02', NULL, '2021-06-26 11:52:02'),
(2, 2, 10, '/teacher/overview', NULL, '2021-06-26 11:52:02', NULL, '2021-06-26 11:52:02'),
(3, 1, 20, '/student/project', NULL, '2021-06-26 11:52:02', NULL, '2021-06-26 11:52:02'),
(5, 1, 30, '/student/documents', NULL, '2021-06-26 11:52:02', NULL, '2021-06-26 11:52:02'),
(7, 2, 40, '', NULL, '2021-06-26 11:52:02', NULL, '2021-06-26 11:52:02'),
(8, 2, 41, '/teacher/test_req', NULL, '2021-06-26 11:52:02', NULL, '2021-06-26 11:52:02'),
(9, 2, 42, '/teacher/approvement_req', NULL, '2021-06-26 11:52:02', NULL, '2021-06-26 11:52:02'),
(10, 2, 43, '/teacher/adviser_req', NULL, '2021-06-26 11:52:02', NULL, '2021-06-26 11:52:02'),
(11, 1, 50, '/student/project_manual', NULL, '2021-06-26 11:52:02', NULL, '2021-06-26 11:52:02'),
(12, 2, 50, '/teacher/project_manual', NULL, '2021-06-26 11:52:02', NULL, '2021-06-26 11:52:02'),
(13, 3, 60, '/teacher/app_configs', NULL, '2021-06-26 11:52:02', NULL, '2021-06-26 11:52:02'),
(14, 2, 70, '/teacher/all_project', NULL, '2021-06-26 11:52:02', NULL, '2021-06-26 11:52:02'),
(15, 2, 100, '/teacher/project', NULL, '2021-06-26 11:52:02', NULL, '2021-06-26 11:52:02'),
(16, 1, 70, '/student/all_project', NULL, '2021-06-26 11:52:02', NULL, '2021-06-26 11:52:02'),
(17, 3, 10, '/teacher/overview', NULL, '2021-06-26 11:52:02', NULL, '2021-06-26 11:52:02'),
(18, 3, 40, '', NULL, '2021-06-26 11:52:02', NULL, '2021-06-26 11:52:02'),
(19, 3, 41, '/teacher/test_req', NULL, '2021-06-26 11:52:02', NULL, '2021-06-26 11:52:02'),
(20, 3, 42, '/teacher/approvement_req', NULL, '2021-06-26 11:52:02', NULL, '2021-06-26 11:52:02'),
(21, 3, 43, '/teacher/adviser_req', NULL, '2021-06-26 11:52:02', NULL, '2021-06-26 11:52:02'),
(22, 3, 50, '/teacher/project_manual', NULL, '2021-06-26 11:52:02', NULL, '2021-06-26 11:52:02'),
(23, 3, 70, '/teacher/all_project', NULL, '2021-06-26 11:52:02', NULL, '2021-06-26 11:52:02'),
(24, 3, 100, '/teacher/project', NULL, '2021-06-26 11:52:02', NULL, '2021-06-26 11:52:02'),
(25, 3, 110, '/teacher/new_projects', NULL, '2021-06-26 11:52:02', NULL, '2021-06-26 11:52:02'),
(26, 1, 80, '/student/appointment', NULL, '2021-07-09 14:46:38', NULL, '2021-07-09 14:46:38'),
(27, 2, 80, '/teacher/appointment', NULL, '2021-07-09 14:46:58', NULL, '2021-07-09 14:46:58'),
(28, 3, 80, '/teacher/appointment', NULL, '2021-07-09 15:08:28', NULL, '2021-07-09 15:08:28');

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
(17, 1, 1, '2021-07-11 01:19:00', NULL, '2021-07-11 16:29:24', 5, '2021-07-11 18:19:49'),
(18, 1, 2, '2021-07-22 05:01:00', NULL, '2021-07-11 17:59:05', 5, '2021-07-11 18:01:37'),
(19, 1, 3, NULL, NULL, '2021-07-11 17:59:20', 5, '2021-07-11 18:26:59'),
(20, 1, 4, NULL, NULL, '2021-07-11 17:59:31', 5, '2021-07-11 18:18:04'),
(21, 1, 5, NULL, NULL, '2021-07-11 17:59:40', 5, '2021-07-11 18:27:05'),
(22, 1, 6, NULL, NULL, '2021-07-11 17:59:48', 5, '2021-07-11 18:18:07'),
(23, 1, 7, NULL, NULL, '2021-07-11 17:59:54', 5, '2021-07-11 18:18:10'),
(24, 2, 1, NULL, NULL, '2021-07-11 18:00:22', 5, '2021-07-11 18:17:55'),
(25, 2, 2, NULL, NULL, '2021-07-11 18:00:28', 5, '2021-07-11 18:01:38'),
(26, 2, 3, NULL, NULL, '2021-07-11 18:00:34', 5, '2021-07-11 18:26:59'),
(27, 2, 4, NULL, NULL, '2021-07-11 18:00:40', 5, '2021-07-11 18:18:04'),
(28, 2, 5, NULL, NULL, '2021-07-11 18:00:50', 5, '2021-07-11 18:27:06'),
(29, 2, 6, NULL, NULL, '2021-07-11 18:00:58', 5, '2021-07-11 18:18:07'),
(30, 2, 7, NULL, NULL, '2021-07-11 18:01:03', 5, '2021-07-11 18:18:10'),
(47, 1, 20, NULL, 5, '2021-07-12 15:48:15', 5, '2021-07-12 15:48:15'),
(48, 2, 20, NULL, 5, '2021-07-12 15:48:15', 5, '2021-07-12 15:48:15'),
(49, 1, 21, '2021-07-29 22:50:00', 5, '2021-07-12 15:50:30', 5, '2021-07-12 15:50:30'),
(50, 2, 21, '2021-07-12 01:50:00', 5, '2021-07-12 15:50:30', 5, '2021-07-12 15:50:30'),
(51, 8, 21, '2021-07-12 22:54:00', 5, '2021-07-12 15:50:30', 5, '2021-07-12 15:50:30'),
(52, 1, 22, NULL, 5, '2021-07-12 16:09:56', 5, '2021-07-12 16:09:56'),
(53, 2, 22, NULL, 5, '2021-07-12 16:09:56', 5, '2021-07-12 16:09:56'),
(54, 8, 22, NULL, 5, '2021-07-12 16:09:56', 5, '2021-07-12 16:09:56'),
(55, 1, 23, NULL, 5, '2021-07-12 16:10:27', 5, '2021-07-12 16:10:27'),
(56, 2, 23, NULL, 5, '2021-07-12 16:10:27', 5, '2021-07-12 16:10:27'),
(57, 8, 23, NULL, 5, '2021-07-12 16:10:27', 5, '2021-07-12 16:10:27'),
(58, 1, 24, '2021-07-15 00:14:00', 5, '2021-07-12 17:14:57', 5, '2021-07-12 17:14:57'),
(59, 2, 24, NULL, 5, '2021-07-12 17:14:57', 5, '2021-07-12 17:14:57'),
(60, 8, 24, NULL, 5, '2021-07-12 17:14:57', 5, '2021-07-12 17:14:57');

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
(8, 27, 'asdasd', 5, '2021-07-09 17:35:05', 5, '2021-07-09 17:35:05');

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
(1, 2, 1, 0, '2021-06-26 11:02:08', NULL, '2021-06-26 11:02:08'),
(2, 3, 1, 0, '2021-06-26 11:02:08', NULL, '2021-06-26 11:02:08'),
(3, 3, 2, 0, '2021-06-26 11:02:08', NULL, '2021-06-26 11:02:08'),
(4, 4, 1, 0, '2021-06-26 11:02:08', NULL, '2021-06-26 11:02:08'),
(5, 4, 2, 0, '2021-06-26 11:02:08', NULL, '2021-06-26 11:02:08'),
(6, 4, 3, 0, '2021-06-26 11:02:08', NULL, '2021-06-26 11:02:08');

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
(26, 35, 1, '3417fb58-b3a3-4d05-96c5-ed8aaecebbed.pdf', 1, NULL, 2, '2021-07-03 11:02:34', 5, '2021-07-03 11:30:56'),
(27, 36, 1, '6eba24a1-703d-47c7-94b2-4a67e770d984.pdf', 5, NULL, 2, '2021-07-09 17:34:43', 5, '2021-07-09 17:58:05');

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
  `Project` tinyint(1) DEFAULT NULL,
  `PreProject` tinyint(1) DEFAULT NULL,
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
(1, 'CE01', NULL, 0, 1, 1, NULL, '2021-06-26 11:05:59', 5, '2021-07-11 18:27:18'),
(2, 'CE02', NULL, 0, 1, 1, NULL, '2021-06-26 11:05:59', 5, '2021-07-12 15:43:07'),
(3, 'CE03', NULL, 0, 1, 1, NULL, '2021-06-26 11:05:59', 5, '2021-07-11 18:27:24'),
(4, 'CE04qqqq', NULL, 0, 1, 1, NULL, '2021-06-26 11:05:59', 5, '2021-07-12 15:43:10'),
(5, 'CE05', NULL, 0, 1, 1, NULL, '2021-06-26 11:05:59', 5, '2021-07-12 15:43:12'),
(6, 'CE06', NULL, 0, 1, 1, NULL, '2021-06-26 11:05:59', 5, '2021-07-12 15:43:15'),
(7, 'CE07', NULL, 0, 1, 1, NULL, '2021-06-26 11:05:59', 5, '2021-07-12 15:43:17'),
(20, 'aaa', '', 1, 1, 0, 5, '2021-07-12 15:48:15', 5, '2021-07-12 17:17:20'),
(21, 'xzxzxzx', '', 1, 1, 1, 5, '2021-07-12 15:50:30', 5, '2021-07-12 15:50:30'),
(22, 'asdasd', '', 0, 0, 1, 5, '2021-07-12 16:09:56', 5, '2021-07-12 16:09:56'),
(23, 'asdasd', '', NULL, 1, 1, 5, '2021-07-12 16:10:27', 5, '2021-07-12 16:10:59'),
(24, 'บทที่ 15', '', 0, 1, 1, 5, '2021-07-12 17:14:57', 5, '2021-07-12 17:14:57');

-- --------------------------------------------------------

--
-- Table structure for table `meeting`
--

CREATE TABLE `meeting` (
  `Meeting_ID` int(5) UNSIGNED NOT NULL,
  `Meeting_Name` varchar(255) NOT NULL,
  `Meeting_Detail` text NOT NULL,
  `Meeting_ProjectID` int(5) NOT NULL,
  `Meeting_TeacherID` int(5) NOT NULL,
  `Meeting_DateTime` datetime NOT NULL,
  `Meeting_RequestStatusID` int(5) NOT NULL,
  `Meeting_TypeID` int(5) NOT NULL,
  `Meeting_Note` varchar(255) DEFAULT NULL,
  `Meeting_IsActive` tinyint(1) NOT NULL,
  `Meeting_CreatedBy` int(11) NOT NULL,
  `Meeting_CreatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Meeting_UpdatedBy` int(11) NOT NULL,
  `Meeting_UpdatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `meeting`
--

INSERT INTO `meeting` (`Meeting_ID`, `Meeting_Name`, `Meeting_Detail`, `Meeting_ProjectID`, `Meeting_TeacherID`, `Meeting_DateTime`, `Meeting_RequestStatusID`, `Meeting_TypeID`, `Meeting_Note`, `Meeting_IsActive`, `Meeting_CreatedBy`, `Meeting_CreatedTime`, `Meeting_UpdatedBy`, `Meeting_UpdatedTime`) VALUES
(6, 'test edited', 'test edited', 24, 1, '2020-10-21 00:00:00', 1, 1, NULL, 0, 0, '2021-07-09 14:58:43', 0, '2021-07-09 14:58:43'),
(7, 'ฟหกฟหก', 'ฟหกฟหก', 0, 4, '2021-07-08 18:20:00', 1, 1, NULL, 0, 2, '2021-07-09 15:01:22', 0, '2021-07-09 15:01:22'),
(8, 'ฟหกฟฟหก', 'ฟหกฟหก', 0, 4, '2021-07-13 17:07:00', 1, 1, NULL, 0, 2, '2021-07-09 15:02:19', 0, '2021-07-09 15:02:19'),
(9, 'sdasd', 'asdasd', 0, 4, '2021-07-09 15:09:00', 1, 1, NULL, 0, 2, '2021-07-09 15:09:15', 0, '2021-07-09 15:09:15'),
(10, 'asd', 'asd', 36, 5, '2021-07-10 10:28:00', 1, 1, NULL, 0, 2, '2021-07-10 10:28:31', 0, '2021-07-10 10:28:31');

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `Notification_ID` int(5) UNSIGNED NOT NULL,
  `Notification_Name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `Notification_Detail` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `Notification_UserID` int(5) NOT NULL,
  `Notification_StatusID` int(5) NOT NULL,
  `Notification_DateTime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `notification`
--

INSERT INTO `notification` (`Notification_ID`, `Notification_Name`, `Notification_Detail`, `Notification_UserID`, `Notification_StatusID`, `Notification_DateTime`) VALUES
(1, 'test', 'test', 1, 1, '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `notification_status`
--

CREATE TABLE `notification_status` (
  `NotificationStatus_ID` int(5) UNSIGNED NOT NULL,
  `NotificationStatus_Name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `notification_status`
--

INSERT INTO `notification_status` (`NotificationStatus_ID`, `NotificationStatus_Name`) VALUES
(1, 'ยังไม่ได้อ่าน'),
(2, 'อ่านแล้ว');

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
(105, 35, 5, 1, 2, '2021-07-03 11:02:01', 5, '2021-07-03 11:02:19'),
(106, 36, 5, 1, 2, '2021-07-09 17:33:25', 5, '2021-07-09 17:34:21'),
(107, 37, 5, NULL, 5, '2021-07-10 10:21:02', 5, '2021-07-10 10:21:02'),
(108, 38, 5, 1, 2, '2021-07-11 18:16:41', 5, '2021-07-11 18:17:29');

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
  `CreatedBy` int(11) DEFAULT NULL,
  `CreatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `project_info`
--

INSERT INTO `project_info` (`ProjectID`, `ProjectNameTH`, `ProjectNameEN`, `ProjectDetail`, `ProjectTypeID`, `MaxMember`, `SectionID`, `ProjectStatusID`, `RejectedRemark`, `CreatedBy`, `CreatedTime`, `UpdatedBy`, `UpdatedTime`) VALUES
(35, 'test', 'test', 'asdasda as dasd ad asd', 1, 1, 1, 4, NULL, 2, '2021-07-03 11:02:01', 5, '2021-07-03 11:02:19'),
(36, 'aaa', 'aaa', 'aaa', 1, 1, 1, 4, NULL, 2, '2021-07-09 17:33:25', 5, '2021-07-09 17:34:21'),
(37, 'ฟหก', 'ฟหก', '', 1, 1, 1, 4, NULL, 5, '2021-07-10 10:21:02', 5, '2021-07-10 10:26:42'),
(38, 'sss', 'sss', 'sss', 1, 1, 1, 4, NULL, 2, '2021-07-11 18:16:41', 5, '2021-07-11 18:17:29');

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
(1, 2, 38, 0, 2, '2021-07-11 18:16:41', 2, '2021-07-11 18:16:41');

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
(6, 'Failure', 'ติด F', NULL, '2021-06-26 12:12:12', NULL, '2021-06-26 12:13:42'),
(7, 'Completed', 'ผ่าน', NULL, '2021-06-26 12:12:12', NULL, '2021-06-26 12:13:56'),
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
(1, 'ฮาร์ดแวร์', 'Hardware', NULL, '2021-06-26 12:17:20', NULL, '2021-06-26 12:18:13'),
(2, 'ซอฟต์แวร์', 'Software', NULL, '2021-06-26 12:17:20', NULL, '2021-06-26 12:18:18'),
(3, 'ฮาร์ดแวร์และซอฟต์แวร์', 'Hardware and Software', NULL, '2021-06-26 12:17:20', NULL, '2021-06-26 12:18:33');

-- --------------------------------------------------------

--
-- Table structure for table `section`
--

CREATE TABLE `section` (
  `SectionID` int(5) UNSIGNED NOT NULL,
  `Sequence` int(11) DEFAULT NULL,
  `Year` varchar(10) DEFAULT NULL,
  `Term` int(1) NOT NULL,
  `Detail` varchar(255) DEFAULT NULL,
  `Instructor` int(11) DEFAULT NULL,
  `DayOfWeek` int(11) DEFAULT NULL,
  `StartTime` datetime DEFAULT NULL,
  `EndTime` datetime DEFAULT NULL,
  `CreatedBy` int(11) DEFAULT NULL,
  `CreatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `section`
--

INSERT INTO `section` (`SectionID`, `Sequence`, `Year`, `Term`, `Detail`, `Instructor`, `DayOfWeek`, `StartTime`, `EndTime`, `CreatedBy`, `CreatedTime`, `UpdatedBy`, `UpdatedTime`) VALUES
(1, 1, '2021', 1, 'ทค.1-201', 4, 1, '2021-07-11 08:00:00', '2021-06-26 20:06:38', NULL, '2021-06-26 13:06:38', NULL, '2021-07-11 16:23:22'),
(2, 2, '2021', 2, 'ทค.2-101', 5, 5, '2021-07-11 15:00:00', '2021-07-11 18:00:00', NULL, '2021-06-26 13:06:38', NULL, '2021-07-11 11:08:09'),
(8, 3, '2021', 1, 'aaa', 5, 7, '2021-07-12 07:00:00', '2021-07-12 14:00:00', NULL, '2021-07-12 15:49:46', NULL, '2021-07-12 15:49:46');

-- --------------------------------------------------------

--
-- Table structure for table `user_profile`
--

CREATE TABLE `user_profile` (
  `UserID` int(5) UNSIGNED NOT NULL,
  `Username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `Password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `Firstname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `Lastname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `StudentID` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `Email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `TelephoneNo` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `AcademicYear` varchar(4) COLLATE utf8_unicode_ci DEFAULT NULL,
  `UserTypeID` int(5) NOT NULL,
  `ImgProfile` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `CreatedBy` int(11) DEFAULT NULL,
  `CreatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user_profile`
--

INSERT INTO `user_profile` (`UserID`, `Username`, `Password`, `Firstname`, `Lastname`, `StudentID`, `Email`, `TelephoneNo`, `AcademicYear`, `UserTypeID`, `ImgProfile`, `CreatedBy`, `CreatedTime`, `UpdatedBy`, `UpdatedTime`) VALUES
(1, 'admin', 'admin', 'admin', 'admin', '0000000000000', 'user01@user01', '0', '0', 4, NULL, NULL, '2021-06-26 14:33:34', NULL, '2021-06-26 14:33:34'),
(2, 'user02', 'user02', 'พลเชษฐ์', 'คำมุง', '59543206017-5', 'user02@user02', '613300130', '2559', 1, NULL, NULL, '2021-06-26 14:33:34', NULL, '2021-06-26 14:33:34'),
(3, 'user03', 'user03', 'อัมรินทร์', 'อัมรารัมย์', '59543206058-9', 'user03@user03', '0', '2559', 1, NULL, NULL, '2021-06-26 14:33:34', NULL, '2021-06-26 14:33:34'),
(4, 'user04', 'user04', 'ปรัชญ์', 'ปิยะวงศ์วิศาล', '', 'user04@user04', '0', '0', 2, NULL, NULL, '2021-06-26 14:33:34', NULL, '2021-06-26 14:33:34'),
(5, 'user05', 'user05', 'อนุชล', 'หอมเสียง', '', '', '0', '0', 3, NULL, NULL, '2021-06-26 14:33:34', NULL, '2021-06-26 14:33:34');

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
(3, 'อาจารย์ประจำวิชา', 'Instructor', NULL, '2021-06-26 14:36:10', NULL, '2021-06-26 14:36:10'),
(4, 'ผู้ดูแลระบบ', 'Admin', NULL, '2021-06-26 14:36:10', NULL, '2021-06-26 14:36:10');

--
-- Indexes for dumped tables
--

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
-- Indexes for table `meeting`
--
ALTER TABLE `meeting`
  ADD PRIMARY KEY (`Meeting_ID`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`Notification_ID`);

--
-- Indexes for table `notification_status`
--
ALTER TABLE `notification_status`
  ADD PRIMARY KEY (`NotificationStatus_ID`);

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
-- AUTO_INCREMENT for table `app_menus`
--
ALTER TABLE `app_menus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `app_privileges`
--
ALTER TABLE `app_privileges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `deadline`
--
ALTER TABLE `deadline`
  MODIFY `DeadlineID` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `document`
--
ALTER TABLE `document`
  MODIFY `Document_ID` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `form_comment`
--
ALTER TABLE `form_comment`
  MODIFY `CommentID` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `form_prerequisite`
--
ALTER TABLE `form_prerequisite`
  MODIFY `PrerequisiteID` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `form_sent`
--
ALTER TABLE `form_sent`
  MODIFY `FormID` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `form_status`
--
ALTER TABLE `form_status`
  MODIFY `FormStatusID` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `form_type`
--
ALTER TABLE `form_type`
  MODIFY `FormTypeID` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `meeting`
--
ALTER TABLE `meeting`
  MODIFY `Meeting_ID` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `Notification_ID` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `notification_status`
--
ALTER TABLE `notification_status`
  MODIFY `NotificationStatus_ID` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `project_advisor`
--
ALTER TABLE `project_advisor`
  MODIFY `AdvisorID` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=109;

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
  MODIFY `ProjectID` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `project_member`
--
ALTER TABLE `project_member`
  MODIFY `MemberID` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
  MODIFY `SectionID` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `user_profile`
--
ALTER TABLE `user_profile`
  MODIFY `UserID` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user_type`
--
ALTER TABLE `user_type`
  MODIFY `UserTypeID` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
