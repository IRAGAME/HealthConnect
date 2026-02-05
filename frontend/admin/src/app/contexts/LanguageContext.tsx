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
    'admin.title': 'Tableau de Bord Admin',
    'admin.welcome': 'Bienvenue, Administrateur',
    'menu.dashboard': 'Tableau de Bord',
    'menu.users': 'Utilisateurs',
    'menu.appointments': 'Rendez-vous',
    'menu.notifications': 'Notifications',
    'menu.statistics': 'Statistiques',
    'menu.logout': 'Déconnexion',
    'stats.totalUsers': 'Total Utilisateurs',
    'stats.totalAppointments': 'Total Rendez-vous',
    'stats.todayAppointments': 'Rendez-vous Aujourd\'hui',
    'stats.pendingAppointments': 'Rendez-vous en Attente',
    'users.title': 'Gestion des Utilisateurs',
    'users.add': 'Ajouter Utilisateur',
    'users.edit': 'Modifier',
    'users.delete': 'Supprimer',
    'users.name': 'Nom',
    'users.email': 'Email',
    'users.phone': 'Téléphone',
    'users.role': 'Rôle',
    'users.status': 'Statut',
    'appointments.title': 'Supervision des Rendez-vous',
    'appointments.validate': 'Valider',
    'appointments.reject': 'Rejeter',
    'appointments.doctor': 'Médecin',
    'appointments.patient': 'Patient',
    'appointments.date': 'Date',
    'appointments.status': 'Statut',
    'appointments.pending': 'En Attente',
    'appointments.confirmed': 'Confirmé',
    'appointments.completed': 'Terminé',
    'notifications.title': 'Notifications',
    'notifications.send': 'Envoyer',
    'notifications.schedule': 'Programmer',
    'notifications.type': 'Type',
    'notifications.sms': 'SMS',
    'notifications.whatsapp': 'WhatsApp',
    'notifications.recipient': 'Destinataire',
    'notifications.content': 'Contenu',
    'action.save': 'Enregistrer',
    'action.cancel': 'Annuler',
    'action.confirm': 'Confirmer',
    'menu.assignAppointments': 'Assigner Rendez-vous',
    'menu.emergencies': 'Urgences',
    'appointments.assign': 'Assigner Rendez-vous aux Docteurs',
    'appointments.assignDoctor': 'Assigner un Docteur',
    'appointments.selectDoctor': 'Sélectionner un Docteur',
    'emergencies.title': 'Gestion des Urgences',
    'emergencies.level': 'Niveau d\'Urgence',
    'emergencies.level1': 'Appel - Urgent Vital',
    'emergencies.level2': 'Message - Urgent Sérieux',
    'emergencies.level3': 'Bip - Urgent Modéré',
    'emergencies.level4': 'Alerte - Surveil Renforcée',
    'emergencies.description1': 'Arrêt cardiaque, détresse respiratoire, polytraumatisme',
    'emergencies.description2': 'Infarctus, AVC stable, occlusion intestinale',
    'emergencies.description3': 'Fièvre + sepsis, déshydratation, fracture ouverte',
    'emergencies.description4': 'Hypertension, convulsions fébriles, brûlures modérées',
    'emergencies.action1': 'Traitement Immédiat',
    'emergencies.action2': 'Traitement Rapide',
    'emergencies.action3': 'Traitement Différé',
    'emergencies.action4': 'Surveillance Renforcée',
    'emergencies.newCase': 'Nouveau Cas d\'Urgence',
    'emergencies.patientName': 'Nom du Patient',
    'emergencies.symptoms': 'Symptômes',
    'emergencies.severity': 'Sévérité',
  },
  en: {
    'admin.title': 'Admin Dashboard',
    'admin.welcome': 'Welcome, Administrator',
    'menu.dashboard': 'Dashboard',
    'menu.users': 'Users',
    'menu.appointments': 'Appointments',
    'menu.notifications': 'Notifications',
    'menu.statistics': 'Statistics',
    'menu.logout': 'Logout',
    'stats.totalUsers': 'Total Users',
    'stats.totalAppointments': 'Total Appointments',
    'stats.todayAppointments': 'Today\'s Appointments',
    'stats.pendingAppointments': 'Pending Appointments',
    'users.title': 'User Management',
    'users.add': 'Add User',
    'users.edit': 'Edit',
    'users.delete': 'Delete',
    'users.name': 'Name',
    'users.email': 'Email',
    'users.phone': 'Phone',
    'users.role': 'Role',
    'users.status': 'Status',
    'appointments.title': 'Appointments Supervision',
    'appointments.validate': 'Validate',
    'appointments.reject': 'Reject',
    'appointments.doctor': 'Doctor',
    'appointments.patient': 'Patient',
    'appointments.date': 'Date',
    'appointments.status': 'Status',
    'appointments.pending': 'Pending',
    'appointments.confirmed': 'Confirmed',
    'appointments.completed': 'Completed',
    'notifications.title': 'Notifications',
    'notifications.send': 'Send',
    'notifications.schedule': 'Schedule',
    'notifications.type': 'Type',
    'notifications.sms': 'SMS',
    'notifications.whatsapp': 'WhatsApp',
    'notifications.recipient': 'Recipient',
    'notifications.content': 'Content',
    'action.save': 'Save',
    'action.cancel': 'Cancel',
    'action.confirm': 'Confirm',
    'menu.assignAppointments': 'Assign Appointments',
    'menu.emergencies': 'Emergencies',
    'appointments.assign': 'Assign Appointments to Doctors',
    'appointments.assignDoctor': 'Assign a Doctor',
    'appointments.selectDoctor': 'Select a Doctor',
    'emergencies.title': 'Emergency Management',
    'emergencies.level': 'Emergency Level',
    'emergencies.level1': 'Call - Life Threatening',
    'emergencies.level2': 'Message - Serious Emergency',
    'emergencies.level3': 'Beep - Moderate Emergency',
    'emergencies.level4': 'Alert - Enhanced Monitoring',
    'emergencies.description1': 'Cardiac arrest, respiratory distress, severe polytrauma',
    'emergencies.description2': 'Heart attack, stable stroke, intestinal obstruction',
    'emergencies.description3': 'Fever + sepsis, severe dehydration, open fracture',
    'emergencies.description4': 'Severe hypertension, brief febrile seizures, moderate burns',
    'emergencies.action1': 'Immediate Treatment',
    'emergencies.action2': 'Rapid Treatment',
    'emergencies.action3': 'Delayed Treatment',
    'emergencies.action4': 'Enhanced Monitoring',
    'emergencies.newCase': 'New Emergency Case',
    'emergencies.patientName': 'Patient Name',
    'emergencies.symptoms': 'Symptoms',
    'emergencies.severity': 'Severity',
  },
  ki: {
    'admin.title': 'Ikibaho kya Perezida',
    'admin.welcome': 'Karibu, Perezida',
    'menu.dashboard': 'Ikibaho',
    'menu.users': 'Abakoresha',
    'menu.appointments': 'Amakuru',
    'menu.notifications': 'Izeranganya',
    'menu.statistics': 'Imibare',
    'menu.logout': 'Gusonya',
    'stats.totalUsers': 'Umwiryani w\'Abakoresha',
    'stats.totalAppointments': 'Umwiryani w\'Amakuru',
    'stats.todayAppointments': 'Amakuru Uyumunsi',
    'stats.pendingAppointments': 'Amakuru Ariho',
    'users.title': 'Gucunga Abakoresha',
    'users.add': 'Ongeraho Mukoresha',
    'users.edit': 'Sura',
    'users.delete': 'Siba',
    'users.name': 'Izina',
    'users.email': 'Email',
    'users.phone': 'Simu',
    'users.role': 'Umwanya',
    'users.status': 'Aho ari',
    'appointments.title': 'Kureba Amakuru',
    'appointments.validate': 'Kwemeza',
    'appointments.reject': 'Kwanga',
    'appointments.doctor': 'Muganga',
    'appointments.patient': 'Umurwayi',
    'appointments.date': 'Itariki',
    'appointments.status': 'Aho ari',
    'appointments.pending': 'Ariho',
    'appointments.confirmed': 'Kwemezwe',
    'appointments.completed': 'Ijambe',
    'notifications.title': 'Izeranganya',
    'notifications.send': 'Ohereza',
    'notifications.schedule': 'Hitamo Ijoro',
    'notifications.type': 'Ubwoko',
    'notifications.sms': 'SMS',
    'notifications.whatsapp': 'WhatsApp',
    'notifications.recipient': 'Uwakira',
    'notifications.content': 'Ibikubiye',
    'action.save': 'Kubika',
    'action.cancel': 'Kureka',
    'action.confirm': 'Kwemeza',
    'menu.assignAppointments': 'Guha Amakuru Muganga',
    'menu.emergencies': 'Igenamurizo',
    'appointments.assign': 'Guha Amakuru Abamaganga',
    'appointments.assignDoctor': 'Guha Muganga',
    'appointments.selectDoctor': 'Hitamo Muganga',
    'emergencies.title': 'Kureba Igenamurizo',
    'emergencies.level': 'Urwego rw\'Igenamurizo',
    'emergencies.level1': 'Ihamagara - Nyinshi Cyane',
    'emergencies.level2': 'Ubutumwa - Igenamurizo Gikomeye',
    'emergencies.level3': 'Igipika - Igenamurizo Kigereranyo',
    'emergencies.level4': 'Isihira - Kureba Minani',
    'emergencies.description1': 'Imvua y\'umutima, akazo k\'umwuka, inzira nyinshi',
    'emergencies.description2': 'Inzira y\'umutima, inyamaswa ihagarara, umwanya w\'ubwoko',
    'emergencies.description3': 'Umwuka + bacteria, kurya nti gifite nkali, inzira ibuze',
    'emergencies.description4': 'Ibyimbo bya nje cyane, kurema gukutiriza, uruhande rwa seche',
    'emergencies.action1': 'Gupoza Ikinini',
    'emergencies.action2': 'Gupoza Vuba',
    'emergencies.action3': 'Gupoza Inzira',
    'emergencies.action4': 'Kureba Minani',
    'emergencies.newCase': 'Inzira Nshya y\'Igenamurizo',
    'emergencies.patientName': 'Izina ry\'Umurwayi',
    'emergencies.symptoms': 'Ibimenyetso',
    'emergencies.severity': 'Inzira y\'ubwoko',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('admin_language') as Language;
    return (saved && translations[saved]) ? saved : 'fr';
  });

  const setLanguage = (lang: Language) => {
    if (translations[lang]) {
      setLanguageState(lang);
      localStorage.setItem('admin_language', lang);
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
