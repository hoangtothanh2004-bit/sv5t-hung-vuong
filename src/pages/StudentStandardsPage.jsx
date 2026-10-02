import React, { useState, useRef } from 'react';
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
  Check,
  FileText,
  Image as ImageIcon,
  Trash2,
  CheckCircle2,
  Save
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { STANDARDS, CATEGORIES, COLLECTIVE_STANDARDS, STAR_JAN_STANDARDS } from '../data/criteriaData';
import EvidenceModal from '../components/EvidenceModal';
import { DEFAULT_AVATAR } from '../utils/avatar';

export default function StudentStandardsPage({ student, onUpdateStudent }) {
  const [selectedCategory, setSelectedCategory] = useState('sv5t');
  const [activeModalItem, setActiveModalItem] = useState(null);
  const [evidenceContent, setEvidenceContent] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [previewEvidence, setPreviewEvidence] = useState(null);
  const [explanations, setExplanations] = useState(student.explanations || {});
  const [isDragging, setIsDragging] = useState(false);
  const [submissionSuccessBanner, setSubmissionSuccessBanner] = useState(false);
  const fileInputRef = useRef(null);

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
    setUploadedFiles([]);
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

  const processSelectedFiles = (fileList) => {
    if (!fileList || fileList.length === 0) return;
    const filesArray = Array.from(fileList);
    
    filesArray.forEach((file, index) => {
      if (file.size > 20 * 1024 * 1024) {
        alert(`Tệp "${file.name}" vượt quá 20MB. Vui lòng chọn tệp nhỏ hơn!`);
        return;
      }

      const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
      const sizeStr = file.size > 1024 * 1024 
        ? (file.size / (1024 * 1024)).toFixed(2) + ' MB'
        : Math.round(file.size / 1024) + ' KB';

      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedFiles(prev => [
          ...prev,
          {
            id: `up-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 6)}`,
            name: file.name,
            size: sizeStr,
            type: isPdf ? 'pdf' : 'image',
            preview: e.target.result // Base64 data URL
          }
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processSelectedFiles(e.target.files);
      e.target.value = ''; // Reset to allow re-selecting same file
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processSelectedFiles(e.dataTransfer.files);
    }
  };

  const handleRemoveUploadedFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const handleSubmitEvidence = (e) => {
    e.preventDefault();
    if (!activeModalItem) return;

    const stdCode = activeModalItem.std.code;
    const itemId = activeModalItem.item.id;

    // Create an evidence object for each uploaded file (or a single entry if only explanation)
    let newEvidences = [];
    if (uploadedFiles.length > 0) {
      newEvidences = uploadedFiles.map((file, idx) => ({
        id: `ev-${Date.now()}-${idx}`,
        itemId: itemId,
        title: activeModalItem.item.title + (uploadedFiles.length > 1 ? ` (Tệp ${idx + 1}/${uploadedFiles.length})` : '') + (evidenceContent ? `: ${evidenceContent.slice(0, 35)}` : ''),
        url: file.preview,
        type: file.type,
        fileName: file.name,
        fileSize: file.size,
        note: evidenceContent || activeModalItem.item.evidenceRequired,
        uploadedAt: new Date().toLocaleString('vi-VN')
      }));
    } else if (evidenceContent.trim()) {
      newEvidences = [{
        id: `ev-${Date.now()}`,
        itemId: itemId,
        title: activeModalItem.item.title + `: ${evidenceContent.slice(0, 35)}`,
        url: '',
        type: 'text',
        fileName: 'Giai_trinh_thanh_tich.txt',
        note: evidenceContent,
        uploadedAt: new Date().toLocaleString('vi-VN')
      }];
    }

    if (newEvidences.length === 0) return;

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
        [stdCode]: [...existingList, ...newEvidences]
      },
      criteriaStatus: {
        ...(student.criteriaStatus || {}),
        [stdCode]: {
          status: 'pending',
          note: `Đã nộp ${newEvidences.length} minh chứng mới - Chờ thẩm định`,
          date: new Date().toISOString().split('T')[0]
        }
      }
    };

    onUpdateStudent(updatedStudent);
    setActiveModalItem(null);
    setUploadedFiles([]);
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
              src={student.avatar || DEFAULT_AVATAR} 
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
            <div style={{ marginTop: '2px' }}>Hội đồng xét chọn: <strong style={{ color: 'var(--primary)' }}>Hội sinh viên trường Đại học Hùng Vương</strong></div>
          </div>
        </div>

        {/* Basic Student Info Details - Gọn gàng, khoa học, khắc phục chữ dài */}
        <div style={{
          marginTop: '16px',
          paddingTop: '16px',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          fontSize: '0.85rem'
        }}>
          {/* Hàng 1: Ngày sinh, Dân tộc, Điện thoại, Email (4 cột cân đối) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '10px 18px',
            alignItems: 'center'
          }}>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Ngày sinh: </span>
              <strong style={{ color: 'var(--text-main)' }}>{student.dob}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Dân tộc: </span>
              <strong style={{ color: 'var(--text-main)' }}>{student.ethnicity}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Điện thoại: </span>
              <strong style={{ color: 'var(--text-main)' }}>{student.phone}</strong>
            </div>
            <div style={{ wordBreak: 'break-all' }}>
              <span style={{ color: 'var(--text-muted)' }}>Email: </span>
              <strong style={{ color: 'var(--text-main)' }}>{student.email}</strong>
            </div>
          </div>

          {/* Hàng 2: Chức vụ Đoàn, Hội & Đảng viên (Ưu tiên không gian rộng cho Chức vụ dài) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '10px 20px',
            background: 'var(--bg-subtle)',
            padding: '10px 16px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: '1 1 320px' }}>
              <span style={{ color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>Chức vụ Đoàn, Hội:</span>
              <span style={{
                fontWeight: '700',
                color: 'var(--primary)',
                background: 'var(--primary-light)',
                padding: '3px 12px',
                borderRadius: '6px',
                display: 'inline-block',
                lineHeight: '1.4'
              }}>
                {student.position || 'Hội viên'}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}>
              <span style={{ color: 'var(--text-muted)' }}>Đảng viên:</span>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '2px 12px',
                borderRadius: '12px',
                fontSize: '0.8rem',
                fontWeight: '700',
                background: student.unionStatus?.toLowerCase().includes('đảng') || student.isPartyMember === 'Có' 
                  ? 'rgba(16, 185, 129, 0.12)' 
                  : 'var(--bg-card)',
                color: student.unionStatus?.toLowerCase().includes('đảng') || student.isPartyMember === 'Có' 
                  ? 'var(--success)' 
                  : 'var(--text-muted)',
                border: `1px solid ${student.unionStatus?.toLowerCase().includes('đảng') || student.isPartyMember === 'Có' ? 'rgba(16, 185, 129, 0.4)' : 'var(--border-color)'}`
              }}>
                {student.unionStatus?.toLowerCase().includes('đảng') ? 'Có' : (student.isPartyMember || 'Không')}
              </span>
            </div>
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

      {/* Mục lưu dưới cuối cùng sau khi tải các minh chứng xong */}
      <div className="card" style={{
        marginTop: '32px',
        padding: '28px 32px',
        borderRadius: 'var(--radius-xl)',
        background: 'linear-gradient(135deg, var(--bg-card) 0%, rgba(0, 91, 170, 0.05) 100%)',
        border: '2px solid var(--border-color)',
        boxShadow: 'var(--shadow-md)'
      }}>
        {submissionSuccessBanner && (
          <div style={{
            background: '#ecfdf5',
            border: '1px solid #10b981',
            borderRadius: '12px',
            padding: '16px 20px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            animation: 'fadeIn 0.3s ease'
          }}>
            <CheckCircle2 size={24} color="#059669" />
            <div>
              <h4 style={{ margin: 0, color: '#065f46', fontSize: '0.98rem', fontWeight: '800' }}>
                Đã lưu và nộp toàn bộ hồ sơ minh chứng thành công!
              </h4>
              <p style={{ margin: '2px 0 0', color: '#047857', fontSize: '0.84rem' }}>
                Hồ sơ xét chọn Danh hiệu Sinh viên 5 tốt của bạn đã được cập nhật gửi tới Ban Thẩm định Hội Sinh viên trường.
              </p>
            </div>
          </div>
        )}

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <span style={{
              display: 'inline-block',
              fontSize: '0.78rem',
              fontWeight: '800',
              textTransform: 'uppercase',
              color: 'var(--primary)',
              letterSpacing: '0.06em',
              marginBottom: '4px'
            }}>
              Mục Lưu Cuối Cùng • Hoàn tất hồ sơ
            </span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: 'var(--text-main)', margin: '0 0 6px 0' }}>
              Lưu & Nộp toàn bộ hồ sơ xét chọn SV5T
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', margin: 0, maxWidth: '650px', lineHeight: '1.5' }}>
              Sau khi tải và lưu tất cả các minh chứng cho các tiêu chuẩn, sinh viên bấm nút bên cạnh để hoàn tất lưu trữ và gửi hồ sơ chính thức tới Hội đồng thẩm định xét duyệt.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'right', marginRight: '4px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Tổng minh chứng đã tải:</div>
              <div style={{ fontSize: '1.2rem', fontWeight: '900', color: 'var(--primary)' }}>
                {Object.values(student.evidences || {}).reduce((acc, curr) => acc + (curr?.length || 0), 0)} tệp
              </div>
            </div>

            <button 
              type="button"
              className="btn btn-primary btn-lg"
              onClick={() => {
                const updatedStudent = {
                  ...student,
                  submittedDate: new Date().toLocaleString('vi-VN'),
                  overallStatus: 'pending'
                };
                onUpdateStudent(updatedStudent);
                setSubmissionSuccessBanner(true);
                try {
                  confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                  });
                } catch {
                  // ignore
                }
                setTimeout(() => setSubmissionSuccessBanner(false), 8000);
              }}
              style={{
                padding: '14px 28px',
                fontSize: '0.98rem',
                fontWeight: '800',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <Save size={18} />
              <span>LƯU & NỘP TOÀN BỘ HỒ SƠ</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal: Tải lên minh chứng mới (Cho phép nhiều tệp) */}
      {activeModalItem && (
        <div className="modal-overlay" onClick={() => setActiveModalItem(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
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
                  <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>
                      Tệp minh chứng đính kèm (Ảnh chụp/scan, bằng khen, chứng chỉ, bảng điểm) <span className="required">*</span>
                    </span>
                    {uploadedFiles.length > 0 && (
                      <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: '700' }}>
                        Đã chọn {uploadedFiles.length} tệp
                      </span>
                    )}
                  </label>

                  {/* Hidden file input with multiple selection */}
                  <input 
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileInputChange}
                    accept="image/png,image/jpeg,image/jpg,image/webp,application/pdf"
                    multiple
                    style={{ display: 'none' }}
                  />

                  {uploadedFiles.length === 0 ? (
                    <div 
                      style={{
                        border: isDragging ? '2px dashed var(--primary)' : '2px dashed var(--border-color)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '28px 20px',
                        textAlign: 'center',
                        background: isDragging ? 'rgba(0, 91, 170, 0.05)' : 'var(--bg-subtle)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: 'rgba(0, 91, 170, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 10px',
                        color: 'var(--primary)'
                      }}>
                        <Upload size={24} />
                      </div>

                      <p style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '4px' }}>
                        Bấm vào đây để chọn ảnh từ máy tính hoặc điện thoại
                      </p>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
                        Hoặc kéo thả ảnh chứng chỉ, giấy chứng nhận vào đây (Hỗ trợ chọn nhiều tệp: JPG, PNG, WEBP, PDF tối đa 20MB)
                      </p>

                      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                        <button 
                          type="button" 
                          className="btn btn-primary btn-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            fileInputRef.current?.click();
                          }}
                        >
                          <ImageIcon size={15} />
                          <span>Chọn ảnh minh chứng</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Multiple Uploaded Files List */
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '240px', overflowY: 'auto', paddingRight: '4px' }}>
                        {uploadedFiles.map((file) => (
                          <div 
                            key={file.id}
                            style={{
                              border: '1px solid var(--border-color)',
                              borderRadius: 'var(--radius-md)',
                              padding: '10px 14px',
                              background: 'var(--bg-card)',
                              boxShadow: 'var(--shadow-xs)',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '12px'
                            }}
                          >
                            {file.type === 'image' ? (
                              <img 
                                src={file.preview} 
                                alt={file.name} 
                                style={{
                                  width: '48px',
                                  height: '48px',
                                  borderRadius: '6px',
                                  objectFit: 'cover',
                                  border: '1px solid var(--border-color)',
                                  flexShrink: 0
                                }}
                              />
                            ) : (
                              <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '6px',
                                background: '#fee2e2',
                                color: '#dc2626',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                              }}>
                                <FileText size={20} />
                                <span style={{ fontSize: '0.62rem', fontWeight: '800', marginTop: '1px' }}>PDF</span>
                              </div>
                            )}

                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                                <CheckCircle2 size={15} color="var(--success)" />
                                <span style={{ fontSize: '0.84rem', fontWeight: '700', color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                  {file.name}
                                </span>
                              </div>
                              <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', margin: 0 }}>
                                Dung lượng: {file.size} • Sẵn sàng lưu
                              </p>
                            </div>

                            <button 
                              type="button" 
                              className="btn btn-outline btn-sm"
                              onClick={() => handleRemoveUploadedFile(file.id)}
                              style={{ padding: '6px 8px', fontSize: '0.76rem', color: 'var(--danger)', borderColor: 'var(--danger)', flexShrink: 0 }}
                              title="Xóa tệp này"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Button to add more files */}
                      <button 
                        type="button" 
                        className="btn btn-outline btn-sm"
                        onClick={() => fileInputRef.current?.click()}
                        style={{ alignSelf: 'flex-start', marginTop: '4px', gap: '6px' }}
                      >
                        <Plus size={14} />
                        <span>Chọn thêm tệp khác</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setActiveModalItem(null)}>
                  Đóng
                </button>
                <button type="submit" className="btn btn-primary" disabled={uploadedFiles.length === 0 && !evidenceContent.trim()}>
                  <span>Lưu {uploadedFiles.length > 1 ? `${uploadedFiles.length} ` : ''}minh chứng</span>
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
