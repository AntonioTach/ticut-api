# Configuración de Swagger - API Ticut

## Resumen

Se ha configurado Swagger para todos los módulos existentes en la aplicación NestJS. La documentación está disponible en `http://localhost:4000/api` cuando la aplicación esté ejecutándose.

## Módulos Configurados

### 1. Auth Module (`/auth`)
- **Tag**: `auth`
- **Endpoints**:
  - `POST /auth/register` - Registrar nuevo usuario
  - `POST /auth/login` - Iniciar sesión
  - `GET /auth/profile` - Obtener perfil (requiere autenticación)
  - `GET /auth/test` - Prueba del módulo

### 2. Users Module (`/users`)
- **Tag**: `users`
- **Autenticación**: JWT Bearer Token
- **Roles**: ADMIN
- **Endpoints**:
  - `POST /users` - Crear usuario (solo ADMIN)
  - `GET /users` - Obtener todos los usuarios (solo ADMIN)
  - `GET /users/:id` - Obtener usuario por ID (solo ADMIN)
  - `PATCH /users/:id` - Actualizar usuario (solo ADMIN)
  - `DELETE /users/:id` - Eliminar usuario (solo ADMIN)

### 3. Barbers Module (`/barbers`)
- **Tag**: `barbers`
- **Autenticación**: JWT Bearer Token
- **Roles**: ADMIN, BARBER
- **Endpoints**:
  - `POST /barbers` - Crear barbero (solo ADMIN)
  - `GET /barbers` - Obtener todos los barberos (ADMIN, BARBER)
  - `GET /barbers/:id` - Obtener barbero por ID (ADMIN, BARBER)
  - `PATCH /barbers/:id` - Actualizar barbero (solo ADMIN)
  - `DELETE /barbers/:id` - Eliminar barbero (solo ADMIN)

### 4. Services Module (`/services`)
- **Tag**: `services`
- **Autenticación**: JWT Bearer Token (excepto endpoints públicos)
- **Roles**: ADMIN, BARBER
- **Endpoints**:
  - `POST /services` - Crear servicio (ADMIN, BARBER)
  - `GET /services` - Obtener todos los servicios (público)
  - `GET /services/barbershop/:barbershopId` - Servicios por barbería (público)
  - `GET /services/:id` - Obtener servicio por ID (público)
  - `PATCH /services/:id` - Actualizar servicio (ADMIN, BARBER)
  - `PATCH /services/:id/toggle-active` - Activar/desactivar servicio (ADMIN, BARBER)
  - `DELETE /services/:id` - Eliminar servicio (ADMIN, BARBER)
  - `GET /services/admin/test` - Prueba del módulo (público)

### 5. Clients Module (`/clients`)
- **Tag**: `clients`
- **Autenticación**: JWT Bearer Token
- **Roles**: ADMIN, BARBER
- **Endpoints**:
  - `POST /clients` - Crear cliente (ADMIN, BARBER)
  - `GET /clients` - Obtener todos los clientes (ADMIN, BARBER)
  - `GET /clients/:id` - Obtener cliente por ID (ADMIN, BARBER)
  - `PATCH /clients/:id` - Actualizar cliente (ADMIN, BARBER)
  - `DELETE /clients/:id` - Eliminar cliente (ADMIN, BARBER)
  - `GET /clients/search/phone/:phone` - Buscar por teléfono (ADMIN, BARBER)
  - `GET /clients/search/email/:email` - Buscar por email (ADMIN, BARBER)

### 6. App Module (`/`)
- **Tag**: `app`
- **Endpoints**:
  - `GET /` - Endpoint principal de bienvenida

## DTOs Documentados

### Auth Module
- `LoginDto` - Credenciales de login
- `RegisterDto` - Datos de registro
- `LoginResponseDto` - Respuesta de login
- `UserInfoDto` - Información del usuario

### Users Module
- `CreateUserDto` - Crear usuario
- `UpdateUserDto` - Actualizar usuario
- `User` - Entidad de usuario

### Barbers Module
- `CreateBarberDto` - Crear barbero
- `UpdateBarberDto` - Actualizar barbero
- `Barber` - Entidad de barbero

### Services Module
- `CreateServiceDto` - Crear servicio
- `UpdateServiceDto` - Actualizar servicio
- `Service` - Entidad de servicio

### Clients Module
- `CreateClientDto` - Crear cliente
- `UpdateClientDto` - Actualizar cliente
- `Client` - Entidad de cliente

## Características de la Documentación

### Autenticación
- **Tipo**: Bearer Token (JWT)
- **Nombre**: JWT-auth
- **Descripción**: Enter JWT token
- **Ubicación**: Header

### Respuestas Estándar
- **200**: Operación exitosa
- **201**: Recurso creado exitosamente
- **204**: Recurso eliminado exitosamente
- **400**: Datos inválidos
- **401**: No autorizado
- **403**: Acceso denegado
- **404**: Recurso no encontrado

### Ejemplos
- Todos los DTOs incluyen ejemplos de datos
- Los parámetros de ruta incluyen ejemplos de UUIDs
- Las respuestas incluyen ejemplos de datos

### Validaciones
- Todas las validaciones de class-validator están documentadas
- Se incluyen restricciones como `minLength`, `minimum`, etc.
- Los campos opcionales están marcados como `ApiPropertyOptional`

## Configuración en main.ts

```typescript
const config = new DocumentBuilder()
  .setTitle('Ticut API')
  .setDescription('API para gestión de barberías')
  .setVersion('1.0')
  .addTag('auth', 'Autenticación y autorización')
  .addTag('users', 'Gestión de usuarios')
  .addTag('barbers', 'Gestión de barberos')
  .addTag('services', 'Gestión de servicios')
  .addTag('clients', 'Gestión de clientes')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    },
    'JWT-auth',
  )
  .build();
```

## Uso

1. Iniciar la aplicación: `npm run start:dev`
2. Abrir el navegador en: `http://localhost:4000/api`
3. Explorar la documentación interactiva
4. Probar los endpoints directamente desde Swagger UI
5. Autenticarse usando el botón "Authorize" con el token JWT

## Notas Importantes

- Todos los endpoints están protegidos por autenticación JWT excepto los marcados como `@Public()`
- Los roles están configurados usando el decorador `@Roles()`
- La documentación incluye ejemplos realistas para facilitar las pruebas
- Se mantiene la consistencia en el formato y estructura de la documentación 