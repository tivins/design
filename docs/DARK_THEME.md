# Thème Sombre - Design Toolkit

## Vue d'ensemble

Le Design Toolkit inclut un support complet du thème sombre avec détection automatique des préférences système, basculement manuel et persistance des choix utilisateur.

## Fonctionnalités

### 🌙 **Détection automatique**
- Respecte les préférences système (`prefers-color-scheme: dark`)
- Application automatique du thème approprié au chargement
- Mise à jour en temps réel lors des changements système

### 🔄 **Basculement manuel**
- Bouton de thème dans l'interface
- Animation fluide lors du changement
- Icônes dynamiques (🌙/☀️)

### 💾 **Persistance**
- Sauvegarde du choix dans `localStorage`
- Restauration automatique lors des visites suivantes
- Priorité sur les préférences système si un choix manuel existe

### 🎨 **Adaptation complète**
- Tous les composants s'adaptent automatiquement
- Variables CSS dynamiques
- Transitions fluides entre les thèmes

## Utilisation

### Activation automatique
Le thème sombre s'active automatiquement si :
1. L'utilisateur a défini une préférence système pour le mode sombre
2. Aucun choix manuel n'a été sauvegardé

### Basculement manuel
```html
<button class="theme-toggle" title="Toggle theme">
    <span class="theme-icon">🌙</span>
</button>
```

### JavaScript API
```javascript
// Initialisation automatique
const themeToggle = new ThemeToggle();

// Basculement programmatique
themeToggle.setTheme('dark');  // ou 'light'

// Obtenir le thème actuel
const currentTheme = themeToggle.getCurrentTheme();

// Écouter les changements de thème
window.addEventListener('themeChanged', (event) => {
    console.log('Nouveau thème:', event.detail.theme);
});
```

## Classes utilitaires

### Backgrounds thématiques
```html
<div class="bg-theme-primary">Background principal</div>
<div class="bg-theme-secondary">Background secondaire</div>
<div class="bg-theme-tertiary">Background tertiaire</div>
```

### Textes thématiques
```html
<p class="text-theme-primary">Texte principal</p>
<p class="text-theme-secondary">Texte secondaire</p>
<p class="text-theme-tertiary">Texte tertiaire</p>
```

### Bordures thématiques
```html
<div class="border border-theme-primary">Bordure principale</div>
<div class="border border-theme-secondary">Bordure secondaire</div>
<div class="border border-theme-tertiary">Bordure tertiaire</div>
```

### Classes de mode
```html
<div class="dark-mode">Contenu en mode sombre</div>
<div class="light-mode">Contenu en mode clair</div>
<div class="theme-transition">Transitions fluides</div>
```

## Variables CSS

### Couleurs principales
```css
:root {
  /* Mode clair (par défaut) */
  --primary-color: #007bff;
  --bg-primary: #ffffff;
  --text-primary: #212529;
}

[data-theme="dark"] {
  /* Mode sombre */
  --primary-color: #0d6efd;
  --bg-primary: #0d1117;
  --text-primary: #f0f6fc;
}
```

### Couleurs de fond
- `--bg-primary` : Fond principal
- `--bg-secondary` : Fond secondaire  
- `--bg-tertiary` : Fond tertiaire

### Couleurs de texte
- `--text-primary` : Texte principal
- `--text-secondary` : Texte secondaire
- `--text-tertiary` : Texte tertiaire

### Couleurs de bordure
- `--border-primary` : Bordure principale
- `--border-secondary` : Bordure secondaire
- `--border-tertiary` : Bordure tertiaire

## Composants adaptatifs

Tous les composants s'adaptent automatiquement au thème :

### Cartes
```html
<div class="card">
    <div class="card-header">Header</div>
    <div class="card-body">Body</div>
    <div class="card-footer">Footer</div>
</div>
```

### Formulaires
```html
<form>
    <div class="form-group">
        <label>Label</label>
        <input type="text" class="form-control" placeholder="Input">
    </div>
</form>
```

### Alertes
```html
<div class="alert alert-primary">Alerte principale</div>
<div class="alert alert-success">Alerte de succès</div>
```

### Navigation
```html
<nav class="navbar">
    <div class="navbar-brand">Brand</div>
    <ul class="navbar-nav">
        <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
        </li>
    </ul>
</nav>
```

## Personnalisation

### Variables personnalisées
```css
[data-theme="dark"] {
  --primary-color: #votre-couleur;
  --bg-primary: #votre-fond;
  --text-primary: #votre-texte;
}
```

### Classes personnalisées
```css
.custom-dark-component {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border-color: var(--border-primary);
  transition: all var(--transition-normal);
}
```

## Bonnes pratiques

### Transitions
Utilisez toujours des transitions pour les changements de thème :
```css
.component {
  transition: background-color var(--transition-normal), 
              color var(--transition-normal);
}
```

### Contraste
Assurez-vous que le contraste reste suffisant dans les deux thèmes :
- Mode clair : texte sombre sur fond clair
- Mode sombre : texte clair sur fond sombre

### Images
Adaptez les images selon le thème :
```css
[data-theme="dark"] img {
  opacity: 0.8;
  filter: brightness(0.8);
}
```

## Compatibilité

- ✅ Chrome 88+
- ✅ Firefox 85+
- ✅ Safari 14+
- ✅ Edge 88+
- ✅ Support des préférences système
- ✅ Fallback pour navigateurs non compatibles

## Exemples

### Page complète avec thème
```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mon App</title>
    <link rel="stylesheet" href="dist/css/style.css">
</head>
<body>
    <div class="container">
        <header class="py-4">
            <div class="d-flex justify-content-between align-items-center">
                <h1>Mon App</h1>
                <button class="theme-toggle">
                    <span class="theme-icon">🌙</span>
                </button>
            </div>
        </header>
        
        <main>
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Contenu adaptatif</h5>
                    <p class="card-text">Ce contenu s'adapte automatiquement au thème.</p>
                </div>
            </div>
        </main>
    </div>
    
    <script src="src/js/theme-toggle.js"></script>
</body>
</html>
```

Le thème sombre est maintenant entièrement intégré au Design Toolkit et prêt à être utilisé !
