import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Heart, Building2, MapPin, Phone, ChevronRight } from 'lucide-react';

interface Hospital {
  id: string;
  name: string;
  city: string;
  phone: string;
  address: string;
  distance?: number;
  rating?: number;
}

const mockHospitals: Hospital[] = [
  {
    id: '1',
    name: 'Hôpital Central de Kigali',
    city: 'Kigali',
    phone: '+250788123456',
    address: 'Avenue de la Paix, Kigali',
    distance: 2.3,
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Clinique Saint-Vincent',
    city: 'Kigali',
    phone: '+250788654321',
    address: 'Rue Nyerere, Kigali',
    distance: 5.1,
    rating: 4.5,
  },
  {
    id: '3',
    name: 'Hôpital Universitaire',
    city: 'Kigali',
    phone: '+250788987654',
    address: 'Campus Universitaire, Kigali',
    distance: 8.7,
    rating: 4.3,
  },
  {
    id: '4',
    name: 'Polyclinique de Gasabo',
    city: 'Gasabo',
    phone: '+250788456789',
    address: 'Gasabo, Kigali',
    distance: 12.5,
    rating: 4.6,
  },
];

export default function HospitalSelectionScreen() {
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState<Hospital[]>(mockHospitals);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('patientName') || 'Patient';
    setUserName(name);
  }, []);

  const handleSelectHospital = async (hospital: Hospital) => {
    setSelectedHospital(hospital);
    setIsLoading(true);

    try {
      // Store selected hospital in localStorage
      localStorage.setItem('selectedHospital', JSON.stringify(hospital));
      localStorage.setItem('selectedHospitalId', hospital.id);
      localStorage.setItem('selectedHospitalName', hospital.name);

      // Simulate API call if needed
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
    } catch (error) {
      console.error('Erreur:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-primary p-2 rounded-xl shadow-md">
                <Heart className="w-6 h-6 text-white" fill="white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">MédiSoins</h1>
                <p className="text-xs text-gray-600">Portail Patient</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Bienvenue, {userName}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Sélectionnez un Hôpital</h2>
          <p className="text-lg text-gray-600">
            Choisissez l'hôpital où vous souhaitez prendre rendez-vous
          </p>
        </div>

        {/* Hospital Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {hospitals.map((hospital) => (
            <Card 
              key={hospital.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-2xl border-2 ${
                selectedHospital?.id === hospital.id 
                  ? 'border-primary shadow-2xl' 
                  : 'border-gray-100 hover:border-primary'
              }`}
              onClick={() => handleSelectHospital(hospital)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="bg-cyan-100 p-3 rounded-lg mt-1">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg text-gray-900">{hospital.name}</CardTitle>
                      <CardDescription className="text-sm mt-1">{hospital.city}</CardDescription>
                    </div>
                  </div>
                  {hospital.rating && (
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{hospital.rating}</div>
                      <div className="text-xs text-gray-500">★★★★★</div>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-gray-700">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">{hospital.address}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-700">
                    <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">{hospital.phone}</span>
                  </div>
                </div>

                {hospital.distance && (
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-500">À {hospital.distance} km de vous</p>
                  </div>
                )}

                <Button 
                  className={`w-full ${
                    selectedHospital?.id === hospital.id 
                      ? 'bg-primary hover:bg-primary/90' 
                      : 'bg-primary hover:bg-primary/90'
                  } text-white`}
                  disabled={isLoading && selectedHospital?.id === hospital.id}
                >
                  {isLoading && selectedHospital?.id === hospital.id ? (
                    'Chargement...'
                  ) : selectedHospital?.id === hospital.id ? (
                    <>
                      Sélectionné <ChevronRight className="w-4 h-4 ml-2" />
                    </>
                  ) : (
                    <>
                      Sélectionner <ChevronRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-200">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 p-3 rounded-lg mt-0.5">
              <Heart className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Pourquoi sélectionner un hôpital ?</h3>
              <p className="text-blue-800 text-sm">
                Cela nous permet de vous afficher les médecins, spécialités et services disponibles dans votre hôpital 
                de choix pour une meilleure expérience de prise de rendez-vous.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
