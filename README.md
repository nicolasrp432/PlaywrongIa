# PlaywrongIA - Cartelera de Películas

Una aplicación web tipo Netflix para mostrar una cartelera de películas, desarrollada como proyecto académico para un curso de desarrollo web frontend.

![PlaywrongIA Preview](https://via.placeholder.com/800x400?text=PlaywrongIA+Preview)

## 🚀 Tecnologías Utilizadas

- **React**: Biblioteca para construir interfaces de usuario
- **Vite**: Herramienta de construcción rápida para desarrollo web moderno
- **Zustand**: Gestión de estado simple y eficiente
- **Axios**: Cliente HTTP para realizar peticiones a APIs
- **Tailwind CSS**: Framework CSS utilitario para diseño rápido y responsivo
- **React Router DOM**: Enrutamiento para aplicaciones React
- **Auth0**: Autenticación y autorización segura
- **Vitest + Testing Library**: Testing unitario
- **MSW**: Mocking de servicios web para pruebas
- **Playwright**: Testing end-to-end

## 📋 Requisitos Previos

- Node.js (versión 16.0.0 o superior)
- npm (versión 8.0.0 o superior)
- Cuenta en [The Movie Database (TMDB)](https://www.themoviedb.org/) para obtener una API key
- Cuenta en [Auth0](https://auth0.com/) para configurar la autenticación

## 🔧 Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/playwrongia.git
   cd playwrongia
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
   ```
   VITE_TMDB_API_KEY=tu_api_key_de_tmdb
   VITE_AUTH0_DOMAIN=tu_dominio_auth0
   VITE_AUTH0_CLIENT_ID=tu_client_id_auth0
   VITE_AUTH0_AUDIENCE=tu_audience_auth0
   VITE_AUTH0_REDIRECT_URI=http://localhost:5173/callback
   ```

4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

5. Abre tu navegador en [http://localhost:5173](http://localhost:5173)

## 🏗️ Estructura del Proyecto

```
/
├── public/               # Archivos estáticos
├── src/
│   ├── components/       # Componentes de React
│   │   ├── auth/         # Componentes de autenticación
│   │   ├── layout/       # Componentes de estructura
│   │   ├── movies/       # Componentes relacionados con películas
│   │   └── search/       # Componentes de búsqueda
│   ├── hooks/            # Custom hooks
│   ├── pages/            # Páginas/Rutas de la aplicación
│   ├── services/         # Servicios (API, etc.)
│   ├── store/            # Estado global (Zustand)
│   ├── tests/            # Tests
│   │   ├── e2e/          # Tests end-to-end (Playwright)
│   │   ├── mocks/        # Mocks para testing
│   │   └── unit/         # Tests unitarios (Vitest)
│   ├── utils/            # Utilidades y helpers
│   ├── App.jsx           # Componente principal
│   ├── main.jsx          # Punto de entrada
│   └── index.css         # Estilos globales y Tailwind
├── .env                  # Variables de entorno
├── tailwind.config.js    # Configuración de Tailwind CSS
├── vite.config.js        # Configuración de Vite
├── vitest.config.js      # Configuración de Vitest
└── playwright.config.js  # Configuración de Playwright
```

## 📱 Funcionalidades

- **Página Principal**: Carrusel con películas en tendencia y secciones por género
- **Página de Detalles**: Información completa de la película seleccionada
- **Búsqueda**: Búsqueda de películas por título
- **Autenticación**: Login con Google a través de Auth0

## 🧪 Testing

### Tests Unitarios

```bash
# Ejecutar tests unitarios
npm test

# Ejecutar tests en modo watch
npm run test:watch

# Ejecutar tests con cobertura
npm run test:coverage
```

### Tests End-to-End

```bash
# Ejecutar tests e2e
npm run test:e2e

# Ejecutar tests e2e con interfaz visual
npm run test:e2e:ui
```

## 🚀 Despliegue

Para construir la aplicación para producción:

```bash
npm run build
```

Los archivos generados estarán en el directorio `dist/` y pueden ser desplegados en cualquier servidor web estático como Netlify, Vercel, GitHub Pages, etc.

## 📝 Notas Importantes

- Esta aplicación es un proyecto académico y no está afiliada oficialmente con Netflix o TMDB.
- Para utilizar la aplicación, es necesario obtener una API key de TMDB y configurar Auth0.
- La aplicación está diseñada para fines educativos y de demostración.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request para sugerir cambios o mejoras.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
