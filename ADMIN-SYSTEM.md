# Sistema de Validadores y Administradores

## 📋 Descripción General

El sistema tiene 3 roles principales:

- **user**: Usuario normal (rol por defecto)
- **admin**: Administrador (puede aprobar solicitudes de otros admins)
- **validator**: (Reservado para futuro uso - actualmente usa admin)

## 🔐 ¿Cómo funciona el flujo?

### 1. Solicitud de Admin por un Usuario Regular

Cuando un usuario se registra y solicita ser admin:

```json
POST /api/users
{
  "email": "nuevo@gmail.com",
  "password": "contraseña123",
  "name": "Juan Pérez",
  "role": "user",
  "requestedRole": "admin"
}
```

**Resultado en BD:**
- `role`: "user" (rol actual)
- `requestedRole`: "admin" (lo que solicita)
- `status`: "pending" (en espera de aprobación)

### 2. Aprobación por un Admin

Un administrador aprueba la solicitud:

```bash
PATCH /api/users/{userId}/approve-admin
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

(el endpoint captura automáticamente el email del JWT)
```

**Resultado en BD:**
- `role`: "admin" (ahora es admin)
- `status`: "active"
- `approvedBy`: "email@del@admin.com"
- `approvedAt`: "2026-05-28T22:42:10Z"

### 3. Rechazo de Solicitud

Un administrador rechaza la solicitud:

```bash
PATCH /api/users/{userId}/reject-admin
Authorization: Bearer <JWT_TOKEN>
```

**Resultado en BD:**
- `role`: "user" (se mantiene)
- `status`: "rejected"

---

## 🚀 Configuración Inicial

### Paso 1: Crear el Primer Admin (ruizzfelipe5@gmail.com)

Solo corre una sola vez cuando no hay admins:

```bash
cd backend
npx ts-node scripts/create-first-admin.ts
```

**Ingresa:**
- Email: `ruizzfelipe5@gmail.com`
- Contraseña: (tu contraseña segura)

### Paso 2: Loguear con ese Admin

```bash
POST /api/auth/login
{
  "email": "ruizzfelipe5@gmail.com",
  "password": "tu_contraseña"
}
```

**Respuesta:**
```json
{
  "message": "Login correcto",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "ruizzfelipe5@gmail.com",
    "role": "admin"
  },
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Paso 3: Usar el Token para Aprobar Admins

```bash
PATCH /api/users/{userId}/approve-admin
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🛡️ Protecciones de Seguridad

### ✅ Ya implementadas:

1. **Solo admins pueden aprobar admins**
   - El endpoint `/api/users/{id}/approve-admin` requiere JWT
   - Verifica que `req.user.role === 'admin'`
   - Respuesta si no eres admin: `403 Forbidden`

2. **El email del validador se captura automáticamente**
   - No confías en lo que envía el cliente
   - Se usa `req.user.email` del JWT (confiable)
   - Registra automáticamente quién aprobó

3. **Solo un admin puede eliminar usuarios**
   - Todos los DELETE requieren JWT + rol admin

4. **Protección en el primer admin**
   - El script `/create-first-admin.ts` verifica que no haya admins
   - No se puede duplicar accidentalmente

### ⚠️ Mejoras futuras:

- [ ] Límite de rate limiting en endpoints sensibles
- [ ] Registro de auditoría (quien, qué, cuándo)
- [ ] Cambio de rol requiere confirmación por email
- [ ] Notificación cuando se aprueba/rechaza una solicitud

---

## 📝 Flujo Completo - Ejemplo

### Día 1: Configuración Inicial

```bash
# 1. Crear primer admin
npx ts-node scripts/create-first-admin.ts
# Input:
# 📧 Email del admin: ruizzfelipe5@gmail.com
# 🔑 Contraseña: MiContraseñaSegura123!

# Respuesta: ✅ Administrador creado exitosamente!
```

### Día 2: Un usuario solicita ser admin

Usuario se registra con `requestedRole: "admin"`:

```bash
# Frontend: formulario de registro
POST /api/users
{
  "email": "maria@gmail.com",
  "password": "password123",
  "name": "María García",
  "requestedRole": "admin"
}

# Respuesta:
{
  "_id": "507f1f77bcf86cd799439012",
  "email": "maria@gmail.com",
  "name": "María García",
  "role": "user",
  "requestedRole": "admin",
  "status": "pending",
  "createdAt": "2026-05-28T23:00:00Z"
}
```

### Día 3: Admin aprueba la solicitud

```bash
# Felipe (admin) logueado:
POST /api/auth/login
{
  "email": "ruizzfelipe5@gmail.com",
  "password": "MiContraseñaSegura123!"
}

# Respuesta: { "access_token": "eyJ..." }

# Felipe aprueba a María:
PATCH /api/users/507f1f77bcf86cd799439012/approve-admin
Authorization: Bearer eyJ...
{}

# Respuesta:
{
  "_id": "507f1f77bcf86cd799439012",
  "email": "maria@gmail.com",
  "role": "admin",           # Ahora es admin!
  "requestedRole": "admin",
  "status": "active",         # Activo!
  "approvedBy": "ruizzfelipe5@gmail.com",
  "approvedAt": "2026-05-28T23:30:00Z"
}
```

---

## 🔑 Variables de Entorno Requeridas

En `.env`:

```env
MONGODB_URI=mongodb+srv://...
JWT_SECRET=tu_clave_secreta_muy_larga_y_aleatoria
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

---

## 🐛 Troubleshooting

### "Ya existe un administrador"
- Script dice que no puedes crear otro primer admin
- **Solución**: Esto es correcto. El endpoint es solo para creación inicial.
- Para agregar más admins, usa el flujo normal: usuario se registra → admin aprueba

### "Solo administradores pueden aprobar"
- Error: `403 Forbidden`
- **Solución**: Tu JWT no tiene rol admin. Logueate como admin primero.

### "JWT token inválido"
- Error: `401 Unauthorized`
- **Solución**: Token expiró o es inválido. Logueate nuevamente.

---

## 📊 Endpoints Resumidos

| Método | Endpoint | Requiere Auth | Requiere Admin | Descripción |
|--------|----------|---------------|----------------|-------------|
| POST | `/api/users` | ❌ | ❌ | Crear usuario |
| POST | `/api/users/admin/promote-first` | ❌ | ❌ | Crear primer admin (solo si no hay) |
| GET | `/api/users` | ❌ | ❌ | Listar usuarios (pendiente: solo admin) |
| GET | `/api/users/:id` | ❌ | ❌ | Ver usuario específico |
| PATCH | `/api/users/:id/approve-admin` | ✅ | ✅ | Aprobar solicitud admin |
| PATCH | `/api/users/:id/reject-admin` | ✅ | ✅ | Rechazar solicitud admin |
| DELETE | `/api/users/:id` | ✅ | ✅ | Eliminar usuario |
| POST | `/api/auth/login` | ❌ | ❌ | Login con email/password |

---

## 👤 Usuario Validador

**Email:** ruizzfelipe5@gmail.com

Este es el único usuario que puede:
- ✅ Aprobar nuevas solicitudes de admin
- ✅ Rechazar solicitudes de admin
- ✅ Eliminar usuarios
- ✅ Crear otros admins (en el futuro)

---

## 📞 Contacto/Soporte

Si tienes problemas:
1. Verifica que ruizzfelipe5@gmail.com está logueado
2. Verifica que el JWT_SECRET no cambió
3. Verifica que MongoDB está conectado
4. Revisa los logs del backend: `npm run start:dev`
