import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  CheckSquare, 
  Square, 
  CheckCircle, 
  AlertCircle, 
  X, 
  Eye, 
  Sparkles, 
  Award, 
  RefreshCw,
  GraduationCap,
  TrendingUp,
  FileSpreadsheet,
  ChevronRight,
  ShieldCheck,
  Flame,
  Clock,
  Check
} from 'lucide-react';
import { FACULTIES } from '../data/faculties';
import { STANDARDS } from '../data/criteriaData';
import BatchScoringModal from '../components/BatchScoringModal';
import EvidenceModal from '../components/EvidenceModal';

export default function TeacherReviewPage({ 
  students, 
  onUpdateStudents, 
  onOpenStudentDetail,
  onResetData 
}) {
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [gpaFilter, setGpaFilter] = useState('all');
  const [drlFilter, setDrlFilter] = useState('all');
  const [facultyFilter, setFacultyFilter] = useState('all');
  const [quickPill, setQuickPill] = useState('');

  // Selected students for batch actions
  const [selectedIds, setSelectedIds] = useState([]);
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [batchDefaultStandard, setBatchDefaultStandard] = useState('TC2');

  // Evidence preview modal
  const [activeEvidence, setActiveEvidence] = useState(null);
  const [evidenceStudent, setEvidenceStudent] = useState(null);
  const [evidenceStandardName, setEvidenceStandardName] = useState('');

  // Filter logic
  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      // Keyword search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = s.name.toLowerCase().includes(q);
        const matchCode = s.studentCode.toLowerCase().includes(q);
        const matchClass = s.className.toLowerCase().includes(q);
        if (!matchName && !matchCode && !matchClass) return false;
      }

      // Faculty
      if (facultyFilter !== 'all' && s.facultyId !== facultyFilter) {
        return false;
      }

      // GPA filter
      if (gpaFilter === 'ge_3.2') {
        if (s.gpa < 3.20) return false;
      } else if (gpaFilter === 'ge_3.6') {
        if (s.gpa < 3.60) return false;
      } else if (gpaFilter === 'good_only') {
        if (s.gpa < 3.20 || s.gpa >= 3.60) return false;
      } else if (gpaFilter === 'fair') {
        if (s.gpa < 2.50 || s.gpa >= 3.20) return false;
      }

      // DRL filter
      if (drlFilter === 'ge_90') {
        if (s.drl < 90) return false;
      } else if (drlFilter === 'ge_80') {
        if (s.drl < 80) return false;
      }

      // Quick pills or standard status
      if (quickPill === 'tc2_pending') {
        if (s.criteriaStatus.TC2.status !== 'pending') return false;
      } else if (quickPill === 'has_english') {
        if (!s.hasEnglishCert) return false;
      } else if (quickPill === 'completed_5') {
        const approvedCount = Object.values(s.criteriaStatus).filter(c => c.status === 'approved').length;
        if (approvedCount < 5) return false;
      } else if (quickPill === 'tc1_pending') {
        if (s.criteriaStatus.TC1.status !== 'pending') return false;
      }

      return true;
    });
  }, [students, searchQuery, gpaFilter, drlFilter, facultyFilter, quickPill]);

  // Handle Select All currently filtered students
  const handleToggleSelectAll = () => {
    if (selectedIds.length === filteredStudents.length && filteredStudents.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredStudents.map(s => s.id));
    }
  };

  const handleToggleSelectOne = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Selected student objects
  const selectedStudentsList = useMemo(() => {
    return students.filter(s => selectedIds.includes(s.id));
  }, [students, selectedIds]);

  // Batch scoring handler
  const handleConfirmBatchScore = ({ studentIds, standardCode, status, note }) => {
    const updated = students.map(student => {
      if (!studentIds.includes(student.id)) return student;

      const newCriteria = { ...student.criteriaStatus };

      if (standardCode === 'ALL') {
        ['TC1', 'TC2', 'TC3', 'TC4', 'TC5'].forEach(code => {
          newCriteria[code] = {
            status,
            note,
            verifiedBy: 'Hội đồng HVU',
            date: new Date().toISOString().split('T')[0]
          };
        });
      } else {
        newCriteria[standardCode] = {
          status,
          note,
          verifiedBy: 'Hội đồng HVU',
          date: new Date().toISOString().split('T')[0]
        };
      }

      const approvedCount = Object.values(newCriteria).filter(c => c.status === 'approved').length;
      const overall = approvedCount === 5 ? 'approved' : 'pending';

      return {
        ...student,
        criteriaStatus: newCriteria,
        overallStatus: overall
      };
    });

    onUpdateStudents(updated);
    setSelectedIds([]);
  };

  // Stats calculation
  const totalStudents = students.length;
  const goodGpaCount = students.filter(s => s.gpa >= 3.2).length;
  const fullPassCount = students.filter(s => {
    return Object.values(s.criteriaStatus).filter(c => c.status === 'approved').length === 5;
  }).length;
  const pendingTc2Count = students.filter(s => s.criteriaStatus.TC2.status === 'pending').length;

  // Export to CSV
  const handleExportCsv = () => {
    const headers = ['Mã SV', 'Họ và tên', 'Khoa', 'Lớp', 'GPA', 'ĐRL', 'TC1 Đạo đức', 'TC2 Học tập', 'TC3 Thể lực', 'TC4 Tình nguyện', 'TC5 Hội nhập', 'Kết quả chung'];
    const rows = filteredStudents.map(s => [
      s.studentCode,
      s.name,
      s.facultyName,
      s.className,
      s.gpa,
      s.drl,
      s.criteriaStatus.TC1.status === 'approved' ? 'Đạt' : 'Chưa',
      s.criteriaStatus.TC2.status === 'approved' ? 'Đạt' : 'Chưa',
      s.criteriaStatus.TC3.status === 'approved' ? 'Đạt' : 'Chưa',
      s.criteriaStatus.TC4.status === 'approved' ? 'Đạt' : 'Chưa',
      s.criteriaStatus.TC5.status === 'approved' ? 'Đạt' : 'Chưa',
      Object.values(s.criteriaStatus).filter(c => c.status === 'approved').length === 5 ? 'ĐẠT SV5T' : 'Chưa đủ'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Danh_sach_SV5T_HVU_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="teacher-dashboard-wrap">
      {/* Refined Executive Header Card */}
      <div className="review-header-card">
        <div className="review-header-title">
          <span className="review-badge-org">Hội đồng thẩm định cấp trường • Trường Đại học Hùng Vương</span>
          <h1>Bảng Điều Khiển Thẩm Định & Chấm Hàng Loạt</h1>
          <p>
            Tra cứu, kiểm tra minh chứng và <strong>đánh giá hàng loạt 1 lượt theo điều kiện lọc GPA, ĐRL và chứng chỉ</strong> cho toàn bộ sinh viên trong trường.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button className="btn btn-outline" onClick={handleExportCsv} title="Xuất toàn bộ kết quả lọc ra tệp Excel">
            <FileSpreadsheet size={16} color="var(--primary)" />
            <span>Xuất Excel</span>
          </button>
          <button className="btn btn-subtle btn-sm" onClick={onResetData} title="Khôi phục lại dữ liệu 65 sinh viên mẫu ban đầu để kiểm thử">
            <RefreshCw size={14} />
            <span>Đặt lại dữ liệu</span>
          </button>
        </div>
      </div>

      {/* Stats Metric Strip */}
      <div className="stats-strip">
        <div className="stat-item-card" style={{ borderLeft: '4px solid var(--primary)' }}>
          <div className="stat-icon-box" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
            <Users size={22} />
          </div>
          <div>
            <div className="stat-val">{totalStudents}</div>
            <div className="stat-lbl">Hồ sơ tiếp nhận</div>
          </div>
        </div>

        <div className="stat-item-card" style={{ borderLeft: '4px solid var(--gold)' }}>
          <div className="stat-icon-box" style={{ background: 'var(--gold-light)', color: 'var(--gold)' }}>
            <GraduationCap size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <div className="stat-val">{goodGpaCount}</div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                ({Math.round((goodGpaCount / totalStudents) * 100)}%)
              </span>
            </div>
            <div className="stat-lbl">GPA Giỏi (≥ 3.20)</div>
          </div>
        </div>

        <div className="stat-item-card" style={{ borderLeft: '4px solid var(--warning)' }}>
          <div className="stat-icon-box" style={{ background: 'var(--warning-light)', color: 'var(--warning)' }}>
            <Clock size={22} />
          </div>
          <div>
            <div className="stat-val">{pendingTc2Count}</div>
            <div className="stat-lbl">Chờ duyệt Học tập (TC2)</div>
          </div>
        </div>

        <div className="stat-item-card" style={{ borderLeft: '4px solid var(--success)' }}>
          <div className="stat-icon-box" style={{ background: 'var(--success-light)', color: 'var(--success)' }}>
            <Award size={22} />
          </div>
          <div>
            <div className="stat-val" style={{ color: 'var(--success)' }}>{fullPassCount}</div>
            <div className="stat-lbl">Đạt trọn bộ 5/5 tiêu chí</div>
          </div>
        </div>
      </div>

      {/* Upgraded Filter Dock */}
      <div className="filter-dock">
        <div className="filter-row-top">
          {/* Keyword search */}
          <div className="filter-input-field">
            <label>
              <Search size={14} /> Tìm kiếm sinh viên
            </label>
            <input 
              type="text" 
              className="filter-text-input" 
              placeholder="Nhập họ tên, mã sinh viên (MSSV), lớp..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* GPA Filter - Key User Feature */}
          <div className="filter-input-field">
            <label style={{ color: 'var(--primary)' }}>
              <GraduationCap size={14} /> Lọc theo Điểm GPA:
            </label>
            <select 
              className="select-control"
              value={gpaFilter}
              onChange={(e) => {
                setGpaFilter(e.target.value);
                setQuickPill('');
              }}
              style={{ fontWeight: gpaFilter !== 'all' ? '700' : 'normal', borderColor: gpaFilter !== 'all' ? 'var(--primary)' : 'var(--border-color)' }}
            >
              <option value="all">-- Tất cả mức điểm GPA --</option>
              <option value="ge_3.2">⭐ GPA Giỏi trở lên (≥ 3.20)</option>
              <option value="ge_3.6">🏆 GPA Xuất sắc (≥ 3.60)</option>
              <option value="good_only">GPA Giỏi (3.20 - 3.59)</option>
              <option value="fair">GPA Khá (2.50 - 3.19)</option>
            </select>
          </div>

          {/* DRL Filter */}
          <div className="filter-input-field">
            <label>
              <ShieldCheck size={14} /> Điểm rèn luyện:
            </label>
            <select 
              className="select-control"
              value={drlFilter}
              onChange={(e) => {
                setDrlFilter(e.target.value);
                setQuickPill('');
              }}
            >
              <option value="all">-- Tất cả mức ĐRL --</option>
              <option value="ge_90">Xuất sắc (≥ 90 điểm)</option>
              <option value="ge_80">Loại Tốt (≥ 80 điểm)</option>
            </select>
          </div>

          {/* Faculty Filter */}
          <div className="filter-input-field">
            <label>
              <Filter size={14} /> Khoa / Viện:
            </label>
            <select 
              className="select-control"
              value={facultyFilter}
              onChange={(e) => setFacultyFilter(e.target.value)}
            >
              <option value="all">-- Toàn trường (Tất cả Khoa) --</option>
              {FACULTIES.map(f => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Scenario Pills */}
        <div className="quick-pills-row">
          <span className="quick-pills-title">Lọc nhanh theo kịch bản:</span>

          <button 
            type="button"
            className={`scenario-pill ${gpaFilter === 'ge_3.2' ? 'active' : ''}`}
            onClick={() => {
              setGpaFilter(gpaFilter === 'ge_3.2' ? 'all' : 'ge_3.2');
              setBatchDefaultStandard('TC2');
            }}
          >
            <Flame size={14} color={gpaFilter === 'ge_3.2' ? '#ffcc00' : '#f59e0b'} />
            <span>Có {goodGpaCount} sinh viên GPA Giỏi (≥ 3.20)</span>
          </button>

          <button 
            type="button"
            className={`scenario-pill ${quickPill === 'tc2_pending' ? 'active' : ''}`}
            onClick={() => {
              setQuickPill(quickPill === 'tc2_pending' ? '' : 'tc2_pending');
              setBatchDefaultStandard('TC2');
            }}
          >
            <Clock size={14} />
            <span>Chờ duyệt tiêu chuẩn Học tập ({pendingTc2Count})</span>
          </button>

          <button 
            type="button"
            className={`scenario-pill ${drlFilter === 'ge_90' ? 'active' : ''}`}
            onClick={() => {
              setDrlFilter(drlFilter === 'ge_90' ? 'all' : 'ge_90');
              setBatchDefaultStandard('TC1');
            }}
          >
            <Award size={14} />
            <span>ĐRL Xuất sắc (≥ 90 điểm)</span>
          </button>

          <button 
            type="button"
            className={`scenario-pill ${quickPill === 'has_english' ? 'active' : ''}`}
            onClick={() => {
              setQuickPill(quickPill === 'has_english' ? '' : 'has_english');
              setBatchDefaultStandard('TC5');
            }}
          >
            <span>Có chứng chỉ Ngoại ngữ (IELTS/TOEIC/VSTEP)</span>
          </button>

          <button 
            type="button"
            className={`scenario-pill ${quickPill === 'completed_5' ? 'active' : ''}`}
            onClick={() => setQuickPill(quickPill === 'completed_5' ? '' : 'completed_5')}
          >
            <Check size={14} />
            <span>Đủ 5/5 tiêu chí ({fullPassCount})</span>
          </button>

          {(searchQuery || gpaFilter !== 'all' || drlFilter !== 'all' || facultyFilter !== 'all' || quickPill) && (
            <button 
              type="button"
              className="btn btn-subtle btn-sm" 
              onClick={() => {
                setSearchQuery('');
                setGpaFilter('all');
                setDrlFilter('all');
                setFacultyFilter('all');
                setQuickPill('');
              }}
              style={{ marginLeft: 'auto' }}
            >
              <X size={14} />
              <span>Xóa bộ lọc</span>
            </button>
          )}
        </div>
      </div>

      {/* Sticky Batch Action Bar (Appears when >= 1 students selected) */}
      {selectedIds.length > 0 && (
        <div className="batch-bar-container">
          <div className="batch-bar">
            <div className="batch-info">
              <span className="batch-badge">{selectedIds.length}</span>
              <div>
                <strong style={{ fontSize: '0.94rem' }}>
                  Đã chọn {selectedIds.length} / {filteredStudents.length} sinh viên phù hợp
                </strong>
                <p style={{ fontSize: '0.8rem', opacity: 0.9 }}>
                  Áp dụng kết quả thẩm định đồng loạt 1 lượt cho toàn bộ sinh viên đã chọn
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <button 
                type="button"
                className="btn btn-success btn-sm"
                onClick={() => {
                  handleConfirmBatchScore({
                    studentIds: selectedIds,
                    standardCode: 'TC2',
                    status: 'approved',
                    note: 'Duyệt Đạt tự động tiêu chuẩn Học tập tốt theo GPA Giỏi/Xuất sắc'
                  });
                }}
                title="Duyệt Đạt nhanh tiêu chuẩn Học tập tốt cho tất cả sinh viên được chọn"
                style={{ fontWeight: '700' }}
              >
                <CheckCircle size={16} />
                <span>Duyệt Đạt Học tập (TC2) ngay</span>
              </button>

              <button 
                type="button"
                className="btn btn-gradient btn-sm" 
                onClick={() => setIsBatchModalOpen(true)}
                style={{ fontWeight: '800', padding: '9px 20px', letterSpacing: '0.02em' }}
              >
                <Sparkles size={16} color="#ffcc00" />
                <span>CHẤM HÀNG LOẠT TÙY CHỌN ({selectedIds.length})</span>
              </button>

              <button 
                type="button"
                className="btn btn-outline btn-sm" 
                style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#fff' }}
                onClick={() => setSelectedIds([])}
              >
                Bỏ chọn
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upgraded Table Card */}
      <div className="table-card">
        <div className="table-top-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.94rem', fontWeight: '800', color: 'var(--text-main)' }}>
              Kết quả hiển thị: <strong>{filteredStudents.length} sinh viên</strong>
            </span>
            {gpaFilter === 'ge_3.2' && (
              <span className="badge badge-gpa-high">
                Đang lọc sinh viên GPA Giỏi (≥ 3.20)
              </span>
            )}
          </div>

          <button 
            type="button"
            className="btn btn-outline btn-sm"
            onClick={handleToggleSelectAll}
            style={{ fontSize: '0.82rem', fontWeight: '600' }}
          >
            {selectedIds.length === filteredStudents.length && filteredStudents.length > 0 ? (
              <>
                <CheckSquare size={16} color="var(--primary)" />
                <span>Bỏ chọn tất cả ({filteredStudents.length})</span>
              </>
            ) : (
              <>
                <Square size={16} />
                <span>Chọn tất cả {filteredStudents.length} sinh viên này</span>
              </>
            )}
          </button>
        </div>

        <div className="table-container-scroll">
          <table className="pro-table">
            <thead>
              <tr>
                <th className="col-cb">
                  <input 
                    type="checkbox" 
                    className="custom-checkbox"
                    checked={selectedIds.length === filteredStudents.length && filteredStudents.length > 0}
                    onChange={handleToggleSelectAll}
                    title="Chọn tất cả"
                  />
                </th>
                <th className="col-student">Sinh viên & Lớp</th>
                <th className="col-faculty">Khoa trực thuộc</th>
                <th className="col-gpa">GPA</th>
                <th className="col-drl">ĐRL</th>
                <th className="col-std" title="Tiêu chuẩn 1: Đạo đức tốt">TC1</th>
                <th className="col-std" title="Tiêu chuẩn 2: Học tập tốt">TC2</th>
                <th className="col-std" title="Tiêu chuẩn 3: Thể lực tốt">TC3</th>
                <th className="col-std" title="Tiêu chuẩn 4: Tình nguyện tốt">TC4</th>
                <th className="col-std" title="Tiêu chuẩn 5: Hội nhập tốt">TC5</th>
                <th className="col-progress">Tiến độ</th>
                <th className="col-action">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={12} style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--text-muted)' }}>
                    <Users size={36} style={{ opacity: 0.3, marginBottom: '8px' }} />
                    <p style={{ fontWeight: '600', fontSize: '0.94rem' }}>Không tìm thấy sinh viên nào phù hợp với bộ lọc hiện tại.</p>
                    <button 
                      type="button"
                      className="btn btn-outline btn-sm" 
                      style={{ marginTop: '12px' }}
                      onClick={() => {
                        setSearchQuery('');
                        setGpaFilter('all');
                        setDrlFilter('all');
                        setFacultyFilter('all');
                        setQuickPill('');
                      }}
                    >
                      Xóa toàn bộ điều kiện lọc
                    </button>
                  </td>
                </tr>
              ) : (
                filteredStudents.map(student => {
                  const isSelected = selectedIds.includes(student.id);
                  const approvedCount = Object.values(student.criteriaStatus).filter(c => c.status === 'approved').length;
                  const isFullApproved = approvedCount === 5;

                  return (
                    <tr key={student.id} className={isSelected ? 'selected-row' : ''}>
                      {/* Checkbox */}
                      <td className="col-cb">
                        <input 
                          type="checkbox" 
                          className="custom-checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelectOne(student.id)}
                        />
                      </td>

                      {/* Student Info */}
                      <td className="col-student">
                        <div className="student-meta-cell">
                          <img 
                            src={student.avatar} 
                            alt={student.name}
                            className="student-avatar"
                            style={{ borderColor: isFullApproved ? 'var(--success)' : 'var(--border-color)' }}
                          />
                          <div>
                            <div className="student-name-row">
                              <span className="student-name-text">{student.name}</span>
                              {isFullApproved && (
                                <Award size={14} color="#f59e0b" title="Đạt chuẩn 5/5 tiêu chí Sinh viên 5 Tốt cấp trường!" />
                              )}
                            </div>
                            <div className="student-sub-text">
                              <span>{student.studentCode}</span> • <span>{student.className}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Faculty */}
                      <td className="col-faculty" title={student.facultyName}>
                        {student.facultyName}
                      </td>

                      {/* GPA */}
                      <td className="col-gpa">
                        <span 
                          className={`badge ${student.gpa >= 3.6 ? 'badge-gpa-high' : (student.gpa >= 3.2 ? 'badge-gpa' : '')}`}
                          style={{ fontSize: '0.84rem', fontWeight: '800' }}
                        >
                          {student.gpa.toFixed(2)}
                        </span>
                        {student.gpa >= 3.6 && <div style={{ fontSize: '0.66rem', color: 'var(--success)', fontWeight: '700', marginTop: '1px' }}>Xuất sắc</div>}
                        {student.gpa >= 3.2 && student.gpa < 3.6 && <div style={{ fontSize: '0.66rem', color: 'var(--primary)', fontWeight: '700', marginTop: '1px' }}>Loại Giỏi</div>}
                      </td>

                      {/* DRL */}
                      <td className="col-drl">
                        <span style={{ 
                          fontWeight: '800', 
                          fontSize: '0.88rem',
                          color: student.drl >= 90 ? '#d97706' : (student.drl >= 80 ? '#059669' : 'var(--text-muted)') 
                        }}>
                          {student.drl}
                        </span>
                        <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                          {student.drl >= 90 ? 'Xuất sắc' : (student.drl >= 80 ? 'Tốt' : 'Khá')}
                        </div>
                      </td>

                      {/* TC1 Đạo đức */}
                      <td className="col-std">
                        <span 
                          className={`criteria-status-dot ${student.criteriaStatus.TC1.status}`}
                          title={`TC1 Đạo đức: ${student.criteriaStatus.TC1.note || student.criteriaStatus.TC1.status} (Click xem minh chứng)`}
                          onClick={() => {
                            if (student.evidences.TC1 && student.evidences.TC1.length > 0) {
                              setActiveEvidence(student.evidences.TC1[0]);
                              setEvidenceStudent(student);
                              setEvidenceStandardName('Tiêu chuẩn 1: Đạo đức tốt');
                            }
                          }}
                        >
                          {student.criteriaStatus.TC1.status === 'approved' ? '✓' : (student.criteriaStatus.TC1.status === 'pending' ? '⋯' : '✗')}
                        </span>
                      </td>

                      {/* TC2 Học tập */}
                      <td className="col-std">
                        <span 
                          className={`criteria-status-dot ${student.criteriaStatus.TC2.status}`}
                          title={`TC2 Học tập: ${student.criteriaStatus.TC2.note || student.criteriaStatus.TC2.status} (Click xem bảng điểm)`}
                          onClick={() => {
                            if (student.evidences.TC2 && student.evidences.TC2.length > 0) {
                              setActiveEvidence(student.evidences.TC2[0]);
                              setEvidenceStudent(student);
                              setEvidenceStandardName('Tiêu chuẩn 2: Học tập tốt');
                            }
                          }}
                        >
                          {student.criteriaStatus.TC2.status === 'approved' ? '✓' : (student.criteriaStatus.TC2.status === 'pending' ? '⋯' : '✗')}
                        </span>
                      </td>

                      {/* TC3 Thể lực */}
                      <td className="col-std">
                        <span 
                          className={`criteria-status-dot ${student.criteriaStatus.TC3.status}`}
                          title={`TC3 Thể lực: ${student.criteriaStatus.TC3.note || student.criteriaStatus.TC3.status} (Click xem minh chứng)`}
                          onClick={() => {
                            if (student.evidences.TC3 && student.evidences.TC3.length > 0) {
                              setActiveEvidence(student.evidences.TC3[0]);
                              setEvidenceStudent(student);
                              setEvidenceStandardName('Tiêu chuẩn 3: Thể lực tốt');
                            }
                          }}
                        >
                          {student.criteriaStatus.TC3.status === 'approved' ? '✓' : (student.criteriaStatus.TC3.status === 'pending' ? '⋯' : '✗')}
                        </span>
                      </td>

                      {/* TC4 Tình nguyện */}
                      <td className="col-std">
                        <span 
                          className={`criteria-status-dot ${student.criteriaStatus.TC4.status}`}
                          title={`TC4 Tình nguyện: ${student.criteriaStatus.TC4.note || student.criteriaStatus.TC4.status} (Click xem minh chứng)`}
                          onClick={() => {
                            if (student.evidences.TC4 && student.evidences.TC4.length > 0) {
                              setActiveEvidence(student.evidences.TC4[0]);
                              setEvidenceStudent(student);
                              setEvidenceStandardName('Tiêu chuẩn 4: Tình nguyện tốt');
                            }
                          }}
                        >
                          {student.criteriaStatus.TC4.status === 'approved' ? '✓' : (student.criteriaStatus.TC4.status === 'pending' ? '⋯' : '✗')}
                        </span>
                      </td>

                      {/* TC5 Hội nhập */}
                      <td className="col-std">
                        <span 
                          className={`criteria-status-dot ${student.criteriaStatus.TC5.status}`}
                          title={`TC5 Hội nhập: ${student.criteriaStatus.TC5.note || student.criteriaStatus.TC5.status} (Click xem chứng chỉ)`}
                          onClick={() => {
                            if (student.evidences.TC5 && student.evidences.TC5.length > 0) {
                              setActiveEvidence(student.evidences.TC5[0]);
                              setEvidenceStudent(student);
                              setEvidenceStandardName('Tiêu chuẩn 5: Hội nhập tốt');
                            }
                          }}
                        >
                          {student.criteriaStatus.TC5.status === 'approved' ? '✓' : (student.criteriaStatus.TC5.status === 'pending' ? '⋯' : '✗')}
                        </span>
                      </td>

                      {/* Overall Progress Gauge */}
                      <td className="col-progress">
                        <div className="progress-gauge-cell">
                          <span 
                            className="progress-number"
                            style={{ color: isFullApproved ? 'var(--success)' : 'var(--text-main)' }}
                          >
                            {approvedCount}/5
                          </span>
                          <div className="progress-track">
                            <div 
                              className="progress-bar-inner" 
                              style={{ 
                                width: `${(approvedCount / 5) * 100}%`,
                                background: isFullApproved ? 'var(--success)' : 'var(--primary-gradient)'
                              }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="col-action">
                        <button 
                          type="button"
                          className="btn btn-outline btn-sm"
                          onClick={() => onOpenStudentDetail(student)}
                          style={{ gap: '4px', padding: '5px 8px', fontSize: '0.78rem', fontWeight: '700' }}
                          title="Xem chi tiết toàn bộ hồ sơ & minh chứng"
                        >
                          <Eye size={13} color="var(--primary)" />
                          <span>Chi tiết</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Batch Action Modal Popup */}
      {isBatchModalOpen && (
        <BatchScoringModal 
          selectedStudents={selectedStudentsList}
          defaultStandard={batchDefaultStandard}
          onClose={() => setIsBatchModalOpen(false)}
          onConfirmBatchScore={handleConfirmBatchScore}
        />
      )}

      {/* Evidence Viewer Modal */}
      {activeEvidence && (
        <EvidenceModal 
          evidence={activeEvidence}
          student={evidenceStudent}
          standardName={evidenceStandardName}
          onClose={() => setActiveEvidence(null)}
          onVerifyEvidence={(evidenceId, status) => {
            if (!evidenceStudent) return;
            const code = evidenceStandardName.includes('Tiêu chuẩn 1') ? 'TC1' 
              : evidenceStandardName.includes('Tiêu chuẩn 2') ? 'TC2'
              : evidenceStandardName.includes('Tiêu chuẩn 3') ? 'TC3'
              : evidenceStandardName.includes('Tiêu chuẩn 4') ? 'TC4' : 'TC5';
            
            handleConfirmBatchScore({
              studentIds: [evidenceStudent.id],
              standardCode: code,
              status: 'approved',
              note: `Minh chứng ${activeEvidence.title} đã được thẩm định đạt`
            });
          }}
        />
      )}
    </div>
  );
}
