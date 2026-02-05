# Admin Dashboard - HealthConnect

Interface d'administration pour HealthConnect avec gestion des utilisateurs, rendez-vous et notifications.

## 🚀 Fonctionnalités

### Tableau de Bord (Dashboard)
- Statistiques en temps réel (utilisateurs, rendez-vous, etc.)
- Graphiques avec tendances mensuelles
- Accès rapide aux principales fonctionnalités

### Gestion des Utilisateurs
- Voir la liste complète des utilisateurs
- Filtrer par rôle (Patient, Médecin, Admin)
- Modifier/Supprimer les utilisateurs
- Voir le statut (Actif, Inactif, Suspendu)

### Supervision des Rendez-vous
- Valider les rendez-vous en attente
- Rejeter les rendez-vous
- Voir l'historique complet
- Modifier la disponibilité

### Gestion des Notifications
- Envoyer des SMS et WhatsApp
- Programmer les notifications
- Tracker le statut d'envoi
- Historique complet

## 🛠️ Technologies

- React 18
- TypeScript
- Tailwind CSS
- Recharts (graphiques)
- React Router
- Vite

## 📦 Installation

```bash
cd frontend/admin
npm install
npm run dev
```

Le dashboard sera accessible sur http://localhost:5174

## 📝 Contextes

### ThemeContext
Gère le mode sombre/clair

### LanguageContext
Support multilingue (FR, EN, KI)

### AdminContext
Gestion des utilisateurs et rendez-vous

### NotificationContext
Gestion des notifications SMS/WhatsApp

## 🌐 Langues Supportées

- Français (FR)
- English (EN)
- Kirundi (KI)
