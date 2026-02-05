import React, { createContext, useContext, useState } from 'react';

export type EmergencyLevel = 1 | 2 | 3 | 4;

export interface Emergency {
  id: string;
  patientName: string;
  symptoms: string;
  level: EmergencyLevel;
  timestamp: Date;
  status: 'active' | 'treated' | 'resolved';
  assignedDoctor?: string;
  notes?: string;
}

interface EmergencyContextType {
  emergencies: Emergency[];
  addEmergency: (emergency: Omit<Emergency, 'id' | 'timestamp' | 'status'>) => void;
  updateEmergency: (id: string, updates: Partial<Emergency>) => void;
  deleteEmergency: (id: string) => void;
  getEmergenciesByLevel: (level: EmergencyLevel) => Emergency[];
}

const EmergencyContext = createContext<EmergencyContextType | undefined>(undefined);

const mockEmergencies: Emergency[] = [
  {
    id: '1',
    patientName: 'Jean Dupont',
    symptoms: 'Arrêt cardiaque suspect',
    level: 1,
    timestamp: new Date(),
    status: 'active',
    assignedDoctor: 'Dr. Marie Leblanc',
    notes: 'Patient inconscient, RCP en cours'
  },
  {
    id: '2',
    patientName: 'Marie Claude',
    symptoms: 'Fièvre élevée + confusion',
    level: 3,
    timestamp: new Date(Date.now() - 3600000),
    status: 'active',
    notes: 'Suspicion sepsis, bio en attente'
  }
];

export const EmergencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [emergencies, setEmergencies] = useState<Emergency[]>(() => {
    const saved = localStorage.getItem('admin_emergencies');
    return saved ? JSON.parse(saved) : mockEmergencies;
  });

  const addEmergency = (emergency: Omit<Emergency, 'id' | 'timestamp' | 'status'>) => {
    const newEmergency: Emergency = {
      ...emergency,
      id: Date.now().toString(),
      timestamp: new Date(),
      status: 'active',
    };
    const updated = [...emergencies, newEmergency];
    setEmergencies(updated);
    localStorage.setItem('admin_emergencies', JSON.stringify(updated));
  };

  const updateEmergency = (id: string, updates: Partial<Emergency>) => {
    const updated = emergencies.map(e => e.id === id ? { ...e, ...updates } : e);
    setEmergencies(updated);
    localStorage.setItem('admin_emergencies', JSON.stringify(updated));
  };

  const deleteEmergency = (id: string) => {
    const updated = emergencies.filter(e => e.id !== id);
    setEmergencies(updated);
    localStorage.setItem('admin_emergencies', JSON.stringify(updated));
  };

  const getEmergenciesByLevel = (level: EmergencyLevel) => {
    return emergencies.filter(e => e.level === level && e.status === 'active');
  };

  return (
    <EmergencyContext.Provider value={{ emergencies, addEmergency, updateEmergency, deleteEmergency, getEmergenciesByLevel }}>
      {children}
    </EmergencyContext.Provider>
  );
};

export const useEmergency = () => {
  const context = useContext(EmergencyContext);
  if (!context) {
    throw new Error('useEmergency doit être utilisé dans EmergencyProvider');
  }
  return context;
};
