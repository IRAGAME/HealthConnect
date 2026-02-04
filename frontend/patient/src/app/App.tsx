import { RouterProvider } from 'react-router';
import { router } from '@/app/routes';
import { ThemeProvider } from '@/app/contexts/ThemeContext';
import { LanguageProvider } from '@/app/contexts/LanguageContext';
import { NotificationProvider } from '@/app/contexts/NotificationContext';
import { NotificationReminder } from '@/app/components/NotificationReminder';

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <NotificationProvider>
          <NotificationReminder />
          <RouterProvider router={router} />
        </NotificationProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
