import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle, 
  AlertCircle, 
  Upload, 
  Plus, 
  Eye, 
  FileText, 
  Check, 
  X, 
  Calendar,
  Phone,
  Mail,
  User,
  School,
  Sparkles,
  ShieldCheck,
  GraduationCap,
  Activity,
  HeartHandshake,
  Globe
} from 'lucide-react';
import { STANDARDS, CATEGORIES } from '../data/criteriaData';
import EvidenceModal from '../components/EvidenceModal';

export default function StudentStandardsPage({ student, onUpdateStudent }) {
  const [selectedCategory, setSelectedCategory] = useState('sv5t');
  const [activeModalItem, setActiveModalItem] = useState(null);
  const [evidenceContent, setEvidenceContent] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [previewEvidence, setPreviewEvidence] = useState(null);

  if (!student) return null;

  const approvedStandardsCount = Object.values(student.criteriaStatus).filter(c => c.status === 'approved').length;
  const isFullApproved = approvedStandardsCount === 5;

  // Icon mapping for 5 standards
  const getStandardIcon = (idx) => {
    switch (idx) {
      case 0: return <ShieldCheck size={22} />;
      case 1: return <GraduationCap size={22} />;
      case 2: return <Activity size={22} />;
      case 3: return <HeartHandshake size={22} />;
      case 4: return <Globe size={22} />;
      default: return <Award size={22} />;
    }
  };

  const handleOpenAddModal = (standard, item) => {
    setActiveModalItem({ standard, item });
    setEvidenceContent('');
    setUploadedFile(null);
  };

  const handleSubmitEvidence = (e) => {
    e.preventDefault();
    if (!activeModalItem) return;

    const stdCode = activeModalItem.standard.code;
    const newEvidence = {
      id: `ev-${Date.now()}`,
      title: activeModalItem.item.title + (evidenceContent ? `: ${evidenceContent.slice(0, 45)}` : ''),
      url: uploadedFile?.preview || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
      type: 'image',
      note: evidenceContent || 'Minh chứng tải lên từ cổng sinh viên',
      uploadedAt: new Date().toLocaleString('vi-VN')
    };

    const existingList = student.evidences[stdCode] || [];
    const updatedStudent = {
      ...student,
      evidences: {
        ...student.evidences,
        [stdCode]: [...existingList, newEvidence]
      },
      criteriaStatus: {
        ...student.criteriaStatus,
        [stdCode]: {
          status: 'pending',
          note: 'Đã nộp minh chứng mới - Chờ Hội đồng trường phê duyệt',
          date: new Date().toISOString().split('T')[0]
        }
      }
    };

    onUpdateStudent(updatedStudent);
    setActiveModalItem(null);
  };

  return (
    <div className="student-standards-wrap">
      {/* Top Student Identity & Progress Banner */}
      <div className="card" style={{ padding: '24px 28px', borderLeft: '6px solid var(--primary)' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '18px',
          marginBottom: '18px',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <img 
              src={student.avatar} 
              alt={student.name}
              style={{
                width: '68px',
                height: '68px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid var(--primary)',
                boxShadow: 'var(--shadow-sm)'
              }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <h2 style={{ fontSize: '1.45rem', fontWeight: '900', color: 'var(--text-main)' }}>
                  {student.name}
                </h2>
                <span className="badge badge-approved" style={{ fontSize: '0.8rem' }}>
                  {student.year}
                </span>
                <span className="badge badge-gpa">
                  GPA: {student.gpa}
                </span>
                <span className="badge" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
                  ĐRL: {student.drl}
                </span>
              </div>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Mã sinh viên: <strong>{student.studentCode}</strong> • Lớp: <strong>{student.className}</strong> • {student.facultyName}
              </p>
            </div>
          </div>

          {/* Dossier Result Pill for School Level */}
          <div style={{
            background: isFullApproved ? 'var(--success-light)' : 'var(--primary-light)',
            border: `1.5px solid ${isFullApproved ? 'var(--success)' : 'var(--primary)'}`,
            borderRadius: 'var(--radius-lg)',
            padding: '14px 24px',
            textAlign: 'center',
            boxShadow: 'var(--shadow-xs)'
          }}>
            <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', fontWeight: '800', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
              Kết quả xét Cấp Trường • HVU
            </span>
            <div style={{ fontSize: '1.35rem', fontWeight: '900', color: isFullApproved ? '#065f46' : 'var(--primary)', marginTop: '2px' }}>
              {isFullApproved ? 'ĐẠT 5 TIÊU CHÍ (SV5T)' : `ĐẠT ${approvedStandardsCount} / 5 TIÊU CHÍ`}
            </div>
            <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: '600' }}>
              {isFullApproved ? '🎉 Đủ điều kiện tuyên dương khen thưởng' : '⏳ Đang tiếp nhận và thẩm định minh chứng'}
            </span>
          </div>
        </div>

        {/* Details Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '12px',
          fontSize: '0.85rem'
        }}>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Ngày sinh: </span>
            <strong>{student.dob}</strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Dân tộc: </span>
            <strong>{student.ethnicity}</strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Chức vụ Đoàn, Hội: </span>
            <strong>{student.position}</strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Đoàn viên / Đảng viên: </span>
            <strong style={{ color: 'var(--primary)' }}>{student.unionStatus}</strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Điện thoại: </span>
            <strong>{student.phone}</strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Email: </span>
            <strong>{student.email}</strong>
          </div>
        </div>
      </div>

      {/* Upgraded Category Segmented Control (Replacing dated buttons in Image 2) */}
      <div className="category-segmented-bar">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`category-seg-btn ${selectedCategory === cat.id ? 'active' : ''}`}
          >
            <Award size={18} />
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* 5 Standards Declaration Matrix (Optimizing Image 2) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
        {STANDARDS.map((std, sIdx) => {
          const statusObj = student.criteriaStatus[std.code] || { status: 'pending' };
          const evidences = student.evidences[std.code] || [];
          const isApproved = statusObj.status === 'approved';

          return (
            <div 
              key={std.id}
              className="standard-master-card"
              style={{
                borderLeft: `6px solid ${isApproved ? 'var(--success)' : std.color}`
              }}
            >
              {/* Standard Header */}
              <div className="standard-card-header">
                <div className="standard-title-group">
                  <div 
                    className="standard-num-circle"
                    style={{
                      background: isApproved ? 'var(--success-light)' : `${std.color}15`,
                      color: isApproved ? 'var(--success)' : std.color
                    }}
                  >
                    {getStandardIcon(sIdx)}
                  </div>
                  <div>
                    <h3>
                      Tiêu chuẩn {sIdx + 1}: {std.name}
                    </h3>
                    <p>{std.summary}</p>
                  </div>
                </div>

                {/* Status Pill & Note */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span 
                    className={`badge ${isApproved ? 'badge-approved' : 'badge-pending'}`} 
                    style={{ padding: '6px 14px', fontSize: '0.84rem' }}
                  >
                    {isApproved ? '✓ ĐẠT TIÊU CHUẨN' : '⏳ ĐANG THẨM ĐỊNH'}
                  </span>
                  {statusObj.note && (
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                      ({statusObj.note})
                    </span>
                  )}
                </div>
              </div>

              {/* Items List Inside Standard */}
              <div className="standard-items-list">
                {std.items.map((item) => (
                  <div key={item.id} className="criterion-item-card">
                    <div className="criterion-content">
                      <div className="criterion-header-row">
                        <span className="criterion-code-tag">{item.id}</span>
                        <span className="criterion-title-text">{item.title}</span>
                      </div>
                      <p className="criterion-desc-text">
                        {item.requirement}
                      </p>
                      <div className="criterion-evidence-prompt">
                        <span>📄 Yêu cầu minh chứng: {item.evidenceRequired}</span>
                      </div>
                    </div>

                    {/* Upgraded "+ Khai báo / Nộp minh chứng" button */}
                    <button 
                      type="button"
                      className="btn-upload-evidence"
                      onClick={() => handleOpenAddModal(std, item)}
                      title="Tải ảnh bằng khen, bảng điểm hoặc chứng chỉ minh chứng cho tiêu chí này"
                    >
                      <Plus size={16} />
                      <span>Khai báo / Nộp minh chứng</span>
                    </button>
                  </div>
                ))}
              </div>

              {/* Upgraded Evidence Showcase Gallery (Replacing small gray boxes in Image 2) */}
              {evidences.length > 0 && (
                <div className="evidence-gallery-strip">
                  <span className="evidence-strip-title">
                    Tệp minh chứng đã đính kèm ({evidences.length}):
                  </span>
                  <div className="evidence-cards-grid">
                    {evidences.map((ev, eIdx) => (
                      <div 
                        key={ev.id || eIdx}
                        className="evidence-card-thumb"
                        onClick={() => setPreviewEvidence(ev)}
                        title="Bấm để xem ảnh phóng to trong Lightbox"
                      >
                        <img 
                          src={ev.url} 
                          alt={ev.title} 
                          className="evidence-img-preview"
                        />
                        <div className="evidence-card-info">
                          <span className="evidence-file-title">
                            {ev.title}
                          </span>
                          <span className="evidence-file-sub">
                            <Eye size={12} />
                            <span>Click xem phóng to</span>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal: Thêm mới kết quả minh chứng */}
      {activeModalItem && (
        <div className="modal-overlay" onClick={() => setActiveModalItem(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800' }}>Thêm mới kết quả minh chứng</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {activeModalItem.standard.code}: {activeModalItem.item.title}
                </p>
              </div>
              <button className="modal-close-btn" onClick={() => setActiveModalItem(null)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmitEvidence}>
              <div className="modal-body">
                <div className="form-group" style={{ marginBottom: '18px' }}>
                  <label className="form-label">
                    Nội dung giải trình thành tích <span className="required">*</span>
                  </label>
                  <textarea 
                    className="input-control" 
                    rows={4}
                    required
                    placeholder="Điền nội dung chi tiết về thành tích đạt được (ví dụ: Điểm tổng kết học tập GPA 3.68/4.0; Đạt giải Nhì NCKH sinh viên cấp trường năm 2025...)"
                    value={evidenceContent}
                    onChange={(e) => setEvidenceContent(e.target.value)}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '18px' }}>
                  <label className="form-label">
                    Tải tệp minh chứng (Giấy khen, Bảng điểm, Chứng chỉ) <span className="required">*</span>
                  </label>

                  <div style={{
                    border: '2px dashed var(--border-color)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '24px',
                    textAlign: 'center',
                    background: 'var(--bg-subtle)'
                  }}>
                    <Upload size={32} color="var(--primary)" style={{ margin: '0 auto 8px' }} />
                    <p style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-main)' }}>
                      Chọn ảnh hoặc PDF scan từ thiết bị
                    </p>
                    <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                      Hỗ trợ định dạng JPG, PNG, PDF (Tối đa 15MB)
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '12px' }}>
                      <button 
                        type="button" 
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          setUploadedFile({
                            name: 'Chung_nhan_Giay_khen_SV5T.jpg',
                            preview: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80'
                          });
                        }}
                      >
                        <Upload size={14} />
                        <span>Tải tệp mẫu minh chứng</span>
                      </button>
                    </div>

                    {uploadedFile && (
                      <div style={{ marginTop: '12px', fontSize: '0.84rem', color: 'var(--success)', fontWeight: '700' }}>
                        ✓ Đã đính kèm: {uploadedFile.name}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setActiveModalItem(null)}>
                  Đóng
                </button>
                <button type="submit" className="btn btn-primary">
                  <span>Thêm minh chứng</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lightbox / Preview modal for clicked evidence */}
      {previewEvidence && (
        <EvidenceModal 
          evidence={previewEvidence}
          student={student}
          onClose={() => setPreviewEvidence(null)}
        />
      )}
    </div>
  );
}
