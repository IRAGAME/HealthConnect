import React, { createContext, useContext, useState } from 'react';

export type Language = 'fr' | 'en' | 'ki';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  fr: {
    'reception.title': 'Tableau de Bord Réception',
    'reception.welcome': 'Bienvenue à la Réception',
    'menu.dashboard': 'Tableau de Bord',
    'menu.appointments': 'Rendez-vous',
    'menu.check_in': 'Accueil Patients',
    'menu.consultation_rooms': 'Salles de Consultation',
    'menu.profile': 'Profil',
    'menu.logout': 'Déconnexion',
    'stats.today_appointments': 'RDV Aujourd\'hui',
    'stats.checked_in': 'Patients Accueillis',
    'stats.in_consultation': 'En Consultation',
    'stats.pending': 'En Attente',
    'appointments.title': 'Rendez-vous Confirmés',
    'appointments.confirmed': 'Rendez-vous Confirmés par Admin',
    'appointments.patient': 'Patient',
    'appointments.date': 'Date',
    'appointments.time': 'Heure',
    'appointments.doctor': 'Médecin',
    'appointments.department': 'Département',
    'appointments.status': 'Statut',
    'appointments.reason': 'Raison',
    'appointments.check_in': 'Accueil',
    'appointments.no_appointments': 'Aucun rendez-vous',
    'check_in.title': 'Accueil Patients',
    'check_in.search_patient': 'Rechercher patient...',
    'check_in.confirm_arrival': 'Confirmer Arrivée',
    'check_in.waiting': 'En Attente',
    'check_in.no_pending': 'Aucun patient en attente',
    'rooms.title': 'Salles de Consultation',
    'rooms.room': 'Salle',
    'rooms.status': 'Statut',
    'rooms.doctor': 'Médecin',
    'rooms.patient': 'Patient',
    'rooms.available': 'Disponible',
    'rooms.occupied': 'Occupée',
    'action.save': 'Enregistrer',
    'action.cancel': 'Annuler',
    'action.confirm': 'Confirmer',
    'action.back': 'Retour',
    'status.waiting': 'En Attente',
    'status.checked_in': 'Accueilli',
    'status.in_consultation': 'En Consultation',
    'status.completed': 'Complété',
  },
  en: {
    'reception.title': 'Reception Dashboard',
    'reception.welcome': 'Welcome to Reception',
    'menu.dashboard': 'Dashboard',
    'menu.appointments': 'Appointments',
    'menu.check_in': 'Patient Check-in',
    'menu.consultation_rooms': 'Consultation Rooms',
    'menu.profile': 'Profile',
    'menu.logout': 'Logout',
    'stats.today_appointments': 'Today Appointments',
    'stats.checked_in': 'Patients Checked In',
    'stats.in_consultation': 'In Consultation',
    'stats.pending': 'Pending',
    'appointments.title': 'Confirmed Appointments',
    'appointments.confirmed': 'Appointments Confirmed by Admin',
    'appointments.patient': 'Patient',
    'appointments.date': 'Date',
    'appointments.time': 'Time',
    'appointments.doctor': 'Doctor',
    'appointments.department': 'Department',
    'appointments.status': 'Status',
    'appointments.reason': 'Reason',
    'appointments.check_in': 'Check-in',
    'appointments.no_appointments': 'No appointments',
    'check_in.title': 'Patient Check-in',
    'check_in.search_patient': 'Search patient...',
    'check_in.confirm_arrival': 'Confirm Arrival',
    'check_in.waiting': 'Waiting',
    'check_in.no_pending': 'No pending patients',
    'rooms.title': 'Consultation Rooms',
    'rooms.room': 'Room',
    'rooms.status': 'Status',
    'rooms.doctor': 'Doctor',
    'rooms.patient': 'Patient',
    'rooms.available': 'Available',
    'rooms.occupied': 'Occupied',
    'action.save': 'Save',
    'action.cancel': 'Cancel',
    'action.confirm': 'Confirm',
    'action.back': 'Back',
    'status.waiting': 'Waiting',
    'status.checked_in': 'Checked In',
    'status.in_consultation': 'In Consultation',
    'status.completed': 'Completed',
  },
  ki: {
    'reception.title': 'Ikibaho kya Kuringira',
    'reception.welcome': 'Karibu Kuringira',
    'menu.dashboard': 'Ikibaho',
    'menu.appointments': 'Amakuru',
    'menu.check_in': 'Kwiga Abarwayi',
    'menu.consultation_rooms': 'Ibyumba by\'Izamuka',
    'menu.profile': 'Umukoni',
    'menu.logout': 'Gusohoka',
    'stats.today_appointments': 'Amakuru Uyu Munsi',
    'stats.checked_in': 'Abarwayi Bashuguye',
    'stats.in_consultation': 'Mu Kuvugirana',
    'stats.pending': 'Ariho',
    'appointments.title': 'Amakuru Kwemezwe',
    'appointments.confirmed': 'Amakuru Kwemezwe n\'Umukozi',
    'appointments.patient': 'Umurwayi',
    'appointments.date': 'Itariki',
    'appointments.time': 'Isaha',
    'appointments.doctor': 'Muganga',
    'appointments.department': 'Ishuri',
    'appointments.status': 'Aho ari',
    'appointments.reason': 'Impamvu',
    'appointments.check_in': 'Kwiga',
    'appointments.no_appointments': 'Nta makuru',
    'check_in.title': 'Kwiga Abarwayi',
    'check_in.search_patient': 'Mushakira umurwayi...',
    'check_in.confirm_arrival': 'Kwemeza Kujya',
    'check_in.waiting': 'Ariho',
    'check_in.no_pending': 'Nta barwayi bariho',
    'rooms.title': 'Ibyumba by\'Izamuka',
    'rooms.room': 'Inyumba',
    'rooms.status': 'Aho ari',
    'rooms.doctor': 'Muganga',
    'rooms.patient': 'Umurwayi',
    'rooms.available': 'Ibihe',
    'rooms.occupied': 'Ikazwe',
    'action.save': 'Kubika',
    'action.cancel': 'Kureka',
    'action.confirm': 'Kwemeza',
    'action.back': 'Inyuma',
    'status.waiting': 'Ariho',
    'status.checked_in': 'Kwigiye',
    'status.in_consultation': 'Mu Kuvugirana',
    'status.completed': 'Kurangiza',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('reception_language') as Language;
    return (saved && translations[saved]) ? saved : 'fr';
  });

  const setLanguage = (lang: Language) => {
    if (translations[lang]) {
      setLanguageState(lang);
      localStorage.setItem('reception_language', lang);
    }
  };

  const t = (key: string, params?: Record<string, string>): string => {
    const currentLangDict = translations[language];
    let translation = (currentLangDict && currentLangDict[key]) || translations.fr[key] || key;

    if (params) {
      Object.keys(params).forEach((paramKey) => {
        translation = translation.replace(`{${paramKey}}`, params[paramKey]);
      });
    }

    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage doit être utilisé dans LanguageProvider');
  }
  return context;
};
