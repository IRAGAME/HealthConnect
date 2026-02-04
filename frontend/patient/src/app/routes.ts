import { createBrowserRouter } from 'react-router';
import AuthScreen from '@/app/screens/AuthScreen';
import DashboardScreen from '@/app/screens/DashboardScreen';
import BookAppointmentScreen from '@/app/screens/BookAppointmentScreen';
import AppointmentsScreen from '@/app/screens/AppointmentsScreen';
import NotificationsScreen from '@/app/screens/NotificationsScreen';
import EmergencyScreen from '@/app/screens/EmergencyScreen';
import SearchHospitalScreen from '@/app/screens/SearchHospitalScreen';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: AuthScreen,
  },
  {
    path: '/dashboard',
    Component: DashboardScreen,
  },
  {
    path: '/book-appointment',
    Component: BookAppointmentScreen,
  },
  {
    path: '/appointments',
    Component: AppointmentsScreen,
  },
  {
    path: '/notifications',
    Component: NotificationsScreen,
  },
  {
    path: '/emergency',
    Component: EmergencyScreen,
  },
  {
    path: '/search-hospital',
    Component: SearchHospitalScreen,
  },
]);
