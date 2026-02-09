const API_URL = 'http://localhost:5000/api';

// Helper générique pour les requêtes fetch
const request = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || `Erreur ${response.status}`);
    }

    return data;
  } catch (error: any) {
    console.error(`API Error on ${endpoint}:`, error);
    throw error;
  }
};

export const api = {
  auth: {
    registerPatient: (data: { nom: string; email?: string; telephone: string; motdepasse: string }) => 
      request('/auth/register/patient', { method: 'POST', body: JSON.stringify(data) }),
    
    login: (data: { identifier: string; motdepasse: string }) => 
      request('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  },

  doctors: {
    getAll: () => request('/doctors'),
    getById: (id: string | number) => request(`/doctors/${id}`),
  },

  appointments: {
    create: (data: { patient_id: number; docteur_id: number; date: string; medical_condition: string; medical_description: string }) => 
      request('/appointments', { method: 'POST', body: JSON.stringify(data) }),
      
    getByPatient: (patientId: number) => request(`/appointments/patient/${patientId}`),
    getByDoctor: (doctorId: number) => request(`/appointments/doctor/${doctorId}`),
  },

  notifications: {
    getUserNotifications: (userId: number) => request(`/notifications/user/${userId}`),
    markAsRead: (id: number) => request(`/notifications/${id}/read`, { method: 'PUT' }),
  }
};