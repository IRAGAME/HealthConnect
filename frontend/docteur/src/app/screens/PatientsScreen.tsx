import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { useDoctor } from '@/app/contexts/DoctorContext';
import { ArrowLeft, User, Mail, Phone, Droplet, Plus, Clock } from 'lucide-react';
import { useState } from 'react';

export default function PatientsScreen() {
  const navigate = useNavigate();
  const { patientId } = useParams();
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const { patients, getPatientById, addPatientNote } = useDoctor();
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [noteData, setNoteData] = useState({
    content: '',
    diagnosis: '',
    treatment: '',
    prescription: '',
  });

  const displayPatient = patientId ? getPatientById(patientId) : null;
  const patientsList = patientId ? [displayPatient].filter(Boolean) : patients;

  const handleAddNote = (pId: string) => {
    if (noteData.content) {
      addPatientNote(pId, {
        content: noteData.content,
        date: new Date().toISOString(),
        diagnosis: noteData.diagnosis,
        treatment: noteData.treatment,
        prescription: noteData.prescription,
      });
      setNoteData({ content: '', diagnosis: '', treatment: '', prescription: '' });
      setShowNoteForm(false);
    }
  };

  return (
    <div className={isDark ? 'dark min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/40' : 'min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50'}>
      {/* Header */}
      <header className={`${isDark ? 'bg-slate-900/75 border-cyan-900/40' : 'bg-white/80 border-gray-200/40'} border-b backdrop-blur-md sticky top-0 z-40 transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(patientId ? '/patients' : '/dashboard')}
              className={`p-2 rounded-lg transition-all duration-200 ${isDark ? 'bg-slate-900/60 hover:bg-slate-900/80 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <User className="w-8 h-8 text-green-500" />
            <div>
              <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t('patients.title')}
              </h1>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {patientsList.length} patient{patientsList.length > 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {patientsList.length === 0 ? (
          <div className={`rounded-xl border-2 p-8 text-center ${isDark ? 'bg-slate-900/60 border-cyan-900/30' : 'bg-white border-gray-200'}`}>
            <User className="w-12 h-12 mx-auto opacity-50 mb-2" />
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{t('patients.no_patients')}</p>
          </div>
        ) : (
          <div className="space-y-6">
            {patientsList.map((patient) => (
              <div
                key={patient.id}
                className={`rounded-xl border-2 overflow-hidden ${isDark ? 'bg-slate-900/60 border-cyan-900/30' : 'bg-white border-gray-200'}`}
              >
                {/* Patient Header */}
                <div className={`p-6 border-b ${isDark ? 'border-cyan-900/30 bg-slate-900/70' : 'border-gray-200 bg-gray-50'}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">{patient.name}</h2>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{patient.age} ans</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          <span>{patient.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          <span>{patient.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Droplet className="w-4 h-4 text-red-500" />
                          <span>{patient.bloodType}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Patient Information */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-bold mb-2">Antécédents Médicaux</h3>
                    <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{patient.medicalHistory}</p>
                  </div>

                  {patient.currentIllness && (
                    <div className={`p-4 rounded-lg ${isDark ? 'bg-slate-900/50' : 'bg-yellow-50'}`}>
                      <h3 className="font-bold mb-2">Maladie Actuelle</h3>
                      <p className={isDark ? 'text-gray-300' : 'text-yellow-800'}>{patient.currentIllness}</p>
                    </div>
                  )}

                  {/* Notes Section */}
                  <div className="mt-6 border-t pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-lg">{t('patients.notes')}</h3>
                      <button
                        onClick={() => setShowNoteForm(!showNoteForm)}
                        className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
                      >
                        <Plus className="w-4 h-4" />
                        {t('patients.add_note')}
                      </button>
                    </div>

                    {/* Note Form */}
                    {showNoteForm && (
                      <div className={`mb-4 p-4 rounded-lg border-2 ${isDark ? 'bg-slate-900/50 border-cyan-900/40' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="space-y-3">
                          <textarea
                            placeholder="Note générale..."
                            value={noteData.content}
                            onChange={(e) => setNoteData({ ...noteData, content: e.target.value })}
                            className={`w-full px-3 py-2 rounded-lg border-2 ${isDark ? 'bg-slate-900/60 border-cyan-900/40 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            rows={3}
                          />
                          <input
                            type="text"
                            placeholder="Diagnostic..."
                            value={noteData.diagnosis}
                            onChange={(e) => setNoteData({ ...noteData, diagnosis: e.target.value })}
                            className={`w-full px-3 py-2 rounded-lg border-2 ${isDark ? 'bg-slate-900/60 border-cyan-900/40 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          />
                          <input
                            type="text"
                            placeholder="Traitement..."
                            value={noteData.treatment}
                            onChange={(e) => setNoteData({ ...noteData, treatment: e.target.value })}
                            className={`w-full px-3 py-2 rounded-lg border-2 ${isDark ? 'bg-slate-900/60 border-cyan-900/40 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          />
                          <input
                            type="text"
                            placeholder="Prescription..."
                            value={noteData.prescription}
                            onChange={(e) => setNoteData({ ...noteData, prescription: e.target.value })}
                            className={`w-full px-3 py-2 rounded-lg border-2 ${isDark ? 'bg-slate-900/60 border-cyan-900/40 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleAddNote(patient.id)}
                              className="flex-1 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200"
                            >
                              {t('action.save')}
                            </button>
                            <button
                              onClick={() => setShowNoteForm(false)}
                              className={`flex-1 px-3 py-2 rounded-lg border-2 transition-all duration-200 ${isDark ? 'border-cyan-900/40 hover:bg-slate-900/70' : 'border-gray-300 hover:bg-gray-100'}`}
                            >
                              {t('action.cancel')}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Notes List */}
                    <div className="space-y-3">
                      {patient.notes.length === 0 ? (
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Aucune note</p>
                      ) : (
                        patient.notes.map((note) => (
                          <div
                            key={note.id}
                            className={`p-4 rounded-lg border-l-4 ${isDark ? 'bg-slate-900/50 border-l-blue-500' : 'bg-blue-50 border-l-blue-500'}`}
                          >
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                              {new Date(note.date).toLocaleDateString()}
                            </p>
                            <p className={isDark ? 'text-gray-200' : 'text-gray-800'} >{note.content}</p>
                            {note.diagnosis && (
                              <p className={`mt-2 text-sm ${isDark ? 'text-green-400' : 'text-green-700'}`}>
                                <strong>Diagnostic:</strong> {note.diagnosis}
                              </p>
                            )}
                            {note.treatment && (
                              <p className={`mt-1 text-sm ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>
                                <strong>Traitement:</strong> {note.treatment}
                              </p>
                            )}
                            {note.prescription && (
                              <p className={`mt-1 text-sm ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>
                                <strong>Prescription:</strong> {note.prescription}
                              </p>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
