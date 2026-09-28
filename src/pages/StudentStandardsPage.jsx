import React, { useState } from 'react';
import { 
  Award, 
  Upload, 
  Plus, 
  X, 
  ShieldCheck, 
  GraduationCap, 
  Activity, 
  HeartHandshake, 
  Globe,
  Info,
  Check
} from 'lucide-react';
import { STANDARDS, CATEGORIES, COLLECTIVE_STANDARDS, STAR_JAN_STANDARDS } from '../data/criteriaData';
import EvidenceModal from '../components/EvidenceModal';

export default function StudentStandardsPage({ student, onUpdateStudent }) {
  const [selectedCategory, setSelectedCategory] = useState('sv5t');
  const [activeModalItem, setActiveModalItem] = useState(null);
  const [evidenceContent, setEvidenceContent] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [previewEvidence, setPreviewEvidence] = useState(null);
  const [explanations, setExplanations] = useState(student.explanations || {});

  if (!student) return null;

  // Icon mapping for 5 standards
  const getStandardIcon = (idx) => {
    switch (idx) {
      case 0: return <ShieldCheck size={20} />;
      case 1: return <GraduationCap size={20} />;
      case 2: return <Activity size={20} />;
      case 3: return <HeartHandshake size={20} />;
      case 4: return <Globe size={20} />;
      default: return <Award size={20} />;
    }
  };

  const handleOpenAddModal = (std, item) => {
    setActiveModalItem({ std, item });
    setEvidenceContent(explanations[item.id] || '');
    setUploadedFile(null);
  };

  const handleExplanationChange = (itemId, text) => {
    const nextExplanations = {
      ...explanations,
      [itemId]: text
    };
    setExplanations(nextExplanations);

    const updatedStudent = {
      ...student,
      explanations: nextExplanations
    };
    onUpdateStudent(updatedStudent);
  };

  const handleSubmitEvidence = (e) => {
    e.preventDefault();
    if (!activeModalItem) return;

    const stdCode = activeModalItem.std.code;
    const itemId = activeModalItem.item.id;

    const newEvidence = {
      id: `ev-${Date.now()}`,
      itemId: itemId,
      title: activeModalItem.item.title + (evidenceContent ? `: ${evidenceContent.slice(0, 35)}` : ''),
      url: uploadedFile?.preview || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
      type: 'image',
      fileName: uploadedFile?.name || 'Minh_chung_SV5T.jpg',
      note: evidenceContent || activeModalItem.item.evidenceRequired,
      uploadedAt: new Date().toLocaleString('vi-VN')
    };

    const existingList = student.evidences?.[stdCode] || [];
    const nextExplanations = {
      ...explanations,
      [itemId]: evidenceContent
    };

    const updatedStudent = {
      ...student,
      explanations: nextExplanations,
      evidences: {
        ...(student.evidences || {}),
        [stdCode]: [...existingList, newEvidence]
      },
      criteriaStatus: {
        ...(student.criteriaStatus || {}),
        [stdCode]: {
          status: 'pending',
          note: 'Đã nộp minh chứng mới - Chờ thẩm định',
          date: new Date().toISOString().split('T')[0]
        }
      }
    };

    onUpdateStudent(updatedStudent);
    setActiveModalItem(null);
  };

  const handleDeleteEvidence = (stdCode, evidenceId) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa minh chứng này không?')) return;
    const existingList = student.evidences?.[stdCode] || [];
    const updatedList = existingList.filter(ev => ev.id !== evidenceId);
    
    const updatedStudent = {
      ...student,
      evidences: {
        ...(student.evidences || {}),
        [stdCode]: updatedList
      }
    };
    onUpdateStudent(updatedStudent);
  };

  // Get active standard list depending on category
  const getStandardsForCategory = () => {
    if (selectedCategory === 'tt5t') return COLLECTIVE_STANDARDS;
    if (selectedCategory === 'stg') return STAR_JAN_STANDARDS;
    return STANDARDS;
  };

  const currentStandards = getStandardsForCategory();

  return (
    <div className="student-standards-wrap" style={{ maxWidth: '1180px', margin: '0 auto' }}>
      
      {/* Top Student Identity Banner (Item 1: Removed result box and removed badges) */}
      <div className="card" style={{ padding: '22px 28px', borderLeft: '5px solid var(--primary)', marginBottom: '22px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <img 
              src={student.avatar} 
              alt={student.name}
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2.5px solid var(--primary)',
                boxShadow: 'var(--shadow-sm)'
              }}
            />
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-main)' }}>
                {student.name}
              </h2>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginTop: '3px' }}>
                Mã sinh viên: <strong>{student.studentCode}</strong> • Lớp: <strong>{student.className}</strong> • {student.facultyName}
              </p>
            </div>
          </div>

          <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', textAlign: 'right' }}>
            <div>Năm học xét chọn: <strong style={{ color: 'var(--primary)' }}>2026 - 2027</strong></div>
            <div style={{ marginTop: '2px' }}>Hội đồng xét chọn: <strong>Trường Đại học Hùng Vương</strong></div>
          </div>
        </div>

        {/* Basic Student Info Details */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
          gap: '10px 16px',
          fontSize: '0.84rem',
          marginTop: '16px',
          paddingTop: '14px',
          borderTop: '1px solid var(--border-color)'
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
            <strong>{student.position || 'Hội viên'}</strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Đảng viên: </span>
            <strong style={{ color: 'var(--primary)' }}>
              {student.unionStatus?.toLowerCase().includes('đảng') ? 'Có' : (student.isPartyMember || 'Không')}
            </strong>
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

      {/* Category Tabs: Order strictly according to Item 3 */}
      <div className="category-segmented-bar" style={{ marginBottom: '24px' }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`category-seg-btn ${selectedCategory === cat.id ? 'active' : ''}`}
            style={{ fontWeight: selectedCategory === cat.id ? '700' : '500' }}
          >
            <Award size={17} />
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Instructional alert for students */}
      <div style={{
        background: 'var(--primary-light)',
        border: '1px solid rgba(0, 91, 170, 0.2)',
        borderRadius: 'var(--radius-md)',
        padding: '12px 18px',
        marginBottom: '22px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '0.86rem',
        color: 'var(--text-main)'
      }}>
        <Info size={20} color="var(--primary)" style={{ flexShrink: 0 }} />
        <div>
          <strong>Hướng dẫn nộp hồ sơ:</strong> Sinh viên theo dõi từng tiêu chuẩn, tải lên đúng tệp minh chứng theo cột <em>"Yêu cầu minh chứng"</em> và điền nội dung vào cột <em>"Giải trình"</em>. Đối với phần <em>"Đạt thêm 01 trong các tiêu chí sau"</em>, chỉ cần hoàn thành tối thiểu 01 tiêu chí để đạt chuẩn.
        </div>
      </div>

      {/* 4-Column Table Matrix (Item 5 & Image 5) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
        {currentStandards.map((std, sIdx) => {
          const statusObj = student.criteriaStatus?.[std.code] || { status: 'pending' };
          const evidences = student.evidences?.[std.code] || [];
          const isApproved = statusObj.status === 'approved';

          // Helper to get evidence for a specific item
          const getItemEvidences = (itemId) => {
            return evidences.filter(ev => ev.itemId === itemId || (!ev.itemId && itemId.endsWith('.1')));
          };

          return (
            <div 
              key={std.id}
              className="card"
              style={{
                padding: 0,
                overflow: 'hidden',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              {/* Standard Header */}
              <div style={{
                padding: '16px 20px',
                background: 'var(--bg-subtle)',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: 'var(--radius-md)',
                    background: `${std.color || 'var(--primary)'}15`,
                    color: std.color || 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '800'
                  }}>
                    {getStandardIcon(sIdx)}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-main)' }}>
                      Tiêu chuẩn {sIdx + 1}: {std.name}
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {std.summary}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span 
                    className={`badge ${isApproved ? 'badge-approved' : 'badge-pending'}`} 
                    style={{ padding: '6px 14px', fontSize: '0.8rem', fontWeight: '700' }}
                  >
                    {isApproved ? '✓ Đạt tiêu chuẩn' : '⏳ Đang thẩm định'}
                  </span>
                </div>
              </div>

              {/* 4-Column Table */}
              <div style={{ overflowX: 'auto' }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '0.88rem',
                  textAlign: 'left'
                }}>
                  <thead>
                    <tr style={{
                      background: 'var(--bg-card)',
                      borderBottom: '2px solid var(--border-color)',
                      color: 'var(--text-main)'
                    }}>
                      <th style={{ padding: '12px 16px', width: '38%', fontWeight: '700' }}>
                        Tiêu chuẩn cụ thể
                      </th>
                      <th style={{ padding: '12px 16px', width: '28%', fontWeight: '700' }}>
                        Yêu cầu minh chứng
                      </th>
                      <th style={{ padding: '12px 16px', width: '14%', fontWeight: '700', textAlign: 'center' }}>
                        Kết quả
                      </th>
                      <th style={{ padding: '12px 16px', width: '20%', fontWeight: '700' }}>
                        Giải trình
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Section: Tiêu chuẩn bắt buộc */}
                    {std.mandatoryItems && std.mandatoryItems.length > 0 && (
                      <>
                        <tr style={{ background: 'rgba(0, 91, 170, 0.04)' }}>
                          <td 
                            colSpan={4} 
                            style={{ 
                              padding: '8px 16px', 
                              fontWeight: '800', 
                              fontSize: '0.8rem', 
                              color: 'var(--primary)',
                              textTransform: 'uppercase',
                              letterSpacing: '0.03em'
                            }}
                          >
                            Tiêu chuẩn bắt buộc
                          </td>
                        </tr>
                        {std.mandatoryItems.map((item) => {
                          const itemEvidences = getItemEvidences(item.id);
                          const hasUploaded = itemEvidences.length > 0;

                          return (
                            <tr key={item.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                              {/* 1. Tiêu chuẩn cụ thể */}
                              <td style={{ padding: '14px 16px', verticalAlign: 'top' }}>
                                <div style={{ fontWeight: '700', color: 'var(--text-main)', marginBottom: '4px' }}>
                                  {item.title}
                                </div>
                                <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: '1.45' }}>
                                  {item.requirement}
                                </div>
                              </td>

                              {/* 2. Yêu cầu minh chứng */}
                              <td style={{ padding: '14px 16px', verticalAlign: 'top', color: 'var(--text-muted)', fontSize: '0.84rem', lineHeight: '1.45' }}>
                                {item.evidenceRequired}
                              </td>

                              {/* 3. Kết quả (Upload / Attached files) */}
                              <td style={{ padding: '14px 16px', verticalAlign: 'top', textAlign: 'center' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                  <button
                                    type="button"
                                    onClick={() => handleOpenAddModal(std, item)}
                                    title="Tải lên hoặc đính kèm minh chứng"
                                    style={{
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      gap: '6px',
                                      padding: '7px 12px',
                                      background: hasUploaded ? 'var(--success-light)' : 'var(--primary-light)',
                                      color: hasUploaded ? 'var(--success)' : 'var(--primary)',
                                      border: `1px solid ${hasUploaded ? 'var(--success)' : 'var(--primary)'}`,
                                      borderRadius: 'var(--radius-sm)',
                                      fontSize: '0.82rem',
                                      fontWeight: '700',
                                      cursor: 'pointer',
                                      transition: 'all 0.2s ease'
                                    }}
                                  >
                                    {hasUploaded ? <Check size={14} /> : <Plus size={14} />}
                                    <span>{hasUploaded ? 'Đã tải lên' : 'Tải lên'}</span>
                                  </button>

                                  {/* Uploaded Evidence Chips */}
                                  {itemEvidences.map(ev => (
                                    <div 
                                      key={ev.id}
                                      style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        background: 'var(--bg-subtle)',
                                        border: '1px solid var(--border-color)',
                                        borderRadius: 'var(--radius-sm)',
                                        padding: '4px 8px',
                                        fontSize: '0.74rem',
                                        maxWidth: '150px'
                                      }}
                                    >
                                      <span 
                                        onClick={() => setPreviewEvidence(ev)}
                                        style={{ 
                                          cursor: 'pointer', 
                                          color: 'var(--primary)', 
                                          fontWeight: '600', 
                                          textDecoration: 'underline',
                                          whiteSpace: 'nowrap',
                                          overflow: 'hidden',
                                          textOverflow: 'ellipsis'
                                        }}
                                        title={ev.title}
                                      >
                                        Xem tệp
                                      </span>
                                      <button 
                                        type="button"
                                        onClick={() => handleDeleteEvidence(std.code, ev.id)}
                                        style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--danger)', padding: 0 }}
                                        title="Xóa minh chứng này"
                                      >
                                        <X size={12} />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </td>

                              {/* 4. Giải trình */}
                              <td style={{ padding: '14px 16px', verticalAlign: 'top' }}>
                                <textarea
                                  className="input-control"
                                  rows={2}
                                  placeholder="Nhập nội dung giải trình..."
                                  value={explanations[item.id] || ''}
                                  onChange={(e) => handleExplanationChange(item.id, e.target.value)}
                                  style={{
                                    fontSize: '0.82rem',
                                    resize: 'vertical',
                                    padding: '8px 10px',
                                    lineHeight: '1.4'
                                  }}
                                />
                              </td>
                            </tr>
                          );
                        })}
                      </>
                    )}

                    {/* Section: Đạt thêm 01 trong các tiêu chí sau */}
                    {std.additionalItems && std.additionalItems.length > 0 && (
                      <>
                        <tr style={{ background: 'rgba(245, 158, 11, 0.06)' }}>
                          <td 
                            colSpan={4} 
                            style={{ 
                              padding: '8px 16px', 
                              fontWeight: '800', 
                              fontSize: '0.8rem', 
                              color: '#b45309',
                              textTransform: 'uppercase',
                              letterSpacing: '0.03em'
                            }}
                          >
                            Đạt thêm 01 trong các tiêu chí sau (chọn ít nhất 01 tiêu chí)
                          </td>
                        </tr>
                        {std.additionalItems.map((item) => {
                          const itemEvidences = getItemEvidences(item.id);
                          const hasUploaded = itemEvidences.length > 0;

                          return (
                            <tr key={item.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                              {/* 1. Tiêu chuẩn cụ thể */}
                              <td style={{ padding: '14px 16px', verticalAlign: 'top' }}>
                                <div style={{ fontWeight: '700', color: 'var(--text-main)', marginBottom: '4px' }}>
                                  + {item.title}
                                </div>
                                <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: '1.45' }}>
                                  {item.requirement}
                                </div>
                              </td>

                              {/* 2. Yêu cầu minh chứng */}
                              <td style={{ padding: '14px 16px', verticalAlign: 'top', color: 'var(--text-muted)', fontSize: '0.84rem', lineHeight: '1.45' }}>
                                {item.evidenceRequired}
                              </td>

                              {/* 3. Kết quả (Upload / Attached files) */}
                              <td style={{ padding: '14px 16px', verticalAlign: 'top', textAlign: 'center' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                  <button
                                    type="button"
                                    onClick={() => handleOpenAddModal(std, item)}
                                    title="Tải lên minh chứng cho tiêu chí này"
                                    style={{
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      gap: '6px',
                                      padding: '7px 12px',
                                      background: hasUploaded ? 'var(--success-light)' : 'var(--bg-subtle)',
                                      color: hasUploaded ? 'var(--success)' : 'var(--text-main)',
                                      border: `1px solid ${hasUploaded ? 'var(--success)' : 'var(--border-color)'}`,
                                      borderRadius: 'var(--radius-sm)',
                                      fontSize: '0.82rem',
                                      fontWeight: '700',
                                      cursor: 'pointer',
                                      transition: 'all 0.2s ease'
                                    }}
                                  >
                                    {hasUploaded ? <Check size={14} /> : <Plus size={14} />}
                                    <span>{hasUploaded ? 'Đã nộp' : 'Tải lên'}</span>
                                  </button>

                                  {/* Uploaded Evidence Chips */}
                                  {itemEvidences.map(ev => (
                                    <div 
                                      key={ev.id}
                                      style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        background: 'var(--bg-subtle)',
                                        border: '1px solid var(--border-color)',
                                        borderRadius: 'var(--radius-sm)',
                                        padding: '4px 8px',
                                        fontSize: '0.74rem',
                                        maxWidth: '150px'
                                      }}
                                    >
                                      <span 
                                        onClick={() => setPreviewEvidence(ev)}
                                        style={{ 
                                          cursor: 'pointer', 
                                          color: 'var(--primary)', 
                                          fontWeight: '600', 
                                          textDecoration: 'underline',
                                          whiteSpace: 'nowrap',
                                          overflow: 'hidden',
                                          textOverflow: 'ellipsis'
                                        }}
                                        title={ev.title}
                                      >
                                        Xem tệp
                                      </span>
                                      <button 
                                        type="button"
                                        onClick={() => handleDeleteEvidence(std.code, ev.id)}
                                        style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--danger)', padding: 0 }}
                                        title="Xóa minh chứng này"
                                      >
                                        <X size={12} />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </td>

                              {/* 4. Giải trình */}
                              <td style={{ padding: '14px 16px', verticalAlign: 'top' }}>
                                <textarea
                                  className="input-control"
                                  rows={2}
                                  placeholder="Nhập nội dung giải trình..."
                                  value={explanations[item.id] || ''}
                                  onChange={(e) => handleExplanationChange(item.id, e.target.value)}
                                  style={{
                                    fontSize: '0.82rem',
                                    resize: 'vertical',
                                    padding: '8px 10px',
                                    lineHeight: '1.4'
                                  }}
                                />
                              </td>
                            </tr>
                          );
                        })}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Tải lên minh chứng mới */}
      {activeModalItem && (
        <div className="modal-overlay" onClick={() => setActiveModalItem(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px' }}>
            <div className="modal-header">
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800' }}>Tải lên minh chứng</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {activeModalItem.std.name} • {activeModalItem.item.title}
                </p>
              </div>
              <button className="modal-close-btn" onClick={() => setActiveModalItem(null)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmitEvidence}>
              <div className="modal-body">
                {/* Requirements Reminder */}
                <div style={{
                  background: 'var(--bg-subtle)',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  marginBottom: '16px',
                  fontSize: '0.84rem'
                }}>
                  <div style={{ fontWeight: '700', color: 'var(--primary)', marginBottom: '4px' }}>
                    Yêu cầu minh chứng:
                  </div>
                  <div style={{ color: 'var(--text-main)', lineHeight: '1.45' }}>
                    {activeModalItem.item.evidenceRequired}
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label className="form-label">
                    Nội dung giải trình thành tích
                  </label>
                  <textarea 
                    className="input-control" 
                    rows={3}
                    placeholder="Điền nội dung chi tiết về thành tích đạt được..."
                    value={evidenceContent}
                    onChange={(e) => setEvidenceContent(e.target.value)}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label className="form-label">
                    Tệp minh chứng đính kèm (Ảnh scan, bảng điểm, chứng chỉ) <span className="required">*</span>
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
                            name: `Minh_chung_${activeModalItem.item.id}_HVU.jpg`,
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
                <button type="submit" className="btn btn-primary" disabled={!uploadedFile && !evidenceContent}>
                  <span>Lưu minh chứng</span>
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
