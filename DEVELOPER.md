# Documentation Développeur - TEK-RESEAU

Bienvenue sur la plateforme de gestion de TEK-RESEAU, l'association spécialisée dans les technos réseaux d'Epitech Bénin.

## Architecture du Projet
Le projet est structuré en deux parties principales :
- **Frontend** (`/Tek-reseau`) : Application React avec Vite et Lucide Icons.
- **Backend** (`/backend`) : API NestJS utilisant Prisma ORM et PostgreSQL.

## Prérequis
- Node.js (v20+)
- PostgreSQL (v15+)
- npm ou pnpm

## Installation

### Backend
1. Naviguez dans le dossier `backend`.
2. Installez les dépendances : `npm install`.
3. Configurez votre fichier `.env` avec l'URL de votre base de données :
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/tekreseau?schema=public"
   JWT_SECRET="votre_secret_super_securise"
   ```
4. Générez le client Prisma : `npx prisma generate`.
5. Poussez le schéma vers la base de données : `npx prisma db push`.
6. Lancez le serveur : `npm run start:dev`.

### Frontend
1. Naviguez dans le dossier `Tek-reseau`.
2. Installez les dépendances : `npm install`.
3. Lancez l'application : `npm run dev`.

## Fonctionnalités Principales
- **Authentification** : Accès réservé aux membres du bureau.
- **Gestion des Membres** : CRUD complet et import massif (liste association).
- **Activités & Présences** : Création de séances et pointage des présences (Présent / Absent).

## CI/CD (Automation)
Le projet utilise **GitHub Actions**. Voir `.github/workflows/main.yml` pour les détails de l'automatisation des tests et builds lors de chaque push sur la branche `main`.

---
© 2025-2026 - TEK-RESEAU
