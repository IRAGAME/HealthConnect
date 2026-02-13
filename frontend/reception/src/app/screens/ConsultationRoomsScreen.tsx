import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { useReception } from '@/app/contexts/ReceptionContext';
import { ArrowLeft, Layers, User, Clock, CheckCircle2, XCircle, Stethoscope } from 'lucide-react';

export default function ConsultationRoomsScreen() {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const { rooms, appointments, releaseRoom } = useReception();

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
            <Layers className="w-8 h-8 text-purple-500" />
            <div>
              <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t('rooms.title')}
              </h1>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {rooms.filter((r) => r.status === 'available').length}/{rooms.length} disponibles
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Planning par Salle */}
          <div>
            <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Planning des Salles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms.map((room) => {
                const appointment = room.appointmentId
                  ? appointments.find((a) => a.id === room.appointmentId)
                  : null;

                return (
                  <div
                    key={room.id}
                    className={`rounded-xl border-2 p-6 transition-all duration-200 ${
                      room.status === 'available'
                        ? isDark
                          ? 'bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-500/30'
                          : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300'
                        : isDark
                        ? 'bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-500/30'
                        : 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-300'
                    }`}
                  >
                    {/* Header Salle */}
                    <div className="flex items-center justify-between mb-4 pb-4 border-b-2 border-gray-400/20">
                      <h3 className="text-2xl font-bold">{room.name}</h3>
                      {room.status === 'available' ? (
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-6 h-6 text-green-500" />
                          <span className="text-sm font-semibold text-green-600 dark:text-green-400">Libre</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-6 h-6 text-blue-500" />
                          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">Occupée</span>
                        </div>
                      )}
                    </div>

                    {/* Étage */}
                    <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Étage: <span className="font-semibold">{room.floor}</span>
                    </p>

                    {/* Planning du Médecin - Clear Statement */}
                    {room.status === 'occupied' && appointment && (
                      <>
                        {/* Main Statement */}
                        <div className="mb-4 p-4 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-l-4 border-blue-500">
                          <p className="text-lg font-bold">
                            <span className="text-blue-600 dark:text-blue-400">Dr. {appointment.doctorName}</span>
                            <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}> est dans la </span>
                            <span className="text-cyan-600 dark:text-cyan-400 font-bold">{room.name}</span>
                          </p>
                        </div>

                        {/* Détails complets */}
                        <div className="space-y-3">
                          {/* Médecin */}
                          <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-500/20">
                            <Stethoscope className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                MÉDECIN
                              </p>
                              <p className="font-bold text-lg">{appointment.doctorName}</p>
                              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                {appointment.department}
                              </p>
                            </div>
                          </div>

                          {/* Patient */}
                          <div className="flex items-start gap-3 p-3 rounded-lg bg-purple-500/20">
                            <User className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                PATIENT
                              </p>
                              <p className="font-bold text-lg">{appointment.patientName}</p>
                              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                {appointment.patientEmail}
                              </p>
                            </div>
                          </div>

                          {/* Heure et Raison */}
                          <div className="flex items-start gap-3 p-3 rounded-lg bg-orange-500/20">
                            <Clock className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                CONSULTATION
                              </p>
                              <p className="font-bold">
                                {new Date(appointment.date).toLocaleDateString()} à {appointment.time}
                              </p>
                              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                {appointment.reason}
                              </p>
                            </div>
                          </div>

                          {/* Bouton Libérer */}
                          <button
                            onClick={() => releaseRoom(room.id)}
                            className="w-full px-3 py-2 mt-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-200 font-semibold text-sm"
                          >
                            Libérer la salle
                          </button>
                        </div>
                      </>
                    )}

                    {room.status === 'available' && (
                      <div className={`text-center py-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        <p className="font-semibold">Aucune consultation en cours</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
