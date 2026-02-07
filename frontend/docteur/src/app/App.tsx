import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import DashboardScreen from './screens/DashboardScreen';
import AppointmentsScreen from './screens/AppointmentsScreen';
import PatientsScreen from './screens/PatientsScreen';
import NotificationsScreen from './screens/NotificationsScreen';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardScreen />} />
          <Route path="/appointments" element={<AppointmentsScreen />} />
          <Route path="/patients" element={<PatientsScreen />} />
          <Route path="/patients/:patientId" element={<PatientsScreen />} />
          <Route path="/notifications" element={<NotificationsScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
