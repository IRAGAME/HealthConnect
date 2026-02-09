import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Calendar, Bell, ClipboardList, Heart, LogOut, User, AlertCircle, Search, Moon, Sun, Globe } from 'lucide-react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { useTheme } from '@/app/contexts/ThemeContext';


export default function DashboardScreen() {
  const navigate = useNavigate();
  const [patientName, setPatientName] = useState('');
  const { t, language, setLanguage } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);


  useEffect(() => {
    // 1. Vérifier si l'utilisateur est passé via l'URL (depuis l'auth App)
    const searchParams = new URLSearchParams(window.location.search);
    const authUserParam = searchParams.get('auth_user');

    if (authUserParam) {
      try {
        const parsedUser = JSON.parse(decodeURIComponent(authUserParam));
        // Sauvegarder dans le localStorage de l'app patient
        localStorage.setItem('patient_user', JSON.stringify(parsedUser));
        setPatientName(parsedUser.name);
      } catch (e) {
        console.error("Erreur lors de la récupération de l'utilisateur", e);
      }
    }else{
      const name = localStorage.getItem('patientName') || 'Patient';
      setPatientName(name);
    }

  }, []);

  const handleLogout = () => {
    localStorage.removeItem('patientName');
    localStorage.removeItem('patient_user');
    navigate('/');
  };

  const upcomingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]').slice(0, 3);

  const quickActions = [
    {
      title: t('action.bookAppointment'),
      description: t('action.bookAppointment.desc'),
      icon: Calendar,
      color: 'bg-primary',
      hoverColor: 'hover:bg-primary/90',
      iconBg: 'bg-cyan-100 dark:bg-cyan-900',
      iconColor: 'text-primary',
      onClick: () => navigate('/book-appointment'),
    },
    {
      title: t('action.myAppointments'),
      description: t('action.myAppointments.desc'),
      icon: ClipboardList,
      color: 'bg-secondary',
      hoverColor: 'hover:bg-secondary/90',
      iconBg: 'bg-emerald-100 dark:bg-emerald-900',
      iconColor: 'text-secondary',
      onClick: () => navigate('/appointments'),
    },
    {
      title: t('action.notifications'),
      description: t('action.notifications.desc'),
      icon: Bell,
      color: 'bg-violet-600',
      hoverColor: 'hover:bg-violet-700',
      iconBg: 'bg-violet-100 dark:bg-violet-900',
      iconColor: 'text-violet-600',
    onClick: () => navigate('/notifications'),
      },
    {
      title: t('action.emergencies'),
      description: t('action.emergencies.desc'),
      icon: AlertCircle,
      color: 'bg-red-600',
      hoverColor: 'hover:bg-red-700',
      iconBg: 'bg-red-100 dark:bg-red-900',
      iconColor: 'text-red-600',
      onClick: () => navigate('/emergency'),
      },
    {
      title: t('search.hospital'),
      description: t('action.searchHospital.desc'),
      icon: Search,
      color: 'bg-orange-600',
      hoverColor: 'hover:bg-orange-700',
      iconBg: 'bg-orange-100 dark:bg-orange-900',
      iconColor: 'text-orange-600',
      onClick: () => navigate('/search-hospital'),
      },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'dark bg-slate-950 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' : 'bg-gradient-to-br from-slate-50 via-white to-cyan-50'}`}>
      <header className={`${isDark ? 'bg-slate-900/80 border-slate-700/40 backdrop-blur-md' : 'bg-white/80 border-gray-200/40 backdrop-blur-md'} border-b shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-primary p-2 rounded-xl shadow-md">
                <Heart className="w-6 h-6 text-white" fill="white" />
              </div>
              <div>
                <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>MédiSoins</h1>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Portail Patient {t('app.group')}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 md:space-x-4">
              <Button variant="ghost" size="sm" onClick={toggleTheme} className={isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}>
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>

              <div className="relative">
                <Button variant="ghost" size="sm" onClick={() => setShowLanguageMenu(!showLanguageMenu)} className={isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}>
                  <Globe className="w-5 h-5" />
                </Button>
                {showLanguageMenu && (
                  <div className={`absolute right-0 mt-2 w-32 rounded-lg shadow-lg z-50 ${isDark ? 'bg-slate-700' : 'bg-white'}`}>
                    {['en', 'fr', 'es'].map((lang) => (
                      <button key={lang} onClick={() => { setLanguage(lang); setShowLanguageMenu(false); }} className={`block w-full text-left px-4 py-2 first:rounded-t-lg last:rounded-b-lg ${language === lang ? `${isDark ? 'bg-primary text-white' : 'bg-primary text-white'}` : isDark ? 'hover:bg-slate-600' : 'hover:bg-gray-100'}`}>
                        {lang.toUpperCase()}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className={`flex items-center space-x-2 pl-4 ${isDark ? 'border-slate-600' : 'border-gray-200'} border-l`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDark ? 'bg-slate-700' : 'bg-gray-200'}`}>
                  <User className="w-5 h-5 text-gray-600" />
                </div>
                <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>{patientName}</span>
              </div>

              <Button variant="ghost" size="sm" onClick={handleLogout} className={isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}>
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>{t('dashboard.welcome', { name: patientName })} 👋</h2>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{t('dashboard.intro')}</p>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {quickActions.map((action, index) => (
            <Card key={index} className={`border-0 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 animate-fadeInUp card-modern`} style={{ animationDelay: `${index * 50}ms` }} onClick={action.onClick}>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className={`${action.iconBg} p-3 rounded-2xl`}>
                    <action.icon className={`w-6 h-6 ${action.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-1 text-sm`}>{action.title}</h3>
                    <p className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-3 line-clamp-2`}>{action.description}</p>
                    <Button className={`w-full ${action.color} ${action.hoverColor} text-white text-xs`} size="sm">{t('action.access')}</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className={`md:col-span-2 border-0 shadow-lg ${isDark ? 'bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 border border-slate-600/30' : 'bg-white border border-gray-200'}`}>
            <CardHeader>
              <CardTitle className={`flex items-center space-x-2 ${isDark ? 'text-white' : ''}`}>
                <Calendar className="w-5 h-5 text-primary" />
                <span>{t('appointments.upcoming')}</span>
              </CardTitle>
              <CardDescription className={isDark ? 'text-gray-400' : ''}>{t('appointments.scheduled')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingAppointments.length > 0 ? (
                <>
                  {upcomingAppointments.map((appointment: any, index: number) => (
                    <div key={index} className={`flex items-center justify-between p-4 rounded-xl transition-colors ${isDark ? 'bg-slate-600 hover:bg-slate-500' : 'bg-gray-50 hover:bg-gray-100'}`}>
                      <div className="flex items-center space-x-4">
                        <div className={`${isDark ? 'bg-primary/20' : 'bg-primary/10'} p-3 rounded-xl`}>
                          <User className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{appointment.doctor}</h4>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{appointment.department}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{appointment.date}</p>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{appointment.time}</p>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className={`w-full ${isDark ? 'border-slate-500 text-primary hover:bg-primary hover:text-white' : 'border-primary text-primary hover:bg-primary hover:text-white'}`} onClick={() => navigate('/appointments')}>
                    {t('appointments.viewAll')}
                  </Button>
                </>
              ) : (
                <div className={`p-6 text-center rounded-xl ${isDark ? 'bg-slate-600' : 'bg-gray-50'}`}>
                  <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>{t('appointments.none')}</p>
                  <Button className="mt-4 bg-primary hover:bg-primary/90 text-white" onClick={() => navigate('/book-appointment')}>
                    {t('appointments.book')}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className={`border-0 shadow-lg bg-gradient-to-br from-cyan-500 via-cyan-400 to-green-500 text-white hover:shadow-2xl transition-all duration-300`}>
            <CardHeader>
              <CardTitle>Résumé Santé</CardTitle>
              <CardDescription className="text-cyan-100">Vue d'ensemble</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-cyan-100">Total rendez-vous</span>
                  <Calendar className="w-4 h-4" />
                </div>
                <p className="text-3xl font-bold">{upcomingAppointments.length}</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-cyan-100">À venir</span>
                  <ClipboardList className="w-4 h-4" />
                </div>
                <p className="text-3xl font-bold">{upcomingAppointments.length}</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-cyan-100">Notifications</span>
                  <Bell className="w-4 h-4" />
                </div>
                <p className="text-3xl font-bold">0</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
    );
}
