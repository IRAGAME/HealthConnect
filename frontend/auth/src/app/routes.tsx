import { createBrowserRouter } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginScreen />,
  },
]);
