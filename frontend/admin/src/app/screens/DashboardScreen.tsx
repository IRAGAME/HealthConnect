import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { Moon, Sun, Globe, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';

function DashboardScreen() {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const { t, language, setLanguage } = useLanguage();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 0,
    totalAppointments: 0,
    todayAppointments: 0,
    pendingAppointments: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const userStr = localStorage.getItem('user');
        const user = userStr ? JSON.parse(userStr) : null;
        const hospitalId = user?.hospital_id;

        let url = 'http://localhost:5000/api/dashboard/stats';
        if (hospitalId) url += `?hospitalId=${hospitalId}`;

        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setDashboardStats(data);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des statistiques:", error);
      }
    };
    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('admin_theme');
    navigate('/');
  };

  const stats = [
    { label: t('stats.totalUsers'), value: dashboardStats.totalUsers.toLocaleString(), icon: '👥', color: 'bg-blue-500' },
    { label: t('stats.totalAppointments'), value: dashboardStats.totalAppointments.toLocaleString(), icon: '📅', color: 'bg-green-500' },
    { label: t('stats.todayAppointments'), value: dashboardStats.todayAppointments.toLocaleString(), icon: '🕐', color: 'bg-orange-500' },
    { label: t('stats.pendingAppointments'), value: dashboardStats.pendingAppointments.toLocaleString(), icon: '⏳', color: 'bg-red-500' },
  ];

  return (
    <div className={isDark ? 'dark min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/40' : 'min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50'}>
      {/* Header */}
      <header className={`${isDark ? 'bg-slate-900/75 border-cyan-900/40 backdrop-blur-md' : 'bg-white/80 border-gray-200/40 backdrop-blur-md'} border-b shadow-sm transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t('admin.title')}
              </h1>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {t('admin.welcome')}
              </p>
            </div>

            {/* Controls */}
            <div className="hidden md:flex items-center space-x-2">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg ${isDark ? 'bg-slate-900/60 text-cyan-300 hover:bg-slate-900/80' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                title={isDark ? t('theme.light') : t('theme.dark')}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  className={`p-2 rounded-lg flex items-center space-x-1 ${isDark ? 'bg-slate-900/60 hover:bg-slate-900/80' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  <Globe className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {language.toUpperCase()}
                  </span>
                </button>

                {showLanguageMenu && (
                  <div className={`absolute right-0 mt-2 w-32 rounded-lg shadow-lg z-50 ${isDark ? 'bg-slate-900/60' : 'bg-white'} border ${isDark ? 'border-cyan-900/30' : 'border-gray-200'}`}>
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
                onClick={handleLogout}
                className={`p-2 rounded-lg ${isDark ? 'bg-red-900/20 text-red-400 hover:bg-red-900/40' : 'bg-red-100 text-red-600 hover:bg-red-200'}`}
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg shadow-md ${isDark ? 'bg-slate-900/60 border border-cyan-900/30' : 'bg-white border border-gray-200'}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl">{stat.icon}</div>
                <div className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center text-white`}>
                </div>
              </div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</p>
              <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions Grid */}
        <div className="mt-8">
          <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Accès Rapide</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <QuickActionCard
              icon="👥"
              title={t('menu.users')}
              description="Gérer les utilisateurs"
              color="from-blue-500 to-cyan-500"
              onClick={() => navigate('/users')}
              isDark={isDark}
            />
            <QuickActionCard
              icon="📅"
              title={t('menu.appointments')}
              description="Superviser les rendez-vous"
              color="from-green-500 to-emerald-500"
              onClick={() => navigate('/appointments')}
              isDark={isDark}
            />
            <QuickActionCard
              icon="🔗"
              title={t('appointments.assign')}
              description="Assigner aux médecins"
              color="from-purple-500 to-pink-500"
              onClick={() => navigate('/assign-appointments')}
              isDark={isDark}
            />
            <QuickActionCard
              icon="🚨"
              title={t('emergencies.title')}
              description="Gérer les urgences"
              color="from-red-500 to-orange-500"
              onClick={() => navigate('/emergencies')}
              isDark={isDark}
            />
            <QuickActionCard
              icon="📬"
              title={t('menu.notifications')}
              description="Envoyer des notifications"
              color="from-indigo-500 to-purple-500"
              onClick={() => navigate('/notifications')}
              isDark={isDark}
            />
            <QuickActionCard
              icon="📊"
              title="Statistiques"
              description="Voir les rapports"
              color="from-orange-500 to-yellow-500"
              onClick={() => navigate('/statistics')}
              isDark={isDark}
            />
          </div>
        </div>
      </main>

      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
          }
        }
        .animate-slideInUp {
          animation: slideInUp 0.5s ease-out;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s infinite;
        }
      `}</style>
    </div>
  );
}

function QuickActionCard({ icon, title, description, color, onClick, isDark }: any) {
  return (
    <button
      onClick={onClick}
      className={`group relative p-6 rounded-xl transition-all duration-300 transform hover:scale-105 overflow-hidden ${isDark ? 'bg-slate-900/60 hover:bg-slate-900/80 border border-cyan-900/30' : 'bg-white hover:shadow-xl border border-gray-200'}`}
    >
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

      {/* Content */}
      <div className="relative z-10">
        <div className="text-4xl mb-3">{icon}</div>
        <h3 className={`font-bold text-lg mb-1 transition-colors ${isDark ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-600'}`}>
          {title}
        </h3>
        <p className={`text-sm transition-colors ${isDark ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-600 group-hover:text-gray-700'}`}>
          {description}
        </p>
      </div>

      {/* Accent Bar */}
      <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${color} w-0 group-hover:w-full transition-all duration-300`} />
    </button>
  );
}

export default DashboardScreen;
