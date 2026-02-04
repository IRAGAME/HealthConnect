import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface Appointment {
  id: string;
  title: string;
  date: string;
  time: string;
  doctor?: string;
  department?: string;
  notificationSent?: boolean;
}

interface NotificationContextType {
  appointments: Appointment[];
  addAppointment: (appointment: Appointment) => void;
  removeAppointment: (id: string) => void;
  getUpcomingAppointments: () => Appointment[];
  checkNotifications: () => Appointment[];
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('appointments');
    if (saved) {
      setAppointments(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  const addAppointment = useCallback((appointment: Appointment) => {
    setAppointments((prev) => [...prev, appointment]);
  }, []);

  const removeAppointment = useCallback((id: string) => {
    setAppointments((prev) => prev.filter((apt) => apt.id !== id));
  }, []);

  const getUpcomingAppointments = useCallback((): Appointment[] => {
    const now = new Date();
    return appointments.filter((apt) => {
      const aptDate = new Date(apt.date);
      return aptDate > now;
    });
  }, [appointments]);

  const checkNotifications = useCallback((): Appointment[] => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const tomorrowEnd = new Date(tomorrow);
    tomorrowEnd.setHours(23, 59, 59, 999);

    return appointments.filter((apt) => {
      if (apt.notificationSent) return false;
      
      const aptDate = new Date(apt.date);
      aptDate.setHours(0, 0, 0, 0);
      
      return aptDate.getTime() === tomorrow.getTime();
    });
  }, [appointments]);

  return (
    <NotificationContext.Provider value={{ appointments, addAppointment, removeAppointment, getUpcomingAppointments, checkNotifications }}>
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
