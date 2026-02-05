import { Suspense } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from '@/app/Layout';
import DashboardScreen from '@/app/screens/DashboardScreen';
import UsersScreen from '@/app/screens/UsersScreen';
import AppointmentsScreen from '@/app/screens/AppointmentsScreen';
import NotificationsScreen from '@/app/screens/NotificationsScreen';
import AssignAppointmentsScreen from '@/app/screens/AssignAppointmentsScreen';
import EmergencyScreen from '@/app/screens/EmergencyScreen';
import StatisticsScreen from '@/app/screens/StatisticsScreen';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { path: '/', Component: DashboardScreen },
      { path: '/dashboard', Component: DashboardScreen },
      { path: '/users', Component: UsersScreen },
      { path: '/appointments', Component: AppointmentsScreen },
      { path: '/assign-appointments', Component: AssignAppointmentsScreen },
      { path: '/emergencies', Component: EmergencyScreen },
      { path: '/statistics', Component: StatisticsScreen },
      { path: '/notifications', Component: NotificationsScreen },
    ]
  }
]);

function App() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Chargement...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
