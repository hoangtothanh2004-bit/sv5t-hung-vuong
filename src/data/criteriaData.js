export const STANDARDS = [
  {
    id: 1,
    code: 'TC1',
    name: 'Đạo đức tốt',
    category: 'Rèn luyện',
    icon: 'ShieldCheck',
    color: '#0d6efd',
    summary: 'Điểm rèn luyện từ 80 trở lên, chấp hành pháp luật và quy chế',
    items: [
      {
        id: '1.1',
        title: 'Điểm rèn luyện đạt loại Tốt hoặc Xuất sắc',
        requirement: 'Điểm rèn luyện trung bình năm học 2024 - 2025 đạt từ 80 điểm trở lên (trên thang điểm 100).',
        evidenceRequired: 'Bảng điểm đánh giá kết quả rèn luyện năm học có xác nhận của phòng CTCT&HSSV hoặc Nhà trường.',
        type: 'points_drl'
      },
      {
        id: '1.2',
        title: 'Chấp hành nghiêm pháp luật và quy chế',
        requirement: 'Không vi phạm pháp luật và các quy chế, nội quy của Nhà trường, địa phương nơi cư trú; không bị kỷ luật từ khiển trách trở lên.',
        evidenceRequired: 'Bản xác nhận của Nhà trường / Khoa hoặc cam kết rèn luyện được Đoàn trường xác nhận.',
        type: 'confirmation'
      },
      {
        id: '1.3',
        title: 'Hoạt động Đoàn - Hội và Chính trị tư tưởng (Chọn ít nhất 1)',
        requirement: 'Là Đoàn viên hoàn thành xuất sắc nhiệm vụ HOẶC Đảng viên hoàn thành tốt nhiệm vụ HOẶC được khen thưởng cấp Khoa/Trường.',
        evidenceRequired: 'Giấy khen, Nghị quyết kết nạp Đảng, chứng nhận hoàn thành xuất sắc công tác Đoàn - Hội.',
        type: 'certificate'
      }
    ]
  },
  {
    id: 2,
    code: 'TC2',
    name: 'Học tập tốt',
    category: 'Học tập & NCKH',
    icon: 'GraduationCap',
    color: '#10b981',
    summary: 'GPA từ 3.20 (Giỏi) trở lên, không nợ môn, có NCKH hoặc thi học thuật',
    items: [
      {
        id: '2.1',
        title: 'Điểm trung bình chung học tập (GPA)',
        requirement: 'Điểm trung bình chung học tập năm học đạt từ 3.20/4.00 (hoặc từ 8.0/10) trở lên đối với sinh viên Đại học. Không có học phần bị nợ hoặc thi lại.',
        evidenceRequired: 'Bảng điểm trung bình chung học tập năm học 2024 - 2025 có xác nhận của phòng Đào tạo.',
        type: 'points_gpa'
      },
      {
        id: '2.2',
        title: 'Nghiên cứu khoa học & Khởi nghiệp (Chọn ít nhất 1)',
        requirement: 'Chủ trì hoặc tham gia đề tài NCKH sinh viên các cấp HOẶC có bài báo đăng kỷ yếu hội thảo/tạp chí HOẶC tham gia cuộc thi Khởi nghiệp sinh viên HVU.',
        evidenceRequired: 'Bản photo Quyết định nghiệm thu đề tài NCKH, giấy chứng nhận tham gia hội thảo, bài báo.',
        type: 'scientific_research'
      },
      {
        id: '2.3',
        title: 'Câu lạc bộ học thuật & Cuộc thi kiến thức',
        requirement: 'Thành viên tích cực tham gia CLB học thuật chuyên ngành hoặc đạt giải tại các cuộc thi chuyên môn cấp Khoa/Trường trở lên.',
        evidenceRequired: 'Giấy chứng nhận tham gia CLB hoặc giấy khen giải thưởng học thuật.',
        type: 'academic_contest'
      }
    ]
  },
  {
    id: 3,
    code: 'TC3',
    name: 'Thể lực tốt',
    category: 'Thể dục thể thao',
    icon: 'Activity',
    color: '#f59e0b',
    summary: 'Đạt danh hiệu Thanh niên khỏe hoặc điểm GDTC đạt loại B trở lên',
    items: [
      {
        id: '3.1',
        title: 'Tiêu chuẩn Thể lực sinh viên',
        requirement: 'Được công nhận đạt danh hiệu "Thanh niên khỏe" trong năm học HOẶC điểm học phần Giáo dục thể chất trong năm học đạt từ 7.0 (loại B) trở lên.',
        evidenceRequired: 'Giấy chứng nhận "Thanh niên khỏe" cấp trường hoặc bảng điểm học phần Giáo dục thể chất.',
        type: 'fitness_check'
      },
      {
        id: '3.2',
        title: 'Tham gia giải đấu thể thao (Tiêu chí cộng thêm)',
        requirement: 'Tham gia hoặc đạt giải tại Hội thao sinh viên, các giải thi đấu thể dục thể thao do Nhà trường, Đoàn - Hội hoặc cấp tỉnh tổ chức.',
        evidenceRequired: 'Giấy chứng nhận tham gia thi đấu hoặc giấy khen, huy chương thể thao.',
        type: 'sports_medal'
      }
    ]
  },
  {
    id: 4,
    code: 'TC4',
    name: 'Tình nguyện tốt',
    category: 'Hoạt động cộng đồng',
    icon: 'HeartHandshake',
    color: '#ef4444',
    summary: 'Tham gia chiến dịch Mùa hè xanh, Tiếp sức mùa thi, hoặc hiến máu tình nguyện',
    items: [
      {
        id: '4.1',
        title: 'Chiến dịch tình nguyện cao điểm',
        requirement: 'Tham gia ít nhất 01 chiến dịch tình nguyện cao điểm trong năm học (Chiến dịch tình nguyện Mùa hè xanh, Tiếp sức mùa thi, Đông ấm vùng cao...).',
        evidenceRequired: 'Giấy chứng nhận tham gia chiến dịch tình nguyện do Đoàn Thanh niên - Hội Sinh viên trường cấp.',
        type: 'volunteer_campaign'
      },
      {
        id: '4.2',
        title: 'Hiến máu tình nguyện hoặc hoạt động cộng đồng',
        requirement: 'Tham gia hiến máu tình nguyện ít nhất 01 lần trong năm học HOẶC tham gia ít nhất 03 ngày hoạt động tình nguyện bảo vệ môi trường, đền ơn đáp nghĩa.',
        evidenceRequired: 'Giấy chứng nhận hiến máu tình nguyện hoặc xác nhận tham gia Ngày thứ Bảy tình nguyện.',
        type: 'blood_donation'
      }
    ]
  },
  {
    id: 5,
    code: 'TC5',
    name: 'Hội nhập tốt',
    category: 'Ngoại ngữ & Kỹ năng',
    icon: 'Globe',
    color: '#8b5cf6',
    summary: 'Chứng chỉ ngoại ngữ VSTEP/TOEIC/IELTS hoặc hoàn thành khóa kỹ năng mềm',
    items: [
      {
        id: '5.1',
        title: 'Năng lực Ngoại ngữ',
        requirement: 'Đạt chứng chỉ Ngoại ngữ tương đương chuẩn đầu ra trở lên (TOEIC >= 450, IELTS >= 5.0, VSTEP B1) HOẶC điểm trung bình học phần Tiếng Anh cả năm đạt >= 7.5.',
        evidenceRequired: 'Bản sao chứng chỉ ngoại ngữ còn hiệu lực hoặc bảng điểm học phần Tiếng Anh.',
        type: 'language_cert'
      },
      {
        id: '5.2',
        title: 'Kỹ năng mềm & Hội nhập chuyển đổi số',
        requirement: 'Tham gia các lớp tập huấn kỹ năng mềm, diễn đàn khởi nghiệp số, hoặc tham gia các hoạt động giao lưu thanh niên, văn hóa đối ngoại.',
        evidenceRequired: 'Giấy chứng nhận tham gia khóa tập huấn kỹ năng hoặc xác nhận của Đoàn trường.',
        type: 'soft_skills'
      }
    ]
  }
];

export const CATEGORIES = [
  { id: 'sv5t', name: 'Sinh viên 5 tốt cấp trường', desc: 'Dành cho cá nhân sinh viên các hệ đào tạo tại HVU' },
  { id: 'tt5t', name: 'Tập thể Sinh viên 5 tốt', desc: 'Dành cho Chi hội, Chi đoàn xuất sắc tại các Khoa' },
  { id: 'stg', name: 'Giải thưởng Sao Tháng Giêng', desc: 'Dành cho cán bộ Đoàn - Hội tiêu biểu xuất sắc' }
];
