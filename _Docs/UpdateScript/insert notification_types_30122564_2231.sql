
INSERT INTO `notification_types` (`id`, `NotiTypeID`, `UserTypeID`, `NotiTypeName`, `TitleTemplate`, `MessageTemplate`, `ActionTemplate`, `CreatedBy`, `CreatedTime`, `UpdatedBy`, `UpdatedTime`) VALUES
-- นักเรียนสร้างกลุ่ม
(NULL, 1, 1, 'นักศึกษาเพิ่มโครงงาน', 'สร้างกลุ่ม {ProjectName}', 'สร้างกลุ่ม {ProjectName} และเพิ่มคุณเป็นสมาชิก', '/student/project', NULL, NULL, NULL, NULL),
(NULL, 1, 2, 'นักศิกษาเพิ่มโครงงาน', 'สร้างกลุ่ม {ProjectName}', 'สร้างกลุ่ม {ProjectName} และเพิ่มคุณเป็นอาจารย์ที่ปรึกษา', '/teacher/advisor_req', NULL, NULL, NULL, NULL),
-- อาจารย์สร้างกลุ่ม
(NULL, 2, 1, 'อาจารย์เพิ่มโครงงาน', 'สร้างกลุ่ม {ProjectName}', 'สร้างกลุ่ม {ProjectName} และเพิ่มคุณเป็นสมาชิก', '/student/project', NULL, NULL, NULL, NULL),
(NULL, 2, 3, 'อาจารย์เพิ่มโครงงาน', 'สร้างกลุ่ม {ProjectName}', 'สร้างกลุ่ม {ProjectName} และรอการอนุมัติเริ่มทำโครงงาน', '/teacher/approvement_req', NULL, NULL, NULL, NULL),
(NULL, 2, 5, 'อาจารย์เพิ่มโครงงาน', 'สร้างกลุ่ม {ProjectName}', 'สร้างกลุ่ม {ProjectName} และรอการอนุมัติเริ่มทำโครงงาน', '/teacher/approvement_req', NULL, NULL, NULL, NULL),
-- ที่ปรึกษาอนุมัติโปรเจ็ค
(NULL, 3, 1, 'อนุมัติกลุ่มโปรเจ็ค', 'อนุมัติเป็นที่ปรึกษากลุ่ม ', 'อนุมัติเป็นที่ปรึกษากลุ่มเรียบร้อย และรออาจารย์ประจำวิชาอนุมัติในลำดับถัดไป', '/student/project', NULL, NULL, NULL, NULL),
(NULL, 3, 3, 'อนุมัติกลุ่มโปรเจ็ค', 'อนุมัติเป็นที่ปรึกษากลุ่ม', 'กลุ่ม {ProjectName} รอการอนุมัติเริ่มทำโครงงาน', '/teacher/approvement_req', NULL, NULL, NULL, NULL),
(NULL, 3, 5, 'อนุมัติกลุ่มโปรเจ็ค', 'อนุมัติเป็นที่ปรึกษากลุ่ม', 'กลุ่ม {ProjectName} รอการอนุมัติเริ่มทำโครงงาน', '/teacher/approvement_req', NULL, NULL, NULL, NULL),
-- ที่ปรึกษาไม่อนุมัติโปรเจ็ค
(NULL, 4, 1, 'ไม่อนุมัติกลุ่มโปรเจ็ค', 'ไม่อนุมัติเป็นที่ปรึกษากลุ่ม ', 'ไม่อนุมัติเป็นที่ปรึกษากลุ่ม โปรดตรวจสอบโครงงานและเสนอโครงงานใหม่', '/student/project', NULL, NULL, NULL, NULL),
-- ประจำวิชาอนุมัติโครงงาน
(NULL, 5, 1, 'อนุมัติเริ่มทำโครงงาน', 'อนุมัติโครงงาน {ProjectName}', 'อนุมัติให้เริ่มทำโครงงานได้', NULL, NULL, NULL, NULL, NULL),
(NULL, 5, 2, 'อนุมัติเริ่มทำโครงงาน', 'อนุมัติโครงงาน {ProjectName}', 'อนุมัติให้นักศึกษาเริ่มทำโครงงานได้', NULL, NULL, NULL, NULL, NULL),
-- ประจำวิชาไม่อนุมัติโครงงาน
(NULL, 6, 1, 'ไม่อนุมัติเริ่มทำโครงงาน', 'ไม่อนุมัติโครงงาน {ProjectName}', 'ไม่อนุมัติโครงงาน โปรดตรวจสอบโครงงานและเสนอโครงงานใหม่', NULL, NULL, NULL, NULL, NULL),
(NULL, 6, 2, 'ไม่อนุมัติเริ่มทำโครงงาน', 'ไม่อนุมัติโครงงาน {ProjectName}', 'ไม่อนุมัติโครงงาน โปรดตรวจสอบโครงงานและเสนอโครงงานใหม่', NULL, NULL, NULL, NULL, NULL),
-- นักศึกษาเข้าร่วมกลุ่ม
(NULL, 7, 1, 'เข้าร่วมกลุ่ม', '{FullName} เข้าร่วมกลุ่ม', '{FullName} ได้เข้าร่วมกลุ่ม {ProjectName} แล้ว', '/student/project', NULL, NULL, NULL, NULL),
(NULL, 7, 2, 'เข้าร่วมกลุ่ม', '{FullName} เข้าร่วมกลุ่ม', '{FullName} ได้เข้าร่วมกลุ่ม {ProjectName} แล้ว', NULL, NULL, NULL, NULL, NULL),
-- นักศึกษาออกจากกลุ่ม
(NULL, 8, 1, 'ออกกลุ่ม', '{FullName} ออกจากกลุ่ม', '{FullName} ออกจากกลุ่ม {ProjectName} แล้ว', '/student/project', NULL, NULL, NULL, NULL),
(NULL, 8, 2, 'ออกกลุ่ม', '{FullName} ออกจากกลุ่ม', '{FullName} ออกจากกลุ่ม {ProjectName} แล้ว', NULL, NULL, NULL, NULL, NULL),
-- ส่งเอกสาร CE
(NULL, 9, 1, 'ส่งเอกสาร CE', 'ส่งเอกสาร {CEName}', 'ส่งเอกสาร {CEName} เรียบร้อยแล้ว', '/student/form_preview?d={DocumentID}', NULL, NULL, NULL, NULL),
(NULL, 9, 2, 'ส่งเอกสาร CE', 'กลุ่ม {ProjectName} ส่งเอกสาร {CEName}', ' ส่งเอกสาร {CEName} รอรับการตรวจ', '/student/form_preview?d={DocumentID}', NULL, NULL, NULL, NULL),
-- ที่ปรึกษาอนุมัติเอกสาร CE
(NULL, 10, 1, 'ที่ปรึกษาอนุมัติเอกสาร CE', 'อาจารย์ที่ปรึกษาอนุมัติ {CEName}', 'อนุมัติ {CEName} เรียบร้อยแล้ว และรออาจารย์ประจำวิชาอนุมัติในลำดับถัดไป', '/student/form_preview?d={DocumentID}', NULL, NULL, NULL, NULL),
(NULL, 10, 3, 'ที่ปรึกษาอนุมัติเอกสาร CE', 'กลุ่ม {ProjectName} ส่งเอกสาร {CEName}', 'อนุมัติเอกสาร {CEName} แล้วรอรับการอนุมัติจากอาจารย์ประจำวิชา', '/student/form_preview?d={DocumentID}', NULL, NULL, NULL, NULL),
(NULL, 10, 5, 'ที่ปรึกษาอนุมัติเอกสาร CE', 'กลุ่ม {ProjectName} ส่งเอกสาร {CEName}', 'อนุมัติเอกสาร {CEName} แล้วรอรับการอนุมัติจากอาจารย์ประจำวิชา', '/student/form_preview?d={DocumentID}', NULL, NULL, NULL, NULL),
-- ที่ปรึกษาไม่อนุมัติเอกสาร CE
(NULL, 11, 1, 'ที่ปรึกษาไม่อนุมัติเอกสาร CE', 'อาจารย์ที่ปรึกษาไม่อนุมัติ {CEName}', 'ไม่อนุมัติ {CEName} โปรดตรวจสอบและแก้ไข', '/student/form_preview?d={DocumentID}', NULL, NULL, NULL, NULL),
-- ประจำวิชาอนุมัติเอกสาร CE
(NULL, 12, 1, 'ประจำวิชาอนุมัติเอกสาร CE', 'อาจารย์ที่ประจำวิชาอนุมัติ {CEName}', 'อนุมัติ {CEName} เรียบร้อยแล้ว', '/student/form_preview?d={DocumentID}', NULL, NULL, NULL, NULL),
(NULL, 12, 2, 'ประจำวิชาอนุมัติเอกสาร CE', 'อาจารย์ที่ประจำวิชาอนุมัติ {CEName}', 'อนุมัติ {CEName} ของกลุ่ม {ProjectName} เรียบร้อยแล้ว', '/student/form_preview?d={DocumentID}', NULL, NULL, NULL, NULL),
-- ประจำวิชาไม่อนุมัติเอกสาร CE
(NULL, 13, 1, 'ประจำวิชาไม่อนุมัติเอกสาร CE', 'อาจารย์ที่ปรึกษาไม่อนุมัติ {CEName}', 'ไม่อนุมัติ {CEName} โปรดตรวจสอบและแก้ไข', '/student/form_preview?d={DocumentID}', NULL, NULL, NULL, NULL),
(NULL, 13, 2, 'ประจำวิชาไม่อนุมัติเอกสาร CE', 'อาจารย์ที่ปรึกษาไม่อนุมัติ {CEName}', 'ไม่อนุมัติ {CEName} ของกลุ่ม {ProjectName}', '/student/form_preview?d={DocumentID}', NULL, NULL, NULL, NULL),

