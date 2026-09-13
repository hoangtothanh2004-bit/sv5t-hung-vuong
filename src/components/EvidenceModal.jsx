import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut, RotateCw, Download, CheckCircle, AlertCircle, FileText } from 'lucide-react';

export default function EvidenceModal({ evidence, student, standardName, onClose, onVerifyEvidence }) {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  if (!evidence) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-card modal-card-lg" 
        onClick={(e) => e.stopPropagation()}
        style={{ display: 'flex', flexDirection: 'column', maxHeight: '92vh' }}
      >
        {/* Header */}
        <div className="modal-header">
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase' }}>
              Minh chứng đối soát • {standardName || 'Tiêu chuẩn SV5T'}
            </span>
            <h3 style={{ marginTop: '2px' }}>{evidence.title}</h3>
            {student && (
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Sinh viên: <strong>{student.name}</strong> • MSSV: {student.studentCode} • {student.className}
              </p>
            )}
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Toolbar */}
        <div style={{
          padding: '10px 24px',
          background: 'var(--bg-subtle)',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button 
              className="btn btn-outline btn-sm"
              onClick={() => setZoom(prev => Math.min(prev + 0.25, 2.5))}
              title="Phóng to"
            >
              <ZoomIn size={15} />
              <span>Phóng to</span>
            </button>
            <button 
              className="btn btn-outline btn-sm"
              onClick={() => setZoom(prev => Math.max(prev - 0.25, 0.5))}
              title="Thu nhỏ"
            >
              <ZoomOut size={15} />
              <span>Thu nhỏ</span>
            </button>
            <button 
              className="btn btn-outline btn-sm"
              onClick={() => setRotation(prev => (prev + 90) % 360)}
              title="Xoay 90 độ"
            >
              <RotateCw size={15} />
              <span>Xoay</span>
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <a 
              href={evidence.url} 
              target="_blank" 
              rel="noreferrer" 
              download 
              className="btn btn-subtle btn-sm"
            >
              <Download size={15} />
              <span>Tải bản gốc</span>
            </a>
          </div>
        </div>

        {/* Viewer Body */}
        <div style={{
          flex: 1,
          padding: '24px',
          overflow: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0,0,0,0.03)',
          minHeight: '380px'
        }}>
          <div style={{
            transform: `scale(${zoom}) rotate(${rotation}deg)`,
            transition: 'transform 0.2s ease',
            maxWidth: '100%',
            boxShadow: 'var(--shadow-lg)',
            borderRadius: '8px',
            overflow: 'hidden',
            background: '#fff'
          }}>
            <img 
              src={evidence.url} 
              alt={evidence.title}
              style={{
                display: 'block',
                maxWidth: '100%',
                maxHeight: '520px',
                objectFit: 'contain'
              }}
            />
          </div>
        </div>

        {/* Footer Notes & Status */}
        <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Ghi chú của SV: <em>{evidence.note || 'Đã đính kèm đầy đủ minh chứng hợp lệ theo hướng dẫn.'}</em>
            </span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-outline btn-sm" onClick={onClose}>
              Đóng
            </button>
            {onVerifyEvidence && (
              <button 
                className="btn btn-success btn-sm"
                onClick={() => {
                  onVerifyEvidence(evidence.id, 'approved');
                  onClose();
                }}
              >
                <CheckCircle size={15} />
                <span>Xác nhận Minh chứng Đạt</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
