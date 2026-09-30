import { getStoredStudents, saveStudents, getSystemSettings, saveSystemSettings } from './storage';

const CLOUD_CONFIG_KEY = 'hvu_sv5t_cloud_config_v1';

export function getCloudConfig() {
  try {
    const saved = localStorage.getItem(CLOUD_CONFIG_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

export function saveCloudConfig(config) {
  try {
    localStorage.setItem(CLOUD_CONFIG_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Error saving cloud config', e);
  }
}

// Xuất toàn bộ dữ liệu hệ thống thành chuỗi mã đồng bộ (Base64)
export function generateSyncCode() {
  const data = {
    app: 'SV5T_HVU',
    version: '2026.1',
    exportedAt: new Date().toISOString(),
    students: getStoredStudents(),
    settings: getSystemSettings()
  };
  try {
    const json = JSON.stringify(data);
    // Mã hoá UTF-8 an toàn sang Base64
    return btoa(unescape(encodeURIComponent(json)));
  } catch (e) {
    console.error('Error generating sync code', e);
    return null;
  }
}

// Nhập dữ liệu từ chuỗi mã đồng bộ
export function restoreFromSyncCode(code) {
  try {
    const json = decodeURIComponent(escape(atob(code.trim())));
    const data = JSON.parse(json);
    if (!data.students || !Array.isArray(data.students)) {
      return { success: false, error: 'Mã đồng bộ không hợp lệ hoặc bị lỗi định dạng!' };
    }
    saveStudents(data.students);
    if (data.settings) {
      saveSystemSettings(data.settings);
    }
    return { success: true, count: data.students.length };
  } catch {
    return { success: false, error: 'Mã đồng bộ không hợp lệ. Vui lòng kiểm tra lại!' };
  }
}

// Tải file backup JSON về máy
export function exportDataAsJsonFile() {
  const data = {
    app: 'SV5T_HVU',
    version: '2026.1',
    exportedAt: new Date().toISOString(),
    students: getStoredStudents(),
    settings: getSystemSettings()
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Du_lieu_SV5T_HVU_${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
