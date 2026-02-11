import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Building2, MapPin, Phone, Loader2 } from 'lucide-react';

interface Hopital {
  id: string;
  nom: string;
  adresse: string;
  telephone: string;
  specialites?: string[];
}

export default function HopitalSelectionScreen() {
  const navigate = useNavigate();
  const [hopitals, setHopitals] = useState<Hopital[]>([]);
  const [selectedHopital, setSelectedHopital] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Vérifier si l'utilisateur est authentifié
    const savedUser = localStorage.getItem('patient_user');
    if (!savedUser) {
      navigate('/');
      return;
    }

    // Charger la liste des hôpitaux
    fetchHopitals();
  }, [navigate]);

  const fetchHopitals = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/hopitals');
      
      if (response.ok) {
        const data = await response.json();
        setHopitals(data);
      } else {
        // Mode démo si le backend est inaccessible
        setHopitals([
          {
            id: '1',
            nom: 'Hôpital Central',
            adresse: '123 Rue de la Santé, Paris',
            telephone: '+33 1 23 45 67 89',
            specialites: ['Cardiologie', 'Urgences']
          },
          {
            id: '2',
            nom: 'Clinique du Nord',
            adresse: '456 Avenue de la République, Lille',
            telephone: '+33 3 20 30 40 50',
            specialites: ['Orthopédie', 'Chirurgie']
          },
          {
            id: '3',
            nom: 'Hôpital Saint-Pierre',
            adresse: '789 Boulevard des Alpes, Lyon',
            telephone: '+33 4 72 11 22 33',
            specialites: ['Oncologie', 'Pédiatrie']
          }
        ]);
      }
    } catch (err) {
      console.error('Erreur lors du chargement des hôpitaux:', err);
      // Mode démo
      setHopitals([
        {
          id: '1',
          nom: 'Hôpital Central',
          adresse: '123 Rue de la Santé, Paris',
          telephone: '+33 1 23 45 67 89',
          specialites: ['Cardiologie', 'Urgences']
        },
        {
          id: '2',
          nom: 'Clinique du Nord',
          adresse: '456 Avenue de la République, Lille',
          telephone: '+33 3 20 30 40 50',
          specialites: ['Orthopédie', 'Chirurgie']
        },
        {
          id: '3',
          nom: 'Hôpital Saint-Pierre',
          adresse: '789 Boulevard des Alpes, Lyon',
          telephone: '+33 4 72 11 22 33',
          specialites: ['Oncologie', 'Pédiatrie']
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectHopital = (hopitalId: string) => {
    const hopital = hopitals.find(h => h.id === hopitalId);
    if (hopital) {
      // Sauvegarder l'hôpital sélectionné
      localStorage.setItem('selected_hopital', JSON.stringify(hopital));
      localStorage.setItem('selected_hopital_id', hopitalId);
      // Rediriger vers le dashboard
      navigate('/dashboard');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Chargement des hôpitaux...</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 mt-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Sélectionner un Hôpital</h1>
          <p className="text-gray-600">Choisissez l'hôpital où vous souhaitez prendre rendez-vous</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Liste des hôpitaux */}
        <div className="space-y-4">
          {hopitals.map((hopital) => (
            <Card 
              key={hopital.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedHopital === hopital.id 
                  ? 'border-blue-600 bg-blue-50' 
                  : 'border-gray-200'
              }`}
              onClick={() => setSelectedHopital(hopital.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <Building2 className="w-8 h-8 text-blue-600 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{hopital.nom}</h3>
                      
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-blue-500" />
                          <span>{hopital.adresse}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-blue-500" />
                          <span>{hopital.telephone}</span>
                        </div>
                      </div>

                      {hopital.specialites && hopital.specialites.length > 0 && (
                        <div className="mt-3">
                          <p className="text-xs font-semibold text-gray-700 mb-1">Spécialités:</p>
                          <div className="flex flex-wrap gap-2">
                            {hopital.specialites.map((spec, idx) => (
                              <span 
                                key={idx}
                                className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs"
                              >
                                {spec}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectHopital(hopital.id);
                  }}
                  className={`w-full ${
                    selectedHopital === hopital.id
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {selectedHopital === hopital.id ? 'Sélectionné ✓' : 'Sélectionner'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bouton continuer */}
        <div className="mt-8 text-center">
          <Button
            onClick={() => {
              if (selectedHopital) {
                handleSelectHopital(selectedHopital);
              } else {
                setError('Veuillez sélectionner un hôpital');
              }
            }}
            disabled={!selectedHopital}
            className="w-full max-w-xs bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300"
            size="lg"
          >
            Continuer vers le Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
