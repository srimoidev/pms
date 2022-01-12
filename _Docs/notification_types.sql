
INSERT INTO `notification_types` (`id`, `NotiTypeID`, `UserTypeID`, `NotiTypeName`, `TitleTemplate`, `MessageTemplate`, `ActionTemplate`, `CreatedBy`, `CreatedTime`, `UpdatedBy`, `UpdatedTime`) VALUES
-- นักเรียนสร้างกลุ่ม
(NULL, 1, 1, 'นักศึกษาเพิ่มโครงงาน', 'สร้างกลุ่ม {ProjectName}', 'สร้างกลุ่ม {ProjectName} และเพิ่มคุณเป็นสมาชิก', '/student/project', NULL, NULL, NULL, NULL),
(NULL, 1, 2, 'นักศิกษาเพิ่มโครงงาน', 'สร้างกลุ่ม {ProjectName}', 'สร้างกลุ่ม {ProjectName} และเพิ่มคุณเป็นอาจารย์ที่ปรึกษา', '/teacher/advisor_req', NULL, NULL, NULL, NULL),
-- อาจารย์สร้างกลุ่ม
(NULL, 2, 1, 'อาจารย์เพิ่มโครงงาน', 'สร้างกลุ่ม {ProjectName}', 'สร้างกลุ่ม {ProjectName} และเพิ่มคุณเป็นสมาชิก', '/student/project', NULL, NULL, NULL, NULL),
(NULL, 2, 3, 'อาจารย์เพิ่มโครงงาน', 'สร้างกลุ่ม {ProjectName}', 'สร้างกลุ่ม {ProjectName} และรอการอนุมัติเริ่มทำโครงงาน', '/teacher/new_projects', NULL, NULL, NULL, NULL),
(NULL, 2, 5, 'อาจารย์เพิ่มโครงงาน', 'สร้างกลุ่ม {ProjectName}', 'สร้างกลุ่ม {ProjectName} และรอการอนุมัติเริ่มทำโครงงาน', '/teacher/new_projects', NULL, NULL, NULL, NULL),
-- ที่ปรึกษาอนุมัติโปรเจ็ค
(NULL, 3, 1, 'อนุมัติกลุ่มโปรเจ็ค', 'อนุมัติเป็นที่ปรึกษา', 'อนุมัติเป็นที่ปรึกษากลุ่มเรียบร้อย และรออาจารย์ประจำวิชาอนุมัติในลำดับถัดไป', '/student/project', NULL, NULL, NULL, NULL),
(NULL, 3, 3, 'อนุมัติกลุ่มโปรเจ็ค', 'อนุมัติเป็นที่ปรึกษา', 'กลุ่ม {ProjectName} รอการอนุมัติเริ่มทำโครงงาน', '/teacher/new_projects', NULL, NULL, NULL, NULL),
(NULL, 3, 5, 'อนุมัติกลุ่มโปรเจ็ค', 'อนุมัติเป็นที่ปรึกษา', 'กลุ่ม {ProjectName} รอการอนุมัติเริ่มทำโครงงาน', '/teacher/new_projects', NULL, NULL, NULL, NULL),
-- ที่ปรึกษาไม่อนุมัติโปรเจ็ค
(NULL, 4, 1, 'ไม่อนุมัติกลุ่มโปรเจ็ค', 'ไม่อนุมัติเป็นที่ปรึกษา ', 'ไม่อนุมัติเป็นที่ปรึกษา โปรดตรวจสอบโครงงานและเสนอโครงงานใหม่', '/student/project', NULL, NULL, NULL, NULL),
-- ประจำวิชาอนุมัติโครงงาน
(NULL, 5, 1, 'อนุมัติเริ่มทำโครงงาน', 'อนุมัติโครงงาน {ProjectName}', 'อนุมัติให้เริ่มทำโครงงานได้', '/student/project', NULL, NULL, NULL, NULL),
(NULL, 5, 2, 'อนุมัติเริ่มทำโครงงาน', 'อนุมัติโครงงาน {ProjectName}', 'อนุมัติให้นักศึกษาเริ่มทำโครงงานได้', '/teacher/project ?pid={ProjectID}', NULL, NULL, NULL, NULL),
-- ประจำวิชาไม่อนุมัติโครงงาน
(NULL, 6, 1, 'ไม่อนุมัติเริ่มทำโครงงาน', 'ไม่อนุมัติโครงงาน {ProjectName}', 'ไม่อนุมัติโครงงาน โปรดตรวจสอบโครงงานและเสนอโครงงานใหม่', '/student/project', NULL, NULL, NULL, NULL),
(NULL, 6, 2, 'ไม่อนุมัติเริ่มทำโครงงาน', 'ไม่อนุมัติโครงงาน {ProjectName}', 'ไม่อนุมัติโครงงาน โปรดตรวจสอบโครงงานและเสนอโครงงานใหม่', '/teacher/project?pid={ProjectID}', NULL, NULL, NULL, NULL),
-- นักศึกษาเข้าร่วมกลุ่ม
(NULL, 7, 1, 'เข้าร่วมกลุ่ม', '{FullName} เข้าร่วมกลุ่ม', '{FullName} ได้เข้าร่วมกลุ่ม {ProjectName} แล้ว', '/student/project', NULL, NULL, NULL, NULL),
(NULL, 7, 2, 'เข้าร่วมกลุ่ม', '{FullName} เข้าร่วมกลุ่ม', '{FullName} ได้เข้าร่วมกลุ่ม {ProjectName} แล้ว', '/teacher/project?pid={ProjectID}', NULL, NULL, NULL, NULL),
-- นักศึกษาออกจากกลุ่ม
(NULL, 8, 1, 'ออกกลุ่ม', '{FullName} ออกจากกลุ่ม', '{FullName} ออกจากกลุ่ม {ProjectName} แล้ว', '/student/project', NULL, NULL, NULL, NULL),
(NULL, 8, 2, 'ออกกลุ่ม', '{FullName} ออกจากกลุ่ม', '{FullName} ออกจากกลุ่ม {ProjectName} แล้ว', '/teacher/project?pid={ProjectID}', NULL, NULL, NULL, NULL),
-- ส่งเอกสาร CE
(NULL, 9, 1, 'ส่งเอกสาร CE', 'ส่งเอกสาร {FormName}', 'ส่งเอกสาร {FormName} เรียบร้อยแล้ว', '/student/form_preview?d={FormID}', NULL, NULL, NULL, NULL),
(NULL, 9, 2, 'ส่งเอกสาร CE', 'กลุ่ม {ProjectName} ส่งเอกสาร {FormName}', ' ส่งเอกสาร {FormName} รอรับการตรวจ', '/teacher/form_preview?pid={ProjectID}&fid={FormID}', NULL, NULL, NULL, NULL),
-- ที่ปรึกษาอนุมัติเอกสาร CE
(NULL, 10, 1, 'ที่ปรึกษาอนุมัติเอกสาร CE', 'อาจารย์ที่ปรึกษาอนุมัติ {FormName}', 'อนุมัติ {FormName} เรียบร้อยแล้ว และรออาจารย์ประจำวิชาอนุมัติในลำดับถัดไป', '/student/form_preview?d={FormID}', NULL, NULL, NULL, NULL),
(NULL, 10, 3, 'ที่ปรึกษาอนุมัติเอกสาร CE', 'กลุ่ม {ProjectName} ส่งเอกสาร {FormName}', 'อนุมัติเอกสาร {FormName} แล้วรอรับการอนุมัติจากอาจารย์ประจำวิชา', '/teacher/form_preview?pid={ProjectID}&fid={FormID}', NULL, NULL, NULL, NULL),
(NULL, 10, 5, 'ที่ปรึกษาอนุมัติเอกสาร CE', 'กลุ่ม {ProjectName} ส่งเอกสาร {FormName}', 'อนุมัติเอกสาร {FormName} แล้วรอรับการอนุมัติจากอาจารย์ประจำวิชา', '/teacher/form_preview?pid={ProjectID}&fid={FormID}', NULL, NULL, NULL, NULL),
-- ที่ปรึกษาไม่อนุมัติเอกสาร CE
(NULL, 11, 1, 'ที่ปรึกษาไม่อนุมัติเอกสาร CE', 'อาจารย์ที่ปรึกษาไม่อนุมัติ {FormName}', 'ไม่อนุมัติ {FormName} โปรดตรวจสอบและแก้ไข', '/student/form_preview?d={FormID}', NULL, NULL, NULL, NULL),
-- ประจำวิชาอนุมัติเอกสาร CE
(NULL, 12, 1, 'ประจำวิชาอนุมัติเอกสาร CE', 'อาจารย์ที่ประจำวิชาอนุมัติ {FormName}', 'อนุมัติ {FormName} เรียบร้อยแล้ว', '/student/form_preview?d={FormID}', NULL, NULL, NULL, NULL),
(NULL, 12, 2, 'ประจำวิชาอนุมัติเอกสาร CE', 'อาจารย์ที่ประจำวิชาอนุมัติ {FormName}', 'อนุมัติ {FormName} ของกลุ่ม {ProjectName} เรียบร้อยแล้ว', '/teacher/form_preview?pid={ProjectID}&fid={FormID}', NULL, NULL, NULL, NULL),
-- ประจำวิชาไม่อนุมัติเอกสาร CE
(NULL, 13, 1, 'ประจำวิชาไม่อนุมัติเอกสาร CE', 'อาจารย์ที่ประจำวิชาไม่อนุมัติ {FormName}', 'ไม่อนุมัติ {FormName} โปรดตรวจสอบและแก้ไข', '/student/form_preview?d={FormID}', NULL, NULL, NULL, NULL),
(NULL, 13, 2, 'ประจำวิชาไม่อนุมัติเอกสาร CE', 'อาจารย์ที่ประจำวิชาไม่อนุมัติ {FormName}', 'ไม่อนุมัติ {FormName} ของกลุ่ม {ProjectName}', '/teacher/form_preview?pid={ProjectID}&fid={FormID}', NULL, NULL, NULL, NULL),
-- นักศึกษานัดหมายอาจารย์
(NULL, 14, 1, 'การนัดหมายใหม่', 'การนัดหมายใหม่', 'สร้างการนัดหมายใหม่', '/student/form_preview?d={FormID}', NULL, NULL, NULL, NULL),
(NULL, 14, 2, 'การนัดหมายใหม่', 'การนัดหมายใหม่', 'กลุ่ม {ProjectName} สร้างการนัดหมายใหม่', '/student/form_preview?d={FormID}', NULL, NULL, NULL, NULL),
(NULL, 14, 3, 'การนัดหมายใหม่', 'การนัดหมายใหม่', 'กลุ่ม {ProjectName} สร้างการนัดหมายใหม่', '/student/form_preview?d={FormID}', NULL, NULL, NULL, NULL),
(NULL, 14, 5, 'การนัดหมายใหม่', 'การนัดหมายใหม่', 'กลุ่ม {ProjectName} สร้างการนัดหมายใหม่', '/student/form_preview?d={FormID}', NULL, NULL, NULL, NULL),
-- อาจารย์นัดหมายนักศึกษา
(NULL, 15, 1, 'การนัดหมายใหม่', 'การนัดหมายใหม่', 'สร้างการนัดหมายใหม่', '/student/form_preview?d={FormID}', NULL, NULL, NULL, NULL),
-- อาจารยยืนยันการนัดหมาย
(NULL, 16, 1, 'ยืนยันการนัดหมาย', 'ยืนยันการนัดหมาย', 'ยืนยันการนัดหมาย วันที่ {Date} เวลา {Time}', '/student/form_preview?d={FormID}', NULL, NULL, NULL, NULL),
-- อาจารย์ปฏิเสธการนัดหมาย
(NULL, 17, 1, 'ปฏิเสธการนัดหมาย', 'ปฏิเสธการนัดหมาย', 'ปฏิเสธการนัดหมาย วันที่ {Date} เวลา {Time}', '/student/form_preview?d={FormID}', NULL, NULL, NULL, NULL),

-- นักศึกษายืนยันการนัดหมาย
(NULL, 18, 2, 'ยืนยันการนัดหมาย', 'ยืนยันการนัดหมาย', 'ยืนยันการนัดหมาย กลุ่ม {ProjectName} วันที่ {Date} เวลา {Time}', '/student/form_preview?d={FormID}', NULL, NULL, NULL, NULL),
(NULL, 18, 3, 'ยืนยันการนัดหมาย', 'ยืนยันการนัดหมาย', 'ยืนยันการนัดหมาย กลุ่ม {ProjectName} วันที่ {Date} เวลา {Time}', '/student/form_preview?d={FormID}', NULL, NULL, NULL, NULL),
(NULL, 18, 5, 'ยืนยันการนัดหมาย', 'ยืนยันการนัดหมาย', 'ยืนยันการนัดหมาย กลุ่ม {ProjectName} วันที่ {Date} เวลา {Time}', '/student/form_preview?d={FormID}', NULL, NULL, NULL, NULL),
-- นักศึกษาปฏิเสธการนัดหมาย
(NULL, 19, 2, 'ปฏิเสธการนัดหมาย', 'ปฏิเสธการนัดหมาย', 'ปฏิเสธการนัดหมาย กลุ่ม {ProjectName} วันที่ {Date} เวลา {Time}', '/student/form_preview?d={FormID}', NULL, NULL, NULL, NULL),
(NULL, 19, 3, 'ปฏิเสธการนัดหมาย', 'ปฏิเสธการนัดหมาย', 'ปฏิเสธการนัดหมาย กลุ่ม {ProjectName} วันที่ {Date} เวลา {Time}', '/student/form_preview?d={FormID}', NULL, NULL, NULL, NULL),
(NULL, 19, 5, 'ปฏิเสธการนัดหมาย', 'ปฏิเสธการนัดหมาย', 'ปฏิเสธการนัดหมาย กลุ่ม {ProjectName} วันที่ {Date} เวลา {Time}', '/student/form_preview?d={FormID}', NULL, NULL, NULL, NULL),

-- นักศึกษายกเลิกการนัดหมาย
(NULL, 18, 2, 'ยกเลิกการนัดหมาย', 'ยกเลิกการนัดหมาย', 'ยกเลิกการนัดหมาย กลุ่ม {ProjectName} วันที่ {Date} เวลา {Time}', '/student/form_preview?d={FormID}', NULL, NULL, NULL, NULL),
(NULL, 18, 3, 'ยกเลิกการนัดหมาย', 'ยกเลิกการนัดหมาย', 'ยกเลิกการนัดหมาย กลุ่ม {ProjectName} วันที่ {Date} เวลา {Time}', '/student/form_preview?d={FormID}', NULL, NULL, NULL, NULL),
(NULL, 18, 5, 'ยกเลิกการนัดหมาย', 'ยกเลิกการนัดหมาย', 'ยกเลิกการนัดหมาย กลุ่ม {ProjectName} วันที่ {Date} เวลา {Time}', '/student/form_preview?d={FormID}', NULL, NULL, NULL, NULL),
-- อาจารย์ยกเลิกการนัดหมาย
(NULL, 19, 1, 'ยกเลิกการนัดหมาย', 'ยกเลิกการนัดหมาย', 'ยกเลิกการนัดหมาย วันที่ {Date} เวลา {Time}', '/student/form_preview?d={FormID}', NULL, NULL, NULL, NULL),
-- อาจารย์ยกเลิกการนัดหมาย
(NULL, 19, 1, 'ยกเลิกการนัดหมาย', 'ยกเลิกการนัดหมาย', 'ยกเลิกการนัดหมาย วันที่ {Date} เวลา {Time}', '/student/form_preview?d={FormID}', NULL, NULL, NULL, NULL),
-- อาจารย์ comment เอกสาร
(NULL, 20, 1, 'คอมเมนต์จากอาจารย์', 'คอมเมนต์จากอาจารย์', 'คอมเมนต์เอกสาร {FormName}', '/student/form_preview?d={FormID}', NULL, NULL, NULL, NULL),
