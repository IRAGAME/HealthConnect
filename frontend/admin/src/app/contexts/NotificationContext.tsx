import React, { createContext, useContext, useState } from 'react';

interface Notification {
  id: string;
  type: 'SMS' | 'WhatsApp';
  destinataire: string;
  contenu: string;
  dateEnvoi?: string;
  statut: 'en attente' | 'envoyée' | 'échouée';
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  envoyer: (id: string) => void;
  programmer: (id: string, date: string) => void;
  getNotifications: () => Notification[];
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem('admin_notifications');
    return saved ? JSON.parse(saved) : [];
  });

  const addNotification = (notification: Notification) => {
    const newNotifications = [...notifications, notification];
    setNotifications(newNotifications);
    localStorage.setItem('admin_notifications', JSON.stringify(newNotifications));
  };

  const envoyer = (id: string) => {
    const newNotifications = notifications.map((notif) =>
      notif.id === id ? { ...notif, statut: 'envoyée' as const, dateEnvoi: new Date().toISOString() } : notif
    );
    setNotifications(newNotifications);
    localStorage.setItem('admin_notifications', JSON.stringify(newNotifications));
  };

  const programmer = (id: string, date: string) => {
    const newNotifications = notifications.map((notif) =>
      notif.id === id ? { ...notif, dateEnvoi: date, statut: 'en attente' as const } : notif
    );
    setNotifications(newNotifications);
    localStorage.setItem('admin_notifications', JSON.stringify(newNotifications));
  };

  const getNotifications = () => notifications;

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, envoyer, programmer, getNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};
