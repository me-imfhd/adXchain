/*
  Warnings:

  - You are about to drop the column `inventoryPlatform` on the `AdSlot` table. All the data in the column will be lost.
  - Added the required column `slotPlatform` to the `AdSlot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AdSlot" DROP COLUMN "inventoryPlatform",
ADD COLUMN     "slotPlatform" TEXT NOT NULL;
