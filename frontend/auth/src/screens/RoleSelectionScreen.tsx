import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/app/components/ui/button';
import { User, Heart, Stethoscope, ChevronRight } from 'lucide-react';

export default function RoleSelectionScreen() {
  const navigate = useNavigate();

  const handleRoleSelect = (role: 'patient' | 'professional') => {
    localStorage.setItem('selectedRole', role);
    navigate(`/auth/${role}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 via-white to-emerald-50 p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-primary p-4 rounded-2xl shadow-lg">
              <Heart className="w-10 h-10 text-white" fill="white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">MédiSoins</h1>
          <p className="text-lg text-gray-600">Bienvenue dans votre plateforme de santé</p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Patient Card */}
          <div 
            onClick={() => handleRoleSelect('patient')}
            className="cursor-pointer group"
          >
            <div className="relative h-64 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-cyan-500 p-8 flex flex-col items-center justify-center text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="bg-cyan-100 p-4 rounded-xl w-fit mx-auto mb-4 group-hover:bg-cyan-200 transition-colors">
                  <User className="w-8 h-8 text-cyan-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Patient</h2>
                <p className="text-gray-600 text-sm mb-6">
                  Prenez rendez-vous avec les meilleurs professionnels de santé
                </p>
                <Button className="bg-cyan-600 hover:bg-cyan-700 text-white w-full group-hover:translate-y-0 transition-transform">
                  Continuer <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>

          {/* Professional Card */}
          <div 
            onClick={() => handleRoleSelect('professional')}
            className="cursor-pointer group"
          >
            <div className="relative h-64 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-violet-500 p-8 flex flex-col items-center justify-center text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="bg-violet-100 p-4 rounded-xl w-fit mx-auto mb-4 group-hover:bg-violet-200 transition-colors">
                  <Stethoscope className="w-8 h-8 text-violet-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Professionnel</h2>
                <p className="text-gray-600 text-sm mb-6">
                  Gérez vos consultations et rendez-vous professionnels
                </p>
                <Button className="bg-violet-600 hover:bg-violet-700 text-white w-full group-hover:translate-y-0 transition-transform">
                  Continuer <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-8">
          © 2024 MédiSoins. Votre santé, notre priorité.
        </p>
      </div>
    </div>
  );
}
