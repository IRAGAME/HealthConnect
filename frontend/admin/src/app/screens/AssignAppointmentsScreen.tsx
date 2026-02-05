import { useLanguage } from '@/app/contexts/LanguageContext';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useAdmin } from '@/app/contexts/AdminContext';
import { Stethoscope, Calendar, User, Check, X, Search, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Appointment {
  id: string;
  patientName: string;
  date: string;
  time: string;
  department: string;
  status: string;
  assignedDoctor?: string;
}

const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientName: 'Jean Dupont',
    date: '2026-02-10',
    time: '09:00',
    department: 'Cardiologie',
    status: 'pending',
  },
  {
    id: '2',
    patientName: 'Marie Claude',
    date: '2026-02-10',
    time: '10:30',
    department: 'Dermatologie',
    status: 'pending',
    assignedDoctor: 'Dr. Sophie Martin'
  },
  {
    id: '3',
    patientName: 'Paul Henri',
    date: '2026-02-11',
    time: '14:00',
    department: 'Orthopédie',
    status: 'pending',
  },
];

const mockDoctors = [
  { id: '1', name: 'Dr. Marie Leblanc', specialty: 'Cardiologie' },
  { id: '2', name: 'Dr. Sophie Martin', specialty: 'Dermatologie' },
  { id: '3', name: 'Dr. Jean Rousseau', specialty: 'Orthopédie' },
  { id: '4', name: 'Dr. Pierre Dupuis', specialty: 'Cardiologie' },
  { id: '5', name: 'Dr. Isabelle Moreau', specialty: 'Pneumologie' },
];

export default function AssignAppointmentsScreen() {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');

  const filteredAppointments = appointments.filter(apt =>
    apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAssignDoctor = (appointmentId: string, doctorName: string) => {
    setAppointments(appointments.map(apt =>
      apt.id === appointmentId ? { ...apt, assignedDoctor: doctorName, status: 'confirmed' } : apt
    ));
    setSelectedAppointmentId(null);
    setSelectedDoctor('');
  };

  const getAvailableDoctors = (department: string) => {
    return mockDoctors.filter(doc => doc.specialty === department);
  };

  return (
    <div className={isDark ? 'dark min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white' : 'min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50'}>
      {/* Header */}
      <header className={`${isDark ? 'bg-slate-900/80 border-slate-700/40' : 'bg-white/80 border-gray-200/40'} border-b backdrop-blur-md sticky top-0 z-40 transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className={`p-2 rounded-lg transition-all duration-200 ${isDark ? 'bg-slate-800 hover:bg-slate-700 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t('appointments.assign')}
              </h1>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Assignez les rendez-vous aux médecins disponibles
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className={`relative rounded-xl overflow-hidden border-2 ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
            <Search className={`absolute left-4 top-3 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
            <input
              type="text"
              placeholder="Rechercher par patient ou département..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-200'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={<Calendar className="w-6 h-6" />}
            label="Total Rendez-vous"
            value={appointments.length.toString()}
            isDark={isDark}
          />
          <StatCard
            icon={<User className="w-6 h-6" />}
            label="En Attente d'Assignment"
            value={appointments.filter(a => !a.assignedDoctor).length.toString()}
            isDark={isDark}
            highlight
          />
          <StatCard
            icon={<Check className="w-6 h-6" />}
            label="Assignés"
            value={appointments.filter(a => a.assignedDoctor).length.toString()}
            isDark={isDark}
          />
          <StatCard
            icon={<Stethoscope className="w-6 h-6" />}
            label="Médecins"
            value={mockDoctors.length.toString()}
            isDark={isDark}
          />
        </div>

        {/* Appointments List */}
        <div className={`rounded-xl border-2 overflow-hidden ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
          <div className={`p-6 border-b ${isDark ? 'border-slate-700 bg-slate-900' : 'border-gray-200 bg-gray-50'}`}>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Rendez-vous à Assigner
            </h2>
          </div>

          <div className="divide-y divide-slate-700">
            {filteredAppointments.length === 0 ? (
              <div className="p-8 text-center">
                <Calendar className="w-12 h-12 mx-auto opacity-50 mb-2" />
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                  {searchTerm ? 'Aucun rendez-vous trouvé' : 'Aucun rendez-vous'}
                </p>
              </div>
            ) : (
              filteredAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className={`p-6 transition-all duration-200 ${selectedAppointmentId === appointment.id
                    ? isDark ? 'bg-slate-700' : 'bg-purple-50'
                    : isDark ? 'hover:bg-slate-700' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${appointment.assignedDoctor
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {appointment.assignedDoctor ? 'Assigné' : 'En attente'}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold mb-2">{appointment.patientName}</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>DATE</p>
                          <p className="font-bold">{appointment.date}</p>
                        </div>
                        <div>
                          <p className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>HEURE</p>
                          <p className="font-bold">{appointment.time}</p>
                        </div>
                        <div>
                          <p className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>DÉPARTEMENT</p>
                          <p className="font-bold">{appointment.department}</p>
                        </div>
                        <div>
                          <p className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>MÉDECIN</p>
                          <p className="font-bold">{appointment.assignedDoctor || 'Non assigné'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Doctor Selection */}
                  {selectedAppointmentId === appointment.id && (
                    <div className="mt-4 p-4 rounded-lg border-2 border-purple-500 bg-purple-500/5">
                      <p className="font-bold mb-3">Sélectionnez un médecin:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {getAvailableDoctors(appointment.department).map((doctor) => (
                          <button
                            key={doctor.id}
                            onClick={() => handleAssignDoctor(appointment.id, doctor.name)}
                            className={`p-3 rounded-lg text-left transition-all duration-200 ${selectedDoctor === doctor.id
                              ? 'bg-purple-500 text-white'
                              : isDark ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                          >
                            <div className="font-semibold text-sm">{doctor.name}</div>
                            <div className={`text-xs ${selectedDoctor === doctor.id ? 'text-purple-100' : isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              {doctor.specialty}
                            </div>
                          </button>
                        ))}
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => setSelectedAppointmentId(null)}
                          className={`flex-1 px-4 py-2 rounded-lg transition-all duration-200 ${isDark ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-300 hover:bg-gray-400'}`}
                        >
                          {t('action.cancel')}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  {selectedAppointmentId !== appointment.id && (
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={() => setSelectedAppointmentId(appointment.id)}
                        disabled={appointment.assignedDoctor !== undefined}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${appointment.assignedDoctor
                          ? 'bg-green-500 text-white cursor-default'
                          : 'bg-purple-500 text-white hover:bg-purple-600 active:scale-95'
                        }`}
                      >
                        {appointment.assignedDoctor ? (
                          <>
                            <Check className="w-5 h-5" />
                            Assigné
                          </>
                        ) : (
                          t('appointments.assignDoctor')
                        )}
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Available Doctors Section */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Médecins Disponibles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {mockDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 transform ${isDark
                  ? 'bg-slate-800 border-slate-700 hover:border-purple-500'
                  : 'bg-white border-gray-200 hover:border-purple-500'
                }`}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 text-white font-bold mb-3">
                  {doctor.name.charAt(4)}
                </div>
                <h3 className="font-bold text-sm mb-1">{doctor.name}</h3>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{doctor.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value, isDark, highlight }: any) {
  return (
    <div className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${isDark
      ? `${highlight ? 'bg-purple-900/50 border-purple-600' : 'bg-slate-800 border-slate-700'}`
      : `${highlight ? 'bg-purple-50 border-purple-200' : 'bg-white border-gray-200'}`
    }`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${highlight
          ? 'bg-gradient-to-br from-purple-500 to-pink-500'
          : isDark ? 'bg-slate-700' : 'bg-gray-200'
        } text-white`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
