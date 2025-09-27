# GitHub Actions CI/CD Setup

Ce projet utilise GitHub Actions pour automatiser le build, les tests et le déploiement.

## Workflows disponibles

### 1. Build Workflow (`.github/workflows/build.yml`)

**Déclenchement :**
- Push sur les branches `main` ou `develop`
- Pull requests vers `main`

**Actions :**
- Installation des dépendances avec cache npm
- Linting du code SCSS/CSS
- Exécution des tests
- Build du projet
- Upload des artefacts de build

**Matrices de test :**
- Node.js 18.x
- Node.js 20.x

### 2. Release Workflow (`.github/workflows/release.yml`)

**Déclenchement :**
- Push de tags commençant par `v*` (ex: `v1.0.0`)

**Actions :**
- Installation des dépendances
- Exécution des tests
- Build du projet
- Création automatique d'une release GitHub
- Upload du fichier CSS comme asset de release

### 3. GitHub Pages Deployment

**Déclenchement :**
- Push sur la branche `main`

**Actions :**
- Build du projet
- Déploiement automatique sur GitHub Pages
- Publication sur la branche `gh-pages`

## Scripts npm disponibles

```bash
# Pipeline CI complet (lint + test + build)
npm run ci

# Tests uniquement
npm run test
npm run test:run
npm run test:ui

# Linting
npm run lint
npm run lint:fix

# Build
npm run build
npm run clean
npm run preview

# Développement
npm run dev
```

## Configuration

### Stylelint (`.stylelintrc.json`)
Configuration permissive pour permettre le build avec les composants web personnalisés.

### Vite (`vite.config.js`)
Configuration optimisée pour la production avec :
- Minification Terser
- Génération de sourcemaps
- Build de bibliothèque CSS

## Déploiement

### GitHub Pages
1. Activez GitHub Pages dans les paramètres du repository
2. Sélectionnez "GitHub Actions" comme source
3. Le déploiement se fait automatiquement sur chaque push vers `main`

### Releases
1. Créez un tag : `git tag v1.0.0`
2. Poussez le tag : `git push origin v1.0.0`
3. La release sera créée automatiquement avec le fichier CSS

## Monitoring

- Consultez l'onglet "Actions" sur GitHub pour voir l'état des workflows
- Les artefacts de build sont disponibles pendant 30 jours
- Les logs détaillés sont disponibles pour chaque exécution

## Dépannage

### Build échoue
1. Vérifiez les logs dans GitHub Actions
2. Testez localement avec `npm run ci`
3. Vérifiez les erreurs de linting avec `npm run lint`

### Déploiement échoue
1. Vérifiez que GitHub Pages est activé
2. Consultez les logs du workflow de déploiement
3. Vérifiez les permissions du repository
