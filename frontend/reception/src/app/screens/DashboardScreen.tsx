import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { useReception } from '@/app/contexts/ReceptionContext';
import { Clock, Users, LogOut, Moon, Sun, Globe } from 'lucide-react';

export default function DashboardScreen() {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { appointments, rooms } = useReception();

  const todayAppointments = appointments.length;
  const checkedIn = appointments.filter((a) => a.status !== 'waiting').length;
  const inConsultation = appointments.filter((a) => a.status === 'in_consultation').length;
  const roomsAvailable = rooms.filter((r) => r.status === 'available').length;

  return (
    <div className={isDark ? 'dark min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' : 'min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50'}>
      {/* Header */}
      <header className={`${isDark ? 'bg-slate-900/80 border-slate-700/40' : 'bg-white/80 border-gray-200/40'} border-b backdrop-blur-md sticky top-0 z-40 transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                HealthConnect
              </h1>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {t('reception.title')}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className={`px-3 py-2 rounded-lg border-2 ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
                <option value="ki">Kirundi</option>
              </select>

              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-all duration-200 ${isDark ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <button
                onClick={() => navigate('/')}
                className="p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-all duration-200"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('reception.welcome')}
          </h2>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            Gérez les rendez-vous et les salles de consultation
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total RDV */}
          <div className={`rounded-xl border-2 p-6 transition-all duration-200 hover:shadow-lg ${isDark ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-blue-500/20' : 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-300'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`font-bold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t('stats.today_appointments')}
              </h3>
              <Clock className="w-6 h-6 text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-blue-500">{todayAppointments}</p>
          </div>

          {/* Accueillis */}
          <div className={`rounded-xl border-2 p-6 transition-all duration-200 hover:shadow-lg ${isDark ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-green-500/20' : 'bg-gradient-to-br from-green-50 to-green-100 border-green-300'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`font-bold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t('stats.checked_in')}
              </h3>
              <Users className="w-6 h-6 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-green-500">{checkedIn}</p>
          </div>

          {/* En consultation */}
          <div className={`rounded-xl border-2 p-6 transition-all duration-200 hover:shadow-lg ${isDark ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-purple-500/20' : 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-300'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`font-bold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t('stats.in_consultation')}
              </h3>
              <Clock className="w-6 h-6 text-purple-500" />
            </div>
            <p className="text-3xl font-bold text-purple-500">{inConsultation}</p>
          </div>

          {/* Salles Disponibles */}
          <div className={`rounded-xl border-2 p-6 transition-all duration-200 hover:shadow-lg ${isDark ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-orange-500/20' : 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-300'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`font-bold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Salles Disponibles
              </h3>
              <Users className="w-6 h-6 text-orange-500" />
            </div>
            <p className="text-3xl font-bold text-orange-500">{roomsAvailable}/{rooms.length}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => navigate('/appointments')}
            className={`p-6 rounded-xl border-2 text-left transition-all duration-200 hover:shadow-lg hover:scale-105 ${isDark ? 'bg-gradient-to-br from-blue-900 to-blue-800 border-blue-500/30 hover:border-blue-500' : 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-300'}`}
          >
            <Clock className="w-8 h-8 mb-3 text-blue-500" />
            <h3 className="font-bold mb-1">Rendez-vous</h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Voir tous les RDV confirmés et accueillir les patients
            </p>
          </button>

          <button
            onClick={() => navigate('/consultation-rooms')}
            className={`p-6 rounded-xl border-2 text-left transition-all duration-200 hover:shadow-lg hover:scale-105 ${isDark ? 'bg-gradient-to-br from-purple-900 to-purple-800 border-purple-500/30 hover:border-purple-500' : 'bg-gradient-to-br from-purple-50 to-fuchsia-50 border-purple-300'}`}
          >
            <Clock className="w-8 h-8 mb-3 text-purple-500" />
            <h3 className="font-bold mb-1">Planning Médecins</h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Voir le planning des médecins par salle
            </p>
          </button>
        </div>
      </main>
    </div>
  );
}
