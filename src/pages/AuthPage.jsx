import React, { useState } from 'react';
import { 
  Mail, 
  Lock,
  Eye,
  EyeOff,
  User, 
  GraduationCap, 
  Users, 
  ArrowRight, 
  Sparkles,
  CheckCircle2,
  KeyRound
} from 'lucide-react';
import { ORG_NAME, UNIVERSITY_NAME, FACULTIES } from '../data/faculties';

export default function AuthPage({ onLogin, onRegisterStudent }) {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  
  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Register state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regStudentCode, setRegStudentCode] = useState('');
  const [regFacultyId, setRegFacultyId] = useState('ktcn');
  const [regClass, setRegClass] = useState('');
  const [regError, setRegError] = useState('');

  // Handle Login Submit
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');
    const email = loginEmail.trim().toLowerCase();

    if (!email) {
      setLoginError('Vui lòng nhập email hoặc tên đăng nhập!');
      return;
    }

    if (!loginPassword) {
      setLoginError('Vui lòng nhập mật khẩu!');
      return;
    }

    const success = onLogin({
      email: email,
      password: loginPassword
    });

    if (!success) {
      setLoginError('Thông tin đăng nhập không chính xác. Vui lòng kiểm tra lại!');
    }
  };

  // Quick 1-click Login
  const handleQuickLogin = (email, role) => {
    setLoginEmail(email);
    setLoginPassword('12345678');
    onLogin({
      email: email,
      password: '12345678',
      role: role
    });
  };

  // Handle Register Submit
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setRegError('');

    if (!regName.trim()) {
      setRegError('Vui lòng nhập họ và tên sinh viên!');
      return;
    }

    if (!regEmail.trim()) {
      setRegError('Vui lòng nhập email cá nhân!');
      return;
    }

    if (regPassword.length < 6) {
      setRegError('Mật khẩu phải có tối thiểu 6 ký tự!');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setRegError('Mật khẩu xác nhận không khớp!');
      return;
    }

    const faculty = FACULTIES.find(f => f.id === regFacultyId) || FACULTIES[0];

    onRegisterStudent({
      name: regName.trim(),
      email: regEmail.trim().toLowerCase(),
      studentCode: regStudentCode.trim() || `24D480${Math.floor(10000 + Math.random() * 90000)}`,
      className: regClass.trim() || `K22 - ${faculty.short}`,
      facultyId: faculty.id,
      facultyName: faculty.name,
      password: regPassword
    });
  };

  return (
    <div className="auth-page-container">
      <div className="auth-bg-blob auth-blob-1" />
      <div className="auth-bg-blob auth-blob-2" />

      <div className="auth-card" style={{ maxWidth: '520px' }}>
        {/* Header with Emblems */}
        <div className="auth-header">
          <div className="auth-logos">
            <div className="auth-emblem" title="Hội Sinh Viên Việt Nam">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="46" fill="#005baa" />
                <circle cx="50" cy="50" r="43" stroke="#ffcc00" strokeWidth="2" />
                <path d="M50 20 C60 20, 75 30, 75 45 C75 60, 60 70, 50 78 C40 70, 25 60, 25 45 C25 30, 40 20, 50 20 Z" fill="#ffffff" />
                <path d="M50 26 L55 38 L68 39 L58 48 L61 61 L50 54 L39 61 L42 48 L32 39 L45 38 Z" fill="#005baa" />
              </svg>
            </div>
            <div className="auth-emblem" title="Trường Đại học Hùng Vương">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 12 L85 30 L85 70 L50 88 L15 70 L15 30 Z" stroke="#005baa" strokeWidth="4" fill="#f0f7ff" />
                <text x="50" y="55" fontSize="22" fontWeight="bold" fill="#005baa" textAnchor="middle">HVU</text>
                <text x="50" y="70" fontSize="10" fontWeight="bold" fill="#f59e0b" textAnchor="middle">1961</text>
              </svg>
            </div>
          </div>

          <h2 className="auth-brand-org">{ORG_NAME}</h2>
          <h1 className="auth-brand-title">XÉT CHỌN SINH VIÊN 5 TỐT</h1>
          <p className="auth-brand-subtitle">Cổng đăng ký & thẩm định trực tuyến • Cấp Trường</p>
        </div>

        {/* Tab switcher: Login or Register */}
        <div className="auth-tabs">
          <button 
            type="button"
            className={`auth-tab ${authMode === 'login' ? 'active' : ''}`}
            onClick={() => { setAuthMode('login'); setLoginError(''); }}
          >
            Đăng nhập
          </button>
          <button 
            type="button"
            className={`auth-tab ${authMode === 'register' ? 'active' : ''}`}
            onClick={() => { setAuthMode('register'); setRegError(''); }}
          >
            Đăng ký (Sinh viên tạo tài khoản)
          </button>
        </div>

        {/* TAB 1: LOGIN */}
        {authMode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="auth-form">
            {loginError && (
              <div className="auth-error-banner">
                {loginError}
              </div>
            )}

            <div className="auth-field">
              <label style={{ fontSize: '0.86rem', fontWeight: '700', color: 'var(--text-main)' }}>
                Email hoặc Tên đăng nhập
              </label>
              <div className="auth-input-wrapper">
                <Mail size={18} className="auth-input-icon" />
                <input 
                  type="text" 
                  required
                  className="auth-input" 
                  placeholder="Ví dụ: letuanthanh2606@gmail.com hoặc thangnv@hvu.edu.vn"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="auth-field">
              <label style={{ fontSize: '0.86rem', fontWeight: '700', color: 'var(--text-main)' }}>
                Mật khẩu
              </label>
              <div className="auth-input-wrapper">
                <Lock size={18} className="auth-input-icon" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  className="auth-input" 
                  placeholder="Nhập mật khẩu"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                <button 
                  type="button" 
                  className="auth-toggle-pwd"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Options row - Removed the "Mật khẩu mẫu: 12345678" text as requested */}
            <div className="auth-options" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label className="auth-remember-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.84rem' }}>
                <input 
                  type="checkbox" 
                  checked={showPassword} 
                  onChange={(e) => setShowPassword(e.target.checked)} 
                  style={{ accentColor: 'var(--primary)' }}
                />
                <span>Hiển thị mật khẩu</span>
              </label>
            </div>

            <button type="submit" className="btn btn-primary auth-submit-btn">
              <span>ĐĂNG NHẬP HỆ THỐNG</span>
              <ArrowRight size={18} />
            </button>

            {/* Quick 1-Click Login Accounts for Teacher & Students */}
            <div className="auth-preset-box" style={{ marginTop: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                <KeyRound size={15} color="var(--primary)" />
                <span className="auth-preset-label" style={{ margin: 0 }}>
                  Tài khoản đăng nhập có sẵn (Click để vào ngay):
                </span>
              </div>

              <div className="auth-preset-buttons">
                {/* Student 1 */}
                <button 
                  type="button" 
                  className="auth-preset-btn student"
                  onClick={() => handleQuickLogin('letuanthanh2606@gmail.com', 'student')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <GraduationCap size={16} color="#005baa" />
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.84rem' }}>🎓 Sinh viên: Lê Tuấn Thành (Hồ sơ đang nộp)</strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Email: letuanthanh2606@gmail.com</span>
                    </div>
                  </div>
                  <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--primary)', fontWeight: '700' }}>Vào ngay →</span>
                </button>

                {/* Student 2 (Full 5/5) */}
                <button 
                  type="button" 
                  className="auth-preset-btn student"
                  onClick={() => handleQuickLogin('thuha.nguyen@hvu.edu.vn', 'student')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Sparkles size={16} color="#10b981" />
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.84rem' }}>🌟 Sinh viên: Nguyễn Thị Thu Hà (Đạt 5/5 tiêu chí)</strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Email: thuha.nguyen@hvu.edu.vn</span>
                    </div>
                  </div>
                  <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--success)', fontWeight: '700' }}>Vào ngay →</span>
                </button>

                {/* Teacher (Pre-provisioned) */}
                <button 
                  type="button" 
                  className="auth-preset-btn teacher"
                  onClick={() => handleQuickLogin('thangnv@hvu.edu.vn', 'teacher')}
                  style={{ background: '#fffbeb', borderColor: '#fde68a' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Users size={16} color="#d97706" />
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.84rem', color: '#92400e' }}>👨‍🏫 Giảng viên: ThS. Nguyễn Văn Thắng (Cấp sẵn)</strong>
                      <span style={{ fontSize: '0.75rem', color: '#b45309' }}>Email: thangnv@hvu.edu.vn</span>
                    </div>
                  </div>
                  <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: '#d97706', fontWeight: '700' }}>Vào ngay →</span>
                </button>
              </div>
            </div>

            <div className="auth-footer-prompt">
              Sinh viên chưa có tài khoản?{' '}
              <button 
                type="button" 
                className="auth-link-btn"
                onClick={() => setAuthMode('register')}
              >
                Tạo tài khoản mới ngay
              </button>
            </div>
          </form>
        )}

        {/* TAB 2: REGISTER FOR STUDENTS */}
        {authMode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="auth-form">
            {regError && (
              <div className="auth-error-banner">
                {regError}
              </div>
            )}

            <div className="auth-field">
              <label>Họ và tên sinh viên <span className="required">*</span></label>
              <div className="auth-input-wrapper">
                <User size={18} className="auth-input-icon" />
                <input 
                  type="text" 
                  required
                  className="auth-input" 
                  placeholder="Ví dụ: Hoàng Anh Dũng"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                />
              </div>
            </div>

            <div className="auth-field">
              <label>Email cá nhân <span className="required">*</span></label>
              <div className="auth-input-wrapper">
                <Mail size={18} className="auth-input-icon" />
                <input 
                  type="email" 
                  required
                  className="auth-input" 
                  placeholder="Ví dụ: anhdung.k22@gmail.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="auth-field">
                <label>Mã sinh viên (MSSV)</label>
                <input 
                  type="text" 
                  className="auth-input" 
                  style={{ paddingLeft: '14px' }}
                  placeholder="23D480..."
                  value={regStudentCode}
                  onChange={(e) => setRegStudentCode(e.target.value)}
                />
              </div>

              <div className="auth-field">
                <label>Lớp - Khóa</label>
                <input 
                  type="text" 
                  className="auth-input" 
                  style={{ paddingLeft: '14px' }}
                  placeholder="K22 - CNTT 2"
                  value={regClass}
                  onChange={(e) => setRegClass(e.target.value)}
                />
              </div>
            </div>

            <div className="auth-field">
              <label>Khoa trực thuộc Trường ĐH Hùng Vương</label>
              <select 
                className="select-control"
                value={regFacultyId}
                onChange={(e) => setRegFacultyId(e.target.value)}
              >
                {FACULTIES.map(f => (
                  <option key={f.id} value={f.id}>{f.name}</option>
                ))}
              </select>
            </div>

            <div className="auth-field">
              <label>Mật khẩu (tối thiểu 6 ký tự) <span className="required">*</span></label>
              <div className="auth-input-wrapper">
                <Lock size={18} className="auth-input-icon" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  className="auth-input" 
                  placeholder="Tạo mật khẩu đăng nhập"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="auth-field">
              <label>Nhập lại mật khẩu <span className="required">*</span></label>
              <div className="auth-input-wrapper">
                <Lock size={18} className="auth-input-icon" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  className="auth-input" 
                  placeholder="Xác nhận lại mật khẩu"
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary auth-submit-btn">
              <span>ĐĂNG KÝ VÀ VÀO NỘP HỒ SƠ</span>
              <CheckCircle2 size={18} />
            </button>

            <div className="auth-footer-prompt">
              Đã có tài khoản sinh viên?{' '}
              <button 
                type="button" 
                className="auth-link-btn"
                onClick={() => setAuthMode('login')}
              >
                Đăng nhập ngay
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
