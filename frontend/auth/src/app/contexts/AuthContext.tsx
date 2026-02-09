import React, { createContext, useContext, useState } from 'react';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'admin' | 'doctor' | 'reception';
  hospitalId?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: string) => boolean;
  logout: () => void;
  registerPatient: (name: string, email: string, password: string, phone: string) => boolean;
  selectHospital: (hospitalId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUsers = [
  { id: '1', name: 'Admin Central', email: 'admin@central.bi', password: 'admin123', role: 'admin', hospitalId: '1' },
  { id: '2', name: 'Dr. Marie Dupuis', email: 'marie@central.bi', password: 'doctor123', role: 'doctor', hospitalId: '1' },
  { id: '3', name: 'Réception Central', email: 'reception@central.bi', password: 'reception123', role: 'reception', hospitalId: '1' },
  { id: '4', name: 'Admin Saint-Michel', email: 'admin@saintmichel.bi', password: 'admin123', role: 'admin', hospitalId: '2' },
  { id: '5', name: 'Dr. Pierre Martin', email: 'pierre@saintmichel.bi', password: 'doctor123', role: 'doctor', hospitalId: '2' },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }): JSX.Element => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem('authUser');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email: string, password: string, role: string): boolean => {
    const foundUser = mockUsers.find((u) => u.email === email && u.password === password && u.role === role);
    if (foundUser) {
      const authUser: AuthUser = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role as any,
        hospitalId: foundUser.hospitalId,
      };
      setUser(authUser);
      localStorage.setItem('authUser', JSON.stringify(authUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authUser');
  };

  const registerPatient = (name: string, email: string, password: string, _phone: string): boolean => {
    // Vérifier si l'email existe déjà
    const exists = mockUsers.some((u) => u.email === email);
    if (!exists) {
      // Ajouter le nouvel utilisateur (dans une vrai app, ce serait une API call)
      const newPatient = {
        id: String(mockUsers.length + 1),
        name,
        email,
        password,
        role: 'patient',
      };
      mockUsers.push(newPatient as any);
      return true;
    }
    return false;
  };

  const selectHospital = (hospitalId: string) => {
    if (user) {
      const updatedUser = { ...user, hospitalId };
      setUser(updatedUser);
      localStorage.setItem('authUser', JSON.stringify(updatedUser));

      // Redirection vers l'interface patient si le rôle correspond
      // URL de l'application patient (Port 5174 pour éviter les conflits avec Auth sur 5173)
      const patientAppUrl = 'http://localhost:5174';
      // On passe l'utilisateur en paramètre d'URL pour assurer la connexion entre les deux applis
          const userParam = encodeURIComponent(JSON.stringify(updatedUser));
          window.location.href = `${patientAppUrl}?auth_user=${userParam}`;
      } else {
          // Log pour aider à débugger si l'utilisateur est null
          console.error("Erreur: utilisateur non trouvé lors de la sélection de l'hôpital.");
      }

  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, registerPatient, selectHospital }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans AuthProvider');
  }
  return context;
};
