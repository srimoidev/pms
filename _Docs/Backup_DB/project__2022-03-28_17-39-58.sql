-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 28, 2022 at 05:39 PM
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
  `EnvValue` varchar(255) DEFAULT NULL,
  `CreatedBy` int(11) NOT NULL,
  `CreatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int(11) NOT NULL,
  `UpdatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `app_environments`
--

INSERT INTO `app_environments` (`EnvID`, `EnvName`, `EnvValue`, `CreatedBy`, `CreatedTime`, `UpdatedBy`, `UpdatedTime`) VALUES
(1, 'FormFirstRequire', '26', 0, '2021-10-13 04:57:54', 0, '2021-10-13 04:58:19'),
(2, 'ExamPeriodStartDate', '2022-02-01T12:19:13.366Z', 0, '2022-02-06 11:37:07', 0, '2022-02-06 12:46:31'),
(3, 'ExamPeriodEndDate', '2022-02-28T12:19:13.366Z', 0, '2022-02-06 11:37:45', 0, '2022-02-06 12:20:02');

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
(1, 1, 0, 1, 'ภาพรวม', 'mdi-chart-bar', '', NULL, '2022-01-13 10:01:53', NULL, '2022-01-13 10:01:53'),
(2, 2, 0, 2, 'โครงงาน', 'mdi-clipboard-file-outline', '', NULL, '2022-01-13 10:01:53', NULL, '2022-01-13 10:01:53'),
(3, 3, 0, 4, 'เอกสาร', 'mdi-file-document-multiple-outline', '', NULL, '2022-01-13 10:01:53', NULL, '2022-01-13 10:01:53'),
(4, 4, 0, 7, 'คู่มือการทำโครงงาน', 'mdi-file-cabinet', '', NULL, '2022-01-13 10:01:53', NULL, '2022-01-13 10:01:53'),
(5, 5, 0, 8, 'จัดการทรัพยากร', 'mdi-cogs', '', NULL, '2022-01-13 10:01:53', NULL, '2022-01-13 10:01:53'),
(6, 6, 0, 3, 'โครงงานทั้งหมด', 'mdi-account-box-multiple-outline', '', NULL, '2022-01-13 10:01:53', NULL, '2022-01-13 10:01:53'),
(7, 7, 0, 9, 'นัดหมาย', 'mdi-calendar-clock', '', NULL, '2022-01-13 10:01:53', NULL, '2022-01-13 10:01:53'),
(8, 8, 0, 10, 'บันทึกความก้าวหน้า', '', '', NULL, '2022-01-13 10:01:53', NULL, '2022-01-13 10:01:53'),
(9, 10, 0, 12, 'กรรมการสอบ', 'mdi-notebook-check-outline', '', NULL, '2022-01-13 10:01:53', NULL, '2022-01-13 10:01:53'),
(10, 11, 0, 13, 'จัดการผู้ใช้', 'mdi-account-cog-outline', '', NULL, '2022-01-13 10:01:53', NULL, '2022-01-13 10:01:53'),
(11, 12, 0, 14, 'ขอสอบ', 'mdi-human-male-board-poll', '', NULL, '2022-01-13 10:01:53', NULL, '2022-01-13 10:01:53'),
(12, 100, 0, 5, 'อาจารย์ที่ปรึกษา', 'mdi-chevron-up', 'mdi-chevron-down', NULL, '2022-01-13 10:01:53', NULL, '2022-01-13 10:01:53'),
(13, 101, 100, 2, 'ขออนุมัติเป็นที่ปรึกษา', 'mdi-account-multiple-check-outline', '', NULL, '2022-01-13 10:01:53', NULL, '2022-01-13 10:01:53'),
(14, 102, 100, 3, 'ขออนุมัติเอกสาร', 'mdi-book-check-outline', '', NULL, '2022-01-13 10:01:53', NULL, '2022-01-13 10:01:53'),
(15, 103, 100, 4, 'ขออนุมัติสอบ', 'mdi-human-male-board-poll', '', NULL, '2022-01-13 10:01:53', NULL, '2022-01-13 10:01:53'),
(16, 104, 100, 1, 'ที่ปรึกษาโครงงาน', 'mdi-tablet-dashboard', '', NULL, '2022-01-13 10:01:53', NULL, '2022-01-13 10:01:53'),
(17, 200, 0, 6, 'อาจารย์ประจำวิชา', 'mdi-chevron-up', 'mdi-chevron-down', NULL, '2022-01-13 10:01:53', NULL, '2022-01-13 10:01:53'),
(18, 201, 200, 1, 'ขออนุมัติเอกสาร', 'mdi-file-sign', '', NULL, '2022-01-13 10:01:53', NULL, '2022-01-13 10:01:53'),
(19, 202, 200, 2, 'โครงงานใหม่', 'mdi-folder-multiple-plus-outline', '', NULL, '2022-01-13 10:01:53', NULL, '2022-01-13 10:01:53'),
(20, 203, 200, 4, 'รายการขอสอบ', 'mdi-human-male-board-poll', '', NULL, '2022-01-13 10:01:53', NULL, '2022-01-13 10:01:53'),
(21, 204, 200, 3, 'ความคืบหน้าโครงงาน', 'mdi-book-sync-outline', '', NULL, '2022-01-13 10:01:53', NULL, '2022-01-13 10:01:53');

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
(1, 1, 2, '/student/project', NULL, '2022-01-13 10:01:54', NULL, '2022-01-13 10:01:54'),
(2, 1, 3, '/student/documents', NULL, '2022-01-13 10:01:54', NULL, '2022-01-13 10:01:54'),
(3, 1, 4, '/student/project_manual', NULL, '2022-01-13 10:01:54', NULL, '2022-01-13 10:01:54'),
(4, 1, 6, '/student/all_project', NULL, '2022-01-13 10:01:54', NULL, '2022-01-13 10:01:54'),
(5, 1, 7, '/student/meeting', NULL, '2022-01-13 10:01:54', NULL, '2022-01-13 10:01:54'),
(6, 1, 12, '/student/exam', NULL, '2022-01-13 10:01:54', NULL, '2022-01-13 10:01:54'),
(7, 2, 6, '/teacher/all_project', NULL, '2022-01-13 10:01:54', NULL, '2022-01-13 10:01:54'),
(8, 2, 100, '', NULL, '2022-01-13 10:01:54', NULL, '2022-01-13 10:01:54'),
(9, 2, 101, '/teacher/advisor_req', NULL, '2022-01-13 10:01:54', NULL, '2022-01-13 10:01:54'),
(10, 2, 102, '/teacher/approvement_req', NULL, '2022-01-13 10:01:54', NULL, '2022-01-13 10:01:54'),
(11, 2, 103, '/teacher/test_req', NULL, '2022-01-13 10:01:54', NULL, '2022-01-13 10:01:54'),
(12, 2, 104, '/teacher/project_lists', NULL, '2022-01-13 10:01:54', NULL, '2022-01-13 10:01:54'),
(13, 2, 7, '/teacher/meeting', NULL, '2022-01-13 10:01:54', NULL, '2022-01-13 10:01:54'),
(14, 2, 4, '/teacher/project_manual', NULL, '2022-01-13 10:01:54', NULL, '2022-01-13 10:01:54'),
(15, 2, 10, '/teacher/exam', NULL, '2022-01-13 10:01:54', NULL, '2022-01-13 10:01:54'),
(16, 3, 6, '/teacher/all_project', NULL, '2022-01-13 10:01:54', NULL, '2022-01-13 10:01:54'),
(17, 3, 100, '', NULL, '2022-01-13 10:01:54', NULL, '2022-01-13 10:01:54'),
(18, 3, 101, '/teacher/advisor_req', NULL, '2022-01-13 10:01:54', NULL, '2022-01-13 10:01:54'),
(19, 3, 102, '/teacher/approvement_req', NULL, '2022-01-13 10:01:54', NULL, '2022-01-13 10:01:54'),
(20, 3, 103, '/teacher/test_req', NULL, '2022-01-13 10:01:54', NULL, '2022-01-13 10:01:54'),
(21, 3, 104, '/teacher/project_lists', NULL, '2022-01-13 10:01:54', NULL, '2022-01-13 10:01:54'),
(22, 3, 200, '', NULL, '2022-01-13 10:01:54', NULL, '2022-01-13 10:01:54'),
(23, 3, 201, '/teacher/approvement_req', NULL, '2022-01-13 10:01:54', NULL, '2022-01-13 10:01:54'),
(24, 3, 202, '/teacher/new_projects', NULL, '2022-01-13 10:01:54', NULL, '2022-01-13 10:01:54'),
(25, 3, 203, '/teacher/test_req', NULL, '2022-01-13 10:01:54', NULL, '2022-01-13 10:01:54'),
(26, 3, 204, '/teacher/project_inprogress', NULL, '2022-01-13 10:01:54', NULL, '2022-01-13 10:01:54'),
(27, 3, 7, '/teacher/meeting', NULL, '2022-01-13 10:01:54', NULL, '2022-01-13 10:01:54'),
(28, 3, 10, '/teacher/exam', NULL, '2022-01-13 10:01:54', NULL, '2022-01-13 10:01:54'),
(29, 3, 4, '/teacher/project_manual', NULL, '2022-01-13 10:01:54', NULL, '2022-01-13 10:01:54'),
(30, 3, 5, '/teacher/app_configs', NULL, '2022-01-13 10:01:54', NULL, '2022-01-13 10:01:54'),
(31, 3, 11, '/teacher/manage_users', NULL, '2022-01-13 10:01:54', NULL, '2022-01-13 10:01:54'),
(32, 4, 4, '/admin/project_manual', NULL, '2022-01-13 10:01:54', NULL, '2022-01-13 10:01:54'),
(33, 4, 5, '/admin/app_configs', NULL, '2022-01-13 10:01:54', NULL, '2022-01-13 10:01:54'),
(34, 4, 11, '/admin/manage_users', NULL, '2022-01-13 10:01:54', NULL, '2022-01-13 10:01:54'),
(35, 5, 6, '/teacher/all_project', NULL, '2022-01-13 10:01:54', NULL, '2022-01-13 10:01:54'),
(36, 5, 100, '', NULL, '2022-01-13 10:01:54', NULL, '2022-01-13 10:01:54'),
(37, 5, 101, '/teacher/advisor_req', NULL, '2022-01-13 10:01:54', NULL, '2022-01-13 10:01:54'),
(38, 5, 102, '/teacher/approvement_req', NULL, '2022-01-13 10:01:54', NULL, '2022-01-13 10:01:54'),
(39, 5, 103, '/teacher/test_req', NULL, '2022-01-13 10:01:54', NULL, '2022-01-13 10:01:54'),
(40, 5, 104, '/teacher/project_lists', NULL, '2022-01-13 10:01:54', NULL, '2022-01-13 10:01:54'),
(41, 5, 200, '', NULL, '2022-01-13 10:01:54', NULL, '2022-01-13 10:01:54'),
(42, 5, 201, '/teacher/approvement_req', NULL, '2022-01-13 10:01:54', NULL, '2022-01-13 10:01:54'),
(43, 5, 202, '/teacher/new_projects', NULL, '2022-01-13 10:01:54', NULL, '2022-01-13 10:01:54'),
(44, 5, 203, '/teacher/test_req', NULL, '2022-01-13 10:01:54', NULL, '2022-01-13 10:01:54'),
(45, 5, 204, '/teacher/project_inprogress', NULL, '2022-01-13 10:01:54', NULL, '2022-01-13 10:01:54'),
(46, 5, 7, '/teacher/meeting', NULL, '2022-01-13 10:01:54', NULL, '2022-01-13 10:01:54'),
(47, 5, 10, '/teacher/exam', NULL, '2022-01-13 10:01:54', NULL, '2022-01-13 10:01:54'),
(48, 5, 4, '/teacher/project_manual', NULL, '2022-01-13 10:01:54', NULL, '2022-01-13 10:01:54'),
(49, 5, 5, '/teacher/app_configs', NULL, '2022-01-13 10:01:54', NULL, '2022-01-13 10:01:54'),
(50, 5, 11, '/teacher/manage_users', NULL, '2022-01-13 10:01:54', NULL, '2022-01-13 10:01:54');

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
(304, 36, 43, '2022-02-06 19:40:00', 4296, '2022-01-13 10:37:46', 4296, '2022-02-06 12:40:16'),
(305, 36, 44, NULL, 4296, '2022-01-13 10:37:58', 4296, '2022-01-13 10:37:58');

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
-- Table structure for table `exam`
--

CREATE TABLE `exam` (
  `ExamID` int(11) NOT NULL,
  `ProjectID` int(11) NOT NULL,
  `OnDate` datetime NOT NULL,
  `Remark` varchar(255) NOT NULL,
  `IsProjectExam` tinyint(1) NOT NULL,
  `ExamStatusID` int(1) NOT NULL,
  `CreatedBy` int(11) NOT NULL,
  `CreatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int(11) NOT NULL,
  `UpdatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `exam`
--

INSERT INTO `exam` (`ExamID`, `ProjectID`, `OnDate`, `Remark`, `IsProjectExam`, `ExamStatusID`, `CreatedBy`, `CreatedTime`, `UpdatedBy`, `UpdatedTime`) VALUES
(17, 135, '2022-03-28 16:57:00', '', 0, 3, 4253, '2022-03-28 09:57:18', 4296, '2022-03-28 12:13:28'),
(18, 133, '2022-03-28 22:20:00', '', 1, 3, 4254, '2022-03-28 15:20:22', 4297, '2022-03-28 15:23:30');

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

-- --------------------------------------------------------

--
-- Table structure for table `exam_status`
--

CREATE TABLE `exam_status` (
  `ExamStatusID` int(11) NOT NULL,
  `ExamStatusName` varchar(255) NOT NULL,
  `IsActive` tinyint(1) NOT NULL,
  `CreatedBy` int(11) NOT NULL,
  `CreatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int(11) NOT NULL,
  `UpdatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `exam_status`
--

INSERT INTO `exam_status` (`ExamStatusID`, `ExamStatusName`, `IsActive`, `CreatedBy`, `CreatedTime`, `UpdatedBy`, `UpdatedTime`) VALUES
(1, 'WaitAdvisor', 1, 0, '2022-03-28 10:09:21', 0, '2022-03-28 10:09:21'),
(2, 'WaitInstructor', 1, 0, '2022-03-28 10:09:48', 0, '2022-03-28 10:09:48'),
(3, 'WaitForExam', 1, 0, '2022-03-28 10:10:56', 0, '2022-03-28 10:10:56');

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
(29, 88, 'แก้นิดหน่อย', 4295, '2022-01-09 18:19:12', 4295, '2022-01-09 18:19:12'),
(30, 88, 'dddd', 4295, '2022-01-10 12:07:48', 4295, '2022-01-10 12:07:48'),
(31, 91, 'ok', 4295, '2022-01-11 16:09:54', 4295, '2022-01-11 16:09:54'),
(32, 91, 'okkk', 4295, '2022-01-11 16:10:15', 4295, '2022-01-11 16:10:15'),
(33, 91, 'aaaa', 4295, '2022-01-11 16:12:21', 4295, '2022-01-11 16:12:21'),
(34, 91, 'fffff', 4295, '2022-01-11 16:14:23', 4295, '2022-01-11 16:14:23');

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
(37, 44, 43, NULL, '2022-01-13 10:37:58', NULL, '2022-01-13 10:37:58');

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
(94, 133, 43, '8169e57d-e61c-4ec7-826f-ab6e8651d80c.pdf', 1, NULL, 4254, '2022-01-13 11:05:29', 4254, '2022-01-13 11:05:29'),
(95, 133, 43, '406594a2-8b84-4dc4-872b-3a448e0f9fcf.pdf', 1, NULL, 4254, '2022-01-13 11:11:10', 4254, '2022-01-13 11:11:10'),
(96, 133, 43, 'f433cbbc-0c3e-4a32-8718-cc31b8acc395.pdf', 1, NULL, 4254, '2022-01-13 11:11:11', 4254, '2022-01-13 11:11:11'),
(102, 134, 43, '5bde812e-7cda-4d5a-9e2a-6cf5b4ad5228.pdf', 1, NULL, 4253, '2022-01-13 16:46:47', 4253, '2022-01-13 16:46:47'),
(103, 135, 43, 'cc345501-2854-4fde-8435-00508466609a.pdf', 1, NULL, 4253, '2022-01-15 15:36:47', 4253, '2022-01-15 15:36:47'),
(104, 135, 43, 'e3d70ca8-9792-4c36-8850-92e1d824696e.pdf', 2, NULL, 4253, '2022-01-15 15:37:27', 4295, '2022-03-25 14:22:44');

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
(43, 'CE01', '', 0, 1, 1, 4296, '2022-01-13 10:37:46', 4296, '2022-01-13 10:37:46'),
(44, 'CE02', '', NULL, 1, 1, 4296, '2022-01-13 10:37:58', 4296, '2022-01-13 10:37:58');

-- --------------------------------------------------------

--
-- Table structure for table `meeting`
--

CREATE TABLE `meeting` (
  `MeetingID` int(11) NOT NULL,
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
  `ActionPage` varchar(255) DEFAULT NULL,
  `IsRead` tinyint(1) NOT NULL DEFAULT '0',
  `CreatedBy` int(11) DEFAULT NULL,
  `CreatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`NotiID`, `NotiTypeID`, `UserID`, `Title`, `Message`, `ActionPage`, `IsRead`, `CreatedBy`, `CreatedTime`, `UpdatedBy`, `UpdatedTime`) VALUES
(183, 1, 4295, 'สร้างกลุ่ม เว็บไซต์เก็บฐานข้อมูลศูนย์ลูกค้าวีพีออโต้เทค', 'สร้างกลุ่ม เว็บไซต์เก็บฐานข้อมูลศูนย์ลูกค้าวีพีออโต้เทค และเพิ่มคุณเป็นอาจารย์ที่ปรึกษา', '/teacher/advisor_req', 0, 4254, '2022-01-13 10:39:30', 4254, '2022-01-13 10:39:30'),
(184, 9, 4295, 'กลุ่ม เว็บไซต์เก็บฐานข้อมูลศูนย์ลูกค้าวีพีออโต้เทค ส่งเอกสาร CE01', ' ส่งเอกสาร CE01 รอรับการตรวจ', '/teacher/form_preview?pid=133&fid=94', 0, 4254, '2022-01-13 11:11:10', 4254, '2022-01-13 11:11:10'),
(185, 9, 4295, 'กลุ่ม เว็บไซต์เก็บฐานข้อมูลศูนย์ลูกค้าวีพีออโต้เทค ส่งเอกสาร CE01', ' ส่งเอกสาร CE01 รอรับการตรวจ', '/teacher/form_preview?pid=133&fid=95', 0, 4254, '2022-01-13 11:11:11', 4254, '2022-01-13 11:11:11'),
(186, 9, 4295, 'กลุ่ม เว็บไซต์เก็บฐานข้อมูลศูนย์ลูกค้าวีพีออโต้เทค ส่งเอกสาร CE01', ' ส่งเอกสาร CE01 รอรับการตรวจ', '/teacher/form_preview?pid=133&fid=96', 0, 4254, '2022-01-13 11:11:11', 4254, '2022-01-13 11:11:11'),
(187, 1, 4296, 'สร้างกลุ่ม โมเดล ทดสอบ', 'สร้างกลุ่ม โมเดล ทดสอบ และเพิ่มคุณเป็นอาจารย์ที่ปรึกษา', '/teacher/advisor_req', 0, 4253, '2022-01-13 12:04:12', 4253, '2022-01-13 12:04:12'),
(188, 9, 4296, 'กลุ่ม โมเดล ทดสอบ ส่งเอกสาร CE01', ' ส่งเอกสาร CE01 รอรับการตรวจ', '/teacher/form_preview?pid=134&fid=102', 1, 4253, '2022-01-13 16:46:47', 4253, '2022-01-13 16:46:52'),
(189, 8, 4296, 'กฤษติพงศ์ ชัยตัน ออกจากกลุ่ม', 'กฤษติพงศ์ ชัยตัน ออกจากกลุ่ม โมเดล ทดสอบ แล้ว', '/teacher/project?pid=134', 0, 4253, '2022-01-15 13:10:15', 4253, '2022-01-15 13:10:15'),
(190, 1, 4295, 'สร้างกลุ่ม asd', 'สร้างกลุ่ม asd และเพิ่มคุณเป็นอาจารย์ที่ปรึกษา', '/teacher/advisor_req', 0, 4253, '2022-01-15 13:13:48', 4253, '2022-01-15 13:13:48'),
(191, 9, 4295, 'กลุ่ม asd ส่งเอกสาร CE01', ' ส่งเอกสาร CE01 รอรับการตรวจ', '/teacher/form_preview?pid=135&fid=103', 0, 4253, '2022-01-15 15:36:48', 4253, '2022-01-15 15:36:48'),
(192, 9, 4295, 'กลุ่ม asd ส่งเอกสาร CE01', ' ส่งเอกสาร CE01 รอรับการตรวจ', '/teacher/form_preview?pid=135&fid=104', 1, 4253, '2022-01-15 15:37:27', 4253, '2022-03-25 14:22:38'),
(193, 10, 4253, 'อาจารย์ที่ปรึกษาอนุมัติ CE01', 'อนุมัติ CE01 เรียบร้อยแล้ว และรออาจารย์ประจำวิชาอนุมัติในลำดับถัดไป', '/student/form_preview?d=104', 0, 4295, '2022-03-25 14:22:44', 4295, '2022-03-25 14:22:44'),
(194, 10, 4296, 'กลุ่ม asd ส่งเอกสาร CE01', 'อนุมัติเอกสาร CE01 แล้วรอรับการอนุมัติจากอาจารย์ประจำวิชา', '/teacher/form_preview?pid=135&fid=104', 0, 4295, '2022-03-25 14:22:44', 4295, '2022-03-25 14:22:44');

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
  `ActionTemplate` varchar(255) DEFAULT NULL,
  `CreatedBy` int(11) DEFAULT NULL,
  `CreatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `notification_types`
--

INSERT INTO `notification_types` (`id`, `NotiTypeID`, `UserTypeID`, `NotiTypeName`, `TitleTemplate`, `MessageTemplate`, `ActionTemplate`, `CreatedBy`, `CreatedTime`, `UpdatedBy`, `UpdatedTime`) VALUES
(149, 1, 1, 'นักศึกษาเพิ่มโครงงาน', 'สร้างกลุ่ม {ProjectName}', 'สร้างกลุ่ม {ProjectName} และเพิ่มคุณเป็นสมาชิก', '/student/project', NULL, '2022-01-09 17:28:06', NULL, '2022-01-09 17:28:06'),
(150, 1, 2, 'นักศิกษาเพิ่มโครงงาน', 'สร้างกลุ่ม {ProjectName}', 'สร้างกลุ่ม {ProjectName} และเพิ่มคุณเป็นอาจารย์ที่ปรึกษา', '/teacher/advisor_req', NULL, '2022-01-09 17:28:06', NULL, '2022-01-09 17:28:06'),
(151, 2, 1, 'อาจารย์เพิ่มโครงงาน', 'สร้างกลุ่ม {ProjectName}', 'สร้างกลุ่ม {ProjectName} และเพิ่มคุณเป็นสมาชิก', '/student/project', NULL, '2022-01-09 17:28:06', NULL, '2022-01-09 17:28:06'),
(152, 2, 3, 'อาจารย์เพิ่มโครงงาน', 'สร้างกลุ่ม {ProjectName}', 'สร้างกลุ่ม {ProjectName} และรอการอนุมัติเริ่มทำโครงงาน', '/teacher/new_projects', NULL, '2022-01-09 17:28:06', NULL, '2022-01-09 17:28:06'),
(153, 2, 5, 'อาจารย์เพิ่มโครงงาน', 'สร้างกลุ่ม {ProjectName}', 'สร้างกลุ่ม {ProjectName} และรอการอนุมัติเริ่มทำโครงงาน', '/teacher/new_projects', NULL, '2022-01-09 17:28:06', NULL, '2022-01-09 17:28:06'),
(154, 3, 1, 'อนุมัติกลุ่มโปรเจ็ค', 'อนุมัติเป็นที่ปรึกษา', 'อนุมัติเป็นที่ปรึกษากลุ่มเรียบร้อย และรออาจารย์ประจำวิชาอนุมัติในลำดับถัดไป', '/student/project', NULL, '2022-01-09 17:28:06', NULL, '2022-01-09 17:28:06'),
(155, 3, 3, 'อนุมัติกลุ่มโปรเจ็ค', 'อนุมัติเป็นที่ปรึกษา', 'กลุ่ม {ProjectName} รอการอนุมัติเริ่มทำโครงงาน', '/teacher/new_projects', NULL, '2022-01-09 17:28:06', NULL, '2022-01-09 17:28:06'),
(156, 3, 5, 'อนุมัติกลุ่มโปรเจ็ค', 'อนุมัติเป็นที่ปรึกษา', 'กลุ่ม {ProjectName} รอการอนุมัติเริ่มทำโครงงาน', '/teacher/new_projects', NULL, '2022-01-09 17:28:06', NULL, '2022-01-09 17:28:06'),
(157, 4, 1, 'ไม่อนุมัติกลุ่มโปรเจ็ค', 'ไม่อนุมัติเป็นที่ปรึกษา ', 'ไม่อนุมัติเป็นที่ปรึกษา โปรดตรวจสอบโครงงานและเสนอโครงงานใหม่', '/student/project', NULL, '2022-01-09 17:28:06', NULL, '2022-01-09 17:28:06'),
(158, 5, 1, 'อนุมัติเริ่มทำโครงงาน', 'อนุมัติโครงงาน {ProjectName}', 'อนุมัติให้เริ่มทำโครงงานได้', '/student/project', NULL, '2022-01-09 17:28:06', NULL, '2022-01-09 17:28:06'),
(159, 5, 2, 'อนุมัติเริ่มทำโครงงาน', 'อนุมัติโครงงาน {ProjectName}', 'อนุมัติให้นักศึกษาเริ่มทำโครงงานได้', '/teacher/project ?pid={ProjectID}', NULL, '2022-01-09 17:28:06', NULL, '2022-01-09 17:28:06'),
(160, 6, 1, 'ไม่อนุมัติเริ่มทำโครงงาน', 'ไม่อนุมัติโครงงาน {ProjectName}', 'ไม่อนุมัติโครงงาน โปรดตรวจสอบโครงงานและเสนอโครงงานใหม่', '/student/project', NULL, '2022-01-09 17:28:06', NULL, '2022-01-09 17:28:06'),
(161, 6, 2, 'ไม่อนุมัติเริ่มทำโครงงาน', 'ไม่อนุมัติโครงงาน {ProjectName}', 'ไม่อนุมัติโครงงาน โปรดตรวจสอบโครงงานและเสนอโครงงานใหม่', '/teacher/project?pid={ProjectID}', NULL, '2022-01-09 17:28:06', NULL, '2022-01-09 17:28:06'),
(162, 7, 1, 'เข้าร่วมกลุ่ม', '{FullName} เข้าร่วมกลุ่ม', '{FullName} ได้เข้าร่วมกลุ่ม {ProjectName} แล้ว', '/student/project', NULL, '2022-01-09 17:28:06', NULL, '2022-01-09 17:28:06'),
(163, 7, 2, 'เข้าร่วมกลุ่ม', '{FullName} เข้าร่วมกลุ่ม', '{FullName} ได้เข้าร่วมกลุ่ม {ProjectName} แล้ว', '/teacher/project?pid={ProjectID}', NULL, '2022-01-09 17:28:06', NULL, '2022-01-09 17:28:06'),
(164, 8, 1, 'ออกกลุ่ม', '{FullName} ออกจากกลุ่ม', '{FullName} ออกจากกลุ่ม {ProjectName} แล้ว', '/student/project', NULL, '2022-01-09 17:28:06', NULL, '2022-01-09 17:28:06'),
(165, 8, 2, 'ออกกลุ่ม', '{FullName} ออกจากกลุ่ม', '{FullName} ออกจากกลุ่ม {ProjectName} แล้ว', '/teacher/project?pid={ProjectID}', NULL, '2022-01-09 17:28:06', NULL, '2022-01-09 17:28:06'),
(166, 9, 1, 'ส่งเอกสาร CE', 'ส่งเอกสาร {FormName}', 'ส่งเอกสาร {FormName} เรียบร้อยแล้ว', '/student/form_preview?d={FormID}', NULL, '2022-01-09 17:28:06', NULL, '2022-01-09 17:28:06'),
(167, 9, 2, 'ส่งเอกสาร CE', 'กลุ่ม {ProjectName} ส่งเอกสาร {FormName}', ' ส่งเอกสาร {FormName} รอรับการตรวจ', '/teacher/form_preview?pid={ProjectID}&fid={FormID}', NULL, '2022-01-09 17:28:06', NULL, '2022-01-09 17:28:06'),
(168, 10, 1, 'ที่ปรึกษาอนุมัติเอกสาร CE', 'อาจารย์ที่ปรึกษาอนุมัติ {FormName}', 'อนุมัติ {FormName} เรียบร้อยแล้ว และรออาจารย์ประจำวิชาอนุมัติในลำดับถัดไป', '/student/form_preview?d={FormID}', NULL, '2022-01-09 17:28:06', NULL, '2022-01-09 17:28:06'),
(169, 10, 3, 'ที่ปรึกษาอนุมัติเอกสาร CE', 'กลุ่ม {ProjectName} ส่งเอกสาร {FormName}', 'อนุมัติเอกสาร {FormName} แล้วรอรับการอนุมัติจากอาจารย์ประจำวิชา', '/teacher/form_preview?pid={ProjectID}&fid={FormID}', NULL, '2022-01-09 17:28:06', NULL, '2022-01-09 17:28:06'),
(170, 10, 5, 'ที่ปรึกษาอนุมัติเอกสาร CE', 'กลุ่ม {ProjectName} ส่งเอกสาร {FormName}', 'อนุมัติเอกสาร {FormName} แล้วรอรับการอนุมัติจากอาจารย์ประจำวิชา', '/teacher/form_preview?pid={ProjectID}&fid={FormID}', NULL, '2022-01-09 17:28:06', NULL, '2022-01-09 17:28:06'),
(171, 11, 1, 'ที่ปรึกษาไม่อนุมัติเอกสาร CE', 'อาจารย์ที่ปรึกษาไม่อนุมัติ {FormName}', 'ไม่อนุมัติ {FormName} โปรดตรวจสอบและแก้ไข', '/student/form_preview?d={FormID}', NULL, '2022-01-09 17:28:06', NULL, '2022-01-09 17:28:06'),
(172, 12, 1, 'ประจำวิชาอนุมัติเอกสาร CE', 'อาจารย์ที่ประจำวิชาอนุมัติ {FormName}', 'อนุมัติ {FormName} เรียบร้อยแล้ว', '/student/form_preview?d={FormID}', NULL, '2022-01-09 17:28:06', NULL, '2022-01-09 17:28:06'),
(173, 12, 2, 'ประจำวิชาอนุมัติเอกสาร CE', 'อาจารย์ที่ประจำวิชาอนุมัติ {FormName}', 'อนุมัติ {FormName} ของกลุ่ม {ProjectName} เรียบร้อยแล้ว', '/teacher/form_preview?pid={ProjectID}&fid={FormID}', NULL, '2022-01-09 17:28:06', NULL, '2022-01-09 17:28:06'),
(174, 13, 1, 'ประจำวิชาไม่อนุมัติเอกสาร CE', 'อาจารย์ที่ปรึกษาไม่อนุมัติ {FormName}', 'ไม่อนุมัติ {FormName} โปรดตรวจสอบและแก้ไข', '/student/form_preview?d={FormID}', NULL, '2022-01-09 17:28:06', NULL, '2022-01-09 17:28:06'),
(175, 13, 2, 'ประจำวิชาไม่อนุมัติเอกสาร CE', 'อาจารย์ที่ปรึกษาไม่อนุมัติ {FormName}', 'ไม่อนุมัติ {FormName} ของกลุ่ม {ProjectName}', '/teacher/form_preview?pid={ProjectID}&fid={FormID}', NULL, '2022-01-09 17:28:06', NULL, '2022-01-09 17:28:06'),
(176, 14, 1, 'การนัดหมายใหม่', 'การนัดหมายใหม่', 'สร้างการนัดหมายใหม่', '/student/form_preview?d={FormID}', NULL, '2022-01-09 17:28:06', NULL, '2022-01-09 17:28:06'),
(177, 14, 2, 'การนัดหมายใหม่', 'การนัดหมายใหม่', 'กลุ่ม {ProjectName} สร้างการนัดหมายใหม่', '/student/form_preview?d={FormID}', NULL, '2022-01-09 17:28:06', NULL, '2022-01-09 17:28:06'),
(178, 14, 3, 'การนัดหมายใหม่', 'การนัดหมายใหม่', 'กลุ่ม {ProjectName} สร้างการนัดหมายใหม่', '/student/form_preview?d={FormID}', NULL, '2022-01-09 17:28:06', NULL, '2022-01-09 17:28:06'),
(179, 14, 5, 'การนัดหมายใหม่', 'การนัดหมายใหม่', 'กลุ่ม {ProjectName} สร้างการนัดหมายใหม่', '/student/form_preview?d={FormID}', NULL, '2022-01-09 17:28:06', NULL, '2022-01-09 17:28:06'),
(180, 15, 1, 'การนัดหมายใหม่', 'การนัดหมายใหม่', 'สร้างการนัดหมายใหม่', '/student/form_preview?d={FormID}', NULL, '2022-01-09 17:28:06', NULL, '2022-01-09 17:28:06'),
(181, 16, 1, 'ยืนยันการนัดหมาย', 'ยืนยันการนัดหมาย', 'ยืนยันการนัดหมาย วันที่ {Date} เวลา {Time}', '/student/form_preview?d={FormID}', NULL, '2022-01-09 17:28:06', NULL, '2022-01-09 17:28:06'),
(182, 17, 1, 'ปฏิเสธการนัดหมาย', 'ปฏิเสธการนัดหมาย', 'ปฏิเสธการนัดหมาย วันที่ {Date} เวลา {Time}', '/student/form_preview?d={FormID}', NULL, '2022-01-09 17:28:06', NULL, '2022-01-09 17:28:06'),
(183, 18, 2, 'ยืนยันการนัดหมาย', 'ยืนยันการนัดหมาย', 'ยืนยันการนัดหมาย กลุ่ม {ProjectName} วันที่ {Date} เวลา {Time}', '/student/form_preview?d={FormID}', NULL, '2022-01-09 17:28:06', NULL, '2022-01-09 17:28:06'),
(184, 18, 3, 'ยืนยันการนัดหมาย', 'ยืนยันการนัดหมาย', 'ยืนยันการนัดหมาย กลุ่ม {ProjectName} วันที่ {Date} เวลา {Time}', '/student/form_preview?d={FormID}', NULL, '2022-01-09 17:28:06', NULL, '2022-01-09 17:28:06'),
(185, 18, 5, 'ยืนยันการนัดหมาย', 'ยืนยันการนัดหมาย', 'ยืนยันการนัดหมาย กลุ่ม {ProjectName} วันที่ {Date} เวลา {Time}', '/student/form_preview?d={FormID}', NULL, '2022-01-09 17:28:06', NULL, '2022-01-09 17:28:06'),
(186, 19, 2, 'ปฏิเสธการนัดหมาย', 'ปฏิเสธการนัดหมาย', 'ปฏิเสธการนัดหมาย กลุ่ม {ProjectName} วันที่ {Date} เวลา {Time}', '/student/form_preview?d={FormID}', NULL, '2022-01-09 17:28:06', NULL, '2022-01-09 17:28:06'),
(187, 19, 3, 'ปฏิเสธการนัดหมาย', 'ปฏิเสธการนัดหมาย', 'ปฏิเสธการนัดหมาย กลุ่ม {ProjectName} วันที่ {Date} เวลา {Time}', '/student/form_preview?d={FormID}', NULL, '2022-01-09 17:28:06', NULL, '2022-01-09 17:28:06'),
(188, 19, 5, 'ปฏิเสธการนัดหมาย', 'ปฏิเสธการนัดหมาย', 'ปฏิเสธการนัดหมาย กลุ่ม {ProjectName} วันที่ {Date} เวลา {Time}', '/student/form_preview?d={FormID}', NULL, '2022-01-09 17:28:06', NULL, '2022-01-09 17:28:06'),
(189, 18, 2, 'ยกเลิกการนัดหมาย', 'ยกเลิกการนัดหมาย', 'ยกเลิกการนัดหมาย กลุ่ม {ProjectName} วันที่ {Date} เวลา {Time}', '/student/form_preview?d={FormID}', NULL, '2022-01-09 17:28:06', NULL, '2022-01-09 17:28:06'),
(190, 18, 3, 'ยกเลิกการนัดหมาย', 'ยกเลิกการนัดหมาย', 'ยกเลิกการนัดหมาย กลุ่ม {ProjectName} วันที่ {Date} เวลา {Time}', '/student/form_preview?d={FormID}', NULL, '2022-01-09 17:28:06', NULL, '2022-01-09 17:28:06'),
(191, 18, 5, 'ยกเลิกการนัดหมาย', 'ยกเลิกการนัดหมาย', 'ยกเลิกการนัดหมาย กลุ่ม {ProjectName} วันที่ {Date} เวลา {Time}', '/student/form_preview?d={FormID}', NULL, '2022-01-09 17:28:06', NULL, '2022-01-09 17:28:06'),
(192, 19, 1, 'ยกเลิกการนัดหมาย', 'ยกเลิกการนัดหมาย', 'ยกเลิกการนัดหมาย วันที่ {Date} เวลา {Time}', '/student/form_preview?d={FormID}', NULL, '2022-01-09 17:28:06', NULL, '2022-01-09 17:28:06'),
(193, 19, 1, 'ยกเลิกการนัดหมาย', 'ยกเลิกการนัดหมาย', 'ยกเลิกการนัดหมาย วันที่ {Date} เวลา {Time}', '/student/form_preview?d={FormID}', NULL, '2022-01-09 17:28:06', NULL, '2022-01-09 17:28:06'),
(194, 20, 1, 'คอมเมนต์จากอาจารย์', 'คอมเมนต์จากอาจารย์', 'คอมเมนต์เอกสาร {FormName}', '/student/form_preview?d={FormID}', NULL, '2022-01-09 17:28:06', NULL, '2022-01-09 17:28:06');

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
(208, 133, 4295, NULL, 4254, '2022-01-13 10:39:30', 4254, '2022-01-13 10:39:30'),
(209, 134, 4296, NULL, 4253, '2022-01-13 12:04:12', 4253, '2022-01-13 12:04:12'),
(210, 135, 4295, NULL, 4253, '2022-01-15 13:13:48', 4253, '2022-01-15 13:13:48');

-- --------------------------------------------------------

--
-- Table structure for table `project_committee`
--

CREATE TABLE `project_committee` (
  `CommitteeID` int(5) UNSIGNED NOT NULL,
  `ExamID` int(5) DEFAULT NULL,
  `UserID` int(5) DEFAULT NULL,
  `PresentScore` float DEFAULT NULL,
  `DocumentScore` float DEFAULT NULL,
  `AdvisorScore` float DEFAULT NULL,
  `CreatedBy` int(11) DEFAULT NULL,
  `CreatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `project_committee`
--

INSERT INTO `project_committee` (`CommitteeID`, `ExamID`, `UserID`, `PresentScore`, `DocumentScore`, `AdvisorScore`, `CreatedBy`, `CreatedTime`, `UpdatedBy`, `UpdatedTime`) VALUES
(5, 17, 4296, NULL, NULL, NULL, 4296, '2022-03-28 13:55:58', 4296, '2022-03-28 13:55:58'),
(6, 17, 4295, NULL, NULL, NULL, 4295, '2022-03-28 15:18:06', 4295, '2022-03-28 15:18:06');

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
  `Grade` int(11) DEFAULT NULL,
  `TotalScore` float DEFAULT NULL,
  `CreatedBy` int(11) DEFAULT NULL,
  `CreatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `project_info`
--

INSERT INTO `project_info` (`ProjectID`, `ProjectNameTH`, `ProjectNameEN`, `ProjectDetail`, `ProjectTypeID`, `MaxMember`, `SectionID`, `ProjectStatusID`, `RejectedRemark`, `IsProject`, `Grade`, `TotalScore`, `CreatedBy`, `CreatedTime`, `UpdatedBy`, `UpdatedTime`) VALUES
(133, 'เว็บไซต์เก็บฐานข้อมูลศูนย์ลูกค้าวีพีออโต้เทค', 'The website is for collect the basic information of VP auto tech\'s customers', 'เป็นเว็บที่เก็บข้อมูลลูกค้า วีพีออโต้เทค', 2, 1, 36, 2, NULL, 1, NULL, NULL, 4254, '2022-01-13 10:39:30', 4254, '2022-03-28 12:10:22'),
(134, 'โมเดล ทดสอบ', 'model test', 'ทดสอบการเสนอหัวข้อ', 2, 1, 36, 2, NULL, 1, NULL, NULL, 4253, '2022-01-13 12:04:12', 4253, '2022-03-28 12:10:19'),
(135, 'asd', 'asd', 'asd', 2, 1, 36, 2, NULL, 0, NULL, NULL, 4253, '2022-01-15 13:13:48', 4253, '2022-01-15 13:13:48');

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
(182, 4254, 133, 0, 4254, '2022-01-13 10:39:30', 4254, '2022-01-13 10:39:30'),
(184, 4253, 135, 0, 4253, '2022-01-15 13:13:48', 4253, '2022-01-15 13:13:48');

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
(36, 1, 1, '2022', 1, NULL, 4296, 2, '13:00:00', '15:00:00', 4296, '2022-01-13 10:36:58', 4296, '2022-01-13 10:36:58');

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
(4253, 'user02', '$2b$10$ZxnEctzZWUNFQYqkL1vYxukTrJ5wYD3DpeRsEKVwocavov2/8eiKe', 'นาย', 'กฤษติพงศ์', 'ชัยตัน', '59543206001-9', '', '', '2559', 1, 1, '08664647-c2ea-40de-82f4-0f036e9c298e.jpg', 1, '2021-12-19 14:34:39', 4296, '2022-03-25 14:18:34'),
(4254, 'user03', '$2b$10$1OnJgiSKyjtv5oXszrnEeOdQfcDb.4icfMWJRGJg4rjTJqaZKCg2O', 'นาย', 'กิตติธัช', 'วัฒนานุกร', '59543206002-7', '', '', '2559', 1, 1, NULL, 1, '2021-12-19 14:34:39', 1, '2022-01-13 10:07:26'),
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
(4295, 'teacher1', '$2b$10$ycs72K7wSxBKhJJhtJTdOOrMsN2zwAJCGQH6srXhZDp47CkO6iHei', 'นาย', 'ปรัชญ์', 'ปิยะวงศ์วิศาล', '', '', '', '', 2, 1, NULL, 1, '2021-12-19 14:34:39', 1, '2022-01-13 10:07:26'),
(4296, 'teacher2', '$2b$10$KGaPMn7MRG265GHgDVyE5eCebXWbCZhhSAe9KlW5E9dAg2B1LGw1i', 'นาย', 'อนุชล', 'หอมเสียง', '', '', '', '', 3, 1, NULL, 1, '2021-12-19 14:34:39', 1, '2021-12-29 14:07:22'),
(4297, 'teacher3', '$2b$10$Fj7GE1.x5fBr7bjHZLs6zeRf94pripgJsLADnRU7ObOfBz964hw1i', 'นาย', 'ตั้ม', 'ตั้ม', '', '', '', NULL, 5, 1, NULL, 4296, '2022-03-28 15:22:26', 4296, '2022-03-28 15:22:26');

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
-- Indexes for table `exam`
--
ALTER TABLE `exam`
  ADD PRIMARY KEY (`ExamID`);

--
-- Indexes for table `example_file`
--
ALTER TABLE `example_file`
  ADD PRIMARY KEY (`ExampleFileID`);

--
-- Indexes for table `exam_status`
--
ALTER TABLE `exam_status`
  ADD PRIMARY KEY (`ExamStatusID`);

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
  ADD PRIMARY KEY (`MeetingID`);

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
  MODIFY `EnvID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `app_menus`
--
ALTER TABLE `app_menus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `app_privileges`
--
ALTER TABLE `app_privileges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `deadline`
--
ALTER TABLE `deadline`
  MODIFY `DeadlineID` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=306;

--
-- AUTO_INCREMENT for table `document`
--
ALTER TABLE `document`
  MODIFY `Document_ID` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `exam`
--
ALTER TABLE `exam`
  MODIFY `ExamID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `example_file`
--
ALTER TABLE `example_file`
  MODIFY `ExampleFileID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `exam_status`
--
ALTER TABLE `exam_status`
  MODIFY `ExamStatusID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `form_comment`
--
ALTER TABLE `form_comment`
  MODIFY `CommentID` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `form_prerequisite`
--
ALTER TABLE `form_prerequisite`
  MODIFY `PrerequisiteID` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `form_sent`
--
ALTER TABLE `form_sent`
  MODIFY `FormID` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT for table `form_status`
--
ALTER TABLE `form_status`
  MODIFY `FormStatusID` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `form_type`
--
ALTER TABLE `form_type`
  MODIFY `FormTypeID` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `meeting`
--
ALTER TABLE `meeting`
  MODIFY `MeetingID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `NotiID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=195;

--
-- AUTO_INCREMENT for table `notification_types`
--
ALTER TABLE `notification_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=195;

--
-- AUTO_INCREMENT for table `project_advisor`
--
ALTER TABLE `project_advisor`
  MODIFY `AdvisorID` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=211;

--
-- AUTO_INCREMENT for table `project_committee`
--
ALTER TABLE `project_committee`
  MODIFY `CommitteeID` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `project_committee_role`
--
ALTER TABLE `project_committee_role`
  MODIFY `CommitteeRoleID` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `project_info`
--
ALTER TABLE `project_info`
  MODIFY `ProjectID` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136;

--
-- AUTO_INCREMENT for table `project_member`
--
ALTER TABLE `project_member`
  MODIFY `MemberID` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=185;

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
  MODIFY `SectionID` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `user_profile`
--
ALTER TABLE `user_profile`
  MODIFY `UserID` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4298;

--
-- AUTO_INCREMENT for table `user_type`
--
ALTER TABLE `user_type`
  MODIFY `UserTypeID` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
