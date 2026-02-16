import { useLanguage } from '@/app/contexts/LanguageContext';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useAdmin } from '@/app/contexts/AdminContext';
import { Stethoscope, Calendar, User, Check, X, Search, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface Appointment {
  id: string;
  patient: string; // Modifié pour correspondre à l'API (patient au lieu de patientName)
  date: string;
  time: string;
  department: string;
  status: string;
  doctor?: string; // Modifié pour correspondre à l'API
  docteur_id?: number;
}

export default function AssignAppointmentsScreen() {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');

  useEffect(() => {
    // Charger les rendez-vous
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    const hospitalId = user?.hospital_id;
    let url = 'http://localhost:5000/api/appointments';
    if (hospitalId) url += `?hospitalId=${hospitalId}`;

    fetch(url)
      .then(res => res.json())
      .then(data => setAppointments(data))
      .catch(err => console.error("Erreur chargement RDV:", err));

    // Charger les médecins
    fetch('http://localhost:5000/api/doctors')
      .then(res => res.json())
      .then(data => {
        // Filtrer par hôpital si nécessaire
        const filteredDocs = hospitalId ? data.filter((d: any) => d.hospital_id == hospitalId) : data;
        setDoctors(filteredDocs);
      })
      .catch(err => console.error("Erreur chargement médecins:", err));
  }, []);

  const filteredAppointments = appointments.filter(apt =>
    (apt.patient && apt.patient.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (apt.department && apt.department.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAssignDoctor = async (appointmentId: string, doctorId: string, doctorName: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/appointments/${appointmentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ docteur_id: doctorId, status: 'Confirmé' }),
      });

      if (response.ok) {
        setAppointments(appointments.map(apt =>
          apt.id === appointmentId ? { ...apt, doctor: doctorName, docteur_id: parseInt(doctorId), status: 'Confirmé' } : apt
        ));
        setSelectedAppointmentId(null);
        setSelectedDoctor('');
      }
    } catch (error) {
      console.error("Erreur assignation:", error);
    }
  };

  const getAvailableDoctors = (department: string) => {
    // On peut filtrer par spécialité si on veut être strict, ou afficher tous les médecins
    // Ici on filtre par spécialité pour être cohérent avec l'interface
    return doctors.filter(doc => doc.specialite === department);
  };

  return (
    <div className={isDark ? 'dark min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/40 text-white' : 'min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50'}>
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
          <div className={`relative rounded-xl overflow-hidden border-2 ${isDark ? 'border-cyan-900/30' : 'border-gray-200'}`}>
            <Search className={`absolute left-4 top-3 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
            <input
              type="text"
              placeholder="Rechercher par patient ou département..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 ${isDark ? 'bg-slate-900/60 border-cyan-900/30 text-white' : 'bg-white border-gray-200'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
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
            value={appointments.filter(a => !a.docteur_id).length.toString()}
            isDark={isDark}
            highlight
          />
          <StatCard
            icon={<Check className="w-6 h-6" />}
            label="Assignés"
            value={appointments.filter(a => a.docteur_id).length.toString()}
            isDark={isDark}
          />
          <StatCard
            icon={<Stethoscope className="w-6 h-6" />}
            label="Médecins"
            value={doctors.length.toString()}
            isDark={isDark}
          />
        </div>

        {/* Appointments List */}
        <div className={`rounded-xl border-2 overflow-hidden ${isDark ? 'bg-slate-900/60 border-cyan-900/30' : 'bg-white border-gray-200'}`}>
          <div className={`p-6 border-b ${isDark ? 'border-cyan-900/30 bg-slate-900/70' : 'border-gray-200 bg-gray-50'}`}>
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
                    ? isDark ? 'bg-slate-900/50' : 'bg-purple-50'
                    : isDark ? 'hover:bg-slate-900/70' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${appointment.docteur_id
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {appointment.docteur_id ? 'Assigné' : 'En attente'}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold mb-2">{appointment.patient}</h3>
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
                          <p className="font-bold">{appointment.doctor || 'Non assigné'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Doctor Selection */}
                  {selectedAppointmentId === appointment.id && (
                    <div className="mt-4 p-4 rounded-lg border-2 border-purple-500 bg-purple-500/5">
                      <p className="font-bold mb-3">Sélectionnez un médecin:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {getAvailableDoctors(appointment.department).map((doctor: any) => (
                          <button
                            key={doctor.doctor_id}
                            onClick={() => handleAssignDoctor(appointment.id, doctor.doctor_id, doctor.nom)}
                            className={`p-3 rounded-lg text-left transition-all duration-200 ${selectedDoctor === doctor.doctor_id
                              ? 'bg-purple-500 text-white'
                              : isDark ? 'bg-slate-900/50 hover:bg-slate-600' : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                          >
                            <div className="font-semibold text-sm">{doctor.nom}</div>
                            <div className={`text-xs ${selectedDoctor === doctor.doctor_id ? 'text-purple-100' : isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              {doctor.specialite}
                            </div>
                          </button>
                        ))}
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => setSelectedAppointmentId(null)}
                          className={`flex-1 px-4 py-2 rounded-lg transition-all duration-200 ${isDark ? 'bg-slate-900/50 hover:bg-slate-600' : 'bg-gray-300 hover:bg-gray-400'}`}
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
                        className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${appointment.docteur_id
                          ? 'bg-blue-500 text-white hover:bg-blue-600'
                          : 'bg-purple-500 text-white hover:bg-purple-600'
                        }`}
                      >
                        {appointment.docteur_id ? (
                          <>
                            <Check className="w-5 h-5" />
                            Réassigner
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
            {doctors.map((doctor: any) => (
              <div
                key={doctor.doctor_id}
                className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 transform ${isDark
                  ? 'bg-slate-900/60 border-cyan-900/30 hover:border-purple-500'
                  : 'bg-white border-gray-200 hover:border-purple-500'
                }`}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 text-white font-bold mb-3">
                  {doctor.nom.charAt(0)}
                </div>
                <h3 className="font-bold text-sm mb-1">{doctor.nom}</h3>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{doctor.specialite}</p>
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
      ? `${highlight ? 'bg-purple-900/50 border-purple-600' : 'bg-slate-900/60 border-cyan-900/30'}`
      : `${highlight ? 'bg-purple-50 border-purple-200' : 'bg-white border-gray-200'}`
    }`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${highlight
          ? 'bg-gradient-to-br from-purple-500 to-pink-500'
          : isDark ? 'bg-slate-900/50' : 'bg-gray-200'
        } text-white`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
