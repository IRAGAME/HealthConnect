import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { useNotification } from '@/app/contexts/NotificationContext';
import { ArrowLeft, Send, Clock, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function NotificationsScreen() {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const { notifications, addNotification, envoyer } = useNotification();

  const [formData, setFormData] = useState({
    type: 'SMS' as 'SMS' | 'WhatsApp',
    destinataire: '',
    contenu: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.destinataire || !formData.contenu) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    const newNotification = {
      id: Date.now().toString(),
      type: formData.type,
      destinataire: formData.destinataire,
      contenu: formData.contenu,
      statut: 'en attente' as const,
    };

    addNotification(newNotification);
    setFormData({ type: 'SMS', destinataire: '', contenu: '' });
  };

  const getTypeBadgeColor = (type: string) => {
    return type === 'SMS'
      ? isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-800'
      : isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800';
  };

  const normalizeStatus = (status: string) => {
    if (status === 'envoyÃ©e') return 'envoyée';
    if (status === 'Ã©chouÃ©e') return 'échouée';
    return status;
  };

  const getStatusBadgeColor = (status: string) => {
    switch (normalizeStatus(status)) {
      case 'en attente':
        return isDark ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-800';
      case 'envoyée':
        return isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800';
      case 'échouée':
        return isDark ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-800';
      default:
        return isDark ? 'bg-gray-900/30 text-gray-400' : 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    if (normalizeStatus(status) === 'en attente') return <Clock className="w-4 h-4" />;
    return <Send className="w-4 h-4" />;
  };

  return (
    <div className={isDark ? 'dark min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/40' : 'min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50'}>
      {/* Header */}
      <header className={`${isDark ? 'bg-slate-900/75 border-cyan-900/40' : 'bg-white/80 border-gray-200/40'} border-b shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
              className={`p-2 rounded-lg ${isDark ? 'bg-slate-900/60 hover:bg-slate-900/80' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t('notifications.title')}
              </h1>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {notifications.length} notification(s)
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Form */}
          <div className={`p-6 rounded-2xl shadow-md ${isDark ? 'bg-slate-900/60 border border-cyan-900/30' : 'bg-white border border-gray-200'}`}>
            <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Envoyer une Notification
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t('notifications.type')}
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as 'SMS' | 'WhatsApp' })}
                  className={`w-full px-4 py-2 rounded-lg border ${isDark ? 'bg-slate-900/50 border-cyan-900/40 text-white' : 'bg-white border-gray-300'}`}
                >
                  <option value="SMS">{t('notifications.sms')}</option>
                  <option value="WhatsApp">{t('notifications.whatsapp')}</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t('notifications.recipient')}
                </label>
                <input
                  type="text"
                  placeholder="+250788123456"
                  value={formData.destinataire}
                  onChange={(e) => setFormData({ ...formData, destinataire: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg border ${isDark ? 'bg-slate-900/50 border-cyan-900/40 text-white placeholder-gray-500' : 'bg-white border-gray-300'}`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t('notifications.content')}
                </label>
                <textarea
                  value={formData.contenu}
                  onChange={(e) => setFormData({ ...formData, contenu: e.target.value })}
                  rows={5}
                  className={`w-full px-4 py-2 rounded-lg border ${isDark ? 'bg-slate-900/50 border-cyan-900/40 text-white placeholder-gray-500' : 'bg-white border-gray-300'}`}
                  placeholder="Contenu du message..."
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>{t('notifications.send')}</span>
              </button>
            </form>
          </div>

          {/* Notifications List */}
          <div className="md:col-span-2 space-y-4">
            {notifications.length > 0 ? (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-6 rounded-2xl border shadow-[0_16px_40px_rgba(15,23,42,0.08)] transition-all duration-200 backdrop-blur ${
                    isDark
                      ? 'bg-slate-900/60 border-cyan-900/30 shadow-[0_16px_40px_rgba(8,145,178,0.12)]'
                      : 'bg-white/90 border-gray-200'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${isDark ? 'bg-slate-900/70 border border-cyan-900/30' : 'bg-white border border-gray-100'} shadow-sm`}>
                      {getStatusIcon(notif.statut)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex gap-2 mb-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeBadgeColor(notif.type)}`}>
                              {notif.type}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(notif.statut)}`}>
                              {normalizeStatus(notif.statut)}
                            </span>
                          </div>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            À: {notif.destinataire}
                          </p>
                        </div>
                        <ChevronRight className={`${isDark ? 'text-slate-600' : 'text-gray-300'} mt-1`} />
                      </div>

                      <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mt-3`}>
                        {notif.contenu}
                      </p>
                    </div>
                  </div>

                  {notif.statut === 'en attente' && (
                    <button
                      onClick={() => envoyer(notif.id)}
                      className="mt-4 flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                    >
                      <Send className="w-4 h-4" />
                      <span>{t('notifications.send')}</span>
                    </button>
                  )}

                  {notif.dateEnvoi && (
                    <div className={`text-xs mt-3 flex items-center space-x-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      <Clock className="w-3 h-3" />
                      <span>Envoyée: {new Date(notif.dateEnvoi).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className={`text-center py-12 rounded-2xl ${isDark ? 'bg-slate-900/60' : 'bg-gray-50'}`}>
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                  Aucune notification créée
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
