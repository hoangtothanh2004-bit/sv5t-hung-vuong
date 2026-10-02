import { generateFullStudentList } from '../data/mockStudents';
import { INITIAL_COLLECTIVES, INITIAL_STAR_JAN } from '../data/mockCategoriesData';

const STORAGE_KEY_STUDENTS = 'hvu_sv5t_students_v1';
const STORAGE_KEY_USER = 'hvu_sv5t_current_user_v1';
const STORAGE_KEY_SETTINGS = 'hvu_sv5t_settings_v1';
const STORAGE_KEY_COLLECTIVES = 'hvu_sv5t_collectives_v1';
const STORAGE_KEY_STAR_JAN = 'hvu_sv5t_starjan_v1';

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

export function getStoredCollectives() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_COLLECTIVES);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error reading collectives from localStorage', e);
  }
  const initial = INITIAL_COLLECTIVES;
  saveCollectives(initial);
  return initial;
}

export function saveCollectives(collectives) {
  try {
    localStorage.setItem(STORAGE_KEY_COLLECTIVES, JSON.stringify(collectives));
  } catch (e) {
    console.error('Error saving collectives to localStorage', e);
  }
}

export function resetCollectivesToDefault() {
  saveCollectives(INITIAL_COLLECTIVES);
  return INITIAL_COLLECTIVES;
}

export function getStoredStarJan() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_STAR_JAN);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error reading starJan from localStorage', e);
  }
  const initial = INITIAL_STAR_JAN;
  saveStarJan(initial);
  return initial;
}

export function saveStarJan(starJanList) {
  try {
    localStorage.setItem(STORAGE_KEY_STAR_JAN, JSON.stringify(starJanList));
  } catch (e) {
    console.error('Error saving starJan to localStorage', e);
  }
}

export function resetStarJanToDefault() {
  saveStarJan(INITIAL_STAR_JAN);
  return INITIAL_STAR_JAN;
}

export function getCurrentUser() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_USER);
    if (saved === 'null') {
      return null;
    }
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error reading user from localStorage', e);
  }
  // Mặc định ban đầu khi mới truy cập lần đầu
  return null;
}

export function saveCurrentUser(user) {
  try {
    if (!user) {
      localStorage.setItem(STORAGE_KEY_USER, 'null');
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
