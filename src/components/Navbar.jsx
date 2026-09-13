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
      <div className="navbar-inner">
        {/* Brand & Logos */}
        <div className="brand-section">
          <div className="brand-logos">
            {/* Logo Hội Sinh Viên SVG Icon */}
            <div className="logo-badge" title="Hội Sinh Viên Việt Nam - Trường Đại học Hùng Vương">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="46" fill="#005baa" />
                <circle cx="50" cy="50" r="43" stroke="#ffcc00" strokeWidth="2" />
                <path d="M50 20 C60 20, 75 30, 75 45 C75 60, 60 70, 50 78 C40 70, 25 60, 25 45 C25 30, 40 20, 50 20 Z" fill="#ffffff" />
                <path d="M50 26 L55 38 L68 39 L58 48 L61 61 L50 54 L39 61 L42 48 L32 39 L45 38 Z" fill="#005baa" />
              </svg>
            </div>
            {/* Logo HVU School badge */}
            <div className="logo-badge" title="Trường Đại học Hùng Vương">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="100" height="100" rx="10" fill="#ffffff" />
                <path d="M50 12 L85 30 L85 70 L50 88 L15 70 L15 30 Z" stroke="#005baa" strokeWidth="4" fill="#f0f7ff" />
                <text x="50" y="55" fontSize="22" fontWeight="bold" fill="#005baa" textAnchor="middle">HVU</text>
                <text x="50" y="70" fontSize="10" fontWeight="bold" fill="#f59e0b" textAnchor="middle">1961</text>
              </svg>
            </div>
          </div>

          <div className="brand-text">
            <span className="brand-org">{ORG_NAME}</span>
            <span className="brand-title">XÉT CHỌN SINH VIÊN 5 TỐT</span>
            <span className="brand-sub">Năm học 2025 - 2026 • Cấp Trường</span>
          </div>
        </div>

        {/* Dynamic Navigation Tabs STRICTLY based on logged-in role */}
        <nav className="nav-menu">
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

        {/* Right side controls: Theme toggle, User badge & LOGOUT */}
        <div className="nav-controls">
          {/* Quick theme toggle */}
          <button 
            className="btn btn-outline btn-sm" 
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? "Chuyển sang giao diện Sáng" : "Chuyển sang giao diện Tối"}
          >
            {darkMode ? <Sun size={16} color="#f59e0b" /> : <Moon size={16} color="#005baa" />}
          </button>

          {/* User profile info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.86rem', fontWeight: '800', color: 'var(--text-main)' }}>
                {currentUser.name}
              </span>
              <span style={{ 
                fontSize: '0.72rem', 
                color: currentUser.role === 'teacher' ? 'var(--gold)' : (currentUser.role === 'admin' ? 'var(--primary)' : 'var(--success)'),
                fontWeight: '700'
              }}>
                {currentUser.role === 'teacher' && '👨‍🏫 Giảng viên / Thẩm định'}
                {currentUser.role === 'student' && '🎓 Sinh viên nộp hồ sơ'}
                {currentUser.role === 'admin' && '⚙️ Quản trị viên Đoàn trường'}
              </span>
            </div>

            <img 
              src={currentUser.avatar || (currentUser.role === 'student' 
                ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80'
                : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format&fit=crop&q=80')
              } 
              alt="Avatar"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid var(--primary)',
                boxShadow: 'var(--shadow-xs)'
              }}
            />

            {/* Logout Button */}
            <button 
              className="btn btn-outline btn-sm"
              onClick={onLogout}
              title="Đăng xuất khỏi tài khoản"
              style={{ padding: '6px 10px', color: 'var(--danger)', borderColor: 'rgba(239, 68, 68, 0.3)' }}
            >
              <LogOut size={15} />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
