import React from 'react';
import { 
  Award, 
  GraduationCap, 
  Users, 
  Settings, 
  Moon, 
  Sun, 
  FileText, 
  LogOut
} from 'lucide-react';
import { ORG_NAME, UNIVERSITY_NAME } from '../data/faculties';

export default function Navbar({ 
  currentUser, 
  onLogout,
  activeTab, 
  setActiveTab, 
  darkMode, 
  setDarkMode
}) {
  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Top Header Row (Logo, Title & User Controls) */}
        <div className="navbar-top-bar">
          
          {/* Brand & Logos */}
          <div className="brand-section">
            <div className="brand-logos">
              {/* Logo Hội Sinh Viên */}
              <div className="logo-badge" title="Hội Sinh Viên Việt Nam - HVU">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="46" fill="#005baa" />
                  <circle cx="50" cy="50" r="43" stroke="#ffcc00" strokeWidth="2" />
                  <path d="M50 20 C60 20, 75 30, 75 45 C75 60, 60 70, 50 78 C40 70, 25 60, 25 45 C25 30, 40 20, 50 20 Z" fill="#ffffff" />
                  <path d="M50 26 L55 38 L68 39 L58 48 L61 61 L50 54 L39 61 L42 48 L32 39 L45 38 Z" fill="#005baa" />
                </svg>
              </div>

              {/* Logo HVU School badge (Desktop only) */}
              <div className="logo-badge logo-badge-school" title="Trường Đại học Hùng Vương">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="100" height="100" rx="10" fill="#ffffff" />
                  <path d="M50 12 L85 30 L85 70 L50 88 L15 70 L15 30 Z" stroke="#005baa" strokeWidth="4" fill="#f0f7ff" />
                  <text x="50" y="55" fontSize="22" fontWeight="bold" fill="#005baa" textAnchor="middle">HVU</text>
                  <text x="50" y="70" fontSize="10" fontWeight="bold" fill="#f59e0b" textAnchor="middle">1961</text>
                </svg>
              </div>
            </div>

            {/* Desktop Brand Text */}
            <div className="brand-text-desktop">
              <span className="brand-org">{ORG_NAME}</span>
              <span className="brand-title">XÉT CHỌN SINH VIÊN 5 TỐT</span>
              <span className="brand-sub">Năm học 2025 - 2026 • Cấp Trường</span>
            </div>

            {/* Mobile Compact Brand Text */}
            <div className="brand-text-mobile">
              <span className="brand-mobile-org">ĐH HÙNG VƯƠNG</span>
              <span className="brand-mobile-title">XÉT CHỌN SV5T</span>
            </div>
          </div>

          {/* Desktop Inline Navigation Tabs (Hidden on mobile) */}
          <nav className="nav-menu-desktop">
            {currentUser.role === 'teacher' && (
              <>
                <button 
                  className={`nav-tab-btn ${activeTab === 'teacher_review' ? 'active' : ''}`}
                  onClick={() => setActiveTab('teacher_review')}
                >
                  <Users size={16} />
                  <span>Thẩm định & Chấm hàng loạt</span>
                </button>
                <button 
                  className={`nav-tab-btn ${activeTab === 'teacher_analytics' ? 'active' : ''}`}
                  onClick={() => setActiveTab('teacher_analytics')}
                >
                  <Award size={16} />
                  <span>Báo cáo & Thống kê Khoa</span>
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
                  <span>Kê khai 5 Tiêu chuẩn</span>
                </button>
                <button 
                  className={`nav-tab-btn ${activeTab === 'student_profile' ? 'active' : ''}`}
                  onClick={() => setActiveTab('student_profile')}
                >
                  <FileText size={16} />
                  <span>Lý lịch cá nhân</span>
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
                  <span>Cấu hình đợt xét chọn</span>
                </button>
                <button 
                  className={`nav-tab-btn ${activeTab === 'teacher_review' ? 'active' : ''}`}
                  onClick={() => setActiveTab('teacher_review')}
                >
                  <Users size={16} />
                  <span>Toàn bộ danh sách</span>
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
                src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80'} 
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
                <span>Thẩm định & Chấm duyệt</span>
              </button>
              <button 
                className={`mobile-tab-pill ${activeTab === 'teacher_analytics' ? 'active' : ''}`}
                onClick={() => setActiveTab('teacher_analytics')}
              >
                <Award size={15} />
                <span>Thống kê Khoa / Viện</span>
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
                <span>Kê khai 5 Tiêu chuẩn</span>
              </button>
              <button 
                className={`mobile-tab-pill ${activeTab === 'student_profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('student_profile')}
              >
                <FileText size={15} />
                <span>Lý lịch cá nhân</span>
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
