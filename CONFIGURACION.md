# Configuración del Proyecto Ticut

## 🚀 Instalación y Configuración

### 1. Instalar Dependencias
```bash
pnpm install
```

### 2. Configurar Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# ============================================================================
# 🔧 CONFIGURACIÓN GENERAL
# ============================================================================
PORT=3000
NODE_ENV=development
ADMIN_URL=http://localhost:3001

# ============================================================================
# 🗄️ BASE DE DATOS
# ============================================================================
DATABASE_URL="postgresql://username:password@localhost:5432/ticut_db?schema=public"

# ============================================================================
# 🔐 JWT
# ============================================================================
JWT_SECRET_KEY=your-super-secret-jwt-key-here
JWT_EXPIRES=24h

# ============================================================================
# 📧 EMAIL
# ============================================================================
MAIL_FROM=noreply@ticut.com
MAIL_HOST=smtp.gmail.com
MAIL_USER=your-email@gmail.com
MAIL_PORT=587
MAIL_SECURE=false
MAIL_AUTH_USER=your-email@gmail.com
MAIL_AUTH_PASS=your-app-password

# ============================================================================
# ☁️ AWS S3 (Opcional)
# ============================================================================
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_S3_REGION=us-east-1
BUCKET_NAME=ticut-uploads
```

### 3. Configurar Base de Datos
```bash
# Generar el cliente de Prisma
npx prisma generate

# Ejecutar migraciones
npx prisma migrate dev

# Poblar la base de datos con datos de prueba
pnpm run seed
```

### 4. Ejecutar el Proyecto
```bash
# Desarrollo
pnpm run start:dev

# Producción
pnpm run build
pnpm run start
```

## 📋 Endpoints Disponibles

### 🔐 Autenticación
- `POST /auth/register` - Registrar nuevo usuario
- `POST /auth/login` - Iniciar sesión
- `GET /auth/profile` - Obtener perfil del usuario (requiere autenticación)
- `GET /auth/test` - Test del módulo de autenticación

### 👥 Usuarios
- `GET /users` - Obtener todos los usuarios
- `POST /users` - Crear nuevo usuario
- `GET /users/:id` - Obtener usuario por ID
- `PATCH /users/:id` - Actualizar usuario
- `DELETE /users/:id` - Eliminar usuario

### ✂️ Barberos
- `GET /barbers` - Obtener todos los barberos
- `POST /barbers` - Crear nuevo barbero
- `GET /barbers/:id` - Obtener barbero por ID
- `PATCH /barbers/:id` - Actualizar barbero
- `DELETE /barbers/:id` - Eliminar barbero

## 🔧 Características Implementadas

### ✅ Seguridad
- Autenticación JWT
- Hash de contraseñas con bcrypt
- Control de roles
- Rutas públicas/protegidas
- Validación de datos con class-validator

### ✅ Arquitectura
- Módulos independientes
- Servicios compartidos
- Configuración global
- Manejo de errores centralizado
- Interceptores de logging y transformación

### ✅ Base de Datos
- Integración con Prisma
- Relaciones correctas
- Queries optimizadas
- Migraciones automáticas

## 🎯 Próximos Pasos

1. **Configurar email real** con Nodemailer o SendGrid
2. **Implementar subida de archivos** con AWS S3
3. **Crear módulos adicionales**:
   - Barbershops
   - Appointments
   - Services
   - Clients
4. **Implementar notificaciones** en tiempo real
5. **Agregar reportes y analytics**

## 📝 Notas Importantes

- Los **barberos** son usuarios con `roleId: 2`
- Los **usuarios normales** tienen `roleId: 1`
- Los **admins** tendrán `roleId: 3` (a implementar)
- Todas las rutas están protegidas por defecto excepto las marcadas con `@Public()`
- Los tokens JWT expiran en 24 horas por defecto 