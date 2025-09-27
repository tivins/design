# Dépannage GitHub Pages - Erreur "Get Pages site failed"

## Problème
```
Error: Get Pages site failed. Please verify that the repository has Pages enabled and configured to build using GitHub Actions
Error: HttpError: Not Found
```

## Solutions Disponibles

### Option 1 : Activation Manuelle (Recommandée)

1. **Aller dans Settings du repository**
2. **Section Pages** (menu de gauche)
3. **Source** : Sélectionner **"GitHub Actions"**
4. **Sauvegarder**

### Option 2 : Workflow Simple (Backup)

J'ai créé un workflow alternatif qui fonctionne sans activation préalable :

**Fichier** : `.github/workflows/deploy-simple.yml`
- Utilise `peaceiris/actions-gh-pages@v4` (version mise à jour)
- Crée automatiquement la branche `gh-pages`
- Fonctionne même si GitHub Pages n'est pas activé

### Option 3 : Workflow Robuste (Avancé)

**Fichier** : `.github/workflows/deploy-robust.yml`
- Utilise les actions officielles GitHub
- Paramètre `enablement: true` pour activation automatique
- Configuration `static_site_generator: "other"`

## Instructions de Test

### Test 1 : Workflow Simple
```bash
# Renommer les fichiers pour activer le workflow simple
mv .github/workflows/deploy.yml .github/workflows/deploy-official.yml
mv .github/workflows/deploy-simple.yml .github/workflows/deploy.yml

# Pousser les changements
git add .
git commit -m "Switch to simple deployment workflow"
git push origin main
```

### Test 2 : Activation Manuelle + Workflow Officiel
1. Activer GitHub Pages manuellement (Option 1)
2. Utiliser le workflow officiel :
```bash
mv .github/workflows/deploy-simple.yml .github/workflows/deploy-backup.yml
mv .github/workflows/deploy-official.yml .github/workflows/deploy.yml
```

## Workflows Disponibles

| Fichier | Description | Avantages |
|---------|-------------|-----------|
| `deploy.yml` | Workflow principal | Actions officielles, sécurisé |
| `deploy-simple.yml` | Workflow de backup | Fonctionne sans activation |
| `deploy-robust.yml` | Workflow avancé | Activation automatique |

## Vérification du Déploiement

1. **Consulter l'onglet Actions** sur GitHub
2. **Vérifier les logs** du workflow de déploiement
3. **Tester l'URL** : `https://tivins.github.io/design/`
4. **Vérifier Settings > Pages** pour l'URL finale

## Dépannage Avancé

### Si le workflow simple échoue aussi
- Vérifier les permissions du repository
- S'assurer que le token GitHub a les bonnes permissions
- Consulter les logs détaillés dans Actions

### Si GitHub Pages reste inaccessible
- Attendre 5-10 minutes pour la propagation DNS
- Vérifier l'URL exacte dans Settings > Pages
- Tester avec un navigateur en navigation privée
