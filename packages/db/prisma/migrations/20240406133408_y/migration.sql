/*
  Warnings:

  - You are about to drop the column `nftMintAddress` on the `AdNft` table. All the data in the column will be lost.
  - Added the required column `ownerId` to the `AdSlot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AdNft" DROP COLUMN "nftMintAddress";

-- AlterTable
ALTER TABLE "AdSlot" ADD COLUMN     "nftMintAddress" TEXT,
ADD COLUMN     "ownerId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "AdSlot_ownerId_idx" ON "AdSlot"("ownerId");
