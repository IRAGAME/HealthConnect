import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import LandingScreen from './screens/LandingScreen';
import PatientAuthScreen from './screens/PatientAuthScreen';
import HospitalSelectionScreen from './screens/HospitalSelectionScreen';
import ProfessionalLoginScreen from './screens/ProfessionalLoginScreen';
import HospitalListScreen from './screens/HospitalListScreen';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingScreen />} />
          <Route path="/patient-auth" element={<PatientAuthScreen />} />
          <Route path="/hospital-selection" element={<HospitalSelectionScreen />} />
          <Route path="/professional-login/:hospitalId" element={<ProfessionalLoginScreen />} />
          <Route path="/hospital-list" element={<HospitalListScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
