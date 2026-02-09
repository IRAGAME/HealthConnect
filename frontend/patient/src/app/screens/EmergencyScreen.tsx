import React, { useEffect, useState } from 'react';
import { AlertCircle, Phone, MessageSquare, Radio, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { useLanguage } from '@/app/contexts/LanguageContext';

interface EmergencyLevel {
  level: number;
  icon: React.ReactNode;
  name: string;
  description: string;
  examples: string[];
  color: string;
  bgColor: string;
  priority: string;
}

export default function EmergencyScreen() {
  const { t } = useLanguage();
  const [emergencies, setEmergencies] = useState<EmergencyLevel[]>([]);

  // Fonction utilitaire pour convertir le nom de l'icône (string du backend) en composant React
  const getIconComponent = (iconName: string) => {
    const props = { className: "w-8 h-8" };
    switch (iconName?.toLowerCase()) {
      case 'phone': return <Phone {...props} />;
      case 'message': return <MessageSquare {...props} />;
      case 'radio': return <Radio {...props} />;
      case 'alert': return <AlertTriangle {...props} />;
      default: return <AlertCircle {...props} />;
    }
  };

  useEffect(() => {
    // Remplacez l'URL ci-dessous par votre endpoint API réel
    fetch('http://localhost:5000/api/emergencies')
      .then((res) => res.json())
      .then((data) => {
        // On mappe les données pour transformer le string 'iconName' en composant React
        const formattedData = data.map((item: any) => ({
          ...item,
          // Assurez-vous que votre backend renvoie un champ 'iconName' ou adaptez cette clé
          icon: getIconComponent(item.icon || item.iconName || 'alert') 
        }));
        setEmergencies(formattedData);
      })
      .catch((err) => console.error("Erreur lors du chargement des urgences:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-emerald-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-8 h-8 text-red-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {t('emergency.title')}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Guide des niveaux d'urgence médicale
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {emergencies.map((emergency) => (
            <Card
              key={emergency.level}
              className={`${emergency.bgColor} border-2 transition-all hover:shadow-lg dark:border-gray-600`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className={`${emergency.color} p-3 rounded-lg`}>{emergency.icon}</div>
                    <div>
                      <CardTitle className={`${emergency.color} text-2xl`}>
                        {emergency.name}
                      </CardTitle>
                      <CardDescription className="text-base mt-2 dark:text-gray-300">
                        {emergency.priority}
                      </CardDescription>
                    </div>
                  </div>
                  <div className={`${emergency.color} text-2xl font-bold`}>
                    Niveau {emergency.level}
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{emergency.description}</p>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Exemples :</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {emergency.examples.map((example, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className={`${emergency.color} font-bold mt-1`}>•</span>
                        <span className="text-gray-700 dark:text-gray-300">{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex gap-3">
                  <Button className={`${emergency.bgColor} ${emergency.color}`} variant="outline">
                    En savoir plus
                  </Button>
                  <Button
                    className="bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => {
                      localStorage.setItem('lastEmergency', JSON.stringify(emergency));
                    }}
                  >
                    Marquer comme consulté
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Access Section */}
        <Card className="mt-8 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950">
          <CardHeader>
            <CardTitle className="text-red-600 dark:text-red-400">Accès Rapide</CardTitle>
            <CardDescription>Dernière page des urgences consultée</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              Accéder à la dernière urgence consultée
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
