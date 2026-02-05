import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { ArrowLeft, Calendar, Clock, User, MapPin, Phone, Plus } from 'lucide-react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { useTheme } from '@/app/contexts/ThemeContext';

interface Appointment {
  id: string;
  department: string;
  doctor: string;
  date: string;
  time: string;
  status: 'Confirmé' | 'En attente' | 'Terminé' | 'Annulé';
}

export default function AppointmentsScreen() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    // Load appointments from localStorage
    const stored = localStorage.getItem('appointments');
    const loadedAppointments = stored ? JSON.parse(stored) : [];
    
    // Add some demo appointments if none exist
    if (loadedAppointments.length === 0) {
      const demoAppointments: Appointment[] = [
        {
          id: '1',
          department: 'Cardiologie',
          doctor: 'Dr. Sarah Leblanc',
          date: '5 fév 2026',
          time: '10:00',
          status: 'Confirmé',
        },
        {
          id: '2',
          department: 'Médecine Générale',
          doctor: 'Dr. Michel Dupuis',
          date: '8 fév 2026',
          time: '14:30',
          status: 'Confirmé',
        },
        {
          id: '3',
          department: 'Dermatologie',
          doctor: 'Dr. Lisa Moreau',
          date: '28 jan 2026',
          time: '11:00',
          status: 'Terminé',
        },
        {
          id: '4',
          department: 'Pédiatrie',
          doctor: 'Dr. Émilie Dubois',
          date: '15 jan 2026',
          time: '09:30',
          status: 'Terminé',
        },
      ];
      setAppointments(demoAppointments);
      localStorage.setItem('appointments', JSON.stringify(demoAppointments));
    } else {
      setAppointments(loadedAppointments);
    }
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmé':
        return 'bg-secondary text-white';
      case 'En attente':
        return 'bg-amber-500 text-white';
      case 'Terminé':
        return 'bg-gray-500 text-white';
      case 'Annulé':
        return 'bg-destructive text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const upcomingAppointments = appointments.filter(
    (apt) => apt.status === 'Confirmé' || apt.status === 'En attente'
  );

  const pastAppointments = appointments.filter(
    (apt) => apt.status === 'Terminé' || apt.status === 'Annulé'
  );

  const AppointmentCard = ({ appointment }: { appointment: Appointment }) => (
    <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-semibold text-gray-900">{appointment.doctor}</h3>
                  <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                </div>
                <p className="text-sm text-gray-600 flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {appointment.department}
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center text-gray-700">
                <Calendar className="w-4 h-4 mr-2 text-primary" />
                <span>{appointment.date}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Clock className="w-4 h-4 mr-2 text-primary" />
                <span>{appointment.time}</span>
              </div>
            </div>
          </div>

          {appointment.status === 'Confirmé' && (
            <div className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-white">
                Modifier
              </Button>
              <Button variant="outline" size="sm" className="border-destructive text-destructive hover:bg-destructive hover:text-white">
                Annuler
              </Button>
            </div>
          )}
        </div>

        {appointment.status === 'Confirmé' && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Besoin d'aide ?</span>
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                <Phone className="w-4 h-4 mr-1" />
                Contacter la clinique
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-emerald-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{t('nav.appointments')}</h1>
                <p className="text-sm text-gray-600">{t('action.myAppointments.desc')}</p>
              </div>
            </div>
            
            <Button
              onClick={() => navigate('/book-appointment')}
              className="bg-primary hover:bg-primary/90 text-white shadow-md"
            >
              <Plus className="w-5 h-5 mr-2" />
              {t('appointments.book')}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="upcoming">
              À venir ({upcomingAppointments.length})
            </TabsTrigger>
            <TabsTrigger value="past">
              Passés ({pastAppointments.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))
            ) : (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-12 text-center">
                  <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Aucun rendez-vous à venir
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Vous n'avez aucun rendez-vous programmé pour le moment.
                  </p>
                  <Button
                    onClick={() => navigate('/book-appointment')}
                    className="bg-primary hover:bg-primary/90 text-white"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Prendre un rendez-vous
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {pastAppointments.length > 0 ? (
              pastAppointments.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))
            ) : (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-12 text-center">
                  <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Aucun rendez-vous passé
                  </h3>
                  <p className="text-gray-600">
                    Votre historique de rendez-vous apparaîtra ici.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}