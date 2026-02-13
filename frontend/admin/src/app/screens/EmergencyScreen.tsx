import { useLanguage } from '@/app/contexts/LanguageContext';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useEmergency, EmergencyLevel } from '@/app/contexts/EmergencyContext';
import { AlertCircle, Zap, Activity, Shield, Plus, Trash2, Check, Clock, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const levelConfig = {
  1: { label: 'Appel', icon: AlertCircle, color: 'bg-red-500', textColor: 'text-red-600', borderColor: 'border-red-200' },
  2: { label: 'Message', icon: Zap, color: 'bg-orange-500', textColor: 'text-orange-600', borderColor: 'border-orange-200' },
  3: { label: 'Bip', icon: Activity, color: 'bg-yellow-500', textColor: 'text-yellow-600', borderColor: 'border-yellow-200' },
  4: { label: 'Alerte', icon: Shield, color: 'bg-blue-500', textColor: 'text-blue-600', borderColor: 'border-blue-200' },
};

export default function EmergencyScreen() {
  const { t, language } = useLanguage();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const { emergencies, addEmergency, updateEmergency, deleteEmergency, getEmergenciesByLevel } = useEmergency();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ patientName: '', symptoms: '', level: 1 as EmergencyLevel });

  const handleAddEmergency = () => {
    if (formData.patientName && formData.symptoms) {
      addEmergency({
        patientName: formData.patientName,
        symptoms: formData.symptoms,
        level: formData.level,
      });
      setFormData({ patientName: '', symptoms: '', level: 1 });
      setShowForm(false);
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-red-100 text-red-800' : status === 'treated' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800';
  };

  return (
    <div className={isDark ? 'dark min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/40 text-white' : 'min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50'}>
      {/* Header */}
      <header className={`${isDark ? 'bg-slate-900/75 border-cyan-900/40' : 'bg-white/80 border-gray-200/40'} border-b backdrop-blur-md sticky top-0 z-40 transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/dashboard')}
                className={`p-2 rounded-lg transition-all duration-200 ${isDark ? 'bg-slate-900/60 hover:bg-slate-900/80 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <AlertCircle className="w-8 h-8 text-red-500" />
              <div>
                <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t('emergencies.title')}
                </h1>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Supervision et gestion des cas d'urgence
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 hover:shadow-lg"
            >
              <Plus className="w-5 h-5" />
              {t('emergencies.newCase')}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Form Section */}
        {showForm && (
          <div className={`mb-8 p-6 rounded-xl border-2 ${isDark ? 'bg-slate-900/60 border-cyan-900/30' : 'bg-white border-gray-200'} animate-slideDown`}>
            <h2 className="text-xl font-bold mb-4">{t('emergencies.newCase')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t('emergencies.patientName')}
                </label>
                <input
                  type="text"
                  value={formData.patientName}
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg border ${isDark ? 'bg-slate-900/50 border-cyan-900/40 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-red-500`}
                  placeholder="Nom du patient"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t('emergencies.level')}
                </label>
                <select
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) as EmergencyLevel })}
                  className={`w-full px-4 py-2 rounded-lg border ${isDark ? 'bg-slate-900/50 border-cyan-900/40 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-red-500`}
                >
                  <option value={1}>{t('emergencies.level1')}</option>
                  <option value={2}>{t('emergencies.level2')}</option>
                  <option value={3}>{t('emergencies.level3')}</option>
                  <option value={4}>{t('emergencies.level4')}</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t('emergencies.symptoms')}
                </label>
                <textarea
                  value={formData.symptoms}
                  onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg border ${isDark ? 'bg-slate-900/50 border-cyan-900/40 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-red-500`}
                  placeholder="Description des symptômes..."
                  rows={4}
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleAddEmergency}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200"
              >
                {t('action.confirm')}
              </button>
              <button
                onClick={() => setShowForm(false)}
                className={`flex-1 px-4 py-2 rounded-lg border transition-all duration-200 ${isDark ? 'border-cyan-900/40 text-gray-300 hover:bg-slate-900/70' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
              >
                {t('action.cancel')}
              </button>
            </div>
          </div>
        )}

        {/* Emergency Levels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {([1, 2, 3, 4] as EmergencyLevel[]).map((level) => {
            const config = levelConfig[level];
            const Icon = config.icon;
            const count = getEmergenciesByLevel(level).length;

            return (
              <div
                key={level}
                className={`p-4 rounded-xl border-2 transform transition-all duration-300 hover:scale-105 cursor-pointer ${isDark ? 'bg-slate-900/60 border-cyan-900/30 hover:border-red-500' : 'bg-white border-gray-200 hover:border-red-500'}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${config.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{t(`emergencies.level${level}`)}</h3>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{t(`emergencies.action${level}`)}</p>
                  </div>
                </div>
                <div className="text-center py-2 border-t border-current/20">
                  <span className="text-2xl font-bold text-red-500">{count}</span>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Cas actifs</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Emergencies List */}
        <div className={`rounded-xl border-2 ${isDark ? 'bg-slate-900/60 border-cyan-900/30' : 'bg-white border-gray-200'} overflow-hidden`}>
          <div className={`p-4 border-b ${isDark ? 'border-cyan-900/30 bg-slate-900/70' : 'border-gray-200 bg-gray-50'}`}>
            <h2 className="text-xl font-bold">Cas d'Urgence Actifs</h2>
          </div>

          <div className="divide-y divide-slate-700">
            {emergencies.filter(e => e.status === 'active').length === 0 ? (
              <div className="p-8 text-center">
                <Shield className="w-12 h-12 mx-auto opacity-50 mb-2" />
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Aucun cas d'urgence actif</p>
              </div>
            ) : (
              emergencies.filter(e => e.status === 'active').map((emergency) => {
                const config = levelConfig[emergency.level];

                return (
                  <div
                    key={emergency.id}
                    className={`p-4 hover:${isDark ? 'bg-slate-900/50' : 'bg-gray-50'} transition-all duration-200`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${config.color}`}>
                            {t(`emergencies.level${emergency.level}`)}
                          </span>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(emergency.status)}`}>
                            {emergency.status === 'active' ? 'Actif' : emergency.status === 'treated' ? 'En traitement' : 'Résolu'}
                          </span>
                        </div>
                        <h3 className="font-bold text-lg mb-1">{emergency.patientName}</h3>
                        <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          <strong>Symptômes:</strong> {emergency.symptoms}
                        </p>
                        {emergency.notes && (
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            <strong>Notes:</strong> {emergency.notes}
                          </p>
                        )}
                        {emergency.assignedDoctor && (
                          <p className={`text-sm mt-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                            <strong>Médecin assigné:</strong> {emergency.assignedDoctor}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateEmergency(emergency.id, { status: 'treated' })}
                          className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200 tooltip"
                          title="Marquer comme traité"
                        >
                          <Check className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => deleteEmergency(emergency.id)}
                          className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all duration-200 tooltip"
                          title="Supprimer"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
