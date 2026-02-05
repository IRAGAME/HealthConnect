import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Label } from '@/app/components/ui/label';
import { Calendar } from '@/app/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { ArrowLeft, Calendar as CalendarIcon, Clock, Stethoscope, User, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { MedicalDetails } from '@/app/components/MedicalDetails';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';

export default function BookAppointmentScreen() {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState('');
  const [medicalCondition, setMedicalCondition] = useState('');
  const [medicalDescription, setMedicalDescription] = useState('');

  const departments = [
    { value: 'cardiology', label: 'Cardiologie', icon: '❤️' },
    { value: 'general', label: 'Médecine Générale', icon: '🏥' },
    { value: 'pediatrics', label: 'Pédiatrie', icon: '👶' },
    { value: 'orthopedics', label: 'Orthopédie', icon: '🦴' },
    { value: 'dermatology', label: 'Dermatologie', icon: '💆' },
    { value: 'neurology', label: 'Neurologie', icon: '🧠' },
  ];

  const doctors: Record<string, Array<{ value: string; label: string }>> = {
    cardiology: [
      { value: 'dr-johnson', label: 'Dr. Sarah Leblanc' },
      { value: 'dr-williams', label: 'Dr. Robert Martin' },
    ],
    general: [
      { value: 'dr-chen', label: 'Dr. Michel Dupuis' },
      { value: 'dr-patel', label: 'Dr. Priya Patel' },
    ],
    pediatrics: [
      { value: 'dr-davis', label: 'Dr. Émilie Dubois' },
      { value: 'dr-martinez', label: 'Dr. Carlos Martinez' },
    ],
    orthopedics: [
      { value: 'dr-anderson', label: 'Dr. Jacques Bernard' },
      { value: 'dr-lee', label: 'Dr. Jennifer Laurent' },
    ],
    dermatology: [
      { value: 'dr-brown', label: 'Dr. Lisa Moreau' },
      { value: 'dr-garcia', label: 'Dr. Maria Garcia' },
    ],
    neurology: [
      { value: 'dr-wilson', label: 'Dr. David Rousseau' },
      { value: 'dr-taylor', label: 'Dr. Amanda Petit' },
    ],
  };

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30',
  ];

  const isFormComplete = selectedDepartment && selectedDoctor && selectedDate && selectedTime;

  const handleConfirmAppointment = () => {
    if (isFormComplete) {
      const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      const newAppointment = {
        id: Date.now().toString(),
        department: departments.find(d => d.value === selectedDepartment)?.label,
        doctor: doctors[selectedDepartment]?.find(d => d.value === selectedDoctor)?.label,
        medicalCondition,
        medicalDescription,
        date: format(selectedDate, 'd MMM yyyy', { locale: fr }),
        time: selectedTime,
        status: 'Confirmé',
      };
      appointments.push(newAppointment);
      localStorage.setItem('appointments', JSON.stringify(appointments));
      navigate('/appointments');
    }
  };

  return (
    <div className={isDark ? 'dark min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' : 'min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50'}>
      <header className={`${isDark ? 'bg-slate-900/80 border-slate-700/40 backdrop-blur-md' : 'bg-white/80 border-gray-200/40 backdrop-blur-md'} border-b shadow-sm transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')} className={isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('booking.title')}</h1>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{t('booking.subtitle')}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6 animate-fadeInUp">
            <Card className={`border-0 shadow-lg ${isDark ? 'bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 border border-slate-600/30' : 'bg-white border border-gray-200'}`}>
              <CardHeader>
                <CardTitle className={`flex items-center space-x-2 ${isDark ? 'text-white' : ''}`}>
                  <Stethoscope className="w-5 h-5 text-primary" />
                  <span>{t('booking.selectService')}</span>
                </CardTitle>
                <CardDescription className={isDark ? 'text-gray-400' : ''}>{t('booking.selectServiceDesc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {departments.map((dept) => (
                    <button key={dept.value} onClick={() => { setSelectedDepartment(dept.value); setSelectedDoctor(''); }} className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${selectedDepartment === dept.value ? `border-primary ${isDark ? 'bg-primary/20' : 'bg-primary/5'} shadow-md` : `border-${isDark ? 'slate-600' : 'gray-200'} ${isDark ? 'hover:border-slate-500 bg-slate-600' : 'hover:border-gray-300'} hover:shadow-sm`}`}>
                      <div className="text-2xl mb-2">{dept.icon}</div>
                      <p className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>{dept.label}</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {selectedDepartment && (
              <Card className={`border-0 shadow-lg animate-slideInRight ${isDark ? 'bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 border border-slate-600/30' : 'bg-white border border-gray-200'}`}>
                <CardHeader>
                  <CardTitle className={`flex items-center space-x-2 ${isDark ? 'text-white' : ''}`}>
                    <User className="w-5 h-5 text-primary" />
                    <span>{t('booking.selectDoctor')}</span>
                  </CardTitle>
                  <CardDescription className={isDark ? 'text-gray-400' : ''}>{t('booking.selectDoctorDesc')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                    <SelectTrigger className={`${isDark ? 'bg-slate-600 text-white border-slate-500' : 'bg-input-background border-gray-200'}`}>
                      <SelectValue placeholder={t('booking.selectDoctor')} />
                    </SelectTrigger>
                    <SelectContent className={isDark ? 'bg-slate-700' : ''}>
                      {doctors[selectedDepartment]?.map((doctor) => (
                        <SelectItem key={doctor.value} value={doctor.value} className={isDark ? 'text-white' : ''}>{doctor.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            )}

            {selectedDepartment && selectedDoctor && (
              <Card className={`border-0 shadow-lg animate-slideInRight ${isDark ? 'bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 border border-slate-600/30' : 'bg-white border border-gray-200'}`}>
                <CardHeader>
                  <CardTitle className={`flex items-center space-x-2 ${isDark ? 'text-white' : ''}`}>
                    <CalendarIcon className="w-5 h-5 text-primary" />
                    <span>{t('booking.dateTime')}</span>
                  </CardTitle>
                  <CardDescription className={isDark ? 'text-gray-400' : ''}>{t('booking.dateTimeDesc')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} disabled={(date) => date < new Date() || date < new Date('1900-01-01')} className={`rounded-xl border shadow-sm mx-auto ${isDark ? 'bg-slate-600 text-white' : ''}`} />
                </CardContent>
              </Card>
            )}

            {selectedDate && (
              <Card className={`border-0 shadow-lg ${isDark ? 'bg-slate-700' : ''}`}>
                <CardHeader>
                  <CardTitle className={`flex items-center space-x-2 ${isDark ? 'text-white' : ''}`}>
                    <Clock className="w-5 h-5 text-primary" />
                    <span>Choisir un horaire</span>
                  </CardTitle>
                  <CardDescription className={isDark ? 'text-gray-400' : ''}>Sélectionnez votre créneau horaire préféré</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                    {timeSlots.map((time) => (
                      <button key={time} onClick={() => setSelectedTime(time)} className={`p-3 rounded-xl border-2 transition-all duration-200 ${selectedTime === time ? `border-primary ${isDark ? 'bg-primary text-white' : 'bg-primary text-white'} shadow-md` : `border-${isDark ? 'slate-600' : 'gray-200'} ${isDark ? 'hover:border-slate-500 text-gray-200' : 'hover:border-gray-300'} hover:shadow-sm`}`}>
                        <p className="text-sm font-medium">{time}</p>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {selectedDate && (
              <Card className={`border-0 shadow-lg animate-slideInRight ${isDark ? 'bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 border border-slate-600/30' : 'bg-white border border-gray-200'}`}>
                <CardHeader>
                  <CardTitle className={isDark ? 'text-white' : ''}>Détails médicaux</CardTitle>
                  <CardDescription className={isDark ? 'text-gray-400' : ''}>Décrivez votre situation médicale</CardDescription>
                </CardHeader>
                <CardContent>
                  <MedicalDetails condition={medicalCondition} description={medicalDescription} onConditionChange={setMedicalCondition} onDescriptionChange={setMedicalDescription} />
                </CardContent>
              </Card>
            )}
          </div>

          <div>
            <Card className={`border-0 shadow-lg sticky top-8 ${isDark ? 'bg-slate-700' : ''}`}>
              <CardHeader>
                <CardTitle className={isDark ? 'text-white' : ''}>Récapitulatif</CardTitle>
                <CardDescription className={isDark ? 'text-gray-400' : ''}>Vérifiez les détails de votre rendez-vous</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedDepartment ? (
                  <div className={`p-3 rounded-xl ${isDark ? 'bg-slate-600' : 'bg-gray-50'}`}>
                    <Label className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Service</Label>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{departments.find(d => d.value === selectedDepartment)?.label}</p>
                  </div>
                ) : (
                  <div className={`p-3 rounded-xl text-center text-sm ${isDark ? 'bg-slate-600 text-gray-400' : 'bg-gray-50 text-gray-500'}`}>Aucun service sélectionné</div>
                )}

                {selectedDoctor ? (
                  <div className={`p-3 rounded-xl ${isDark ? 'bg-slate-600' : 'bg-gray-50'}`}>
                    <Label className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Médecin</Label>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{doctors[selectedDepartment]?.find(d => d.value === selectedDoctor)?.label}</p>
                  </div>
                ) : (
                  <div className={`p-3 rounded-xl text-center text-sm ${isDark ? 'bg-slate-600 text-gray-400' : 'bg-gray-50 text-gray-500'}`}>Aucun médecin sélectionné</div>
                )}

                {selectedDate ? (
                  <div className={`p-3 rounded-xl ${isDark ? 'bg-slate-600' : 'bg-gray-50'}`}>
                    <Label className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Date</Label>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{format(selectedDate, 'd MMMM yyyy', { locale: fr })}</p>
                  </div>
                ) : (
                  <div className={`p-3 rounded-xl text-center text-sm ${isDark ? 'bg-slate-600 text-gray-400' : 'bg-gray-50 text-gray-500'}`}>Aucune date sélectionnée</div>
                )}

                {selectedTime ? (
                  <div className={`p-3 rounded-xl ${isDark ? 'bg-slate-600' : 'bg-gray-50'}`}>
                    <Label className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Heure</Label>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedTime}</p>
                  </div>
                ) : (
                  <div className={`p-3 rounded-xl text-center text-sm ${isDark ? 'bg-slate-600 text-gray-400' : 'bg-gray-50 text-gray-500'}`}>Aucun horaire sélectionné</div>
                )}

                <Button onClick={handleConfirmAppointment} disabled={!isFormComplete} className={`w-full text-white shadow-md ${isFormComplete ? 'bg-secondary hover:bg-secondary/90' : `${isDark ? 'bg-slate-600 cursor-not-allowed' : 'bg-gray-300 cursor-not-allowed'}`}`}>
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Confirmer le rendez-vous
                </Button>

                {!isFormComplete && (
                  <p className={`text-xs text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Complétez tous les champs pour confirmer</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
