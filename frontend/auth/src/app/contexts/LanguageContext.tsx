import React, { createContext, useContext, useState } from 'react';

export type Language = 'FR' | 'EN' | 'KI';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  FR: {
    // Common
    'common.back': 'Retour',
    'common.error': 'Erreur',
    
    // Landing
    'landing.welcome': 'Bienvenue sur HealthConnect',
    'landing.subtitle': 'Plateforme de Gestion Médicale Intégrée',
    'landing.patient': 'Je suis Patient',
    'landing.patientDesc': 'Créer un compte ou se connecter pour prendre rendez-vous',
    'landing.professional': 'Je suis Professionnel',
    'landing.professionalDesc': 'Admin, Médecin ou Réception - Accédez à votre hôpital',
    'landing.continue': 'Continuer',
    'landing.about': 'À propos de HealthConnect',
    'landing.aboutDesc': 'HealthConnect est une plateforme complète de gestion médicale conçue pour faciliter la communication entre patients, médecins et administrateurs d\'établissements de santé.',
    
    // Hospital
    'hospital.selectHospital': 'Sélectionner votre Hôpital',
    'hospital.selectDesc': 'Choisissez l\'établissement où vous travaillez',
    'hospital.connect': 'Se Connecter',
    'hospital.chooseHospital': 'Choisir un Hôpital',
    'hospital.selectForAppointment': 'Sélectionnez l\'établissement pour vos consultations',
    'hospital.bookAppointment': 'Prendre RDV',
    'hospital.notFound': 'Hôpital non trouvé',
    
    // Auth
    'auth.patientPortal': 'Portail Patient',
    'auth.professionalLogin': 'Connexion Professionnels',
    'auth.register': 'Inscription',
    'auth.login': 'Connexion',
    'auth.createAccount': 'Créer un compte',
    'auth.fullName': 'Nom Complet',
    'auth.fullNamePlaceholder': 'Jean Dupont',
    'auth.email': 'Email',
    'auth.emailPlaceholder': 'jean@example.com',
    'auth.phone': 'Téléphone',
    'auth.phonePlaceholder': '+257 22 123 456',
    'auth.password': 'Mot de passe',
    'auth.role': 'Rôle',
    'auth.admin': 'Administrateur',
    'auth.doctor': 'Médecin',
    'auth.reception': 'Réception',
    'auth.testCredentials': 'Identifiants de test :',
    'auth.loginError': 'Email, mot de passe ou rôle incorrect',
    'auth.allFieldsRequired': 'Tous les champs sont requis',
    'auth.emailExists': 'Cet email existe déjà',
    'auth.registerSuccess': 'Compte créé avec succès! Veuillez vous connecter.',
  },
  EN: {
    // Common
    'common.back': 'Back',
    'common.error': 'Error',
    
    // Landing
    'landing.welcome': 'Welcome to HealthConnect',
    'landing.subtitle': 'Integrated Medical Management Platform',
    'landing.patient': 'I am a Patient',
    'landing.patientDesc': 'Create an account or sign in to book an appointment',
    'landing.professional': 'I am a Professional',
    'landing.professionalDesc': 'Admin, Doctor or Reception - Access your hospital',
    'landing.continue': 'Continue',
    'landing.about': 'About HealthConnect',
    'landing.aboutDesc': 'HealthConnect is a comprehensive medical management platform designed to facilitate communication between patients, doctors and healthcare facility administrators.',
    
    // Hospital
    'hospital.selectHospital': 'Select your Hospital',
    'hospital.selectDesc': 'Choose the facility where you work',
    'hospital.connect': 'Connect',
    'hospital.chooseHospital': 'Choose a Hospital',
    'hospital.selectForAppointment': 'Select the facility for your consultations',
    'hospital.bookAppointment': 'Book Appointment',
    'hospital.notFound': 'Hospital not found',
    
    // Auth
    'auth.patientPortal': 'Patient Portal',
    'auth.professionalLogin': 'Professional Login',
    'auth.register': 'Register',
    'auth.login': 'Login',
    'auth.createAccount': 'Create Account',
    'auth.fullName': 'Full Name',
    'auth.fullNamePlaceholder': 'John Smith',
    'auth.email': 'Email',
    'auth.emailPlaceholder': 'john@example.com',
    'auth.phone': 'Phone',
    'auth.phonePlaceholder': '+257 22 123 456',
    'auth.password': 'Password',
    'auth.role': 'Role',
    'auth.admin': 'Administrator',
    'auth.doctor': 'Doctor',
    'auth.reception': 'Reception',
    'auth.testCredentials': 'Test Credentials:',
    'auth.loginError': 'Invalid email, password or role',
    'auth.allFieldsRequired': 'All fields are required',
    'auth.emailExists': 'This email already exists',
    'auth.registerSuccess': 'Account created successfully! Please log in.',
  },
  KI: {
    // Common
    'common.back': 'Inyuma',
    'common.error': 'Ikosa',
    
    // Landing
    'landing.welcome': 'Karibu kuri HealthConnect',
    'landing.subtitle': 'Ikibaho kya Gukuranya Indwara',
    'landing.patient': 'Mfite Umurwayi',
    'landing.patientDesc': 'Fungura konti cyangwa injira kugira amakuru',
    'landing.professional': 'Mfite Umukozi',
    'landing.professionalDesc': 'Umukozi, Muganga cyangwa Kuringira - Injira mu mahoro yacu',
    'landing.continue': 'Komeza',
    'landing.about': 'Umva HealthConnect',
    'landing.aboutDesc': 'HealthConnect ni ikibaho cyuzuye kya gukuranya indwara cyakozwe kugira abarwayi, abaganga, n\'abakurire mahoro bakumwi.',
    
    // Hospital
    'hospital.selectHospital': 'Hitamo Mahoro',
    'hospital.selectDesc': 'Hitamo mahoro ahari ushakira',
    'hospital.connect': 'Injira',
    'hospital.chooseHospital': 'Hitamo Mahoro',
    'hospital.selectForAppointment': 'Hitamo mahoro y\'uko mwishyira',
    'hospital.bookAppointment': 'Guhitamo Amakuru',
    'hospital.notFound': 'Mahoro atashyikiwe',
    
    // Auth
    'auth.patientPortal': 'Umubare w\'umurwayi',
    'auth.professionalLogin': 'Injira y\'Umukozi',
    'auth.register': 'Kwiyandikisha',
    'auth.login': 'Injira',
    'auth.createAccount': 'Fungura Konti',
    'auth.fullName': 'Izina Ryose',
    'auth.fullNamePlaceholder': 'Jean Dupont',
    'auth.email': 'Email',
    'auth.emailPlaceholder': 'jean@example.com',
    'auth.phone': 'Telefoni',
    'auth.phonePlaceholder': '+257 22 123 456',
    'auth.password': 'Ijambo Ryibanga',
    'auth.role': 'Mwuga',
    'auth.admin': 'Umukozi',
    'auth.doctor': 'Muganga',
    'auth.reception': 'Kuringira',
    'auth.testCredentials': 'Amakuru yo kugera:',
    'auth.loginError': 'Email, ijambo cyangwa mwuga si rugero',
    'auth.allFieldsRequired': 'Ikintu cyose kikinshi',
    'auth.emailExists': 'Iyi email irama',
    'auth.registerSuccess': 'Konti yareme neza! Injira noneho.',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }): JSX.Element => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('auth_language') as Language;
    return (saved && translations[saved]) ? saved : 'FR';
  });

  const setLanguage = (lang: Language) => {
    if (translations[lang]) {
      setLanguageState(lang);
      localStorage.setItem('auth_language', lang);
    }
  };

  const t = (key: string): string => {
    return translations[language][key] || translations.FR[key] || key;
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
