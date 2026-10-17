# CV Interactivo · Brenett Eichentopf Sanchez

Landing page de CV / portafolio profesional desarrollada para la asignatura **Tecnologías Web I (SIS-214)**, Unidad II: *Desarrollo de Interfaces Dinámicas con JavaScript*, de la Universidad Católica Boliviana "San Pablo".

- **Repositorio:** https://github.com/HelpyBren/SIS214_ExamenPractico2_EichentopfBrenett
- **Producción (GitHub Pages):** https://helpybren.github.io/SIS214_ExamenPractico2_EichentopfBrenett/


## Tecnologías utilizadas

- **HTML5 semántico** con atributos WAI-ARIA.
- **CSS3**: custom properties (tokens), Flexbox, CSS Grid, Media Queries mobile-first.
- **JavaScript ES6+** nativo (sin librerías ni frameworks), organizado en módulos independientes.
- **Git y GitHub**, con despliegue en **GitHub Pages**.
- **API REST pública de GitHub** (`https://api.github.com/users/{usuario}/repos`).

## Estructura del proyecto

```
.
├── index.html            # Inicio
├── formacion.html        # Formación académica (timeline + aside)
├── habilidades.html      # Habilidades + buscador en tiempo real
├── experiencia.html      # Proyectos + repositorios desde la API de GitHub
├── contacto.html         # Formulario de contacto validado
├── css/
│   └── style.css         # Tokens, reset, layout y media queries
├── js/
│   ├── theme.js          # Modo claro/oscuro persistente
│   ├── menu.js           # Menú hamburguesa responsivo
│   ├── filtro.js         # Filtro dinámico de habilidades
│   ├── validacion.js     # Validación del formulario
│   └── github.js         # Consumo asíncrono de la API de GitHub
├── assets/images/        # Imágenes del sitio
└── README.md
```

## Arquitectura de la solución

### HTML y accesibilidad
- Se usan `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>` y `<footer>`, sin contenedores `<div>` innecesarios.
- Jerarquía de encabezados sin saltos (`h1 → h2 → h3`) y enlace "Saltar al contenido".
- ARIA: `aria-expanded` y `aria-controls` en el menú, `aria-pressed` en el conmutador de tema, `aria-current="page"` en la navegación, `aria-live`/`role="status"` en mensajes dinámicos y `aria-invalid`/`aria-describedby` en el formulario.

### CSS
- **Tokens** en `:root` (colores, tipografías, espaciado) y **reset universal** (`* { box-sizing: border-box; margin: 0; padding: 0; }`).
- **Mobile-first** con tres rangos:
  | Rango | Ancho | Implementación |
  |-------|-------|----------------|
  | Móvil | < 768px | Estilos base |
  | Tablet | 768px – 1024px | `@media (min-width: 768px) and (max-width: 1024px)` |
  | Escritorio | > 1024px | `@media (min-width: 1025px)` |
- Los rangos de tablet y escritorio no se solapan, por lo que el layout de contenido (foto flotante, grids) se declara en ambos.
- **Flexbox** para header, navegación, etiquetas y botones; **Grid** para las tarjetas de proyectos y repositorios.
- Tema oscuro mediante `:root[data-theme='dark']`, que redefine los tokens.

### JavaScript (5 funcionalidades)

| Módulo | Qué hace | Puntos clave |
|--------|----------|--------------|
| `theme.js` | Alterna claro/oscuro sobre `<html>` | `localStorage` + `JSON.stringify()` / `JSON.parse()`; se carga en `<head>` para evitar parpadeo |
| `menu.js` | Menú hamburguesa en móvil y tablet | Evento `click`, clase `is-open`, mutación de `aria-expanded`; cierra con `Escape` |
| `filtro.js` | Buscador de habilidades en tiempo real | Datos originales congelados con `Object.freeze`; tubería `.filter().map()`; ignora tildes |
| `validacion.js` | Formulario de contacto | `event.preventDefault()`, validación con evento `input`, Constraint Validation API, mensajes de error/éxito |
| `github.js` | Repositorios desde la API de GitHub | `fetch` + `async/await`, `try/catch`, `response.ok`, manejo de 400/403/404/5xx, estados loading/success/error |

Seguridad: los datos recibidos de la API se insertan con `textContent` (nunca con `innerHTML`).

## Ejecución local

No requiere instalación ni dependencias.

```bash
git clone https://github.com/HelpyBren/SIS214_ExamenPractico2_EichentopfBrenett.git
cd SIS214_ExamenPractico2_EichentopfBrenett

# Opción 1: abrir index.html directamente en el navegador
# Opción 2 (recomendada): servidor local
python -m http.server 8000
# luego visitar http://localhost:8000
```

## Despliegue

El sitio se publica con **GitHub Pages** desde la rama `main` (Settings → Pages → *Deploy from a branch* → `main` / root). Todas las rutas son relativas, por lo que funcionan bajo la subruta del repositorio.

## Convenciones de commits

Se utilizan mensajes descriptivos tipo *Conventional Commits*, por ejemplo: `feat: agrega menú hamburguesa`, `fix: corrige validación de correo`, `docs: actualiza README`.

## Autor

**Brenett Eichentopf Sanchez** — Ingeniería de Sistemas, UCB "San Pablo".
