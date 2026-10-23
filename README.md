# StockTools — Tienda de herramientas para ferreterías

Sitio web de **StockTools**, un distribuidor de herramientas, fijaciones e insumos para ferreterías y corralones.
El proyecto es la **migración a React** de un sitio originalmente hecho en HTML, CSS y JavaScript, como Trabajo Práctico Integrador del Módulo 3 (React) de la cursada de Front End de la **UTN – Centro de e-Learning**.

> Los productos, precios, estadísticas y testimonios del sitio son datos de ejemplo.

---

## Tecnologías

| Herramienta | Versión | Para qué se usa |
|---|---|---|
| [React](https://react.dev/) | 19 | Interfaz con componentes |
| [Vite](https://vite.dev/) | 8 | Entorno de desarrollo y build |
| [React Router](https://reactrouter.com/) | 8 | Navegación entre páginas (SPA) |
| CSS propio | — | Estilos, sin frameworks |
| `localStorage` | — | Guardar el carrito en el navegador |

> **Nota sobre React Router:** la consigna pide la v6. Se usó la v8 (la versión actual al crear el proyecto), que mantiene la misma API de rutas: `<BrowserRouter>`, `<Routes>`, `<Route>`, `<Link>`, `<NavLink>`, `<Outlet>`, `useNavigate` y `useSearchParams`. La única diferencia práctica es que se importa desde `"react-router"` en lugar de `"react-router-dom"`.

---

## Cómo correr el proyecto

**Requisito:** tener instalado [Node.js](https://nodejs.org/) 22.22 o superior (`node -v` para verificar).

```bash
# 1. Clonar el repositorio
git clone https://github.com/Juanigna11/StockTools-React.git
cd StockTools-React

# 2. Instalar las dependencias
npm install

# 3. Levantar el servidor de desarrollo
npm run dev
```

Después abrir en el navegador la dirección que muestra la terminal (por defecto `http://localhost:5173`).

### Otros comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga automática |
| `npm run build` | Genera la versión final optimizada en la carpeta `dist/` |
| `npm run preview` | Sirve la carpeta `dist/` para probar el build |
| `npm run lint` | Revisa el código con ESLint |

---

## Páginas (rutas)

| Ruta | Página | Contenido |
|---|---|---|
| `/` | Inicio | Portada con buscador, oferta de la semana, beneficios, categorías, productos destacados, sección mayoristas y marcas |
| `/nosotros` | Nosotros | Quiénes somos, marcas, soluciones, asesoramiento y galería |
| `/productos` | Productos | Catálogo completo con buscador (`/productos?q=taladro`) |
| `/contacto` | Contacto | Formulario de consulta y datos de contacto |
| `*` | 404 | Página para direcciones que no existen |

---

## Componentes

| Componente | Descripción | Props |
|---|---|---|
| `Layout` | Estructura común: `Navbar` + página actual (`<Outlet />`) + `Footer`. También monta el carrito y el aviso | — |
| `Navbar` | Logo, menú con link activo resaltado (`NavLink`), botón del carrito con contador | — |
| `Footer` | Links de navegación y redes sociales | — |
| `ProductCard` | Card de producto: cuotas, etiqueta, favorito, precio con descuento, precio sin impuestos, chips de envío/stock, selector de cantidad y botón para agregar al carrito | `producto`, `esFavorito`, `onToggleFavorito` |
| `ProductGrid` | Grilla de `ProductCard`. Guarda qué productos son favoritos | `productos` |
| `Gallery` | Galería de imágenes con epígrafe | `imagenes` (array de `{ src, alt }`) |
| `ContactForm` | Formulario de contacto con inputs controlados (`useState`), validación propia con mensajes de error, contador de caracteres y confirmación de envío | — |
| `CartDrawer` | Panel lateral del carrito (`<dialog>`): cantidades, total, vaciar y pedido por WhatsApp | — |
| `AvisoCarrito` | Aviso flotante al agregar un producto | — |
| `ScrollToTop` | Vuelve al principio de la página al cambiar de ruta | — |

Los textos de la navegación, el catálogo y las marcas están separados en `src/data/`, así los componentes solo se encargan de mostrarlos.

---

## Funcionalidades

- **Navegación sin recargar la página** con React Router y link activo resaltado en el menú.
- **Buscador** por nombre, marca o categoría (sin importar mayúsculas ni acentos). La búsqueda queda en la URL, así que se puede recargar o compartir.
- **Favoritos** en cada card.
- **Carrito de compras** compartido por toda la app con **Context**:
  - contador en el header, panel lateral, sumar / restar / quitar / vaciar;
  - se guarda en `localStorage` (sobrevive a recargas) y se sincroniza entre pestañas;
  - **envío del pedido por WhatsApp** con el detalle y el total.
- **Formulario de contacto** con **inputs controlados**: cada campo guarda su valor en el estado con `useState` (`value` + `onChange`). Incluye:
  - validación propia con mensajes en español (campos obligatorios, formato de email, largo mínimo del teléfono y del mensaje);
  - el error de cada campo se borra mientras el usuario lo corrige;
  - contador de caracteres del mensaje;
  - mensaje de confirmación y limpieza del formulario al enviar;
  - `<label>` asociado a cada campo y `aria-invalid` para lectores de pantalla.
- **Diseño responsive** (celular, tablet y escritorio).

### Hooks de React utilizados

| Hook | Dónde | Para qué |
|---|---|---|
| `useState` | `Inicio`, `ContactForm`, `ProductCard`, `ProductGrid`, `CarritoProvider` | Buscador, formulario, cantidades, favoritos y carrito |
| `useEffect` | `CarritoProvider`, `ProductCard`, `CartDrawer`, `ScrollToTop` | Guardar en `localStorage`, temporizadores, abrir/cerrar el `<dialog>`, scroll |
| `useContext` | `useCarrito` (hook propio) | Leer el carrito desde cualquier componente |
| `useRef` | `CartDrawer` | Acceder al elemento `<dialog>` del DOM |
| `useNavigate`, `useSearchParams`, `useLocation` | `Inicio`, `Productos`, `ScrollToTop` | Navegación y búsqueda en la URL |

---

## Estructura de carpetas

```
StockTools-React/
├── public/
│   └── assets/              # Imágenes y logos
├── src/
│   ├── main.jsx             # Punto de entrada: BrowserRouter + CarritoProvider
│   ├── App.jsx              # Definición de rutas
│   ├── components/          # Componentes reutilizables
│   ├── pages/               # Una página por ruta
│   ├── context/             # Context del carrito
│   ├── hooks/               # Hooks propios (useCarrito)
│   ├── data/                # Productos, marcas, navegación y reglas de negocio
│   ├── utils/               # Funciones de precios y link de WhatsApp
│   └── styles/              # CSS general, por página y por componente
├── index.html
├── package.json
└── vite.config.js
```

---

## Versión anterior

La versión original en HTML, CSS y JavaScript está en [Juanigna11/StockTools](https://github.com/Juanigna11/StockTools).

---

Desarrollado por [@Juanigna11](https://github.com/Juanigna11) — UTN, Front End con React, 2026.
