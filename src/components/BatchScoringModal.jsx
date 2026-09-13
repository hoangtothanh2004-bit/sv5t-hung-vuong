import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle, Sparkles, Check, Users, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { STANDARDS } from '../data/criteriaData';

export default function BatchScoringModal({ 
  selectedStudents, 
  onClose, 
  onConfirmBatchScore,
  defaultStandard = 'TC2' // Defaults to TC2 (Học tập tốt) matching user's GPA scenario!
}) {
  const [targetStandard, setTargetStandard] = useState(defaultStandard);
  const [targetStatus, setTargetStatus] = useState('approved');
  const [note, setNote] = useState('Đạt chuẩn tự động theo tiêu chí GPA Giỏi/Xuất sắc xét đợt 2025-2026');

  const QUICK_NOTES = [
    'Đạt chuẩn tự động theo tiêu chí GPA Giỏi/Xuất sắc (>= 3.20)',
    'Đạt chuẩn Rèn luyện Xuất sắc năm học 2024-2025 (>= 90 điểm)',
    'Đã đối soát chứng chỉ Ngoại ngữ chuẩn đầu ra hợp lệ',
    'Hoàn thành xuất sắc Chiến dịch Tình nguyện & Hiến máu',
    'Đạt danh hiệu Thanh niên khỏe cấp trường',
    'Hồ sơ minh chứng đầy đủ, hợp lệ theo quy chế Đoàn trường'
  ];

  const handleApply = () => {
    onConfirmBatchScore({
      studentIds: selectedStudents.map(s => s.id),
      standardCode: targetStandard,
      status: targetStatus,
      note: note.trim() || 'Thẩm định hàng loạt cấp trường'
    });

    // Celebratory confetti animation on approval!
    if (targetStatus === 'approved') {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.log(e);
      }
    }

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-card" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '640px' }}
      >
        {/* Header */}
        <div className="modal-header" style={{ background: 'linear-gradient(135deg, #003766 0%, #005baa 100%)', color: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Sparkles size={22} color="#ffcc00" />
            </div>
            <div>
              <h3 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: '800' }}>
                Chấm Thẩm Định Hàng Loạt
              </h3>
              <p style={{ fontSize: '0.82rem', opacity: 0.9 }}>
                Áp dụng kết quả cùng lúc cho <strong>{selectedStudents.length} sinh viên</strong> đã chọn
              </p>
            </div>
          </div>

          <button className="modal-close-btn" onClick={onClose} style={{ color: '#fff' }}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Selected Students Preview Strip */}
          <div style={{
            background: 'var(--bg-subtle)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '12px 16px',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)' }}>
                DANH SÁCH ỨNG VIÊN ĐƯỢC CHẤM ({selectedStudents.length}):
              </span>
              <span className="badge badge-gpa">
                {selectedStudents.filter(s => s.gpa >= 3.2).length} sinh viên GPA Giỏi
              </span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', maxHeight: '85px', overflowY: 'auto' }}>
              {selectedStudents.map(s => (
                <span 
                  key={s.id} 
                  style={{
                    fontSize: '0.76rem',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-color)',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-sm)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <strong>{s.name}</strong> 
                  <span style={{ color: 'var(--primary)', fontWeight: '600' }}>({s.gpa})</span>
                </span>
              ))}
            </div>
          </div>

          {/* Form Step 1: Choose Standard */}
          <div className="form-group" style={{ marginBottom: '18px' }}>
            <label className="form-label">
              1. Chọn tiêu chuẩn cần chấm hàng loạt:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {STANDARDS.map(st => (
                <button
                  key={st.code}
                  type="button"
                  onClick={() => {
                    setTargetStandard(st.code);
                    if (st.code === 'TC2') setNote('Đạt chuẩn tự động theo tiêu chí GPA Giỏi/Xuất sắc (>= 3.20)');
                    else if (st.code === 'TC1') setNote('Đạt chuẩn Rèn luyện Xuất sắc năm học 2024-2025 (>= 90 điểm)');
                    else if (st.code === 'TC5') setNote('Đã đối soát chứng chỉ Ngoại ngữ chuẩn đầu ra hợp lệ');
                    else if (st.code === 'TC4') setNote('Hoàn thành xuất sắc Chiến dịch Tình nguyện & Hiến máu');
                    else if (st.code === 'TC3') setNote('Đạt danh hiệu Thanh niên khỏe cấp trường');
                  }}
                  style={{
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: targetStandard === st.code ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                    background: targetStandard === st.code ? 'var(--primary-light)' : 'var(--bg-subtle)',
                    color: targetStandard === st.code ? 'var(--primary)' : 'var(--text-main)',
                    fontWeight: targetStandard === st.code ? '700' : '500',
                    fontSize: '0.84rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span>{st.code}: {st.name}</span>
                  {targetStandard === st.code && <Check size={16} />}
                </button>
              ))}

              <button
                type="button"
                onClick={() => {
                  setTargetStandard('ALL');
                  setNote('Hồ sơ xuất sắc, duyệt Đạt toàn bộ 5/5 tiêu chuẩn Sinh viên 5 Tốt');
                }}
                style={{
                  gridColumn: 'span 2',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: targetStandard === 'ALL' ? '2px solid var(--gold)' : '1px solid var(--border-color)',
                  background: targetStandard === 'ALL' ? 'var(--gold-light)' : 'var(--bg-subtle)',
                  color: targetStandard === 'ALL' ? '#92400e' : 'var(--text-main)',
                  fontWeight: targetStandard === 'ALL' ? '700' : '500',
                  fontSize: '0.84rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span>🌟 Tất cả 5 Tiêu chuẩn (Duyệt Đạt danh hiệu hoàn tất)</span>
                {targetStandard === 'ALL' && <Check size={16} />}
              </button>
            </div>
          </div>

          {/* Form Step 2: Choose Decision */}
          <div className="form-group" style={{ marginBottom: '18px' }}>
            <label className="form-label">
              2. Quyết định thẩm định:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setTargetStatus('approved')}
                style={{
                  padding: '10px',
                  borderRadius: 'var(--radius-md)',
                  border: targetStatus === 'approved' ? '2px solid var(--success)' : '1px solid var(--border-color)',
                  background: targetStatus === 'approved' ? 'var(--success-light)' : 'var(--bg-subtle)',
                  color: targetStatus === 'approved' ? '#065f46' : 'var(--text-main)',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <CheckCircle size={16} />
                <span>Duyệt ĐẠT</span>
              </button>

              <button
                type="button"
                onClick={() => setTargetStatus('needs_evidence')}
                style={{
                  padding: '10px',
                  borderRadius: 'var(--radius-md)',
                  border: targetStatus === 'needs_evidence' ? '2px solid var(--gold)' : '1px solid var(--border-color)',
                  background: targetStatus === 'needs_evidence' ? 'var(--gold-light)' : 'var(--bg-subtle)',
                  color: targetStatus === 'needs_evidence' ? '#92400e' : 'var(--text-main)',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <AlertCircle size={16} />
                <span>Yêu cầu bổ sung</span>
              </button>

              <button
                type="button"
                onClick={() => setTargetStatus('rejected')}
                style={{
                  padding: '10px',
                  borderRadius: 'var(--radius-md)',
                  border: targetStatus === 'rejected' ? '2px solid var(--danger)' : '1px solid var(--border-color)',
                  background: targetStatus === 'rejected' ? 'var(--danger-light)' : 'var(--bg-subtle)',
                  color: targetStatus === 'rejected' ? '#991b1b' : 'var(--text-main)',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <X size={16} />
                <span>Không đạt</span>
              </button>
            </div>
          </div>

          {/* Form Step 3: Note & Quick Reason Templates */}
          <div className="form-group">
            <label className="form-label">
              3. Ghi chú lý do thẩm định:
            </label>
            <input 
              type="text" 
              className="input-control" 
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Nhập lý do thẩm định hoặc chọn mẫu nhanh bên dưới..."
            />

            <div style={{ marginTop: '8px' }}>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                Mẫu lý do nhanh (click để điền):
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                {QUICK_NOTES.map((qn, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setNote(qn)}
                    style={{
                      fontSize: '0.75rem',
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-subtle)',
                      color: 'var(--text-muted)',
                      cursor: 'pointer'
                    }}
                  >
                    + {qn.slice(0, 38)}...
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onClose}>
            Hủy bỏ
          </button>
          <button 
            className="btn btn-gradient btn-lg" 
            onClick={handleApply}
            style={{ fontWeight: '700', gap: '10px' }}
          >
            <span>Xác nhận chấm cho {selectedStudents.length} sinh viên</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
