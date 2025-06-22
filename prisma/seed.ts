import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create roles
  const roles = await Promise.all([
    prisma.role.upsert({
      where: { id: 1 },
      update: {},
      create: { id: 1, name: 'owner' }
    }),
    prisma.role.upsert({
      where: { id: 2 },
      update: {},
      create: { id: 2, name: 'barber' }
    }),
    prisma.role.upsert({
      where: { id: 3 },
      update: {},
      create: { id: 3, name: 'admin' }
    })
  ]);

  console.log('✅ Roles created:', roles.map(r => r.name));

  // Create plans
  const plans = await Promise.all([
    prisma.plan.upsert({
      where: { id: 1 },
      update: {},
      create: {
        id: 1,
        name: 'Basic',
        price: 29.99,
        description: 'Plan básico para barberías pequeñas',
        featuresJson: {
          maxBarbers: 3,
          maxClients: 100,
          features: ['Gestión de citas', 'Clientes', 'Servicios básicos']
        }
      }
    }),
    prisma.plan.upsert({
      where: { id: 2 },
      update: {},
      create: {
        id: 2,
        name: 'Professional',
        price: 59.99,
        description: 'Plan profesional para barberías medianas',
        featuresJson: {
          maxBarbers: 8,
          maxClients: 500,
          features: ['Gestión de citas', 'Clientes', 'Servicios avanzados', 'Promociones', 'Reportes']
        }
      }
    }),
    prisma.plan.upsert({
      where: { id: 3 },
      update: {},
      create: {
        id: 3,
        name: 'Enterprise',
        price: 99.99,
        description: 'Plan empresarial para cadenas de barberías',
        featuresJson: {
          maxBarbers: -1, // Sin límite
          maxClients: -1, // Sin límite
          features: ['Todo lo anterior', 'Múltiples sucursales', 'API', 'Soporte prioritario']
        }
      }
    })
  ]);

  console.log('✅ Plans created:', plans.map(p => p.name));

  // Create appointment statuses
  const appointmentStatuses = await Promise.all([
    prisma.appointmentStatus.upsert({
      where: { id: 1 },
      update: {},
      create: { id: 1, name: 'Scheduled', colorHex: '#3B82F6' }
    }),
    prisma.appointmentStatus.upsert({
      where: { id: 2 },
      update: {},
      create: { id: 2, name: 'In Progress', colorHex: '#F59E0B' }
    }),
    prisma.appointmentStatus.upsert({
      where: { id: 3 },
      update: {},
      create: { id: 3, name: 'Completed', colorHex: '#10B981' }
    }),
    prisma.appointmentStatus.upsert({
      where: { id: 4 },
      update: {},
      create: { id: 4, name: 'Cancelled', colorHex: '#EF4444' }
    }),
    prisma.appointmentStatus.upsert({
      where: { id: 5 },
      update: {},
      create: { id: 5, name: 'No Show', colorHex: '#6B7280' }
    })
  ]);

  console.log('✅ Appointment statuses created:', appointmentStatuses.map(s => s.name));

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });