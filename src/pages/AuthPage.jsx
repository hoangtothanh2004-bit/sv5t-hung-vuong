import React, { useState, useEffect } from 'react';
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
  KeyRound,
  ShieldCheck,
  Send,
  RotateCw
} from 'lucide-react';
import { ORG_NAME, FACULTIES } from '../data/faculties';
import logoTruong from '../assets/logo-truong.png';
import logoHoiSinhVien from '../assets/logo-hoisinhvien.png';

export default function AuthPage({ onLogin, onRegisterStudent }) {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [loginMethod, setLoginMethod] = useState('password'); // 'password' | 'otp'
  
  // Login state (Password)
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Login state (Email OTP)
  const [otpEmail, setOtpEmail] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [sentOtp, setSentOtp] = useState('');
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [otpBanner, setOtpBanner] = useState(null);

  // Register state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regStudentCode, setRegStudentCode] = useState('');
  const [regFacultyId, setRegFacultyId] = useState(FACULTIES[0]?.id || 'ktcn');
  const [regClass, setRegClass] = useState('');
  const [regError, setRegError] = useState('');

  // OTP Countdown Timer
  useEffect(() => {
    let timer;
    if (otpCountdown > 0) {
      timer = setInterval(() => {
        setOtpCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [otpCountdown]);

  // Request Email OTP
  const handleRequestOtp = (e) => {
    e?.preventDefault();
    setLoginError('');
    const email = otpEmail.trim().toLowerCase();

    if (!email) {
      setLoginError('Vui lòng nhập địa chỉ email để nhận mã xác nhận!');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setLoginError('Vui lòng nhập định dạng email hợp lệ (ví dụ: letuanthanh2606@gmail.com)');
      return;
    }

    // Generate 6-digit OTP
    const code = String(Math.floor(100000 + Math.random() * 900000));
    setSentOtp(code);
    setOtpCountdown(60);
    setOtpBanner({ email, code });
    setOtpInput('');
  };

  // Handle Login Submit with Password
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

    const res = onLogin({
      email: email,
      password: loginPassword,
      loginType: 'password'
    });

    if (!res || !res.success) {
      setLoginError(res?.error || 'Thông tin đăng nhập không chính xác. Vui lòng kiểm tra lại!');
    }
  };

  // Handle Login Submit with Email OTP
  const handleOtpLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');
    const email = otpEmail.trim().toLowerCase();

    if (!email) {
      setLoginError('Vui lòng nhập địa chỉ email!');
      return;
    }

    if (!sentOtp) {
      setLoginError('Vui lòng bấm "Lấy mã xác nhận" trước khi đăng nhập!');
      return;
    }

    if (!otpInput.trim()) {
      setLoginError('Vui lòng nhập mã xác nhận OTP 6 chữ số!');
      return;
    }

    if (otpInput.trim() !== sentOtp) {
      setLoginError('Mã xác nhận OTP không đúng hoặc đã hết hạn. Vui lòng kiểm tra lại!');
      return;
    }

    const res = onLogin({
      email: email,
      loginType: 'otp',
      isOtp: true
    });

    if (!res || !res.success) {
      setLoginError(res?.error || 'Đăng nhập không thành công. Vui lòng kiểm tra lại email!');
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
            {/* Sub-method Switcher: Password vs Email OTP */}
            <div style={{
              display: 'flex',
              background: 'var(--bg-subtle)',
              padding: '4px',
              borderRadius: 'var(--radius-md)',
              marginBottom: '16px',
              border: '1px solid var(--border-color)',
              gap: '4px'
            }}>
              <button
                type="button"
                onClick={() => { setLoginMethod('password'); setLoginError(''); }}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '0.84rem',
                  fontWeight: loginMethod === 'password' ? '700' : '500',
                  background: loginMethod === 'password' ? 'var(--bg-card)' : 'transparent',
                  color: loginMethod === 'password' ? 'var(--primary)' : 'var(--text-muted)',
                  boxShadow: loginMethod === 'password' ? 'var(--shadow-xs)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <Lock size={14} />
                <span>Đăng nhập Mật khẩu</span>
              </button>

              <button
                type="button"
                onClick={() => { setLoginMethod('otp'); setLoginError(''); }}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '0.84rem',
                  fontWeight: loginMethod === 'otp' ? '700' : '500',
                  background: loginMethod === 'otp' ? 'var(--bg-card)' : 'transparent',
                  color: loginMethod === 'otp' ? 'var(--primary)' : 'var(--text-muted)',
                  boxShadow: loginMethod === 'otp' ? 'var(--shadow-xs)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <Mail size={14} />
                <span>Mã xác nhận qua Email</span>
              </button>
            </div>

            {loginError && (
              <div className="auth-error-banner" style={{ marginBottom: '16px' }}>
                {loginError}
              </div>
            )}

            {/* FORM A: PASSWORD LOGIN */}
            {loginMethod === 'password' && (
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
                  <button
                    type="button"
                    className="auth-link-btn"
                    onClick={() => { setLoginMethod('otp'); setOtpEmail(loginEmail); }}
                    style={{ fontSize: '0.82rem' }}
                  >
                    Quên mật khẩu / Dùng mã OTP?
                  </button>
                </div>

                <button type="submit" className="btn btn-primary auth-submit-btn">
                  <span>ĐĂNG NHẬP HỆ THỐNG</span>
                  <ArrowRight size={18} />
                </button>
              </form>
            )}

            {/* FORM B: EMAIL OTP LOGIN (Yêu cầu ảnh 5: Thêm xác nhận và lấy mã để đăng nhập bằng email) */}
            {loginMethod === 'otp' && (
              <form onSubmit={handleOtpLoginSubmit} className="auth-form">
                <div className="auth-field">
                  <label style={{ fontSize: '0.86rem', fontWeight: '700', color: 'var(--text-main)' }}>
                    Địa chỉ Email của bạn <span className="required">*</span>
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <div className="auth-input-wrapper" style={{ flex: 1 }}>
                      <Mail size={18} className="auth-input-icon" />
                      <input 
                        type="email" 
                        required
                        className="auth-input" 
                        placeholder="Nhập email của bạn (VD: letuanthanh2606@gmail.com)"
                        value={otpEmail}
                        onChange={(e) => setOtpEmail(e.target.value)}
                      />
                    </div>
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={handleRequestOtp}
                      disabled={otpCountdown > 0}
                      style={{
                        whiteSpace: 'nowrap',
                        fontSize: '0.84rem',
                        fontWeight: '700',
                        padding: '0 14px',
                        borderColor: 'var(--primary)',
                        color: 'var(--primary)',
                        gap: '6px'
                      }}
                    >
                      {otpCountdown > 0 ? (
                        <>
                          <RotateCw size={14} className="spin-slow" />
                          <span>Gửi lại ({otpCountdown}s)</span>
                        </>
                      ) : (
                        <>
                          <Send size={14} />
                          <span>Lấy mã xác nhận</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Hệ thống sẽ cấp mã xác thực gồm 6 chữ số gửi trực tiếp qua email của bạn.
                  </p>
                </div>

                {/* Banner Thông báo Mã OTP giả lập gửi về Email */}
                {otpBanner && (
                  <div style={{
                    background: '#ecfdf5',
                    border: '1px solid #6ee7b7',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    marginBottom: '16px',
                    animation: 'fadeIn 0.3s ease'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#065f46', fontWeight: '700', fontSize: '0.88rem' }}>
                      <CheckCircle2 size={18} color="#059669" />
                      <span>Đã gửi mã xác nhận đến: {otpBanner.email}</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: '8px',
                      background: '#fff',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px dashed #059669'
                    }}>
                      <div>
                        <span style={{ fontSize: '0.78rem', color: '#6b7280' }}>Mã xác thực OTP: </span>
                        <strong style={{ fontSize: '1.25rem', letterSpacing: '4px', color: '#047857' }}>
                          {otpBanner.code}
                        </strong>
                      </div>
                      <button 
                        type="button"
                        className="btn btn-primary btn-sm"
                        style={{ padding: '4px 10px', fontSize: '0.76rem', gap: '4px' }}
                        onClick={() => setOtpInput(otpBanner.code)}
                      >
                        <span>Tự động điền mã</span>
                      </button>
                    </div>
                    <p style={{ fontSize: '0.74rem', color: '#047857', marginTop: '6px', margin: 0 }}>
                      * Mã có hiệu lực trong 5 phút. Vui lòng nhập mã bên dưới để xác thực.
                    </p>
                  </div>
                )}

                <div className="auth-field">
                  <label style={{ fontSize: '0.86rem', fontWeight: '700', color: 'var(--text-main)' }}>
                    Nhập mã xác nhận OTP (6 chữ số) <span className="required">*</span>
                  </label>
                  <div className="auth-input-wrapper">
                    <ShieldCheck size={18} className="auth-input-icon" />
                    <input 
                      type="text"
                      maxLength={6}
                      required
                      value={otpInput}
                      onChange={(e) => setOtpInput(e.target.value.trim())}
                      placeholder="Ví dụ: 864219"
                      className="auth-input" 
                      style={{
                        letterSpacing: '4px',
                        fontWeight: '800',
                        fontSize: '1.15rem'
                      }}
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary auth-submit-btn">
                  <span>XÁC NHẬN MÃ & ĐĂNG NHẬP</span>
                  <ArrowRight size={18} />
                </button>
              </form>
            )}

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
