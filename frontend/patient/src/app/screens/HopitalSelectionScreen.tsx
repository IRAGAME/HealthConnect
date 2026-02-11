import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Building2, MapPin, Phone, Loader2, CheckCircle2, Stethoscope } from 'lucide-react';

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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-teal-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-slate-800">Chargement des hôpitaux...</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-teal-800 p-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 mt-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-white/10 p-3 rounded-full backdrop-blur-sm">
              <Stethoscope className="w-8 h-8 text-teal-300" />
            </div>
            <h1 className="text-5xl font-bold text-white">Sélectionner un Hôpital</h1>
          </div>0/10 border border-red-400 rounded-lg p-4 mb-6 backdrop-blur-sm">
            <p className="text-red-10 text-lg">Choisissez l'établissement où vous souhaitez prendre rendez-vous</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Liste des hôpitaux */}
        <div className="space-y-5">
          {hopitals.map((hopital) => (
            <div
              key={hopital.id}
              onClick={() => setSelectedHopital(hopital.id)}
              className={`group cursor-pointer transition-all duration-300 ${
                selectedHopital === hopital.id 
                  ? 'transform scale-105' 
                  : ''
              }`}
            >
              <Card 
                className={`backdrop-blur-sm border-2 transition-all duration-300 ${
                  selectedHopital === hopital.id 
                    ? 'border-teal-400 bg-gradient-to-r from-teal-50 to-cyan-50 shadow-2xl shadow-teal-500/20' 
                    : 'border-white/20 bg-white/10 hover:bg-white/15 hover:border-white/30 hover:shadow-xl'
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`p-3 rounded-2xl flex-shrink-0 transition-all ${
                        selectedHopital === hopital.id
                          ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/50'
                          : 'bg-white/20 text-teal-300 group-hover:bg-teal-500/20'
                      }`}>
                        <Building2 className="w-6 h-6" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className={`text-2xl font-bold mb-3 transition-colors ${
                          selectedHopital === hopital.id
                            ? 'text-teal-700'
                            : 'text-white'
                        }`}>
                          {hopital.nom}
                        </h3>
                        
                        <div className={`space-y-3 text-sm ${
                          selectedHopital === hopital.id
                            ? 'text-slate-700'
                            : 'text-blue-100'
                        }`}>
                          <div className="flex items-center gap-3">
                            <MapPin className={`w-5 h-5 flex-shrink-0 ${
                              selectedHopital === hopital.id
                                ? 'text-teal-600'
                                : 'text-teal-300'
                            }`} />
                            <span className="font-medium">{hopital.adresse}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Phone className={`w-5 h-5 flex-shrink-0 ${
                              selectedHopital === hopital.id
                                ? 'text-teal-600'
                                : 'text-teal-300'
                            }`} />
                            <span className="font-medium">{hopital.telephone}</span>
                          </div>
                        </div>

                        {hopital.specialites && hopital.specialites.length > 0 && (
                          <div className="mt-4">
                            <p className={`text-xs font-bold mb-2 ${
                              selectedHopital === hopital.id
                                ? 'text-slate-600'
                                : 'text-blue-200'
                           12 text-center">
          <Button
            onClick={() => {
              if (selectedHopital) {
                handleSelectHopital(selectedHopital);
              } else {
                setError('Veuillez sélectionner un hôpital');
              }
            }}
            disabled={!selectedHopital}
            className={`w-full max-w-sm px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
              selectedHopital
                ? 'bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white shadow-lg shadow-teal-500/50 hover:shadow-xl hover:shadow-teal-500/70'
                : 'bg-white/20 text-white/50 cursor-not-allowed'
            }`}
            size="lg"
          >
            {selectedHopital ? '✓ Continuer vers le Dashboard' : 'Sélectionnez un hôpital'}}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Checkmark pour sélectionné */}
                    {selectedHopital === hopital.id && (
                      <CheckCircle2 className="w-8 h-8 text-teal-500 flex-shrink-0 animate-pulse" />
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
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
