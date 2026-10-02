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
  Check,
  Star,
  ShieldCheck,
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { FACULTIES } from '../data/faculties';
import { CATEGORIES, STANDARDS, COLLECTIVE_STANDARDS, STAR_JAN_STANDARDS } from '../data/criteriaData';
import BatchScoringModal from '../components/BatchScoringModal';
import EvidenceModal from '../components/EvidenceModal';
import { DEFAULT_AVATAR } from '../utils/avatar';

export default function TeacherReviewPage({ 
  students = [], 
  onUpdateStudents, 
  collectives = [],
  onUpdateCollectives,
  starJanList = [],
  onUpdateStarJan,
  onOpenStudentDetail,
  onResetData 
}) {
  // Category tab state: 'sv5t' (Sinh viên 5 tốt) | 'tt5t' (Tập thể 5T) | 'stg' (Sao Tháng Giêng)
  const [selectedCategory, setSelectedCategory] = useState('sv5t');

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [facultyFilter, setFacultyFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Selected records for batch actions
  const [selectedIds, setSelectedIds] = useState([]);
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);

  // Evidence preview modal
  const [activeEvidence, setActiveEvidence] = useState(null);
  const [evidenceStudent, setEvidenceStudent] = useState(null);
  const [evidenceStandardName, setEvidenceStandardName] = useState('');

  // Active dataset depending on category
  const currentList = useMemo(() => {
    if (selectedCategory === 'tt5t') return collectives;
    if (selectedCategory === 'stg') return starJanList;
    return students;
  }, [selectedCategory, students, collectives, starJanList]);

  // Current category standards list
  const currentStandards = useMemo(() => {
    if (selectedCategory === 'tt5t') return COLLECTIVE_STANDARDS;
    if (selectedCategory === 'stg') return STAR_JAN_STANDARDS;
    return STANDARDS;
  }, [selectedCategory]);

  const totalRequiredStandards = currentStandards.length;

  // Filter logic
  const filteredList = useMemo(() => {
    return currentList.filter(item => {
      // Keyword search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = item.name?.toLowerCase().includes(q);
        const matchCode = item.studentCode?.toLowerCase().includes(q);
        const matchClass = item.className?.toLowerCase().includes(q) || item.shortName?.toLowerCase().includes(q);
        const matchRep = item.representative?.toLowerCase().includes(q);
        const matchPos = item.position?.toLowerCase().includes(q);
        if (!matchName && !matchCode && !matchClass && !matchRep && !matchPos) return false;
      }

      // Faculty filter
      if (facultyFilter !== 'all' && item.facultyId !== facultyFilter) {
        return false;
      }

      // Status filter
      const approvedCount = currentStandards.filter(s => item.criteriaStatus?.[s.code]?.status === 'approved').length;
      const isFull = approvedCount === totalRequiredStandards;
      const hasPending = currentStandards.some(s => !item.criteriaStatus?.[s.code] || item.criteriaStatus[s.code].status === 'pending');

      if (statusFilter === 'full_approved') {
        if (!isFull) return false;
      } else if (statusFilter === 'pending') {
        if (!hasPending) return false;
      } else if (statusFilter === 'good_gpa') {
        if (!item.gpa || item.gpa < 3.20) return false;
      } else if (statusFilter === 'good_drl') {
        if (!item.drl || item.drl < 80) return false;
      }

      return true;
    });
  }, [currentList, searchQuery, facultyFilter, statusFilter, currentStandards, totalRequiredStandards]);

  // Handle Select All
  const handleToggleSelectAll = () => {
    if (selectedIds.length === filteredList.length && filteredList.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredList.map(s => s.id));
    }
  };

  const handleToggleSelectOne = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Selected objects
  const selectedRecordsList = useMemo(() => {
    return currentList.filter(s => selectedIds.includes(s.id));
  }, [currentList, selectedIds]);

  // Batch scoring handler
  const handleConfirmBatchScore = ({ studentIds, standardCode, status, note }) => {
    const updated = currentList.map(item => {
      if (!studentIds.includes(item.id)) return item;

      const newCriteria = { ...(item.criteriaStatus || {}) };

      if (standardCode === 'ALL') {
        currentStandards.forEach(std => {
          newCriteria[std.code] = {
            status,
            note: note || 'Hội đồng thẩm định phê duyệt',
            verifiedBy: 'Hội sinh viên HVU',
            date: new Date().toISOString().split('T')[0]
          };
        });
      } else {
        newCriteria[standardCode] = {
          status,
          note: note || 'Hội đồng thẩm định phê duyệt',
          verifiedBy: 'Hội sinh viên HVU',
          date: new Date().toISOString().split('T')[0]
        };
      }

      const approvedCount = currentStandards.filter(std => newCriteria[std.code]?.status === 'approved').length;
      const overall = approvedCount === totalRequiredStandards ? 'approved' : 'pending';

      return {
        ...item,
        criteriaStatus: newCriteria,
        overallStatus: overall
      };
    });

    if (selectedCategory === 'tt5t' && onUpdateCollectives) {
      onUpdateCollectives(updated);
    } else if (selectedCategory === 'stg' && onUpdateStarJan) {
      onUpdateStarJan(updated);
    } else if (onUpdateStudents) {
      onUpdateStudents(updated);
    }

    setSelectedIds([]);
  };

  // Stats calculation for current category
  const totalCount = currentList.length;
  const fullPassCount = currentList.filter(item => {
    return currentStandards.filter(std => item.criteriaStatus?.[std.code]?.status === 'approved').length === totalRequiredStandards;
  }).length;
  const pendingCount = currentList.filter(item => {
    return currentStandards.some(std => !item.criteriaStatus?.[std.code] || item.criteriaStatus[std.code].status === 'pending');
  }).length;

  // Export to CSV depending on category
  const handleExportCsv = () => {
    let headers = [];
    let rows = [];
    let filename = 'danh_sach_tham_dinh_HVU.csv';

    if (selectedCategory === 'tt5t') {
      filename = 'danh_sach_tap_the_sinh_vien_5_tot_HVU.csv';
      headers = ['Tên tập thể', 'Chi đoàn/Chi hội', 'Khoa', 'Sĩ số', 'Đại diện nộp', 'TT1 (Kỷ luật)', 'TT2 (SV5T)', 'TT3 (Học tập)', 'Tiến độ', 'Kết luận'];
      rows = filteredList.map(c => {
        const tt1 = c.criteriaStatus?.TT1?.status === 'approved' ? 'Đạt' : 'Chưa';
        const tt2 = c.criteriaStatus?.TT2?.status === 'approved' ? 'Đạt' : 'Chưa';
        const tt3 = c.criteriaStatus?.TT3?.status === 'approved' ? 'Đạt' : 'Chưa';
        const passed = [tt1, tt2, tt3].filter(x => x === 'Đạt').length;
        return [
          c.name,
          c.className,
          c.facultyName,
          c.memberCount,
          c.representative,
          tt1,
          tt2,
          tt3,
          `${passed}/3`,
          passed === 3 ? 'ĐẠT TẬP THỂ SV5T' : 'Đang xét'
        ];
      });
    } else if (selectedCategory === 'stg') {
      filename = 'danh_sach_sao_thang_gieng_HVU.csv';
      headers = ['Mã SV', 'Họ và tên', 'Chức vụ Đoàn - Hội', 'Khoa', 'Lớp', 'GPA', 'ĐRL', 'STG1 (Cán bộ)', 'STG2 (Học tập)', 'STG3 (Khen thưởng)', 'Tiến độ', 'Kết luận'];
      rows = filteredList.map(s => {
        const stg1 = s.criteriaStatus?.STG1?.status === 'approved' ? 'Đạt' : 'Chưa';
        const stg2 = s.criteriaStatus?.STG2?.status === 'approved' ? 'Đạt' : 'Chưa';
        const stg3 = s.criteriaStatus?.STG3?.status === 'approved' ? 'Đạt' : 'Chưa';
        const passed = [stg1, stg2, stg3].filter(x => x === 'Đạt').length;
        return [
          s.studentCode,
          s.name,
          s.position || 'Cán bộ Đoàn - Hội',
          s.facultyName,
          s.className,
          s.gpa,
          s.drl,
          stg1,
          stg2,
          stg3,
          `${passed}/3`,
          passed === 3 ? 'ĐẠT SAO THÁNG GIÊNG' : 'Đang xét'
        ];
      });
    } else {
      filename = 'danh_sach_sinh_vien_5_tot_HVU.csv';
      headers = ['Mã SV', 'Họ và tên', 'Khoa', 'Lớp', 'GPA', 'ĐRL', 'TC1', 'TC2', 'TC3', 'TC4', 'TC5', 'Tiến độ', 'Kết luận'];
      rows = filteredList.map(s => {
        const tc1 = s.criteriaStatus?.TC1?.status === 'approved' ? 'Đạt' : 'Chưa';
        const tc2 = s.criteriaStatus?.TC2?.status === 'approved' ? 'Đạt' : 'Chưa';
        const tc3 = s.criteriaStatus?.TC3?.status === 'approved' ? 'Đạt' : 'Chưa';
        const tc4 = s.criteriaStatus?.TC4?.status === 'approved' ? 'Đạt' : 'Chưa';
        const tc5 = s.criteriaStatus?.TC5?.status === 'approved' ? 'Đạt' : 'Chưa';
        const passed = [tc1, tc2, tc3, tc4, tc5].filter(x => x === 'Đạt').length;
        return [
          s.studentCode,
          s.name,
          s.facultyName,
          s.className,
          s.gpa,
          s.drl,
          tc1,
          tc2,
          tc3,
          tc4,
          tc5,
          `${passed}/5`,
          passed === 5 ? 'ĐẠT SV5T' : 'Đang xét'
        ];
      });
    }

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="teacher-dashboard-wrap" style={{ maxWidth: '1240px', margin: '0 auto' }}>
      
      {/* 1. Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '16px'
      }}>
        <div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: '800', color: 'var(--text-main)' }}>
            Thẩm định hồ sơ
          </h2>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Hội đồng xét chọn: <strong style={{ color: 'var(--primary)' }}>Hội sinh viên trường Đại học Hùng Vương</strong>
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button className="btn btn-outline btn-sm" onClick={handleExportCsv} title="Xuất danh sách ra tệp Excel">
            <FileSpreadsheet size={15} color="var(--primary)" />
            <span>Xuất Excel ({filteredList.length})</span>
          </button>
          {onResetData && (
            <button className="btn btn-subtle btn-sm" onClick={onResetData} title="Khôi phục lại dữ liệu mẫu">
              <RefreshCw size={14} />
              <span>Đặt lại dữ liệu</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Category Segmented Tabs: Chia 3 mục như của sinh viên */}
      <div className="category-segmented-bar" style={{ marginBottom: '20px' }}>
        {CATEGORIES.map(cat => {
          let count = 0;
          if (cat.id === 'sv5t') count = students.length;
          else if (cat.id === 'tt5t') count = collectives.length;
          else if (cat.id === 'stg') count = starJanList.length;

          const isActive = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setSelectedCategory(cat.id);
                setSelectedIds([]);
              }}
              className={`category-seg-btn ${isActive ? 'active' : ''}`}
              style={{ fontWeight: isActive ? '700' : '500' }}
            >
              {cat.id === 'tt5t' ? <Users size={17} /> : cat.id === 'stg' ? <Star size={17} /> : <Award size={17} />}
              <span>{cat.name}</span>
              <span style={{
                fontSize: '0.74rem',
                padding: '2px 8px',
                borderRadius: '10px',
                background: isActive ? 'rgba(255,255,255,0.25)' : 'var(--bg-card)',
                color: isActive ? '#fff' : 'var(--text-muted)',
                fontWeight: '700',
                marginLeft: '4px'
              }}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. Metrics Strip thích ứng theo từng danh mục */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '14px',
        marginBottom: '20px'
      }}>
        {/* Metric 1 */}
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
            {selectedCategory === 'tt5t' ? <Users size={20} /> : selectedCategory === 'stg' ? <Star size={20} /> : <Award size={20} />}
          </div>
          <div>
            <div style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-main)', lineHeight: '1.2' }}>
              {totalCount}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              {selectedCategory === 'tt5t' ? 'Tổng tập thể tiếp nhận' : selectedCategory === 'stg' ? 'Tổng cán bộ nộp STG' : 'Tổng hồ sơ tiếp nhận'}
            </div>
          </div>
        </div>

        {/* Metric 2 */}
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
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Hồ sơ đang chờ thẩm định
            </div>
          </div>
        </div>

        {/* Metric 3 */}
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
            <Check size={20} />
          </div>
          <div>
            <div style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--success)', lineHeight: '1.2' }}>
              {fullPassCount}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Đạt chuẩn {totalRequiredStandards}/{totalRequiredStandards} tiêu chí
            </div>
          </div>
        </div>
      </div>

      {/* 4. Filter Toolbar */}
      <div className="card" style={{ padding: '14px 18px', marginBottom: '16px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '12px',
          alignItems: 'center'
        }}>
          {/* Search box */}
          <div style={{ position: 'relative' }}>
            <Search 
              size={16} 
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} 
            />
            <input 
              type="text"
              className="input-control"
              placeholder={
                selectedCategory === 'tt5t' 
                  ? "Tìm tên chi đoàn, chi hội, đại diện..." 
                  : selectedCategory === 'stg' 
                  ? "Tìm theo họ tên, MSSV, chức vụ..." 
                  : "Tìm theo họ tên, MSSV, lớp..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '36px', height: '40px' }}
            />
            {searchQuery && (
              <button 
                type="button" 
                onClick={() => setSearchQuery('')}
                style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                <X size={14} />
              </button>
            )}
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
              <option value="full_approved">Đã đạt đủ {totalRequiredStandards}/{totalRequiredStandards} tiêu chí</option>
              {selectedCategory !== 'tt5t' && (
                <>
                  <option value="good_gpa">Điểm GPA đạt loại Giỏi (≥ 3.20)</option>
                  <option value="good_drl">Điểm rèn luyện Tốt/Xuất sắc (≥ 80)</option>
                </>
              )}
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

      {/* 5. Table Header & Select All Controls */}
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
            Danh sách hiển thị: <strong style={{ color: 'var(--text-main)' }}>{filteredList.length}</strong> {selectedCategory === 'tt5t' ? 'tập thể' : (selectedCategory === 'stg' ? 'cán bộ' : 'sinh viên')}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button 
              type="button"
              className="btn btn-outline btn-sm"
              onClick={handleToggleSelectAll}
              style={{ fontSize: '0.8rem', padding: '6px 12px' }}
            >
              {selectedIds.length === filteredList.length && filteredList.length > 0 ? (
                <>
                  <CheckSquare size={14} color="var(--primary)" />
                  <span>Bỏ chọn tất cả</span>
                </>
              ) : (
                <>
                  <Square size={14} />
                  <span>Chọn tất cả ({filteredList.length})</span>
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
                <Sparkles size={14} />
                <span>Chấm điểm hàng loạt ({selectedIds.length})</span>
              </button>
            )}
          </div>
        </div>

        {/* 6. Dynamic Table for Active Category */}
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
                    checked={selectedIds.length === filteredList.length && filteredList.length > 0}
                    onChange={handleToggleSelectAll}
                  />
                </th>

                {selectedCategory === 'tt5t' ? (
                  <>
                    <th style={{ padding: '12px 14px' }}>Tập thể Chi đoàn / Chi hội</th>
                    <th style={{ padding: '12px 14px' }}>Khoa</th>
                    <th style={{ padding: '12px 14px', textAlign: 'center' }}>Sĩ số</th>
                    <th style={{ padding: '12px 14px' }}>Đại diện nộp</th>
                    {currentStandards.map(std => (
                      <th key={std.code} style={{ padding: '12px 10px', textAlign: 'center' }} title={`${std.code}: ${std.name}`}>
                        {std.code}
                      </th>
                    ))}
                  </>
                ) : selectedCategory === 'stg' ? (
                  <>
                    <th style={{ padding: '12px 14px' }}>Cán bộ Đoàn - Hội</th>
                    <th style={{ padding: '12px 14px' }}>Khoa & Lớp</th>
                    <th style={{ padding: '12px 14px', textAlign: 'center' }}>GPA</th>
                    <th style={{ padding: '12px 14px', textAlign: 'center' }}>ĐRL</th>
                    {currentStandards.map(std => (
                      <th key={std.code} style={{ padding: '12px 10px', textAlign: 'center' }} title={`${std.code}: ${std.name}`}>
                        {std.code}
                      </th>
                    ))}
                  </>
                ) : (
                  <>
                    <th style={{ padding: '12px 14px' }}>Sinh viên & Lớp</th>
                    <th style={{ padding: '12px 14px' }}>Khoa</th>
                    <th style={{ padding: '12px 14px', textAlign: 'center' }}>GPA</th>
                    <th style={{ padding: '12px 14px', textAlign: 'center' }}>ĐRL</th>
                    {currentStandards.map(std => (
                      <th key={std.code} style={{ padding: '12px 10px', textAlign: 'center' }} title={`${std.code}: ${std.name}`}>
                        {std.code}
                      </th>
                    ))}
                  </>
                )}

                <th style={{ padding: '12px 14px', textAlign: 'center' }}>Tiến độ</th>
                <th style={{ padding: '12px 14px', textAlign: 'right' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={12} style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
                    <Users size={32} style={{ opacity: 0.3, marginBottom: '8px' }} />
                    <p style={{ fontWeight: '600' }}>Không tìm thấy hồ sơ nào phù hợp với điều kiện tìm kiếm.</p>
                  </td>
                </tr>
              ) : (
                filteredList.map(record => {
                  const isSelected = selectedIds.includes(record.id);
                  const approvedCount = currentStandards.filter(std => record.criteriaStatus?.[std.code]?.status === 'approved').length;
                  const isFullApproved = approvedCount === totalRequiredStandards;

                  const renderDot = (stdCode, title) => {
                    const st = record.criteriaStatus?.[stdCode]?.status || 'pending';
                    const hasEv = record.evidences?.[stdCode]?.length > 0;

                    let bg = '#e2e8f0';
                    let fg = '#64748b';
                    let icon = <Clock size={11} />;

                    if (st === 'approved') {
                      bg = 'rgba(16, 185, 129, 0.15)';
                      fg = '#10b981';
                      icon = <Check size={12} strokeWidth={3} />;
                    } else if (st === 'rejected') {
                      bg = 'rgba(239, 68, 68, 0.15)';
                      fg = '#ef4444';
                      icon = <X size={12} />;
                    } else if (hasEv) {
                      bg = 'rgba(245, 158, 11, 0.2)';
                      fg = '#d97706';
                    }

                    return (
                      <div 
                        title={`${title}: ${st === 'approved' ? 'Đã đạt' : (st === 'rejected' ? 'Không đạt' : 'Đang chờ thẩm định')}`}
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          background: bg,
                          color: fg,
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto',
                          cursor: 'pointer',
                          transition: 'transform 0.15s ease'
                        }}
                        onClick={() => {
                          const evList = record.evidences?.[stdCode];
                          if (evList && evList.length > 0) {
                            setActiveEvidence(evList[0]);
                            setEvidenceStudent(record);
                            setEvidenceStandardName(`${stdCode}: ${title}`);
                          } else {
                            onOpenStudentDetail(record, selectedCategory);
                          }
                        }}
                      >
                        {icon}
                      </div>
                    );
                  };

                  return (
                    <tr 
                      key={record.id}
                      style={{
                        borderBottom: '1px solid var(--border-color)',
                        background: isSelected ? 'var(--primary-light)' : 'transparent',
                        transition: 'background 0.12s ease'
                      }}
                    >
                      {/* Checkbox */}
                      <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                        <input 
                          type="checkbox" 
                          className="custom-checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelectOne(record.id)}
                        />
                      </td>

                      {/* Content cells depending on Category */}
                      {selectedCategory === 'tt5t' ? (
                        <>
                          {/* Tập thể Chi đoàn / Chi hội */}
                          <td style={{ padding: '12px 14px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <div style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '8px',
                                background: 'var(--primary-light)',
                                color: 'var(--primary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                              }}>
                                <Users size={18} />
                              </div>
                              <div>
                                <div style={{ fontWeight: '700', color: 'var(--text-main)' }}>
                                  {record.name}
                                </div>
                                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                                  Lớp: <strong>{record.className}</strong>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Khoa */}
                          <td style={{ padding: '12px 14px', color: 'var(--text-muted)' }}>
                            {record.facultyName}
                          </td>

                          {/* Sĩ số */}
                          <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                            <span className="badge badge-subtle">
                              {record.memberCount} HV
                            </span>
                          </td>

                          {/* Đại diện */}
                          <td style={{ padding: '12px 14px', fontSize: '0.82rem' }}>
                            <strong>{record.representative}</strong>
                          </td>

                          {/* Criteria TT1, TT2, TT3 */}
                          {currentStandards.map(std => (
                            <td key={std.code} style={{ padding: '12px 10px', textAlign: 'center' }}>
                              {renderDot(std.code, std.name)}
                            </td>
                          ))}
                        </>
                      ) : selectedCategory === 'stg' ? (
                        <>
                          {/* Cán bộ Sao Tháng Giêng */}
                          <td style={{ padding: '12px 14px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <img 
                                src={record.avatar || DEFAULT_AVATAR} 
                                alt={record.name}
                                style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--primary)', flexShrink: 0 }}
                              />
                              <div>
                                <div style={{ fontWeight: '700', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  <span>{record.name}</span>
                                  <span style={{ fontSize: '0.7rem', color: '#d97706', background: 'rgba(245, 158, 11, 0.15)', padding: '1px 6px', borderRadius: '6px', fontWeight: '800' }}>
                                    STG
                                  </span>
                                </div>
                                <div style={{ fontSize: '0.76rem', color: 'var(--primary)', fontWeight: '600' }}>
                                  {record.position || 'Cán bộ Đoàn - Hội'}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Khoa & Lớp */}
                          <td style={{ padding: '12px 14px' }}>
                            <div style={{ color: 'var(--text-main)', fontWeight: '600' }}>{record.className}</div>
                            <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{record.facultyName}</div>
                          </td>

                          {/* GPA */}
                          <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                            <span className={`badge ${record.gpa >= 3.6 ? 'badge-gpa-high' : 'badge-gpa'}`}>
                              {record.gpa}
                            </span>
                          </td>

                          {/* ĐRL */}
                          <td style={{ padding: '12px 14px', textAlign: 'center', fontWeight: '700', color: record.drl >= 90 ? 'var(--success)' : 'inherit' }}>
                            {record.drl}
                          </td>

                          {/* Criteria STG1, STG2, STG3 */}
                          {currentStandards.map(std => (
                            <td key={std.code} style={{ padding: '12px 10px', textAlign: 'center' }}>
                              {renderDot(std.code, std.name)}
                            </td>
                          ))}
                        </>
                      ) : (
                        <>
                          {/* Sinh viên 5 tốt */}
                          <td style={{ padding: '12px 14px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <img 
                                src={record.avatar || DEFAULT_AVATAR} 
                                alt={record.name}
                                style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--primary)', flexShrink: 0 }}
                              />
                              <div>
                                <div style={{ fontWeight: '700', color: 'var(--text-main)' }}>
                                  {record.name}
                                </div>
                                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                                  {record.studentCode} • {record.className}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Khoa */}
                          <td style={{ padding: '12px 14px', color: 'var(--text-muted)' }}>
                            {record.facultyName}
                          </td>

                          {/* GPA */}
                          <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                            <span className={`badge ${record.gpa >= 3.6 ? 'badge-gpa-high' : 'badge-gpa'}`}>
                              {record.gpa}
                            </span>
                          </td>

                          {/* ĐRL */}
                          <td style={{ padding: '12px 14px', textAlign: 'center', fontWeight: '700', color: record.drl >= 90 ? 'var(--success)' : 'inherit' }}>
                            {record.drl}
                          </td>

                          {/* Criteria TC1 - TC5 */}
                          {currentStandards.map(std => (
                            <td key={std.code} style={{ padding: '12px 10px', textAlign: 'center' }}>
                              {renderDot(std.code, std.name)}
                            </td>
                          ))}
                        </>
                      )}

                      {/* Tiến độ */}
                      <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                        <span style={{
                          fontWeight: '800',
                          fontSize: '0.86rem',
                          color: isFullApproved ? 'var(--success)' : 'var(--text-muted)'
                        }}>
                          {approvedCount}/{totalRequiredStandards}
                        </span>
                      </td>

                      {/* Nút Thẩm định */}
                      <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                        <button 
                          className="btn btn-outline btn-sm"
                          onClick={() => onOpenStudentDetail(record, selectedCategory)}
                          style={{
                            fontSize: '0.8rem',
                            padding: '5px 12px',
                            borderColor: isFullApproved ? 'var(--success)' : 'var(--border-color)',
                            color: isFullApproved ? 'var(--success)' : 'inherit'
                          }}
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

      {/* Batch Scoring Modal */}
      {isBatchModalOpen && (
        <BatchScoringModal 
          selectedStudents={selectedRecordsList}
          category={selectedCategory}
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
          onClose={() => {
            setActiveEvidence(null);
            setEvidenceStudent(null);
          }}
        />
      )}
    </div>
  );
}
