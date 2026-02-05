import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  nom: string;
  email: string;
  phone: string;
  rôle: 'patient' | 'médecin' | 'admin';
  statut: 'actif' | 'inactif' | 'suspendu';
  dateInscription: string;
}

interface AdminContextType {
  users: User[];
  addUser: (user: User) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
  getUsers: () => User[];
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('admin_users');
    return saved ? JSON.parse(saved) : [
      {
        id: '1',
        nom: 'Jean Dupont',
        email: 'jean@example.com',
        phone: '+250788123456',
        rôle: 'patient',
        statut: 'actif',
        dateInscription: '2024-01-15',
      },
      {
        id: '2',
        nom: 'Dr. Marie Martin',
        email: 'marie@example.com',
        phone: '+250788654321',
        rôle: 'médecin',
        statut: 'actif',
        dateInscription: '2024-01-10',
      },
    ];
  });

  const addUser = (user: User) => {
    const newUsers = [...users, user];
    setUsers(newUsers);
    localStorage.setItem('admin_users', JSON.stringify(newUsers));
  };

  const updateUser = (id: string, updatedData: Partial<User>) => {
    const newUsers = users.map((user) =>
      user.id === id ? { ...user, ...updatedData } : user
    );
    setUsers(newUsers);
    localStorage.setItem('admin_users', JSON.stringify(newUsers));
  };

  const deleteUser = (id: string) => {
    const newUsers = users.filter((user) => user.id !== id);
    setUsers(newUsers);
    localStorage.setItem('admin_users', JSON.stringify(newUsers));
  };

  const getUsers = () => users;

  return (
    <AdminContext.Provider value={{ users, addUser, updateUser, deleteUser, getUsers }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};
