import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  CheckSquare, 
  Square, 
  Clock, 
  X, 
  Eye, 
  Award, 
  RefreshCw, 
  FileSpreadsheet, 
  Check 
} from 'lucide-react';
import { FACULTIES } from '../data/faculties';
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
  const [facultyFilter, setFacultyFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

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
        const matchClass = s.className?.toLowerCase().includes(q);
        if (!matchName && !matchCode && !matchClass) return false;
      }

      // Faculty filter
      if (facultyFilter !== 'all' && s.facultyId !== facultyFilter) {
        return false;
      }

      // Status filter
      if (statusFilter === 'full_approved') {
        const approvedCount = Object.values(s.criteriaStatus).filter(c => c.status === 'approved').length;
        if (approvedCount < 5) return false;
      } else if (statusFilter === 'pending') {
        const hasPending = Object.values(s.criteriaStatus).some(c => c.status === 'pending');
        if (!hasPending) return false;
      } else if (statusFilter === 'good_gpa') {
        if (s.gpa < 3.20) return false;
      } else if (statusFilter === 'good_drl') {
        if (s.drl < 80) return false;
      }

      return true;
    });
  }, [students, searchQuery, facultyFilter, statusFilter]);

  // Handle Select All
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
            note: note || 'Hội đồng thẩm định phê duyệt',
            verifiedBy: 'Hội đồng trường HVU',
            date: new Date().toISOString().split('T')[0]
          };
        });
      } else {
        newCriteria[standardCode] = {
          status,
          note: note || 'Hội đồng thẩm định phê duyệt',
          verifiedBy: 'Hội đồng trường HVU',
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
  const fullPassCount = students.filter(s => {
    return Object.values(s.criteriaStatus).filter(c => c.status === 'approved').length === 5;
  }).length;
  const pendingCount = students.filter(s => {
    return Object.values(s.criteriaStatus).some(c => c.status === 'pending');
  }).length;

  // Export to CSV
  const handleExportCsv = () => {
    const headers = ['Mã SV', 'Họ và tên', 'Khoa', 'Lớp', 'GPA', 'ĐRL', 'TC1', 'TC2', 'TC3', 'TC4', 'TC5', 'Kết quả'];
    const rows = filteredStudents.map(s => [
      s.studentCode,
      s.name,
      s.facultyName,
      s.className,
      s.gpa,
      s.drl,
      s.criteriaStatus.TC1?.status === 'approved' ? 'Đạt' : 'Chưa',
      s.criteriaStatus.TC2?.status === 'approved' ? 'Đạt' : 'Chưa',
      s.criteriaStatus.TC3?.status === 'approved' ? 'Đạt' : 'Chưa',
      s.criteriaStatus.TC4?.status === 'approved' ? 'Đạt' : 'Chưa',
      s.criteriaStatus.TC5?.status === 'approved' ? 'Đạt' : 'Chưa',
      Object.values(s.criteriaStatus).filter(c => c.status === 'approved').length === 5 ? 'ĐẠT SV5T' : 'Đang xét'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Danh_sach_tham_dinh_SV5T_HVU_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="teacher-dashboard-wrap" style={{ maxWidth: '1240px', margin: '0 auto' }}>
      
      {/* 1. Header (Item 8: Minimal, clean, no clutter) */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '20px'
      }}>
        <div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: '800', color: 'var(--text-main)' }}>
            Thẩm định hồ sơ
          </h2>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Hội đồng xét chọn danh hiệu Sinh viên 5 tốt • Trường Đại học Hùng Vương
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button className="btn btn-outline btn-sm" onClick={handleExportCsv} title="Xuất danh sách ra tệp Excel">
            <FileSpreadsheet size={15} color="var(--primary)" />
            <span>Xuất Excel</span>
          </button>
          <button className="btn btn-subtle btn-sm" onClick={onResetData} title="Khôi phục lại dữ liệu mẫu">
            <RefreshCw size={14} />
            <span>Đặt lại dữ liệu</span>
          </button>
        </div>
      </div>

      {/* 2. Sleek Minimal Metrics Strip (Item 8: Replacing cluttered heavy cards) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '14px',
        marginBottom: '20px'
      }}>
        <div className="card" style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--primary-light)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Users size={20} />
          </div>
          <div>
            <div style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-main)', lineHeight: '1.2' }}>
              {totalStudents}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Tổng hồ sơ tiếp nhận</div>
          </div>
        </div>

        <div className="card" style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(245, 158, 11, 0.12)',
            color: '#d97706',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Clock size={20} />
          </div>
          <div>
            <div style={{ fontSize: '1.35rem', fontWeight: '800', color: '#d97706', lineHeight: '1.2' }}>
              {pendingCount}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Hồ sơ đang chờ thẩm định</div>
          </div>
        </div>

        <div className="card" style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(16, 185, 129, 0.12)',
            color: 'var(--success)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Award size={20} />
          </div>
          <div>
            <div style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--success)', lineHeight: '1.2' }}>
              {fullPassCount}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Đạt chuẩn 5/5 tiêu chí</div>
          </div>
        </div>
      </div>

      {/* 3. Streamlined Filter Toolbar (Item 8: Removed cluttered quick-pills) */}
      <div className="card" style={{ padding: '16px 20px', marginBottom: '18px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '14px',
          alignItems: 'center'
        }}>
          {/* Keyword search */}
          <div style={{ position: 'relative' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              className="input-control" 
              placeholder="Tìm theo họ tên, MSSV, lớp..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '36px', height: '40px' }}
            />
          </div>

          {/* Faculty Filter */}
          <div>
            <select 
              className="select-control"
              value={facultyFilter}
              onChange={(e) => setFacultyFilter(e.target.value)}
              style={{ height: '40px' }}
            >
              <option value="all">Toàn trường (Tất cả khoa)</option>
              {FACULTIES.map(f => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <select 
              className="select-control"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ height: '40px', flex: 1 }}
            >
              <option value="all">Tất cả tình trạng hồ sơ</option>
              <option value="pending">Hồ sơ có tiêu chí chờ thẩm định</option>
              <option value="full_approved">Đã đạt đủ 5/5 tiêu chí</option>
              <option value="good_gpa">Điểm GPA đạt loại Giỏi (≥ 3.20)</option>
              <option value="good_drl">Điểm rèn luyện Tốt/Xuất sắc (≥ 80)</option>
            </select>

            {(searchQuery || facultyFilter !== 'all' || statusFilter !== 'all') && (
              <button 
                type="button"
                className="btn btn-subtle btn-sm" 
                onClick={() => {
                  setSearchQuery('');
                  setFacultyFilter('all');
                  setStatusFilter('all');
                }}
                title="Xóa bộ lọc"
                style={{ height: '40px', padding: '0 12px' }}
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 4. Table Header & Select All Controls */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{
          padding: '12px 18px',
          background: 'var(--bg-subtle)',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <div style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
            Danh sách hiển thị: <strong style={{ color: 'var(--text-main)' }}>{filteredStudents.length}</strong> sinh viên
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button 
              type="button"
              className="btn btn-outline btn-sm"
              onClick={handleToggleSelectAll}
              style={{ fontSize: '0.8rem', padding: '6px 12px' }}
            >
              {selectedIds.length === filteredStudents.length && filteredStudents.length > 0 ? (
                <>
                  <CheckSquare size={14} color="var(--primary)" />
                  <span>Bỏ chọn tất cả</span>
                </>
              ) : (
                <>
                  <Square size={14} />
                  <span>Chọn tất cả ({filteredStudents.length})</span>
                </>
              )}
            </button>

            {selectedIds.length > 0 && (
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => setIsBatchModalOpen(true)}
                style={{ fontSize: '0.8rem', padding: '6px 14px' }}
              >
                <span>Chấm điểm hàng loạt ({selectedIds.length})</span>
              </button>
            )}
          </div>
        </div>

        {/* 5. Minimal, Clean Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.86rem',
            textAlign: 'left'
          }}>
            <thead>
              <tr style={{
                background: 'var(--bg-card)',
                borderBottom: '1px solid var(--border-color)',
                color: 'var(--text-muted)',
                fontSize: '0.78rem',
                textTransform: 'uppercase',
                letterSpacing: '0.03em'
              }}>
                <th style={{ padding: '12px 14px', width: '40px', textAlign: 'center' }}>
                  <input 
                    type="checkbox" 
                    className="custom-checkbox"
                    checked={selectedIds.length === filteredStudents.length && filteredStudents.length > 0}
                    onChange={handleToggleSelectAll}
                  />
                </th>
                <th style={{ padding: '12px 14px' }}>Sinh viên & Lớp</th>
                <th style={{ padding: '12px 14px' }}>Khoa</th>
                <th style={{ padding: '12px 14px', textAlign: 'center' }}>GPA</th>
                <th style={{ padding: '12px 14px', textAlign: 'center' }}>ĐRL</th>
                <th style={{ padding: '12px 10px', textAlign: 'center' }} title="Tiêu chuẩn 1: Đạo đức tốt">TC1</th>
                <th style={{ padding: '12px 10px', textAlign: 'center' }} title="Tiêu chuẩn 2: Học tập tốt">TC2</th>
                <th style={{ padding: '12px 10px', textAlign: 'center' }} title="Tiêu chuẩn 3: Thể lực tốt">TC3</th>
                <th style={{ padding: '12px 10px', textAlign: 'center' }} title="Tiêu chuẩn 4: Tình nguyện tốt">TC4</th>
                <th style={{ padding: '12px 10px', textAlign: 'center' }} title="Tiêu chuẩn 5: Hội nhập tốt">TC5</th>
                <th style={{ padding: '12px 14px', textAlign: 'center' }}>Tiến độ</th>
                <th style={{ padding: '12px 14px', textAlign: 'right' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={12} style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
                    <Users size={32} style={{ opacity: 0.3, marginBottom: '8px' }} />
                    <p style={{ fontWeight: '600' }}>Không tìm thấy sinh viên nào phù hợp với điều kiện tìm kiếm.</p>
                  </td>
                </tr>
              ) : (
                filteredStudents.map(student => {
                  const isSelected = selectedIds.includes(student.id);
                  const approvedCount = Object.values(student.criteriaStatus).filter(c => c.status === 'approved').length;
                  const isFullApproved = approvedCount === 5;

                  const renderTcDot = (stdCode, title) => {
                    const st = student.criteriaStatus?.[stdCode]?.status || 'pending';
                    const hasEv = student.evidences?.[stdCode]?.length > 0;
                    const isApp = st === 'approved';
                    const isRej = st === 'rejected';

                    return (
                      <span 
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          fontSize: '0.74rem',
                          fontWeight: '800',
                          cursor: hasEv ? 'pointer' : 'default',
                          background: isApp ? 'rgba(16, 185, 129, 0.15)' : (isRej ? 'rgba(239, 68, 68, 0.15)' : 'rgba(245, 158, 11, 0.15)'),
                          color: isApp ? 'var(--success)' : (isRej ? 'var(--danger)' : '#d97706'),
                          border: `1px solid ${isApp ? 'var(--success)' : (isRej ? 'var(--danger)' : '#d97706')}`
                        }}
                        title={`${title}: ${student.criteriaStatus?.[stdCode]?.note || (isApp ? 'Đạt' : 'Chờ duyệt')}`}
                        onClick={() => {
                          if (hasEv) {
                            setActiveEvidence(student.evidences[stdCode][0]);
                            setEvidenceStudent(student);
                            setEvidenceStandardName(title);
                          }
                        }}
                      >
                        {isApp ? '✓' : (isRej ? '✕' : '⋯')}
                      </span>
                    );
                  };

                  return (
                    <tr 
                      key={student.id} 
                      style={{ 
                        borderBottom: '1px solid var(--border-color)',
                        background: isSelected ? 'rgba(0, 91, 170, 0.05)' : 'transparent'
                      }}
                    >
                      {/* Checkbox */}
                      <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                        <input 
                          type="checkbox" 
                          className="custom-checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelectOne(student.id)}
                        />
                      </td>

                      {/* Student Info */}
                      <td style={{ padding: '12px 14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img 
                            src={student.avatar} 
                            alt={student.name}
                            style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                          />
                          <div>
                            <div style={{ fontWeight: '700', color: 'var(--text-main)' }}>
                              {student.name}
                            </div>
                            <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                              {student.studentCode} • {student.className}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Faculty */}
                      <td style={{ padding: '12px 14px', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                        {student.facultyName}
                      </td>

                      {/* GPA */}
                      <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                        <span style={{ 
                          fontWeight: '800', 
                          color: student.gpa >= 3.6 ? 'var(--success)' : (student.gpa >= 3.2 ? 'var(--primary)' : 'var(--text-main)') 
                        }}>
                          {student.gpa.toFixed(2)}
                        </span>
                      </td>

                      {/* DRL */}
                      <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                        <span style={{ 
                          fontWeight: '700',
                          color: student.drl >= 90 ? '#d97706' : (student.drl >= 80 ? 'var(--success)' : 'var(--text-muted)')
                        }}>
                          {student.drl}
                        </span>
                      </td>

                      {/* TC1 - TC5 */}
                      <td style={{ padding: '12px 10px', textAlign: 'center' }}>{renderTcDot('TC1', 'Tiêu chuẩn 1: Đạo đức tốt')}</td>
                      <td style={{ padding: '12px 10px', textAlign: 'center' }}>{renderTcDot('TC2', 'Tiêu chuẩn 2: Học tập tốt')}</td>
                      <td style={{ padding: '12px 10px', textAlign: 'center' }}>{renderTcDot('TC3', 'Tiêu chuẩn 3: Thể lực tốt')}</td>
                      <td style={{ padding: '12px 10px', textAlign: 'center' }}>{renderTcDot('TC4', 'Tiêu chuẩn 4: Tình nguyện tốt')}</td>
                      <td style={{ padding: '12px 10px', textAlign: 'center' }}>{renderTcDot('TC5', 'Tiêu chuẩn 5: Hội nhập tốt')}</td>

                      {/* Progress */}
                      <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                        <span style={{ 
                          fontSize: '0.82rem', 
                          fontWeight: '800', 
                          color: isFullApproved ? 'var(--success)' : 'var(--text-main)' 
                        }}>
                          {approvedCount}/5
                        </span>
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                        <button 
                          type="button"
                          className="btn btn-outline btn-sm"
                          onClick={() => onOpenStudentDetail(student)}
                          style={{ padding: '5px 12px', fontSize: '0.8rem', fontWeight: '600' }}
                        >
                          <Eye size={13} />
                          <span>Thẩm định</span>
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

      {/* Sticky Quick Batch Bar */}
      {selectedIds.length > 0 && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 900,
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{ fontSize: '0.88rem' }}>
            Đã chọn <strong style={{ color: 'var(--primary)' }}>{selectedIds.length}</strong> sinh viên
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              className="btn btn-success btn-sm"
              onClick={() => {
                handleConfirmBatchScore({
                  studentIds: selectedIds,
                  standardCode: 'ALL',
                  status: 'approved',
                  note: 'Hội đồng xét duyệt đồng loạt đạt 5 tiêu chí'
                });
              }}
            >
              <Check size={14} />
              <span>Duyệt đạt toàn bộ (5/5)</span>
            </button>

            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => {
                setBatchDefaultStandard('TC2');
                setIsBatchModalOpen(true);
              }}
            >
              <span>Tùy chọn thẩm định...</span>
            </button>

            <button
              type="button"
              className="btn btn-subtle btn-sm"
              onClick={() => setSelectedIds([])}
            >
              <span>Hủy</span>
            </button>
          </div>
        </div>
      )}

      {/* Batch Scoring Modal */}
      {isBatchModalOpen && (
        <BatchScoringModal 
          selectedStudents={selectedStudentsList}
          defaultStandard={batchDefaultStandard}
          onClose={() => setIsBatchModalOpen(false)}
          onConfirmBatchScore={handleConfirmBatchScore}
        />
      )}

      {/* Evidence Viewer Lightbox */}
      {activeEvidence && (
        <EvidenceModal 
          evidence={activeEvidence}
          student={evidenceStudent}
          standardName={evidenceStandardName}
          onClose={() => setActiveEvidence(null)}
        />
      )}
    </div>
  );
}
