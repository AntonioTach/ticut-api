/*
  Warnings:

  - The values [ADMIN] on the enum `RoleEnum` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `owner_id` on the `barbershops` table. All the data in the column will be lost.
  - You are about to drop the column `barbershop_id` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[invite_token]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `barbershop_id` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brand_id` to the `barbershops` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RoleEnum_new" AS ENUM ('SUPER_ADMIN', 'OWNER', 'BARBER');
ALTER TABLE "roles" ALTER COLUMN "name" TYPE "RoleEnum_new" USING ("name"::text::"RoleEnum_new");
ALTER TYPE "RoleEnum" RENAME TO "RoleEnum_old";
ALTER TYPE "RoleEnum_new" RENAME TO "RoleEnum";
DROP TYPE "RoleEnum_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "barbershops" DROP CONSTRAINT "barbershops_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_barbershop_id_fkey";

-- AlterTable
ALTER TABLE "appointments" ADD COLUMN     "barbershop_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "barbershops" DROP COLUMN "owner_id",
ADD COLUMN     "brand_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "barbershop_id",
ADD COLUMN     "invite_expiry" TIMESTAMP(3),
ADD COLUMN     "invite_token" TEXT;

-- CreateTable
CREATE TABLE "brands" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo_url" TEXT,
    "owner_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "brands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "barbershop_barbers" (
    "id" TEXT NOT NULL,
    "barbershop_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "barbershop_barbers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "barbershop_barbers_barbershop_id_user_id_key" ON "barbershop_barbers"("barbershop_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_invite_token_key" ON "users"("invite_token");

-- AddForeignKey
ALTER TABLE "brands" ADD CONSTRAINT "brands_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "barbershops" ADD CONSTRAINT "barbershops_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "barbershop_barbers" ADD CONSTRAINT "barbershop_barbers_barbershop_id_fkey" FOREIGN KEY ("barbershop_id") REFERENCES "barbershops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "barbershop_barbers" ADD CONSTRAINT "barbershop_barbers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_barbershop_id_fkey" FOREIGN KEY ("barbershop_id") REFERENCES "barbershops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
