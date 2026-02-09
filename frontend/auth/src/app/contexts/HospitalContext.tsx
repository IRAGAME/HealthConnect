import React, { createContext, useContext, useState } from 'react';

export interface Hospital {
  id: string;
  name: string;
  logo: string;
  color: string;
  primaryColor: string;
  secondaryColor: string;
  description: string;
  city: string;
  phone: string;
  email: string;
  adminPortalUrl: string;
  doctorPortalUrl: string;
  receptionPortalUrl: string;
  patientPortalUrl: string;
}

interface HospitalContextType {
  hospitals: Hospital[];
  selectedHospital: Hospital | null;
  selectHospital: (id: string) => void;
}

const HospitalContext = createContext<HospitalContextType | undefined>(undefined);

const mockHospitals: Hospital[] = [
  {
    id: '1',
    name: 'Centre Médical Central',
    logo: '🏥',
    color: '#0EA5E9',
    primaryColor: '#0EA5E9',
    secondaryColor: '#06B6D4',
    description: 'Centre médical général de la ville',
    city: 'Bujumbura',
    phone: '+257 22 123 456',
    email: 'contact@centralmedical.bi',
    adminPortalUrl: 'http://localhost:5175',
    doctorPortalUrl: 'http://localhost:5176',
    receptionPortalUrl: 'http://localhost:5177',
    patientPortalUrl: 'http://localhost:5173',
  },
  {
    id: '2',
    name: 'Hôpital Saint-Michel',
    logo: '⚕️',
    color: '#EF4444',
    primaryColor: '#EF4444',
    secondaryColor: '#F87171',
    description: 'Spécialisé en cardiologie et chirurgie',
    city: 'Gitega',
    phone: '+257 22 234 567',
    email: 'contact@saintmichel.bi',
    adminPortalUrl: 'http://localhost:5175',
    doctorPortalUrl: 'http://localhost:5176',
    receptionPortalUrl: 'http://localhost:5177',
    patientPortalUrl: 'http://localhost:5173',
  },
  {
    id: '3',
    name: 'Clinique Lumière',
    logo: '💚',
    color: '#10B981',
    primaryColor: '#10B981',
    secondaryColor: '#34D399',
    description: 'Clinique privée multidisciplinaire',
    city: 'Bujumbura',
    phone: '+257 22 345 678',
    email: 'contact@lumierclinique.bi',
    adminPortalUrl: 'http://localhost:5175',
    doctorPortalUrl: 'http://localhost:5176',
    receptionPortalUrl: 'http://localhost:5177',
    patientPortalUrl: 'http://localhost:5173',
  },
];

export const HospitalProvider: React.FC<{ children: React.ReactNode }> = ({ children }): JSX.Element => {
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);

  const selectHospital = (id: string) => {
    const hospital = mockHospitals.find((h) => h.id === id);
    if (hospital) {
      setSelectedHospital(hospital);
      localStorage.setItem('selectedHospital', JSON.stringify(hospital));
    }
  };

  return (
    <HospitalContext.Provider value={{ hospitals: mockHospitals, selectedHospital, selectHospital }}>
      {children}
    </HospitalContext.Provider>
  );
};

export const useHospital = () => {
  const context = useContext(HospitalContext);
  if (!context) {
    throw new Error('useHospital doit être utilisé dans HospitalProvider');
  }
  return context;
};
