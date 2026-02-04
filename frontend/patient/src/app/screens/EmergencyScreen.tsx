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

  const emergencies: EmergencyLevel[] = [
    {
      level: 1,
      icon: <Phone className="w-8 h-8" />,
      name: t('emergency.call'),
      description:
        'Urgences vitales telles que l\'arrêt cardiaque, la détresse respiratoire sévère, le polytraumatisme grave ou l\'hémorragie massive.',
      examples: [
        'Arrêt cardiaque',
        'Détresse respiratoire sévère',
        'Polytraumatisme grave',
        'Hémorragie massive',
      ],
      color: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-950',
      priority: t('emergency.priority1'),
    },
    {
      level: 2,
      icon: <MessageSquare className="w-8 h-8" />,
      name: t('emergency.message'),
      description:
        'Urgences cardiovasculaires et neurologiques stables nécessitant une prise en charge rapide.',
      examples: [
        'Infarctus du myocarde conscient',
        'AVC stable',
        'Occlusion intestinale sans choc',
        'Crise d\'asthme contrôlée',
      ],
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-950',
      priority: t('emergency.priority2'),
    },
    {
      level: 3,
      icon: <Radio className="w-8 h-8" />,
      name: t('emergency.beep'),
      description: 'Urgences infectieuses, digestives ou pédiatriques nécessitant surveillance continue.',
      examples: [
        'Fièvre élevée avec suspicion de sepsis',
        'Déshydratation sévère',
        'Fracture ouverte',
        'Pancréatite aiguë modérée',
      ],
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-950',
      priority: t('emergency.priority3'),
    },
    {
      level: 4,
      icon: <AlertTriangle className="w-8 h-8" />,
      name: t('emergency.alert'),
      description: 'Urgences psychiatriques ou modérées avec risque d\'aggravation.',
      examples: [
        'Hypertension sévère non compliquée',
        'Convulsions fébriles courtes',
        'Brûlures modérées',
        'Agitation psychiatrique sans danger immédiat',
      ],
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
      priority: t('emergency.priority4'),
    },
  ];

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
