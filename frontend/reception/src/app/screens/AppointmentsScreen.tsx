import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { useReception } from '@/app/contexts/ReceptionContext';
import { ArrowLeft, Clock, User, Phone, MapPin, CheckCircle2 } from 'lucide-react';

export default function AppointmentsScreen() {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const { appointments, checkInPatient, assignRoom, rooms } = useReception();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'waiting':
        return isDark ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500' : 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'checked_in':
        return isDark ? 'bg-blue-500/20 text-blue-400 border-blue-500' : 'bg-blue-100 text-blue-800 border-blue-300';
      case 'in_consultation':
        return isDark ? 'bg-purple-500/20 text-purple-400 border-purple-500' : 'bg-purple-100 text-purple-800 border-purple-300';
      case 'completed':
        return isDark ? 'bg-green-500/20 text-green-400 border-green-500' : 'bg-green-100 text-green-800 border-green-300';
      default:
        return isDark ? 'bg-gray-500/20 text-gray-400 border-gray-500' : 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'waiting':
        return t('status.waiting');
      case 'checked_in':
        return t('status.checked_in');
      case 'in_consultation':
        return t('status.in_consultation');
      case 'completed':
        return t('status.completed');
      default:
        return status;
    }
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
            <Clock className="w-8 h-8 text-blue-500" />
            <div>
              <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t('appointments.title')}
              </h1>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {appointments.length} rendez-vous
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {appointments.length === 0 ? (
          <div className={`rounded-xl border-2 p-8 text-center ${isDark ? 'bg-slate-900/60 border-cyan-900/30' : 'bg-white border-gray-200'}`}>
            <Clock className="w-12 h-12 mx-auto opacity-50 mb-2" />
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{t('appointments.no_appointments')}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className={`rounded-xl border-2 p-6 transition-all duration-200 ${isDark ? 'bg-slate-900/60 border-cyan-900/30 hover:border-blue-500/50' : 'bg-white border-gray-200 hover:border-blue-300'}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-5 h-5 text-blue-500" />
                      <h3 className="text-xl font-bold">{appointment.patientName}</h3>
                    </div>
                    <p className={isDark ? 'text-gray-400 text-sm' : 'text-gray-600 text-sm'}>
                      {appointment.reason}
                    </p>
                  </div>

                  <div className={`px-4 py-2 rounded-lg border-2 font-semibold text-sm ${getStatusColor(appointment.status)}`}>
                    {getStatusLabel(appointment.status)}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                  <div>
                    <p className={`${isDark ? 'text-gray-500' : 'text-gray-600'} text-xs`}>Date</p>
                    <p className="font-semibold">{new Date(appointment.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className={`${isDark ? 'text-gray-500' : 'text-gray-600'} text-xs`}>Heure</p>
                    <p className="font-semibold">{appointment.time}</p>
                  </div>
                  <div>
                    <p className={`${isDark ? 'text-gray-500' : 'text-gray-600'} text-xs`}>Médecin</p>
                    <p className="font-semibold">{appointment.doctorName}</p>
                  </div>
                  <div>
                    <p className={`${isDark ? 'text-gray-500' : 'text-gray-600'} text-xs`}>Département</p>
                    <p className="font-semibold">{appointment.department}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {appointment.patientEmail}
                  </span>
                </div>

                {appointment.room && (
                  <div className="flex items-center gap-2 mb-4 p-3 rounded-lg bg-purple-500/20">
                    <MapPin className="w-4 h-4 text-purple-500" />
                    <span className="font-semibold">Salle: {appointment.room}</span>
                  </div>
                )}

                <div className="flex gap-3">
                  {appointment.status === 'waiting' && (
                    <button
                      onClick={() => checkInPatient(appointment.id)}
                      className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200 font-semibold flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      {t('appointments.check_in')}
                    </button>
                  )}

                  {appointment.status === 'checked_in' && (
                    <select
                      onChange={(e) => {
                        if (e.target.value) {
                          assignRoom(appointment.id, e.target.value);
                        }
                      }}
                      defaultValue=""
                      className={`flex-1 px-4 py-2 rounded-lg border-2 ${isDark ? 'bg-slate-900/50 border-cyan-900/40 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                      <option value="">Assignez une salle...</option>
                      {rooms
                        .filter((r) => r.status === 'available')
                        .map((room) => (
                          <option key={room.id} value={room.id}>
                            {room.name} (Étage {room.floor})
                          </option>
                        ))}
                    </select>
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
