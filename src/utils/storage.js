import { generateFullStudentList } from '../data/mockStudents';

const STORAGE_KEY_STUDENTS = 'hvu_sv5t_students_v1';
const STORAGE_KEY_USER = 'hvu_sv5t_current_user_v1';
const STORAGE_KEY_SETTINGS = 'hvu_sv5t_settings_v1';

export function getStoredStudents() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_STUDENTS);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error reading students from localStorage', e);
  }
  const initial = generateFullStudentList();
  saveStudents(initial);
  return initial;
}

export function saveStudents(students) {
  try {
    localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(students));
  } catch (e) {
    console.error('Error saving students to localStorage', e);
  }
}

export function resetStudentsToDefault() {
  const fresh = generateFullStudentList();
  saveStudents(fresh);
  return fresh;
}

export function getCurrentUser() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_USER);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error reading user from localStorage', e);
  }
  // Mặc định ban đầu là tài khoản Giảng viên được cấp sẵn để người dùng mở trang là thấy ngay
  const defaultUser = {
    role: 'teacher',
    name: 'ThS. Nguyễn Văn Thắng',
    email: 'thangnv@hvu.edu.vn',
    title: 'Phó Bí thư Đoàn trường - Trưởng ban Thẩm định'
  };
  return defaultUser;
}

export function saveCurrentUser(user) {
  try {
    if (!user) {
      localStorage.removeItem(STORAGE_KEY_USER);
    } else {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    }
  } catch (e) {
    console.error('Error saving user to localStorage', e);
  }
}

export function getSystemSettings() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_SETTINGS);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error reading settings', e);
  }
  const defaultSettings = {
    academicYear: '2025 - 2026',
    startDate: '2025-10-10T00:00',
    endDate: '2025-10-31T24:00',
    reviewDeadline: '2025-11-05T24:00',
    minGpaVeryGood: 3.6,
    minGpaGood: 3.2,
    minDrlGood: 80,
    isOpen: true
  };
  localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(defaultSettings));
  return defaultSettings;
}

export function saveSystemSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error('Error saving settings', e);
  }
}
