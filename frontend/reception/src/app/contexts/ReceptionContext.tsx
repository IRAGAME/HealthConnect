import React, { createContext, useContext, useState } from 'react';

export interface Appointment {
  id: string;
  patientName: string;
  patientEmail: string;
  doctorName: string;
  department: string;
  date: string;
  time: string;
  reason: string;
  status: 'waiting' | 'checked_in' | 'in_consultation' | 'completed';
  room?: string;
}

export interface ConsultationRoom {
  id: string;
  name: string;
  floor: number;
  status: 'available' | 'occupied';
  doctor?: string;
  patient?: string;
  appointmentId?: string;
}

interface ReceptionContextType {
  appointments: Appointment[];
  rooms: ConsultationRoom[];
  checkInPatient: (appointmentId: string) => void;
  updateAppointmentStatus: (appointmentId: string, status: Appointment['status']) => void;
  assignRoom: (appointmentId: string, roomId: string) => void;
  releaseRoom: (roomId: string) => void;
}

const ReceptionContext = createContext<ReceptionContextType | undefined>(undefined);

const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientName: 'Jean Dupont',
    patientEmail: 'jean.dupont@email.com',
    doctorName: 'Marie Dupuis',
    department: 'Cardiologie',
    date: '2026-02-07',
    time: '09:00',
    reason: 'Consultation Cardiaque',
    status: 'in_consultation',
    room: '1',
  },
  {
    id: '2',
    patientName: 'Marie Claude',
    patientEmail: 'marie.claude@email.com',
    doctorName: 'Pierre Martin',
    department: 'Dermatologie',
    date: '2026-02-07',
    time: '10:30',
    reason: 'Consultation Dermatologique',
    status: 'in_consultation',
    room: '2',
  },
  {
    id: '3',
    patientName: 'Luc Bernard',
    patientEmail: 'luc.bernard@email.com',
    doctorName: 'Sophie Leclerc',
    department: 'Pneumologie',
    date: '2026-02-07',
    time: '14:00',
    reason: 'Suivi Respiration',
    status: 'waiting',
  },
  {
    id: '4',
    patientName: 'Anne Leblanc',
    patientEmail: 'anne.leblanc@email.com',
    doctorName: 'Thomas Bernard',
    department: 'Gastroentérologie',
    date: '2026-02-07',
    time: '15:00',
    reason: 'Suivi Digestif',
    status: 'in_consultation',
    room: '3',
  },
];

const mockRooms: ConsultationRoom[] = [
  { id: '1', name: 'Bureau de Cardiologie', floor: 1, status: 'occupied', doctor: 'Marie Dupuis', patient: 'Jean Dupont', appointmentId: '1' },
  { id: '2', name: 'Bureau de Dermatologie', floor: 1, status: 'occupied', doctor: 'Pierre Martin', patient: 'Marie Claude', appointmentId: '2' },
  { id: '3', name: 'Bureau de Gastroentérologie', floor: 1, status: 'occupied', doctor: 'Thomas Bernard', patient: 'Anne Leblanc', appointmentId: '4' },
  { id: '4', name: 'Bureau de Pneumologie', floor: 2, status: 'available' },
  { id: '5', name: 'Bureau de Consultation Générale', floor: 2, status: 'available' },
];

export const ReceptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('reception_appointments');
    return saved ? JSON.parse(saved) : mockAppointments;
  });

  const [rooms, setRooms] = useState<ConsultationRoom[]>(() => {
    const saved = localStorage.getItem('reception_rooms');
    return saved ? JSON.parse(saved) : mockRooms;
  });

  const checkInPatient = (appointmentId: string) => {
    setAppointments((prev) => {
      const updated = prev.map((apt) =>
        apt.id === appointmentId ? { ...apt, status: 'checked_in' as const } : apt
      );
      localStorage.setItem('reception_appointments', JSON.stringify(updated));
      return updated;
    });
  };

  const updateAppointmentStatus = (appointmentId: string, status: Appointment['status']) => {
    setAppointments((prev) => {
      const updated = prev.map((apt) =>
        apt.id === appointmentId ? { ...apt, status } : apt
      );
      localStorage.setItem('reception_appointments', JSON.stringify(updated));
      return updated;
    });
  };

  const assignRoom = (appointmentId: string, roomId: string) => {
    setAppointments((prev) => {
      const updated = prev.map((apt) =>
        apt.id === appointmentId ? { ...apt, room: roomId, status: 'in_consultation' as const } : apt
      );
      localStorage.setItem('reception_appointments', JSON.stringify(updated));
      return updated;
    });

    setRooms((prev) => {
      const appointment = appointments.find((a) => a.id === appointmentId);
      const updated = prev.map((room) =>
        room.id === roomId
          ? {
              ...room,
              status: 'occupied' as const,
              appointmentId,
              doctor: appointment?.doctorName,
              patient: appointment?.patientName,
            }
          : room
      );
      localStorage.setItem('reception_rooms', JSON.stringify(updated));
      return updated;
    });
  };

  const releaseRoom = (roomId: string) => {
    setRooms((prev) => {
      const updated = prev.map((room) =>
        room.id === roomId
          ? { ...room, status: 'available' as const, appointmentId: undefined, doctor: undefined, patient: undefined }
          : room
      );
      localStorage.setItem('reception_rooms', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <ReceptionContext.Provider
      value={{
        appointments,
        rooms,
        checkInPatient,
        updateAppointmentStatus,
        assignRoom,
        releaseRoom,
      }}
    >
      {children}
    </ReceptionContext.Provider>
  );
};

export const useReception = () => {
  const context = useContext(ReceptionContext);
  if (!context) {
    throw new Error('useReception doit être utilisé dans ReceptionProvider');
  }
  return context;
};
