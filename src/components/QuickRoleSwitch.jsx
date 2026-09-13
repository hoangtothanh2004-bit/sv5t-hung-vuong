import React from 'react';
import { Users, GraduationCap, ShieldAlert, Check } from 'lucide-react';

export default function QuickRoleSwitch({ currentUser, onSwitchRole }) {
  return (
    <div className="floating-role-bar">
      <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', paddingLeft: '8px' }}>
        Chuyển vai trò:
      </span>
      
      <button 
        className={`role-pill-btn ${currentUser.role === 'teacher' ? 'active' : ''}`}
        onClick={() => onSwitchRole('teacher')}
        title="Đăng nhập với vai trò Giảng viên / Hội đồng chấm hồ sơ"
      >
        <Users size={14} />
        <span>Giảng viên duyệt</span>
      </button>

      <button 
        className={`role-pill-btn ${currentUser.role === 'student' ? 'active' : ''}`}
        onClick={() => onSwitchRole('student')}
        title="Đăng nhập với vai trò Sinh viên nộp minh chứng"
      >
        <GraduationCap size={14} />
        <span>Sinh viên</span>
      </button>

      <button 
        className={`role-pill-btn ${currentUser.role === 'admin' ? 'active' : ''}`}
        onClick={() => onSwitchRole('admin')}
        title="Đăng nhập với vai trò Quản trị viên Đoàn - Hội trường"
      >
        <ShieldAlert size={14} />
        <span>Quản trị viên</span>
      </button>
    </div>
  );
}
