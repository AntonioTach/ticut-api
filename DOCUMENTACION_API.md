# 📚 Documentación de la API - Ticut

## 🚀 Descripción General

Ticut es una API REST para la gestión de barberías que permite administrar usuarios, barberos, servicios, clientes y citas. La API está construida con NestJS y utiliza Prisma como ORM.

## 🔗 Acceso a la Documentación

Una vez que la aplicación esté ejecutándose, puedes acceder a la documentación interactiva de Swagger en:

```
http://localhost:4000/api
```

## 🔐 Autenticación

La API utiliza autenticación JWT (JSON Web Tokens). Para acceder a los endpoints protegidos:

1. **Registrarse**: `POST /auth/register`
2. **Iniciar sesión**: `POST /auth/login`
3. **Usar el token**: Incluir el token en el header `Authorization: Bearer <token>`

### Ejemplo de uso del token en Swagger:
1. Ve a la documentación de Swagger
2. Haz clic en el botón "Authorize" (🔒)
3. Ingresa tu token JWT en el formato: `Bearer <tu-token>`
4. Haz clic en "Authorize"

## 📋 Módulos Disponibles

### 🔐 Auth (Autenticación)
- **Registro**: `POST /auth/register`
- **Login**: `POST /auth/login`
- **Verificar token**: `GET /auth/verify`

### 👥 Users (Usuarios)
- **Listar usuarios**: `GET /users`
- **Obtener usuario**: `GET /users/:id`
- **Actualizar usuario**: `PATCH /users/:id`
- **Eliminar usuario**: `DELETE /users/:id`

### ✂️ Barbers (Barberos)
- **Listar barberos**: `GET /barbers`
- **Obtener barbero**: `GET /barbers/:id`
- **Crear barbero**: `POST /barbers`
- **Actualizar barbero**: `PATCH /barbers/:id`
- **Eliminar barbero**: `DELETE /barbers/:id`

### 🛠️ Services (Servicios)
- **Listar servicios**: `GET /services`
- **Obtener servicio**: `GET /services/:id`
- **Crear servicio**: `POST /services`
- **Actualizar servicio**: `PATCH /services/:id`
- **Eliminar servicio**: `DELETE /services/:id`

### 👤 Clients (Clientes)
- **Listar clientes**: `GET /clients`
- **Obtener cliente**: `GET /clients/:id`
- **Crear cliente**: `POST /clients`
- **Actualizar cliente**: `PATCH /clients/:id`
- **Eliminar cliente**: `DELETE /clients/:id`
- **Buscar por teléfono**: `GET /clients/search/phone/:phone`
- **Buscar por email**: `GET /clients/search/email/:email`

## 🏗️ Estructura de Respuestas

### Respuesta Exitosa (200/201)
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "Juan",
  "lastname": "Pérez",
  "phone": "1234567890",
  "email": "juan@example.com",
  "notes": "Cliente preferido"
}
```

### Respuesta de Error (4xx/5xx)
```json
{
  "statusCode": 400,
  "message": "Datos inválidos",
  "error": "Bad Request"
}
```

## 🔒 Roles y Permisos

### Roles Disponibles:
- **ADMIN**: Acceso completo a todos los módulos
- **BARBER**: Acceso limitado a módulos específicos
- **USER**: Acceso básico

### Matriz de Permisos:

| Endpoint | ADMIN | BARBER | USER |
|----------|-------|--------|------|
| `/auth/*` | ✅ | ✅ | ✅ |
| `/users/*` | ✅ | ❌ | ❌ |
| `/barbers/*` | ✅ | ✅ | ❌ |
| `/services/*` | ✅ | ✅ | ❌ |
| `/clients/*` | ✅ | ✅ | ❌ |

## 📝 Ejemplos de Uso

### 1. Crear un Cliente
```bash
curl -X POST http://localhost:4000/clients \
  -H "Authorization: Bearer <tu-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan",
    "lastname": "Pérez",
    "phone": "1234567890",
    "email": "juan@example.com",
    "notes": "Cliente preferido"
  }'
```

### 2. Obtener Todos los Clientes
```bash
curl -X GET http://localhost:4000/clients \
  -H "Authorization: Bearer <tu-token>"
```

### 3. Buscar Cliente por Teléfono
```bash
curl -X GET http://localhost:4000/clients/search/phone/1234567890 \
  -H "Authorization: Bearer <tu-token>"
```

## 🛠️ Configuración de Desarrollo

### Instalar Dependencias
```bash
pnpm install
```

### Configurar Base de Datos
```bash
# Generar cliente de Prisma
npx prisma generate

# Ejecutar migraciones
npx prisma migrate dev

# Sembrar datos (opcional)
npx prisma db seed
```

### Ejecutar en Desarrollo
```bash
pnpm run start:dev
```

### Ejecutar Pruebas
```bash
# Pruebas unitarias
pnpm run test

# Pruebas e2e
pnpm run test:e2e

# Cobertura de pruebas
pnpm run test:cov
```

## 📊 Códigos de Estado HTTP

| Código | Descripción |
|--------|-------------|
| 200 | OK - Solicitud exitosa |
| 201 | Created - Recurso creado |
| 204 | No Content - Sin contenido |
| 400 | Bad Request - Datos inválidos |
| 401 | Unauthorized - No autorizado |
| 403 | Forbidden - Prohibido |
| 404 | Not Found - No encontrado |
| 500 | Internal Server Error - Error interno |

## 🔧 Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Base de datos
DATABASE_URL="postgresql://usuario:password@localhost:5432/ticut"

# JWT
JWT_SECRET="tu-secreto-jwt-super-seguro"
JWT_EXPIRES_IN="24h"

# Puerto de la aplicación
PORT=4000
```

## 📚 Recursos Adicionales

- [Documentación de NestJS](https://docs.nestjs.com/)
- [Documentación de Prisma](https://www.prisma.io/docs/)
- [Documentación de Swagger](https://swagger.io/docs/)
- [Guía de JWT](https://jwt.io/introduction)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles. 