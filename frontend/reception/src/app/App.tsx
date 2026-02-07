import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import DashboardScreen from './screens/DashboardScreen';
import AppointmentsScreen from './screens/AppointmentsScreen';
import ConsultationRoomsScreen from './screens/ConsultationRoomsScreen';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardScreen />} />
          <Route path="/appointments" element={<AppointmentsScreen />} />
          <Route path="/consultation-rooms" element={<ConsultationRoomsScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
