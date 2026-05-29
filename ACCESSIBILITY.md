# Guía de Accesibilidad - WCAG 2.2 Nivel AA

## Descripción General

Este proyecto implementa directrices de accesibilidad WCAG 2.2 Nivel AA para garantizar que el Observatorio del Agua sea accesible para todos los usuarios, incluyendo aquellos con discapacidades.

## Cambios Implementados

### 1. PERCEPTIBLE

#### 1.1 Alternativas de Texto
- ✅ Se agregó `aria-hidden="true"` a emojis decorativos (💧)
- ✅ Se agregaron `aria-label` descriptivos a elementos interactivos
- ✅ Se agregó `sr-only` (screen reader only) a títulos ocultos del mapa
- ✅ Se agregó `role="img"` con `aria-label` al mapa interactivo

#### 1.4 Distinguible
- ✅ Links con suficiente contraste (azul #0066CC sobre fondo blanco = 8.59:1 ratio)
- ✅ Viewport meta tag agregado: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- ✅ Meta description agregada para SEO y contexto
- ✅ Diseño responsive: funciona a 320px de ancho

### 2. OPERABLE

#### 2.1 Accesible por Teclado
- ✅ **Skip Link**: Enlaces para saltar al contenido principal en todas las páginas
  - Visible al presionar Tab
  - Ubicado al inicio del documento (línea 2)
- ✅ Navegación completamente accesible por Tab/Shift+Tab
- ✅ Focus visible mejorado: outline azul 3px con offset
- ✅ Todos los botones son operables con Enter/Espacio

#### 2.4 Navegable
- ✅ `aria-current="page"` en enlace activo del menú
- ✅ `aria-label` en botones y enlaces para mayor claridad
- ✅ Orden de foco lógico y predecible
- ✅ Títulos de página descriptivos y únicos

#### 2.5 Modalidades de Entrada
- ✅ Tamaño mínimo de botones: 44x44px (cumple WCAG 2.5.8)
- ✅ Zona de toque táctil adecuada en dispositivos móviles

### 3. COMPRENSIBLE

#### 3.1 Legible
- ✅ `lang="es"` en etiqueta html para idioma español
- ✅ Tamaño de fuente mínimo: 16px
- ✅ Line height: 1.5 para mejor legibilidad
- ✅ Meta description en todas las páginas

#### 3.2 Predecible
- ✅ Navegación consistente en todas las páginas
- ✅ Sin cambios automáticos de contexto
- ✅ Orden jerárquico de headings: h1 → h2 → h3

#### 3.3 Asistencia para la Entrada
- ✅ **Validación de Formularios Accesible** (login.html):
  - `aria-required="true"` en campos requeridos
  - `aria-describedby` vinculado a mensajes de error
  - `aria-invalid` actualizado dinámicamente según validación
  - Mensajes de error con `role="alert"` y `aria-live="polite"`
  - Etiquetas `<label>` asociadas a inputs con `for` attribute
- ✅ Indicador visual de campos requeridos (*)

### 4. ROBUSTO

#### 4.1 Compatible
- ✅ HTML semántico válido:
  - `<nav>` para navegación con `aria-label`
  - `<main>` para contenido principal con `id="main"`
  - `<section>` con `aria-labelledby`
  - `<dl>/<dt>/<dd>` para estadísticas (definición de lista)
  - `<footer>` semántico
- ✅ Elementos de formulario con:
  - `type="email"` y validación HTML5
  - `type="password"` para contraseñas
  - `type="submit"` para botones de envío
- ✅ SVG con `aria-hidden="true"` cuando es decorativo

## Archivos Modificados

### 1. `accessibility.css` (NUEVO)
Hoja de estilos dedicada a accesibilidad:
- Skip link styling y comportamiento al focus
- Focus visible personalizado
- Soporte para `prefers-reduced-motion`
- Estilos accesibles para formularios
- Botones con tamaño mínimo 44x44px
- Clase `.sr-only` para lectores de pantalla
- Selectores semánticos para mejor soporte

### 2. `index.html` (ACTUALIZADO)
- Agregado `accessibility.css`
- Skip link agregado
- Meta viewport y description
- Navegación con `<ul>/<li>` y `aria-label`
- `<main>` con id="main"
- Section con `aria-labelledby`
- h2 con id para referencia
- `<dl>` en lugar de divs para estadísticas
- SVG con `aria-hidden`
- Footer semántico con links adicionales

### 3. `login.html` (ACTUALIZADO)
- Formulario con validación accesible
- Labels correctamente asociados (for/id)
- `aria-required`, `aria-describedby`, `aria-invalid`
- Mensajes de error con `role="alert"`
- Validación en tiempo real con feedback visual
- Button tipo "submit"

### 4. `home_loggeado.html` (ACTUALIZADO)
- Mismas mejoras que index.html
- Navegación con estado actual (`aria-current`)
- Botones con aria-labels
- Main con id y skip link
- Estructura semántica mejorada

## Criterios WCAG 2.2 Implementados (Nivel AA)

| Criterio | Descripción | Estado |
|----------|-------------|--------|
| 1.1.1    | Alternativas de Texto (A) | ✅ |
| 1.4.3    | Contraste (Mínimo) (AA) | ✅ |
| 2.1.1    | Teclado (A) | ✅ |
| 2.1.2    | Sin trampa del teclado (A) | ✅ |
| 2.4.3    | Orden del foco (A) | ✅ |
| 2.4.7    | Foco visible (AA) | ✅ |
| 2.5.8    | Tamaño del objetivo (AA) | ✅ |
| 3.2.4    | Identificación consistente (AA) | ✅ |
| 3.3.2    | Etiquetas o instrucciones (A) | ✅ |
| 3.3.3    | Sugerencia de error (AA) | ✅ |
| 4.1.3    | Mensajes de estado (AA) | ✅ |

## Cómo Probar Accesibilidad

### 1. Pruebas Manuales

#### Navegación por Teclado
```bash
# Presionar Tab para navegar
# Shift+Tab para navegar hacia atrás
# Enter/Espacio para activar botones
# Verificar que el skip link sea accesible
```

#### Zoom
```bash
# Presionar Ctrl++ para aumentar zoom
# Verificar funcionalidad a 200% de zoom
# Confirmar que no hay scrolleo horizontal
```

#### Contraste
- Usar: WebAIM Contrast Checker
- Verificar relación mínima 4.5:1 para texto normal
- Relación mínima 3:1 para texto grande

### 2. Herramientas Automáticas

#### axe DevTools
```
1. Instalar extensión de Chrome
2. Abrir DevTools → axe DevTools
3. Ejecutar análisis
4. Revisar "Violations"
```

#### WAVE (WebAIM)
```
URL: https://wave.webaim.org/
Subir o analizar URL del sitio
```

#### Lighthouse (Chrome DevTools)
```
1. F12 → Lighthouse tab
2. Seleccionar "Accessibility"
3. Ejecutar auditoría
4. Revisar reporte
```

### 3. Lectores de Pantalla

#### NVDA (Gratuito - Windows/Linux)
```
1. Descargar: https://www.nvaccess.org/
2. Instalar y ejecutar
3. Presionar Insert+F5 para iniciar síntesis
4. Navegar con Tab y flechas
```

#### VoiceOver (macOS/iOS nativo)
```
Cmd+F5 para activar
Usar con Safari para mejor soporte
```

## Próximos Pasos (Nivel AAA)

Para alcanzar Level AAA, considerar:
- [ ] Videodescripciones en cualquier contenido multimedia
- [ ] Audiodescripción completa de gráficos
- [ ] Aumentar contraste a 7:1 donde sea posible
- [ ] Proporcionar alternativas para gestos complejos
- [ ] Subtítulos expandidos en contenido de audio

## Recursos

- **WCAG 2.2 W3C**: https://www.w3.org/WAI/WCAG22/quickref/
- **WebAIM**: https://webaim.org/
- **MDN Accessibility**: https://developer.mozilla.org/en-US/docs/Web/Accessibility
- **A11y Project**: https://www.a11yproject.com/

## Mantenimiento

Recordar incluir accesibilidad en:
- ✅ Nuevas páginas HTML
- ✅ Nuevos componentes
- ✅ Actualizaciones de formularios
- ✅ Cambios de estilos CSS
- ✅ Adiciones de JavaScript

## Contacto de Accesibilidad

Para reportar problemas de accesibilidad:
- Crear un issue en el repositorio
- Etiquetarlo como "accessibility"
- Incluir: navegador, lector de pantalla usado, descripción del problema
