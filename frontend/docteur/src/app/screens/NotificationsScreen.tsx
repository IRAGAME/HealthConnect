import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { useNotification } from '@/app/contexts/NotificationContext';
import { ArrowLeft, Bell, CheckCircle2, Calendar, AlertCircle } from 'lucide-react';

export default function NotificationsScreen() {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const { notifications, markAsRead, markAllAsRead } = useNotification();

  const getIcon = (type: string) => {
    switch (type) {
      case 'appointment_validated':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'new_appointment':
        return <Calendar className="w-5 h-5 text-blue-500" />;
      case 'system':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'appointment_validated':
        return 'Rendez-vous Validé';
      case 'new_appointment':
        return 'Nouveau Rendez-vous';
      case 'system':
        return 'Notification Système';
      default:
        return 'Notification';
    }
  };

  return (
    <div className={isDark ? 'dark min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/40' : 'min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50'}>
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
              <Bell className="w-8 h-8 text-purple-500" />
              <div>
                <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t('notifications.title')}
                </h1>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {notifications.length} notification{notifications.length > 1 ? 's' : ''}
                </p>
              </div>
            </div>

            {notifications.some(n => !n.read) && (
              <button
                onClick={markAllAsRead}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 text-sm font-medium"
              >
                {t('notifications.mark_all_as_read')}
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {notifications.length === 0 ? (
          <div className={`rounded-xl border-2 p-12 text-center ${isDark ? 'bg-slate-900/60 border-cyan-900/30' : 'bg-white border-gray-200'}`}>
            <Bell className="w-16 h-16 mx-auto opacity-50 mb-4" />
            <p className={`text-lg font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {t('notifications.no_notifications')}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => markAsRead(notification.id)}
                className={`group rounded-xl border-2 p-6 cursor-pointer transition-all duration-200 ${
                  notification.read
                    ? isDark
                      ? 'bg-slate-900/60 border-cyan-900/30'
                      : 'bg-white border-gray-200'
                    : isDark
                    ? 'bg-slate-900/60 border-cyan-500/30'
                    : 'bg-blue-50 border-blue-300'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    {getIcon(notification.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-bold mb-1">{notification.title}</h3>
                        <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                          {notification.message}
                        </p>
                      </div>

                      {!notification.read && (
                        <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2" />
                      )}
                    </div>

                    <p className={`mt-3 text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                      {new Date(notification.createdAt).toLocaleString('fr-FR')}
                    </p>

                    <div className="mt-2 inline-block">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        notification.type === 'appointment_validated'
                          ? isDark
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-green-100 text-green-800'
                          : notification.type === 'new_appointment'
                          ? isDark
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-blue-100 text-blue-800'
                          : isDark
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {getTypeLabel(notification.type)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
