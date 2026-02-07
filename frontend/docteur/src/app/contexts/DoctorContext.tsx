import React, { createContext, useContext, useState } from 'react';

export interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  date: string;
  time: string;
  department: string;
  status: 'pending' | 'in_progress' | 'completed';
  reason: string;
  symptoms: string;
}

export interface PatientNote {
  id: string;
  content: string;
  date: string;
  diagnosis?: string;
  treatment?: string;
  prescription?: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  email: string;
  phone: string;
  bloodType: string;
  medicalHistory: string;
  notes: PatientNote[];
  currentIllness?: string;
}

interface DoctorContextType {
  appointments: Appointment[];
  patients: Patient[];
  updateAppointmentStatus: (id: string, status: 'pending' | 'in_progress' | 'completed') => void;
  addPatientNote: (patientId: string, note: Omit<PatientNote, 'id'>) => void;
  getPatientById: (id: string) => Patient | undefined;
}

const DoctorContext = createContext<DoctorContextType | undefined>(undefined);

const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientName: 'Jean Dupont',
    patientId: 'p1',
    date: '2026-02-10',
    time: '09:00',
    department: 'Cardiologie',
    status: 'pending',
    reason: 'Consultation cardiaque',
    symptoms: 'Douleur thoracique, essoufflement',
  },
  {
    id: '2',
    patientName: 'Marie Claude',
    patientId: 'p2',
    date: '2026-02-10',
    time: '10:30',
    department: 'Dermatologie',
    status: 'pending',
    reason: 'Examen dermatologique',
    symptoms: 'Éruption cutanée, démangeaisons',
  },
];

const mockPatients: Patient[] = [
  {
    id: 'p1',
    name: 'Jean Dupont',
    age: 45,
    email: 'jean.dupont@email.com',
    phone: '+33612345678',
    bloodType: 'O+',
    medicalHistory: 'Hypertension artérielle, diabète type 2',
    currentIllness: 'Douleur thoracique',
    notes: [
      {
        id: 'n1',
        content: 'Patient présente des symptômes de chest pain',
        date: '2026-02-10',
        diagnosis: 'Angine de poitrine stable',
        treatment: 'Repos et médicament',
        prescription: 'Aspirin 100mg/jour',
      },
    ],
  },
  {
    id: 'p2',
    name: 'Marie Claude',
    age: 32,
    email: 'marie.claude@email.com',
    phone: '+33687654321',
    bloodType: 'AB-',
    medicalHistory: 'Allergies multiples',
    currentIllness: 'Éruption cutanée',
    notes: [],
  },
];

export const DoctorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('doctor_appointments');
    return saved ? JSON.parse(saved) : mockAppointments;
  });

  const [patients, setPatients] = useState<Patient[]>(() => {
    const saved = localStorage.getItem('doctor_patients');
    return saved ? JSON.parse(saved) : mockPatients;
  });

  const updateAppointmentStatus = (id: string, status: 'pending' | 'in_progress' | 'completed') => {
    const updated = appointments.map(apt =>
      apt.id === id ? { ...apt, status } : apt
    );
    setAppointments(updated);
    localStorage.setItem('doctor_appointments', JSON.stringify(updated));
  };

  const addPatientNote = (patientId: string, note: Omit<PatientNote, 'id'>) => {
    const updated = patients.map(patient =>
      patient.id === patientId
        ? {
          ...patient,
          notes: [...patient.notes, { ...note, id: Date.now().toString() }]
        }
        : patient
    );
    setPatients(updated);
    localStorage.setItem('doctor_patients', JSON.stringify(updated));
  };

  const getPatientById = (id: string) => {
    return patients.find(p => p.id === id);
  };

  return (
    <DoctorContext.Provider value={{ appointments, patients, updateAppointmentStatus, addPatientNote, getPatientById }}>
      {children}
    </DoctorContext.Provider>
  );
};

export const useDoctor = () => {
  const context = useContext(DoctorContext);
  if (!context) {
    throw new Error('useDoctor doit être utilisé dans DoctorProvider');
  }
  return context;
};
