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
import { ORG_NAME, FACULTIES } from '../data/faculties';
import logoTruong from '../assets/logo-truong.png';
import logoHoiSinhVien from '../assets/logo-hoisinhvien.png';

export default function AuthPage({ onLogin, onRegisterStudent }) {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  
  // Login state (Password)
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
  const [regFacultyId, setRegFacultyId] = useState(FACULTIES[0]?.id || 'ktcn');
  const [regClass, setRegClass] = useState('');
  const [regError, setRegError] = useState('');

  // Handle Login Submit with Password
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');
    const email = loginEmail.trim().toLowerCase();

    if (!email) {
      setLoginError('Vui lòng nhập email hoặc tên đăng nhập / mã sinh viên!');
      return;
    }

    if (!loginPassword) {
      setLoginError('Vui lòng nhập mật khẩu!');
      return;
    }

    const res = onLogin({
      email: email,
      password: loginPassword,
      loginType: 'password'
    });

    if (!res || !res.success) {
      setLoginError(res?.error || 'Thông tin đăng nhập không chính xác. Vui lòng kiểm tra lại!');
    }
  };

  // Quick 1-click Login for predefined accounts
  const handleQuickLogin = (email, role) => {
    setLoginError('');
    onLogin({
      email: email,
      password: '123456',
      role: role,
      loginType: 'password'
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

    const res = onRegisterStudent({
      name: regName.trim(),
      email: regEmail.trim().toLowerCase(),
      studentCode: regStudentCode.trim() || `24D480${Math.floor(10000 + Math.random() * 90000)}`,
      className: regClass.trim() || `K22 - ${faculty.short}`,
      facultyId: faculty.id,
      facultyName: faculty.name,
      password: regPassword
    });

    if (res && !res.success) {
      setRegError(res.error || 'Đăng ký không thành công. Vui lòng thử lại!');
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-bg-blob auth-blob-1" />
      <div className="auth-bg-blob auth-blob-2" />

      <div className="auth-card" style={{ maxWidth: '520px' }}>
        {/* Header with Official School & Student Union Logos */}
        <div className="auth-header">
          <div className="auth-logos">
            <div className="auth-emblem" title="Hội Sinh Viên Việt Nam">
              <img src={logoHoiSinhVien} alt="Logo Hội Sinh Viên Việt Nam" />
            </div>
            <div className="auth-emblem" title="Trường Đại học Hùng Vương">
              <img src={logoTruong} alt="Logo Trường Đại học Hùng Vương" />
            </div>
          </div>

          <h2 className="auth-brand-org">{ORG_NAME}</h2>
          <h1 className="auth-brand-title">XÉT CHỌN SINH VIÊN 5 TỐT</h1>
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
          <div>
            {loginError && (
              <div className="auth-error-banner" style={{ marginBottom: '16px' }}>
                {loginError}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="auth-form">
              <div className="auth-field">
                <label style={{ fontSize: '0.86rem', fontWeight: '700', color: 'var(--text-main)' }}>
                  Email hoặc Mã sinh viên / Tên đăng nhập
                </label>
                <div className="auth-input-wrapper">
                  <Mail size={18} className="auth-input-icon" />
                  <input 
                    type="text" 
                    required
                    className="auth-input" 
                    placeholder="Nhập email hoặc mã sinh viên (VD: letuanthanh2606@gmail.com)"
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
                    placeholder="Nhập mật khẩu (Mặc định: 123456)"
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
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Mật khẩu mặc định: <strong>123456</strong>
                </span>
              </div>

              <button type="submit" className="btn btn-primary auth-submit-btn">
                <span>ĐĂNG NHẬP HỆ THỐNG</span>
                <ArrowRight size={18} />
              </button>
            </form>

            {/* Quick 1-Click Login Accounts for Testing */}
            <div className="auth-preset-box" style={{ marginTop: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                <KeyRound size={15} color="var(--primary)" />
                <span className="auth-preset-label" style={{ margin: 0 }}>
                  Tài khoản đăng nhập có sẵn (Click vào đúng nick tương ứng):
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
                      <strong style={{ display: 'block', fontSize: '0.84rem' }}>🎓 Sinh viên: Lê Tuấn Thành (K21 - CNTT 1)</strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Email: letuanthanh2606@gmail.com</span>
                    </div>
                  </div>
                  <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--primary)', fontWeight: '700' }}>Vào ngay →</span>
                </button>

                {/* Student 2 */}
                <button 
                  type="button" 
                  className="auth-preset-btn student"
                  onClick={() => handleQuickLogin('thuha.nguyen@hvu.edu.vn', 'student')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Sparkles size={16} color="#10b981" />
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.84rem' }}>🌟 Sinh viên: Nguyễn Thị Thu Hà (K21 - GDTH & MN)</strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Email: thuha.nguyen@hvu.edu.vn</span>
                    </div>
                  </div>
                  <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--success)', fontWeight: '700' }}>Vào ngay →</span>
                </button>

                {/* Teacher */}
                <button 
                  type="button" 
                  className="auth-preset-btn teacher"
                  onClick={() => handleQuickLogin('thangnv@hvu.edu.vn', 'teacher')}
                  style={{ background: '#fffbeb', borderColor: '#fde68a' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Users size={16} color="#d97706" />
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.84rem', color: '#92400e' }}>👨‍🏫 Giảng viên: ThS. Nguyễn Văn Thắng (Ban thẩm định)</strong>
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
          </div>
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
