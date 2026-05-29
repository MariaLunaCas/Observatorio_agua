# Checklist WCAG 2.2 - Aplicar a Todos los HTML

## Paso 1: Head (Copiar y pegar)
```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="[Descripción clara de la página]">
  <title>[Título descriptivo y único]</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="accessibility.css">
</head>
```

## Paso 2: Body Opening (Copiar y pegar)
```html
<body>
  <!-- Skip Link - OBLIGATORIO EN TODAS LAS PÁGINAS -->
  <a href="#main" class="skip-link">Saltar al contenido principal</a>

  <!-- RESTO DEL CONTENIDO -->
```

## Paso 3: Navegación
```html
<!-- INCORRECTO -->
<nav>
  <div class="space-x-6">
    <a href="/">Home</a>
    <a href="/about">About</a>
  </div>
</nav>

<!-- CORRECTO -->
<nav aria-label="Navegación principal">
  <ul class="space-x-6 flex">
    <li><a href="/" aria-current="page">Home</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>
```

## Paso 4: Contenido Principal
```html
<!-- INCORRECTO -->
<section>
  <h2>Mi sección</h2>
  ...
</section>

<!-- CORRECTO -->
<main id="main">
  <section aria-labelledby="section-title">
    <h2 id="section-title">Mi sección</h2>
    ...
  </section>
</main>
```

## Paso 5: Botones y Enlaces
```html
<!-- INCORRECTO -->
<button onclick="doSomething()">Click</button>
<a href="#" onclick="doSomething()">Click</a>

<!-- CORRECTO -->
<button type="button" aria-label="Describir qué hace">Click</button>
<a href="/page" aria-label="Descripción clara">Click</a>
```

## Paso 6: Formularios
```html
<!-- INCORRECTO -->
<input type="text" placeholder="Nombre">

<!-- CORRECTO -->
<label for="nombre">Nombre <span aria-label="requerido">*</span></label>
<input 
  id="nombre" 
  type="text" 
  required
  aria-required="true"
  aria-describedby="nombre-error">
<div id="nombre-error" class="error-message" role="alert"></div>
```

## Paso 7: Imágenes y Gráficos
```html
<!-- INCORRECTO - Decorativa -->
<img src="decoration.png">

<!-- CORRECTO - Decorativa -->
<img src="decoration.png" alt="" aria-hidden="true">

<!-- INCORRECTO - Informativa -->
<img src="chart.png">

<!-- CORRECTO - Informativa -->
<img src="chart.png" alt="Gráfico de aumento de reportes: enero 100, febrero 150, marzo 200">
```

## Paso 8: Estadísticas/Datos
```html
<!-- INCORRECTO -->
<div class="grid grid-cols-2">
  <div>
    <h3>100</h3>
    <p>Reportes</p>
  </div>
</div>

<!-- CORRECTO -->
<dl class="grid grid-cols-2">
  <div>
    <dt>100</dt>
    <dd>Reportes</dd>
  </div>
</dl>
```

## Paso 9: Emojis y Símbolos
```html
<!-- INCORRECTO -->
<div>💧 Agua limpia</div>

<!-- CORRECTO -->
<div>
  <span aria-hidden="true">💧</span>
  <span>Agua limpia</span>
</div>

<!-- O SI ES SOLO DECORACIÓN -->
<div aria-hidden="true">💧</div>
```

## Paso 10: Footer
```html
<!-- INCORRECTO -->
<div class="footer">
  <h4>© 2023 Company. All rights reserved.</h4>
</div>

<!-- CORRECTO -->
<footer>
  <p>© 2023 Company. All rights reserved.</p>
  <p>
    <a href="/privacy">Privacy Policy</a> | 
    <a href="/terms">Terms of Service</a> | 
    <a href="/accessibility">Accessibility Statement</a>
  </p>
</footer>
```

## Aplicar a Estos Archivos

- [ ] `registro.html` - Formulario de registro
- [ ] `perfil.html` - Página de perfil
- [ ] `descripcion.html` - Descripción de reporte
- [ ] `mapa.html` - Página del mapa
- [ ] `reportes.html` - Lista de reportes
- [ ] `validar-reporte-*.html` - Validación de reportes (x5)
- [ ] `evidencia.html` - Página de evidencia
- [ ] `ubicacion.html` - Página de ubicación
- [ ] `clasificacion.html` - Clasificación
- [ ] `Recuperarcontraseña.html` - Recuperar contraseña
- [ ] `verificarcorreo.html` - Verificar correo
- [ ] `home_admin.html` - Panel de administrador

## Color Contrast Checker

Verificar estos colores tienen ratio 4.5:1 o superior:

```
✅ Texto oscuro (#1F2937) sobre blanco: 12.6:1
✅ Texto azul (#0066CC) sobre blanco: 8.59:1
✅ Texto gris (#6B7280) sobre blanco: 6.84:1

⚠️  Revisar: Textos sobre fondos gradiente
⚠️  Revisar: Cualquier color sobre color
```

## Focus Style Test

Presionar Tab en la página y verificar:
- ✅ Outline azul visible en TODOS los elementos interactivos
- ✅ Outline no desaparece bajo otros elementos
- ✅ Outline tiene suficiente contraste (3:1)
- ✅ Outline tiene offset de al menos 2px

## Validación HTML

```bash
# Usar W3C Validator
https://validator.w3.org/

# Pegar HTML
# Verificar que NO haya "Error" (warnings son OK)
```

## Herramientas Recomendadas

1. **axe DevTools** - Chrome Extension
2. **WAVE** - https://wave.webaim.org/
3. **Lighthouse** - DevTools nativo de Chrome
4. **NVDA** - Lector de pantalla gratuito

## Testing Workflow

1. **Navegación por Teclado**
   - [ ] Tab: navegar hacia adelante
   - [ ] Shift+Tab: navegar hacia atrás
   - [ ] Enter: activar botones/links
   - [ ] Espacio: toggle checkboxes

2. **Lectura de Pantalla (NVDA)**
   - [ ] Títulos anunciados correctamente
   - [ ] Links tienen contexto claro
   - [ ] Formularios tienen labels
   - [ ] Errores son anunciados

3. **Zoom 200%**
   - [ ] No hay scrolleo horizontal
   - [ ] Todos los elementos visibles
   - [ ] Layout se adapta

4. **Zoom 200% + Zoom navegador 125%**
   - [ ] Sin scrolleo horizontal
   - [ ] Texto legible

## CSS Classes para Accesibilidad

Disponibles en `accessibility.css`:

```css
.skip-link           /* Skip link styling */
.sr-only            /* Screen reader only - oculto visualmente */
.error-message      /* Mensaje de error accesible */
```

## Atributos ARIA Clave

```html
aria-label="Descripción"           <!-- Para elementos sin texto visible -->
aria-labelledby="id"               <!-- Para vincular a título -->
aria-describedby="id"              <!-- Para vincular a descripción -->
aria-current="page"                <!-- Para enlace activo -->
aria-required="true"               <!-- Para campos requeridos -->
aria-invalid="true|false"          <!-- Para validación -->
aria-hidden="true"                 <!-- Para elementos decorativos -->
aria-live="polite|assertive"       <!-- Para cambios dinámicos -->
role="alert"                       <!-- Para mensajes importantes -->
```

## Preguntas de Validación

Antes de deployar, responder:

- [ ] ¿Todos los inputs tienen labels?
- [ ] ¿Todos los botones tienen texto o aria-label?
- [ ] ¿Todos los links tienen contexto claro?
- [ ] ¿La página es navegable solo con Tab?
- [ ] ¿El foco es visible en todos los elementos?
- [ ] ¿Los títulos están correctamente jerarquizados?
- [ ] ¿Las imágenes tienen alt text?
- [ ] ¿El contraste cumple 4.5:1?
- [ ] ¿HTML es válido (sin errores)?
- [ ] ¿La página funciona a 200% zoom?

## Soporte

Revisar: `ACCESSIBILITY.md` para más detalles
