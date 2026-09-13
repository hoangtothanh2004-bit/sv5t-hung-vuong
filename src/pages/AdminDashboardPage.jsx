import React, { useState } from 'react';
import { 
  Calendar, 
  Sliders, 
  CheckCircle, 
  Building, 
  Save,
  Clock,
  Sparkles,
  CheckCheck,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { FACULTIES, UNIVERSITY_NAME, ORG_NAME } from '../data/faculties';
import { getSystemSettings, saveSystemSettings } from '../utils/storage';

export default function AdminDashboardPage({ students }) {
  const [settings, setSettings] = useState(getSystemSettings());
  const [savedAlert, setSavedAlert] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    saveSystemSettings(settings);
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 3000);
  };

  // Group statistics by Faculty
  const facultyStats = FACULTIES.map(f => {
    const facultyStudents = students.filter(s => s.facultyId === f.id);
    const passed = facultyStudents.filter(s => {
      return Object.values(s.criteriaStatus).filter(c => c.status === 'approved').length === 5;
    }).length;
    const goodGpa = facultyStudents.filter(s => s.gpa >= (settings.minGpaGood || 3.2)).length;

    return {
      ...f,
      total: facultyStudents.length,
      passed,
      goodGpa,
      passRate: facultyStudents.length > 0 ? Math.round((passed / facultyStudents.length) * 100) : 0
    };
  });

  const totalApplications = students.length;
  const totalGoodGpa = students.filter(s => s.gpa >= (settings.minGpaGood || 3.2)).length;
  const totalPassed = students.filter(s => {
    return Object.values(s.criteriaStatus).filter(c => c.status === 'approved').length === 5;
  }).length;
  const overallRate = totalApplications > 0 ? Math.round((totalPassed / totalApplications) * 100) : 0;

  return (
    <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
      {/* Toast Alert */}
      {savedAlert && (
        <div style={{
          position: 'fixed',
          top: '84px',
          right: '24px',
          zIndex: 999,
          background: '#10b981',
          color: '#fff',
          padding: '12px 22px',
          borderRadius: 'var(--radius-md)',
          boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontWeight: '700',
          fontSize: '0.92rem',
          animation: 'slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <CheckCircle size={22} />
          <span>Đã lưu cấu hình đợt xét chọn thành công!</span>
        </div>
      )}

      {/* Header Banner */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span style={{ 
            fontSize: '0.78rem', 
            fontWeight: '700', 
            color: 'var(--primary)', 
            textTransform: 'uppercase', 
            letterSpacing: '0.05em' 
          }}>
            Hệ thống Quản trị Đoàn - Hội • {UNIVERSITY_NAME}
          </span>
          <span style={{
            fontSize: '0.72rem',
            padding: '2px 8px',
            borderRadius: 'var(--radius-full)',
            background: settings.isOpen ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
            color: settings.isOpen ? '#10b981' : '#ef4444',
            fontWeight: '700'
          }}>
            {settings.isOpen ? '● Cổng đang mở' : '● Cổng đang đóng'}
          </span>
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--text-main)', letterSpacing: '-0.01em' }}>
          Cấu Hình Đợt Xét Chọn & Thống Kê Toàn Trường
        </h2>
      </div>

      {/* Top 2 Config Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px', marginBottom: '28px' }}>
        
        {/* Card 1: Time settings */}
        <div className="card">
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            marginBottom: '20px', 
            borderBottom: '1px solid var(--border-color)', 
            paddingBottom: '14px' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'var(--primary-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary)'
              }}>
                <Calendar size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-main)' }}>Thời gian mở cổng xét chọn</h3>
                <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Quy định tiến độ nộp và thẩm định</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSave}>
            <div className="form-group" style={{ marginBottom: '14px' }}>
              <label className="form-label">
                Năm học xét chọn: <span className="required">*</span>
              </label>
              <input 
                type="text" 
                className="input-control" 
                value={settings.academicYear}
                onChange={(e) => setSettings({ ...settings, academicYear: e.target.value })}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '14px' }}>
              <label className="form-label">
                Thời gian bắt đầu nộp hồ sơ:
              </label>
              <input 
                type="datetime-local" 
                className="input-control" 
                value={settings.startDate}
                onChange={(e) => setSettings({ ...settings, startDate: e.target.value })}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '14px' }}>
              <label className="form-label">
                Hạn chót sinh viên nộp hồ sơ: <span className="required">*</span>
              </label>
              <input 
                type="datetime-local" 
                className="input-control" 
                value={settings.endDate}
                onChange={(e) => setSettings({ ...settings, endDate: e.target.value })}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '18px' }}>
              <label className="form-label">
                Hạn chót Hội đồng cấp trường thẩm định:
              </label>
              <input 
                type="datetime-local" 
                className="input-control" 
                value={settings.reviewDeadline}
                onChange={(e) => setSettings({ ...settings, reviewDeadline: e.target.value })}
              />
            </div>

            {/* Modern Toggle Switch Container */}
            <div 
              className="toggle-switch-container"
              style={{ marginBottom: '20px' }}
              onClick={() => setSettings({ ...settings, isOpen: !settings.isOpen })}
            >
              <label className="toggle-switch" onClick={(e) => e.stopPropagation()}>
                <input 
                  type="checkbox" 
                  checked={settings.isOpen}
                  onChange={(e) => setSettings({ ...settings, isOpen: e.target.checked })}
                />
                <span className="toggle-slider"></span>
              </label>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-main)' }}>
                  {settings.isOpen ? 'Đang mở cổng tiếp nhận hồ sơ trực tuyến' : 'Đang tạm khóa cổng tiếp nhận hồ sơ'}
                </span>
                <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                  {settings.isOpen ? 'Sinh viên toàn trường có thể đăng ký và nộp minh chứng' : 'Sinh viên chỉ có thể xem, không thể nộp thêm'}
                </span>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ 
                width: '100%', 
                gap: '8px', 
                padding: '12px',
                fontSize: '0.94rem',
                fontWeight: '700',
                boxShadow: '0 4px 12px rgba(0, 91, 170, 0.3)'
              }}
            >
              <Save size={18} />
              <span>Lưu cài đặt thời gian</span>
            </button>
          </form>
        </div>

        {/* Card 2: Batch Review Thresholds */}
        <div className="card">
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            marginBottom: '20px', 
            borderBottom: '1px solid var(--border-color)', 
            paddingBottom: '14px' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'rgba(245, 158, 11, 0.14)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#d97706'
              }}>
                <Sliders size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-main)' }}>Ngưỡng điểm tự động chấm hàng loạt</h3>
                <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Thiết lập tiêu chuẩn duyệt tức thời</span>
              </div>
            </div>
          </div>

          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '18px', lineHeight: 1.5 }}>
            Quy định các ngưỡng điểm GPA và Điểm rèn luyện để Hội đồng thẩm định lọc và chấm duyệt tự động một loạt sinh viên đạt chuẩn.
          </p>

          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label className="form-label">Ngưỡng GPA Xuất sắc tối thiểu:</label>
            <div className="input-group">
              <input 
                type="number" 
                step="0.05"
                className="input-control" 
                value={settings.minGpaVeryGood}
                onChange={(e) => setSettings({ ...settings, minGpaVeryGood: parseFloat(e.target.value) })}
              />
              <span className="input-addon">/ 4.0</span>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label className="form-label">Ngưỡng GPA Giỏi tối thiểu:</label>
            <div className="input-group">
              <input 
                type="number" 
                step="0.05"
                className="input-control" 
                value={settings.minGpaGood}
                onChange={(e) => setSettings({ ...settings, minGpaGood: parseFloat(e.target.value) })}
              />
              <span className="input-addon">/ 4.0</span>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '22px' }}>
            <label className="form-label">Điểm rèn luyện tối thiểu (Loại Tốt):</label>
            <div className="input-group">
              <input 
                type="number" 
                className="input-control" 
                value={settings.minDrlGood}
                onChange={(e) => setSettings({ ...settings, minDrlGood: parseInt(e.target.value) })}
              />
              <span className="input-addon">điểm / 100</span>
            </div>
          </div>

          <div style={{
            background: 'rgba(245, 158, 11, 0.08)',
            border: '1px solid rgba(245, 158, 11, 0.25)',
            borderRadius: 'var(--radius-md)',
            padding: '14px 16px',
            fontSize: '0.84rem',
            color: '#92400e',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px'
          }}>
            <Sparkles size={18} color="#d97706" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong>Gợi ý thông minh cho Giảng viên:</strong>
              <div style={{ marginTop: '2px', color: 'var(--text-muted)' }}>
                Khi giảng viên chọn bộ lọc <em>"GPA Giỏi trở lên (≥ {settings.minGpaGood})"</em>, hệ thống sẽ trích xuất tức thời <strong>{totalGoodGpa} sinh viên</strong> và cho phép chấm duyệt 1 lượt!
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card 3: Statistics Table by Faculty */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ 
          padding: '20px 24px', 
          borderBottom: '1px solid var(--border-color)',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          background: 'var(--bg-card)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'var(--primary-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary)'
            }}>
              <Building size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-main)' }}>
                Thống kê hồ sơ theo Khoa / Viện trực thuộc HVU
              </h3>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Dữ liệu cập nhật thời gian thực từ 8 Khoa đào tạo của trường
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#dcfce7',
              color: '#15803d',
              padding: '8px 16px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.86rem',
              fontWeight: '800',
              boxShadow: '0 2px 6px rgba(21, 128, 61, 0.15)'
            }}>
              <CheckCheck size={16} />
              <span>Tổng đạt chuẩn SV5T: {totalPassed} sinh viên</span>
            </span>
          </div>
        </div>

        <div className="table-wrapper" style={{ border: 'none', borderRadius: 0 }}>
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '60px', textAlign: 'center' }}>STT</th>
                <th>Khoa / Viện Trực Thuộc</th>
                <th style={{ textAlign: 'center' }}>Tổng hồ sơ nộp</th>
                <th style={{ textAlign: 'center' }}>Hồ sơ GPA Giỏi (≥ {settings.minGpaGood})</th>
                <th style={{ textAlign: 'center' }}>Đạt đủ 5/5 tiêu chuẩn</th>
                <th style={{ textAlign: 'center', width: '180px' }}>Tỷ lệ đạt</th>
              </tr>
            </thead>
            <tbody>
              {facultyStats.map((f, idx) => (
                <tr key={f.id}>
                  <td style={{ textAlign: 'center', fontWeight: '700', color: 'var(--text-muted)' }}>
                    {idx + 1}
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <strong style={{ fontSize: '0.92rem', color: 'var(--text-main)' }}>{f.name}</strong>
                      <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Mã Khoa: {f.id.toUpperCase()}</span>
                    </div>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      background: 'var(--bg-subtle)',
                      borderRadius: 'var(--radius-full)',
                      fontWeight: '700',
                      fontSize: '0.88rem'
                    }}>
                      {f.total}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      background: 'rgba(0, 91, 170, 0.1)',
                      color: 'var(--primary)',
                      borderRadius: 'var(--radius-full)',
                      fontWeight: '700',
                      fontSize: '0.88rem'
                    }}>
                      {f.goodGpa}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 12px',
                      background: f.passed > 0 ? '#dcfce7' : 'var(--bg-subtle)',
                      color: f.passed > 0 ? '#15803d' : 'var(--text-muted)',
                      borderRadius: 'var(--radius-full)',
                      fontWeight: '800',
                      fontSize: '0.88rem'
                    }}>
                      {f.passed > 0 && <CheckCircle size={13} />}
                      {f.passed}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: '800', width: '38px', textAlign: 'right' }}>
                        {f.passRate}%
                      </span>
                      <div className="progress-bar-wrap" style={{ width: '80px', height: '8px' }}>
                        <div className="progress-fill" style={{ width: `${f.passRate}%` }} />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ background: 'var(--bg-subtle)', fontWeight: '800' }}>
                <td style={{ textAlign: 'center' }}>-</td>
                <td>
                  <strong>TOÀN TRƯỜNG ĐH HÙNG VƯƠNG</strong>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <span style={{ fontWeight: '800', color: 'var(--text-main)' }}>{totalApplications}</span>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <span style={{ fontWeight: '800', color: 'var(--primary)' }}>{totalGoodGpa}</span>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <span style={{ fontWeight: '800', color: '#15803d' }}>{totalPassed}</span>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '0.88rem', fontWeight: '900', color: 'var(--primary)' }}>
                      {overallRate}%
                    </span>
                    <div className="progress-bar-wrap" style={{ width: '80px', height: '8px' }}>
                      <div className="progress-fill" style={{ width: `${overallRate}%` }} />
                    </div>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
