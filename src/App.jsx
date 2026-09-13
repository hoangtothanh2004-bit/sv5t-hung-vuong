import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AuthPage from './pages/AuthPage';
import TeacherReviewPage from './pages/TeacherReviewPage';
import StudentStandardsPage from './pages/StudentStandardsPage';
import StudentProfilePage from './pages/StudentProfilePage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import StudentDossierDetailModal from './pages/StudentDossierDetailModal';
import { 
  getStoredStudents, 
  saveStudents, 
  getCurrentUser, 
  saveCurrentUser,
  resetStudentsToDefault 
} from './utils/storage';

export default function App() {
  const [students, setStudents] = useState([]);
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [activeTab, setActiveTab] = useState('teacher_review');
  const [selectedStudentForDetail, setSelectedStudentForDetail] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Initialize data on mount
  useEffect(() => {
    const loadedStudents = getStoredStudents();
    setStudents(loadedStudents);
    
    // Set initial active tab according to user role
    if (currentUser) {
      if (currentUser.role === 'teacher') {
        setActiveTab('teacher_review');
      } else if (currentUser.role === 'student') {
        setActiveTab('student_standards');
      } else if (currentUser.role === 'admin') {
        setActiveTab('admin_dashboard');
      }
    }
  }, []);

  // Sync dark mode class on HTML body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [darkMode]);

  // Update students & persist
  const handleUpdateStudents = (newStudentsList) => {
    setStudents(newStudentsList);
    saveStudents(newStudentsList);
  };

  // Update a single student (e.g. from student profile or criteria submission)
  const handleUpdateSingleStudent = (updatedStudent) => {
    const updatedList = students.map(s => s.id === updatedStudent.id ? updatedStudent : s);
    setStudents(updatedList);
    saveStudents(updatedList);
    if (selectedStudentForDetail && selectedStudentForDetail.id === updatedStudent.id) {
      setSelectedStudentForDetail(updatedStudent);
    }
  };

  // Reset data to defaults
  const handleResetData = () => {
    if (window.confirm('Bạn có chắc chắn muốn đặt lại dữ liệu hơn 65 sinh viên mẫu ban đầu không?')) {
      const fresh = resetStudentsToDefault();
      setStudents(fresh);
    }
  };

  // Login handler
  const handleLogin = (credentials) => {
    const email = credentials.email ? credentials.email.trim().toLowerCase() : '';

    // If logging in as teacher (pre-provisioned)
    if (credentials.role === 'teacher' || email === 'thangnv@hvu.edu.vn' || email === 'hungtd@hvu.edu.vn' || email === 'giangvien') {
      const teacherUser = {
        role: 'teacher',
        name: credentials.name || (email === 'hungtd@hvu.edu.vn' ? 'ThS. Trần Đình Hưng' : 'ThS. Nguyễn Văn Thắng'),
        email: email || 'thangnv@hvu.edu.vn',
        title: credentials.title || 'Phó Bí thư Đoàn trường - Trưởng ban Thẩm định SV5T',
        avatar: email === 'hungtd@hvu.edu.vn' 
          ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80'
          : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80'
      };
      setCurrentUser(teacherUser);
      saveCurrentUser(teacherUser);
      setActiveTab('teacher_review');
      return true;
    }

    // If logging in as admin
    if (credentials.role === 'admin' || email === 'admin' || email === 'admin@hvu.edu.vn' || email === 'doantruong@hvu.edu.vn') {
      const adminUser = {
        role: 'admin',
        name: 'Đ/c Trần Quốc Tuấn',
        email: 'doantruong@hvu.edu.vn',
        title: 'Bí thư Đoàn Thanh niên - Chủ tịch Hội Sinh viên trường',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80'
      };
      setCurrentUser(adminUser);
      saveCurrentUser(adminUser);
      setActiveTab('teacher_review');
      return true;
    }

    // If logging in as student - check email, student code, id, or sample accounts
    const matchedStudent = students.find(s => 
      s.email.toLowerCase() === email ||
      s.studentCode.toLowerCase() === email ||
      s.id.toLowerCase() === email ||
      email.includes('thanh') ||
      email.includes('sinhvien')
    ) || students[0];

    if (matchedStudent) {
      const studentUser = {
        role: 'student',
        studentId: matchedStudent.id,
        name: matchedStudent.name,
        email: matchedStudent.email,
        title: 'Sinh viên nộp minh chứng',
        avatar: matchedStudent.avatar
      };
      setCurrentUser(studentUser);
      saveCurrentUser(studentUser);
      setActiveTab('student_standards');
      return true;
    }

    return false;
  };

  // Register student handler
  const handleRegisterStudent = (newInfo) => {
    const newId = `hvu-${Date.now()}`;
    const newStudent = {
      id: newId,
      name: newInfo.name,
      studentCode: newInfo.studentCode,
      email: newInfo.email,
      gender: 'Nam',
      dob: '01/01/2005',
      ethnicity: 'Kinh',
      year: 'Năm thứ 2',
      degree: 'Đại học chính quy',
      className: newInfo.className,
      facultyId: newInfo.facultyId,
      facultyName: newInfo.facultyName,
      position: 'Đoàn viên',
      unionStatus: 'Đoàn viên',
      phone: '0900000000',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      gpa: 3.45,
      drl: 88,
      hasEnglishCert: false,
      hasResearch: false,
      hasVolunteerCampaign: false,
      hasBloodDonation: false,
      hasSports: false,
      submittedDate: new Date().toLocaleString('vi-VN'),
      overallStatus: 'pending',
      criteriaStatus: {
        TC1: { status: 'pending', note: 'Chờ thẩm định rèn luyện' },
        TC2: { status: 'pending', note: 'Chờ thẩm định học tập' },
        TC3: { status: 'pending', note: 'Chờ thẩm định thể lực' },
        TC4: { status: 'pending', note: 'Chờ thẩm định tình nguyện' },
        TC5: { status: 'pending', note: 'Chờ thẩm định hội nhập' }
      },
      evidences: {
        TC1: [],
        TC2: [],
        TC3: [],
        TC4: [],
        TC5: []
      }
    };

    const updatedStudents = [newStudent, ...students];
    setStudents(updatedStudents);
    saveStudents(updatedStudents);

    const studentUser = {
      role: 'student',
      studentId: newStudent.id,
      name: newStudent.name,
      email: newStudent.email,
      title: 'Sinh viên nộp hồ sơ',
      avatar: newStudent.avatar
    };

    setCurrentUser(studentUser);
    saveCurrentUser(studentUser);
    setActiveTab('student_standards');
  };

  // Logout handler
  const handleLogout = () => {
    if (window.confirm('Bạn có chắc chắn muốn đăng xuất không?')) {
      setCurrentUser(null);
      saveCurrentUser(null);
      setActiveTab('default');
    }
  };

  // Active student object for student view
  const activeStudent = students.find(s => s.id === (currentUser?.studentId || 'hvu-001')) || students[0];

  // If user is not logged in, render the AuthPage (Matching video login & register)
  if (!currentUser) {
    return (
      <div className="app-container">
        <AuthPage 
          onLogin={handleLogin}
          onRegisterStudent={handleRegisterStudent}
        />
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Top Header with Role-Isolated Navigation & Logout */}
      <Navbar 
        currentUser={currentUser}
        onLogout={handleLogout}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main View Container - STRICTLY ISOLATED BY ROLE */}
      <main className="main-content">
        {/* ================= GIAO DIỆN DÀNH RIÊNG CHO GIẢNG VIÊN ================= */}
        {currentUser.role === 'teacher' && (
          <>
            {activeTab === 'teacher_review' && (
              <TeacherReviewPage 
                students={students}
                onUpdateStudents={handleUpdateStudents}
                onOpenStudentDetail={(student) => setSelectedStudentForDetail(student)}
                onResetData={handleResetData}
              />
            )}

            {activeTab === 'teacher_analytics' && (
              <AdminDashboardPage students={students} />
            )}
          </>
        )}

        {/* ================= GIAO DIỆN DÀNH RIÊNG CHO SINH VIÊN ================= */}
        {currentUser.role === 'student' && (
          <>
            {activeTab === 'student_standards' && (
              <StudentStandardsPage 
                student={activeStudent}
                onUpdateStudent={handleUpdateSingleStudent}
              />
            )}

            {activeTab === 'student_profile' && (
              <StudentProfilePage 
                student={activeStudent}
                onUpdateStudent={handleUpdateSingleStudent}
              />
            )}
          </>
        )}

        {/* ================= GIAO DIỆN DÀNH RIÊNG CHO QUẢN TRỊ VIÊN ================= */}
        {currentUser.role === 'admin' && (
          <>
            {activeTab === 'admin_dashboard' && (
              <AdminDashboardPage students={students} />
            )}
            {activeTab === 'teacher_review' && (
              <TeacherReviewPage 
                students={students}
                onUpdateStudents={handleUpdateStudents}
                onOpenStudentDetail={(student) => setSelectedStudentForDetail(student)}
                onResetData={handleResetData}
              />
            )}
          </>
        )}
      </main>

      {/* Detail Modal for 1 Student Dossier */}
      {selectedStudentForDetail && (
        <StudentDossierDetailModal 
          student={selectedStudentForDetail}
          onClose={() => setSelectedStudentForDetail(null)}
          onUpdateStudent={handleUpdateSingleStudent}
        />
      )}
    </div>
  );
}
