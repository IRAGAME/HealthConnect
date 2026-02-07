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
    'doctor.title': 'Tableau de Bord Médecin',
    'doctor.welcome': 'Bienvenue, Docteur',
    'menu.dashboard': 'Tableau de Bord',
    'menu.appointments': 'Rendez-vous',
    'menu.patients': 'Patients',
    'menu.notifications': 'Notifications',
    'menu.profile': 'Profil',
    'menu.logout': 'Déconnexion',
    'stats.totalAppointments': 'Total Rendez-vous',
    'stats.todayAppointments': 'Aujourd\'hui',
    'stats.patients': 'Patients Vus',
    'stats.pending': 'En Attente',
    'appointments.title': 'Mes Rendez-vous Validés',
    'appointments.validated': 'Rendez-vous Validés par Admin',
    'appointments.patient': 'Patient',
    'appointments.date': 'Date',
    'appointments.time': 'Heure',
    'appointments.department': 'Département',
    'appointments.status': 'Statut',
    'appointments.reason': 'Raison',
    'appointments.start': 'Commencer',
    'appointments.complete': 'Terminer',
    'appointments.no_appointments': 'Aucun rendez-vous validé',
    'patients.title': 'Mes Patients',
    'patients.information': 'Informations Patient',
    'patients.name': 'Nom',
    'patients.age': 'Âge',
    'patients.email': 'Email',
    'patients.phone': 'Téléphone',
    'patients.blood_type': 'Groupe Sanguin',
    'patients.medical_history': 'Antécédents Médicaux',
    'patients.current_illness': 'Maladie Actuelle',
    'patients.symptoms': 'Symptômes',
    'patients.diagnosis': 'Diagnostic',
    'patients.treatment': 'Traitement',
    'patients.prescription': 'Prescription',
    'patients.notes': 'Notes Médicales',
    'patients.add_note': 'Ajouter une Note',
    'patients.no_patients': 'Aucun patient',
    'notifications.title': 'Notifications',
    'notifications.appointment_validated': 'Rendez-vous Validé',
    'notifications.new_appointment': 'Nouveau Rendez-vous',
    'notifications.system': 'Système',
    'notifications.marked_read': 'Marqué comme lu',
    'notifications.mark_all_as_read': 'Marquer tout comme lu',
    'notifications.no_notifications': 'Aucune notification',
    'action.save': 'Enregistrer',
    'action.cancel': 'Annuler',
    'action.confirm': 'Confirmer',
    'action.back': 'Retour',
    'profile.doctor_profile': 'Profil Médecin',
    'profile.specialization': 'Spécialisation',
    'profile.experience': 'Expérience',
    'profile.license': 'Licence Médicale',
    'profile.availability': 'Disponibilité',
  },
  en: {
    'doctor.title': 'Doctor Dashboard',
    'doctor.welcome': 'Welcome, Doctor',
    'menu.dashboard': 'Dashboard',
    'menu.appointments': 'Appointments',
    'menu.patients': 'Patients',
    'menu.notifications': 'Notifications',
    'menu.profile': 'Profile',
    'menu.logout': 'Logout',
    'stats.totalAppointments': 'Total Appointments',
    'stats.todayAppointments': 'Today',
    'stats.patients': 'Patients Seen',
    'stats.pending': 'Pending',
    'appointments.title': 'My Validated Appointments',
    'appointments.validated': 'Appointments Validated by Admin',
    'appointments.patient': 'Patient',
    'appointments.date': 'Date',
    'appointments.time': 'Time',
    'appointments.department': 'Department',
    'appointments.status': 'Status',
    'appointments.reason': 'Reason',
    'appointments.start': 'Start',
    'appointments.complete': 'Complete',
    'appointments.no_appointments': 'No validated appointments',
    'patients.title': 'My Patients',
    'patients.information': 'Patient Information',
    'patients.name': 'Name',
    'patients.age': 'Age',
    'patients.email': 'Email',
    'patients.phone': 'Phone',
    'patients.blood_type': 'Blood Type',
    'patients.medical_history': 'Medical History',
    'patients.current_illness': 'Current Illness',
    'patients.symptoms': 'Symptoms',
    'patients.diagnosis': 'Diagnosis',
    'patients.treatment': 'Treatment',
    'patients.prescription': 'Prescription',
    'patients.notes': 'Medical Notes',
    'patients.add_note': 'Add Note',
    'patients.no_patients': 'No patients',
    'notifications.title': 'Notifications',
    'notifications.appointment_validated': 'Appointment Validated',
    'notifications.new_appointment': 'New Appointment',
    'notifications.system': 'System',
    'notifications.marked_read': 'Marked as read',
    'notifications.mark_all_as_read': 'Mark all as read',
    'notifications.no_notifications': 'No notifications',
    'action.save': 'Save',
    'action.cancel': 'Cancel',
    'action.confirm': 'Confirm',
    'action.back': 'Back',
    'profile.doctor_profile': 'Doctor Profile',
    'profile.specialization': 'Specialization',
    'profile.experience': 'Experience',
    'profile.license': 'Medical License',
    'profile.availability': 'Availability',
  },
  ki: {
    'doctor.title': 'Ikibaho kya Muganga',
    'doctor.welcome': 'Karibu, Muganga',
    'menu.dashboard': 'Ikibaho',
    'menu.appointments': 'Amakuru',
    'menu.patients': 'Abarwayi',
    'menu.notifications': 'Izeranganya',
    'menu.profile': 'Umukoni',
    'menu.logout': 'Gusohoka',
    'stats.totalAppointments': 'Amakuru Yose',
    'stats.todayAppointments': 'Uyu Munsi',
    'stats.patients': 'Abarwayi Barangize',
    'stats.pending': 'Ariho',
    'appointments.title': 'Amakuru Yanjye Kwemezwe',
    'appointments.validated': 'Amakuru Kwemezwe n\'Umukozi',
    'appointments.patient': 'Umurwayi',
    'appointments.date': 'Itariki',
    'appointments.time': 'Isaha',
    'appointments.department': 'Ishuri',
    'appointments.status': 'Aho ari',
    'appointments.reason': 'Impamvu',
    'appointments.start': 'Gutangira',
    'appointments.complete': 'Kurangiza',
    'appointments.no_appointments': 'Nta makuru',
    'patients.title': 'Abarwayi Banjye',
    'patients.information': 'Amakuru y\'Umurwayi',
    'patients.name': 'Izina',
    'patients.age': 'Imyaka',
    'patients.email': 'Email',
    'patients.phone': 'Telefoni',
    'patients.blood_type': 'Ubwoko bw\'amaraso',
    'patients.medical_history': 'Amateka y\'Indwara',
    'patients.current_illness': 'Indwara y\'Ubu',
    'patients.symptoms': 'Ibimenyetso',
    'patients.diagnosis': 'Gukubita',
    'patients.treatment': 'Ugupoza',
    'patients.prescription': 'Iyiyohereze',
    'patients.notes': 'Andika z\'Indwara',
    'patients.add_note': 'Ongereza Andika',
    'patients.no_patients': 'Nta barwayi',
    'notifications.title': 'Izeranganya',
    'notifications.appointment_validated': 'Amakuru Kwemezwe',
    'notifications.new_appointment': 'Amakuru Mashya',
    'notifications.system': 'Sisitemu',
    'notifications.marked_read': 'Kwemezwe cyane',
    'notifications.mark_all_as_read': 'Kwemeza Yose',
    'notifications.no_notifications': 'Nta zeranganya',
    'action.save': 'Kubika',
    'action.cancel': 'Kureka',
    'action.confirm': 'Kwemeza',
    'action.back': 'Inyuma',
    'profile.doctor_profile': 'Umukoni w\'Umuganga',
    'profile.specialization': 'Ubwoko bw\'Indwara',
    'profile.experience': 'Ubwenge',
    'profile.license': 'Lisansi y\'Indwara',
    'profile.availability': 'Habari z\'Kurahisha',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('doctor_language') as Language;
    return (saved && translations[saved]) ? saved : 'fr';
  });

  const setLanguage = (lang: Language) => {
    if (translations[lang]) {
      setLanguageState(lang);
      localStorage.setItem('doctor_language', lang);
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
