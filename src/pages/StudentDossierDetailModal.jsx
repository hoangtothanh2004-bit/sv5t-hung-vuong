import React, { useState } from 'react';
import { 
  X, 
  CheckCircle, 
  AlertCircle, 
  Award, 
  GraduationCap, 
  Activity, 
  HeartHandshake, 
  Globe, 
  ShieldCheck, 
  Eye, 
  Save, 
  User, 
  Sparkles,
  Phone,
  Mail,
  BookOpen
} from 'lucide-react';
import { STANDARDS } from '../data/criteriaData';
import EvidenceModal from '../components/EvidenceModal';
import confetti from 'canvas-confetti';

export default function StudentDossierDetailModal({ student, onClose, onUpdateStudent }) {
  const [activeEvidence, setActiveEvidence] = useState(null);
  const [evidenceStandardName, setEvidenceStandardName] = useState('');
  const [criteriaEdits, setCriteriaEdits] = useState({ ...student.criteriaStatus });
  const [feedbackNote, setFeedbackNote] = useState('');

  if (!student) return null;

  const handleStatusChange = (stdCode, newStatus) => {
    setCriteriaEdits(prev => ({
      ...prev,
      [stdCode]: {
        ...prev[stdCode],
        status: newStatus,
        date: new Date().toISOString().split('T')[0],
        verifiedBy: 'Hội đồng HVU'
      }
    }));
  };

  const handleNoteChange = (stdCode, noteText) => {
    setCriteriaEdits(prev => ({
      ...prev,
      [stdCode]: {
        ...prev[stdCode],
        note: noteText
      }
    }));
  };

  const handleSaveAll = () => {
    const approvedCount = Object.values(criteriaEdits).filter(c => c.status === 'approved').length;
    const isFull = approvedCount === 5;

    const updated = {
      ...student,
      criteriaStatus: criteriaEdits,
      overallStatus: isFull ? 'approved' : 'pending'
    };

    onUpdateStudent(updated);

    if (isFull) {
      try {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
      } catch (e) {
        console.log(e);
      }
    }

    onClose();
  };

  const approvedCount = Object.values(criteriaEdits).filter(c => c.status === 'approved').length;
  const isFullApproved = approvedCount === 5;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-card modal-card-lg" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: '94vh', display: 'flex', flexDirection: 'column' }}
      >
        {/* Header */}
        <div className="modal-header" style={{ background: 'var(--bg-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <img 
              src={student.avatar} 
              alt={student.name}
              style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--primary)' }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>{student.name}</h3>
                <span className={`badge ${student.gpa >= 3.6 ? 'badge-gpa-high' : 'badge-gpa'}`}>
                  GPA: {student.gpa}
                </span>
                <span className="badge" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
                  ĐRL: {student.drl}
                </span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                MSSV: <strong>{student.studentCode}</strong> • {student.className} • {student.facultyName}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>
                Tiến độ xét chọn
              </span>
              <div style={{ fontSize: '1.2rem', fontWeight: '900', color: isFullApproved ? 'var(--success)' : 'var(--primary)' }}>
                {approvedCount}/5 Tiêu chuẩn Đạt
              </div>
            </div>
            <button className="modal-close-btn" onClick={onClose}>
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Body: 5 Standards Review */}
        <div className="modal-body" style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {STANDARDS.map((std, idx) => {
              const currentStatus = criteriaEdits[std.code] || { status: 'pending', note: '' };
              const evidences = student.evidences[std.code] || [];
              const isApproved = currentStatus.status === 'approved';

              return (
                <div 
                  key={std.id}
                  style={{
                    background: 'var(--bg-subtle)',
                    border: `1px solid ${isApproved ? 'var(--success)' : 'var(--border-color)'}`,
                    borderRadius: 'var(--radius-lg)',
                    padding: '16px 20px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {/* Standard Header */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '10px',
                    marginBottom: '12px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: `${std.color}20`,
                        color: std.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '800'
                      }}>
                        {idx + 1}
                      </div>
                      <div>
                        <strong style={{ fontSize: '0.98rem', color: 'var(--text-main)' }}>
                          Tiêu chuẩn {idx + 1}: {std.name}
                        </strong>
                        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          {std.summary}
                        </p>
                      </div>
                    </div>

                    {/* Decision Buttons for this standard */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <button 
                        type="button"
                        onClick={() => handleStatusChange(std.code, 'approved')}
                        className={`btn btn-sm ${currentStatus.status === 'approved' ? 'btn-success' : 'btn-outline'}`}
                      >
                        <CheckCircle size={14} />
                        <span>Đạt</span>
                      </button>

                      <button 
                        type="button"
                        onClick={() => handleStatusChange(std.code, 'needs_evidence')}
                        className={`btn btn-sm ${currentStatus.status === 'needs_evidence' ? 'btn-warning' : 'btn-outline'}`}
                        style={{
                          background: currentStatus.status === 'needs_evidence' ? 'var(--gold)' : 'transparent',
                          color: currentStatus.status === 'needs_evidence' ? '#000' : 'inherit'
                        }}
                      >
                        <AlertCircle size={14} />
                        <span>Yêu cầu bổ sung</span>
                      </button>

                      <button 
                        type="button"
                        onClick={() => handleStatusChange(std.code, 'rejected')}
                        className={`btn btn-sm ${currentStatus.status === 'rejected' ? 'btn-danger' : 'btn-outline'}`}
                      >
                        <X size={14} />
                        <span>Không đạt</span>
                      </button>
                    </div>
                  </div>

                  {/* Evidence Items Thumbnails */}
                  <div style={{ marginBottom: '10px' }}>
                    <span style={{ fontSize: '0.76rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      Minh chứng đính kèm ({evidences.length}):
                    </span>

                    {evidences.length === 0 ? (
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', fontStyle: 'italic', marginTop: '4px' }}>
                        Sinh viên chưa tải tệp minh chứng cho tiêu chuẩn này.
                      </p>
                    ) : (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '6px' }}>
                        {evidences.map((ev, eIdx) => (
                          <div 
                            key={ev.id || eIdx}
                            onClick={() => {
                              setActiveEvidence(ev);
                              setEvidenceStandardName(`Tiêu chuẩn ${idx + 1}: ${std.name}`);
                            }}
                            style={{
                              background: 'var(--bg-surface)',
                              border: '1px solid var(--border-color)',
                              borderRadius: 'var(--radius-md)',
                              padding: '6px 10px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              cursor: 'pointer',
                              maxWidth: '280px'
                            }}
                          >
                            <img 
                              src={ev.url} 
                              alt={ev.title} 
                              style={{ width: '28px', height: '28px', borderRadius: '4px', objectFit: 'cover' }}
                            />
                            <span style={{ fontSize: '0.78rem', fontWeight: '600', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {ev.title}
                            </span>
                            <Eye size={13} color="var(--primary)" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Lecturer Reviewer Note input */}
                  <div>
                    <input 
                      type="text" 
                      className="input-control" 
                      style={{ fontSize: '0.82rem', padding: '6px 10px' }}
                      placeholder="Ghi chú nhận xét của Hội đồng thẩm định (ví dụ: Đã xác thực bằng cấp; Ảnh chụp mờ...)"
                      value={currentStatus.note || ''}
                      onChange={(e) => handleNoteChange(std.code, e.target.value)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
          <div>
            <button 
              className="btn btn-outline btn-sm"
              onClick={() => {
                ['TC1', 'TC2', 'TC3', 'TC4', 'TC5'].forEach(c => handleStatusChange(c, 'approved'));
              }}
            >
              <Sparkles size={15} color="var(--gold)" />
              <span>Duyệt Đạt trọn bộ 5 tiêu chuẩn</span>
            </button>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn btn-outline" onClick={onClose}>
              Đóng
            </button>
            <button className="btn btn-primary btn-lg" onClick={handleSaveAll}>
              <Save size={16} />
              <span>Lưu kết quả thẩm định</span>
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeEvidence && (
        <EvidenceModal 
          evidence={activeEvidence}
          student={student}
          standardName={evidenceStandardName}
          onClose={() => setActiveEvidence(null)}
        />
      )}
    </div>
  );
}
