# Guide de Test et Déploiement - TEK-RESEAU

Ce document explique comment tester la plateforme TEK-RESEAU de bout en bout et comment la déployer en production.

---

## 🧪 Guide de Test (E2E)

### 1. Préparation du Backend
Avant de tester, assurez-vous que la base de données est prête :
- Dans `/backend`, lancez `npx prisma db push` pour créer les tables.
- Créez un compte administrateur initial pour le bureau via Postman ou cURL :
  ```bash
  curl -X POST http://localhost:3000/auth/register-admin \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@tekreseau.com", "password": "votre_mot_de_passe", "name": "Admin Tek-Reseau"}'
  ```

### 2. Parcours de Test Utilisateur (Bureau)
1. **Connexion** : Allez sur `/login` et connectez-vous avec les identifiants créés.
2. **Gestion des Membres** :
   - Onglet "Membres" : Ajoutez un membre manuellement.
   - Importation : Copiez-collez une liste de noms ou importez un PDF de test. Vérifiez que la liste se met à jour.
   - Recherche : Tapez un nom dans la barre de recherche pour vérifier le filtrage.
3. **Gestion des Activités** :
   - Onglet "Activités" : Créez une nouvelle séance (ex: "Lab Routage SSH").
   - Vérifiez que la carte d'activité s'affiche avec la date et l'heure.
4. **Pointage (Présence)** :
   - Cliquez sur "Faire le Pointage" sur une activité.
   - Marquez des membres comme "Présent" ou "Absent".
   - Revenez sur l'onglet "Activités" pour voir le compteur de présents se mettre à jour.

---

## 🚀 Guide de Déploiement

### 1. Base de données (Neon.tech)
1. Créez un projet sur **Neon Database**.
2. Copiez la `Connection String` (PostgreSQL).
3. Elle sera utilisée comme `DATABASE_URL`.

### 2. Backend (Railway ou Render)
#### Sur Railway :
1. Connectez votre repo GitHub.
2. Ajoutez les variables d'environnement :
   - `DATABASE_URL` (depuis Neon)
   - `JWT_SECRET` (une chaîne aléatoire longue)
   - `PORT` : 3000
3. Commande de démarrage : `npm run start:prod`.
4. Ajoutez une étape de build : `npx prisma generate && npm run build`.

#### Sur Render :
1. Créez un "Web Service".
2. Liez le repo et définissez le `Root Directory` à `backend`.
3. Build command : `npm install && npx prisma generate && npm run build`.
4. Start command : `npm run start:prod`.

### 3. Frontend (Vercel)
1. Créez un projet sur **Vercel**.
2. Liez le repo et définissez le `Root Directory` à `Tek-reseau`.
3. Framework Preset : `Vite`.
4. **Important** : Le fichier `vercel.json` est déjà présent pour gérer les redirections (rewrites).
5. (Optionnel) Si vous changez l'URL du backend, mettez à jour l'URL de base dans `AdminPage.jsx` et `Login.jsx` via une variable d'environnement `VITE_API_URL`.

---

## 📋 Variables d'Environnement Récapitulatives

| Variable | Description | Exemple |
| :--- | :--- | :--- |
| `DATABASE_URL` | URL PostgreSQL (Neon) | `postgresql://user:pw@host/db` |
| `JWT_SECRET` | Clé pour signer les tokens | `super-secret-key-2025` |
| `PORT` | Port d'écoute du backend | `3000` |
| `VITE_API_URL` | URL du backend pour le front | `https://api-tekreseau.up.railway.app` |

---
© 2025-2026 - Bureau TEK-RESEAU
