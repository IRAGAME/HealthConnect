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
    'action.bookAppointment.desc': 'Planifiez une visite avec nos spécialistes',
    'action.myAppointments.desc': 'Consultez et gérez vos réservations',
    'action.notifications.desc': 'Consultez vos dernières mises à jour',
    'action.emergencies.desc': 'Accédez à la page des urgences médicales',
    'action.searchHospital.desc': 'Recherchez un service médical',
    'dashboard.welcome': 'Bienvenue, {name}',
    'dashboard.intro': 'Gérez vos rendez-vous médicaux et restez connecté avec votre équipe soignante.',
    'dashboard.appointments': 'Vos Rendez-vous à Venir',
    'dashboard.noAppointments': 'Aucun rendez-vous à venir',
    'booking.title': 'Prendre Rendez-vous Médical',
    'booking.subtitle': 'Planifiez votre consultation médicale',
    'search.placeholder': 'Recherchez un service ou un hôpital...',
    'action.access': 'Accéder',
    'appointments.upcoming': 'Rendez-vous à venir',
    'appointments.scheduled': 'Vos consultations programmées',
    'appointments.viewAll': 'Voir tous les rendez-vous',
    'appointments.none': 'Aucun rendez-vous programmé',
    'appointments.book': 'Prendre un rendez-vous',
    'booking.selectService': 'Choisir un service',
    'booking.selectServiceDesc': 'Sélectionnez la spécialité médicale dont vous avez besoin',
    'booking.selectDoctor': 'Sélectionner un médecin',
    'booking.selectDoctorDesc': 'Choisissez votre prestataire de santé',
    'booking.dateTime': 'Date et Heure',
    'booking.dateTimeDesc': 'Choisissez la date et l\'heure de votre rendez-vous',
    'booking.confirm': 'Confirmer le rendez-vous',
    'search.button': 'Rechercher',
    'theme.light': 'Mode Clair',
    'theme.dark': 'Mode Sombre',
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
    'action.bookAppointment.desc': 'Schedule a visit with our specialists',
    'action.myAppointments.desc': 'View and manage your reservations',
    'action.notifications.desc': 'Check your latest updates',
    'action.emergencies.desc': 'Access the medical emergency page',
    'action.searchHospital.desc': 'Search for a medical service',
    'dashboard.welcome': 'Welcome back, {name}',
    'dashboard.intro': 'Manage your medical appointments and stay connected with your healthcare team.',
    'dashboard.appointments': 'Your Upcoming Appointments',
    'dashboard.noAppointments': 'No upcoming appointments',
    'booking.title': 'Book a Medical Appointment',
    'booking.subtitle': 'Schedule your medical consultation',
    'search.placeholder': 'Search for a service or hospital...',
    'action.access': 'Access',
    'appointments.upcoming': 'Upcoming Appointments',
    'appointments.scheduled': 'Your scheduled consultations',
    'appointments.viewAll': 'View all appointments',
    'appointments.none': 'No scheduled appointments',
    'appointments.book': 'Book an appointment',
    'booking.selectService': 'Choose a Service',
    'booking.selectServiceDesc': 'Select the medical specialty you need',
    'booking.selectDoctor': 'Select a Doctor',
    'booking.selectDoctorDesc': 'Choose your healthcare provider',
    'booking.dateTime': 'Date and Time',
    'booking.dateTimeDesc': 'Choose your appointment date and time',
    'booking.confirm': 'Confirm Appointment',
    'search.button': 'Search',
    'theme.light': 'Light Mode',
    'theme.dark': 'Dark Mode',
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
    'action.bookAppointment.desc': 'Gutegura isesioni ya muganga',
    'action.myAppointments.desc': 'Kureba no gucunga amakuru yanjye',
    'action.notifications.desc': 'Kureba ibindi vyabigaragaje',
    'action.emergencies.desc': 'Kwinjira ku rupapuro rw\'ubwiyunge',
    'action.searchHospital.desc': 'Gushakisha serivisi y\'indwara',
    'dashboard.welcome': 'Karibu neza, {name}',
    'dashboard.intro': 'Gucunga amakuru yanjye n\'isesioni y\'indwara no kwigerereza na muganga wanjye.',
    'dashboard.appointments': 'Amakuru yanjye ajhugire',
    'dashboard.noAppointments': 'Nta makuru',
    'booking.title': 'Gutegura Isesioni y\'Indwara',
    'booking.subtitle': 'Gutegura isesioni yacu ya muganga',
    'search.placeholder': 'Gushakisha serivisi cyangwa spitali...',
    'action.access': 'Kwinjira',
    'appointments.upcoming': 'Amakuru ajhugire',
    'appointments.scheduled': 'Amakuru yanjye ajikitsije',
    'appointments.viewAll': 'Kureba amakuru yose',
    'appointments.none': 'Nta makuru',
    'appointments.book': 'Gutegura amakuru',
    'booking.selectService': 'Guhitamo Serivisi',
    'booking.selectServiceDesc': 'Hitamo ubwiyunge bw\'indwara ukeneye',
    'booking.selectDoctor': 'Hitamo Muganga',
    'booking.selectDoctorDesc': 'Hitamo muganga wacu',
    'booking.dateTime': 'Itariki n\'Ijoro',
    'booking.dateTimeDesc': 'Hitamo itariki n\'ijoro ry\'amakuru',
    'booking.confirm': 'Kwemeza Amakuru',
    'search.button': 'Gushakisha',
    'theme.light': 'Inzira y\'Amahoro',
    'theme.dark': 'Inzira Nyinshi',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language') as Language;
    return (saved && translations[saved]) ? saved : 'fr';
  });

  const setLanguage = (lang: Language) => {
    if (translations[lang]) {
      setLanguageState(lang);
      localStorage.setItem('language', lang);
    }
  };

  const t = (key: string, params?: Record<string, string>): string => {
    const currentLangDict = translations[language];
    let translation = (currentLangDict && currentLangDict[key]) || translations.fr[key] || key;
    
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
