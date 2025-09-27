# Système d'Icônes - Design Toolkit

## Vue d'ensemble

Le Design Toolkit inclut un système d'icônes SVG complet avec des classes utilitaires et un **web component moderne** pour une gestion simplifiée des icônes. Le système est entièrement intégré et utilisé dans tous les composants du toolkit, y compris le bouton de changement de thème.

## Fonctionnalités

### 🎨 **Icônes SVG**
- **100+ icônes** de base incluses dans le registre
- Format SVG optimisé et léger
- Couleurs adaptatives au thème (light/dark)
- Scalables sans perte de qualité
- Cohérence visuelle garantie

### 🚀 **Web Component `<dt-icon>`**
- **Composant moderne** et simple d'utilisation
- Gestion automatique du SVG via le registre
- API intuitive avec attributs HTML standards
- Support des animations intégrées
- Shadow DOM pour l'isolation des styles
- Performance optimisée (pas de requêtes HTTP)

### 📏 **Tailles**
- **7 tailles** prédéfinies : xs, sm, md, lg, xl, 2xl, 3xl
- Classes utilitaires simples et cohérentes
- Responsive et adaptatives
- Valeurs CSS personnalisées

### 🎯 **Intégration Complète**
- Boutons avec icônes (tous les types)
- Boutons icône uniquement (`.btn-icon`)
- Icônes avec texte (`.icon-text`)
- Grilles d'icônes (`.icon-grid`)
- **Bouton de thème** intégré (moon/sun)
- Navigation et menus
- Formulaires et inputs

## Utilisation

### Web Component (Recommandé)

```html
<!-- Icône simple -->
<dt-icon name="plus"></dt-icon>

<!-- Avec taille et couleur -->
<dt-icon name="heart" size="lg" color="danger"></dt-icon>

<!-- Avec animation -->
<dt-icon name="refresh" class="icon-spin"></dt-icon>

<!-- Dans un bouton -->
<button class="btn btn-primary">
  <dt-icon name="plus" size="sm"></dt-icon>
  Ajouter
</button>

<!-- Bouton de thème (exemple d'intégration) -->
<button class="theme-toggle" title="Toggle theme">
  <dt-icon name="moon" class="theme-icon"></dt-icon>
</button>
```

### Attributs du Web Component

| Attribut | Description | Valeurs possibles |
|----------|-------------|-------------------|
| `name` | Nom de l'icône | `plus`, `check`, `heart`, etc. |
| `size` | Taille de l'icône | `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl` |
| `color` | Couleur de l'icône | `primary`, `success`, `danger`, `warning`, `info`, `muted` |
| `class` | Classes CSS additionnelles | `icon-spin`, `icon-pulse`, `icon-bounce` |

### Méthodes JavaScript

```javascript
// Créer une icône programmatiquement
const icon = dt-icon.create('heart', { 
  size: 'lg', 
  color: 'danger' 
});

// Modifier une icône existante
const iconElement = document.querySelector('dt-icon');
iconElement.setIcon('star');
iconElement.setSize('xl');
iconElement.setColor('warning');
iconElement.setAnimation('icon-pulse');

// Accès au registre d'icônes
const iconPath = window.iconRegistry.getIcon('plus');
const hasIcon = window.iconRegistry.hasIcon('check');
const allIcons = window.iconRegistry.listIcons();

// Exemple : Changement dynamique d'icône de thème
function updateThemeIcon(theme) {
  const themeIcon = document.querySelector('.theme-icon');
  if (themeIcon) {
    themeIcon.setAttribute('name', theme === 'dark' ? 'sun' : 'moon');
  }
}
```

### Classes de base (Legacy)
```html
<svg class="icon" viewBox="0 0 24 24">
  <path d="M12 5v14m7-7H5"/>
</svg>
```

### Tailles d'icônes
```html
<dt-icon name="star" size="xs"></dt-icon>   <!-- 0.75rem -->
<dt-icon name="star" size="sm"></dt-icon>   <!-- 0.875rem -->
<dt-icon name="star" size="md"></dt-icon>   <!-- 1rem -->
<dt-icon name="star" size="lg"></dt-icon>   <!-- 1.25rem -->
<dt-icon name="star" size="xl"></dt-icon>   <!-- 1.5rem -->
<dt-icon name="star" size="2xl"></dt-icon>  <!-- 2rem -->
<dt-icon name="star" size="3xl"></dt-icon>  <!-- 3rem -->
```

### Couleurs d'icônes
```html
<dt-icon name="star" color="primary"></dt-icon>
<dt-icon name="star" color="success"></dt-icon>
<dt-icon name="star" color="danger"></dt-icon>
<dt-icon name="star" color="warning"></dt-icon>
<dt-icon name="star" color="info"></dt-icon>
<dt-icon name="star" color="muted"></dt-icon>
```

## Composants avec icônes

### Boutons avec icônes
```html
<button class="btn btn-primary">
  <dt-icon name="plus" size="sm"></dt-icon>
  Ajouter
</button>

<button class="btn btn-success">
  <dt-icon name="check" size="sm"></dt-icon>
  Valider
</button>

<button class="btn btn-danger">
  <dt-icon name="x" size="sm"></dt-icon>
  Supprimer
</button>
```

### Boutons icône uniquement
```html
<button class="btn-icon btn-icon-primary" title="Ajouter">
  <dt-icon name="plus"></dt-icon>
</button>

<button class="btn-icon btn-icon-success" title="Valider">
  <dt-icon name="check"></dt-icon>
</button>

<button class="btn-icon btn-icon-danger" title="Supprimer">
  <dt-icon name="x"></dt-icon>
</button>
```

### Icônes avec texte
```html
<div class="icon-text">
  <dt-icon name="home" color="primary"></dt-icon>
  <span>Accueil</span>
</div>

<div class="icon-text">
  <dt-icon name="user" color="success"></dt-icon>
  <span>Profil</span>
</div>

<div class="icon-text">
  <dt-icon name="mail" color="info"></dt-icon>
  <span>Messages</span>
</div>
```

### Grille d'icônes
```html
<div class="icon-grid">
  <div class="icon-grid-item">
    <dt-icon name="plus"></dt-icon>
    <div class="icon-name">Plus</div>
  </div>
  <div class="icon-grid-item">
    <dt-icon name="check"></dt-icon>
    <div class="icon-name">Coche</div>
  </div>
  <div class="icon-grid-item">
    <dt-icon name="heart"></dt-icon>
    <div class="icon-name">Cœur</div>
  </div>
</div>
```

## Icônes disponibles (100+ icônes)

### Actions principales
- **plus** - Ajouter, créer
- **minus** - Supprimer, réduire
- **check** - Valider, confirmer
- **x** - Fermer, annuler
- **edit** - Modifier, éditer
- **delete** - Supprimer définitivement
- **copy** - Copier
- **save** - Sauvegarder
- **refresh** - Actualiser, recharger

### Navigation et direction
- **arrow-right** - Flèche droite
- **arrow-left** - Flèche gauche
- **arrow-up** - Flèche haut
- **arrow-down** - Flèche bas
- **menu** - Menu hamburger
- **home** - Accueil
- **search** - Rechercher
- **external-link** - Lien externe

### Interface utilisateur
- **user** - Utilisateur, profil
- **settings** - Paramètres, configuration
- **heart** - Favori, aimer
- **star** - Étoile, notation
- **thumbs-up** - J'aime
- **thumbs-down** - Je n'aime pas
- **eye** - Voir, afficher
- **eye-off** - Masquer, cacher

### Fichiers et médias
- **download** - Télécharger
- **upload** - Téléverser
- **file** - Fichier
- **folder** - Dossier
- **image** - Image
- **video** - Vidéo
- **camera** - Appareil photo

### Communication
- **mail** - Email, courrier
- **phone** - Téléphone
- **message** - Message, chat
- **bell** - Notification

### Temps et calendrier
- **calendar** - Calendrier
- **clock** - Horloge, temps
- **sun** - Soleil, jour
- **moon** - Lune, nuit

### Sécurité et accès
- **lock** - Verrouillé, sécurisé
- **unlock** - Déverrouillé
- **shield** - Protection, sécurité
- **key** - Clé, accès

### Média et audio
- **play** - Lire, démarrer
- **pause** - Pause
- **stop** - Arrêter
- **volume** - Son activé
- **volume-off** - Son désactivé
- **skip-forward** - Suivant
- **skip-back** - Précédent

### Navigation et liens
- **share** - Partager
- **link** - Lien
- **bookmark** - Signet
- **tag** - Étiquette

### Alertes et informations
- **alert-triangle** - Avertissement
- **alert-circle** - Alerte
- **info** - Information
- **help** - Aide

### Technologie
- **wifi** - Connexion sans fil
- **bluetooth** - Bluetooth
- **battery** - Batterie
- **monitor** - Écran
- **smartphone** - Téléphone mobile
- **laptop** - Ordinateur portable
- **tablet** - Tablette

### Graphiques et données
- **bar-chart** - Graphique en barres
- **pie-chart** - Graphique circulaire
- **trending-up** - Tendance haussière
- **trending-down** - Tendance baissière

### Jeux et divertissement
- **gamepad** - Manette de jeu
- **dice** - Dé
- **award** - Récompense
- **trophy** - Trophée
- **flag** - Drapeau

### Météo et environnement
- **cloud** - Nuage
- **cloud-download** - Téléchargement cloud
- **cloud-upload** - Téléversement cloud
- **umbrella** - Parapluie
- **droplet** - Goutte d'eau
- **wind** - Vent
- **thermometer** - Thermomètre

### Commerce et paiement
- **credit-card** - Carte de crédit
- **shopping-cart** - Panier d'achat
- **gift** - Cadeau
- **coffee** - Café

### Et bien d'autres...
Le registre contient plus de 100 icônes couvrant tous les cas d'usage courants.

## Classes utilitaires

### Boutons icône
```css
.btn-icon              /* Bouton icône de base */
.btn-icon-primary      /* Variante primaire */
.btn-icon-secondary    /* Variante secondaire */
.btn-icon-success      /* Variante succès */
.btn-icon-danger       /* Variante danger */
.btn-icon-warning      /* Variante avertissement */
.btn-icon-info         /* Variante info */

.btn-icon-sm           /* Taille petite */
.btn-icon-lg           /* Taille grande */
```

### Animations
```css
.icon-spin             /* Rotation continue */
.icon-pulse            /* Pulsation */
.icon-bounce           /* Rebond */
```

### Layout
```css
.icon-text             /* Icône avec texte */
.icon-grid             /* Grille d'icônes */
.icon-grid-item        /* Élément de grille */
.icon-list             /* Liste d'icônes */
```

## Personnalisation

### Ajouter une nouvelle icône
1. Créer le fichier SVG dans `src/icons/`
2. Utiliser la classe `.icon` de base
3. Ajouter les classes de taille/couleur si nécessaire

### Icône personnalisée
```html
<svg class="icon icon-lg icon-primary" viewBox="0 0 24 24">
  <!-- Votre SVG ici -->
</svg>
```

### Couleur personnalisée
```css
.custom-icon {
  color: #votre-couleur;
}
```

## Bonnes pratiques

### Accessibilité
- Toujours inclure un `title` ou `aria-label` sur les boutons icône
- Utiliser des couleurs avec un contraste suffisant
- Fournir des alternatives textuelles quand nécessaire
- Le web component gère automatiquement l'accessibilité

### Performance
- Les icônes SVG sont incluses directement dans le registre JavaScript
- Pas de requêtes HTTP supplémentaires
- Optimisées pour la taille et le rendu
- Shadow DOM pour l'isolation des styles

### Cohérence
- Utiliser les mêmes icônes pour les mêmes actions
- Respecter les conventions d'interface
- Maintenir la cohérence visuelle
- Le registre centralisé garantit la cohérence

### Intégration
- Préférer le web component `<dt-icon>` aux SVG manuels
- Utiliser les attributs standards (`name`, `size`, `color`)
- Exploiter les animations intégrées (`icon-spin`, `icon-pulse`, `icon-bounce`)
- Intégrer avec les composants existants (boutons, navigation, etc.)

## Exemples complets

### Barre d'outils moderne
```html
<div class="d-flex gap-2">
  <button class="btn-icon btn-icon-primary" title="Ajouter">
    <dt-icon name="plus"></dt-icon>
  </button>
  <button class="btn-icon btn-icon-success" title="Valider">
    <dt-icon name="check"></dt-icon>
  </button>
  <button class="btn-icon btn-icon-danger" title="Supprimer">
    <dt-icon name="x"></dt-icon>
  </button>
  <button class="btn-icon btn-icon-info" title="Actualiser">
    <dt-icon name="refresh" class="icon-spin"></dt-icon>
  </button>
</div>
```

### Navigation moderne
```html
<nav class="navbar">
  <div class="navbar-brand">
    <dt-icon name="home" size="lg"></dt-icon>
    Mon App
  </div>
  <ul class="navbar-nav">
    <li class="nav-item">
      <a class="nav-link icon-text" href="#">
        <dt-icon name="user"></dt-icon>
        Profil
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link icon-text" href="#">
        <dt-icon name="settings"></dt-icon>
        Paramètres
      </a>
    </li>
  </ul>
</nav>
```

### Formulaire avec icônes
```html
<form>
  <div class="form-group">
    <label>Recherche</label>
    <div class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text">
          <dt-icon name="search"></dt-icon>
        </span>
      </div>
      <input type="text" class="form-control" placeholder="Rechercher...">
    </div>
  </div>
  
  <div class="form-group">
    <label>Email</label>
    <div class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text">
          <dt-icon name="mail"></dt-icon>
        </span>
      </div>
      <input type="email" class="form-control" placeholder="votre@email.com">
    </div>
  </div>
  
  <button type="submit" class="btn btn-primary">
    <dt-icon name="check" size="sm"></dt-icon>
    Envoyer
  </button>
</form>
```

Le système d'icônes est maintenant **entièrement intégré** et prêt à être utilisé dans vos projets ! 

## Résumé des avantages

✅ **Simplicité** : `<dt-icon name="plus">` au lieu de SVG complexe  
✅ **Performance** : Icônes intégrées, pas de requêtes HTTP  
✅ **Cohérence** : Registre centralisé avec 100+ icônes  
✅ **Thème adaptatif** : Couleurs automatiques light/dark  
✅ **Animations** : Spin, pulse, bounce intégrées  
✅ **Accessibilité** : Support automatique des lecteurs d'écran  
✅ **Intégration** : Utilisé dans tous les composants du toolkit  
✅ **Maintenance** : Gestion centralisée et facile à étendre  

Le web component `<dt-icon>` révolutionne la gestion des icônes en offrant une API moderne et intuitive !
