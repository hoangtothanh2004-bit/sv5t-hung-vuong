export const STANDARDS = [
  {
    id: 1,
    code: 'TC1',
    name: 'Đạo đức tốt',
    category: 'Rèn luyện',
    icon: 'ShieldCheck',
    color: '#005baa',
    summary: 'Điểm rèn luyện từ 80 trở lên, chấp hành pháp luật và quy chế, đạt thêm 01 tiêu chí tư tưởng',
    mandatoryItems: [
      {
        id: '1.1',
        title: 'Điểm rèn luyện năm học',
        requirement: 'Điểm rèn luyện năm học 2026-2027 đạt từ 80 điểm trở lên (trên thang điểm 100 theo quy chế đánh giá kết quả rèn luyện sinh viên hiện hành của Bộ Giáo dục và Đào tạo, Bộ Lao động, Thương binh và Xã hội).',
        evidenceRequired: 'Bảng điểm đánh giá kết quả rèn luyện năm học có xác nhận của nhà trường.',
        type: 'points_drl'
      },
      {
        id: '1.2',
        title: 'Chấp hành pháp luật và nội quy',
        requirement: 'Không vi phạm pháp luật và các quy chế, nội quy của nhà trường, quy định của địa phương và cộng đồng.',
        evidenceRequired: 'Bản xác nhận của nhà trường / Cam kết không vi phạm kỷ luật có xác nhận.',
        type: 'confirmation'
      }
    ],
    additionalItems: [
      {
        id: '1.3.1',
        title: 'Bồi dưỡng nhận thức về Đảng / Đảng viên',
        requirement: 'Đạt chứng nhận bồi dưỡng nhận thức về Đảng hoặc là Đảng viên được xếp loại Đảng viên hoàn thành tốt nhiệm vụ trở lên trong năm học.',
        evidenceRequired: 'Giấy chứng nhận bồi dưỡng nhận thức về Đảng hoặc bản xác nhận phân loại Đảng viên hoàn thành tốt nhiệm vụ trở lên.',
        type: 'certificate'
      },
      {
        id: '1.3.2',
        title: 'Cuộc thi tìm hiểu lịch sử, văn hóa, con người Việt Nam',
        requirement: 'Tham gia và đạt ít nhất 01 giấy chứng nhận cuộc thi tìm hiểu về lịch sử, văn hóa, con người Việt Nam từ cấp khoa, liên chi hội sinh viên trở lên tổ chức.',
        evidenceRequired: 'Giấy chứng nhận tham gia / đạt giải cuộc thi.',
        type: 'certificate'
      },
      {
        id: '1.3.3',
        title: 'Hoạt động giáo dục lòng yêu nước, tự hào dân tộc',
        requirement: 'Tham gia các hoạt động giáo dục lòng yêu nước, tinh thần tự hào dân tộc: tham quan các di tích lịch sử, bảo tàng; thăm hỏi mẹ Việt Nam Anh hùng; “Lễ thắp nến tri ân các anh hùng liệt sĩ”; hội thi hát ca khúc truyền thống; hoạt động hướng về biên giới, hải đảo,…',
        evidenceRequired: 'Giấy chứng nhận hoặc văn bản xác nhận tham gia hoạt động của đơn vị tổ chức.',
        type: 'activity'
      },
      {
        id: '1.3.4',
        title: 'Cuộc thi chủ nghĩa Mác – Lênin, tư tưởng Hồ Chí Minh',
        requirement: 'Đạt giấy chứng nhận tham gia các cuộc thi tìm hiểu về chủ nghĩa Mác – Lênin, tư tưởng Hồ Chí Minh từ cấp Liên chi Hội trở lên.',
        evidenceRequired: 'Giấy chứng nhận tham gia cuộc thi từ cấp Liên chi hội trở lên.',
        type: 'certificate'
      },
      {
        id: '1.3.5',
        title: 'Thanh niên tiêu biểu, gương người tốt việc tốt, dũng cảm cứu người',
        requirement: 'Là thanh niên tiêu biểu, thanh niên tiên tiến, gương người tốt, việc tốt, có hành động dũng cảm cứu người được ghi nhận, biểu dương từ cấp trường, tỉnh, Ủy ban nhân dân cấp xã, huyện hoặc Đảng ủy, Ban Giám hiệu Nhà trường trở lên.',
        evidenceRequired: 'Quyết định biểu dương khen thưởng hoặc giấy khen, bài viết biểu dương chính thức.',
        type: 'commendation'
      }
    ]
  },
  {
    id: 2,
    code: 'TC2',
    name: 'Học tập tốt',
    category: 'Học tập & NCKH',
    icon: 'GraduationCap',
    color: '#059669',
    summary: 'Điểm trung bình năm học từ 3.0/4.0 trở lên, đạt thêm 01 tiêu chí NCKH / học thuật',
    mandatoryItems: [
      {
        id: '2.1',
        title: 'Điểm trung bình chung học tập',
        requirement: 'Điểm trung bình cộng của học kỳ 1 và học kỳ 2 trong năm học đạt từ 3.0/4.0 trở lên (Số tín chỉ trong mỗi học kỳ ít nhất 10 tín chỉ. Đối với học kỳ cuối cùng, ít nhất phải 05 tín chỉ).',
        evidenceRequired: 'Bảng điểm tổng hợp kết quả học tập có xác nhận của phòng Đào tạo / Nhà trường.',
        type: 'points_gpa'
      }
    ],
    additionalItems: [
      {
        id: '2.2.1',
        title: 'Nghiên cứu khoa học sinh viên',
        requirement: 'Là thành viên hoặc chủ nhiệm đề tài nghiên cứu khoa học sinh viên (không áp dụng đối với luận văn tốt nghiệp) đạt giải từ cấp khoa trở lên.',
        evidenceRequired: 'Quyết định công nhận / nghiệm thu hoặc giấy chứng nhận đạt giải NCKH từ cấp khoa trở lên.',
        type: 'scientific_research'
      },
      {
        id: '2.2.2',
        title: 'Bài viết đăng báo, tạp chí chuyên ngành',
        requirement: 'Có bài viết đăng trên báo hoặc tạp chí chuyên ngành.',
        evidenceRequired: 'Bản scan bài báo, trang bìa và mục lục của tạp chí chuyên ngành.',
        type: 'publication'
      },
      {
        id: '2.2.3',
        title: 'Bài tham luận kỷ yếu hội thảo khoa học',
        requirement: 'Có bài tham luận in trong kỷ yếu hội thảo khoa học chuyên ngành (được bảo trợ nội dung bởi các cơ quan chuyên môn) từ cấp khoa, cấp trường trở lên.',
        evidenceRequired: 'Bản scan bài tham luận trong kỷ yếu hội thảo kèm giấy xác nhận của ban tổ chức.',
        type: 'conference'
      },
      {
        id: '2.2.4',
        title: 'Sản phẩm sáng tạo, bằng sáng chế, giải thưởng',
        requirement: 'Có sản phẩm sáng tạo được cấp bằng sáng chế, cấp giấy phép xuất bản hoặc được các giải thưởng từ cấp trường, cấp tỉnh trở lên.',
        evidenceRequired: 'Bằng sáng chế, giấy phép xuất bản hoặc quyết định trao giải thưởng từ cấp trường, tỉnh trở lên.',
        type: 'patent'
      },
      {
        id: '2.2.5',
        title: 'Đội tuyển học thuật các cấp',
        requirement: 'Là thành viên các đội tuyển tham gia các kỳ thi học thuật cấp trường, cấp quốc gia, quốc tế.',
        evidenceRequired: 'Quyết định thành lập đội tuyển hoặc giấy chứng nhận tham gia kỳ thi học thuật.',
        type: 'team'
      },
      {
        id: '2.2.6',
        title: 'Giải thưởng cuộc thi ý tưởng khởi nghiệp',
        requirement: 'Đạt giải thưởng trong các cuộc thi ý tưởng khởi nghiệp từ cấp trường, tỉnh trở lên.',
        evidenceRequired: 'Giấy chứng nhận giải thưởng cuộc thi ý tưởng khởi nghiệp.',
        type: 'startup'
      }
    ]
  },
  {
    id: 3,
    code: 'TC3',
    name: 'Thể lực tốt',
    category: 'Thể dục thể thao',
    icon: 'Activity',
    color: '#d97706',
    summary: 'Học phần Giáo dục thể chất đạt điểm B trở lên, đạt thêm 01 tiêu chí thể thao',
    mandatoryItems: [
      {
        id: '3.1',
        title: 'Học phần Giáo dục thể chất',
        requirement: 'Trong năm học phải học ít nhất 01 học phần Giáo dục thể chất (học phần có rèn luyện thể lực) và đạt điểm B trở lên.',
        evidenceRequired: 'Bảng điểm có xác nhận của phòng Đào tạo thể hiện học phần GDTC đạt điểm B trở lên.',
        type: 'pe_grade'
      }
    ],
    additionalItems: [
      {
        id: '3.2.1',
        title: 'Danh hiệu Sinh viên khỏe',
        requirement: 'Đạt danh hiệu “Sinh viên khỏe” từ cấp trường trở lên.',
        evidenceRequired: 'Giấy chứng nhận đạt danh hiệu Sinh viên khỏe cấp trường trở lên.',
        type: 'fitness_cert'
      },
      {
        id: '3.2.2',
        title: 'Cuộc thi thể lực Trung ương / Tỉnh / Trường',
        requirement: 'Tham gia và đạt giấy chứng nhận các cuộc thi về thể lực do Trung Ương, Tỉnh, Trường tổ chức và phát động.',
        evidenceRequired: 'Giấy chứng nhận tham gia hoặc đạt giải cuộc thi thể lực.',
        type: 'competition'
      },
      {
        id: '3.2.3',
        title: 'Thành viên xuất sắc CLB Thể dục thể thao',
        requirement: 'Là thành viên có thành tích xuất sắc trong hoạt động của Câu lạc bộ Thể dục thể thao (trực thuộc Hội Sinh viên trường).',
        evidenceRequired: 'Giấy xác nhận hoặc khen thưởng của Hội Sinh viên trường / Ban chủ nhiệm CLB.',
        type: 'club'
      },
      {
        id: '3.2.4',
        title: 'Tham gia ít nhất 03 hoạt động rèn luyện thể lực',
        requirement: 'Tham gia ít nhất 03 hoạt động rèn luyện thể lực (thể dục, thể thao, văn nghệ, …) trong năm học do cấp khoa, liên chi hội trở lên tổ chức.',
        evidenceRequired: 'Giấy chứng nhận hoặc xác nhận tham gia đủ ít nhất 03 hoạt động rèn luyện thể lực.',
        type: 'activities_count'
      }
    ]
  },
  {
    id: 4,
    code: 'TC4',
    name: 'Tình nguyện tốt',
    category: 'Hoạt động cộng đồng',
    icon: 'HeartHandshake',
    color: '#dc2626',
    summary: 'Tham gia ít nhất 05 ngày tình nguyện/năm, có giấy chứng nhận hoặc xác nhận',
    mandatoryItems: [
      {
        id: '4.1',
        title: 'Tham gia ít nhất 05 ngày tình nguyện/năm',
        requirement: 'Tham gia ít nhất 05 ngày tình nguyện/năm, có giấy chứng nhận hoặc xác nhận tham gia của đơn vị tổ chức (được tính theo số ngày thực tế tham gia các hoạt động tình nguyện cộng dồn. Ví dụ: sinh viên A tham gia 3 ngày tình nguyện tại chương trình Đông Ấm, 1 lần hiến máu tình nguyện, 1 ngày tình nguyện Chủ nhật xanh, ở những thời điểm khác nhau trong năm sẽ được tính đủ tiêu chuẩn).',
        evidenceRequired: 'Giấy chứng nhận hoặc bản xác nhận tham gia các hoạt động tình nguyện, giấy chứng nhận hiến máu tình nguyện.',
        type: 'volunteer_days'
      }
    ],
    additionalItems: []
  },
  {
    id: 5,
    code: 'TC5',
    name: 'Hội nhập tốt',
    category: 'Ngoại ngữ & Hội nhập',
    icon: 'Globe',
    color: '#7c3aed',
    summary: 'Kỹ năng xã hội, tham gia hoạt động hội nhập, đạt chuẩn ngoại ngữ B1 trở lên',
    mandatoryItems: [
      {
        id: '5.1',
        title: 'Khóa kỹ năng xã hội hoặc khen thưởng Đoàn - Hội',
        requirement: 'Hoàn thành ít nhất 01 khóa trang bị kỹ năng thực hành xã hội hoặc được Hội Sinh viên, Đoàn Thanh niên từ cấp trường trở lên khen thưởng về thành tích xuất sắc trong công tác Hội và phong trào sinh viên, công tác Đoàn và phong trào thanh niên trường học trong năm học.',
        evidenceRequired: 'Giấy chứng nhận hoàn thành khóa tập huấn kỹ năng hoặc quyết định khen thưởng công tác Đoàn - Hội.',
        type: 'skills_or_award'
      },
      {
        id: '5.2',
        title: 'Hoạt động hội nhập cấp trường trở lên',
        requirement: 'Tham gia tích cực ít nhất 01 hoạt động về hội nhập do cấp trường trở lên tổ chức.',
        evidenceRequired: 'Giấy chứng nhận hoặc bản xác nhận tham gia hoạt động hội nhập cấp trường trở lên.',
        type: 'integration_activity'
      },
      {
        id: '5.3',
        title: 'Năng lực ngoại ngữ',
        requirement: 'Đạt chứng chỉ tiếng Anh trình độ B1 (theo khung tham chiếu châu Âu) hoặc tương đương B1 hoặc chứng chỉ ngoại ngữ khác ở trình độ tương đương trở lên hoặc tổng điểm các học phần ngoại ngữ (trừ môn ngoại ngữ chuyên ngành) tích lũy từ năm nhất tới thời điểm xét đạt từ tích B trở lên hoặc đạt từ 7.0/10 trở lên.',
        evidenceRequired: 'Bản sao công chứng chứng chỉ ngoại ngữ (VSTEP B1, IELTS, TOEIC...) hoặc bảng điểm tích lũy học phần ngoại ngữ.',
        type: 'language_cert'
      }
    ],
    additionalItems: [
      {
        id: '5.4.1',
        title: 'Thành viên xuất sắc CLB học thuật cấp khoa/trường',
        requirement: 'Là thành viên có thành tích xuất sắc trong hoạt động của CLB học thuật cấp khoa, hoặc thành viên có thành tích xuất sắc trong hoạt động của CLB cấp trường (trực thuộc Hội sinh viên trường).',
        evidenceRequired: 'Giấy xác nhận hoặc khen thưởng của Ban chủ nhiệm CLB / Hội Sinh viên trường.',
        type: 'club_cert'
      },
      {
        id: '5.4.2',
        title: 'Tham gia hoạt động giao lưu quốc tế',
        requirement: 'Tham gia ít nhất 01 hoạt động giao lưu quốc tế: Hội nghị, Hội thảo quốc tế, các chương trình gặp gỡ, giao lưu, hợp tác với thanh niên, sinh viên quốc tế trong và ngoài nước.',
        evidenceRequired: 'Giấy chứng nhận hoặc xác nhận tham gia chương trình giao lưu, hội thảo quốc tế.',
        type: 'international'
      },
      {
        id: '5.4.3',
        title: 'Giải Ba trở lên cuộc thi kiến thức hội nhập / ngoại ngữ',
        requirement: 'Đạt giải Ba trở lên tại các cuộc thi về kiến thức hội nhập hoặc các cuộc thi học thuật bằng ngoại ngữ từ cấp khoa trở lên.',
        evidenceRequired: 'Giấy khen hoặc giấy chứng nhận đạt giải từ cấp khoa trở lên.',
        type: 'prize'
      },
      {
        id: '5.4.4',
        title: 'Trao đổi du học sinh, hỗ trợ sinh viên quốc tế',
        requirement: 'Trao đổi du học sinh, giao lưu, hỗ trợ sinh viên nước ngoài trong các hoạt động từ cấp khoa trở lên.',
        evidenceRequired: 'Văn bản xác nhận của Khoa hoặc Nhà trường về việc hỗ trợ, giao lưu sinh viên quốc tế.',
        type: 'exchange'
      }
    ]
  }
];

// Danh mục xét chọn danh hiệu xếp theo đúng thứ tự yêu cầu
export const CATEGORIES = [
  { 
    id: 'sv5t', 
    name: 'Sinh viên 5 tốt cấp trường', 
    desc: 'Dành cho cá nhân sinh viên các hệ đào tạo tại Trường Đại học Hùng Vương' 
  },
  { 
    id: 'tt5t', 
    name: 'Tập thể Sinh viên 5 tốt cấp trường', 
    desc: 'Dành cho các Chi hội sinh viên, Chi đoàn xuất sắc tại các khoa đào tạo' 
  },
  { 
    id: 'stg', 
    name: 'Sao Tháng Giêng cấp trường', 
    desc: 'Dành cho cán bộ Đoàn - Hội tiêu biểu có thành tích xuất sắc trong học tập và công tác' 
  }
];

// Tiêu chí cho Tập thể Sinh viên 5 tốt cấp trường
export const COLLECTIVE_STANDARDS = [
  {
    id: 1,
    code: 'TT1',
    name: 'Đạo đức và tổ chức kỷ luật',
    summary: '100% hội viên, sinh viên không vi phạm pháp luật và nội quy nhà trường',
    mandatoryItems: [
      {
        id: 'TT1.1',
        title: 'Chấp hành pháp luật và quy chế',
        requirement: '100% sinh viên trong tập thể chấp hành nghiêm chỉnh pháp luật của Nhà nước, nội quy và quy chế của Trường Đại học Hùng Vương. Không có sinh viên vi phạm kỷ luật từ khiển trách trở lên.',
        evidenceRequired: 'Bản xác nhận thi đua rèn luyện của Ban Chủ nhiệm Khoa hoặc phòng CTCT&HSSV.',
        type: 'confirmation'
      }
    ],
    additionalItems: []
  },
  {
    id: 2,
    code: 'TT2',
    name: 'Phong trào Sinh viên 5 tốt',
    summary: 'Triển khai hiệu quả phong trào và đạt tỷ lệ sinh viên đạt danh hiệu',
    mandatoryItems: [
      {
        id: 'TT2.1',
        title: 'Tỷ lệ đăng ký và phấn đấu đạt Sinh viên 5 tốt',
        requirement: 'Có 100% sinh viên đăng ký tham gia phong trào "Sinh viên 5 tốt"; có ít nhất 25% sinh viên đạt danh hiệu "Sinh viên 5 tốt" cấp trường trở lên.',
        evidenceRequired: 'Danh sách sinh viên đăng ký và quyết định công nhận Sinh viên 5 tốt các cấp.',
        type: 'stats'
      }
    ],
    additionalItems: []
  },
  {
    id: 3,
    code: 'TT3',
    name: 'Học tập và nghiên cứu khoa học',
    summary: 'Tập thể có phong trào học tập tốt, không có sinh viên xếp loại yếu kém',
    mandatoryItems: [
      {
        id: 'TT3.1',
        title: 'Kết quả học tập tập thể',
        requirement: 'Điểm trung bình chung học tập của cả lớp đạt từ Khá trở lên; có sinh viên tham gia đề tài NCKH hoặc thi học thuật các cấp.',
        evidenceRequired: 'Báo cáo tổng kết học tập năm học của lớp có xác nhận của Cố vấn học tập và Khoa.',
        type: 'stats'
      }
    ],
    additionalItems: []
  }
];

// Tiêu chí cho Giải thưởng Sao Tháng Giêng cấp trường
export const STAR_JAN_STANDARDS = [
  {
    id: 1,
    code: 'STG1',
    name: 'Cán bộ Đoàn - Hội tiêu biểu',
    summary: 'Giữ chức vụ cán bộ Đoàn, Hội từ cấp chi đoàn, chi hội trở lên',
    mandatoryItems: [
      {
        id: 'STG1.1',
        title: 'Chức vụ và thời gian công tác',
        requirement: 'Là Ủy viên Ban Chấp hành Chi đoàn, Ban Chấp hành Liên chi đoàn, Chi hội trưởng, Ban Chấp hành Hội Sinh viên trường; có thời gian giữ chức vụ ít nhất 01 năm học.',
        evidenceRequired: 'Quyết định công nhận ban chấp hành hoặc giấy xác nhận của Đoàn trường / Hội Sinh viên trường.',
        type: 'position'
      }
    ],
    additionalItems: []
  },
  {
    id: 2,
    code: 'STG2',
    name: 'Thành tích học tập và rèn luyện xuất sắc',
    summary: 'GPA từ 3.2 trở lên, ĐRL từ 85 trở lên, xếp loại cán bộ xuất sắc',
    mandatoryItems: [
      {
        id: 'STG2.1',
        title: 'Học lực và rèn luyện',
        requirement: 'Điểm trung bình chung học tập năm học đạt từ 3.20/4.0 trở lên; Điểm rèn luyện đạt từ 85 điểm trở lên; Xếp loại cán bộ Đoàn - Hội hoàn thành xuất sắc nhiệm vụ.',
        evidenceRequired: 'Bảng điểm học tập, bảng điểm rèn luyện và văn bản xếp loại cán bộ Đoàn - Hội năm học.',
        type: 'points'
      }
    ],
    additionalItems: []
  },
  {
    id: 3,
    code: 'STG3',
    name: 'Khen thưởng công tác Đoàn - Hội',
    summary: 'Được Đoàn trường, Hội Sinh viên trường hoặc cấp trên khen thưởng',
    mandatoryItems: [
      {
        id: 'STG3.1',
        title: 'Khen thưởng thành tích công tác',
        requirement: 'Được Ban Thường vụ Đoàn trường, Ban Thư ký Hội Sinh viên trường hoặc Tỉnh đoàn / Hội Sinh viên cấp tỉnh khen thưởng về thành tích công tác Đoàn và phong trào thanh niên trường học.',
        evidenceRequired: 'Giấy khen, bằng khen hoặc quyết định khen thưởng chính thức.',
        type: 'award'
      }
    ],
    additionalItems: []
  }
];
