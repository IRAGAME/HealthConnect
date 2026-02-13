import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { useDoctor } from '@/app/contexts/DoctorContext';
import { ArrowLeft, Calendar, Clock, User, Play, CheckCircle } from 'lucide-react';

export default function AppointmentsScreen() {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const { appointments, updateAppointmentStatus } = useDoctor();

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-800';
      case 'completed':
        return isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800';
      default:
        return isDark ? 'bg-gray-900/30 text-gray-400' : 'bg-gray-100 text-gray-800';
    }
  };

  const handleStartAppointment = (appointmentId: string) => {
    updateAppointmentStatus(appointmentId, 'in_progress');
  };

  const handleCompleteAppointment = (appointmentId: string) => {
    updateAppointmentStatus(appointmentId, 'completed');
    navigate(`/patients/${appointments.find(a => a.id === appointmentId)?.patientId}`);
  };

  return (
    <div className={isDark ? 'dark min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/40' : 'min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50'}>
      {/* Header */}
      <header className={`${isDark ? 'bg-slate-900/75 border-cyan-900/40' : 'bg-white/80 border-gray-200/40'} border-b backdrop-blur-md sticky top-0 z-40 transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className={`p-2 rounded-lg transition-all duration-200 ${isDark ? 'bg-slate-900/60 hover:bg-slate-900/80 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <Calendar className="w-8 h-8 text-blue-500" />
            <div>
              <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t('appointments.title')}
              </h1>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {appointments.length} rendez-vous en total
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {appointments.length === 0 ? (
          <div className={`rounded-xl border-2 p-8 text-center ${isDark ? 'bg-slate-900/60 border-cyan-900/30' : 'bg-white border-gray-200'}`}>
            <Calendar className="w-12 h-12 mx-auto opacity-50 mb-2" />
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{t('appointments.no_appointments')}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className={`p-6 rounded-xl border-2 transition-all duration-200 ${isDark
                  ? 'bg-slate-900/60 border-cyan-900/30 hover:border-blue-500'
                  : 'bg-white border-gray-200 hover:border-blue-500'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${getStatusBadgeColor(appointment.status)}`}>
                        {appointment.status === 'pending' ? 'En Attente' : appointment.status === 'in_progress' ? 'En Cours' : 'Complété'}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                      <User className="w-5 h-5" />
                      {appointment.patientName}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                      <div>
                        <p className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>DATE</p>
                        <p className="font-bold">{appointment.date}</p>
                      </div>
                      <div>
                        <p className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>HEURE</p>
                        <p className="font-bold flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {appointment.time}
                        </p>
                      </div>
                      <div>
                        <p className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>DÉPARTEMENT</p>
                        <p className="font-bold">{appointment.department}</p>
                      </div>
                      <div>
                        <p className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>RAISON</p>
                        <p className="font-bold text-blue-500">{appointment.reason}</p>
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-slate-900/50' : 'bg-gray-100'}`}>
                      <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        <strong>Symptômes:</strong> {appointment.symptoms}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4">
                  {appointment.status === 'pending' && (
                    <button
                      onClick={() => handleStartAppointment(appointment.id)}
                      className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <Play className="w-4 h-4" />
                      {t('appointments.start')}
                    </button>
                  )}
                  {(appointment.status === 'pending' || appointment.status === 'in_progress') && (
                    <button
                      onClick={() => handleCompleteAppointment(appointment.id)}
                      className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      {t('appointments.complete')}
                    </button>
                  )}
                  {appointment.status === 'in_progress' && (
                    <button
                      onClick={() => navigate(`/patients/${appointment.patientId}`)}
                      className="flex-1 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all duration-200"
                    >
                      Voir Patient
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
