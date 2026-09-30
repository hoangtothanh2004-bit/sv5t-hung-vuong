import React from 'react';
import { 
  Award, 
  GraduationCap, 
  Users, 
  Settings, 
  Moon, 
  Sun, 
  FileText, 
  LogOut,
  RefreshCw
} from 'lucide-react';

import logoTruong from '../assets/logo-truong.png';
import logoHoiSinhVien from '../assets/logo-hoisinhvien.png';
import { DEFAULT_AVATAR } from '../utils/avatar';

export default function Navbar({ 
  currentUser, 
  onLogout,
  activeTab, 
  setActiveTab, 
  darkMode, 
  setDarkMode,
  onOpenSync
}) {
  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Top Header Row (Logo, Title & User Controls) */}
        <div className="navbar-top-bar">
          
          {/* Brand & Logos */}
          <div className="brand-section">
            {/* Brand Logos: Logo Trường và Logo Hội Sinh viên */}
            <div className="brand-logos">
              {/* Logo Trường Đại học Hùng Vương */}
              <div className="logo-badge logo-badge-school" title="Trường Đại học Hùng Vương">
                <img src={logoTruong} alt="Logo Trường Đại học Hùng Vương" />
              </div>

              {/* Logo Hội Sinh Viên */}
              <div className="logo-badge" title="Hội Sinh viên Việt Nam - HVU">
                <img src={logoHoiSinhVien} alt="Logo Hội Sinh viên Việt Nam" />
              </div>
            </div>

            {/* Brand Text: HỘI SINH VIÊN TRƯỜNG ĐẠI HỌC HÙNG VƯƠNG */}
            <div className="brand-text-desktop">
              <span className="brand-title" style={{ fontSize: '1.05rem', letterSpacing: '0.01em' }}>
                HỘI SINH VIÊN TRƯỜNG ĐẠI HỌC HÙNG VƯƠNG
              </span>
            </div>

            {/* Mobile Compact Brand Text */}
            <div className="brand-text-mobile">
              <span className="brand-mobile-title" style={{ fontSize: '0.9rem' }}>
                HỘI SINH VIÊN ĐH HÙNG VƯƠNG
              </span>
            </div>
          </div>

          {/* Desktop Inline Navigation Tabs */}
          <nav className="nav-menu-desktop">
            {currentUser.role === 'teacher' && (
              <>
                <button 
                  className={`nav-tab-btn ${activeTab === 'teacher_review' ? 'active' : ''}`}
                  onClick={() => setActiveTab('teacher_review')}
                >
                  <Users size={16} />
                  <span>Thẩm định hồ sơ</span>
                </button>
                <button 
                  className={`nav-tab-btn ${activeTab === 'teacher_analytics' ? 'active' : ''}`}
                  onClick={() => setActiveTab('teacher_analytics')}
                >
                  <Award size={16} />
                  <span>Báo cáo thống kê</span>
                </button>
              </>
            )}

            {currentUser.role === 'student' && (
              <>
                <button 
                  className={`nav-tab-btn ${activeTab === 'student_standards' ? 'active' : ''}`}
                  onClick={() => setActiveTab('student_standards')}
                >
                  <GraduationCap size={16} />
                  <span>Hồ sơ xét chọn danh hiệu</span>
                </button>
                <button 
                  className={`nav-tab-btn ${activeTab === 'student_profile' ? 'active' : ''}`}
                  onClick={() => setActiveTab('student_profile')}
                >
                  <FileText size={16} />
                  <span>Thông tin cá nhân</span>
                </button>
              </>
            )}

            {currentUser.role === 'admin' && (
              <>
                <button 
                  className={`nav-tab-btn ${activeTab === 'admin_dashboard' ? 'active' : ''}`}
                  onClick={() => setActiveTab('admin_dashboard')}
                >
                  <Settings size={16} />
                  <span>Cấu hình xét chọn</span>
                </button>
                <button 
                  className={`nav-tab-btn ${activeTab === 'teacher_review' ? 'active' : ''}`}
                  onClick={() => setActiveTab('teacher_review')}
                >
                  <Users size={16} />
                  <span>Danh sách hồ sơ</span>
                </button>
              </>
            )}
          </nav>

          {/* Right side controls: Theme toggle, User badge & Logout */}
          <div className="nav-controls">
            {/* Quick theme toggle */}
            <button 
              className="btn-theme-toggle" 
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? "Chuyển sang giao diện Sáng" : "Chuyển sang giao diện Tối"}
            >
              {darkMode ? <Sun size={17} color="#f59e0b" /> : <Moon size={17} color="#005baa" />}
            </button>

            {/* Quick device sync button */}
            {onOpenSync && (
              <button 
                className="btn-theme-toggle" 
                onClick={onOpenSync}
                title="Đồng bộ dữ liệu thiết bị (Chuyển giữa Máy tính - Điện thoại)"
                style={{ color: 'var(--primary)' }}
              >
                <RefreshCw size={16} />
              </button>
            )}

            {/* User profile info */}
            <div className="user-profile-wrap">
              <div className="user-text-box">
                <span className="user-name-text">
                  {currentUser.name}
                </span>
                <span className={`user-role-badge role-${currentUser.role}`}>
                  {currentUser.role === 'teacher' && '👨‍🏫 Giảng viên'}
                  {currentUser.role === 'student' && '🎓 Sinh viên'}
                  {currentUser.role === 'admin' && '⚙️ Quản trị viên'}
                </span>
              </div>

              <img 
                src={currentUser.avatar || DEFAULT_AVATAR} 
                alt="Avatar"
                className="user-avatar-badge"
              />

              {/* Logout Button */}
              <button 
                className="btn-logout-nav"
                onClick={onLogout}
                title="Đăng xuất"
              >
                <LogOut size={16} />
                <span className="logout-label">Đăng xuất</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Horizontal Scrollable Tab Bar (Only visible on mobile) */}
        <nav className="nav-menu-mobile">
          {currentUser.role === 'teacher' && (
            <>
              <button 
                className={`mobile-tab-pill ${activeTab === 'teacher_review' ? 'active' : ''}`}
                onClick={() => setActiveTab('teacher_review')}
              >
                <Users size={15} />
                <span>Thẩm định hồ sơ</span>
              </button>
              <button 
                className={`mobile-tab-pill ${activeTab === 'teacher_analytics' ? 'active' : ''}`}
                onClick={() => setActiveTab('teacher_analytics')}
              >
                <Award size={15} />
                <span>Báo cáo thống kê</span>
              </button>
            </>
          )}

          {currentUser.role === 'student' && (
            <>
              <button 
                className={`mobile-tab-pill ${activeTab === 'student_standards' ? 'active' : ''}`}
                onClick={() => setActiveTab('student_standards')}
              >
                <GraduationCap size={15} />
                <span>Hồ sơ xét chọn danh hiệu</span>
              </button>
              <button 
                className={`mobile-tab-pill ${activeTab === 'student_profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('student_profile')}
              >
                <FileText size={15} />
                <span>Thông tin cá nhân</span>
              </button>
            </>
          )}

          {currentUser.role === 'admin' && (
            <>
              <button 
                className={`mobile-tab-pill ${activeTab === 'admin_dashboard' ? 'active' : ''}`}
                onClick={() => setActiveTab('admin_dashboard')}
              >
                <Settings size={15} />
                <span>Cấu hình đợt xét chọn</span>
              </button>
              <button 
                className={`mobile-tab-pill ${activeTab === 'teacher_review' ? 'active' : ''}`}
                onClick={() => setActiveTab('teacher_review')}
              >
                <Users size={15} />
                <span>Toàn bộ danh sách</span>
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
