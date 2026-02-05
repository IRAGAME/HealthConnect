import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import { useState } from 'react';

interface Appointment {
  id: string;
  patient: string;
  doctor: string;
  date: string;
  time: string;
  department: string;
  status: 'en attente' | 'confirmé' | 'terminé' | 'annulé';
}

const mockAppointments: Appointment[] = [
  {
    id: '1',
    patient: 'Jean Dupont',
    doctor: 'Dr. Marie Martin',
    date: '2024-02-10',
    time: '10:00',
    department: 'Cardiologie',
    status: 'en attente',
  },
  {
    id: '2',
    patient: 'Pierre Bernard',
    doctor: 'Dr. Jean Leclerc',
    date: '2024-02-10',
    time: '14:00',
    department: 'Dermatologie',
    status: 'en attente',
  },
  {
    id: '3',
    patient: 'Marie Claire',
    doctor: 'Dr. Marie Martin',
    date: '2024-02-11',
    time: '11:00',
    department: 'Pédiatrie',
    status: 'confirmé',
  },
];

export default function AppointmentsScreen() {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);

  const validateAppointment = (id: string) => {
    setAppointments((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: 'confirmé' as const } : app
      )
    );
  };

  const rejectAppointment = (id: string) => {
    setAppointments((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: 'annulé' as const } : app
      )
    );
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'en attente':
        return isDark ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-800';
      case 'confirmé':
        return isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800';
      case 'terminé':
        return isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-800';
      case 'annulé':
        return isDark ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-800';
      default:
        return isDark ? 'bg-gray-900/30 text-gray-400' : 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={isDark ? 'dark min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' : 'min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50'}>
      {/* Header */}
      <header className={`${isDark ? 'bg-slate-900/80 border-slate-700/40' : 'bg-white/80 border-gray-200/40'} border-b shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
              className={`p-2 rounded-lg ${isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t('appointments.title')}
              </h1>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {appointments.filter((a) => a.status === 'en attente').length} en attente de validation
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className={`p-6 rounded-lg shadow-md border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}
            >
              <div className="grid md:grid-cols-2 gap-6 mb-4">
                {/* Left Column */}
                <div>
                  <div className="mb-4">
                    <p className={`text-sm font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {t('appointments.patient')}
                    </p>
                    <p className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {appointment.patient}
                    </p>
                  </div>
                  <div className="mb-4">
                    <p className={`text-sm font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {t('appointments.doctor')}
                    </p>
                    <p className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {appointment.doctor}
                    </p>
                  </div>
                </div>

                {/* Right Column */}
                <div>
                  <div className="mb-4">
                    <p className={`text-sm font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {t('appointments.date')}
                    </p>
                    <p className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {appointment.date} à {appointment.time}
                    </p>
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {t('appointments.status')}
                    </p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              {appointment.status === 'en attente' && (
                <div className="flex gap-2">
                  <button
                    onClick={() => validateAppointment(appointment.id)}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{t('appointments.validate')}</span>
                  </button>
                  <button
                    onClick={() => rejectAppointment(appointment.id)}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>{t('appointments.reject')}</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {appointments.length === 0 && (
          <div className={`text-center py-12 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-gray-50'}`}>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              Aucun rendez-vous trouvé
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
