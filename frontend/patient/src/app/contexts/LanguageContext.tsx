import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'fr' | 'en' | 'ki';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  fr: {
    'app.title': 'MédiSoins',
    'app.subtitle': 'Portail Patient ByteBuilders',
    'app.group': 'ByteBuilders',
    'nav.dashboard': 'Tableau de bord',
    'nav.appointments': 'Mes Rendez-vous',
    'nav.bookAppointment': 'Prendre Rendez-vous',
    'nav.notifications': 'Notifications',
    'nav.emergency': 'Urgences',
    'nav.searchHospital': 'Rechercher un Service',
    'nav.language': 'Langue',
    'nav.darkMode': 'Mode Sombre',
    'nav.logout': 'Déconnexion',
    'action.bookAppointment': 'Prendre Rendez-vous',
    'action.myAppointments': 'Mes Rendez-vous',
    'action.notifications': 'Notifications',
    'action.emergencies': 'Page des Urgences',
    'emergency.title': 'Urgences Médicales',
    'emergency.call': 'Appel (Urgence Vitale Immédiate)',
    'emergency.message': 'Message (Urgence Sérieuse, Patient Stable)',
    'emergency.beep': 'Bip (Urgence Intermédiaire)',
    'emergency.alert': 'Alerte (Urgence à Surveiller)',
    'emergency.priority1': 'Priorité 1 - Traitement Immédiat',
    'emergency.priority2': 'Priorité 2 - Traitement Rapide',
    'emergency.priority3': 'Priorité 3 - Traitement Différé mais Surveillé',
    'emergency.priority4': 'Priorité 4 - Surveillance Renforcée',
    'notification.oneDay': 'Rappel : Votre rendez-vous est prévu demain',
    'medical.details': 'Autres Détails',
    'medical.condition': 'État de santé',
    'medical.description': 'Description précise de la maladie',
    'search.hospital': 'Rechercher un Service Médical',
    'search.inOtherHospitals': 'Chercher dans d\'autres hôpitaux',
    'patient': 'Patient',
  },
  en: {
    'app.title': 'MediCare',
    'app.subtitle': 'Patient Portal ByteBuilders',
    'app.group': 'ByteBuilders',
    'nav.dashboard': 'Dashboard',
    'nav.appointments': 'My Appointments',
    'nav.bookAppointment': 'Book Appointment',
    'nav.notifications': 'Notifications',
    'nav.emergency': 'Emergency',
    'nav.searchHospital': 'Search Service',
    'nav.language': 'Language',
    'nav.darkMode': 'Dark Mode',
    'nav.logout': 'Logout',
    'action.bookAppointment': 'Book Appointment',
    'action.myAppointments': 'My Appointments',
    'action.notifications': 'Notifications',
    'action.emergencies': 'Emergency Page',
    'emergency.title': 'Medical Emergencies',
    'emergency.call': 'Call (Immediate Vital Emergency)',
    'emergency.message': 'Message (Serious Emergency, Stable Patient)',
    'emergency.beep': 'Beep (Intermediate Emergency)',
    'emergency.alert': 'Alert (Emergency to Monitor)',
    'emergency.priority1': 'Priority 1 - Immediate Treatment',
    'emergency.priority2': 'Priority 2 - Fast Treatment',
    'emergency.priority3': 'Priority 3 - Deferred but Monitored Treatment',
    'emergency.priority4': 'Priority 4 - Enhanced Monitoring',
    'notification.oneDay': 'Reminder: Your appointment is scheduled for tomorrow',
    'medical.details': 'Other Details',
    'medical.condition': 'Health condition',
    'medical.description': 'Precise description of the disease',
    'search.hospital': 'Search Medical Service',
    'search.inOtherHospitals': 'Search in other hospitals',
    'patient': 'Patient',
  },
  ki: {
    'app.title': 'MédiSoins',
    'app.subtitle': 'Ubwengeri bwa Pashienti ByteBuilders',
    'app.group': 'ByteBuilders',
    'nav.dashboard': 'Ihanga Rya Mbere',
    'nav.appointments': 'Amakuru Yanjye',
    'nav.bookAppointment': 'Reservation',
    'nav.notifications': 'Izeranganya',
    'nav.emergency': 'Ubwiyunge',
    'nav.searchHospital': 'Gushakisha Serivisi',
    'nav.language': 'Ururimi',
    'nav.darkMode': 'Inzira Nyinshi',
    'nav.logout': 'Gusonya',
    'action.bookAppointment': 'Reservation',
    'action.myAppointments': 'Amakuru Yanjye',
    'action.notifications': 'Izeranganya',
    'action.emergencies': 'Urupapuro rw\'ubwiyunge',
    'emergency.title': 'Ubwiyunge bw\'Indwara',
    'emergency.call': 'Kurira (Ubwiyunge bw\'Ubwenge)',
    'emergency.message': 'Ubutumwa (Ubwiyunge Buranuka)',
    'emergency.beep': 'Bip (Ubwiyunge Bwabonetse)',
    'emergency.alert': 'Agitaramo (Ubwiyunge bwasigarira)',
    'emergency.priority1': 'Urwego rwa 1 - Kurwanya Abakera',
    'emergency.priority2': 'Urwego rwa 2 - Kurwanya Byihuta',
    'emergency.priority3': 'Urwego rwa 3 - Kurwanya Birarinde',
    'emergency.priority4': 'Urwego rwa 4 - Kurinda Neza',
    'notification.oneDay': 'Ikurura: Amakuru yanjye atewaye mu munsi',
    'medical.details': 'Ibindi Byinshi',
    'medical.condition': 'Ubwiyunge bw\'indwara',
    'medical.description': 'Imvugo y\'indwara numviro',
    'search.hospital': 'Gushakisha Serivisi y\'indwara',
    'search.inOtherHospitals': 'Gushakisha mu mahitamo',
    'patient': 'Pashienti',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('fr');

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved && translations[saved]) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string, params?: Record<string, string>): string => {
    let translation = translations[language][key] || translations.fr[key] || key;
    
    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        translation = translation.replace(`{${paramKey}}`, paramValue);
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

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
