# Design Toolkit - Documentation

## Vue d'ensemble

Le Design Toolkit est un framework CSS moderne et léger, inspiré de Bootstrap, construit avec les dernières technologies web. Il offre une approche mobile-first avec des composants réutilisables et un système de design cohérent.

## Fonctionnalités principales

### 🎨 **Architecture moderne**
- Variables CSS personnalisables
- Architecture modulaire SCSS
- Système de build optimisé avec Vite
- Support des préfixes vendor automatique

### 📱 **Responsive Design**
- Approche mobile-first
- Système de grille flexible (12 colonnes)
- Breakpoints configurables
- Composants adaptatifs

### 🧩 **Composants complets**
- **Boutons** : 8 variantes + outline + tailles
- **Formulaires** : Inputs, selects, checkboxes, radios, validation
- **Cartes** : Header, body, footer, variantes colorées
- **Navigation** : Navbar, nav, breadcrumb, pagination
- **Alertes** : Toutes variantes avec option dismissible
- **Badges** : Variantes colorées + pill
- **Modales** : Responsive avec backdrop

### 🛠️ **Utilitaires**
- **Espacement** : Margin/padding responsive
- **Couleurs** : Background/text avec palette complète
- **Display** : Flexbox, visibility, positioning
- **Typographie** : Alignment, weight, size, decoration

## Structure du projet

```
design-toolkit/
├── src/
│   ├── index.scss              # Point d'entrée principal
│   └── scss/
│       ├── _variables.scss     # Variables CSS et tokens
│       ├── base/               # Styles de base
│       │   ├── _reset.scss
│       │   ├── _typography.scss
│       │   └── _utilities.scss
│       ├── layout/             # Système de layout
│       │   ├── _grid.scss
│       │   └── _container.scss
│       ├── components/         # Composants UI
│       │   ├── _buttons.scss
│       │   ├── _forms.scss
│       │   ├── _cards.scss
│       │   ├── _navigation.scss
│       │   ├── _alerts.scss
│       │   ├── _badges.scss
│       │   └── _modals.scss
│       └── utilities/          # Classes utilitaires
│           ├── _spacing.scss
│           ├── _colors.scss
│           ├── _display.scss
│           ├── _flexbox.scss
│           └── _text.scss
├── dist/                       # Fichiers compilés
├── demo.html                   # Page de démonstration
├── package.json
├── vite.config.js
└── .stylelintrc.json
```

## Installation et utilisation

### Installation
```bash
npm install
```

### Développement
```bash
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run preview      # Aperçu du build
npm run lint         # Linting CSS
```

### Utilisation dans un projet
```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="dist/css/style.css">
</head>
<body>
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Titre</h5>
                        <p class="card-text">Contenu</p>
                        <button class="btn btn-primary">Action</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
```

## Personnalisation

### Variables CSS
Le toolkit utilise des variables CSS pour faciliter la personnalisation :

```css
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --success-color: #28a745;
  --danger-color: #dc3545;
  --warning-color: #ffc107;
  --info-color: #17a2b8;
  --light-color: #f8f9fa;
  --dark-color: #343a40;
  
  --font-family-sans-serif: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-size-base: 1rem;
  --spacing-md: 1rem;
  --border-radius-md: 0.375rem;
}
```

### Breakpoints
```css
--breakpoint-sm: 576px;
--breakpoint-md: 768px;
--breakpoint-lg: 992px;
--breakpoint-xl: 1200px;
--breakpoint-2xl: 1400px;
```

## Exemples d'utilisation

### Système de grille
```html
<div class="container">
    <div class="row">
        <div class="col-12 col-md-6 col-lg-4">
            <!-- Contenu -->
        </div>
    </div>
</div>
```

### Boutons
```html
<button class="btn btn-primary">Primary</button>
<button class="btn btn-outline-secondary">Outline</button>
<button class="btn btn-success btn-lg">Large Success</button>
```

### Formulaires
```html
<form>
    <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" id="email">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

### Cartes
```html
<div class="card">
    <div class="card-header">Header</div>
    <div class="card-body">
        <h5 class="card-title">Titre</h5>
        <p class="card-text">Contenu</p>
    </div>
    <div class="card-footer">Footer</div>
</div>
```

## Performance

- **Taille** : ~67KB (non compressé), ~10KB (gzip)
- **Compatibilité** : Chrome, Firefox, Safari, Edge (dernières 2 versions)
- **Accessibilité** : Respect des standards WCAG
- **Performance** : CSS optimisé et modulaire

## Développement

### Scripts disponibles
- `npm run dev` : Serveur de développement Vite
- `npm run build` : Build de production optimisé
- `npm run preview` : Aperçu du build de production
- `npm run lint` : Vérification du code CSS
- `npm run lint:fix` : Correction automatique du linting

### Standards de code
- Stylelint configuré avec des règles adaptées
- Commentaires en anglais
- Structure modulaire SCSS
- Variables CSS pour la cohérence

## Licence

MIT License - Voir le fichier LICENSE pour plus de détails.

## Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -am 'Ajouter nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Créer une Pull Request
