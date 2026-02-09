import React, { useState } from 'react';
import { Search, MapPin, PhoneCall, MapPinCheck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { useLanguage } from '@/app/contexts/LanguageContext';

interface HospitalService {
  id: string;
  name: string;
  hospital: string;
  city: string;
  phone: string;
  distance: number;
  rating: number;
  available: boolean;
}

const mockHospitals: HospitalService[] = [
  {
    id: '1',
    name: 'Cardiologie',
    hospital: 'Hôpital Central de Kigali',
    city: 'Kigali',
    phone: '+250788123456',
    distance: 2.3,
    rating: 4.8,
    available: true,
  },
  {
    id: '2',
    name: 'Cardiologie',
    hospital: 'Clinique Saint-Vincent',
    city: 'Kigali',
    phone: '+250788654321',
    distance: 5.1,
    rating: 4.5,
    available: true,
  },
  {
    id: '3',
    name: 'Cardiologie',
    hospital: 'Hôpital Universitaire',
    city: 'Kigali',
    phone: '+250788987654',
    distance: 8.7,
    rating: 4.3,
    available: false,
  },
  {
    id: '4',
    name: 'Cardiologie',
    hospital: 'Polyclinique de Gasabo',
    city: 'Gasabo',
    phone: '+250788456789',
    distance: 12.5,
    rating: 4.6,
    available: true,
  },
];

export default function SearchHospitalScreen() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState('Cardiologie');
  const [results, setResults] = useState<HospitalService[]>(mockHospitals);

  const handleSearch = () => {
    const filtered = mockHospitals.filter(
      (h) =>
        h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.hospital.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setResults(filtered.length > 0 ? filtered : mockHospitals);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-emerald-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <Search className="w-8 h-8 text-cyan-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {t('search.hospital')}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {t('search.inOtherHospitals')}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <Card className="mb-8 dark:bg-slate-800">
          <CardHeader>
            <CardTitle>{t('search.hospital')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <Input
                placeholder={t('search.placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="dark:bg-slate-700 dark:text-white dark:border-gray-600"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleSearch();
                }}
              />
              <Button onClick={handleSearch} className="bg-cyan-600 hover:bg-cyan-700">
                <Search className="w-5 h-5 mr-2" />
                {t('search.button')}
              </Button>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Service Médical
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="mt-2 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 dark:text-white"
              >
                <option>Cardiologie</option>
                <option>Neurologie</option>
                <option>Pédiatrie</option>
                <option>Chirurgie</option>
                <option>Orthopédie</option>
                <option>Psychiatrie</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Résultats : {results.length} service(s) trouvé(s)
          </h2>

          {results.map((hospital) => (
            <Card
              key={hospital.id}
              className={`${
                !hospital.available ? 'opacity-60' : ''
              } hover:shadow-lg transition-all dark:bg-slate-800 dark:border-gray-600`}
            >
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Hospital Info */}
                  <div className="md:col-span-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {hospital.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">{hospital.hospital}</p>
                    <div className="flex items-center space-x-2 mt-3">
                      <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {hospital.city} • {hospital.distance} km
                      </span>
                    </div>
                  </div>

                  {/* Rating & Availability */}
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-yellow-500">{hospital.rating}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">/5.0</span>
                    </div>
                    <div className="mt-3">
                      {hospital.available ? (
                        <div className="inline-flex items-center space-x-2 bg-green-100 dark:bg-green-900 px-3 py-1 rounded-full">
                          <MapPinCheck className="w-4 h-4 text-green-600 dark:text-green-400" />
                          <span className="text-xs font-semibold text-green-700 dark:text-green-300">
                            Disponible
                          </span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center space-x-2 bg-red-100 dark:bg-red-900 px-3 py-1 rounded-full">
                          <span className="text-xs font-semibold text-red-700 dark:text-red-300">
                            Non Disponible
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action */}
                  <div className="flex flex-col space-y-2">
                    <Button
                      className="bg-cyan-600 hover:bg-cyan-700 w-full"
                      disabled={!hospital.available}
                    >
                      <PhoneCall className="w-4 h-4 mr-2" />
                      {hospital.phone}
                    </Button>
                    <Button variant="outline" className="w-full dark:border-gray-600 dark:text-white dark:hover:bg-slate-700">
                      Détails
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
