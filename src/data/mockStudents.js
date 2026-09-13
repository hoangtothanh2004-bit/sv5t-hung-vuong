export const INITIAL_STUDENTS = [
  {
    id: 'hvu-001',
    name: 'Lê Tuấn Thành',
    studentCode: '22D480201001',
    email: 'letuanthanh2606@gmail.com',
    gender: 'Nam',
    dob: '13/11/2004',
    ethnicity: 'Kinh',
    year: 'Năm thứ 3',
    degree: 'Đại học chính quy',
    className: 'K21 - CNTT 1',
    facultyId: 'ktcn',
    facultyName: 'Khoa Kỹ thuật - Công nghệ',
    position: 'Bí thư Chi đoàn K21 CNTT',
    unionStatus: 'Đảng viên dự bị',
    phone: '0983456832',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    gpa: 3.68,
    drl: 94,
    hasEnglishCert: true,
    englishCertType: 'IELTS 6.5',
    hasResearch: true,
    hasVolunteerCampaign: true,
    hasBloodDonation: true,
    hasSports: true,
    submittedDate: '2025-10-15 08:30',
    overallStatus: 'pending',
    criteriaStatus: {
      TC1: { status: 'approved', note: 'ĐRL 94 - Đảng viên tiêu biểu', verifiedBy: 'ThS. Nguyễn Văn Thắng', date: '2025-10-16' },
      TC2: { status: 'pending', note: 'Chờ duyệt GPA 3.68', verifiedBy: null, date: null },
      TC3: { status: 'approved', note: 'Giải Ba Cầu lông HVU 2025', verifiedBy: 'ThS. Trần Đình Hưng', date: '2025-10-16' },
      TC4: { status: 'approved', note: 'Đội trưởng Mùa hè xanh 2025', verifiedBy: 'Đoàn trường HVU', date: '2025-10-16' },
      TC5: { status: 'pending', note: 'IELTS 6.5 - Chờ xác thực văn bằng', verifiedBy: null, date: null }
    },
    evidences: {
      TC1: [
        { id: 'ev-1', title: 'Phiếu điểm rèn luyện năm học 2024-2025 (94 điểm)', url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80', type: 'image', note: 'Đạt loại Xuất sắc' },
        { id: 'ev-2', title: 'Quyết định công nhận Đảng viên dự bị', url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80', type: 'image', note: 'Huyện ủy ký' }
      ],
      TC2: [
        { id: 'ev-3', title: 'Bảng điểm tổng kết năm học GPA 3.68/4.0', url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80', type: 'image', note: 'Xếp loại Xuất sắc' },
        { id: 'ev-4', title: 'Giấy chứng nhận Đề tài NCKH Sinh viên cấp Trường đạt giải Nhì', url: 'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?w=600&auto=format&fit=crop&q=80', type: 'image', note: 'Đề tài Hệ thống IoT nông nghiệp số' }
      ],
      TC3: [
        { id: 'ev-5', title: 'Giấy chứng nhận Thanh niên khỏe cấp Trường năm 2025', url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&auto=format&fit=crop&q=80', type: 'image', note: 'Đạt 4/4 nội dung kiểm tra thể lực' }
      ],
      TC4: [
        { id: 'ev-6', title: 'Giấy chứng nhận tham gia Chiến dịch Mùa hè xanh tại Thanh Ba', url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&auto=format&fit=crop&q=80', type: 'image', note: 'Thời gian từ 01/7 đến 20/7/2025' },
        { id: 'ev-7', title: 'Giấy chứng nhận hiến máu tình nguyện đợt 1/2025', url: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=600&auto=format&fit=crop&q=80', type: 'image', note: 'Đơn vị máu 350ml' }
      ],
      TC5: [
        { id: 'ev-8', title: 'Chứng chỉ IELTS Academic Overall 6.5 (IDP)', url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80', type: 'image', note: 'Cấp tháng 3/2025, còn thời hạn 2 năm' }
      ]
    }
  },
  {
    id: 'hvu-002',
    name: 'Nguyễn Thị Thu Hà',
    studentCode: '22D480201002',
    email: 'thuha.nguyen@hvu.edu.vn',
    gender: 'Nữ',
    dob: '05/04/2004',
    ethnicity: 'Kinh',
    year: 'Năm thứ 3',
    degree: 'Đại học chính quy',
    className: 'K21 - SP Toán',
    facultyId: 'sp',
    facultyName: 'Khoa Sư phạm',
    position: 'Phó Bí thư Liên chi đoàn Khoa Sư phạm',
    unionStatus: 'Đoàn viên ưu tú',
    phone: '0978123456',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    gpa: 3.75,
    drl: 96,
    hasEnglishCert: true,
    englishCertType: 'VSTEP B2',
    hasResearch: true,
    hasVolunteerCampaign: true,
    hasBloodDonation: true,
    hasSports: true,
    submittedDate: '2025-10-14 14:20',
    overallStatus: 'approved',
    criteriaStatus: {
      TC1: { status: 'approved', note: 'ĐRL 96 - Đoàn viên ưu tú', verifiedBy: 'Hội đồng HVU', date: '2025-10-16' },
      TC2: { status: 'approved', note: 'GPA 3.75 Xuất sắc', verifiedBy: 'Hội đồng HVU', date: '2025-10-16' },
      TC3: { status: 'approved', note: 'Huy chương Bạc bóng chuyền hơi SV', verifiedBy: 'Hội đồng HVU', date: '2025-10-16' },
      TC4: { status: 'approved', note: 'Chiến dịch Tiếp sức mùa thi 2025', verifiedBy: 'Hội đồng HVU', date: '2025-10-16' },
      TC5: { status: 'approved', note: 'VSTEP B2 đạt chuẩn', verifiedBy: 'Hội đồng HVU', date: '2025-10-16' }
    },
    evidences: {
      TC1: [{ id: 'ev-201', title: 'Bảng điểm rèn luyện 96 điểm', url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80', type: 'image', note: 'Xác nhận Khoa SP' }],
      TC2: [{ id: 'ev-202', title: 'Bảng điểm GPA 3.75', url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80', type: 'image', note: 'Thủ khoa kỳ 2' }],
      TC3: [{ id: 'ev-203', title: 'Huy chương Bạc Bóng chuyền SV', url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&auto=format&fit=crop&q=80', type: 'image', note: 'Giải trường' }],
      TC4: [{ id: 'ev-204', title: 'Chứng nhận Tiếp sức mùa thi 2025', url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&auto=format&fit=crop&q=80', type: 'image', note: 'Đạt loại A' }],
      TC5: [{ id: 'ev-205', title: 'Chứng chỉ VSTEP B2', url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80', type: 'image', note: 'Trung tâm Khảo thí HVU' }]
    }
  },
  {
    id: 'hvu-003',
    name: 'Trần Hoàng Long',
    studentCode: '22D480201003',
    email: 'hoanglong.tran@gmail.com',
    gender: 'Nam',
    dob: '21/08/2004',
    ethnicity: 'Kinh',
    year: 'Năm thứ 3',
    degree: 'Đại học chính quy',
    className: 'K21 - QTKD',
    facultyId: 'ktqtkd',
    facultyName: 'Khoa Kinh tế & QTKD',
    position: 'Ủy viên BCH Hội Sinh viên trường',
    unionStatus: 'Đảng viên chính thức',
    phone: '0912345678',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    gpa: 3.42,
    drl: 92,
    hasEnglishCert: true,
    englishCertType: 'TOEIC 650',
    hasResearch: false,
    hasVolunteerCampaign: true,
    hasBloodDonation: true,
    hasSports: true,
    submittedDate: '2025-10-15 10:15',
    overallStatus: 'pending',
    criteriaStatus: {
      TC1: { status: 'approved', note: 'ĐRL 92', verifiedBy: 'Hội đồng HVU', date: '2025-10-16' },
      TC2: { status: 'pending', note: 'Chờ duyệt GPA 3.42 (Giỏi)', verifiedBy: null, date: null },
      TC3: { status: 'approved', note: 'Thanh niên khỏe cấp trường', verifiedBy: 'Hội đồng HVU', date: '2025-10-16' },
      TC4: { status: 'approved', note: 'Tham gia Mùa hè xanh', verifiedBy: 'Hội đồng HVU', date: '2025-10-16' },
      TC5: { status: 'approved', note: 'TOEIC 650 IIG', verifiedBy: 'Hội đồng HVU', date: '2025-10-16' }
    },
    evidences: {
      TC1: [{ id: 'ev-301', title: 'Phiếu ĐRL 92', url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80', type: 'image' }],
      TC2: [{ id: 'ev-302', title: 'Bảng điểm GPA 3.42', url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80', type: 'image' }],
      TC3: [{ id: 'ev-303', title: 'Chứng nhận Thanh niên khỏe', url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&auto=format&fit=crop&q=80', type: 'image' }],
      TC4: [{ id: 'ev-304', title: 'Giấy chứng nhận Tình nguyện', url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&auto=format&fit=crop&q=80', type: 'image' }],
      TC5: [{ id: 'ev-305', title: 'Phiếu điểm TOEIC 650', url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80', type: 'image' }]
    }
  },
  {
    id: 'hvu-004',
    name: 'Phạm Minh Đức',
    studentCode: '23D480201014',
    email: 'ducpm.k22@gmail.com',
    gender: 'Nam',
    dob: '18/02/2005',
    ethnicity: 'Kinh',
    year: 'Năm thứ 2',
    degree: 'Đại học chính quy',
    className: 'K22 - Thú y',
    facultyId: 'nln',
    facultyName: 'Khoa Nông Lâm Ngư',
    position: 'Bí thư Chi đoàn K22 Thú y',
    unionStatus: 'Đoàn viên',
    phone: '0965888999',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    gpa: 3.35,
    drl: 88,
    hasEnglishCert: false,
    englishCertType: 'Tiếng Anh B1 HVU',
    hasResearch: true,
    hasVolunteerCampaign: true,
    hasBloodDonation: false,
    hasSports: true,
    submittedDate: '2025-10-15 11:30',
    overallStatus: 'pending',
    criteriaStatus: {
      TC1: { status: 'approved', note: 'ĐRL 88 - Loại Tốt', verifiedBy: 'Hội đồng HVU', date: '2025-10-16' },
      TC2: { status: 'pending', note: 'Chờ duyệt GPA 3.35 (Giỏi)', verifiedBy: null, date: null },
      TC3: { status: 'pending', note: 'Đang kiểm tra chỉ số thể lực', verifiedBy: null, date: null },
      TC4: { status: 'approved', note: 'Mùa hè xanh 2025 tại Cẩm Khê', verifiedBy: 'Hội đồng HVU', date: '2025-10-16' },
      TC5: { status: 'pending', note: 'Chờ xác nhận chuẩn đầu ra', verifiedBy: null, date: null }
    },
    evidences: {
      TC1: [{ id: 'ev-401', title: 'ĐRL 88 điểm', url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80', type: 'image' }],
      TC2: [{ id: 'ev-402', title: 'Bảng điểm GPA 3.35', url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80', type: 'image' }],
      TC3: [{ id: 'ev-403', title: 'Giấy khám sức khỏe & thể lực', url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&auto=format&fit=crop&q=80', type: 'image' }],
      TC4: [{ id: 'ev-404', title: 'Chứng nhận Mùa hè xanh 2025', url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&auto=format&fit=crop&q=80', type: 'image' }]
    }
  },
  {
    id: 'hvu-005',
    name: 'Vũ Hải Yến',
    studentCode: '22D480201025',
    email: 'yen.vuhai@gmail.com',
    gender: 'Nữ',
    dob: '09/09/2004',
    ethnicity: 'Kinh',
    year: 'Năm thứ 3',
    degree: 'Đại học chính quy',
    className: 'K21 - Ngôn ngữ Anh',
    facultyId: 'nn',
    facultyName: 'Khoa Ngoại ngữ',
    position: 'Chủ nhiệm CLB Tiếng Anh HVU',
    unionStatus: 'Đoàn viên ưu tú',
    phone: '0943222111',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    gpa: 3.82,
    drl: 95,
    hasEnglishCert: true,
    englishCertType: 'IELTS 7.5',
    hasResearch: true,
    hasVolunteerCampaign: true,
    hasBloodDonation: true,
    hasSports: true,
    submittedDate: '2025-10-14 16:45',
    overallStatus: 'approved',
    criteriaStatus: {
      TC1: { status: 'approved', note: 'ĐRL 95 Xuất sắc', verifiedBy: 'Hội đồng HVU', date: '2025-10-16' },
      TC2: { status: 'approved', note: 'GPA 3.82 Xuất sắc', verifiedBy: 'Hội đồng HVU', date: '2025-10-16' },
      TC3: { status: 'approved', note: 'Điểm GDTC 9.0', verifiedBy: 'Hội đồng HVU', date: '2025-10-16' },
      TC4: { status: 'approved', note: 'Hiến máu 2 lần năm 2025', verifiedBy: 'Hội đồng HVU', date: '2025-10-16' },
      TC5: { status: 'approved', note: 'IELTS 7.5 Xuất sắc', verifiedBy: 'Hội đồng HVU', date: '2025-10-16' }
    },
    evidences: {
      TC1: [{ id: 'ev-501', title: 'Phiếu ĐRL 95', url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80', type: 'image' }],
      TC2: [{ id: 'ev-502', title: 'Bảng điểm GPA 3.82', url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80', type: 'image' }],
      TC3: [{ id: 'ev-503', title: 'Bảng điểm GDTC A+', url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&auto=format&fit=crop&q=80', type: 'image' }],
      TC4: [{ id: 'ev-504', title: 'Giấy chứng nhận Hiến máu', url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&auto=format&fit=crop&q=80', type: 'image' }],
      TC5: [{ id: 'ev-505', title: 'IELTS TRF 7.5', url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80', type: 'image' }]
    }
  }
];

// Helper to generate bulk 55+ realistic students for testing the "100 students / 20+ GPA Gioi bulk review" scenario
const FIRST_NAMES = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Vũ', 'Đỗ', 'Bùi', 'Đặng', 'Ngô', 'Dương', 'Lý'];
const MIDDLE_NAMES = ['Văn', 'Thị', 'Đình', 'Hữu', 'Ngọc', 'Xuân', 'Đức', 'Thanh', 'Quang', 'Minh', 'Tuấn', 'Mai'];
const LAST_NAMES = ['Huy', 'Trang', 'Dũng', 'Linh', 'Anh', 'Phúc', 'Phương', 'Bình', 'Hằng', 'Tùng', 'Hoa', 'Nam', 'Quân', 'Khánh', 'Duy', 'Nhi', 'Hương', 'Thảo', 'Khoa', 'Tâm'];

const FACULTY_POOL = [
  { id: 'ktcn', name: 'Khoa Kỹ thuật - Công nghệ', classPrefix: 'CNTT' },
  { id: 'sp', name: 'Khoa Sư phạm', classPrefix: 'SP' },
  { id: 'ktqtkd', name: 'Khoa Kinh tế & QTKD', classPrefix: 'Kinh tế' },
  { id: 'nln', name: 'Khoa Nông Lâm Ngư', classPrefix: 'Nông Lâm' },
  { id: 'nn', name: 'Khoa Ngoại ngữ', classPrefix: 'Anh văn' },
  { id: 'khxhnv', name: 'Khoa KHXH & Nhân văn', classPrefix: 'Du lịch' },
  { id: 'yduoc', name: 'Khoa Y Dược', classPrefix: 'Dược' }
];

export function generateFullStudentList() {
  const list = [...INITIAL_STUDENTS];
  
  // Create 60 more students with controlled distribution:
  // Exactly 24 students have GPA >= 3.2 (Giỏi / Xuất sắc) to match user scenario
  for (let i = 6; i <= 65; i++) {
    const fn = FIRST_NAMES[i % FIRST_NAMES.length];
    const mn = MIDDLE_NAMES[(i * 3) % MIDDLE_NAMES.length];
    const ln = LAST_NAMES[(i * 7) % LAST_NAMES.length];
    const isMale = mn !== 'Thị' && mn !== 'Mai';
    const faculty = FACULTY_POOL[i % FACULTY_POOL.length];
    const yearNum = (i % 4) + 1;
    const isGoodGpa = i <= 28; // Students 6 to 28 (23 students) have GPA >= 3.2
    
    const gpa = isGoodGpa 
      ? Number((3.20 + (i % 7) * 0.11).toFixed(2)) 
      : Number((2.65 + (i % 5) * 0.10).toFixed(2));
      
    const drl = 75 + ((i * 7) % 24); // 75 to 98
    const hasEnglish = gpa >= 3.2 || i % 3 === 0;
    
    // Most start with pending for TC2 (Learning) so lecturer can batch test!
    const tc2Status = gpa >= 3.6 && i % 4 === 0 ? 'approved' : 'pending';
    const tc1Status = drl >= 90 && i % 3 === 0 ? 'approved' : 'pending';

    list.push({
      id: `hvu-${String(i).padStart(3, '0')}`,
      name: `${fn} ${mn} ${ln}`,
      studentCode: `2${4 - yearNum}D480${String(i * 10).padStart(5, '0')}`,
      email: `${ln.toLowerCase()}.${fn.toLowerCase()}${i}@hvu.edu.vn`,
      gender: isMale ? 'Nam' : 'Nữ',
      dob: `${(i % 28) + 1}/${(i % 12) + 1}/200${4 - (yearNum % 2)}`,
      ethnicity: i % 9 === 0 ? 'Mường' : (i % 17 === 0 ? 'Tày' : 'Kinh'),
      year: `Năm thứ ${yearNum}`,
      degree: 'Đại học chính quy',
      className: `K${24 - yearNum} - ${faculty.classPrefix} ${((i % 3) + 1)}`,
      facultyId: faculty.id,
      facultyName: faculty.name,
      position: i % 4 === 0 ? 'Bí thư Chi đoàn' : (i % 6 === 0 ? 'Lớp trưởng' : 'Đoàn viên'),
      unionStatus: i % 8 === 0 ? 'Đảng viên' : (i % 3 === 0 ? 'Đoàn viên ưu tú' : 'Đoàn viên'),
      phone: `09${(80000000 + i * 1432).toString().slice(0, 8)}`,
      avatar: isMale 
        ? `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`
        : `https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80`,
      gpa,
      drl,
      hasEnglishCert: hasEnglish,
      englishCertType: hasEnglish ? (gpa >= 3.6 ? 'IELTS 6.5' : (gpa >= 3.4 ? 'TOEIC 600' : 'VSTEP B1')) : 'Chưa có',
      hasResearch: gpa >= 3.3 || i % 4 === 0,
      hasVolunteerCampaign: i % 2 === 0,
      hasBloodDonation: i % 3 === 0,
      hasSports: i % 2 !== 0,
      submittedDate: `2025-10-${String(10 + (i % 15)).padStart(2, '0')} 09:30`,
      overallStatus: 'pending',
      criteriaStatus: {
        TC1: { status: tc1Status, note: tc1Status === 'approved' ? `ĐRL ${drl}` : 'Chờ thẩm định ĐRL', verifiedBy: tc1Status === 'approved' ? 'Hội đồng HVU' : null, date: tc1Status === 'approved' ? '2025-10-16' : null },
        TC2: { status: tc2Status, note: tc2Status === 'approved' ? `GPA ${gpa}` : `Chờ duyệt GPA ${gpa}`, verifiedBy: tc2Status === 'approved' ? 'Hội đồng HVU' : null, date: tc2Status === 'approved' ? '2025-10-16' : null },
        TC3: { status: i % 3 === 0 ? 'approved' : 'pending', note: 'Thể lực sinh viên', verifiedBy: null, date: null },
        TC4: { status: i % 2 === 0 ? 'approved' : 'pending', note: 'Chiến dịch thanh niên', verifiedBy: null, date: null },
        TC5: { status: hasEnglish && i % 4 === 0 ? 'approved' : 'pending', note: 'Ngoại ngữ & Hội nhập', verifiedBy: null, date: null }
      },
      evidences: {
        TC1: [{ id: `ev-${i}-1`, title: `Bảng điểm rèn luyện ${drl} điểm`, url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80', type: 'image' }],
        TC2: [{ id: `ev-${i}-2`, title: `Bảng điểm trung bình chung GPA ${gpa}`, url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80', type: 'image' }],
        TC3: [{ id: `ev-${i}-3`, title: 'Giấy chứng nhận Thanh niên khỏe', url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&auto=format&fit=crop&q=80', type: 'image' }],
        TC4: [{ id: `ev-${i}-4`, title: 'Giấy chứng nhận Hoạt động Tình nguyện', url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&auto=format&fit=crop&q=80', type: 'image' }],
        TC5: hasEnglish ? [{ id: `ev-${i}-5`, title: `Chứng chỉ Ngoại ngữ (${gpa >= 3.6 ? 'IELTS' : 'VSTEP'})`, url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80', type: 'image' }] : []
      }
    });
  }

  return list;
}
