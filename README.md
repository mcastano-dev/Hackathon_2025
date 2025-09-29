# VozNica Frontend

## Description

VozNica is a frontend-only web platform to preserve and share popular knowledge, traditions, and memories of Nicaragua. This implementation provides a main page with simulated functionalities, accessible directly without login.

## Features

- **Minimalist & Modern Design**: Clean layout with Inter typography.
- **Responsive**: Mobile-first design adapting to different screen sizes.
- **Accessible**: Semantic HTML, ARIA attributes, keyboard navigation.
- **Smooth Animations**: 150-350ms transitions, hover effects with transform and opacity.
- **Language**: All UI text in Spanish (Nicaraguan culture).
- **Color Palette**: Indigo dye, white, Indian red, and selective yellow.

## Project Structure

```
voznica-frontend/
├── assets/
│   ├── icons/
│   │   └── logo.svg
│   └── images/
│       └── tradition1.svg
├── css/
│   └── styles.css
├── scss/
│   ├── _variables.scss
│   ├── _layout.scss
│   ├── _components.scss
│   └── main.scss
├── js/
│   └── main.js
├── index.html
└── README.md
```

## Pages

### Homepage (index.html)
- Header with logo placeholder and intro in Spanish.
- Fixed left sidebar with menu in Spanish: Inicio, Publicaciones colaborativas, Mapa interactivo, Calendario cultural, Biblioteca colaborativa, Retos y juegos didácticos, Buscar, Perfil, Configuración, Cerrar sesión.
- Clicking menu items scrolls smoothly to corresponding sections.
- Sections with dynamic content: Inicio (featured), Publicaciones (cards), Mapa (placeholder), Calendario (grid), Biblioteca (cards), Retos (challenges), Perfil (user info).
- Search functionality to filter content.
- Modal for interactions.

## Technologies

- HTML5
- SCSS (compiled to CSS)
- Vanilla JavaScript

## Installation and Usage

1. Clone or download the project.
2. Open `index.html` in a web browser.
3. To recompile SCSS:
   ```
   npm install -g sass
   sass scss/main.scss css/styles.css
   ```
4. Navigate the application.

## Notes

- No backend, database, or real authentication.
- All interactions simulated with vanilla JavaScript.
- UI content in English; code in English.
- Design optimized for accessibility and usability.

## Author

Project created for VozNica, Nicaraguan cultural platform.
