# Auth Frontend

Ce dossier contient l'application de connexion commune à tous les profils (admin, docteur, réception).

## Mise en place rapide

1. Ouvrez un terminal à l'intérieur de `frontend/auth`.
2. Initialisez un projet Vite React TypeScript si ce n'est pas déjà fait :  
   ```bash
   npm create vite@latest . -- --template react-ts
   ```
3. Copiez/collez le code fourni dans ce dossier (`src/app/*` et `index.html`).
4. Installez les dépendances communes (ou réutilisez celles des autres frontends) :  
   ```bash
   npm install react react-dom react-router-dom tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```
5. Ajoutez la configuration Tailwind (copiez `tailwind.config.ts` depuis un autre frontend et ajustez) et créez `src/index.css` avec les directives de base.
6. Lancez le serveur :  
   ```bash
   npm run dev
   ```

## Fonctionnalités

- Formulaire de connexion avec sélection du rôle (Administrateur, Docteur, Réceptionniste) utilisant les mêmes composants `Card`, `Input`, `Button`, etc. que les autres interfaces pour un style cohérent.
- Envoie des identifiants à l'API de back-end (`/api/auth/login`)
- Redirection automatique vers `/admin`, `/docteur` ou `/reception` selon le rôle
- Stockage du token et des informations d'utilisateur dans `localStorage`

Vous pouvez réutiliser les styles et composants `ui` des autres applications en copiant le dossier `src/app/components` si vous souhaitez garder la même apparence.
