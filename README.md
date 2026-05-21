# Ticut — Barbershop SaaS API

Backend REST API para la plataforma Ticut, construida con NestJS, Prisma y PostgreSQL.

## Requisitos

- Node.js 20+
- pnpm
- PostgreSQL

## Instalación

```bash
pnpm install
```

## Variables de entorno

Copia `.env.example` a `.env` y completa los valores:

```bash
cp .env.example .env
```

| Variable         | Descripción                      |
|------------------|----------------------------------|
| `DATABASE_URL`   | Connection string de PostgreSQL  |
| `JWT_SECRET_KEY` | Clave secreta para firmar tokens |
| `JWT_EXPIRES`    | Duración del token (ej. `24h`)   |

## Base de datos

### Primer setup

```bash
pnpm db:migrate   # genera y aplica migraciones
pnpm db:seed      # carga datos iniciales
```

### Migraciones

| Comando                    | Cuándo usarlo                                              |
|----------------------------|------------------------------------------------------------|
| `pnpm db:migrate`          | Desarrollo: genera el SQL y aplica el cambio              |
| `pnpm db:migrate:deploy`   | Producción: aplica migraciones pendientes sin generar nuevas |
| `pnpm db:push`             | Prototipado rápido: sincroniza sin historial (destructivo) |
| `npx prisma migrate reset` | Resetea la DB completa y re-corre los seeds (solo dev)    |

> Cada vez que modifiques `schema.prisma` debes correr `pnpm db:migrate` para que el cambio se refleje en la DB.

### Seeds

Carga los datos estáticos mínimos para que la app funcione. Usa `upsert`, por lo que es seguro correrlo múltiples veces.

```bash
pnpm db:seed
```

| Entidad                | Datos                                                        |
|------------------------|--------------------------------------------------------------|
| `roles`                | SUPER_ADMIN (id: 1), OWNER (id: 2), BARBER (id: 3)          |
| `plans`                | Basic ($29.99), Professional ($59.99), Enterprise ($99.99)  |
| `appointment_statuses` | Scheduled, In Progress, Completed, Cancelled, No Show       |

### Prisma Studio

Interfaz visual para inspeccionar y editar datos directamente:

```bash
pnpm db:studio
# Abre en http://localhost:5555
```

## Levantar el servidor

```bash
pnpm start:dev    # desarrollo con hot-reload
pnpm start:prod   # producción
```

La documentación Swagger estará disponible en `http://localhost:3000/api`.

## Tests

```bash
pnpm test         # unitarios
pnpm test:e2e     # end-to-end
pnpm test:cov     # cobertura
```

## Scripts disponibles

| Comando                    | Descripción                                   |
|----------------------------|-----------------------------------------------|
| `pnpm start:dev`           | Servidor en modo desarrollo (watch)           |
| `pnpm build`               | Compila el proyecto                           |
| `pnpm db:generate`         | Regenera el cliente de Prisma                 |
| `pnpm db:migrate`          | Genera y aplica migraciones (dev)             |
| `pnpm db:migrate:deploy`   | Aplica migraciones pendientes (prod)          |
| `pnpm db:push`             | Sincroniza schema sin migración (dev)         |
| `pnpm db:seed`             | Carga datos iniciales                         |
| `pnpm db:studio`           | Abre Prisma Studio                            |
