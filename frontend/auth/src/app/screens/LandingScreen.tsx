import { useNavigate } from 'react-router-dom';
import { Users, Building2, Heart } from 'lucide-react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { AuthHeader } from '@/app/components/AuthHeader';

export default function LandingScreen() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-200">
      <AuthHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-6">
            <Heart className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('landing.welcome')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            {t('landing.subtitle')}
          </p>
        </div>

        {/* Choice Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Patient Option */}
          <button
            onClick={() => navigate('/patient-auth')}
            className="group p-8 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-lg dark:hover:shadow-blue-900/20 transition-all duration-300 bg-white dark:bg-gray-900"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg mb-4 group-hover:bg-blue-500 group-hover:dark:bg-blue-500 transition-colors">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {t('landing.patient')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t('landing.patientDesc')}
            </p>
            <span className="text-blue-600 dark:text-blue-400 font-semibold group-hover:translate-x-1 transition-transform inline-block">
              {t('landing.continue')} →
            </span>
          </button>

          {/* Professional Option */}
          <button
            onClick={() => navigate('/hospital-selection')}
            className="group p-8 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-400 hover:shadow-lg dark:hover:shadow-green-900/20 transition-all duration-300 bg-white dark:bg-gray-900"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg mb-4 group-hover:bg-green-500 group-hover:dark:bg-green-500 transition-colors">
              <Building2 className="w-6 h-6 text-green-600 dark:text-green-400 group-hover:text-white transition-colors" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {t('landing.professional')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t('landing.professionalDesc')}
            </p>
            <span className="text-green-600 dark:text-green-400 font-semibold group-hover:translate-x-1 transition-transform inline-block">
              {t('landing.continue')} →
            </span>
          </button>
        </div>

        {/* About Section */}
        <section className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 md:p-12 border border-gray-200 dark:border-gray-800">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t('landing.about')}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
            {t('landing.aboutDesc')}
          </p>
        </section>
      </main>
    </div>
  );
}
