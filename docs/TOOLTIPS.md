# Tooltips - Documentation

Le système de tooltips du Design Toolkit fournit des informations contextuelles élégantes et animées.

## Web Component `<dt-tooltip>`

### Utilisation de base

```html
<dt-tooltip text="Ceci est un tooltip" position="top" theme="dark">
  <button class="btn btn-primary">Bouton avec tooltip</button>
</dt-tooltip>
```

### Attributs

| Attribut | Type | Défaut | Description |
|----------|------|--------|-------------|
| `text` | string | `""` | Texte à afficher dans le tooltip |
| `position` | string | `"top"` | Position du tooltip (`top`, `bottom`, `left`, `right`) |
| `theme` | string | `"dark"` | Thème visuel (`dark`, `light`, `primary`, `success`, `warning`, `danger`) |
| `delay` | number | `500` | Délai d'apparition en millisecondes |

### Positions disponibles

- **`top`** : Au-dessus de l'élément
- **`bottom`** : En-dessous de l'élément  
- **`left`** : À gauche de l'élément
- **`right`** : À droite de l'élément

### Thèmes disponibles

- **`dark`** : Fond sombre avec texte blanc (défaut)
- **`light`** : Fond blanc avec texte sombre et bordure
- **`primary`** : Couleur primaire du thème
- **`success`** : Couleur de succès (vert)
- **`warning`** : Couleur d'avertissement (orange)
- **`danger`** : Couleur de danger (rouge)

## Exemples d'utilisation

### Tooltip simple

```html
<dt-tooltip text="Informations utiles">
  <span class="tooltip-icon">?</span>
</dt-tooltip>
```

### Tooltip avec icône

```html
<dt-tooltip text="Paramètres avancés" position="right" theme="primary">
  <dt-icon name="settings" size="lg"></dt-icon>
</dt-tooltip>
```

### Tooltip avec délai personnalisé

```html
<dt-tooltip text="Apparition rapide" delay="200" theme="success">
  <button class="btn btn-success">Action rapide</button>
</dt-tooltip>
```

### Tooltip avec contenu long

```html
<dt-tooltip text="Ceci est un tooltip avec beaucoup de texte pour démontrer comment il gère le retour à la ligne et la largeur maximale." position="top" theme="dark">
  <button class="btn btn-info">Tooltip long</button>
</dt-tooltip>
```

## API JavaScript

### Création programmatique

```javascript
// Créer un tooltip
const tooltip = DtTooltip.create('Texte du tooltip', {
  position: 'bottom',
  theme: 'success',
  delay: 300
});

// Ajouter au DOM
document.body.appendChild(tooltip);
```

### Méthodes publiques

```javascript
const tooltip = document.querySelector('dt-tooltip');

// Changer le texte
tooltip.setText('Nouveau texte');

// Changer la position
tooltip.setPosition('right');

// Changer le thème
tooltip.setTheme('primary');

// Changer le délai
tooltip.setDelay(1000);
```

## Classes utilitaires CSS

### Positionnement

```html
<div class="tooltip-top">...</div>
<div class="tooltip-bottom">...</div>
<div class="tooltip-left">...</div>
<div class="tooltip-right">...</div>
```

### Thèmes

```html
<div class="tooltip-dark">...</div>
<div class="tooltip-light">...</div>
<div class="tooltip-primary">...</div>
<div class="tooltip-success">...</div>
<div class="tooltip-warning">...</div>
<div class="tooltip-danger">...</div>
```

### Délais

```html
<div class="tooltip-delay-fast">...</div>    <!-- 200ms -->
<div class="tooltip-delay-normal">...</div>  <!-- 500ms -->
<div class="tooltip-delay-slow">...</div>    <!-- 1000ms -->
```

### Icônes de tooltip

```html
<span class="tooltip-icon">?</span>
<span class="tooltip-icon">i</span>
<span class="tooltip-icon">!</span>
```

## Animations

Les tooltips utilisent des animations CSS fluides :

- **Apparition** : Scale (0.8 → 1) + Fade (0 → 1)
- **Disparition** : Scale (1 → 0.8) + Fade (1 → 0)
- **Durée** : 200ms avec easing `cubic-bezier(0.4, 0, 0.2, 1)`

## Accessibilité

- **Focus** : Les tooltips apparaissent au focus clavier
- **Touch** : Support des événements tactiles sur mobile
- **ARIA** : Attributs appropriés pour les lecteurs d'écran
- **Contraste** : Couleurs respectant les standards d'accessibilité

## Responsive

- **Mobile** : Largeur maximale réduite (150px)
- **Tablette** : Adaptation automatique des positions
- **Desktop** : Largeur maximale standard (200px)

## Intégration avec les autres composants

### Boutons

```html
<dt-tooltip text="Action de sauvegarde" theme="success">
  <button class="btn btn-primary">
    <dt-icon name="save" size="sm"></dt-icon>
    Sauvegarder
  </button>
</dt-tooltip>
```

### Formulaires

```html
<div class="form-group">
  <label>Email</label>
  <div class="form-tooltip">
    <input type="email" class="form-control">
    <dt-tooltip text="Format: exemple@domaine.com" position="left">
      <span class="tooltip-icon">?</span>
    </dt-tooltip>
  </div>
</div>
```

### Navigation

```html
<nav class="navbar">
  <dt-tooltip text="Accueil" position="bottom">
    <a href="/" class="nav-link">
      <dt-icon name="home"></dt-icon>
    </a>
  </dt-tooltip>
</nav>
```

## Bonnes pratiques

1. **Texte concis** : Gardez les tooltips courts et informatifs
2. **Position appropriée** : Choisissez la position selon l'espace disponible
3. **Thème cohérent** : Utilisez le même thème dans une section
4. **Délai adapté** : Délai court pour les actions fréquentes, long pour les informations
5. **Mobile-friendly** : Testez sur différents écrans

## Personnalisation avancée

### CSS personnalisé

```css
dt-tooltip {
  --tooltip-font-size: 0.875rem;
  --tooltip-padding: 0.5rem 0.75rem;
  --tooltip-border-radius: 0.25rem;
  --tooltip-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
```

### Animations personnalisées

```css
dt-tooltip .tooltip {
  transition: all 0.3s ease-in-out;
}

dt-tooltip .tooltip.show {
  animation: tooltipBounce 0.3s ease-out;
}

@keyframes tooltipBounce {
  0% { transform: scale(0.8) translateY(10px); }
  50% { transform: scale(1.05) translateY(-5px); }
  100% { transform: scale(1) translateY(0); }
}
```
