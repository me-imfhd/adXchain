-- DropIndex
DROP INDEX "AdNft_projectId_key";

-- CreateIndex
CREATE INDEX "AdNft_projectId_idx" ON "AdNft"("projectId");
