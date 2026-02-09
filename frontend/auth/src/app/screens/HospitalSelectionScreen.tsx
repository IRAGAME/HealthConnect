import { useNavigate } from 'react-router-dom';
import { useHospital } from '@/app/contexts/HospitalContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { ArrowLeft, MapPin, Phone, Mail } from 'lucide-react';
import { AuthHeader } from '@/app/components/AuthHeader';

export default function HospitalSelectionScreen() {
  const navigate = useNavigate();
  const { hospitals, selectHospital } = useHospital();
  const { t } = useLanguage();

  const handleSelectHospital = (hospitalId: string) => {
    selectHospital(hospitalId);
    navigate(`/professional-login/${hospitalId}`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-200">
      <AuthHeader />
      
      {/* Back Button Header */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('common.back')}
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {t('hospital.selectHospital')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('hospital.selectDesc')}
          </p>
        </div>

        {/* Hospitals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hospitals.map((hospital) => (
            <button
              key={hospital.id}
              onClick={() => handleSelectHospital(hospital.id)}
              className="p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:shadow-lg dark:hover:shadow-lg hover:border-opacity-0 transition-all duration-300 text-left group"
              style={{
                '--border-color': hospital.primaryColor,
              } as React.CSSProperties}
            >
              {/* Logo */}
              <div
                className="w-16 h-16 rounded-lg flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: `${hospital.primaryColor}20` }}
              >
                {hospital.logo}
              </div>

              {/* Name */}
              <h3 className="text-xl font-bold mb-1" style={{ color: hospital.primaryColor }}>
                {hospital.name}
              </h3>

              {/* City */}
              <div className="flex items-center gap-2 mb-3 text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>{hospital.city}</span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{hospital.description}</p>

              {/* Contact Info */}
              <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-3">
                <div className="flex items-center gap-2">
                  <Phone className="w-3 h-3" />
                  <span>{hospital.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3 h-3" />
                  <span>{hospital.email}</span>
                </div>
              </div>

              {/* Button */}
              <button
                onClick={() => handleSelectHospital(hospital.id)}
                className="w-full mt-4 px-4 py-2 rounded-lg text-white font-semibold transition-all hover:opacity-90"
                style={{ backgroundColor: hospital.primaryColor }}
              >
                {t('hospital.connect')}
              </button>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
