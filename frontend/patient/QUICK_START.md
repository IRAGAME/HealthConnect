# 🚀 GUIDE DE DÉMARRAGE - MédiSoins

## Installation et Configuration

### Prérequis
- Node.js 18.3.1+
- npm ou pnpm
- Git

### 1. Installation des Dépendances

```bash
cd e:\frontend
npm install
# ou
pnpm install
```

### 2. Lancer le Serveur de Développement

```bash
npm run dev
# ou
pnpm dev
```

L'application ouvrira automatiquement à :
```
http://localhost:5173
```

### 3. Build pour Production

```bash
npm run build
# ou
pnpm build
```

Dossier de sortie : `dist/`

---

## 🎯 Première Utilisation

### Accès Initial
1. L'application démarre sur la page d'authentification
2. Aucune authentification réelle requise en démo
3. Entrez un nom patient et cliquez sur continuer

### Explorez les Fonctionnalités

#### 1. Testez le Mode Sombre/Clair
- Cliquez sur l'icône **Lune/Soleil** en haut à droite
- Observez le changement de thème immédiat
- Actualisez la page - le thème persiste ✅

#### 2. Changez de Langue
- Cliquez sur l'icône **Globe** en haut à droite
- Sélectionnez une langue :
  - 🇫🇷 Français
  - 🇬🇧 English
  - 🇧🇮 Kirundi
- L'interface change immédiatement ✅

#### 3. Consultez les Urgences
- Depuis le tableau de bord, cliquez sur **"Page des Urgences"**
- Découvrez les 4 niveaux de priorité :
  - **Priorité 1 (Appel)** - Urgences vitales
  - **Priorité 2 (Message)** - Urgences sérieuses
  - **Priorité 3 (Bip)** - Urgences intermédiaires
  - **Priorité 4 (Alerte)** - Surveillance renforcée

#### 4. Recherchez un Service Médical
- Depuis le tableau de bord, cliquez sur **"Rechercher un Service"**
- Filtrez par type de service
- Consultez les résultats avec localisation et disponibilité
- Appelez directement depuis l'app

#### 5. Réservez un Rendez-vous
- Cliquez sur **"Prendre Rendez-vous"**
- Sélectionnez : Service → Médecin → Date → Horaire
- **Nouveau :** Remplissez les **"Autres Détails"** :
  - État de santé
  - Description précise de la maladie
- Confirmez la réservation

#### 6. Consultez les Notifications
- Cliquez sur **"Notifications"**
- Consultez les alertes et confirmations
- Toutes les 24 heures avant un rendez-vous, vous recevrez une notification

---

## 📊 Structure des Données

### localStorage Structure

```javascript
// Thème actuellement sauvegardé
localStorage.getItem('theme')  // 'light' ou 'dark'

// Langue actuelle
localStorage.getItem('language')  // 'fr', 'en', ou 'ki'

// Liste des rendez-vous
JSON.parse(localStorage.getItem('appointments'))
// [
//   {
//     id: "1707000000000",
//     department: "Cardiologie",
//     doctor: "Dr. Sarah Leblanc",
//     date: "5 fév 2026",
//     time: "10:00",
//     status: "Confirmé",
//     medicalCondition: "Hypertension",
//     medicalDescription: "Suivi de la tension artérielle..."
//   }
// ]

// Dernière urgence consultée
JSON.parse(localStorage.getItem('lastEmergency'))
// {
//   level: 1,
//   name: "Appel (Urgence Vitale Immédiate)",
//   ...
// }
```

### Ajouter des Rendez-vous en Développement

```javascript
// Dans la console du navigateur (F12)
const appointments = [
  {
    id: Date.now().toString(),
    department: "Cardiologie",
    doctor: "Dr. Test",
    date: "5 fév 2026",
    time: "10:00",
    status: "Confirmé",
    medicalCondition: "Test",
    medicalDescription: "Description test"
  }
];
localStorage.setItem('appointments', JSON.stringify(appointments));
location.reload();
```

---

## 🔧 Configuration du Développement

### Extensions VS Code Recommandées

1. **ES7+ React/Redux/React-Native snippets**
   - ID: `dsznajder.es7-react-js-snippets`

2. **Tailwind CSS IntelliSense**
   - ID: `bradlc.vscode-tailwindcss`

3. **Prettier - Code formatter**
   - ID: `esbenp.prettier-vscode`

4. **ESLint**
   - ID: `dbaeumer.vscode-eslint`

### Settings VS Code (.vscode/settings.json)

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "tailwindCSS.experimental.classRegex": [
    ["clsx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

---

## 🐛 Dépannage

### Le dark mode ne fonctionne pas
```bash
# Vérifier la classe 'dark' sur le HTML
# Console (F12): document.documentElement.classList

# Vérifier localStorage
localStorage.getItem('theme')
```

### Les traductions ne s'affichent pas
```bash
# Vérifier le langage
localStorage.getItem('language')

# Vérifier la console pour les erreurs
# Recharger la page
```

### Les notifications ne s'affichent pas après 24h
```bash
# Ajouter un rendez-vous pour demain
# Les notifications s'affichent toutes les minutes
# Attendre ou modifier la date dans localStorage
```

### Erreur "Cannot find module"
```bash
# Réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install
```

---

## 📝 Fichiers de Documentation

| Fichier | Description |
|---------|------------|
| `README_FEATURES.md` | Vue d'ensemble des 8 fonctionnalités |
| `IMPLEMENTATION_GUIDE.md` | Guide technique détaillé |
| `CONFIGURATION_GUIDE.md` | Configuration thème, i18n, contextes |
| `INTEGRATION_SUMMARY.md` | Résumé d'intégration complet |
| `QUICK_START.md` | Ce fichier - Démarrage rapide |

---

## 🎨 Personnalisation

### Changer les Couleurs

1. **Fichier:** `src/app/screens/DashboardScreen.tsx` (et autres)
2. **Classes Tailwind utilisées:**
   - Primary: `bg-primary` (cyan-600)
   - Secondary: `bg-secondary` (emerald-600)
   - Destructive: `bg-destructive` (red-600)

3. **Pour changer, modifier dans chaque fichier:**
```tsx
// Avant
<div className="bg-primary">
// Après
<div className="bg-blue-600">
```

### Ajouter une Nouvelle Langue

1. Ouvrir `src/app/contexts/LanguageContext.tsx`
2. Ajouter la langue :
```typescript
export type Language = 'fr' | 'en' | 'ki' | 'es'; // Ajouter 'es'

const translations: Record<Language, Record<string, string>> = {
  // ... existantes
  es: {
    'app.title': 'MédiSoins',
    'app.subtitle': 'Portal de Pacientes ByteBuilders',
    // ... etc
  }
};
```
3. Ajouter au sélecteur dans `HeaderMenu.tsx`:
```tsx
{(['fr', 'en', 'ki', 'es'] as const).map((lang) => (
  // ...
))}
```

### Modifier les Urgences

1. **Fichier:** `src/app/screens/EmergencyScreen.tsx`
2. **Array `emergencies`:**
```typescript
const emergencies: EmergencyLevel[] = [
  {
    level: 1,
    name: t('emergency.call'),
    description: '... à modifier ...',
    examples: ['...', '...'],
    // ...
  }
];
```

---

## 🚀 Déploiement

### Sur Vercel (Recommandé)

```bash
# 1. Créer un compte Vercel
# 2. Connecter votre repo Git
# 3. Vercel détecte Vite automatiquement
# 4. Build command: npm run build
# 5. Output directory: dist
# 6. Deploy automatiquement
```

### Sur Netlify

```bash
# 1. Installer Netlify CLI
npm install -g netlify-cli

# 2. Build
npm run build

# 3. Deploy
netlify deploy --prod --dir=dist
```

### Sur serveur personnalisé

```bash
# 1. Build
npm run build

# 2. Copier dist/ sur le serveur
scp -r dist/* user@server.com:/var/www/medisoins/

# 3. Configurer nginx/apache
# Rediriger tout vers index.html pour React Router
```

---

## 📋 Checklist Production

- [ ] Build sans erreurs : `npm run build`
- [ ] Tests passent : pas de console errors
- [ ] Thème dark mode fonctionne
- [ ] Multilingue fonctionne (3 langues)
- [ ] Notifications s'affichent
- [ ] Rendez-vous se sauvegardent
- [ ] URLs correctes (dashboard, emergency, search-hospital)
- [ ] responsive sur mobile
- [ ] Performance acceptable (< 3s initial load)

---

## 🎯 Cas d'Usage Testés

### Scénario 1 : Utilisateur Français en Mode Sombre
1. ✅ App charge en français
2. ✅ Mode sombre appliqué
3. ✅ Thème persiste au refresh
4. ✅ Langue persiste au refresh

### Scénario 2 : Réserver un Rendez-vous
1. ✅ Sélectionner tous les champs
2. ✅ Ajouter détails médicaux
3. ✅ Confirmer rendez-vous
4. ✅ Consulter dans "Mes Rendez-vous"

### Scénario 3 : Vérifier Urgences Médicales
1. ✅ Accéder à la page des urgences
2. ✅ Voir 4 niveaux de priorité
3. ✅ Lire descriptions et exemples
4. ✅ Marquer comme consulté

### Scénario 4 : Rechercher Service Médical
1. ✅ Filtrer par type de service
2. ✅ Voir résultats avec distance
3. ✅ Appeler directement
4. ✅ Voir disponibilité

---

## 📞 Support

Pour des questions :
1. Consulter la documentation correspondante
2. Vérifier la console du navigateur (F12)
3. Vérifier localStorage
4. Recharger l'application (Ctrl+Shift+R)

---

## 🎉 Prêt ?

L'application est prête à être testée !

```bash
npm run dev
# Naviguez à http://localhost:5173
# Explorez toutes les fonctionnalités
# Testez sur mobile également
```

Amusez-vous ! 🚀
