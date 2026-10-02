import { FACULTIES } from './faculties';
import { DEFAULT_AVATAR } from '../utils/avatar';

// Danh sách dữ liệu mẫu: Tập thể Sinh viên 5 tốt cấp trường (Chi đoàn / Chi hội)
export const INITIAL_COLLECTIVES = [
  {
    id: 'tt-001',
    name: 'Chi hội Sinh viên K21 - CNTT 1',
    shortName: 'K21 CNTT 1',
    className: 'K21 - CNTT 1',
    facultyId: 'ktcn',
    facultyName: 'Khoa Kỹ thuật - Công nghệ',
    representative: 'Lê Tuấn Thành (Bí thư Chi đoàn)',
    memberCount: 42,
    year: 'Khóa 21 (Năm thứ 3)',
    submittedDate: '2025-10-14 09:30',
    overallStatus: 'pending',
    criteriaStatus: {
      TT1: { 
        status: 'approved', 
        note: '100% sinh viên chấp hành nghiêm pháp luật và quy chế; không có sinh viên vi phạm kỷ luật.', 
        verifiedBy: 'ThS. Nguyễn Văn Thắng', 
        date: '2025-10-16' 
      },
      TT2: { 
        status: 'approved', 
        note: '100% sinh viên đăng ký phong trào SV5T; 31% (13/42) sinh viên đạt chuẩn SV5T cấp trường.', 
        verifiedBy: 'ThS. Nguyễn Văn Thắng', 
        date: '2025-10-16' 
      },
      TT3: { 
        status: 'pending', 
        note: 'Điểm TB chung lớp đạt 3.15 (Khá); có 03 nhóm NCKH cấp Trường. Đang chờ xác nhận tổng kết.', 
        verifiedBy: null, 
        date: null 
      }
    },
    evidences: {
      TT1: [
        { 
          id: 'ev-tt1-1', 
          title: 'Văn bản xác nhận thi đua rèn luyện của BCN Khoa KT-CN', 
          url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80', 
          type: 'image', 
          note: 'Xác nhận không có sinh viên vi phạm kỷ luật' 
        }
      ],
      TT2: [
        { 
          id: 'ev-tt2-1', 
          title: 'Danh sách đăng ký thi đua SV5T và các quyết định công nhận', 
          url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80', 
          type: 'image', 
          note: 'Tỷ lệ đăng ký 100%, 13 sinh viên đạt SV5T' 
        }
      ],
      TT3: [
        { 
          id: 'ev-tt3-1', 
          title: 'Báo cáo tổng kết kết quả học tập & NCKH năm học của lớp', 
          url: 'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?w=600&auto=format&fit=crop&q=80', 
          type: 'image', 
          note: 'Có xác nhận của Cố vấn học tập và Trưởng khoa' 
        }
      ]
    },
    explanations: {
      'TT1.1': 'Chi đoàn duy trì nề nếp sinh hoạt đều đặn 1 tháng/lần, 100% hội viên chấp hành tốt kỷ luật.',
      'TT2.1': 'Chi hội tổ chức tọa đàm chia sẻ phương pháp học tập và chinh phục danh hiệu SV5T.',
      'TT3.1': 'Lớp thành lập 03 câu lạc bộ học tập và nhóm nghiên cứu tham gia giải NCKH cấp Trường.'
    }
  },
  {
    id: 'tt-002',
    name: 'Chi hội Sinh viên K21 - GD Tiểu học A',
    shortName: 'K21 GDTH A',
    className: 'K21 - GD Tiểu học A',
    facultyId: 'gdthmn',
    facultyName: 'Khoa Giáo dục Tiểu học & Mầm non',
    representative: 'Nguyễn Thị Thu Hà (Phó Bí thư LCĐ)',
    memberCount: 48,
    year: 'Khóa 21 (Năm thứ 3)',
    submittedDate: '2025-10-15 14:15',
    overallStatus: 'approved',
    criteriaStatus: {
      TT1: { 
        status: 'approved', 
        note: 'Tập thể gương mẫu, 100% sinh viên xếp loại rèn luyện Tốt - Xuất sắc.', 
        verifiedBy: 'ThS. Nguyễn Văn Thắng', 
        date: '2025-10-17' 
      },
      TT2: { 
        status: 'approved', 
        note: '100% sinh viên đăng ký; có 18/48 sinh viên (37.5%) đạt danh hiệu SV5T cấp trường.', 
        verifiedBy: 'ThS. Nguyễn Văn Thắng', 
        date: '2025-10-17' 
      },
      TT3: { 
        status: 'approved', 
        note: 'Điểm TB chung lớp đạt 3.42 (Giỏi); 02 giải Nhất và Nhì NCKH cấp trường năm học 2024-2025.', 
        verifiedBy: 'ThS. Nguyễn Văn Thắng', 
        date: '2025-10-17' 
      }
    },
    evidences: {
      TT1: [
        { 
          id: 'ev-tt2-1', 
          title: 'Giấy chứng nhận tập thể thi đua xuất sắc năm học', 
          url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80', 
          type: 'image', 
          note: 'Xác nhận của BCN Khoa GDTH&MN' 
        }
      ],
      TT2: [
        { 
          id: 'ev-tt2-2', 
          title: 'Bảng tổng hợp SV5T của Chi hội K21 GD Tiểu học A', 
          url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80', 
          type: 'image', 
          note: '37.5% sinh viên đạt danh hiệu' 
        }
      ],
      TT3: [
        { 
          id: 'ev-tt2-3', 
          title: 'Bảng điểm tổng hợp học tập toàn khóa và giải thưởng NCKH', 
          url: 'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?w=600&auto=format&fit=crop&q=80', 
          type: 'image', 
          note: 'Điểm TB chung 3.42' 
        }
      ]
    },
    explanations: {
      'TT1.1': 'Chi hội tổ chức thường xuyên các hoạt động rèn luyện nghiệp vụ sư phạm và đạo đức nhà giáo tương lai.',
      'TT2.1': 'Tập thể dẫn đầu toàn trường về số lượng sinh viên đạt danh hiệu Sinh viên 5 tốt.',
      'TT3.1': 'Đạt nhiều giải cao trong Hội nghị Nghiên cứu khoa học sinh viên cấp Trường.'
    }
  },
  {
    id: 'tt-003',
    name: 'Chi đoàn Sinh viên K21 - Sư phạm Toán',
    shortName: 'K21 SP Toán',
    className: 'K21 - SP Toán',
    facultyId: 'khtn',
    facultyName: 'Khoa Khoa học Tự nhiên',
    representative: 'Hoàng Thị Mai (Bí thư Chi đoàn)',
    memberCount: 35,
    year: 'Khóa 21 (Năm thứ 3)',
    submittedDate: '2025-10-16 11:20',
    overallStatus: 'pending',
    criteriaStatus: {
      TT1: { 
        status: 'approved', 
        note: '100% chấp hành tốt nội quy KTX và trường học.', 
        verifiedBy: 'ThS. Nguyễn Văn Thắng', 
        date: '2025-10-18' 
      },
      TT2: { 
        status: 'pending', 
        note: 'Đang rà soát tỷ lệ SV5T đạt chuẩn (hiện có 9/35 đạt SV5T).', 
        verifiedBy: null, 
        date: null 
      },
      TT3: { 
        status: 'approved', 
        note: 'Điểm TB chung 3.38; có 02 bài báo đăng kỷ yếu hội thảo toán học ứng dụng.', 
        verifiedBy: 'ThS. Nguyễn Văn Thắng', 
        date: '2025-10-18' 
      }
    },
    evidences: {
      TT1: [{ id: 'ev-tt3-1', title: 'Biên bản họp đánh giá thi đua Chi đoàn', url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80', type: 'image' }],
      TT2: [{ id: 'ev-tt3-2', title: 'Hồ sơ minh chứng SV5T cấp trường của các đoàn viên', url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80', type: 'image' }],
      TT3: [{ id: 'ev-tt3-3', title: 'Báo cáo điểm rèn luyện & học tập năm học 2024-2025', url: 'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?w=600&auto=format&fit=crop&q=80', type: 'image' }]
    }
  },
  {
    id: 'tt-004',
    name: 'Chi đoàn Sinh viên K22 - Quản trị Kinh doanh 1',
    shortName: 'K22 QTKD 1',
    className: 'K22 - QTKD 1',
    facultyId: 'ktqtkd',
    facultyName: 'Khoa Kinh tế - QTKD',
    representative: 'Trần Hoàng Long (Ủy viên BCH Đoàn trường)',
    memberCount: 52,
    year: 'Khóa 22 (Năm thứ 2)',
    submittedDate: '2025-10-17 15:00',
    overallStatus: 'pending',
    criteriaStatus: {
      TT1: { status: 'approved', note: 'Kỷ luật tốt, tích cực trong phong trào tình nguyện.', verifiedBy: 'ThS. Nguyễn Văn Thắng', date: '2025-10-18' },
      TT2: { status: 'pending', note: 'Chờ thẩm định tỷ lệ nộp minh chứng.', verifiedBy: null, date: null },
      TT3: { status: 'pending', note: 'Chờ xét duyệt điểm học kỳ 2.', verifiedBy: null, date: null }
    },
    evidences: {
      TT1: [{ id: 'ev-tt4-1', title: 'Xác nhận thi đua của Liên chi đoàn Khoa Kinh tế - QTKD', url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80', type: 'image' }]
    }
  },
  {
    id: 'tt-005',
    name: 'Chi hội Sinh viên K22 - Ngôn ngữ Anh 2',
    shortName: 'K22 NNA 2',
    className: 'K22 - Ngôn ngữ Anh 2',
    facultyId: 'ta',
    facultyName: 'Khoa Tiếng Anh',
    representative: 'Đỗ Quỳnh Nga (Chi hội trưởng)',
    memberCount: 38,
    year: 'Khóa 22 (Năm thứ 2)',
    submittedDate: '2025-10-17 16:30',
    overallStatus: 'pending',
    criteriaStatus: {
      TT1: { status: 'approved', note: '100% đoàn viên tham gia đầy đủ các đợt sinh hoạt chính trị.', verifiedBy: 'ThS. Nguyễn Văn Thắng', date: '2025-10-18' },
      TT2: { status: 'approved', note: '29% sinh viên đạt chuẩn SV5T (11/38).', verifiedBy: 'ThS. Nguyễn Văn Thắng', date: '2025-10-18' },
      TT3: { status: 'pending', note: 'Chờ hoàn thiện biên bản tổng kết NCKH.', verifiedBy: null, date: null }
    },
    evidences: {
      TT1: [{ id: 'ev-tt5-1', title: 'Xác nhận của Khoa Tiếng Anh về hạnh kiểm và đạo đức', url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80', type: 'image' }],
      TT2: [{ id: 'ev-tt5-2', title: 'Quyết định công nhận SV5T cấp trường đợt 1', url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80', type: 'image' }]
    }
  },
  {
    id: 'tt-006',
    name: 'Chi đoàn Sinh viên K21 - Nông nghiệp Công nghệ cao',
    shortName: 'K21 NNCNC',
    className: 'K21 - Nông nghiệp CNC',
    facultyId: 'nln',
    facultyName: 'Khoa Nông - Lâm - Ngư',
    representative: 'Phạm Minh Đức (Bí thư Chi đoàn)',
    memberCount: 30,
    year: 'Khóa 21 (Năm thứ 3)',
    submittedDate: '2025-10-18 08:45',
    overallStatus: 'pending',
    criteriaStatus: {
      TT1: { status: 'approved', note: '100% sinh viên tham gia đầy đủ các chiến dịch mùa hè xanh và nội quy.', verifiedBy: 'ThS. Nguyễn Văn Thắng', date: '2025-10-19' },
      TT2: { status: 'pending', note: 'Cần bổ sung danh sách nộp minh chứng SV5T.', verifiedBy: null, date: null },
      TT3: { status: 'approved', note: 'Tập thể có 02 mô hình vườn ươm khởi nghiệp nông nghiệp công nghệ cao.', verifiedBy: 'ThS. Nguyễn Văn Thắng', date: '2025-10-19' }
    },
    evidences: {
      TT1: [{ id: 'ev-tt6-1', title: 'Giấy khen của Đoàn trường về thành tích tình nguyện', url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80', type: 'image' }],
      TT3: [{ id: 'ev-tt6-2', title: 'Báo cáo mô hình khởi nghiệp đổi mới sáng tạo nông nghiệp', url: 'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?w=600&auto=format&fit=crop&q=80', type: 'image' }]
    }
  },
  {
    id: 'tt-007',
    name: 'Chi hội Sinh viên K22 - Giáo dục Thể chất',
    shortName: 'K22 GDTC',
    className: 'K22 - GD Thể chất',
    facultyId: 'nttdtt',
    facultyName: 'Khoa Nghệ thuật & Thể dục Thể thao',
    representative: 'Nguyễn Văn Cường (Chi hội phó)',
    memberCount: 40,
    year: 'Khóa 22 (Năm thứ 2)',
    submittedDate: '2025-10-18 10:20',
    overallStatus: 'pending',
    criteriaStatus: {
      TT1: { status: 'approved', note: 'Đạo đức tốt, nòng cốt các đội tuyển thể thao trường.', verifiedBy: 'ThS. Nguyễn Văn Thắng', date: '2025-10-19' },
      TT2: { status: 'pending', note: 'Chờ xét duyệt số lượng SV5T.', verifiedBy: null, date: null },
      TT3: { status: 'pending', note: 'Chờ xác nhận điểm rèn luyện và NCKH.', verifiedBy: null, date: null }
    },
    evidences: {
      TT1: [{ id: 'ev-tt7-1', title: 'Xác nhận của Khoa Nghệ thuật & TDTT', url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80', type: 'image' }]
    }
  }
];

// Danh sách dữ liệu mẫu: Hồ sơ Giải thưởng Sao Tháng Giêng cấp trường (Cán bộ Đoàn - Hội xuất sắc)
export const INITIAL_STAR_JAN = [
  {
    id: 'stg-001',
    studentId: 'hvu-001',
    name: 'Lê Tuấn Thành',
    studentCode: '22D480201001',
    email: 'letuanthanh2606@gmail.com',
    gender: 'Nam',
    dob: '13/11/2004',
    ethnicity: 'Kinh',
    year: 'Năm thứ 3',
    className: 'K21 - CNTT 1',
    facultyId: 'ktcn',
    facultyName: 'Khoa Kỹ thuật - Công nghệ',
    position: 'Bí thư Chi đoàn K21 CNTT',
    unionStatus: 'Đảng viên dự bị',
    phone: '0983456832',
    avatar: DEFAULT_AVATAR,
    gpa: 3.68,
    drl: 94,
    submittedDate: '2025-10-15 09:00',
    overallStatus: 'pending',
    criteriaStatus: {
      STG1: {
        status: 'approved',
        note: 'Bí thư Chi đoàn K21 CNTT hơn 02 năm công tác; hoàn thành xuất sắc nhiệm vụ.',
        verifiedBy: 'ThS. Nguyễn Văn Thắng',
        date: '2025-10-16'
      },
      STG2: {
        status: 'approved',
        note: 'GPA 3.68 (Xuất sắc), ĐRL 94 (Xuất sắc), xếp loại Cán bộ Đoàn xuất sắc năm 2024-2025.',
        verifiedBy: 'ThS. Nguyễn Văn Thắng',
        date: '2025-10-16'
      },
      STG3: {
        status: 'pending',
        note: 'Đã nộp Giấy khen của Hội Sinh viên trường; chờ đối chiếu quyết định gốc.',
        verifiedBy: null,
        date: null
      }
    },
    evidences: {
      STG1: [
        {
          id: 'ev-stg1-1',
          title: 'Quyết định công nhận Ban chấp hành Chi đoàn K21 CNTT',
          url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
          type: 'image',
          note: 'Nhiệm kỳ 2023-2024 và 2024-2025'
        }
      ],
      STG2: [
        {
          id: 'ev-stg1-2',
          title: 'Bảng điểm tổng hợp học tập GPA 3.68 và ĐRL 94 điểm',
          url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
          type: 'image',
          note: 'Xếp loại cán bộ Đoàn - Hội hoàn thành xuất sắc nhiệm vụ'
        }
      ],
      STG3: [
        {
          id: 'ev-stg1-3',
          title: 'Giấy khen của Hội Sinh viên trường Đại học Hùng Vương năm học 2024-2025',
          url: 'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?w=600&auto=format&fit=crop&q=80',
          type: 'image',
          note: 'Đạt thành tích xuất sắc trong công tác Hội và phong trào sinh viên'
        }
      ]
    },
    explanations: {
      'STG1.1': 'Bản thân luôn gương mẫu đi đầu trong mọi phong trào, lãnh đạo Chi đoàn đạt danh hiệu vững mạnh xuất sắc 2 năm liền.',
      'STG2.1': 'Duy trì kết quả học tập loại Giỏi/Xuất sắc và tham gia NCKH đạt giải Nhì cấp trường.',
      'STG3.1': 'Được Hội Sinh viên trường tặng Giấy khen năm 2024 và Đoàn trường khen thưởng cán bộ tiêu biểu.'
    }
  },
  {
    id: 'stg-002',
    studentId: 'hvu-002',
    name: 'Nguyễn Thị Thu Hà',
    studentCode: '22D480201002',
    email: 'thuha.nguyen@hvu.edu.vn',
    gender: 'Nữ',
    dob: '05/04/2004',
    ethnicity: 'Kinh',
    year: 'Năm thứ 3',
    className: 'K21 - GD Tiểu học A',
    facultyId: 'gdthmn',
    facultyName: 'Khoa Giáo dục Tiểu học & Mầm non',
    position: 'Phó Bí thư Liên chi đoàn Khoa GDTH & MN',
    unionStatus: 'Đoàn viên ưu tú',
    phone: '0978123456',
    avatar: DEFAULT_AVATAR,
    gpa: 3.75,
    drl: 96,
    submittedDate: '2025-10-15 15:30',
    overallStatus: 'approved',
    criteriaStatus: {
      STG1: {
        status: 'approved',
        note: 'Phó Bí thư LCĐ Khoa GDTH&MN 2 năm liên tiếp, tổ chức thành công nhiều chương trình lớn.',
        verifiedBy: 'ThS. Nguyễn Văn Thắng',
        date: '2025-10-17'
      },
      STG2: {
        status: 'approved',
        note: 'GPA 3.75 (Xuất sắc), ĐRL 96 (Xuất sắc), tiếng Anh VSTEP B2, 02 giải NCKH cấp trường.',
        verifiedBy: 'ThS. Nguyễn Văn Thắng',
        date: '2025-10-17'
      },
      STG3: {
        status: 'approved',
        note: 'Bằng khen của Tỉnh đoàn Phú Thọ về thành tích xuất sắc công tác Đoàn - Hội năm 2025.',
        verifiedBy: 'ThS. Nguyễn Văn Thắng',
        date: '2025-10-17'
      }
    },
    evidences: {
      STG1: [{ id: 'ev-stg2-1', title: 'Quyết định chuẩn y BCH Liên chi đoàn Khoa GDTH&MN', url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80', type: 'image' }],
      STG2: [{ id: 'ev-stg2-2', title: 'Bảng điểm GPA 3.75 và ĐRL 96', url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80', type: 'image' }],
      STG3: [{ id: 'ev-stg2-3', title: 'Bằng khen của Ban Chấp hành Tỉnh đoàn Phú Thọ', url: 'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?w=600&auto=format&fit=crop&q=80', type: 'image' }]
    },
    explanations: {
      'STG1.1': 'Trực tiếp chỉ đạo các phong trào tình nguyện sư phạm tại các địa bàn khó khăn.',
      'STG2.1': 'Nỗ lực học tập để trở thành giáo viên mẫu mực, đạt học bổng khuyến khích học tập kỳ 1 & 2.',
      'STG3.1': 'Vinh dự nhận Bằng khen Tỉnh đoàn và Giấy khen của Hiệu trưởng Trường Đại học Hùng Vương.'
    }
  },
  {
    id: 'stg-003',
    studentId: 'hvu-003',
    name: 'Trần Hoàng Long',
    studentCode: '22D480201003',
    email: 'hoanglong.tran@hvu.edu.vn',
    gender: 'Nam',
    dob: '20/09/2004',
    ethnicity: 'Kinh',
    year: 'Năm thứ 3',
    className: 'K21 - QTKD 1',
    facultyId: 'ktqtkd',
    facultyName: 'Khoa Kinh tế - QTKD',
    position: 'Ủy viên Ban Chấp hành Đoàn trường',
    unionStatus: 'Đảng viên',
    phone: '0912345678',
    avatar: DEFAULT_AVATAR,
    gpa: 3.42,
    drl: 92,
    submittedDate: '2025-10-16 10:15',
    overallStatus: 'pending',
    criteriaStatus: {
      STG1: {
        status: 'approved',
        note: 'Ủy viên BCH Đoàn trường khóa VIII; Trưởng ban tổ chức Cuộc thi Ý tưởng Khởi nghiệp HVU.',
        verifiedBy: 'ThS. Nguyễn Văn Thắng',
        date: '2025-10-18'
      },
      STG2: {
        status: 'approved',
        note: 'GPA 3.42 (Giỏi), ĐRL 92 (Xuất sắc), cán bộ Đoàn xuất sắc.',
        verifiedBy: 'ThS. Nguyễn Văn Thắng',
        date: '2025-10-18'
      },
      STG3: {
        status: 'pending',
        note: 'Chờ bổ sung giấy khen Hội Sinh viên tỉnh.',
        verifiedBy: null,
        date: null
      }
    },
    evidences: {
      STG1: [{ id: 'ev-stg3-1', title: 'Quyết định công nhận Ủy viên BCH Đoàn trường Đại học Hùng Vương', url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80', type: 'image' }],
      STG2: [{ id: 'ev-stg3-2', title: 'Bảng điểm GPA 3.42 và phiếu đánh giá ĐRL', url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80', type: 'image' }],
      STG3: [{ id: 'ev-stg3-3', title: 'Giấy khen của Hiệu trưởng Nhà trường về công tác hỗ trợ tuyển sinh', url: 'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?w=600&auto=format&fit=crop&q=80', type: 'image' }]
    }
  },
  {
    id: 'stg-004',
    studentId: 'hvu-004',
    name: 'Phạm Minh Đức',
    studentCode: '22D480201004',
    email: 'minhduc.pham@hvu.edu.vn',
    gender: 'Nam',
    dob: '18/02/2004',
    ethnicity: 'Mường',
    year: 'Năm thứ 3',
    className: 'K21 - Nông nghiệp CNC',
    facultyId: 'nln',
    facultyName: 'Khoa Nông - Lâm - Ngư',
    position: 'Bí thư Chi đoàn K21 Nông nghiệp',
    unionStatus: 'Đoàn viên ưu tú',
    phone: '0967890123',
    avatar: DEFAULT_AVATAR,
    gpa: 3.35,
    drl: 88,
    submittedDate: '2025-10-17 14:00',
    overallStatus: 'pending',
    criteriaStatus: {
      STG1: { status: 'approved', note: 'Bí thư Chi đoàn năng nổ, nhiệt huyết.', verifiedBy: 'ThS. Nguyễn Văn Thắng', date: '2025-10-18' },
      STG2: { status: 'approved', note: 'GPA 3.35, ĐRL 88, xếp loại tốt.', verifiedBy: 'ThS. Nguyễn Văn Thắng', date: '2025-10-18' },
      STG3: { status: 'pending', note: 'Chờ thẩm định khen thưởng cấp Đoàn trường.', verifiedBy: null, date: null }
    },
    evidences: {
      STG1: [{ id: 'ev-stg4-1', title: 'Quyết định Bí thư Chi đoàn', url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80', type: 'image' }]
    }
  },
  {
    id: 'stg-005',
    studentId: 'hvu-005',
    name: 'Hoàng Thị Mai',
    studentCode: '22D480201005',
    email: 'thimai.hoang@hvu.edu.vn',
    gender: 'Nữ',
    dob: '12/12/2004',
    ethnicity: 'Kinh',
    year: 'Năm thứ 3',
    className: 'K21 - SP Toán',
    facultyId: 'khtn',
    facultyName: 'Khoa Khoa học Tự nhiên',
    position: 'Chi hội trưởng Chi hội K21 SP Toán',
    unionStatus: 'Đảng viên dự bị',
    phone: '0934567890',
    avatar: DEFAULT_AVATAR,
    gpa: 3.58,
    drl: 91,
    submittedDate: '2025-10-18 09:30',
    overallStatus: 'pending',
    criteriaStatus: {
      STG1: { status: 'approved', note: 'Chi hội trưởng xuất sắc, cán bộ Hội tiêu biểu.', verifiedBy: 'ThS. Nguyễn Văn Thắng', date: '2025-10-19' },
      STG2: { status: 'approved', note: 'GPA 3.58, ĐRL 91, đạt chuẩn xuất sắc.', verifiedBy: 'ThS. Nguyễn Văn Thắng', date: '2025-10-19' },
      STG3: { status: 'pending', note: 'Chờ xét duyệt khen thưởng năm 2025.', verifiedBy: null, date: null }
    },
    evidences: {
      STG1: [{ id: 'ev-stg5-1', title: 'Quyết định công nhận Chi hội trưởng', url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80', type: 'image' }]
    }
  }
];
