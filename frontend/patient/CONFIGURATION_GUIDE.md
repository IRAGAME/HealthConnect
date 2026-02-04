# 🔧 Guide de Configuration - MédiSoins

## Configuration du Dark Mode

Le dark mode est implémenté via le contexte `ThemeContext.tsx` et utilise les classes Tailwind CSS.

### Fonctionnement

1. **Détection du thème système** (au chargement)
   ```typescript
   const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
   ```

2. **Application de la classe `dark`** au HTML
   ```typescript
   if (isDark) {
     html.classList.add('dark');
   } else {
     html.classList.remove('dark');
   }
   ```

3. **Utilisation dans JSX**
   ```tsx
   className={isDark ? 'dark bg-slate-900' : 'bg-white'}
   // Ou avec les classes Tailwind
   className="dark:bg-slate-900 bg-white"
   ```

### Classes Tailwind CSS Utilisées

```css
/* Light Mode (défaut) */
bg-white
text-gray-900
border-gray-200

/* Dark Mode (avec préfixe 'dark:') */
dark:bg-slate-800
dark:text-white
dark:border-slate-700
```

## Configuration du Multilingue (i18n)

### Structure des Traductions

```typescript
const translations: Record<Language, Record<string, string>> = {
  fr: { /* traductions françaises */ },
  en: { /* traductions anglaises */ },
  ki: { /* traductions Kirundi */ },
};
```

### Utilisation

```tsx
const { t, language, setLanguage } = useLanguage();

// Traduction simple
<h1>{t('app.title')}</h1>

// Traduction avec paramètres
<p>{t('appointment.reminder', { day: 'tomorrow' })}</p>

// Changement de langue
setLanguage('en');
```

### Ajouter une Nouvelle Traduction

1. Ouvrir `src/app/contexts/LanguageContext.tsx`
2. Ajouter la clé et les traductions :
   ```typescript
   const translations: Record<Language, Record<string, string>> = {
     fr: {
       'new.key': 'Texte en français',
       ...
     },
     en: {
       'new.key': 'Text in English',
       ...
     },
     ki: {
       'new.key': 'Ijambo mu Kirundi',
       ...
     },
   };
   ```
3. Utiliser avec `t('new.key')`

## Configuration des Contextes

### ThemeContext
- **Fichier:** `src/app/contexts/ThemeContext.tsx`
- **Exports:** `ThemeProvider`, `useTheme`
- **État:** `isDark: boolean`
- **Actions:** `toggleTheme(): void`
- **Persistance:** localStorage `theme`

### LanguageContext
- **Fichier:** `src/app/contexts/LanguageContext.tsx`
- **Exports:** `LanguageProvider`, `useLanguage`
- **État:** `language: Language` (fr|en|ki)
- **Actions:** `setLanguage(lang: Language)`, `t(key, params)`
- **Persistance:** localStorage `language`

### NotificationContext
- **Fichier:** `src/app/contexts/NotificationContext.tsx`
- **Exports:** `NotificationProvider`, `useNotification`
- **État:** `appointments: Appointment[]`
- **Actions:** 
  - `addAppointment(appointment)`
  - `removeAppointment(id)`
  - `getUpcomingAppointments()`
  - `checkNotifications()`
- **Persistance:** localStorage `appointments`

## Configuration des Routes

### Routes Disponibles

```typescript
// src/app/routes.ts
export const router = createBrowserRouter([
  { path: '/', Component: AuthScreen },
  { path: '/dashboard', Component: DashboardScreen },
  { path: '/book-appointment', Component: BookAppointmentScreen },
  { path: '/appointments', Component: AppointmentsScreen },
  { path: '/notifications', Component: NotificationsScreen },
  { path: '/emergency', Component: EmergencyScreen },
  { path: '/search-hospital', Component: SearchHospitalScreen },
]);
```

## Configuration des Notifications

### Vérification Automatique

```typescript
// Dans NotificationReminder.tsx
useEffect(() => {
  const timer = setInterval(() => {
    const upcoming = checkNotifications();
    if (upcoming.length > 0) {
      // Afficher notification
      setNotifications(upcoming);
      setVisible(true);
      
      // Auto-masquer après 5 secondes
      setTimeout(() => setVisible(false), 5000);
    }
  }, 60000); // Vérifier toutes les minutes
}, []);
```

### Format des Rendez-vous

```typescript
interface Appointment {
  id: string;
  title: string;
  date: string;           // Format: "5 fév 2026"
  time: string;           // Format: "10:00"
  doctor?: string;
  department?: string;
  notificationSent?: boolean;
  medicalCondition?: string;
  medicalDescription?: string;
}
```

## Configuration des Couleurs

### Palette de Couleurs Utilisée

```
Primary: #0891b2 (cyan-600)
Secondary: #059669 (emerald-600)
Destructive: #dc2626 (red-600)

Light Mode:
  Background: #ffffff
  Surface: #f3f4f6
  Text: #111827

Dark Mode:
  Background: #0f172a (slate-900)
  Surface: #1e293b (slate-800)
  Text: #f1f5f9
```

## Configuration du Build

### Vite
- **Config:** `vite.config.ts`
- **Development:** `npm run dev`
- **Build:** `npm run build`

### Tailwind CSS
- **Version:** 4.1.12
- **Mode:** JIT (compilé à la demande)
- **Source:** `src/**/*.{js,ts,jsx,tsx}`

## Variables d'Environnement

Aucune variable d'environnement requise pour le fonctionnement actuel.

Pour production :
```
VITE_API_URL=https://api.medisoins.com
VITE_APP_NAME=MédiSoins
```

## Scripts NPM

```json
{
  "dev": "vite",
  "build": "vite build"
}
```

## Optimisations Appliquées

### Performance
- ✅ useCallback pour les fonctions de contexte
- ✅ Dépendances optimisées dans useEffect
- ✅ Code splitting automatique avec Vite
- ✅ CSS criticaux en ligne

### Accessibilité
- ✅ Labels sur tous les formulaires
- ✅ Support du contraste élevé
- ✅ Navigation au clavier complète
- ✅ ARIA labels appropriés

### SEO
- ✅ Titres HTML structurés
- ✅ Descriptions pour les pages
- ✅ Meta tags (si nécessaire)

## Déploiement

### Sur Vercel
```bash
npm run build
# Vercel déploie automatiquement le dossier dist/
```

### Sur Netlify
```bash
npm run build
# Publier le dossier dist/
```

### Sur serveur personnalisé
```bash
npm run build
cp -r dist/* /var/www/medisoins/
```

## Dépannage

### Le dark mode ne persiste pas
- Vérifier localStorage : `localStorage.getItem('theme')`
- Vérifier la classe `dark` sur `<html>`

### Les traductions ne s'affichent pas
- Vérifier la clé dans LanguageContext
- Vérifier le langage courant : `localStorage.getItem('language')`

### Les notifications ne s'affichent pas
- Vérifier format date : "d MMM yyyy"
- Vérifier localStorage `appointments`
- Vérifier la console pour les erreurs

---

## Contact & Support

Pour les questions de configuration, consulter :
- README_FEATURES.md - Vue d'ensemble des fonctionnalités
- IMPLEMENTATION_GUIDE.md - Guide technique détaillé
- Code source avec commentaires inline
