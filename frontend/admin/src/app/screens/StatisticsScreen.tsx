import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useAdmin } from '@/app/contexts/AdminContext';
import { useEmergency } from '@/app/contexts/EmergencyContext';
import { ArrowLeft, TrendingUp, Users, Calendar, AlertCircle, BarChart3 } from 'lucide-react';

export default function StatisticsScreen() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const { users } = useAdmin();
  const { emergencies } = useEmergency();

  const stats = [
    {
      label: 'Total Utilisateurs',
      value: users.length,
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      label: 'Patients',
      value: users.filter(u => u.role === 'patient').length,
      icon: Users,
      color: 'from-green-500 to-emerald-500',
    },
    {
      label: 'Médecins',
      value: users.filter(u => u.role === 'doctor').length,
      icon: Users,
      color: 'from-purple-500 to-pink-500',
    },
    {
      label: 'Urgences Actives',
      value: emergencies.filter(e => e.status === 'active').length,
      icon: AlertCircle,
      color: 'from-red-500 to-orange-500',
    },
    {
      label: 'Urgences Traitées',
      value: emergencies.filter(e => e.status === 'treated').length,
      icon: TrendingUp,
      color: 'from-green-500 to-teal-500',
    },
    {
      label: 'Urgences Résolues',
      value: emergencies.filter(e => e.status === 'resolved').length,
      icon: BarChart3,
      color: 'from-blue-500 to-indigo-500',
    },
  ];

  return (
    <div className={isDark ? 'dark min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/40 text-white' : 'min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50'}>
      {/* Header */}
      <header className={`${isDark ? 'bg-slate-900/75 border-cyan-900/40' : 'bg-white/80 border-gray-200/40'} border-b backdrop-blur-md sticky top-0 z-40 transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/dashboard')}
                className={`p-2 rounded-lg transition-all duration-200 ${isDark ? 'bg-slate-900/60 hover:bg-slate-900/80 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="p-3 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Statistiques
                </h1>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Vue d'ensemble des données du système
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${isDark
                  ? 'bg-slate-900/60 border-cyan-900/30 hover:border-yellow-500'
                  : 'bg-white border-gray-200 hover:border-yellow-500'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className={`text-sm font-semibold mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {stat.label}
                    </p>
                    <h3 className="text-4xl font-bold">{stat.value}</h3>
                  </div>
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  Mis à jour en temps réel
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Users Summary */}
          <div className={`p-6 rounded-xl border-2 ${isDark ? 'bg-slate-900/60 border-cyan-900/30' : 'bg-white border-gray-200'}`}>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Résumé Utilisateurs
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-cyan-900/40">
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Total</span>
                <span className="text-2xl font-bold">{users.length}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-cyan-900/40">
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Patients</span>
                <span className="text-2xl font-bold text-green-500">{users.filter(u => u.role === 'patient').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Médecins</span>
                <span className="text-2xl font-bold text-purple-500">{users.filter(u => u.role === 'doctor').length}</span>
              </div>
            </div>
          </div>

          {/* Emergency Summary */}
          <div className={`p-6 rounded-xl border-2 ${isDark ? 'bg-slate-900/60 border-cyan-900/30' : 'bg-white border-gray-200'}`}>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              Résumé Urgences
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-cyan-900/40">
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Total</span>
                <span className="text-2xl font-bold">{emergencies.length}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-cyan-900/40">
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Actives</span>
                <span className="text-2xl font-bold text-red-500">{emergencies.filter(e => e.status === 'active').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Résolues</span>
                <span className="text-2xl font-bold text-green-500">{emergencies.filter(e => e.status === 'resolved').length}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
