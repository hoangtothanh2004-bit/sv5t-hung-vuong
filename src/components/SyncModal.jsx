import React, { useState } from 'react';
import { X, Copy, Check, Download, Upload, RefreshCw, Smartphone, Monitor } from 'lucide-react';
import { generateSyncCode, restoreFromSyncCode, exportDataAsJsonFile } from '../utils/cloudSync';

export default function SyncModal({ onClose, onDataSynced }) {
  const [activeTab, setActiveTab] = useState('code'); // 'code' | 'cloud'
  const [inputCode, setInputCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [syncStatus, setSyncStatus] = useState(null);

  const handleCopyCode = () => {
    const code = generateSyncCode();
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleRestoreFromCode = (e) => {
    e.preventDefault();
    if (!inputCode.trim()) {
      setSyncStatus({ type: 'error', message: 'Vui lòng dán mã đồng bộ vào ô bên dưới!' });
      return;
    }

    const res = restoreFromSyncCode(inputCode.trim());
    if (res.success) {
      setSyncStatus({ type: 'success', message: `Đồng bộ thành công ${res.count} hồ sơ sinh viên và cài đặt hệ thống!` });
      if (onDataSynced) {
        onDataSynced();
      }
      setTimeout(() => {
        onClose();
      }, 1500);
    } else {
      setSyncStatus({ type: 'error', message: res.error || 'Mã đồng bộ không hợp lệ!' });
    }
  };

  const handleFileImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const json = JSON.parse(ev.target.result);
        if (json.students && Array.isArray(json.students)) {
          localStorage.setItem('hvu_sv5t_students_v1', JSON.stringify(json.students));
          if (json.settings) {
            localStorage.setItem('hvu_sv5t_settings_v1', JSON.stringify(json.settings));
          }
          setSyncStatus({ type: 'success', message: `Đã nạp thành công ${json.students.length} hồ sơ từ tệp JSON!` });
          if (onDataSynced) {
            onDataSynced();
          }
          setTimeout(() => onClose(), 1500);
        } else {
          setSyncStatus({ type: 'error', message: 'Tệp JSON không đúng cấu trúc dữ liệu SV5T!' });
        }
      } catch {
        setSyncStatus({ type: 'error', message: 'Không thể đọc tệp JSON. Vui lòng kiểm tra lại!' });
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '620px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'rgba(0, 91, 170, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary)'
            }}>
              <RefreshCw size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', margin: 0 }}>
                Đồng bộ dữ liệu giữa các thiết bị
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>
                Chuyển tài khoản & minh chứng giữa Máy tính, Điện thoại hoặc trình duyệt khác
              </p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Navigation tabs */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid var(--border-color)',
          background: 'var(--bg-subtle)',
          padding: '0 16px'
        }}>
          <button
            type="button"
            onClick={() => setActiveTab('code')}
            style={{
              padding: '12px 18px',
              border: 'none',
              background: 'transparent',
              fontSize: '0.86rem',
              fontWeight: activeTab === 'code' ? '700' : '500',
              color: activeTab === 'code' ? 'var(--primary)' : 'var(--text-muted)',
              borderBottom: activeTab === 'code' ? '2.5px solid var(--primary)' : '2.5px solid transparent',
              cursor: 'pointer'
            }}
          >
            Mã đồng bộ / Tệp Backup
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('cloud')}
            style={{
              padding: '12px 18px',
              border: 'none',
              background: 'transparent',
              fontSize: '0.86rem',
              fontWeight: activeTab === 'cloud' ? '700' : '500',
              color: activeTab === 'cloud' ? 'var(--primary)' : 'var(--text-muted)',
              borderBottom: activeTab === 'cloud' ? '2.5px solid var(--primary)' : '2.5px solid transparent',
              cursor: 'pointer'
            }}
          >
            Nguyên nhân & Cloud Database
          </button>
        </div>

        <div className="modal-body" style={{ padding: '20px 24px' }}>
          {syncStatus && (
            <div style={{
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '16px',
              fontSize: '0.86rem',
              background: syncStatus.type === 'success' ? '#ecfdf5' : '#fef2f2',
              border: `1px solid ${syncStatus.type === 'success' ? '#6ee7b7' : '#fca5a5'}`,
              color: syncStatus.type === 'success' ? '#065f46' : '#991b1b',
              fontWeight: '600'
            }}>
              {syncStatus.message}
            </div>
          )}

          {activeTab === 'code' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Bước 1: Lấy mã từ thiết bị hiện tại */}
              <div style={{
                background: 'var(--bg-subtle)',
                padding: '16px',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Monitor size={18} color="var(--primary)" />
                  <span style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                    Cách 1: Sao chép mã từ thiết bị đã có tài khoản / minh chứng
                  </span>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '12px', lineHeight: '1.4' }}>
                  Bấm nút bên dưới để tạo mã chứa toàn bộ danh sách tài khoản đã đăng ký và hồ sơ minh chứng hiện có:
                </p>
                
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button 
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={handleCopyCode}
                    style={{ gap: '6px' }}
                  >
                    {copied ? <Check size={15} /> : <Copy size={15} />}
                    <span>{copied ? 'Đã sao chép mã vào bộ nhớ!' : 'Sao chép mã đồng bộ'}</span>
                  </button>

                  <button 
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={exportDataAsJsonFile}
                    style={{ gap: '6px' }}
                  >
                    <Download size={15} />
                    <span>Xuất file JSON sao lưu</span>
                  </button>
                </div>
              </div>

              {/* Bước 2: Dán mã trên thiết bị mới */}
              <div style={{
                background: 'var(--bg-subtle)',
                padding: '16px',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Smartphone size={18} color="var(--primary)" />
                  <span style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                    Cách 2: Nhập mã đồng bộ vào thiết bị này
                  </span>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '10px', lineHeight: '1.4' }}>
                  Dán chuỗi mã bạn đã sao chép từ thiết bị kia vào đây để ngay lập tức cập nhật tài khoản và minh chứng:
                </p>

                <form onSubmit={handleRestoreFromCode}>
                  <textarea 
                    className="input-control"
                    rows={3}
                    placeholder="Dán mã đồng bộ Base64 vào đây..."
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    style={{ fontSize: '0.8rem', fontFamily: 'monospace', marginBottom: '10px' }}
                  />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                    <button type="submit" className="btn btn-success btn-sm" style={{ gap: '6px' }}>
                      <RefreshCw size={14} />
                      <span>Đồng bộ dữ liệu ngay</span>
                    </button>

                    <label className="btn btn-outline btn-sm" style={{ cursor: 'pointer', margin: 0, gap: '6px' }}>
                      <Upload size={14} />
                      <span>Nhập từ file JSON</span>
                      <input 
                        type="file" 
                        accept=".json,application/json" 
                        onChange={handleFileImport}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div style={{ fontSize: '0.88rem', lineHeight: '1.6', color: 'var(--text-main)' }}>
              <div style={{
                background: '#eff6ff',
                border: '1px solid #93c5fd',
                borderRadius: '10px',
                padding: '14px 18px',
                marginBottom: '16px'
              }}>
                <div style={{ fontWeight: '700', color: '#1e40af', marginBottom: '4px' }}>
                  💡 Tại sao tài khoản chưa tự động thấy ở máy khác?
                </div>
                <p style={{ margin: 0, fontSize: '0.84rem', color: '#1e3a8a' }}>
                  Website hiện được phát hành dưới dạng ứng dụng web tĩnh trên GitHub Pages. Mọi tài khoản và minh chứng nộp trước đó đang được lưu vào bộ nhớ cục bộ (<strong>LocalStorage</strong>) của từng trình duyệt. Khi bạn đổi sang máy tính khác hoặc điện thoại, máy mới chưa có dữ liệu này nên báo "chưa có tài khoản".
                </p>
              </div>

              <h4 style={{ fontSize: '0.95rem', fontWeight: '800', marginBottom: '8px' }}>
                Giải pháp đồng bộ tự động 100% qua Đám mây (Firebase Firestore):
              </h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                Để mọi sinh viên và giảng viên có thể dùng chung một cơ sở dữ liệu trên máy tính, điện thoại mà không cần copy mã:
              </p>
              <ol style={{ paddingLeft: '20px', fontSize: '0.84rem', color: 'var(--text-main)' }}>
                <li style={{ marginBottom: '6px' }}>Tạo 1 project miễn phí trên <strong>Firebase Console</strong> (Google).</li>
                <li style={{ marginBottom: '6px' }}>Bật dịch vụ <strong>Cloud Firestore</strong> (chế độ Test mode).</li>
                <li style={{ marginBottom: '6px' }}>Cung cấp Firebase Config (apiKey, projectId) vào hệ thống để tự động lưu & đọc trực tiếp theo thời gian thực.</li>
              </ol>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-outline" onClick={onClose}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
