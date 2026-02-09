import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/app/contexts/AuthContext';
import { useHospital } from '@/app/contexts/HospitalContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { ArrowLeft, LogIn, AlertCircle } from 'lucide-react';
import { AuthHeader } from '@/app/components/AuthHeader';

export default function ProfessionalLoginScreen() {
  const navigate = useNavigate();
  const { hospitalId } = useParams();
  const { login } = useAuth();
  const { hospitals } = useHospital();
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'doctor' | 'reception'>('admin');
  const [error, setError] = useState('');

  const hospital = hospitals.find((h) => h.id === hospitalId);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (login(email, password, role)) {
      // Redirection selon le rôle
      if (role === 'admin') {
        window.location.href = `${hospital?.adminPortalUrl}?hospital=${hospitalId}`;
      } else if (role === 'doctor') {
        window.location.href = `${hospital?.doctorPortalUrl}?hospital=${hospitalId}`;
      } else {
        window.location.href = `${hospital?.receptionPortalUrl}?hospital=${hospitalId}`;
      }
    } else {
      setError(t('auth.loginError'));
    }
  };

  if (!hospital) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('common.error')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {t('hospital.notFound')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-200">
      <AuthHeader />

      {/* Back Button */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/hospital-selection')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('common.back')}
          </button>
        </div>
      </div>

      <main className="max-w-md mx-auto px-4 py-12">
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-800 p-8">
          {/* Logo & Title */}
          <div className="text-center mb-6">
            <div
              className="w-16 h-16 rounded-lg flex items-center justify-center text-4xl mx-auto mb-4"
              style={{ backgroundColor: `${hospital.primaryColor}20` }}
            >
              {hospital.logo}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {hospital.name}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {t('auth.professionalLogin')}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-lg text-red-800 dark:text-red-400 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                {t('auth.role')}
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              >
                <option value="admin">{t('auth.admin')}</option>
                <option value="doctor">{t('auth.doctor')}</option>
                <option value="reception">{t('auth.reception')}</option>
              </select>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                {t('auth.email')}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('auth.emailPlaceholder')}
                className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                {t('auth.password')}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-4 py-3 rounded-lg text-white font-bold flex items-center justify-center gap-2 transition-all hover:opacity-90"
              style={{ backgroundColor: hospital.primaryColor }}
            >
              <LogIn className="w-5 h-5" />
              {t('auth.login')}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
              {t('auth.testCredentials')}
            </p>
            <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 p-3 rounded">
              <p>👤 Admin: admin@central.bi / admin123</p>
              <p>👨‍⚕️ {t('auth.doctor')}: marie@central.bi / doctor123</p>
              <p>🎧 {t('auth.reception')}: reception@central.bi / reception123</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
