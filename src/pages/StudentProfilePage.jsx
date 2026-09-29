import React, { useState, useRef } from 'react';
import { 
  User, 
  Image as ImageIcon, 
  CheckCircle, 
  Save,
  Upload
} from 'lucide-react';
import { FACULTIES, YEARS, GENDERS, PARTY_MEMBER_OPTIONS } from '../data/faculties';

export default function StudentProfilePage({ student, onUpdateStudent }) {
  const [activeTab, setActiveTab] = useState('info'); // 'info' | 'avatar'
  const avatarInputRef = useRef(null);

  // Parse party membership from existing data
  const initialIsPartyMember = (student.unionStatus && student.unionStatus.toLowerCase().includes('đảng')) ? 'Có' : (student.isPartyMember || 'Không');

  const [formData, setFormData] = useState({
    name: student.name || '',
    gender: student.gender || 'Nam',
    dob: student.dob || '',
    ethnicity: student.ethnicity || 'Kinh',
    year: student.year || 'Năm thứ 3',
    className: student.className || '',
    facultyId: student.facultyId || 'ktcn',
    position: student.position || 'Hội viên',
    isPartyMember: initialIsPartyMember,
    phone: student.phone || '',
    email: student.email || '',
    avatar: student.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  });

  const [toastMessage, setToastMessage] = useState('');

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const facultyObj = FACULTIES.find(f => f.id === formData.facultyId) || FACULTIES[0];

    const updated = {
      ...student,
      ...formData,
      facultyName: facultyObj.name,
      unionStatus: formData.isPartyMember === 'Có' ? 'Đảng viên' : 'Đoàn viên'
    };

    onUpdateStudent(updated);
    
    setToastMessage('Cập nhật thông tin cá nhân thành công!');
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  return (
    <div style={{ maxWidth: '920px', margin: '0 auto' }}>
      {/* Toast Alert */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '84px',
          right: '24px',
          zIndex: 999,
          background: 'var(--success, #10b981)',
          color: '#fff',
          padding: '12px 22px',
          borderRadius: 'var(--radius-md, 8px)',
          boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontWeight: '700',
          fontSize: '0.92rem',
          animation: 'slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <CheckCircle size={22} color="#fff" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header section (Item 6 & 7: "Thông tin cá nhân", no "Hệ thống quản lý...") */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '22px'
      }}>
        <div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: '800', color: 'var(--text-main)', marginTop: '2px' }}>
            Thông tin cá nhân
          </h2>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Sinh viên tự đăng ký và cập nhật thông tin cá nhân phục vụ xét chọn danh hiệu
          </p>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: 'var(--bg-card)',
          padding: '8px 16px',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-xs)'
        }}>
          <img 
            src={formData.avatar} 
            alt={formData.name} 
            style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary)' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-main)' }}>{formData.name || 'Sinh viên'}</span>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{formData.className || 'Sinh viên HVU'} • {formData.year}</span>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden', border: '1px solid var(--border-color)' }}>
        {/* Sub-nav Tabs */}
        <div className="profile-sub-nav" style={{
          display: 'flex',
          background: 'var(--bg-subtle)',
          borderBottom: '1px solid var(--border-color)',
          padding: '4px 16px 0',
          gap: '4px'
        }}>
          <button
            type="button"
            onClick={() => setActiveTab('info')}
            style={{
              padding: '13px 22px',
              border: 'none',
              background: 'transparent',
              color: activeTab === 'info' ? 'var(--primary)' : 'var(--text-muted)',
              fontWeight: activeTab === 'info' ? '800' : '600',
              borderBottom: activeTab === 'info' ? '3px solid var(--primary)' : '3px solid transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.9rem',
              transition: 'all 0.2s ease'
            }}
          >
            <User size={18} />
            <span>Thông tin cá nhân</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('avatar')}
            style={{
              padding: '13px 22px',
              border: 'none',
              background: 'transparent',
              color: activeTab === 'avatar' ? 'var(--primary)' : 'var(--text-muted)',
              fontWeight: activeTab === 'avatar' ? '800' : '600',
              borderBottom: activeTab === 'avatar' ? '3px solid var(--primary)' : '3px solid transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.9rem',
              transition: 'all 0.2s ease'
            }}
          >
            <ImageIcon size={18} />
            <span>Thay đổi ảnh đại diện</span>
          </button>
        </div>

        {/* Tab 1: Form Thông tin cá nhân (Exact fields according to Item 4) */}
        {activeTab === 'info' && (
          <form onSubmit={handleSave} style={{ padding: '28px 32px' }}>
            <div className="form-grid">
              {/* 1. Họ và tên */}
              <div className="form-group">
                <label className="form-label">
                  Họ và tên <span className="required">*</span>
                </label>
                <input 
                  type="text" 
                  className="input-control" 
                  placeholder="Nhập họ và tên đầy đủ"
                  value={formData.name} 
                  required
                  onChange={(e) => handleChange('name', e.target.value)} 
                />
              </div>

              {/* 2. Giới tính */}
              <div className="form-group">
                <label className="form-label">
                  Giới tính <span className="required">*</span>
                </label>
                <div className="gender-selector">
                  {GENDERS.map(g => (
                    <div 
                      key={g}
                      className={`gender-option ${formData.gender === g ? 'active' : ''}`}
                      onClick={() => handleChange('gender', g)}
                    >
                      <span style={{ fontSize: '1.05rem' }}>{g === 'Nam' ? '👨' : '👩'}</span>
                      <span>{g}</span>
                      {formData.gender === g && (
                        <CheckCircle size={15} style={{ marginLeft: 'auto', color: 'var(--primary)' }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Ngày sinh */}
              <div className="form-group">
                <label className="form-label">
                  Ngày sinh <span className="required">*</span>
                </label>
                <input 
                  type="text" 
                  className="input-control" 
                  placeholder="Ví dụ: 15/08/2004"
                  value={formData.dob} 
                  required
                  onChange={(e) => handleChange('dob', e.target.value)} 
                />
              </div>

              {/* 4. Dân tộc */}
              <div className="form-group">
                <label className="form-label">
                  Dân tộc <span className="required">*</span>
                </label>
                <input 
                  type="text" 
                  className="input-control" 
                  placeholder="Ví dụ: Kinh, Mường, Tày..."
                  value={formData.ethnicity} 
                  required
                  onChange={(e) => handleChange('ethnicity', e.target.value)} 
                />
              </div>

              {/* 5. Sinh viên năm thứ (1/2/3/4) */}
              <div className="form-group">
                <label className="form-label">
                  Sinh viên năm thứ <span className="required">*</span>
                </label>
                <select 
                  className="select-control"
                  value={formData.year}
                  onChange={(e) => handleChange('year', e.target.value)}
                >
                  {YEARS.map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>

              {/* 6. Lớp */}
              <div className="form-group">
                <label className="form-label">
                  Lớp <span className="required">*</span>
                </label>
                <input 
                  type="text" 
                  className="input-control" 
                  placeholder="Ví dụ: K21 CNTT 1"
                  value={formData.className} 
                  required
                  onChange={(e) => handleChange('className', e.target.value)} 
                />
              </div>

              {/* 7. Khoa (10 lựa chọn các khoa, không để tự nhập) */}
              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label className="form-label">
                  Khoa đào tạo (Chọn trong 10 khoa trực thuộc) <span className="required">*</span>
                </label>
                <select 
                  className="select-control"
                  value={formData.facultyId}
                  onChange={(e) => handleChange('facultyId', e.target.value)}
                  style={{ fontWeight: '600' }}
                >
                  {FACULTIES.map(f => (
                    <option key={f.id} value={f.id}>{f.name}</option>
                  ))}
                </select>
              </div>

              {/* 8. Chức vụ Đoàn Hội */}
              <div className="form-group">
                <label className="form-label">
                  Chức vụ Đoàn, Hội <span className="required">*</span>
                </label>
                <input 
                  type="text" 
                  className="input-control" 
                  placeholder="Ví dụ: Bí thư Chi đoàn, UV BCH Liên chi hội, Hội viên..."
                  value={formData.position} 
                  required
                  onChange={(e) => handleChange('position', e.target.value)} 
                />
              </div>

              {/* 9. Đảng viên (Không/Có) */}
              <div className="form-group">
                <label className="form-label">
                  Đảng viên <span className="required">*</span>
                </label>
                <select 
                  className="select-control"
                  value={formData.isPartyMember}
                  onChange={(e) => handleChange('isPartyMember', e.target.value)}
                >
                  {PARTY_MEMBER_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* 10. Số điện thoại */}
              <div className="form-group">
                <label className="form-label">
                  Số điện thoại <span className="required">*</span>
                </label>
                <input 
                  type="tel" 
                  className="input-control" 
                  placeholder="Ví dụ: 0987654321"
                  value={formData.phone} 
                  required
                  onChange={(e) => handleChange('phone', e.target.value)} 
                />
              </div>

              {/* 11. Email */}
              <div className="form-group">
                <label className="form-label">
                  Email <span className="required">*</span>
                </label>
                <input 
                  type="email" 
                  className="input-control" 
                  placeholder="Ví dụ: nguyenvana@hvu.edu.vn"
                  value={formData.email} 
                  required
                  onChange={(e) => handleChange('email', e.target.value)} 
                />
              </div>
            </div>

            {/* Bottom Actions */}
            <div style={{
              marginTop: '28px',
              paddingTop: '20px',
              borderTop: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                (*) Vui lòng kiểm tra kỹ thông tin trước khi lưu để đảm bảo quyền lợi khi xét duyệt danh hiệu.
              </span>
              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ 
                  padding: '12px 28px', 
                  fontSize: '0.94rem', 
                  fontWeight: '700',
                  gap: '8px'
                }}
              >
                <Save size={18} />
                <span>Lưu thông tin cá nhân</span>
              </button>
            </div>
          </form>
        )}

        {/* Tab 2: Avatar change */}
        {activeTab === 'avatar' && (
          <div style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '16px' }}>
              Ảnh đại diện sinh viên
            </h3>
            
            <input 
              type="file" 
              ref={avatarInputRef} 
              accept="image/*" 
              style={{ display: 'none' }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (ev) => {
                    handleChange('avatar', ev.target.result);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
              <img 
                src={formData.avatar} 
                alt="Avatar" 
                style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--primary)', boxShadow: 'var(--shadow-sm)' }}
              />
              <div style={{ flex: 1, minWidth: '240px' }}>
                <div style={{ marginBottom: '12px' }}>
                  <button 
                    type="button" 
                    className="btn btn-primary btn-sm"
                    onClick={() => avatarInputRef.current?.click()}
                    style={{ gap: '6px' }}
                  >
                    <Upload size={15} />
                    <span>Chọn ảnh chân dung từ thiết bị</span>
                  </button>
                </div>

                <label className="form-label">Hoặc nhập đường dẫn ảnh (URL)</label>
                <input 
                  type="text" 
                  className="input-control" 
                  value={formData.avatar}
                  onChange={(e) => handleChange('avatar', e.target.value)}
                  placeholder="Nhập link ảnh https://..."
                />
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                  Khuyến nghị dùng ảnh chân dung rõ nét, trang phục lịch sự.
                </p>
                <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
                  <button 
                    type="button" 
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      const updated = { ...student, avatar: formData.avatar };
                      onUpdateStudent(updated);
                      setToastMessage('Đã cập nhật ảnh đại diện thành công!');
                      setTimeout(() => setToastMessage(''), 3000);
                    }}
                  >
                    <Save size={15} />
                    <span>Lưu ảnh đại diện</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
