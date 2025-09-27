# Configuration GitHub Pages

## Problème résolu : Permissions GitHub Actions

L'erreur `Permission to tivins/design.git denied to github-actions[bot]` a été corrigée en utilisant les nouvelles actions officielles de GitHub Pages.

## Configuration requise

### 1. Activer GitHub Pages

1. Allez dans **Settings** de votre repository
2. Scrollez vers **Pages** dans le menu de gauche
3. Sous **Source**, sélectionnez **GitHub Actions**

### 2. Permissions du repository

Les permissions suivantes sont automatiquement accordées :
- `contents: read` - Lecture du code
- `pages: write` - Écriture sur GitHub Pages
- `id-token: write` - Authentification sécurisée

## Workflows configurés

### Build Workflow (`.github/workflows/build.yml`)
- Tests et build sur push/PR
- Upload des artefacts
- **Ne gère plus le déploiement**

### Deploy Workflow (`.github/workflows/deploy.yml`)
- Déploiement automatique sur push vers `main`
- Utilise les actions officielles GitHub Pages
- Gestion des environnements et permissions

## Actions utilisées

- `actions/configure-pages@v4` - Configuration Pages
- `actions/upload-pages-artifact@v3` - Upload des fichiers
- `actions/deploy-pages@v4` - Déploiement final

## Avantages de cette approche

✅ **Sécurité** : Utilise les tokens officiels GitHub  
✅ **Fiabilité** : Actions maintenues par GitHub  
✅ **Simplicité** : Configuration automatique des permissions  
✅ **Performance** : Déploiement optimisé  

## Test du déploiement

1. Poussez vers `main` : `git push origin main`
2. Consultez l'onglet **Actions** pour voir le déploiement
3. Vérifiez l'URL GitHub Pages dans les settings

## Dépannage

### Erreur de permissions
- Vérifiez que GitHub Pages est activé avec "GitHub Actions"
- Assurez-vous que le workflow utilise les bonnes actions

### Déploiement échoue
- Consultez les logs dans l'onglet Actions
- Vérifiez que le build s'est bien passé
- Assurez-vous que les fichiers sont dans le bon répertoire

### Site non accessible
- Attendez quelques minutes pour la propagation DNS
- Vérifiez l'URL dans Settings > Pages
- Consultez les logs de déploiement
