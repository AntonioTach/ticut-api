export enum Role {
  USER = 'user',
  BARBER = 'barber',
  ADMIN = 'admin',
  OWNER = 'owner',
}

// Utilidad para convertir Role (dominio) a RoleEnum (Prisma)
import { RoleEnum } from '@prisma/client';

export const toRoleEnum = (role: Role): RoleEnum => {
  switch (role) {
    case Role.ADMIN:
      return RoleEnum.ADMIN;
    case Role.OWNER:
      return RoleEnum.OWNER;
    case Role.BARBER:
      return RoleEnum.BARBER;
    case Role.USER:
      throw new Error('USER role is not mapped to RoleEnum');
    default:
      throw new Error('Invalid role');
  }
}; 