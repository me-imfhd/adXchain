/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "AdSlot" DROP CONSTRAINT "AdSlot_inventoryId_fkey";

-- DropForeignKey
ALTER TABLE "Attributes" DROP CONSTRAINT "Attributes_inventoryId_fkey";

-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "VerificationToken";

-- CreateIndex
CREATE INDEX "AdSlot_inventoryId_idx" ON "AdSlot"("inventoryId");

-- CreateIndex
CREATE INDEX "Attributes_inventoryId_idx" ON "Attributes"("inventoryId");
