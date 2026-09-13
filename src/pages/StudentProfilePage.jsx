import React, { useState } from 'react';
import { 
  User, 
  Lock,
  Image as ImageIcon, 
  CheckCircle, 
  Save, 
  GraduationCap, 
  Building2, 
  Phone, 
  Mail, 
  Calendar, 
  MapPin, 
  Award,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { FACULTIES, YEARS, GENDERS, UNIVERSITY_NAME } from '../data/faculties';

export default function StudentProfilePage({ student, onUpdateStudent }) {
  const [activeTab, setActiveTab] = useState('info'); // 'info' | 'avatar' | 'password'
  const [formData, setFormData] = useState({
    name: student.name || '',
    gender: student.gender || 'Nam',
    dob: student.dob || '',
    ethnicity: student.ethnicity || 'Kinh',
    year: student.year || 'Năm thứ 3',
    degree: student.degree || 'Đại học chính quy',
    className: student.className || '',
    facultyId: student.facultyId || 'ktcn',
    province: 'Phú Thọ',
    school: UNIVERSITY_NAME,
    position: student.position || 'Đoàn viên',
    unionStatus: student.unionStatus || 'Đoàn viên',
    phone: student.phone || '',
    email: student.email || '',
    avatar: student.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  });

  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [pwdError, setPwdError] = useState('');
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
      facultyName: facultyObj.name
    };

    onUpdateStudent(updated);
    
    // Show toast alert matching video timestamp 00:55
    setToastMessage('Cập nhật thông tin cá nhân thành công!');
    setTimeout(() => {
      setToastMessage('');
    }, 4000);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPwdError('');

    if (!currentPwd) {
      setPwdError('Vui lòng nhập mật khẩu hiện tại!');
      return;
    }

    if (newPwd.length < 6) {
      setPwdError('Mật khẩu mới phải có tối thiểu 6 ký tự!');
      return;
    }

    if (newPwd !== confirmPwd) {
      setPwdError('Mật khẩu mới xác nhận không khớp!');
      return;
    }

    setCurrentPwd('');
    setNewPwd('');
    setConfirmPwd('');
    setToastMessage('Đổi mật khẩu tài khoản thành công!');
    setTimeout(() => setToastMessage(''), 4000);
  };

  return (
    <div style={{ maxWidth: '980px', margin: '0 auto' }}>
      {/* Toast Alert matching video 00:55 */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '84px',
          right: '24px',
          zIndex: 999,
          background: '#10b981',
          color: '#fff',
          padding: '12px 22px',
          borderRadius: 'var(--radius-md)',
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

      {/* Header with Title & Student Summary Chip */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '22px'
      }}>
        <div>
          <span style={{ fontSize: '0.82rem', color: 'var(--primary)', fontWeight: '700', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            Hệ thống Quản lý Hồ sơ Đoàn viên • HVU
          </span>
          <h2 style={{ fontSize: '1.45rem', fontWeight: '800', color: 'var(--text-main)', marginTop: '2px' }}>
            Hồ Sơ Lý Lịch Sinh Viên
          </h2>
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
            style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary)' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-main)' }}>{formData.name || 'Sinh viên'}</span>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{formData.className || 'HVU Student'} • {formData.year}</span>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden', border: '1px solid var(--border-color)' }}>
        {/* Settings Sub-nav Tabs (info | avatar - removed password) */}
        <div style={{
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
            <span>Thay đổi avatar</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('password')}
            style={{
              padding: '13px 22px',
              border: 'none',
              background: 'transparent',
              color: activeTab === 'password' ? 'var(--primary)' : 'var(--text-muted)',
              fontWeight: activeTab === 'password' ? '800' : '600',
              borderBottom: activeTab === 'password' ? '3px solid var(--primary)' : '3px solid transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.9rem',
              transition: 'all 0.2s ease'
            }}
          >
            <Lock size={18} />
            <span>Thay đổi mật khẩu</span>
          </button>
        </div>

        {/* Tab 1: Personal Info Form (Exact fields from video 00:41 - 00:54, styled beautifully) */}
        {activeTab === 'info' && (
          <form onSubmit={handleSave} style={{ padding: '28px 32px' }}>
            
            {/* Section 1: Thông tin cơ bản */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px',
                paddingBottom: '8px',
                borderBottom: '1px solid var(--border-subtle)'
              }}>
                <Sparkles size={18} color="var(--primary)" />
                <h3 style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                  1. Thông tin cá nhân & nhân khẩu
                </h3>
              </div>

              <div className="form-grid">
                {/* Họ tên */}
                <div className="form-group">
                  <label className="form-label">
                    Họ tên <span className="required">*</span>
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

                {/* Giới tính (Segmented Pill Radio) */}
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
                        <span style={{ fontSize: '1.1rem' }}>{g === 'Nam' ? '👨' : '👩'}</span>
                        <span>{g}</span>
                        {formData.gender === g && (
                          <CheckCircle size={15} style={{ marginLeft: 'auto', color: 'var(--primary)' }} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ngày sinh */}
                <div className="form-group">
                  <label className="form-label">
                    Ngày sinh (DD/MM/YYYY) <span className="required">*</span>
                  </label>
                  <input 
                    type="text" 
                    className="input-control" 
                    placeholder="Ví dụ: 13/11/2004"
                    value={formData.dob} 
                    required
                    onChange={(e) => handleChange('dob', e.target.value)} 
                  />
                </div>

                {/* Dân tộc */}
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
              </div>
            </div>

            {/* Section 2: Thông tin đào tạo */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px',
                paddingBottom: '8px',
                borderBottom: '1px solid var(--border-subtle)'
              }}>
                <GraduationCap size={18} color="var(--primary)" />
                <h3 style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                  2. Thông tin học tập & đào tạo
                </h3>
              </div>

              <div className="form-grid">
                {/* Sinh viên năm thứ */}
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

                {/* Trình độ đào tạo */}
                <div className="form-group">
                  <label className="form-label">
                    Trình độ đào tạo <span className="required">*</span>
                  </label>
                  <select 
                    className="select-control"
                    value={formData.degree}
                    onChange={(e) => handleChange('degree', e.target.value)}
                  >
                    <option value="Đại học, học viện chính quy">Đại học, học viện chính quy</option>
                    <option value="Cao đẳng">Cao đẳng sư phạm chính quy</option>
                    <option value="Sau đại học">Sau đại học (Thạc sĩ/NCS)</option>
                  </select>
                </div>

                {/* Lớp, khóa đào tạo */}
                <div className="form-group">
                  <label className="form-label">
                    Lớp, khóa đào tạo <span className="required">*</span>
                  </label>
                  <input 
                    type="text" 
                    className="input-control" 
                    placeholder="Ví dụ: K21 - CNTT 1"
                    value={formData.className} 
                    required
                    onChange={(e) => handleChange('className', e.target.value)} 
                  />
                </div>

                {/* Khoa trực thuộc */}
                <div className="form-group">
                  <label className="form-label">
                    Khoa trực thuộc <span className="required">*</span>
                  </label>
                  <select 
                    className="select-control"
                    value={formData.facultyId}
                    onChange={(e) => handleChange('facultyId', e.target.value)}
                  >
                    {FACULTIES.map(f => (
                      <option key={f.id} value={f.id}>{f.name}</option>
                    ))}
                  </select>
                </div>

                {/* Tỉnh / Thành phố */}
                <div className="form-group">
                  <label className="form-label">
                    Tỉnh / Thành phố <span className="required">*</span>
                  </label>
                  <input 
                    type="text" 
                    className="input-control" 
                    value={formData.province} 
                    onChange={(e) => handleChange('province', e.target.value)} 
                  />
                </div>

                {/* Trường Đại học */}
                <div className="form-group">
                  <label className="form-label">
                    Trường Đại học <span className="required">*</span>
                  </label>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <input 
                      type="text" 
                      className="input-control" 
                      value={formData.school} 
                      readOnly
                      style={{ 
                        background: 'var(--bg-subtle)', 
                        fontWeight: '700', 
                        color: 'var(--primary)',
                        paddingRight: '36px'
                      }}
                    />
                    <ShieldCheck size={18} color="var(--primary)" style={{ position: 'absolute', right: '12px' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Đoàn thể & Liên hệ */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px',
                paddingBottom: '8px',
                borderBottom: '1px solid var(--border-subtle)'
              }}>
                <Award size={18} color="var(--primary)" />
                <h3 style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                  3. Tổ chức Đoàn - Hội & Thông tin liên hệ
                </h3>
              </div>

              <div className="form-grid">
                {/* Chức vụ Đoàn, Hội */}
                <div className="form-group">
                  <label className="form-label">
                    Chức vụ Đoàn, Hội <span className="required">*</span>
                  </label>
                  <input 
                    type="text" 
                    className="input-control" 
                    placeholder="Ví dụ: Bí thư Chi đoàn K21 CNTT, Hội viên..."
                    value={formData.position} 
                    required
                    onChange={(e) => handleChange('position', e.target.value)} 
                  />
                </div>

                {/* Đảng viên / Đoàn viên */}
                <div className="form-group">
                  <label className="form-label">
                    Đảng viên / Đoàn viên <span className="required">*</span>
                  </label>
                  <select 
                    className="select-control"
                    value={formData.unionStatus}
                    onChange={(e) => handleChange('unionStatus', e.target.value)}
                  >
                    <option value="Đoàn viên">Đoàn viên TNCS Hồ Chí Minh</option>
                    <option value="Đoàn viên ưu tú">Đoàn viên ưu tú</option>
                    <option value="Đảng viên dự bị">Đảng viên dự bị</option>
                    <option value="Đảng viên chính thức">Đảng viên chính thức</option>
                  </select>
                </div>

                {/* Số điện thoại */}
                <div className="form-group">
                  <label className="form-label">
                    Số điện thoại liên hệ <span className="required">*</span>
                  </label>
                  <input 
                    type="tel" 
                    className="input-control" 
                    placeholder="Ví dụ: 0983456832"
                    value={formData.phone} 
                    required
                    onChange={(e) => handleChange('phone', e.target.value)} 
                  />
                </div>

                {/* Địa chỉ Email */}
                <div className="form-group">
                  <label className="form-label">
                    Địa chỉ Email <span className="required">*</span>
                  </label>
                  <input 
                    type="email" 
                    className="input-control" 
                    placeholder="Ví dụ: letuanthanh2606@gmail.com"
                    value={formData.email} 
                    required
                    onChange={(e) => handleChange('email', e.target.value)} 
                  />
                </div>
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
                (*) Vui lòng điền chính xác các mục để thuận tiện xuất chứng nhận Sinh viên 5 tốt cấp trường.
              </span>
              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ 
                  padding: '12px 28px', 
                  fontSize: '0.94rem', 
                  fontWeight: '700',
                  boxShadow: '0 4px 14px rgba(0, 91, 170, 0.35)',
                  gap: '8px'
                }}
              >
                <Save size={18} />
                <span>Cập nhật thông tin cá nhân</span>
              </button>
            </div>
          </form>
        )}

        {/* Tab 2: Avatar Upload */}
        {activeTab === 'avatar' && (
          <div style={{ padding: '40px 32px', textAlign: 'center', maxWidth: '540px', margin: '0 auto' }}>
            <div style={{ position: 'relative', display: 'inline-block', marginBottom: '20px' }}>
              <img 
                src={formData.avatar} 
                alt="Avatar" 
                style={{ 
                  width: '130px', 
                  height: '130px', 
                  borderRadius: '50%', 
                  objectFit: 'cover', 
                  border: '4px solid var(--primary)',
                  boxShadow: 'var(--shadow-md)'
                }}
              />
              <span style={{
                position: 'absolute',
                bottom: '4px',
                right: '4px',
                background: '#10b981',
                color: '#fff',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #fff'
              }}>
                <CheckCircle size={16} />
              </span>
            </div>

            <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-main)' }}>
              Ảnh thẻ chân dung 3x4 chuẩn nộp hồ sơ
            </h4>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: '8px 0 24px', lineHeight: 1.6 }}>
              Ảnh thẻ được sử dụng để in Giấy chứng nhận danh hiệu "Sinh viên 5 tốt" cấp trường và lưu trữ tại văn phòng Đoàn Thanh niên - Hội Sinh viên HVU.
            </p>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              background: 'var(--bg-subtle)',
              padding: '18px',
              borderRadius: 'var(--radius-md)',
              border: '1px dashed var(--border-color)',
              marginBottom: '20px'
            }}>
              <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                Định dạng hỗ trợ: JPG, PNG • Dung lượng tối đa: 5MB
              </span>
              <button 
                type="button"
                className="btn btn-primary" 
                style={{ margin: '0 auto' }}
                onClick={() => {
                  const demoAvatars = [
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80'
                  ];
                  const nextAvatar = demoAvatars[(demoAvatars.indexOf(formData.avatar) + 1) % demoAvatars.length];
                  handleChange('avatar', nextAvatar);
                  setToastMessage('Đã cập nhật ảnh đại diện mới!');
                  setTimeout(() => setToastMessage(''), 3000);
                }}
              >
                <ImageIcon size={16} />
                <span>Đổi ảnh chân dung mẫu khác</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Password Change */}
        {activeTab === 'password' && (
          <form onSubmit={handlePasswordChange} style={{ padding: '36px 32px', maxWidth: '520px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                background: 'var(--primary-light)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px'
              }}>
                <Lock size={26} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-main)' }}>
                Thiết Lập Mật Khẩu Mới
              </h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Đổi mật khẩu định kỳ để bảo vệ hồ sơ và dữ liệu minh chứng Sinh viên 5 tốt của bạn.
              </p>
            </div>

            {pwdError && (
              <div style={{
                background: 'var(--danger-light)',
                color: '#991b1b',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                padding: '10px 16px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.84rem',
                fontWeight: '600',
                marginBottom: '18px'
              }}>
                {pwdError}
              </div>
            )}

            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label">
                Mật khẩu hiện tại <span className="required">*</span>
              </label>
              <input 
                type="password" 
                className="input-control" 
                placeholder="Nhập mật khẩu đang dùng"
                value={currentPwd}
                onChange={(e) => setCurrentPwd(e.target.value)}
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label">
                Mật khẩu mới <span className="required">*</span>
              </label>
              <input 
                type="password" 
                className="input-control" 
                placeholder="Tối thiểu 6 ký tự"
                value={newPwd}
                onChange={(e) => setNewPwd(e.target.value)}
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label className="form-label">
                Nhập lại mật khẩu mới <span className="required">*</span>
              </label>
              <input 
                type="password" 
                className="input-control" 
                placeholder="Xác nhận lại chính xác mật khẩu mới"
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ 
                width: '100%', 
                padding: '12px', 
                fontSize: '0.94rem', 
                fontWeight: '700',
                boxShadow: '0 4px 14px rgba(0, 91, 170, 0.3)'
              }}
            >
              <Save size={18} />
              <span>Xác nhận đổi mật khẩu</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
