import { useEffect, useState } from 'react';
import { useNotification } from '@/app/contexts/NotificationContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { Bell } from 'lucide-react';

export const NotificationReminder = () => {
  const { checkNotifications, appointments } = useNotification();
  const { t } = useLanguage();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const upcoming = checkNotifications();
      if (upcoming.length > 0) {
        setNotifications(upcoming);
        setVisible(true);

        // Mark as notified
        const updatedAppointments = appointments.map(apt => {
          if (upcoming.some(n => n.id === apt.id)) {
            return { ...apt, notificationSent: true };
          }
          return apt;
        });
        localStorage.setItem('appointments', JSON.stringify(updatedAppointments));

        // Auto-hide after 5 seconds
        const hideTimer = setTimeout(() => setVisible(false), 5000);
        return () => clearTimeout(hideTimer);
      }
    }, 60000); // Check every minute

    return () => clearInterval(timer);
  }, [checkNotifications, appointments]);

  if (!visible || notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
      {notifications.map((notif, idx) => (
        <div
          key={idx}
          className="bg-blue-500 text-white p-4 rounded-lg shadow-lg flex items-start space-x-3 animate-pulse"
        >
          <Bell className="w-5 h-5 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-sm">{t('notification.oneDay')}</h3>
            <p className="text-xs opacity-90">
              {notif.doctor} - {notif.date} à {notif.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
