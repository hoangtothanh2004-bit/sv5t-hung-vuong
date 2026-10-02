import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle, Sparkles, Check, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { STANDARDS, COLLECTIVE_STANDARDS, STAR_JAN_STANDARDS } from '../data/criteriaData';

export default function BatchScoringModal({ 
  selectedStudents, 
  onClose, 
  onConfirmBatchScore,
  defaultStandard = 'TC2',
  category = 'sv5t'
}) {
  const getStandards = () => {
    if (category === 'tt5t') return COLLECTIVE_STANDARDS;
    if (category === 'stg') return STAR_JAN_STANDARDS;
    return STANDARDS;
  };

  const currentStandards = getStandards();
  const initialTargetStandard = currentStandards.some(s => s.code === defaultStandard) 
    ? defaultStandard 
    : currentStandards[0]?.code || 'ALL';

  const [targetStandard, setTargetStandard] = useState(initialTargetStandard);
  const [targetStatus, setTargetStatus] = useState('approved');
  
  const getInitialNote = () => {
    if (category === 'tt5t') return 'Tập thể hoàn thành xuất sắc các chỉ tiêu thi đua năm học';
    if (category === 'stg') return 'Cán bộ Đoàn - Hội hoàn thành xuất sắc nhiệm vụ công tác';
    return 'Đạt chuẩn tự động theo tiêu chí GPA Giỏi/Xuất sắc (>= 3.20)';
  };

  const [note, setNote] = useState(getInitialNote);

  const QUICK_NOTES = category === 'tt5t' ? [
    'Tập thể hoàn thành xuất sắc các chỉ tiêu thi đua năm học',
    '100% đoàn viên, hội viên không vi phạm kỷ luật',
    'Đạt và vượt chỉ tiêu tỷ lệ sinh viên đạt danh hiệu SV5T',
    'Tập thể có nhiều thành tích nổi bật trong học tập & NCKH',
    'Hồ sơ minh chứng đầy đủ, có xác nhận hợp lệ của Khoa'
  ] : category === 'stg' ? [
    'Cán bộ Đoàn - Hội hoàn thành xuất sắc nhiệm vụ công tác',
    'Đạt thành tích học tập loại Giỏi/Xuất sắc và ĐRL Xuất sắc',
    'Có bằng khen/giấy khen thành tích công tác Đoàn - Hội tiêu biểu',
    'Giữ chức vụ cán bộ chủ chốt từ 1 năm học trở lên',
    'Hồ sơ minh chứng đầy đủ, hợp lệ theo quy chế xét chọn'
  ] : [
    'Đạt chuẩn tự động theo tiêu chí GPA Giỏi/Xuất sắc (>= 3.20)',
    'Đạt chuẩn rèn luyện Xuất sắc năm học (>= 90 điểm)',
    'Đã đối soát chứng chỉ ngoại ngữ B1 hợp lệ',
    'Hoàn thành xuất sắc hoạt động tình nguyện theo quy định',
    'Đạt danh hiệu Sinh viên khỏe cấp trường',
    'Hồ sơ minh chứng đầy đủ, hợp lệ theo quy chế'
  ];

  const handleApply = () => {
    onConfirmBatchScore({
      studentIds: selectedStudents.map(s => s.id),
      standardCode: targetStandard,
      status: targetStatus,
      note: note.trim() || 'Thẩm định hàng loạt cấp trường'
    });

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

  const entityName = category === 'tt5t' ? 'tập thể' : (category === 'stg' ? 'cán bộ' : 'sinh viên');

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
                Chấm thẩm định hàng loạt
              </h3>
              <p style={{ fontSize: '0.82rem', opacity: 0.9 }}>
                Áp dụng kết quả cùng lúc cho <strong>{selectedStudents.length} {entityName}</strong> đã chọn
              </p>
            </div>
          </div>

          <button className="modal-close-btn" onClick={onClose} style={{ color: '#fff' }}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Selected Preview Strip */}
          <div style={{
            background: 'var(--bg-subtle)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '12px 16px',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)' }}>
                DANH SÁCH {entityName.toUpperCase()} ĐƯỢC CHỌN ({selectedStudents.length}):
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
                  <strong>{s.name || s.shortName}</strong>
                  {s.className && <span style={{ color: 'var(--text-muted)' }}>({s.className})</span>}
                  {s.gpa && <span style={{ color: 'var(--primary)', fontWeight: '600' }}>• GPA: {s.gpa}</span>}
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
              {currentStandards.map(st => (
                <button
                  key={st.code}
                  type="button"
                  onClick={() => {
                    setTargetStandard(st.code);
                    if (st.code === 'TC2') setNote('Đạt chuẩn tự động theo tiêu chí GPA Giỏi/Xuất sắc (>= 3.20)');
                    else if (st.code === 'TC1') setNote('Đạt chuẩn Rèn luyện Xuất sắc năm học (>= 90 điểm)');
                    else if (st.code === 'TT1') setNote('100% đoàn viên, sinh viên chấp hành tốt kỷ luật');
                    else if (st.code === 'TT2') setNote('Đạt và vượt chỉ tiêu tỷ lệ sinh viên đạt danh hiệu SV5T');
                    else if (st.code === 'TT3') setNote('Tập thể có kết quả học tập và NCKH đạt chuẩn');
                    else if (st.code === 'STG1') setNote('Cán bộ Đoàn - Hội hoàn thành xuất sắc nhiệm vụ công tác');
                    else if (st.code === 'STG2') setNote('GPA và ĐRL đạt chuẩn danh hiệu Sao Tháng Giêng');
                    else if (st.code === 'STG3') setNote('Đạt thành tích khen thưởng tiêu biểu công tác Đoàn - Hội');
                    else setNote(`Hội đồng thẩm định phê duyệt tiêu chuẩn ${st.code}`);
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
                  {targetStandard === st.code && <Check size={16} color="var(--primary)" />}
                </button>
              ))}

              {/* Option to approve ALL standards simultaneously */}
              <button
                type="button"
                onClick={() => {
                  setTargetStandard('ALL');
                  setNote('Hội đồng xét chọn phê duyệt hoàn thành tất cả các tiêu chuẩn');
                }}
                style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: targetStandard === 'ALL' ? '2px solid var(--gold)' : '1px solid var(--border-color)',
                  background: targetStandard === 'ALL' ? 'rgba(245, 158, 11, 0.15)' : 'var(--bg-subtle)',
                  color: targetStandard === 'ALL' ? '#d97706' : 'var(--text-main)',
                  fontWeight: targetStandard === 'ALL' ? '800' : '500',
                  fontSize: '0.84rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gridColumn: 'span 2'
                }}
              >
                <span>⭐ DUYỆT TẤT CẢ CÁC TIÊU CHUẨN CÙNG LÚC</span>
                {targetStandard === 'ALL' && <Check size={16} color="#d97706" />}
              </button>
            </div>
          </div>

          {/* Form Step 2: Choose Decision */}
          <div className="form-group" style={{ marginBottom: '18px' }}>
            <label className="form-label">
              2. Kết luận thẩm định:
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setTargetStatus('approved')}
                className={`btn ${targetStatus === 'approved' ? 'btn-success' : 'btn-outline'}`}
                style={{ flex: 1, padding: '10px' }}
              >
                <CheckCircle size={16} />
                <span>Đạt chuẩn (Phê duyệt)</span>
              </button>

              <button
                type="button"
                onClick={() => setTargetStatus('needs_evidence')}
                className={`btn ${targetStatus === 'needs_evidence' ? 'btn-warning' : 'btn-outline'}`}
                style={{ 
                  flex: 1, 
                  padding: '10px',
                  background: targetStatus === 'needs_evidence' ? 'var(--gold)' : 'transparent',
                  color: targetStatus === 'needs_evidence' ? '#000' : 'inherit'
                }}
              >
                <AlertCircle size={16} />
                <span>Yêu cầu bổ sung</span>
              </button>

              <button
                type="button"
                onClick={() => setTargetStatus('rejected')}
                className={`btn ${targetStatus === 'rejected' ? 'btn-danger' : 'btn-outline'}`}
                style={{ flex: 1, padding: '10px' }}
              >
                <X size={16} />
                <span>Không đạt</span>
              </button>
            </div>
          </div>

          {/* Form Step 3: Note */}
          <div className="form-group">
            <label className="form-label">
              3. Ghi chú / Nhận xét của Hội đồng:
            </label>
            <input 
              type="text" 
              className="input-control" 
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Nhập nhận xét phê duyệt..."
              style={{ marginBottom: '10px' }}
            />

            {/* Quick Note Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {QUICK_NOTES.map((qn, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setNote(qn)}
                  style={{
                    background: 'var(--bg-subtle)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-full)',
                    padding: '4px 10px',
                    fontSize: '0.74rem',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    transition: 'all 0.1s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.borderColor = 'var(--primary)'}
                  onMouseLeave={(e) => e.target.style.borderColor = 'var(--border-color)'}
                >
                  + {qn}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer" style={{ justifyContent: 'flex-end', gap: '10px' }}>
          <button className="btn btn-outline" onClick={onClose}>
            Hủy bỏ
          </button>
          <button className="btn btn-primary btn-lg" onClick={handleApply}>
            <span>Xác nhận chấm ({selectedStudents.length})</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
