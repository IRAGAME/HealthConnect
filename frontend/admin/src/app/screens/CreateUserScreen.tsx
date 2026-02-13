import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, User, Mail, Lock, Building, Stethoscope, Phone, Briefcase } from 'lucide-react';
import { useTheme } from '@/app/contexts/ThemeContext';
// Import relatif vers le contexte Auth
import { useAuth } from '../../../../auth/src/app/contexts/AuthContext';

export default function CreateUserScreen() {
  const navigate = useNavigate();
  const { registerStaff } = useAuth();
  const { isDark } = useTheme();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'doctor' as 'doctor' | 'reception',
    hospitalId: '1',
    specialty: '' // Champ optionnel pour les médecins
  });

  const hospitals = [
    { id: '1', name: 'Hôpital Central' },
    { id: '2', name: 'Clinique Saint-Michel' },
    { id: '3', name: 'Clinique Lumière' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name || !formData.email || !formData.password) {
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }

    // On ajoute la spécialité au nom si c'est un médecin pour l'affichage simple
    const finalName = formData.role === 'doctor' && formData.specialty 
      ? `${formData.name} (${formData.specialty})` 
      : formData.name;

    const isCreated = registerStaff(
      finalName,
      formData.email,
      formData.password,
      formData.role,
      formData.hospitalId
    );

    if (isCreated) {
      setSuccess(`L'utilisateur ${formData.name} a été créé avec succès.`);
      // Délai pour laisser l'utilisateur lire le message avant de retourner à la liste
      setTimeout(() => navigate('/users'), 1500);
    } else {
      setError('Un utilisateur avec cet email existe déjà.');
    }
  };

  return (
    <div className={isDark ? 'dark min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white' : 'min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50'}>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <button 
            onClick={() => navigate('/users')}
            className={`mr-4 p-2 rounded-full transition-colors ${isDark ? 'hover:bg-slate-800 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Ajouter un Utilisateur</h1>
            <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>Créer un compte Médecin ou Réception</p>
          </div>
        </div>

        <div className={`rounded-xl shadow-sm border overflow-hidden ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            
            {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-100">{error}</div>}
            {success && <div className="bg-green-50 text-green-600 p-4 rounded-lg text-sm border border-green-100">{success}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Rôle - Sélection en premier pour adapter le formulaire */}
              <div className="space-y-2 md:col-span-2">
                <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Type d'utilisateur</label>
                <div className="grid grid-cols-2 gap-4">
                  <button type="button" onClick={() => setFormData({...formData, role: 'doctor'})}
                    className={`flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${formData.role === 'doctor' ? 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : `border-gray-200 hover:bg-gray-50 ${isDark ? 'border-slate-600 hover:bg-slate-700 text-gray-300' : ''}`}`}>
                    <Stethoscope className="w-6 h-6" />
                    <span className="font-semibold">Médecin</span>
                  </button>
                  <button type="button" onClick={() => setFormData({...formData, role: 'reception'})}
                    className={`flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${formData.role === 'reception' ? 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : `border-gray-200 hover:bg-gray-50 ${isDark ? 'border-slate-600 hover:bg-slate-700 text-gray-300' : ''}`}`}>
                    <Phone className="w-6 h-6" />
                    <span className="font-semibold">Réception</span>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Nom complet</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="text" required className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300'}`} placeholder="Ex: Dr. Jean Dupont" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
              </div>

              <div className="space-y-2">
                <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Email professionnel</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="email" required className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300'}`} placeholder="email@hopital.bi" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
              </div>

              <div className="space-y-2">
                <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Établissement</label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300'}`} value={formData.hospitalId} onChange={(e) => setFormData({...formData, hospitalId: e.target.value})}>
                    {hospitals.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
                  </select>
                </div>
              </div>

              {formData.role === 'doctor' && (
                <div className="space-y-2">
                  <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Spécialité</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="text" className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300'}`} placeholder="Ex: Cardiologie" value={formData.specialty} onChange={(e) => setFormData({...formData, specialty: e.target.value})} />
                  </div>
                </div>
              )}

              <div className="space-y-2 md:col-span-2">
                <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Mot de passe provisoire</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="password" required className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300'}`} placeholder="••••••••" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
                </div>
              </div>
            </div>

            <div className={`pt-6 flex justify-end gap-4 border-t mt-6 ${isDark ? 'border-slate-700' : 'border-gray-100'}`}>
              <button type="button" onClick={() => navigate('/users')} className={`px-6 py-2 rounded-lg border transition-colors ${isDark ? 'border-slate-600 text-gray-300 hover:bg-slate-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>Annuler</button>
              <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 shadow-sm">
                <Save className="w-4 h-4" /> Créer l'utilisateur
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}