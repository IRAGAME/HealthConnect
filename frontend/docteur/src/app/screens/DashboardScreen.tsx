import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { useDoctor } from '@/app/contexts/DoctorContext';
import { useNotification } from '@/app/contexts/NotificationContext';
import { Moon, Sun, Globe, LogOut, Calendar, Users, Bell, Stethoscope } from 'lucide-react';
import { useState } from 'react';

function DoctorDashboard() {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const { t, language, setLanguage } = useLanguage();
  const { appointments, patients } = useDoctor();
  const { unreadCount } = useNotification();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const todayAppointments = appointments.filter(apt => apt.date === new Date().toISOString().split('T')[0]);
  const completedAppointments = appointments.filter(apt => apt.status === 'completed').length;

  const stats = [
    { label: t('stats.totalAppointments'), value: appointments.length, icon: '📅', color: 'bg-blue-500' },
    { label: t('stats.todayAppointments'), value: todayAppointments.length, icon: '🕐', color: 'bg-green-500' },
    { label: t('stats.patients'), value: patients.length, icon: '👥', color: 'bg-purple-500' },
    { label: 'Complétés', value: completedAppointments, icon: '✅', color: 'bg-orange-500' },
  ];

  return (
    <div className={isDark ? 'dark min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/40' : 'min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50'}>
      {/* Header */}
      <header className={`${isDark ? 'bg-slate-900/75 border-cyan-900/40 backdrop-blur-md' : 'bg-white/80 border-gray-200/40 backdrop-blur-md'} border-b shadow-sm transition-colors duration-300 sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t('doctor.title')}
                </h1>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t('doctor.welcome')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Notifications Badge */}
              <button
                onClick={() => navigate('/notifications')}
                className={`relative p-2 rounded-lg transition-all duration-200 ${isDark ? 'bg-slate-900/60 hover:bg-slate-900/80' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-all duration-200 ${isDark ? 'bg-slate-900/60 hover:bg-slate-900/80' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  className={`p-2 rounded-lg transition-all duration-200 ${isDark ? 'bg-slate-900/60 hover:bg-slate-900/80' : 'bg-gray-200 hover:bg-gray-300'}`}
                >
                  <Globe className="w-5 h-5" />
                </button>
                {showLanguageMenu && (
                  <div className={`absolute right-0 mt-2 w-32 rounded-lg shadow-lg border-2 ${isDark ? 'bg-slate-900/60 border-cyan-900/30' : 'bg-white border-gray-200'}`}>
                    {(['fr', 'en', 'ki'] as const).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setLanguage(lang);
                          setShowLanguageMenu(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm first:rounded-t-lg last:rounded-b-lg transition-colors ${
                          language === lang
                            ? `${isDark ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`
                            : `${isDark ? 'text-gray-300 hover:bg-slate-900/70' : 'text-gray-700 hover:bg-gray-100'}`
                        }`}
                      >
                        {lang === 'fr' ? 'Français' : lang === 'en' ? 'English' : 'Kirundi'}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Logout */}
              <button
                onClick={() => navigate('/')}
                className={`p-2 rounded-lg ${isDark ? 'bg-red-900/20 text-red-400 hover:bg-red-900/40' : 'bg-red-100 text-red-600 hover:bg-red-200'}`}
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg shadow-md transform hover:scale-105 transition-all duration-200 ${isDark ? 'bg-slate-900/60 border border-cyan-900/30' : 'bg-white border border-gray-200'}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl">{stat.icon}</div>
                <div className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center text-white`}></div>
              </div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</p>
              <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Accès Rapide</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <QuickActionCard
              icon="📅"
              title={t('menu.appointments')}
              description="Voir mes rendez-vous validés"
              color="from-blue-500 to-cyan-500"
              onClick={() => navigate('/appointments')}
              isDark={isDark}
            />
            <QuickActionCard
              icon="👥"
              title={t('menu.patients')}
              description="Informations sur mes patients"
              color="from-green-500 to-emerald-500"
              onClick={() => navigate('/patients')}
              isDark={isDark}
            />
            <QuickActionCard
              icon="🔔"
              title={t('menu.notifications')}
              description={`${unreadCount} notification${unreadCount > 1 ? 's' : ''} non lue${unreadCount > 1 ? 's' : ''}`}
              color="from-purple-500 to-pink-500"
              onClick={() => navigate('/notifications')}
              isDark={isDark}
              badge={unreadCount}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function QuickActionCard({ icon, title, description, color, onClick, isDark, badge }: any) {
  return (
    <button
      onClick={onClick}
      className={`group relative p-6 rounded-xl transition-all duration-300 transform hover:scale-105 overflow-hidden ${isDark ? 'bg-slate-900/60 hover:bg-slate-900/80 border border-cyan-900/30' : 'bg-white hover:shadow-xl border border-gray-200'}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
      <div className="relative z-10">
        <div className="text-4xl mb-3">{icon}</div>
        {badge > 0 && (
          <div className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
            {badge}
          </div>
        )}
        <h3 className={`font-bold text-lg mb-1 transition-colors ${isDark ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-600'}`}>
          {title}
        </h3>
        <p className={`text-sm transition-colors ${isDark ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-600 group-hover:text-gray-700'}`}>
          {description}
        </p>
      </div>
      <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${color} w-0 group-hover:w-full transition-all duration-300`} />
    </button>
  );
}

export default DoctorDashboard;
