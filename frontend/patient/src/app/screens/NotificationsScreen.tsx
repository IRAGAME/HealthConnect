import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { ArrowLeft, Bell, CheckCircle2, Calendar, Clock, AlertCircle, Info } from 'lucide-react';
import { useTheme } from '@/app/contexts/ThemeContext';

interface Notification {
  id: string;
  type: 'confirmation' | 'reminder' | 'info' | 'alert';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

export default function NotificationsScreen() {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const notifications: Notification[] = [
    {
      id: '1',
      type: 'confirmation',
      title: 'Rendez-vous confirmé',
      message: 'Votre rendez-vous avec Dr. Sarah Leblanc le 5 février 2026 à 10:00 a été confirmé.',
      timestamp: 'Il y a 2 heures',
      isRead: false,
    },
    {
      id: '2',
      type: 'reminder',
      title: 'Rappel de rendez-vous à venir',
      message: 'Vous avez un rendez-vous avec Dr. Michel Dupuis demain à 14:30. Veuillez arriver 15 minutes à l\'avance.',
      timestamp: 'Il y a 5 heures',
      isRead: false,
    },
    {
      id: '3',
      type: 'info',
      title: 'Nouveau médecin disponible',
      message: 'Dr. Amanda Petit a rejoint notre service de Neurologie. Prenez rendez-vous dès aujourd\'hui !',
      timestamp: 'Il y a 1 jour',
      isRead: true,
    },
    {
      id: '4',
      type: 'reminder',
      title: 'Rendez-vous demain',
      message: 'Rappel : Vous avez un rendez-vous prévu demain à 10:00 avec Dr. Sarah Leblanc.',
      timestamp: 'Il y a 1 jour',
      isRead: true,
    },
    {
      id: '5',
      type: 'confirmation',
      title: 'Rendez-vous modifié',
      message: 'Votre rendez-vous a été reprogrammé avec succès au 8 février 2026 à 14:30.',
      timestamp: 'Il y a 2 jours',
      isRead: true,
    },
    {
      id: '6',
      type: 'info',
      title: 'Conseils santé',
      message: 'N\'oubliez pas de bien vous hydrater ! Visez 8 verres d\'eau par jour pour une santé optimale.',
      timestamp: 'Il y a 3 jours',
      isRead: true,
    },
    {
      id: '7',
      type: 'alert',
      title: 'Important : Mise à jour des horaires',
      message: 'Notre clinique sera fermée le 15 février 2026 pour formation du personnel. Veuillez planifier en conséquence.',
      timestamp: 'Il y a 4 jours',
      isRead: true,
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'confirmation':
        return <CheckCircle2 className="w-5 h-5 text-secondary" />;
      case 'reminder':
        return <Clock className="w-5 h-5 text-amber-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-primary" />;
      case 'alert':
        return <AlertCircle className="w-5 h-5 text-destructive" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getNotificationBgColor = (type: string) => {
    switch (type) {
      case 'confirmation':
        return isDark ? 'bg-emerald-900/30' : 'bg-emerald-50';
      case 'reminder':
        return isDark ? 'bg-amber-900/30' : 'bg-amber-50';
      case 'info':
        return isDark ? 'bg-cyan-900/30' : 'bg-cyan-50';
      case 'alert':
        return isDark ? 'bg-red-900/30' : 'bg-red-50';
      default:
        return isDark ? 'bg-slate-700' : 'bg-gray-50';
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className={isDark ? 'dark min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' : 'min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50'}>
      <header className={`${isDark ? 'bg-slate-900/80 border-slate-700/40 backdrop-blur-md' : 'bg-white/80 border-gray-200/40 backdrop-blur-md'} border-b shadow-sm transition-colors duration-300`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')} className={isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <div className="flex items-center space-x-3">
                  <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Notifications</h1>
                  {unreadCount > 0 && (
                    <Badge className="bg-destructive text-white">
                      {unreadCount} nouvelle{unreadCount > 1 ? 's' : ''}
                    </Badge>
                  )}
                </div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Restez informé de votre parcours de santé</p>
              </div>
            </div>

            <Button variant="outline" size="sm" className={isDark ? 'border-primary text-primary hover:bg-primary hover:text-white' : 'text-primary border-primary hover:bg-primary hover:text-white'}>
              Tout marquer comme lu
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {notifications.length > 0 ? (
          <div className="space-y-4 animate-fadeInUp">
            {notifications.map((notification, idx) => (
              <Card key={notification.id} className={`border-0 shadow-lg transition-all duration-300 ${!notification.isRead ? isDark ? 'bg-gradient-to-r from-slate-700 to-slate-800 border border-slate-600/30' : 'bg-gradient-to-r from-white to-gray-50 border border-gray-200' : isDark ? 'bg-slate-800/50 border border-slate-700/20' : 'bg-gray-50/50 border border-gray-100'}`} style={{ animationDelay: `${idx * 30}ms` }}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`${getNotificationBgColor(notification.type)} p-3 rounded-xl flex-shrink-0`}>{getNotificationIcon(notification.type)}</div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{notification.title}</h3>
                            {!notification.isRead && <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></span>}
                          </div>
                          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>{notification.message}</p>
                          <div className="flex items-center space-x-4 mt-3">
                            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} flex items-center`}>
                              <Clock className="w-3 h-3 mr-1" />
                              {notification.timestamp}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {notification.type === 'confirmation' || notification.type === 'reminder' ? (
                      <Button variant="outline" size="sm" onClick={() => navigate('/appointments')} className={isDark ? 'flex-shrink-0 border-primary text-primary hover:bg-primary hover:text-white' : 'flex-shrink-0 border-primary text-primary hover:bg-primary hover:text-white'}>
                        <Calendar className="w-4 h-4 mr-1" />
                        Voir
                      </Button>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className={`border-0 shadow-lg ${isDark ? 'bg-slate-800' : ''}`}>
            <CardContent className="p-12 text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${isDark ? 'bg-slate-700' : 'bg-gray-100'}`}>
                <Bell className={`w-8 h-8 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
              </div>
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>Aucune notification</h3>
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Vous êtes à jour ! Revenez plus tard pour les mises à jour.</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
