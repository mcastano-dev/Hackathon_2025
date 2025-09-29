# VozNica - Plataforma Cultural Nicaragüense

## 📖 Descripción

VozNica es una plataforma web interactiva dedicada a la preservación y difusión del patrimonio cultural nicaragüense. Esta implementación frontend completa ofrece una experiencia rica con autenticación de usuarios, navegación intuitiva y múltiples funcionalidades culturales, todo desarrollado con tecnologías modernas y un diseño centrado en la accesibilidad.

## ✨ Características Principales

### 🎨 Diseño y Experiencia de Usuario
- **Diseño Minimalista y Moderno**: Layout limpio con tipografía Inter
- **Completamente Responsive**: Diseño mobile-first que se adapta a todos los tamaños de pantalla
- **Accesibilidad Total**: HTML semántico, atributos ARIA, navegación por teclado
- **Animaciones Suaves**: Transiciones de 150-350ms, efectos hover con transform y opacity
- **Idioma**: Toda la interfaz en español (cultura nicaragüense)
- **Paleta de Colores**: Azul índigo, blanco, rojo indio y amarillo selectivo

### 🔐 Sistema de Autenticación
- **Registro de Usuarios**: Formulario completo con validación de campos
- **Inicio de Sesión**: Autenticación segura con verificación de credenciales
- **Acceso de Invitado**: Navegación sin registro
- **Validaciones**: Edad mínima (13 años), campos requeridos, emails únicos

### 🧭 Navegación Inteligente
- **Sidebar Colapsable**: Menú lateral con categorías desplegables
- **Navegación por Secciones**: Explorar, Participar, Usuario, Sesión
- **Indicadores Activos**: Visualización clara de la sección actual
- **Transiciones Fluidas**: Cambios suaves entre secciones

## 📁 Estructura del Proyecto

```
voznica-frontend/
├── assets/
│   ├── icons/
│   │   └── logo.svg
│   └── images/
│       ├── voznic-logo.png    # Logo personalizado
│       └── tradition1.svg
├── css/
│   ├── styles.css            # Estilos compilados
│   └── styles.css.map
├── scss/
│   ├── _variables.scss       # Variables de colores y tipografía
│   ├── _layout.scss          # Layout y estructura
│   ├── _components.scss      # Componentes de UI
│   └── main.scss            # Archivo principal SCSS
├── js/
│   ├── auth.js              # Lógica de autenticación
│   └── main.js              # Funcionalidades principales
├── login.html               # Página de autenticación
├── index.html               # Página principal con múltiples secciones
└── README.md
```

## 🖥️ Pantallas y Secciones

### 🔑 Página de Login (`login.html`)
- **Formulario de Registro**: Nombres, apellidos, fecha nacimiento, sexo, departamento, teléfono, email, usuario, contraseña
- **Inicio de Sesión**: Usuario y contraseña con validación
- **Acceso de Invitado**: Entrada directa sin registro
- **Validaciones en Tiempo Real**: Feedback inmediato de errores

### 🏠 Página Principal (`index.html`)

#### **Sección Inicio**
- **Logo Personalizado**: Imagen PNG integrada con efectos visuales
- **Misión y Visión**: Descripción clara de los objetivos de VozNica
- **Diseño Hero**: Gradiente atractivo con información destacada

#### **Publicaciones Colaborativas**
- **Feed Social**: Sistema tipo Facebook con posts culturales
- **Creación de Contenido**: Formulario modal para nuevos posts
- **Interacciones**: Likes, comentarios, compartir
- **Filtros Avanzados**: Por fecha, título, autor
- **Contenido Simulado**: Posts de ejemplo sobre cultura nicaragüense

#### **Mapa Interactivo**
- **Google Maps Integrado**: Marcadores de lugares culturales
- **Puntos de Interés**: Catedrales, volcanes, reservas naturales
- **Información Detallada**: Modales con historia y datos culturales
- **Navegación Cruzada**: Conexión con calendario de eventos

#### **Calendario Cultural**
- **Eventos Nicaragüenses**: 12 festivales y celebraciones reales
- **Filtros por Categoría**: Religiosos, históricos, culturales, tradicionales
- **Vista por Mes**: Navegación temporal intuitiva
- **Eventos en Mapa**: Integración con marcadores geográficos

#### **Biblioteca Cultural**
- **Recursos Educativos**: Artículos, documentos, multimedia
- **Categorías Organizadas**: Historia, tradiciones, arte, música, gastronomía
- **Búsqueda y Filtros**: Localización rápida de contenido
- **Enlaces Externos**: Conexión con recursos culturales verificados

#### **Retos y Juegos Didácticos**
- **Trivia Cultural**: 45 preguntas sobre Nicaragua (15 por nivel)
- **Sistema de Rangos**: Principiante → Intermedio → Avanzado
- **Puntuación Dinámica**: +10 correctas, -5 incorrectas
- **Niveles Progresivos**: Dificultad creciente
- **Persistencia**: Progreso guardado en localStorage

#### **Perfil de Usuario**
- **Información Personal**: Datos del usuario registrado
- **Estadísticas**: Número de publicaciones, likes recibidos
- **Historial de Posts**: Gestión de contenido propio
- **Editar Perfil**: Actualización de información

#### **Configuración**
- **Preferencias**: Ajustes de la aplicación
- **Privacidad**: Controles de visibilidad
- **Cerrar Sesión**: Salida segura del sistema

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **SCSS**: Preprocesador CSS con variables y mixins
- **Vanilla JavaScript**: Lógica interactiva sin frameworks
- **Google Maps API**: Mapas interactivos (requiere API key)
- **LocalStorage**: Persistencia de datos del usuario

## 🚀 Instalación y Uso

### Prerrequisitos
- Navegador web moderno
- Node.js (opcional, para desarrollo)
- API Key de Google Maps (para funcionalidad completa del mapa)

### Instalación
1. **Clona o descarga** el proyecto desde GitHub
2. **Navega** a la carpeta del proyecto
3. **Abre** `login.html` en tu navegador web

### Desarrollo
Para modificar estilos SCSS:
```bash
# Instalar Sass globalmente
npm install -g sass

# Compilar cambios
sass scss/main.scss css/styles.css
```

### Configuración de Google Maps
1. Obtén una API Key de Google Cloud Console
2. Agrega tu key en el código HTML donde se indica
3. Habilita las APIs de Maps JavaScript y Places

## 📊 Funcionalidades Implementadas

### ✅ Autenticación Completa
- Registro con validaciones
- Login seguro
- Sesiones persistentes
- Acceso de invitados

### ✅ Navegación Dinámica
- Sidebar con dropdowns
- Secciones independientes
- Transiciones suaves
- Indicadores activos

### ✅ Contenido Cultural Rico
- Información verificada sobre Nicaragua
- Eventos reales del calendario cultural
- Preguntas educativas en trivia
- Recursos culturales organizados

### ✅ Interactividad Avanzada
- Formularios funcionales
- Filtros y búsquedas
- Modales informativos
- Feedback visual

### ✅ Diseño Responsive
- Mobile-first approach
- Breakpoints optimizados
- Componentes adaptables
- Navegación touch-friendly

## 🔄 Estado Actual y Próximos Pasos

### ✅ Completado
- **Frontend Completo**: Todas las secciones implementadas
- **Autenticación**: Sistema de login/registro funcional
- **Navegación**: Sidebar con categorías desplegables
- **Contenido**: Información cultural nicaragüense
- **Interactividad**: Formularios, filtros, modales
- **Responsive**: Diseño adaptable a todos los dispositivos

### 🔄 Próximos Pasos (Backend)
- **API REST**: Endpoints para usuarios y publicaciones
- **Base de Datos**: MongoDB con modelos de datos
- **Autenticación Real**: JWT y encriptación
- **Despliegue**: Vercel para frontend y backend
- **Integración**: Conexión completa frontend-backend

## 📝 Notas Importantes

- **Simulación Actual**: Las funcionalidades usan localStorage para persistencia
- **Sin Backend**: Actualmente es una aplicación frontend pura
- **Contenido Educativo**: Toda la información cultural está verificada
- **Accesibilidad**: Diseño optimizado para todos los usuarios
- **Performance**: Código optimizado y ligero

## 👥 Autor

Proyecto desarrollado para **VozNica**, plataforma cultural nicaragüense dedicada a la preservación y difusión del patrimonio cultural de Nicaragua a través de la tecnología y la participación comunitaria.

---

**🇳🇮 VozNica - Preservando la cultura nicaragüense para las futuras generaciones 🇳🇮**
